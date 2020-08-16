<template>
  <div @onmousedown="mousedownHandle">
    <div class="progress-bar">
      <div class="progress" :style="percent"></div>
    </div>
  </div>
</template>

<script>
let lock = false;

export default {
  data() {
    return {
      timer: null,
      currentTime: 0,
      duration: 0,
    };
  },
  props: {
    widthPercent: {
      type: Number,
    },
    heightPercent: {
      type: Number,
    },
  },
  computed: {
    percent() {
      return {
        width: this.convert(this.widthPercent),
        height: this.comvert(this.heightPercent),
      };
    },
  },
  methods: {
    convert(percent) {
      return percent * 100 + "%";
    },
    mousedownHandle(event) {
      lock = true;
      clearInterval(this.timer);
      this.timer = null;
      let percent = this.computePercent(
        event.pageX,
        this.progressOffset.x,
        this.$refs.progress.offsetWidth
      );
      this.percent = percent;
      document.body.addEventListener("mousemove", this.mousemoveHandle);
      document.body.addEventListener("mouseup", this.mouseupHandle, {
        once: true,
      });
    },
  },
};
</script>

<style scoped>
.progress-bar {
  background-color: #f0f0f0;
  height: 100%;
  width: 100%;
}
.progress {
  background-color: rgb(60, 255, 0);
}
</style>