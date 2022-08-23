<template>
  <div>
    <HeaderView></HeaderView>
    <router-view class="body-wrapper" />
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
