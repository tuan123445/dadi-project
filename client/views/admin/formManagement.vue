<template>
  <main>
    <FormManagementComponent
      :isManager="true"
      :title="'Form Management'"
    ></FormManagementComponent>
  </main>
</template>

<script>
import FormManagementComponent from "../../components/formComponent/formComponent.vue";
export default {
  components: {
    FormManagementComponent: FormManagementComponent,
  },
};
</script>
