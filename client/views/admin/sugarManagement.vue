<template>
  <main>
    <SugarComponent
      :title="'Sugar Management'"
      :isManager="true"
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
