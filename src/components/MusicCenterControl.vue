<template>
  <div>
    <div class="tA-c">
      <button class="btn custom-button" :class="buttonClass">
        <span :class="['iconfont', playTypeClass]"></span>
      </button>
      <button class="btn custom-button" :class="buttonClass" @click="songChange(-1)">
        <span class="iconfont icon-zuobofang"></span>
      </button>
      <button class="btn custom-button custom-button-play vA-t" :class="buttonClass" @click="playHandle">
        <span class="iconfont" :class="playing ? 'icon-zanting' : 'icon-weibiaoti--'"></span>
      </button>
      <button class="btn custom-button" :class="buttonClass" @click="songChange(1)">
        <span class="iconfont icon-youbofang"></span>
      </button>
      <button class="btn custom-button volume-button" :class="buttonClass">
        <span class="iconfont icon-shengyin"></span>
        <div class="volume-panel">
          <ControllableProgressbar
            class="volume-progress-wrap"
            progressbarClass="volume-progressbar"
            progressClass="volume-progress"
            progressHeadClass="volume-progress-head"
            :y="true"
            :yReverse="true"
            :widthPercent="1"
            :heightPercent="volume"
            @move="volumeMove"
            @finish="volumeMove"
          />
          <span class="d-iB w-100 mT-1R custom-span">{{ Math.round(volume * 100) }}%</span>
          <span class="d-iB w-100 iconfont icon-shengyin custom-span mT_5rem"></span>
        </div>
      </button>
    </div>
  </div>
</template>

<script>
import { mapState, mapGetters, mapMutations } from "vuex";
import { PLAY_TYPE } from "../constant-poll.js";
import ControllableProgressbar from "./ControllableProgressbar.vue";

export default {
  inject: ["audio", "safePlay"],
  components: {
      ControllableProgressbar
  },
  props: {
    buttonClass: [String, Array]
  },
  data() {
    return {
      volume: this.audio.volume
    };
  },
  computed: {
    ...mapState([
      "currentSongSheet",
      "currentSongIndex",
      "playing",
      "playType",
      "ended"
    ]),
    ...mapGetters(["currentSong"]),
    playTypeClass() {
      switch (this.playType) {
        case PLAY_TYPE.RANDOM:
          return "icon-suiji";
        default:
          return "";
      }
    }
  },
  methods: {
    ...mapMutations(["loadCurrentSongIndex", 'randomPlay']),
    songChange() {
      switch (this.playType) {
        case PLAY_TYPE.RANDOM:
          this.randomPlay();
          break;
      }
    },
    playHandle() {
      if (this.playing) this.audio.pause();
      else this.safePlay();
    },
    volumeMove({ heightPercent }) {
      this.volume = heightPercent;
    }
  },
  watch: {
      volume(v) {
      this.audio.volume = v;
    }
  }
};
</script>

<style lang="scss" scoped>
::v-deep {
  .volume-progress {
    background-color: var(--color2);
  }
  .volume-progress-wrap {
    padding: 0px 5px;
  }
  .volume-progressbar {
    width: 3px;
    height: 150px;
    margin: auto;
  }
  .custom-span {
    color: #000;
  }
  .volume-progress-head {
    position: absolute;
    width: 15px;
    height: 15px;
    background-color: var(--color2);
    border-radius: 50%;
    top: 100%;
    left: 50%;
    transform: translate(-50%, -50%);
  }
}
.custom-button {
  width: 45px;
  height: 45px;
  border-radius: 50%;
  font-size: 16px;
  position: relative;
}
.custom-button:not(.custom-button-play):hover > span {
  color: var(--color2);
}
.custom-button-play {
  background-color: var(--color2);
  color: #fff;
  font-size: 25px;
}
.volume-button:focus {
  .volume-panel {
    opacity: 1;
    pointer-events: auto;
    width: 80px;
    padding: 20px 15px 15px;
  }
}
.volume-panel {
  pointer-events: none;
  opacity: 0;
  width: 0px;
  text-align: center;
  position: absolute;
  bottom: 100%;
  left: 50%;
  transform: translateX(-50%);
  border: 1px solid #d3d3d3;
  border-radius: 10px;
  background-color: rgb(255, 255, 255);
  z-index: 1;
  margin-bottom: 10px;
  transition: all 0.2s;
}
.volume-panel:after {
  content: "";
  position: absolute;
  border: 15px solid transparent;
  border-top-color: rgb(173, 173, 173);
  border-bottom: 0;
  top: calc(100% + 1px);
  left: 50%;
  transform: translateX(-50%);
}
.volume-panel:before {
  content: "";
  position: absolute;
  border: 15px solid transparent;
  border-top-color: rgb(255, 255, 255);
  border-bottom: 0;
  top: 100%;
  left: 50%;
  transform: translateX(-50%);
  z-index: 1;
}
</style>