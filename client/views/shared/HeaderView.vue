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
          <el-menu-item :index="item.name">
            <RouterLink :to="item.name" style="text-decoration: unset">
              {{ item.meta.name }}
            </RouterLink>
          </el-menu-item>
        </template>
      </el-menu>
    </div>
    <div class="sign-out-btn">
      <el-button type="info" @click="signOut()">sign out</el-button>
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
    };
  },
  methods: {
    handleSelect() {},
    getMenuList() {
      var router = this.$router.options.routes;
      router[2].children.forEach((item) => {
        this.menuItemList.push(item);
      });
    },
    signOut() {
      this.$router.push("/login");
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
