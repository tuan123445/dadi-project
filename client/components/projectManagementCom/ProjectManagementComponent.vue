<template>
  <div class="project-management">
    <div class="page-title">
      <FontChangeCom :text="pageTitle" :id="pageTitle"></FontChangeCom>
    </div>
    <div class="body-wrapper">
      <div class="top-wrapper">
        <el-form class="search-area">
          <el-form-item
            label="Id"
            style="margin-left: 0px !important"
            prop="projectId"
          >
            <el-input v-model="searchData.projectId"></el-input>
          </el-form-item>
          <el-form-item label="Name" prop="projectName">
            <el-input v-model="searchData.projectName"></el-input>
          </el-form-item>
          <el-form-item label="Leader" prop="projectLeader">
            <el-input v-model="searchData.projectLeader"></el-input>
          </el-form-item>
          <el-form-item label="Category" prop="category">
            <el-input v-model="searchData.category"></el-input>
          </el-form-item>
          <el-button class="clear-btn" type="info"> Clear </el-button>
          <el-button class="search-btn" type="primary">
            <i class="mdi mdi-magnify"></i>
            Search
          </el-button>
        </el-form>
        <div class="top-btn">
          <el-button class="create-btn" type="success" @click="handleCreate()">
            <i class="mdi mdi-plus"></i>
            New
          </el-button>
        </div>
      </div>
      <div class="table-wrapper">
        <el-card class="box-card">
          <el-table :data="tableData" border style="width: 100%" height="600px">
            <el-table-column width="96" align="center">
              <template v-slot="scope">
                <el-button type="primary" @click="handleEdit(scope.row)"
                  >Detail</el-button
                >
              </template>
            </el-table-column>
            <el-table-column
              prop="projectId"
              label="Id"
              width="100"
              align="center"
            >
              <template v-slot="scope">
                {{ scope.row.projectId }}
              </template>
            </el-table-column>
            <el-table-column prop="projectName" label="Name" width="150">
              <template v-slot="scope">
                {{ scope.row.projectName }}
              </template>
            </el-table-column>
            <el-table-column prop="projectDetail" label="Project detail">
              <template v-slot="scope">
                {{ scope.row.projectDetail }}
              </template>
            </el-table-column>
            <el-table-column prop="category" label="Category" width="120">
              <template v-slot="scope">
                {{ scope.row.category }}
              </template>
            </el-table-column>
            <el-table-column prop="projectLeader" label="Leader" width="150">
              <template v-slot="scope">
                {{ scope.row.projectLeader }}
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
              prop="dateCreated"
              label="Date Created"
              width="120"
              align="center"
            >
              <template v-slot="scope">
                {{ scope.row.dateCreated }}
              </template>
            </el-table-column>
            <el-table-column
              prop="dateUpdated"
              label="Date Updated"
              width="120"
              align="center"
            >
              <template v-slot="scope">
                {{ scope.row.dateUpdated }}
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
        <el-form :ref="modal.formName">
          <div class="row mt-2">
            <div class="col-6">
              <el-form-item label="Project Name">
                <el-input
                  v-model="modal.formData.projectName"
                  :clearable="true"
                ></el-input>
              </el-form-item>
            </div>
            <div class="col-6">
              <el-form-item label="Category">
                <el-input
                  v-model="modal.formData.category"
                  :clearable="true"
                ></el-input>
              </el-form-item>
            </div>
          </div>
          <div class="row mt-4">
            <div class="col-12">
              <el-form-item label="Project Detail">
                <el-input
                  v-model="modal.formData.projectDetail"
                  :clearable="true"
                  type="textarea"
                ></el-input>
              </el-form-item>
            </div>
          </div>
          <div class="row mt-4">
            <div class="col-6">
              <el-form-item label="Leader">
                <el-autocomplete
                  :fetch-suggestions="getUserList"
                  v-model="modal.formData.projectLeader"
                  :trigger-on-focus="false"
                  @select="handleSelectLeader"
                ></el-autocomplete>
              </el-form-item>
            </div>
            <div class="col-6">
              <el-form-item label="Status">
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
              <el-form-item label="Create person">
                <el-autocomplete
                  :fetch-suggestions="getUserList"
                  v-model="modal.formData.createdPerson"
                  :trigger-on-focus="false"
                  @select="handleSelectCreatePerson"
                ></el-autocomplete>
              </el-form-item>
            </div>
            <div class="col-6">
              <el-form-item label="Project Link">
                <el-input
                  v-model="modal.formData.projectLink"
                  :clearable="true"
                ></el-input>
              </el-form-item>
            </div>
          </div>
          <div class="bottom-btn mt-5">
            <el-button type="success">
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
import { mixins, lib } from "../../core/index";

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
  },
  components: {
    FontChangeCom: FontChangeCom,
  },
  mixins: [mixins],
  created() {},
  data() {
    return {
      pageTitle: this.title,
      searchData: {},
      tableData: [
        {
          projectId: 1,
          projectName: "Fanpage",
          projectDetail: "A vietnamese fanpage about Apeiron",
          category: "fanpage",
          projectLeader: "Eric",
          createdPerson: "Eric",
          status: 1,
          dateCreated: "2022-08-30",
          dateUpdated: "2022-08-30",
        },
      ],
      userList: [
        { value: "Eric", userId: "HIUAS" },
        { value: "Tuan", userId: "SYWON" },
      ],
      statusList: lib.status,
    };
  },
  methods: {
    getUserList(searchUser, callback) {
      let rs = undefined;
      rs = this.userList.filter((user) =>
        user.value.toLowerCase().includes(searchUser)
      );
      return callback(rs);
    },
    handleSelectLeader() {},
    handleSelectCreatePerson() {},
  },
};
</script>

<style lang="scss" scoped>
.el-form-item {
  margin: 0 10px;
}
</style>
