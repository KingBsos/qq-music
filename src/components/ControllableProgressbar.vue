<template>
  <div @mousedown="mousedownHandle">
    <div ref="progress" :class="['progressbar', progressbarClass, yReverse ? 'reverse' : '']">
      <div :class="['progress', progressClass]" :style="percentStyle">
        <div :class="[progressHeadClass]"></div>
      </div>
    </div>
  </div>
</template>

<script>
import { realOffset } from "../utils/index.js";

export default {
  data() {
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
    yReverse: {
      type: Boolean,
      default: false,
    },
    widthPercent: {
      type: Number,
      default: 0,
    },
    heightPercent: {
      type: Number,
      default: 0,
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
      this.computeAllPercent(event.pageX, event.pageY, (data) =>
        this.$emit("move", data)
      );
    },
    mouseupHandle() {
      this.self = false;
      document.body.removeEventListener("mousemove", this.mousemoveHandle);
      this.$emit("finish", {
        widthPercent: this.custom_widthPercent,
        heightPercent: this.custom_heightPercent,
      });
    },
    computeAllPercent(pageX, pageY, callback) {
      let Xpercent, Ypercent;
      let {x, y} = realOffset(this.$refs.progress);
      if (this.x) {
        Xpercent = this.computePercent(
          pageX,
          x,
          this.$refs.progress.offsetWidth
        );
        this.custom_widthPercent = Xpercent;
      }
      if (this.y) {
        if (this.yReverse) {
          let height = this.$refs.progress.offsetHeight;
          Ypercent = this.computePercent(
            pageY,
            y + height,
            height,
            true
          );
        } else {
          Ypercent = this.computePercent(
            pageY,
            y,
            this.$refs.progress.offsetHeight
          );
        }
        this.custom_heightPercent = Ypercent;
      }
      if (callback)
        callback({
          widthPercent: Xpercent,
          heightPercent: Ypercent,
        });
    },
    computePercent(x, ox, width, bool) {
      if (bool) {
        let tx = ox - x;
        if (tx < 0) return 0;
        if (tx > width) return 1;
        return tx / width;
      } else {
        let tx = x - ox;
        if (tx < 0) return 0;
        if (tx > width) return 1;
        return tx / width;
      }
    },
  }
};
</script>

<style scoped>
.progressbar {
  background-color: #bebebe;
  height: 100%;
  width: 100%;
}
.progress {
  position: relative;
}
.reverse {
  transform: rotate(180deg);
}
</style>