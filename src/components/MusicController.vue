<template>
  <div>
    <div class="tA-c po-relative pX-1R">
      <div v-show="currentSong.name" class="left tA-l vA-t_">
        <img class="poster mR-_5R" :src="currentSong.poster" />
        <div class="song-name-wrap d-iB h-100">
          <h3
            class="song-name mB-_5R text-overflow"
            :title="currentSong.name + ' ー ' + currentSong.singer"
          >
            {{ currentSong.name }}
            <small>{{ currentSong.singer }}</small>
          </h3>
          <span class="fW-9 iconfont icon-xihuan mR-1R"></span>
          <span class="fW-9 iconfont icon-xiazai mR-1R"></span>
          <span class="fW-9 iconfont icon-list"></span>
        </div>
      </div>
      <div class="d-iB vA-m_">
        <button class="btn custom-button">
          <span class="iconfont icon-suiji"></span>
        </button>
        <button class="btn custom-button">
          <span class="iconfont icon-zuobofang"></span>
        </button>
        <button class="btn custom-button custom-button-play" @click="playHandle">
          <span class="iconfont" :class="playing ? 'icon-zanting' : 'icon-weibiaoti--'"></span>
        </button>
        <button class="btn custom-button">
          <span class="iconfont icon-youbofang"></span>
        </button>
        <button class="btn custom-button">
          <span class="iconfont icon-shengyin"></span>
        </button>
      </div>
      <div class="right vA-m_">
        <span>{{ currentTime | timeFormat }}</span> /
        <span>{{ duration | timeFormat }}</span>
        <span>词</span>
        <span>{{ currentSongSheet.length }}</span>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState, mapGetters } from "vuex";

export default {
  inject: ["audio"],
  data() {
    return {
        timer: null,
        currentTime: 0,
        duration: 0
    };
  },
  computed: {
    ...mapState(["currentSongSheet", "currentSongIndex", "playing"]),
    ...mapGetters(["currentSong"]),
  },
  methods: {
    playHandle() {
      if (this.playing) this.audio.pause();
      else this.audio.play();
    },
    playingHandle() {
        this.timer = setInterval(() => {
            this.currentTime = this.audio.currentTime;
            this.duration = this.audio.duration;
        }, 1000);
    }
  },
  filters: {
      timeFormat(s) {
          if(isNaN(s)) s = 0;
          let min = Math.round(s / 60);
          let sec = Math.round(s % 60);
          min = min < 10 ? '0'+min : min;
          sec = sec < 10 ? '0'+sec : sec;
          return `${min}:${sec}`;
      }
  },
  watch: {
      playing: {
          immediate: true,
          handler(v) {
              if(v) {
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
  }
};
</script>

<style lang="scss" scoped>
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