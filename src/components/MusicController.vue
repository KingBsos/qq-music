<template>
  <div>
    <ControllableProgressbarEventually class="h-100" #default="{currentTime, duration}">
      <div class="d-f jC-sB aI-c h-100">
        <div class="left-wrap">
          <router-link class="poster" to="/fullscreenplaypanel">
            <img class="h-100 p_5rem br15px" :src="currentSong.poster" />
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
        <MusicCenterControl class="f1" />
        <div class="right-wrap">
          <CurrentTimePanel class="d-iB hidden1" :currentTime="currentTime" :duration="duration" />
          <span class="pX-_5R hidden1">词</span>
          <MusicListControl :number="currentSongSheet.length" />
        </div>
      </div>
    </ControllableProgressbarEventually>
  </div>
</template>

<script>
import { mapState, mapGetters, mapMutations } from "vuex";
import ControllableProgressbarEventually from "./ControllableProgressbarEventually.vue";
import MusicCenterControl from "./MusicCenterControl.vue";
import CurrentTimePanel from "./CurrentTimePanel.vue";
import MusicListControl from "./MusicListControl.vue";

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
    CurrentTimePanel,
    MusicListControl
  }
};
</script>

<style lang="scss" scoped>
.left-wrap {
  width: 33.333%;
  height: 100%;
  position: relative;
  padding-left: 65px;
  display: flex;
  align-items: center;
  overflow: hidden;
}
.right-wrap {
  width: 33.333%;
  text-align: right;
  overflow: hidden;
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
@media screen and (max-width: 700px) {
  .left-wrap {
    width: 0;
    margin-right: -15px;
  }
  .right-wrap {
    width: auto;
    .hidden1 {
      display: none;
    }
  }
}
</style>