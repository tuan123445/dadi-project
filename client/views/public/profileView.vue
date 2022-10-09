<template>
  <div class="profile">
    <div class="wrap">
      <div class="logOut-btn">
        <el-button type="primary" @click="backToHome()">
          <i class="mdi mdi-arrow-left"></i>
          Back to Home
        </el-button>
        <el-button type="info" @click="logOut()">
          <i class="mdi mdi-logout-variant"></i>
          Log out
        </el-button>
      </div>
      <el-card class="box-card">
        <div class="top-right-logo">
          <img src="../../assets/img/dadilogofinal.png" alt="" />
        </div>
        <div class="box-card-title">
          <div>
            <FontChangeCom :text="'Profile'" :id="'profile'"></FontChangeCom>
          </div>
        </div>
        <hr />
        <div class="box-card-body">
          <el-form :ref="modal.formName" :model="modal.formData">
            <el-row>
              <el-col
                :span="6"
                class="m-2"
                style="margin-left: unset !important"
              >
                <el-form-item label="ID Discord" prop="id_discord">
                  <el-input
                    :placeholder="defaultValue.id_discord"
                    v-model="modal.formData.id_discord"
                  ></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="6" class="m-2">
                <el-form-item label="Name" prop="user_name">
                  <el-input
                    :placeholder="defaultValue.user_name"
                    v-model="modal.formData.user_name"
                  ></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="6" class="m-2">
                <el-form-item label="Role" prop="role">
                  <el-input
                    :placeholder="defaultValue.role"
                    v-model="modal.formData.role"
                  ></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="2" class="m-2">
                <el-form-item label="Sugars" prop="sugar_balance">
                  <span class="ms-3">{{ defaultValue.sugar_balance }}</span>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="12">
                <el-form-item label="Email" prop="user_email">
                  <el-input
                    :placeholder="defaultValue.user_email"
                    v-model="modal.formData.user_email"
                  ></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="24">
                <el-form-item label="Wallet" prop="wallet_address">
                  <el-input
                    :placeholder="defaultValue.wallet_address"
                    v-model="modal.formData.wallet_address"
                  ></el-input>
                </el-form-item>
              </el-col>
            </el-row>
          </el-form>
          <div class="">
            <div class="mb-2">Projects</div>
            <el-table
              :data="tableData"
              border
              style="width: 100%"
              height="300px"
            >
              <el-table-column
                prop="projectId"
                label="Id"
                width="50"
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
              <el-table-column prop="projectLeader" label="Leader" width="120">
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
              >
                <template v-slot="scope">
                  {{ scope.row.dateCreated }}
                </template>
              </el-table-column>
              <el-table-column
                prop="dateUpdated"
                label="Date Updated"
                width="120"
              >
                <template v-slot="scope">
                  {{ scope.row.dateUpdated }}
                </template>
              </el-table-column>
            </el-table>
          </div>
        </div>
        <div class="box-card-footer">
          <el-button type="success" @click="handleConfirm()">
            <i class="mdi mdi-content-save"></i>
            Submit Change
          </el-button>
        </div>
      </el-card>
    </div>
  </div>
</template>
<script>
import FontChangeCom from "../../components/ApeironFontChangeCom.vue";
import Api from "../../api/index";
import helper from "../../core/helper";

export default {
  components: {
    FontChangeCom: FontChangeCom,
  },
  created() {
    Api.users
      // .getById({ user_id: this.$store.state.user_info.user_id })
      .getById({ user_id: "4syO6" })
      .then((rs) => {
        this.defaultValue = rs[0];
        // this.defaultValue.user_email = this.$store.state.user_info.user_email;
      });
  },
  data() {
    return {
      api: "users",
      modal: {
        formName: "modalForm",
        editMode: true,
        formModel: {},
        formData: {},
      },
      user_id: "4syO6",
      defaultValue: {},
      tableData: [
        {
          projectId: 1,
          projectName: "Fanpage",
          projectDetail: "A vietnamese fanpage about Apeiron",
          category: "fanpage",
          projectLeader: "Eric",
          status: 1,
          dateCreated: "2022-08-30",
          dateUpdated: "2022-08-30",
        },
      ],
    };
  },
  methods: {
    backToHome() {
      this.$router.push({ name: "admin" });
    },
    logOut() {
      Api.login.logOut().then(() => {
        this.$router.push({ name: "login" });
      });
    },
    handleConfirm() {
      helper
        .validateForm(
          this.$refs[this.modal.formName],
          "Do you want to update the data?"
        )
        .then(() => {
          // Call api method
          Api[this.api].updateData(this.modal.formData).then(() => {
            console.log("done");
          });
        });
    },
  },
};
</script>
<style lang="scss" scoped>
@media (min-width: 200px) {
  .wrap {
    width: 95%;
  }
}
@media (min-width: 400px) {
  .wrap {
    width: 85%;
  }
}
@media (min-width: 768px) {
  .wrap {
    width: 75%;
  }
}
@media (min-width: 900px) {
  .wrap {
    width: 60%;
  }
}
@media (min-width: 1400px) {
  .wrap {
    width: 50%;
  }
}

.el-card {
  overflow: unset !important;
}
.profile {
  width: 100%;
  height: 100%;
  position: relative;
  display: flex;

  .wrap {
    margin: 100px auto 0 auto;
    position: relative;
  }

  .logOut-btn {
    position: absolute;
    top: -50px;
  }

  .box-card {
    box-shadow: 0px 0px 5px 3px #888888;

    .box-card-title {
      width: 100%;
      font-size: 30px;
      padding-bottom: 50px;
    }

    .top-right-logo,
    .top-middle-logo {
      position: relative;
    }

    .top-right-logo {
      img {
        top: -70px;
        right: -70px;
        position: absolute;
        width: 100px;
      }
    }

    .top-middle-logo {
      img {
        position: absolute;
        top: -60px;
        left: -20px;
        width: 250px;
      }
    }

    .sugar-input {
      .el-input__wrapper {
        padding: 1px 0px !important;
      }
    }

    .box-card-footer {
      margin: 20px 0px;
      text-align: right;
    }
  }
}
</style>
