<template>
  <main>
    <SugarComponent
      :title="'Sugar Request'"
      :isManager="false"
    ></SugarComponent>
  </main>
</template>

<script>
import SugarComponent from "../../components/sugarComponent/sugarComponent.vue";

export default {
  components: {
    SugarComponent: SugarComponent,
  },
};
</script>
