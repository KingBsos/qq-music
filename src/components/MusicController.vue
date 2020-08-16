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
          <button class="btn custom-button">
            <span class="iconfont icon-shengyin"></span>
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
  inject: ["audio", 'safePlay'],
  data() {
    return {
      timer: null,
      currentTime: 0,
      duration: 0,
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
      if(this.duration === 0) return 0;
      else return this.currentTime / this.duration;
    }
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
    randomPlay() {
      let index = Math.round(
        Math.random() * (this.currentSongSheet.length - 1)
      );
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
  },
  components: {
    ControllableProgressbar,
  },
};
</script>

<style lang="scss" scoped>
::v-deep {
  .progress-wrap {
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
    background-color: #bebebe;
  }
  .music-progress {
    background-color: var(--color2);
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
}
.custom-button-play {
  background-color: var(--color2);
  color: #fff;
  font-size: 25px;
}
</style>