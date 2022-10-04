<template>
  <div class="shop">
    <div class="page-title">
      <FontChangeCom :text="pageTitle" :id="pageTitle"></FontChangeCom>
    </div>
    <div class="body-wrapper">
      <div class="top-wrapper">
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
              prop="item_id"
              label="ID"
              width="100"
              align="center"
            >
              <template v-slot="scope">
                {{ scope.row.item_id }}
              </template>
            </el-table-column>
            <el-table-column
              prop="item_name"
              label="Name"
              width="150"
              align="center"
            >
              <template v-slot="scope">
                {{ scope.row.item_name }}
              </template>
            </el-table-column>
            <el-table-column
              prop="item_detail"
              label="Detail"
              header-align="center"
            >
              <template v-slot="scope">
                {{ scope.row.item_detail }}
              </template>
            </el-table-column>
            <el-table-column
              prop="item_cost"
              label="Cost (sugar)"
              width="120"
              align="center"
            >
              <template v-slot="scope">
                {{ scope.row.item_cost }}
              </template>
            </el-table-column>
            <el-table-column
              prop="quantity"
              label="Quantity"
              width="120"
              align="center"
            >
              <template v-slot="scope">
                {{ scope.row.quantity }}
              </template>
            </el-table-column>
            <el-table-column
              prop="date_created"
              label="Date Created"
              width="120"
              align="center"
            >
              <template v-slot="scope">
                {{ scope.row.date_created }}
              </template>
            </el-table-column>
            <el-table-column
              prop="date_updated"
              label="Date Updated"
              width="120"
              align="center"
            >
              <template v-slot="scope">
                {{ scope.row.date_updated }}
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
              <el-form-item label="Item Name" prop="item_name">
                <el-input
                  v-model="modal.formData.item_name"
                  :clearable="true"
                ></el-input>
              </el-form-item>
            </div>
          </div>
          <div class="row mt-4">
            <div class="col-12">
              <el-form-item label="Item Detail" prop="item_detail">
                <el-input
                  v-model="modal.formData.item_detail"
                  type="textarea"
                  :clearable="true"
                ></el-input>
              </el-form-item>
            </div>
          </div>
          <div class="row mt-4">
            <div class="col-6">
              <el-form-item label="Item Cost" prop="item_cost">
                <el-input
                  v-model="modal.formData.item_cost"
                  :clearable="true"
                ></el-input>
              </el-form-item>
            </div>
            <div class="col-6">
              <el-form-item label="Quantity" prop="quantity">
                <el-input
                  v-model="modal.formData.quantity"
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
import Api from "../../api/index";
import FontChangeCom from "../../components/ApeironFontChangeCom.vue";
import { mixins } from "../../core/index";

export default {
  components: {
    FontChangeCom: FontChangeCom,
  },
  mixins: [mixins],
  created() {
    this.getAll();
  },
  data() {
    return {
      pageTitle: "Dadi's Shop",
    };
  },
  methods: {
    getAll() {
      Api.shop.getAll().then((rs) => {
        this.tableData = rs;
      });
    },
  },
};
</script>

<style lang="scss" scoped>
.el-form-item {
  margin: 0 10px;
}
</style>
