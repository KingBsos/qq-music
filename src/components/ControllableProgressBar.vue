<template>
  <div @onmousedown="mousedownHandle">
    <div ref="progress" class="progress-bar">
      <div class="progress" :style="percent"></div>
    </div>
  </div>
</template>

<script>
import { realOffset } from "../utils/index.js";

export default {
  data() {
    return {
      self: false,
      _widthPercent: 0,
      _heightPercent: 0,
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
    percentStyle() {
      if (this.self)
        return {
          width: this.convert(this._widthPercent),
          height: this.convert(this._heightPercent),
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
      let Xpercent = this.computePercent(
        event.pageX,
        this.progressOffset.x,
        this.$refs.progress.offsetWidth
      );
      let Ypercent = this.computePercent(
        event.pageY,
        this.progressOffset.y,
        this.$refs.progress.offsetWidth
      );
      this._widthPercent = Xpercent;
      this._heightPercent = Ypercent;
      document.body.addEventListener("mousemove", this.mousemoveHandle);
      document.body.addEventListener("mouseup", this.mouseupHandle, {
        once: true,
      });
    },
    mousemoveHandle(event) {
      let Xpercent = this.computePercent(
        event.pageX,
        this.progressOffset.x,
        this.$refs.progress.offsetWidth
      );
      let Ypercent = this.computePercent(
        event.pageY,
        this.progressOffset.y,
        this.$refs.progress.offsetHeight
      );
      this._widthPercent = Xpercent;
      this._heightPercent = Ypercent;
    },
    mouseupHandle() {
      this.self = false;
      document.body.removeEventListener("mousemove", this.mousemoveHandle);
      this.$emit("finish", {
        width: this._widthPercent,
        height: this._heightPercent,
      });
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
  background-color: rgb(60, 255, 0);
}
</style>