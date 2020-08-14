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
    ...mapMutations(['changePlaying'])
  },
  watch: {
    currentSong: {
      immediate: true,
      handler() {
        this.audio.src = this.currentSong.url;
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
  }
}
</script>

<style>
@import './assets/css/index.css';
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
}
</style>
