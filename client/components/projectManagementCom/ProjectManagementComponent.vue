<template>
  <div class="project-management">
    <div class="page-title">
      <FontChangeCom :text="pageTitle" :id="pageTitle"></FontChangeCom>
    </div>
    <div class="body-wrapper">
      <div class="top-wrapper">
        <el-form class="search-area">
          <el-form-item
            label="Name"
            style="margin-left: 0px !important"
            prop="project_name"
          >
            <el-input v-model="searchData.project_name"></el-input>
          </el-form-item>
          <el-form-item label="Leader" prop="leader_id">
            <el-input v-model="searchData.leader_id"></el-input>
          </el-form-item>
          <el-form-item label="Category" prop="category">
            <el-input v-model="searchData.category"></el-input>
          </el-form-item>
          <el-form-item label="Status" prop="status">
            <el-select v-model="searchData.status" placeholder="Select">
              <el-option
                v-for="item in $lib.status"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              />
            </el-select>
          </el-form-item>
          <el-button class="clear-btn" type="info" @click="clearSearchData()">
            Clear
          </el-button>
          <el-button class="search-btn" type="primary" @click="search()">
            <i class="mdi mdi-magnify"></i>
            Search
          </el-button>
        </el-form>
        <div class="top-btn" v-if="!isManager">
          <el-button class="create-btn" type="success" @click="handleCreate()">
            <i class="mdi mdi-plus"></i>
            New
          </el-button>
        </div>
      </div>
      <div class="table-wrapper">
        <el-card class="box-card">
          <el-table
            :data="tableData"
            border
            style="width: 100%"
            height="600px"
            v-loading="loading"
          >
            <el-table-column width="96" align="center">
              <template v-slot="scope">
                <el-button
                  type="primary"
                  @click="handleEdit(scope.row)"
                  v-if="isCouncilUpper() || isTheLeader(scope.row)"
                  >Detail</el-button
                >
              </template>
            </el-table-column>
            <el-table-column prop="project_name" label="Name" width="150">
              <template v-slot="scope">
                {{ scope.row.project_name }}
              </template>
            </el-table-column>
            <el-table-column prop="project_detail" label="Project detail">
              <template v-slot="scope">
                {{ scope.row.project_detail }}
              </template>
            </el-table-column>
            <el-table-column prop="project_link" label="Project link">
              <template v-slot="scope">
                {{ scope.row.project_link }}
              </template>
            </el-table-column>
            <el-table-column prop="category" label="Category" width="120">
              <template v-slot="scope">
                {{ scope.row.category }}
              </template>
            </el-table-column>
            <el-table-column prop="leader_name" label="Leader" width="80">
              <template v-slot="scope">
                {{ scope.row.leader_name }}
              </template>
            </el-table-column>
            <el-table-column
              prop="created_person_name"
              label="Created Person"
              width="80"
            >
              <template v-slot="scope">
                {{ scope.row.created_person_name }}
              </template>
            </el-table-column>
            <el-table-column prop="member_list" label="Project members">
              <template v-slot="scope">
                {{ scope.row.member_list }}
              </template>
            </el-table-column>
            <el-table-column
              prop="status"
              label="Status"
              width="100"
              align="center"
            >
              <template v-slot="scope">
                <el-tag
                  :type="$filter.getStatusType(scope.row.status)"
                  size="medium"
                  effect="dark"
                >
                  {{ $filter.getStatusLabel(scope.row.status) }}
                </el-tag>
              </template>
            </el-table-column>
            <el-table-column
              prop="date_created"
              label="Date Created"
              width="120"
              align="center"
            >
              <template v-slot="scope">
                {{ $filter.dateConvert(scope.row.date_created) }}
              </template>
            </el-table-column>
            <el-table-column
              prop="date_updated"
              label="Date Updated"
              width="120"
              align="center"
            >
              <template v-slot="scope">
                {{ $filter.dateConvert(scope.row.date_updated) }}
              </template>
            </el-table-column>
          </el-table>
        </el-card>
      </div>
      <el-dialog
        title="Detail"
        v-model="modal.show"
        :before-close="closeModal"
        :close-on-click-modal="false"
        :close-on-press-escape="false"
      >
        <el-form :ref="modal.formName" :model="modal.formData">
          <div class="row mt-2">
            <div class="col-6">
              <el-form-item
                label="Project Name"
                prop="project_name"
                :rules="[$rules.required, projectNameExistRule]"
              >
                <el-input
                  v-model="modal.formData.project_name"
                  :clearable="true"
                ></el-input>
              </el-form-item>
            </div>
            <div class="col-6">
              <el-form-item
                label="Category"
                prop="category"
                :rules="[$rules.required]"
              >
                <el-input
                  v-model="modal.formData.category"
                  :clearable="true"
                ></el-input>
              </el-form-item>
            </div>
          </div>
          <div class="row mt-4">
            <div class="col-12">
              <el-form-item
                label="Project Detail"
                prop="project_detail"
                :rules="[$rules.required]"
              >
                <el-input
                  v-model="modal.formData.project_detail"
                  :clearable="true"
                  type="textarea"
                ></el-input>
              </el-form-item>
            </div>
          </div>
          <div class="row mt-4">
            <div class="col-6">
              <el-form-item
                label="Leader"
                prop="leader_name"
                :rules="[$rules.required, userExistCheckRule]"
              >
                <el-autocomplete
                  :fetch-suggestions="getUserList"
                  v-model="modal.formData.leader_name"
                  :trigger-on-focus="false"
                  @select="handleSelectLeader"
                  @change="handleChangeLeader"
                ></el-autocomplete>
              </el-form-item>
            </div>
            <div class="col-6" v-if="isManager">
              <el-form-item
                label="Status"
                prop="status"
                :rules="[$rules.required]"
              >
                <el-select v-model="modal.formData.status" placeholder="Select">
                  <el-option
                    v-for="item in statusList"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value"
                  />
                </el-select>
              </el-form-item>
            </div>
          </div>
          <div class="row mt-4">
            <div class="col-6">
              <el-form-item
                label="Create person"
                prop="created_person_name"
                :rules="[$rules.required, userExistCheckRule]"
              >
                <el-autocomplete
                  :fetch-suggestions="getUserList"
                  v-model="modal.formData.created_person_name"
                  :trigger-on-focus="false"
                  @select="handleSelectCreatePerson"
                  @change="handleChangeCreatePerson"
                ></el-autocomplete>
              </el-form-item>
            </div>
            <div class="col-6">
              <el-form-item label="Project Link" prop="project_link">
                <el-input
                  v-model="modal.formData.project_link"
                  :clearable="true"
                ></el-input>
              </el-form-item>
            </div>
          </div>
          <div class="row mt-4">
            <div class="col-6">
              <el-form-item
                label="Project Member"
                prop="member_id_list"
                :rules="[$rules.required]"
              >
                <el-select
                  v-model="modal.formData.member_id_list"
                  multiple
                  filterable
                  remote
                  reserve-keyword
                  :remote-method="remoteMethod"
                  :loading="loading"
                  @change="memberListChange"
                >
                  <el-option
                    v-for="member in userList"
                    :key="member.user_id"
                    :value="member.user_id"
                    :label="member.value"
                  />
                </el-select>
              </el-form-item>
            </div>
          </div>
          <div class="bottom-btn mt-5">
            <el-button
              type="danger"
              @click="handleDelete()"
              v-if="modal.editMode"
            >
              <i class="mdi mdi-delete"></i>
              Delete
            </el-button>
            <el-button type="success" @click="handleConfirm()">
              <i class="mdi mdi-content-save-check"></i>
              Submit
            </el-button>
          </div>
        </el-form>
      </el-dialog>
    </div>
  </div>
</template>

<script>
import FontChangeCom from "../../components/ApeironFontChangeCom.vue";
import { mixins, lib, consts } from "../../core/index";
import Api from "../../api/index.js";

export default {
  props: {
    isManager: {
      type: Boolean,
      default: () => false,
    },
    title: {
      type: String,
      default: () => "",
    },
    pageAPI: {
      type: String,
      default: () => "",
    },
  },
  components: {
    FontChangeCom: FontChangeCom,
  },
  mixins: [mixins],
  created() {
    this.getAll();
  },
  data() {
    // rule
    var checkUserExist = async (rule, value, callback) => {
      if (!value) return;
      let result = await this.checkUserExistMethod(value);
      if (result == false) {
        return callback("don't have this user");
      }
    };

    var checkProjectNameExist = async (rule, value, callback) => {
      if (!value) return;
      let result = await this.checkProjectDuplicate();
      if (result == true) {
        return callback("This project name was taken.");
      }
    };
    return {
      api: this.pageAPI,
      pageTitle: this.title,
      statusList: lib.status,
      userList: [],
      userExistCheckRule: {
        validator: checkUserExist,
        trigger: "change",
      },
      projectNameExistRule: {
        validator: checkProjectNameExist,
        trigger: "blur",
      },
    };
  },
  methods: {
    showModal(_editMode = false) {
      Api[this.api]
        .getUserList()
        .then((rs) => {
          this.userList = rs;
        })
        .then(() => {
          return new Promise((res) => {
            this.modal.show = true;
            this.modal.editMode = _editMode;
            this.$nextTick(() => {
              return res();
            });
          });
        });
    },
    getUserList(searchUser, callback) {
      let rs = undefined;
      rs = this.userList.filter((user) => {
        if (user.value && user.value.toLowerCase().includes(searchUser)) {
          return user;
        }
      });
      return callback(rs);
    },
    handleSelectLeader(value) {
      this.modal.formData.leader_id = value.user_id;
    },
    handleSelectCreatePerson(value) {
      this.modal.formData.created_person_id = value.user_id;
    },
    async handleChangeLeader(value) {
      this.userList.forEach((user) => {
        if (user.value && user.value.toLowerCase() == value) {
          this.modal.formData.leader_id = user.user_id;
        }
      });
    },
    async handleChangeCreatePerson(value) {
      this.userList.forEach((user) => {
        if (user.value && user.value.toLowerCase() == value) {
          this.modal.formData.created_person_id = user.user_id;
        }
      });
    },
    async checkUserExistMethod(value) {
      let exist = false;
      this.userList.forEach((user) => {
        if (user.value && user.value.toLowerCase() == value) {
          exist = true;
        }
      });
      return exist;
    },
    async checkProjectDuplicate() {
      if (this.modal.editMode) return false;
      return Api.projectSubmit
        .checkProjectDuplicate(this.modal.formData)
        .then((rs) => {
          return rs;
        });
    },
    isCouncilUpper() {
      let result = false;
      // let user_permission = this.$store._state.data.user_info.user_permision;

      // if (
      //   user_permission == consts.permisionList.council.value ||
      //   user_permission == consts.permisionList.lorekeeper.value
      // ) {
      result = true;
      // }
      return result;
    },
    isTheLeader(projectInfo) {
      let result = false;
      // let user_id = this.$store._state.data.user_info.user_id;
      // if (projectInfo.leader_id == user_id) {
      result = true;
      // }
      return result;
    },
  },
};
</script>

<style lang="scss" scoped>
.el-form-item {
  margin: 0 10px;
}
</style>
