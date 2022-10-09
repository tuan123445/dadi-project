/* eslint-disable prettier/prettier */
/* eslint-disable no-unused-vars */

import helper from "./helper";
import Api from "../api/index";
import {
  useStore
} from "vuex";

export default {
  data() {
    return {
      api: "",
      modal: {
        editMode: false,
        show: false,
        formData: {},
        formName: "modalForm",
      },
      tableData: [],
      loading: true,
    };
  },
  methods: {
    getAll() {
      this.loading = true;
      Api[this.api].getAll().then(rs => {
        if (rs && rs.length != 0) this.tableData = rs;
        console.log(this.tableData);
        this.loading = false;
      });
    },
    showModal(_editMode = false) {
      return new Promise(res => {
        this.modal.show = true;
        this.modal.editMode = _editMode;
        this.$nextTick(() => {
          return res();
        });
      });
    },
    closeModal() {
      this.$refs[this.modal.formName].resetFields();
      this.modal.formData = helper.clearData(this.modal.formData);
      this.$nextTick(() => this.modal.show = false);
    },
    handleCreate() {
      this.showModal(false);
    },
    handleEdit(row) {
      Api[this.api].getItemById(row).then(rs => {
        this.modal.formData = rs[0];
      });

      this.$nextTick(() => {
        this.showModal(true);
      });
    },
    handleConfirm() {
      // edit
      if (this.modal.editMode) {
        helper.validateForm(this.$refs[this.modal.formName], "Do you want to update the data?").then(result => {
          if (!result) return;
          return new Promise(rex => rex()).then(() => {
            this.beforeSubmit();
          }).then(() => {
            // Call api method
            Api[this.api].update(this.modal.formData).then(() => {
              this.closeModalAndReSearch();
            });
          })
        });
      }

      // create
      if (!this.modal.editMode) {
        helper.validateForm(this.$refs[this.modal.formName], "Do you want to create?").then(result => {
          if (!result) return;
          return new Promise(rex => rex()).then(() => {
            this.beforeSubmit();
          }).then(() => {
            // Call api method
            Api[this.api].createData(this.modal.formData).then(() => {
              this.closeModalAndReSearch();
            });
          })
        });
      }
    },
    closeModalAndReSearch() {
      this.closeModal(); // close model
      this.getAll(); // reload data
    },
    handleDelete() {
      helper.validateForm(this.$refs[this.modal.formName], "Do you want to delete this project?").then(result => {
        if (!result) return;
        Api[this.api].delete(this.modal.formData).then(() => {
          this.closeModalAndReSearch();
        });
      });
    },
    beforeSubmit() {}
  }
};