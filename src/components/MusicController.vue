<template>
  <div>
    <div class="tA-c po-relative pT-1R">
      <div class="po-relative mX-1R">
        <div v-show="currentSong.name" class="left tA-l vA-t_ mL-1R">
          <img class="poster mR-_5R" :src="currentSong.poster" />
          <div class="song-name-wrap d-iB h-100">
            <h3
              class="song-name mB-_5R text-overflow"
              :title="currentSong.name + ' ー ' + currentSong.singer"
            >
              {{ currentSong.name }}
              <small>{{ currentSong.singer }}</small>
            </h3>
            <span
              class="fW-9 iconfont mR-1R"
              :class="[currentSong.like ? 'icon-xihuan1 color-red' : 'icon-xihuan']"
            ></span>
            <span class="fW-9 iconfont icon-xiazai mR-1R"></span>
            <span class="fW-9 iconfont icon-list"></span>
          </div>
        </div>
        <div class="d-iB vA-m_">
          <button class="btn custom-button">
            <span :class="['iconfont', playTypeClass]"></span>
          </button>
          <button class="btn custom-button" @click="songChange(-1)">
            <span class="iconfont icon-zuobofang"></span>
          </button>
          <button class="btn custom-button custom-button-play" @click="playHandle">
            <span class="iconfont" :class="playing ? 'icon-zanting' : 'icon-weibiaoti--'"></span>
          </button>
          <button class="btn custom-button" @click="songChange(1)">
            <span class="iconfont icon-youbofang"></span>
          </button>
          <button class="btn custom-button volume-button">
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
              <span class="d-iB w-100 mT-1R">{{ Math.round(volume * 100) }}%</span>
              <span class="d-iB w-100 iconfont icon-shengyin"></span>
            </div>
          </button>
        </div>
        <div class="right mR-1R vA-m_">
          <span>{{ currentTime | timeFormat }}</span> /
          <span>{{ duration | timeFormat }}</span>
          <span class="pX-_5R">词</span>
          <button class="btn fS-1_25R">
            <span class="iconfont icon-yinleliebiao-"></span>
            <span>{{ currentSongSheet.length }}</span>
          </button>
        </div>
      </div>
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
  </div>
</template>

<script>
import { mapState, mapGetters, mapMutations } from "vuex";
import { PLAY_TYPE } from "../constant-poll.js";
import ControllableProgressbar from "./ControllableProgressbar.vue";

let lock = false;

export default {
  inject: ["audio", "safePlay"],
  data() {
    console.log(this.audio.volume);
    return {
      timer: null,
      currentTime: 0,
      duration: 0,
      volume: this.audio.volume,
    };
  },
  computed: {
    ...mapState([
      "currentSongSheet",
      "currentSongIndex",
      "playing",
      "playType",
      "ended",
    ]),
    ...mapGetters(["currentSong"]),
    playTypeClass() {
      switch (this.playType) {
        case PLAY_TYPE.RANDOM:
          return "icon-suiji";
        default:
          return "";
      }
    },
    percent() {
      if (this.duration === 0) return 0;
      else return this.currentTime / this.duration;
    },
  },
  methods: {
    ...mapMutations(["loadCurrentSongIndex"]),
    playHandle() {
      if (this.playing) this.audio.pause();
      else this.safePlay();
    },
    playingHandle() {
      this.timer = setInterval(() => {
        if (!lock) {
          this.currentTime = this.audio.currentTime;
          this.duration = this.audio.duration;
        }
      }, 1000);
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
    },
    volumeMove({ heightPercent }) {
      this.volume = heightPercent;
    },
    randomPlay() {
      let index;
      do {
        index = Math.round(Math.random() * (this.currentSongSheet.length - 1));
      } while (index === this.currentSongIndex);
      this.loadCurrentSongIndex(index);
    },
    songChange() {
      switch (this.playType) {
        case PLAY_TYPE.RANDOM:
          this.randomPlay();
          break;
      }
    },
  },
  filters: {
    timeFormat(s) {
      if (isNaN(s)) s = 0;
      let min = Math.round(s / 60);
      let sec = Math.round(s % 60);
      min = min < 10 ? "0" + min : min;
      sec = sec < 10 ? "0" + sec : sec;
      return `${min}:${sec}`;
    },
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
      },
    },
    currentSong() {
      this.currentTime = 0;
      this.duration = 0;
    },
    ended(v) {
      if (v) {
        this.randomPlay();
      }
    },
    volume(v) {
      this.audio.volume = v;
    },
  },
  components: {
    ControllableProgressbar,
  },
};
</script>

<style lang="scss" scoped>
::v-deep {
  .progress-wrap {
    overflow: hidden;
    position: absolute;
    top: 0;
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
    height: 3px;
    background-color: #dadada;
  }
  .music-progress,
  .volume-progress {
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
  .volume-progress-wrap {
    padding: 0px 5px;
  }
  .volume-progressbar {
    width: 3px;
    height: 150px;
    margin: auto;
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
.left,
.right {
  position: absolute;
  top: 0;
  bottom: 0;
}
.left {
  width: 40%;
  left: 0;
}
.poster {
  height: 100%;
  border-radius: 7px;
}
.song-name {
  font-size: 14px;
  line-height: 1.3;
  small {
    color: #666;
  }
}
.song-name-wrap {
  white-space: nowrap;
  width: 70%;
}
.right {
  right: 0;
  width: 20%;
}
.custom-button {
  width: 45px;
  height: 45px;
  border-radius: 50%;
  font-size: 16px;
  line-height: 45px;
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
  content: '';
  position: absolute;
  border: 15px solid transparent;
  border-top-color: rgb(173, 173, 173);
  border-bottom: 0;
  top: calc(100% + 1px);
  left: 50%;
  transform: translateX(-50%);
}
.volume-panel:before {
  content: '';
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