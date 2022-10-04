<template>
  <div class="user-manager">
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
          <el-form-item label="ID Discord" prop="idDiscord">
            <el-input v-model="searchData.idDiscord"></el-input>
          </el-form-item>
          <el-form-item label="Wallet" prop="wallet" style="width: 300px">
            <el-input v-model="searchData.wallet"></el-input>
          </el-form-item>
          <el-form-item label="Role" prop="role">
            <el-input v-model="searchData.role"></el-input>
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
            <el-table-column prop="userName" label="Name" width="150">
              <template v-slot="scope">
                {{ scope.row.userName }}
              </template>
            </el-table-column>
            <el-table-column prop="idDiscord" label="ID Discord" width="120">
              <template v-slot="scope">
                {{ scope.row.idDiscord }}
              </template>
            </el-table-column>
            <el-table-column prop="email" label="Email">
              <template v-slot="scope">
                {{ scope.row.email }}
              </template>
            </el-table-column>
            <el-table-column prop="wallet" label="Wallet">
              <template v-slot="scope">
                {{ scope.row.wallet }}
              </template>
            </el-table-column>
            <el-table-column prop="role" label="Role" width="150">
              <template v-slot="scope">
                {{ scope.row.role }}
              </template>
            </el-table-column>
            <el-table-column prop="sugarBalance" label="Sugar" width="100">
              <template v-slot="scope">
                {{ scope.row.sugarBalance }}
              </template>
            </el-table-column>
            <el-table-column
              prop="dateCreated"
              label="Date Created"
              width="120"
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
            <div class="col-12">
              <el-form-item label="User Name">
                <el-input
                  v-model="modal.formData.userName"
                  :clearable="true"
                ></el-input>
              </el-form-item>
            </div>
          </div>
          <div class="row mt-4">
            <div class="col-12">
              <el-form-item label="Email">
                <el-input
                  v-model="modal.formData.email"
                  :clearable="true"
                ></el-input>
              </el-form-item>
            </div>
          </div>
          <div class="row mt-4">
            <div class="col-6">
              <el-form-item label="Id Discord">
                <el-input
                  v-model="modal.formData.idDiscord"
                  :clearable="true"
                ></el-input>
              </el-form-item>
            </div>
            <div class="col-6">
              <el-form-item label="Role">
                <el-input
                  v-model="modal.formData.role"
                  :clearable="true"
                ></el-input>
              </el-form-item>
            </div>
          </div>
          <div class="row mt-4">
            <div class="col-12">
              <el-form-item label="Wallet">
                <el-input
                  v-model="modal.formData.wallet"
                  :clearable="true"
                ></el-input>
              </el-form-item>
            </div>
          </div>
          <div class="row mt-4">
            <div class="col-6">
              <el-form-item label="Sugar">
                <el-input
                  :disabled="true"
                  v-model="modal.formData.sugarBalance"
                  :clearable="true"
                ></el-input>
              </el-form-item>
            </div>
            <div class="col-6">
              <el-form-item label="Permision">
                <el-select
                  v-model="modal.formData.permision"
                  placeholder="Select"
                >
                  <el-option
                    v-for="item in permisionList"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value"
                  />
                </el-select>
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
  components: {
    FontChangeCom: FontChangeCom,
  },
  mixins: [mixins],
  data() {
    return {
      pageTitle: "User Manager",
      searchData: {},
      tableData: [
        {
          userName: "Tuan",
          idDiscord: "tuan | ApeironNFT#6550",
          email: "anht91610@gmail.com",
          wallet: "0x51A2d612a8CFb3fF3e3d5D4f20163D5eE1Ab3518",
          role: "Wrangler",
          sugarBalance: 37,
          permision: 1,
        },
        {
          userName: "Eric",
          idDiscord: "ERIC#6363",
          email: "littleminion@gmail.com",
          wallet: "0x51A2d612a8CFb3fF3e3d5D4f20163D5eE1Ab3518",
          role: "Wrangler",
          sugarBalance: 37,
          permision: 1,
        },
      ],
      permisionList: lib.permisionList,
    };
  },
};
</script>

<style lang="scss" scoped>
.el-form-item {
  margin: 0 10px;
}

.user-manager {
  -moz-user-select: text !important;
  -webkit-touch-callout: text !important;
  -webkit-user-select: text !important;
  -khtml-user-select: text !important;
  -moz-user-select: text !important;
  -ms-user-select: text !important;
  user-select: text !important;
}
</style>
