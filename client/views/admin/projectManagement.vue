<template>
  <main>
    <ProjectManagementComponent
      :isManager="true"
      :title="'Project Management'"
      :pageAPI="'projectManagement'"
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
