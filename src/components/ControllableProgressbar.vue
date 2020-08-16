<template>
  <div @mousedown="mousedownHandle">
    <div ref="progress" class="progress-bar" :class="progressbarClass">
      <div class="progress" :class="progressClass" :style="percentStyle">
        <div :class="progressHeadClass"></div>
      </div>
    </div>
  </div>
</template>

<script>
import { realOffset } from "../utils/index.js";

export default {
  data() {
    console.log(this)
    return {
      self: false,
      custom_widthPercent: this.widthPercent,
      custom_heightPercent: this.heightPercent,
    };
  },
  props: {
    x: {
      type: Boolean,
      default: false,
    },
    y: {
      type: Boolean,
      default: false,
    },
    widthPercent: {
      type: Number,
      default: 0
    },
    heightPercent: {
      type: Number,
      default: 0
    },
    progressbarClass: [String, Array],
    progressClass: [String, Array],
    progressHeadClass: [String, Array],
  },
  computed: {
    percentStyle() {
      if (this.self)
        return {
          width: this.convert(this.custom_widthPercent),
          height: this.convert(this.custom_heightPercent),
        };
      else
        return {
          width: this.convert(this.widthPercent),
          height: this.convert(this.heightPercent),
        };
    },
  },
  methods: {
    convert(percent) {
      return percent * 100 + "%";
    },
    mousedownHandle(event) {
      this.self = true;
      this.$emit("start");
      this.computeAllPercent(event.pageX, event.pageY);
      document.body.addEventListener("mousemove", this.mousemoveHandle);
      document.body.addEventListener("mouseup", this.mouseupHandle, {
        once: true,
      });
    },
    mousemoveHandle(event) {
      this.computeAllPercent(event.pageX, event.pageY);
    },
    mouseupHandle() {
      this.self = false;
      document.body.removeEventListener("mousemove", this.mousemoveHandle);
      this.$emit("finish", {
        widthPercent: this.custom_widthPercent,
        heightPercent: this.custom_heightPercent,
      });
    },
    computeAllPercent(pageX, pageY) {
      if (this.x) {
        let Xpercent = this.computePercent(
          pageX,
          this.progressOffset.x,
          this.$refs.progress.offsetWidth
        );
        this.custom_widthPercent = Xpercent;
      }
      if (this.y) {
        let Ypercent = this.computePercent(
          pageY,
          this.progressOffset.y,
          this.$refs.progress.offsetHeight
        );
        this.custom_heightPercent = Ypercent;
      }
    },
    computePercent(x, ox, width) {
      let tx = x - ox;
      if (tx < 0) return 0;
      return tx / width;
    },
  },
  mounted() {
    let progress = this.$refs.progress;
    this.progressOffset = realOffset(progress);
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
  position: relative;
  background-color: rgb(60, 255, 0);
}
</style>