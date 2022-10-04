<template>
  <div class="form-management">
    <div class="page-title">
      <FontChangeCom :text="pageTitle" :id="pageTitle"></FontChangeCom>
    </div>
    <div class="body-wrapper">
      <div class="top-wrapper">
        <el-form class="search-area">
          <el-form-item
            label="Id"
            style="margin-left: 0px !important"
            prop="formId"
          >
            <el-input v-model="searchData.formId"></el-input>
          </el-form-item>
          <el-form-item label="Name" prop="userName">
            <el-input v-model="searchData.userName"></el-input>
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
              prop="formId"
              label="Id"
              width="100"
              align="center"
            >
              <template v-slot="scope">
                {{ scope.row.formId }}
              </template>
            </el-table-column>
            <el-table-column
              prop="formWeekDate"
              label="Date"
              width="150"
              align="center"
            >
              <template v-slot="scope">
                {{ scope.row.formWeekDate }}
              </template>
            </el-table-column>
            <el-table-column
              prop="doodinessWork"
              label="Doodiness for this week"
              width="550"
              header-align="center"
            >
              <template v-slot="scope">
                {{ scope.row.doodinessWork }}
              </template>
            </el-table-column>
            <el-table-column
              prop="friendShipSugar"
              label="Friendship Sugar"
              width="250"
              align="center"
            >
              <template v-slot="scope">
                {{ scope.row.friendShipSugar }}
              </template>
            </el-table-column>
            <el-table-column
              prop="missionarySugar"
              label="Missionary Sugar"
              width="250"
              align="center"
            >
              <template v-slot="scope">
                {{ scope.row.missionarySugar }}
              </template>
            </el-table-column>
            <el-table-column
              prop="projects"
              label="Projects"
              width="550"
              align="center"
            >
              <template v-slot="scope">
                {{ scope.row.projects }}
              </template>
            </el-table-column>
            <el-table-column
              prop="projectsLink"
              label="Projects Link"
              width="450"
              align="center"
            >
              <template v-slot="scope">
                {{ scope.row.projectsLink }}
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
              prop="noteForLK"
              label="Note for LoreKeeper"
              width="450"
              align="center"
            >
              <template v-slot="scope">
                {{ scope.row.noteForLK }}
              </template>
            </el-table-column>
            <el-table-column
              prop="overseerNote"
              label="Overseer Note"
              width="450"
              align="center"
            >
              <template v-slot="scope">
                {{ scope.row.overseerNote }}
              </template>
            </el-table-column>
            <el-table-column
              prop="earnedSugar"
              label="Sugars"
              width="250"
              align="center"
            >
              <template v-slot="scope">
                {{ scope.row.earnedSugar }}
              </template>
            </el-table-column>
            <el-table-column
              prop="lkNote"
              label="LoreKeeper Notes"
              width="650"
              align="center"
            >
              <template v-slot="scope">
                {{ scope.row.lkNote }}
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
          <div class="row mt-4">
            <div class="col-6">
              <el-form-item label="Week" prop="week">
                <el-input v-model="modal.formData.week"></el-input>
              </el-form-item>
            </div>
            <div class="col-6">
              <el-form-item label="Month & Year" prop="monthYear">
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
              <el-form-item label="Doodiness for this week">
                <el-input
                  v-model="modal.formData.doodinessWork"
                  :clearable="true"
                  :placeholder="$lib.formPlaceHolderMessage.doodinessMess"
                  type="textarea"
                ></el-input>
              </el-form-item>
            </div>
          </div>
          <div class="row mt-4">
            <div class="col-12">
              <el-form-item label="Friendship SUGAR" prop="friendShipSugar">
                <el-input
                  v-model="modal.formData.friendShipSugar"
                  :clearable="true"
                  :placeholder="$lib.formPlaceHolderMessage.friendShipSugar"
                  type="textarea"
                ></el-input>
              </el-form-item>
            </div>
          </div>
          <div class="row mt-4">
            <div class="col-12">
              <el-form-item label="Missionary SUGAR" prop="missionarySugar">
                <el-input
                  v-model="modal.formData.missionarySugar"
                  :clearable="true"
                  :placeholder="$lib.formPlaceHolderMessage.missionarySugar"
                  type="textarea"
                ></el-input>
              </el-form-item>
            </div>
          </div>
          <div class="row mt-4">
            <div class="col-12">
              <el-form-item label="Project List" prop="projectList">
                <el-select
                  v-model="modal.formData.projectList"
                  filterable
                  placeholder="Please select"
                  multiple
                >
                  <el-option
                    v-for="item in projectList"
                    :key="item.projectId"
                    :label="item.projectName"
                    :value="item.projectId"
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
              <el-form-item label="Dadi event RSVP" prop="dadiEventRsvp">
                <el-input
                  v-model="modal.formData.dadiEventRsvp"
                  :clearable="true"
                  :placeholder="$lib.formPlaceHolderMessage.dadiEventRsvp"
                  type="textarea"
                ></el-input>
              </el-form-item>
            </div>
          </div>
          <div class="row mt-4">
            <div class="col-12">
              <el-form-item label="Note for LoreKeeper" prop="noteForLK">
                <el-input
                  v-model="modal.formData.noteForLK"
                  :clearable="true"
                  :placeholder="$lib.formPlaceHolderMessage.noteForLK"
                  type="textarea"
                ></el-input>
              </el-form-item>
            </div>
          </div>
          <div class="bottom-btn mt-5">
            <el-button type="info" v-if="modal.editMode == true">
              <i class="mdi mdi-plus"></i>
              Add sugar
            </el-button>
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
import { mixins } from "../../core/index";

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
  },
  components: {
    FontChangeCom: FontChangeCom,
  },
  mixins: [mixins],
  data() {
    return {
      pageTitle: this.title,
      searchData: {},
      tableData: [
        {
          formId: "UGBQS",
          formWeekDate: "week 4 of 2022-09",
          doodinessWork:
            "1. Stay active in general \n 2.Participate in derby marble and won 50 usd",
          friendShipSugar: "SiByLz#2504 (She have a kid just like u Frank)",
          missionarySugar: "",
          projects: "",
          projectsLink: "",
          partner:
            "Bbounceeee#4325, 84994luaP#4550 and s2obboss#5764 for my 19 yo proj",
          noteForLK:
            "For the project that i have been posting for the last 5 weeks im still waiting for my friend to translate the proposal because it's a group project and i have less time to do it because the uni is now open. And Im currently a sophomore in industrial engineering at chulalongkorn university (u can search the uni name :))  And my name is not Lua my name is Paul haha luaP is Paul spell backward lol u can called me Paul :)To enable screen reader support, press Ctrl+Alt+Z To learn about keyboard shortcuts, press Ctrl+slash",
          overseerNote: "",
          earnedSugar: "1 for doodiness",
          lkNote:
            "Thanks for replying to my note Paul! Glad to learn your name! Well school is always more important and uni is one of the best times of ones life, so enjoy it and spend more time over there doing hot fiery stuff. I can always wait for the proposal to happen, got a lot going on with my days already haha.To enable screen reader support, press Ctrl+Alt+Z To learn about keyboard shortcuts, press Ctrl+slash",
          status: 2,
          dateCreated: "2022-08-30",
          dateUpdated: "2022-08-30",
        },
      ],
      projectList: [
        { projectName: "project A", projectId: "1" },
        { projectName: "project B", projectId: "2" },
        { projectName: "project C", projectId: "3" },
        { projectName: "project D", projectId: "4" },
      ],
    };
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
