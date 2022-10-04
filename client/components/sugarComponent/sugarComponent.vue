<template>
  <div class="sugar-management">
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
              prop="userName"
              label="Name"
              width="150"
              header-align="center"
            >
              <template v-slot="scope">
                {{ scope.row.userName }}
              </template>
            </el-table-column>
            <el-table-column prop="formDetail" label="Detail" align="center">
              <template v-slot="scope">
                {{ scope.row.formDetail }}
              </template>
            </el-table-column>
            <el-table-column
              prop="sugarUse"
              label="Amount Sugar"
              width="150"
              align="center"
            >
              <template v-slot="scope">
                {{ scope.row.sugarUse }}
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
              <el-form-item label="Name">
                <el-autocomplete
                  :fetch-suggestions="getUserList"
                  v-model="modal.formData.userName"
                  :trigger-on-focus="false"
                  @select="handleSelectName"
                ></el-autocomplete>
              </el-form-item>
            </div>
          </div>
          <div class="row mt-4">
            <div class="col-12">
              <el-form-item label="Detail" prop="detail">
                <el-input
                  type="textarea"
                  v-model="modal.formData.detail"
                  :placeholder="$lib.formPlaceHolderMessage.sugarDetailForm"
                ></el-input>
              </el-form-item>
            </div>
          </div>
          <div class="row mt-4">
            <div class="col-6">
              <el-form-item label="Item List" prop="itemList">
                <el-select
                  v-model="modal.formData.itemList"
                  filterable
                  :placeholder="$lib.formPlaceHolderMessage.exchangeItemChoose"
                  multiple
                >
                  <el-option
                    v-for="item in itemList"
                    :key="item.itemId"
                    :label="item.itemName"
                    :value="item.itemId"
                  >
                  </el-option>
                </el-select>
              </el-form-item>
            </div>
            <div class="col-6">
              <el-form-item label="Sugar use amount" prop="sugarUse">
                <el-input v-model="modal.formData.sugarUse"></el-input>
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
          formId: "ADGWS",
          formWeekDate: "week 4 of 2022-09",
          userName: "Tuấn",
          formDetail: "I want to exchange 25 sugar to 50FE",
          sugarUse: 25,
          status: 1,
          dateCreated: "2022-08-30",
          dateUpdated: "2022-08-30",
        },
      ],
      userList: [
        { value: "Eric", userId: "HIUAS" },
        { value: "Tuan", userId: "SYWON" },
      ],
      itemList: [
        { itemName: "50 Foonie Emblem", itemId: "1" },
        { itemName: "T-shirt", itemId: "2" },
        { itemName: "Apostle", itemId: "3" },
      ],
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
    handleSelectName() {},
  },
};
</script>

<style lang="scss" scoped>
.el-form-item {
  margin: 0 10px;
}

.el-select {
  width: -webkit-fill-available !important;
}
</style>
