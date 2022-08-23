<template>
  <div class="exchange-font">
    <div
      class="text-wrapper"
      @mouseover="unchangedText()"
      @mouseleave="changedText()"
    >
      <div class="unchanged-text" :id="id + 'unchanged'">{{ text }}</div>
      <div class="changed-text" :id="id">{{ text }}</div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    text: {
      type: String,
      default: () => "",
    },
    id: {
      type: String,
      default: () => "",
    },
  },
  data() {
    return {};
  },
  methods: {
    unchangedText() {
      document.getElementById(this.id).style.opacity = 0;
      document.getElementById(this.id + "unchanged").style.opacity = 1;
    },
    changedText() {
      document.getElementById(this.id).style.opacity = 1;
      document.getElementById(this.id + "unchanged").style.opacity = 0;
    },
  },
};
</script>

<style lang="scss" scoped>
.exchange-font {
  position: relative;
  width: 100%;

  .text-wrapper {
    position: relative;

    .unchanged-text,
    .changed-text {
      width: fit-content;
      position: absolute;
      transition: 0.7s;
    }

    .unchanged-text {
      opacity: 0;
    }

    .changed-text {
      font-family: Apeiron;
      font-size: 40px;
      opacity: 1;
    }
  }
}
</style>
