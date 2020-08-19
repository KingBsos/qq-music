<template>
  <div>
    <ControllableProgressbar
      class="progress-wrap"
      :class="playing ? '' : 'paused'"
      progressbarClass="music-progress-bar"
      progressClass="music-progress"
      progressHeadClass="music-progress-bar-head"
      :x="true"
      @start="start"
      @finish="finish"
      :widthPercent="percent"
      :heightPercent="1"
    />
  </div>
</template>

<script>
import { mapState } from "vuex";
import ControllableProgressbar from "./ControllableProgressbar.vue";

let lock = false;

export default {
  inject: ["audio", "safePlay"],
  data() {
    return {
      timer: null,
      currentTime: 0,
      duration: 0
    };
  },
  computed: {
    ...mapState(["playing"]),
    percent() {
      if (this.duration === 0) return 0;
      else return this.currentTime / this.duration;
    }
  },
  methods: {
    playingHandle() {
      this.timer = setInterval(() => {
        if (!lock) {
          this.currentTime = this.audio.currentTime;
          this.duration = this.audio.duration;
        }
      }, 100);
    },
    start() {
      lock = true;
      clearInterval(this.timer);
      this.timer = null;
    },
    finish({ widthPercent }) {
      lock = false;
      this.audio.currentTime = this.duration * widthPercent;
      this.currentTime = this.duration * widthPercent;
      this.playingHandle();
      this.safePlay();
    }
  },
  watch: {
    playing: {
      immediate: true,
      handler(v) {
        if (v) {
          this.playingHandle();
        } else {
          clearInterval(this.timer);
          this.timer = null;
        }
      }
    },
    currentSong() {
      this.currentTime = 0;
      this.duration = 0;
    }
  },
  components: {
    ControllableProgressbar
  }
};
</script>

<style lang="scss" scoped>
::v-deep {
  .progress-wrap {
    cursor: pointer;
    position: absolute;
    top: -10px;
    width: 100%;
    padding: 10px 0 5px;
    transform: translateY(-50%);
    &:hover {
      .music-progress-bar-head {
        display: inline-block;
      }
    }
  }
  .music-progress-bar {
    height: 2px;
    background-color: #dadada;
  }
  .music-progress {
    background-color: var(--color2);
  }
  .paused {
    pointer-events: none;
  }
  .music-progress-bar-head {
    display: none;
    position: absolute;
    right: 0;
    top: 50%;
    width: 10px;
    height: 10px;
    border-radius: 50%;
    background-color: var(--color2);
    transform: translate(50%, -50%);
  }
}
</style>