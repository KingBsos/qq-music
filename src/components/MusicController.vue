<template>
  <div>
    <ControllableProgressbarEventually class="h-100" #default="{currentTime, duration}">
      <div class="d-f jC-sB aI-c h-100 po-relative">
        <div class="w-33 h-100 left-wrap d-f aI-c">
          <router-link class="poster" to="/fullscreenplaypanel">
            <img class="h-100 p-_5R" :src="currentSong.poster" />
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
          <CurrentTimePanel class="d-iB" :currentTime="currentTime" :duration="duration"/>
          <span class="pX-_5R">词</span>
          <button class="btn fS-1_25R">
            <span class="iconfont icon-yinleliebiao-"></span>
            <span>{{ currentSongSheet.length }}</span>
          </button>
        </div>
      </div>
    </ControllableProgressbarEventually>
  </div>
</template>

<script>
import { mapState, mapGetters, mapMutations } from "vuex";
import ControllableProgressbarEventually from "./ControllableProgressbarEventually.vue";
import MusicCenterControl from "./MusicCenterControl.vue";
import CurrentTimePanel from './CurrentTimePanel.vue';

export default {
  inject: ["audio", "safePlay"],
  computed: {
    ...mapState(["currentSongSheet", "currentSongIndex", "playing", "ended"]),
    ...mapGetters(["currentSong"])
  },
  methods: {
    ...mapMutations(["randomPlay"])
  },
  components: {
    ControllableProgressbarEventually,
    MusicCenterControl,
    CurrentTimePanel
  }
};
</script>

<style lang="scss" scoped>
.left-wrap {
  position: relative;
  padding-left: 65px;
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