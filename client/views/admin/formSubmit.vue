<template>
  <main>
    <FormManagementComponent
      :isManager="false"
      :title="'Form Submit'"
      :pageAPI="'formSubmit'"
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
