<template>
  <div class="loginPage">
    <el-card class="box-card">
      <div class="top-right-logo">
        <img src="../../assets/img/dadilogofinal.png" alt="" />
      </div>
      <div class="top-middle-logo">
        <img src="../../assets/img/small_dood_kv_lineup_left.png" alt="" />
      </div>
      <el-tabs v-model="activeName" class="demo-tabs" @tab-click="handleClick">
        <el-tab-pane label="Login" name="login">
          <div class="box-card-title">
            <div>
              <FontChangeCom :text="'Login'" :id="'login'"></FontChangeCom>
            </div>
          </div>
          <el-form :ref="modal.formName" :model="modal.formData">
            <el-form-item
              label="Email"
              prop="email"
              :rules="[$rules.required, $rules.requiredEmail]"
            >
              <el-input v-model="modal.formData.email"></el-input>
            </el-form-item>
            <el-form-item
              label="Password"
              prop="password"
              :rules="[$rules.required]"
            >
              <el-input
                v-model="modal.formData.password"
                type="password"
                show-password
              ></el-input>
            </el-form-item>
          </el-form>
          <div class="bottom-btn">
            <el-button type="primary" @click="login()">Login</el-button>
          </div>
          <div class="bottom-msg">
            If you forgot your password. Please click
            <span><a href="">here</a></span>
          </div>
        </el-tab-pane>
        <el-tab-pane label="Sign In" name="signin">
          <div class="box-card-title">
            <div>
              <FontChangeCom :text="'Sign In'" :id="'signIn'"></FontChangeCom>
            </div>
          </div>
          <el-form :ref="modal.formName" :model="modal.formData">
            <el-form-item
              label="Email"
              prop="email"
              :rules="[$rules.required, $rules.requiredEmail]"
            >
              <el-input v-model="modal.formData.email"></el-input>
            </el-form-item>
            <el-form-item
              label="Password"
              prop="password"
              :rules="[$rules.required]"
            >
              <el-input
                v-model="modal.formData.password"
                type="password"
                show-password
              ></el-input>
            </el-form-item>
          </el-form>
          <div class="bottom-btn">
            <el-button type="primary" @click="signIn()">Sign In</el-button>
          </div>
        </el-tab-pane>
      </el-tabs>
    </el-card>
  </div>
</template>

<script>
import FontChangeCom from "../../components/ApeironFontChangeCom.vue";
import Api from "../../api/index";
import { helper, mixins } from "../../core/index";
export default {
  components: {
    FontChangeCom: FontChangeCom,
  },
  mixins: [mixins],
  data() {
    return {
      activeName: "login",
    };
  },
  methods: {
    login() {
      helper.validateForm(this.$refs[this.modal.formName]).then((result) => {
        if (result === false) return;
        Api.login.auth(this.modal.formData).then((rs) => {
          if (rs) this.$router.push({ name: "projectManagement" });
        });
      });
    },
    signIn() {
      helper.validateForm(this.$refs[this.modal.formName]).then((result) => {
        if (result === false) return;
        Api.login.signIn(this.modal.formData).then((rs) => {});
      });
    },
    handleClick() {
      this.modal.formData = helper.clearData(this.modal.formData);
    },
  },
};
</script>

<style lang="scss" scoped>
@media (min-width: 200px) {
  .box-card {
    width: 80%;
  }
  .top-middle-logo {
    img {
      display: none;
    }
  }
}
@media (min-width: 400px) {
  .box-card {
    width: 70%;
  }

  .top-middle-logo {
    img {
      display: block;
    }
  }
}
@media (min-width: 768px) {
  .box-card {
    width: 50%;
  }
}
@media (min-width: 900px) {
  .box-card {
    width: 40%;
  }
}
@media (min-width: 1400px) {
  .box-card {
    width: 20%;
  }
}

.el-card {
  overflow: unset !important;
}

.box-card {
  box-shadow: 0px 0px 5px 3px #888888;

  .box-card-title {
    width: 100%;
    font-size: 30px;
    padding-bottom: 100px;
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

  .bottom-msg {
    margin-top: 30px;
    font-size: 13px;
  }

  .bottom-btn {
    width: 100%;
    text-align: left;
  }
}
</style>
