/* eslint-disable prettier/prettier */
/* eslint-disable no-unused-vars */

import helper from "./helper";
import Api from "../api/index";

export default {
  data() {
    return {
      modal: {
        editMode: false,
        show: false,
        formData: {},
        formName: "modalForm",
      },
      tableData: [],
    };
  },
  methods: {
    search() {},
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
      this.modal.formData = row;
      this.$nextTick(() => {
        this.showModal(true);
      });
    },
    handleConfirm() {
      // edit
      if (this.modal.editMode) {
        helper.validateForm(this.$refs[this.modal.formName], "Do you want to update the data?").then(() => {
          // Call api method
          Api[this.api].update(this.modal.formData).then(() => {
            this.closeModalAndReSearch();
          });
        });
      }

      // create
      if (this.modal.editMode) {
        helper.validateForm(this.$refs[this.modal.formName], "Do you want to create?").then(() => {
          // Call api method
          Api[this.api].createData(this.modal.formData).then(() => {
            this.closeModalAndReSearch();
          });
        });
      }
    },
    closeModalAndReSearch() {
      this.closeModal(); // close model
      this.search(); // reload data
    },
  }
};