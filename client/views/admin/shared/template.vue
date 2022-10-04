<template>
  <div>
    <HeaderView></HeaderView>
    <router-view />
  </div>
</template>

<script>
import HeaderView from "../../shared/HeaderView.vue";
export default {
  name: "App",
  components: {
    HeaderView: HeaderView,
  },
};
</script>
