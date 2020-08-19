<template>
  <div>
    <div class="d-f jC-sB aI-c h-100 po-relative">
      <ControllableProgressbarEventually />
      <div class="w-33 h-100 left-wrap d-f aI-c">
        <router-link class="poster" to="/fullscreenplaypanel">
          <img class="h-100" :src="currentSong.poster" />
        </router-link>
        <div class="w-100">
          <h3
            class="song-name wS-nowrap mB-_5R text-overflow"
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
      <MusicCenterControl class="w-33" />
      <div class="w-33 tA-r">
        <span>{{ currentTime | timeFormat }}</span> /
        <span>{{ duration | timeFormat }}</span>
        <span class="pX-_5R">词</span>
        <button class="btn fS-1_25R">
          <span class="iconfont icon-yinleliebiao-"></span>
          <span>{{ currentSongSheet.length }}</span>
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState, mapGetters, mapMutations } from "vuex";
import ControllableProgressbarEventually from "./ControllableProgressbarEventually.vue";
import MusicCenterControl from "./MusicCenterControl.vue";

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
    ...mapState(["currentSongSheet", "currentSongIndex", "playing", "ended"]),
    ...mapGetters(["currentSong"]),
    percent() {
      if (this.duration === 0) return 0;
      else return this.currentTime / this.duration;
    }
  },
  methods: {
    ...mapMutations(["randomPlay"]),
    playingHandle() {
      this.timer = setInterval(() => {
        if (!lock) {
          this.currentTime = this.audio.currentTime;
          this.duration = this.audio.duration;
        }
      }, 300);
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
  filters: {
    timeFormat(s) {
      if (isNaN(s)) s = 0;
      let min = Math.round(s / 60);
      let sec = Math.round(s % 60);
      min = min < 10 ? "0" + min : min;
      sec = sec < 10 ? "0" + sec : sec;
      return `${min}:${sec}`;
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
    },
    ended(v) {
      if (v) {
        this.randomPlay();
      }
    }
  },
  components: {
    ControllableProgressbarEventually,
    MusicCenterControl
  }
};
</script>

<style lang="scss" scoped>
::v-deep {
  .progress-wrap {
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
.left-wrap {
  position: relative;
  padding-left: 55px;
}
.poster {
  overflow: hidden;
  position: absolute;
  left: 0;
  height: 100%;
  border-radius: 7px;
}
.song-name {
  width: 100%;
  font-size: 13px;
  small {
    color: rgb(77, 77, 77);
  }
}
</style>