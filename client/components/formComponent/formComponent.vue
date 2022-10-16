<template>
  <div class="form-management">
    <div class="page-title">
      <FontChangeCom :text="pageTitle" :id="pageTitle"></FontChangeCom>
    </div>
    <div class="body-wrapper">
      <div class="top-wrapper">
        <el-form class="search-area">
          <el-form-item
            label="Name"
            style="margin-left: 0px !important"
            prop="userName"
          >
            <el-input v-model="searchData.user_name"></el-input>
          </el-form-item>
          <el-form-item label="Week" prop="week">
            <el-input v-model="searchData.week"></el-input>
          </el-form-item>
          <el-form-item label="Month & Year" prop="monthYear">
            <el-date-picker
              v-model="searchData.monthYear"
              type="month"
              placeholder="Pick a month and year"
            />
          </el-form-item>
          <el-button class="clear-btn" type="info" @click="clearSearchData()">
            Clear
          </el-button>
          <el-button class="search-btn" type="primary" @click="search()">
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
            <el-table-column width="100" align="center">
              <template v-slot="scope">
                <el-dropdown>
                  <span>
                    <el-button type="primary" style="width: 70px">
                      More
                      <i
                        class="mdi mdi-chevron-down"
                        style="margin-left: 5px; margin-right: unset"
                      ></i>
                    </el-button>
                  </span>
                  <template #dropdown>
                    <el-dropdown-menu>
                      <el-dropdown-item>
                        <el-button
                          type="primary"
                          @click="handleEdit(scope.row)"
                          style="width: -webkit-fill-available"
                          size="small"
                          >Detail
                        </el-button>
                      </el-dropdown-item>
                      <el-dropdown-item>
                        <el-button
                          type="info"
                          @click="handleAddSugarShowDialog(scope.row)"
                          style="width: -webkit-fill-available"
                          size="small"
                        >
                          Add sugar
                        </el-button>
                      </el-dropdown-item>
                      <el-dropdown-item>
                        <el-button
                          type="warning"
                          @click="handleAddSugarShowDialog(scope.row)"
                          size="small"
                        >
                          Leave Note
                        </el-button>
                      </el-dropdown-item>
                    </el-dropdown-menu>
                  </template>
                </el-dropdown>
              </template>
            </el-table-column>
            <el-table-column
              prop="user_name"
              label="User Name"
              width="100"
              align="center"
            >
              <template v-slot="scope">
                {{ scope.row.user_name }}
              </template>
            </el-table-column>
            <el-table-column
              prop="week_date"
              label="Date"
              width="150"
              align="center"
            >
              <template v-slot="scope">
                {{ scope.row.week_date }}
              </template>
            </el-table-column>
            <el-table-column
              prop="doodiness_work"
              label="Doodiness for this week"
              width="550"
              header-align="center"
            >
              <template v-slot="scope">
                {{ scope.row.doodiness_work }}
              </template>
            </el-table-column>
            <el-table-column
              prop="friendship_sugar"
              label="Friendship Sugar"
              width="250"
              align="center"
            >
              <template v-slot="scope">
                {{ scope.row.friendship_sugar }}
              </template>
            </el-table-column>
            <el-table-column
              prop="missionary_sugar"
              label="Missionary Sugar"
              width="250"
              align="center"
            >
              <template v-slot="scope">
                {{ scope.row.missionary_sugar }}
              </template>
            </el-table-column>
            <el-table-column
              prop="project_list"
              label="Projects"
              width="550"
              align="center"
            >
              <template v-slot="scope">
                {{ scope.row.project_list }}
              </template>
            </el-table-column>
            <el-table-column
              prop="project_link_list"
              label="Projects Link"
              width="450"
              align="center"
            >
              <template v-slot="scope">
                {{ scope.row.project_link_list }}
              </template>
            </el-table-column>
            <el-table-column
              prop="partner"
              label="Partner"
              width="150"
              align="center"
            >
              <template v-slot="scope">
                {{ scope.row.partner }}
              </template>
            </el-table-column>
            <el-table-column
              prop="note_for_lk"
              label="Note for LoreKeeper"
              width="450"
              align="center"
            >
              <template v-slot="scope">
                {{ scope.row.note_for_lk }}
              </template>
            </el-table-column>
            <el-table-column
              prop="sugar_received"
              label="Sugars"
              width="250"
              align="center"
            >
              <template v-slot="scope">
                {{ scope.row.sugar_received }}
              </template>
            </el-table-column>
            <el-table-column
              prop="lk_note"
              label="LoreKeeper Notes"
              width="650"
              align="center"
            >
              <template v-slot="scope">
                {{ scope.row.lk_note }}
              </template>
            </el-table-column>
            <el-table-column
              prop="status"
              label="Status"
              width="110"
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
          <div class="row mt-4">
            <div class="col-6">
              <el-form-item label="Week" prop="week" :rules="[$rules.required]">
                <el-input v-model="modal.formData.week"></el-input>
              </el-form-item>
            </div>
            <div class="col-6">
              <el-form-item
                label="Month & Year"
                prop="monthYear"
                :rules="[$rules.required]"
              >
                <el-date-picker
                  v-model="modal.formData.monthYear"
                  type="month"
                  placeholder="Pick a month and year"
                />
              </el-form-item>
            </div>
          </div>
          <div class="row mt-4">
            <div class="col-12">
              <el-form-item
                label="Doodiness for this week"
                prop="doodiness_work"
                :rules="[$rules.required]"
              >
                <el-input
                  v-model="modal.formData.doodiness_work"
                  :clearable="true"
                  :placeholder="$lib.formPlaceHolderMessage.doodinessMess"
                  type="textarea"
                ></el-input>
              </el-form-item>
            </div>
          </div>
          <div class="row mt-4">
            <div class="col-12">
              <el-form-item label="Friendship SUGAR" prop="friendship_sugar">
                <el-input
                  v-model="modal.formData.friendship_sugar"
                  :clearable="true"
                  :placeholder="$lib.formPlaceHolderMessage.friendShipSugar"
                  type="textarea"
                ></el-input>
              </el-form-item>
            </div>
          </div>
          <div class="row mt-4">
            <div class="col-12">
              <el-form-item label="Missionary SUGAR" prop="missionary_sugar">
                <el-input
                  v-model="modal.formData.missionary_sugar"
                  :clearable="true"
                  :placeholder="$lib.formPlaceHolderMessage.missionarySugar"
                  type="textarea"
                ></el-input>
              </el-form-item>
            </div>
          </div>
          <div class="row mt-4">
            <div class="col-12">
              <el-form-item
                label="Project List"
                prop="projectList"
                :rules="[$rules.required]"
              >
                <el-select
                  v-model="modal.formData.projectList"
                  filterable
                  placeholder="Please select"
                  multiple
                >
                  <el-option
                    v-for="item in projectList"
                    :key="item.project_id"
                    :label="item.project_name"
                    :value="item.project_id"
                  >
                  </el-option>
                </el-select>
              </el-form-item>
            </div>
          </div>
          <div class="row mt-4">
            <div class="col-12">
              <el-form-item label="Partner" prop="partner">
                <el-input
                  v-model="modal.formData.partner"
                  :clearable="true"
                  :placeholder="$lib.formPlaceHolderMessage.partner"
                ></el-input>
              </el-form-item>
            </div>
          </div>
          <div class="row mt-4">
            <div class="col-12">
              <el-form-item label="Dadi event RSVP" prop="dadi_event_rsvp">
                <el-input
                  v-model="modal.formData.dadi_event_rsvp"
                  :clearable="true"
                  :placeholder="$lib.formPlaceHolderMessage.dadiEventRsvp"
                  type="textarea"
                ></el-input>
              </el-form-item>
            </div>
          </div>
          <div class="row mt-4">
            <div class="col-12">
              <el-form-item label="Note for LoreKeeper" prop="note_for_lk">
                <el-input
                  v-model="modal.formData.note_for_lk"
                  :clearable="true"
                  :placeholder="$lib.formPlaceHolderMessage.noteForLK"
                  type="textarea"
                ></el-input>
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
            <el-button type="success" @click="handleCheckAndConfirm()">
              <i class="mdi mdi-content-save-check"></i>
              Submit
            </el-button>
          </div>
        </el-form>
      </el-dialog>
      <el-dialog
        title="Sugar Add"
        v-model="formAddSugar.show"
        :before-close="closeSugarModal"
        :close-on-click-modal="false"
        :close-on-press-escape="false"
      >
        <el-form :ref="formAddSugar.name" :model="formAddSugar.formData">
          <div class="row mt-4">
            <div class="col-12">
              <el-form-item
                label="Sugar"
                prop="sugar_received"
                :rules="[$rules.required]"
              >
                <el-input
                  v-model="formAddSugar.formData.sugar_received"
                  placeholder="How many sugar you want to give?"
                ></el-input>
              </el-form-item>
            </div>
          </div>
          <div class="bottom-btn mt-5">
            <el-button type="success" @click="handleAddSugar()">
              <i class="mdi mdi-delete"></i>
              Add
            </el-button>
          </div>
        </el-form>
      </el-dialog>
    </div>
  </div>
</template>

<script>
import FontChangeCom from "../../components/ApeironFontChangeCom.vue";
import { helper, mixins } from "../../core/index";
import Api from "../../api/index.js";

export default {
  props: {
    title: {
      type: String,
      default: () => "",
    },
    isManager: {
      type: Boolean,
      default: () => false,
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
    return {
      api: this.pageAPI,
      pageTitle: this.title,
      searchData: {},
      tableData: [],
      projectList: [],
      formAddSugar: {
        name: "formAddSugar",
        show: false,
        formData: {},
      },
    };
  },
  methods: {
    beforeSearch() {
      let date = new Date(this.searchData.monthYear);
      this.searchData.month = date.getMonth() + 1;
      this.searchData.year = date.getFullYear();
    },
    beforeShowModal() {
      Api[this.api].getProjectList().then((rs) => {
        this.projectList = rs;
      });
    },
    handleCheckAndConfirm() {
      if (!this.modal.editMode) {
        return Api[this.api].checkFormExist(this.modal.formData).then((rs) => {
          if (rs) {
            return helper.popup.error(
              "This form was created before. Please check Week and Date AGAIN",
              "Duplicate Form"
            );
          }
        });
      }
      this.handleConfirm();
    },
    handleAddSugarShowDialog(row) {
      if (row.sugar_received) {
        this.formAddSugar.formData.sugar_received = row.sugar_received;
      }
      this.formAddSugar.formData.form_id = row.form_id;
      this.formAddSugar.show = true;
    },
    closeSugarModal() {
      this.$refs[this.formAddSugar.name].resetFields();
      this.formAddSugar.formData = helper.clearData(this.formAddSugar.formData);
      this.$nextTick(() => (this.formAddSugar.show = false));
    },
    handleAddSugar() {
      helper
        .validateForm(
          this.$refs[this.formAddSugar.name],
          "Do you want to update sugar?"
        )
        .then((rs) => {
          if (!rs) return;
          Api[this.api].addSugar(this.formAddSugar.formData).then(() => {
            this.closeSugarModal();
            this.getAll();
          });
        });
    },
  },
};
</script>

<style lang="scss" scoped>
.el-form-item {
  margin: 0 10px;
}

.el-select {
  width: -webkit-fill-available;
}
</style>
