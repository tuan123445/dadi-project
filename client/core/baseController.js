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
      searchData: {},
      tableData: [],
      loading: true,
    };
  },
  methods: {
    getAll() {
      this.loading = true;
      Api[this.api].getAll().then(rs => {
        if (rs && rs.length != 0) this.tableData = rs;
        this.loading = false;
      });
    },
    search() {
      return new Promise(rex => rex()).then(() => {
        this.beforeSearch();
      }).then(() => {
        Api[this.api].getAll(this.searchData).then(rs => {
          this.tableData = rs;
        });
      });
    },
    beforeSearch() {},
    clearSearchData() {
      this.searchData = helper.clearData(this.searchData);
      Api[this.api].getAll().then(rs => {
        this.tableData = rs;
      });
    },
    showModal(_editMode = false) {
      return new Promise(rex => rex())
        .then(() => {
          this.beforeShowModal();
        }).then(rs => {
          this.modal.show = true;
          this.modal.editMode = _editMode;
          this.$nextTick(() => {
            return rs;
          });
        });
    },
    beforeShowModal() {},
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