<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>

<script>
import { mapGetters, mapMutations } from 'vuex';

export default {
  name: 'App',
  data() {
    return {
      audio: document.createElement('audio')
    }
  },
  provide() {
    return {
      audio: this.audio
    }
  },
  computed: {
    ...mapGetters(['currentSong'])
  },
  methods: {
    ...mapMutations(['changePlaying', 'changeEnded'])
  },
  watch: {
    currentSong: {
      immediate: true,
      handler() {
        this.audio.src = this.currentSong.url;
        this.audio.oncanplay = function() {
          this.play();
        }
      }
    }
  },
  created() {
    this.audio.onplay = () => {
      this.changePlaying(true);
      this.changeEnded(false);
    };
    this.audio.onpause = () => {
      this.changePlaying(false);
    };
    this.audio.onended = () => {
      this.changeEnded(true);
    };
  }
}
</script>

<style>
@import './assets/css/index.css';
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
}
</style>
