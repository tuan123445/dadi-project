<template>
  <main>
    <ProjectManagementComponent
      :isManager="false"
      :title="'Project Submit'"
      :pageAPI="'projectSubmit'"
    ></ProjectManagementComponent>
  </main>
</template>

<script>
import ProjectManagementComponent from "../../components/projectManagementCom/ProjectManagementComponent.vue";
export default {
  components: {
    ProjectManagementComponent: ProjectManagementComponent,
  },
};
</script>
