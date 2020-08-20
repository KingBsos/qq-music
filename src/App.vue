<template>
  <div id="app">
    <router-view></router-view>
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
    ...mapState(['playType']),
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
  font-family: Avenir, Helvetica, Arial, sans-serif;
}
</style>
