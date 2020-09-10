<template>
  <div id="app">
    <div id="eventWrapper" class="w-100 h-100">
      <transition
        name="fullpage"
        mode="out-in"
        appear
        appear-class="fullpage-enter"
        appear-active-class="fullpage-enter-active"
      >
        <keep-alive>
          <router-view class="h-100"></router-view>
        </keep-alive>
      </transition>
      <PortalTarget name="MusicListSidebar" />
    </div>
  </div>
</template>

<script>
import { PLAY_TYPE } from "./constant-poll.js";
import { mapState, mapGetters, mapMutations } from "vuex";

export default {
  name: "App",
  data() {
    return {
      audio: document.createElement("audio")
    };
  },
  provide() {
    return {
      audio: this.audio,
      safePlay() {
        if (this.audio.readyState === 4) this.audio.play();
        else
          this.audio.oncanplay = function() {
            this.play();
          };
      }
    };
  },
  computed: {
    ...mapState(["playType"]),
    ...mapGetters(["currentSong"])
  },
  methods: {
    ...mapMutations(["changePlaying", "randomPlay"])
  },
  watch: {
    currentSong: {
      immediate: true,
      handler() {
        this.audio.src = this.currentSong.url;
        this.audio.oncanplay = function() {
          this.play();
        };
      }
    }
  },
  created() {
    this.audio.onplay = () => {
      this.changePlaying(true);
    };
    this.audio.onpause = () => {
      this.changePlaying(false);
    };
    this.audio.onended = () => {
      switch (this.playType) {
        case PLAY_TYPE.RANDOM:
          this.randomPlay();
          break;
        default:
          return "";
      }
    };
  }
};
</script>

<style>
@import "./assets/css/index.css";
#app {
  height: 100%;
  overflow: hidden;
  position: relative;
  z-index: 0;
}
#eventWrapper {
  overflow: hidden;
}
.fullpage-enter,
.fullpage-leave-to {
  transform: translateY(100%);
}
.fullpage-enter-active,
.fullpage-leave-active {
  transition: all 0.5s;
}
</style>
