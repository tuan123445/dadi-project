<template>
  <div>
    <vue-cal
      class="vuecal--blue-theme"
      :events="events"
      :editable-events="{
        title: true,
        drag: true,
        resize: false,
        delete: true,
        create: true,
      }"
      events-count-on-year-view
    />
  </div>
</template>

<script>
import VueCal from "vue-cal";
import "vue-cal/dist/vuecal.css";
import Api from "../../api/index";

export default {
  components: { VueCal },
  created() {
    Api.calendar.getData({ id: 1 }).then((rs) => {
      console.log(rs);
    });
  },
  data() {
    return {
      events: [
        {
          start: "2022-08-19 10:35",
          end: "2022-08-19 11:30",
          title: "Doctor appointment",
        },
      ],
    };
  },
};
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

.vuecal {
  height: 90vh;
}
</style>
