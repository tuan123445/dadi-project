<template>
  <div class="header">
    <div class="">
      <el-menu
        :default-active="activeIndex"
        mode="horizontal"
        :ellipsis="false"
        background-color="#545c64"
        text-color="#fff"
        active-text-color="#ffd04b"
        @select="handleSelect"
      >
        <template v-for="item in menuItemList" :key="item.name">
          <el-menu-item :index="item.name" v-if="!item.children">
            <RouterLink :to="item.name" style="text-decoration: unset">
              {{ item.meta.name }}
            </RouterLink>
          </el-menu-item>
          <el-sub-menu v-if="item.children" :index="item.name">
            <template #title>{{ item.meta.name }}</template>
            <template v-for="childItem in item.children" :key="childItem.name">
              <el-menu-item :index="item.children + '-' + childItem.name">
                <RouterLink
                  :to="childItem.name"
                  style="text-decoration: unset; color: #ffffff"
                >
                  {{ childItem.meta.name }}
                </RouterLink></el-menu-item
              >
            </template>
          </el-sub-menu>
        </template>
      </el-menu>
    </div>
    <div class="sign-out-btn">
      <el-dropdown @command="handleCommand">
        <span class="el-dropdown-link">
          <el-button type="info" @click="showProfile()">
            <i class="mdi mdi-account" style="margin: unset"></i>
          </el-button>
        </span>
        <template #dropdown>
          <el-dropdown-menu>
            <el-dropdown-item command="profile">
              <i class="mdi mdi-account"></i>
              Profile
            </el-dropdown-item>
            <el-dropdown-item command="logOut">
              <i class="mdi mdi-logout-variant"></i>
              Log Out
            </el-dropdown-item>
          </el-dropdown-menu>
        </template>
      </el-dropdown>
    </div>
  </div>
</template>

<script>
export default {
  created() {
    this.getMenuList();
  },
  data() {
    return {
      menuItemList: [],
      dropdown1: undefined,
    };
  },
  methods: {
    handleSelect() {},
    getMenuList() {
      var router = this.$router.options.routes;
      router[3].children.forEach((item) => {
        this.menuItemList.push(item);
      });
    },
    signOut() {
      this.$router.push("/login");
    },
    showProfile() {
      this.$router.push("/profile");
    },
    handleCommand(val) {
      if (val === "logOut") {
        this.signOut();
      } else {
        this.showProfile();
      }
    },
  },
};
</script>

<style lang="scss" scoped>
.header {
  position: relative;
  .sign-out-btn {
    position: absolute;
    top: 10px;
    right: 10px;
  }
}
</style>
