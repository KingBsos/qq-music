<template>
  <div>
    <div class="container" :style="{backgroundImage: `url(${dataUrl})`}">
      <div class="top">
        <div>
          <button @click="$router.back()">X</button>
        </div>
        <div></div>
      </div>
      <div class="flex-1 vA-t_">
        <div class="left">
          <img class="poster" :src="currentSong.poster" />
        </div>
        <div class="right">
          <h2>{{ currentSong.name }}</h2>
          <p>singer: {{ currentSong.singer }}</p>
          <p>album: {{ currentSong.album }}</p>
        </div>
      </div>
      <div class="footer-wrap">
        <ControllableProgressbarEventually
          progressbarClass="full-progressbar"
          #default="{currentTime, duration}"
        >
          <div class="footer">
            <CurrentTimePanel class="fS-_75R" :currentTime="currentTime" :duration="duration" />
            <div>
              <MusicCenterControl buttonClass="button-style" />
            </div>
            <div>jjj</div>
          </div>
        </ControllableProgressbarEventually>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapMutations } from "vuex";
import ControllableProgressbarEventually from "./ControllableProgressbarEventually.vue";
import MusicCenterControl from "./MusicCenterControl.vue";
import CurrentTimePanel from "./CurrentTimePanel.vue";
import { gussian } from "../utils/index.js";

export default {
  data() {
    return {
      dataUrl: ""
    };
  },
  computed: {
    ...mapGetters(["currentSong"])
  },
  methods: {
    ...mapMutations(["randomPlay"])
  },
  watch: {
    currentSong() {
      this.currentTime = 0;
      this.duration = 0;
      gussian(this.currentSong.poster).then(data => (this.dataUrl = data));
    }
  },
  components: {
    MusicCenterControl,
    CurrentTimePanel,
    ControllableProgressbarEventually
  },
  mounted() {
    gussian(this.currentSong.poster).then(data => (this.dataUrl = data));
  }
};
</script>

<style lang="scss" scoped>
.container {
  width: 100vw;
  height: 100vh;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  background-repeat: no-repeat;
  background-size: cover;
  color: #fff;
  position: relative;
  z-index: 0;
}
.top {
  display: flex;
  justify-content: space-between;
}
.container:after {
  content: "";
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  background-color: rgba(0, 0, 0, 0.2);
  z-index: -1;
}
.left,
.right {
  height: 100%;
  display: inline-flex;
  width: 50%;
  justify-content: center;
  align-items: center;
}
.right {
  flex-direction: column;
}
.poster {
  width: 50%;
}
.footer-wrap {
  padding: 10px 40px;
}
.footer {
  display: flex;
  justify-content: space-between;
}
::v-deep {
  .button-style {
    color: #fff;
  }
  .full-progressbar {
    background-color: rgba(131, 131, 131, 0.192);
  }
}
</style>