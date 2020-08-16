<template>
  <div>
    <div>
      <table class="table">
        <thead>
          <tr>
            <th>歌曲</th>
            <th>歌手</th>
            <th>专辑</th>
          </tr>
        </thead>
        <tbody>
          <tr
            :class="[item.name == currentSong.name ? 'active-song' : '']"
            v-for="(item, index) in likeSongSheet"
            :key="index"
          >
            <td class="vA-m_">
              <span :class="['iconfont', 'pX-_5R', item.like ? 'color-red icon-xihuan1' : 'icon-xihuan']"></span>
              <div class="song-name p-_25R">{{ item.name }}</div>
              <div class="option-panel">
                <button class="fS-1_25R btn" @click="songSheetPlay(likeSongSheet, index)">
                  <span class="iconfont icon-weibiaoti--"></span>
                </button>
                <button class="fS-1_25R btn mX-_25R">
                  <span class="iconfont icon-tianjia"></span>
                </button>
                <button class="fS-1_25R btn mR-_25R">
                  <span class="iconfont icon-xiazai"></span>
                </button>
                <button class="fS-1_25R btn">
                  <span class="iconfont icon-caidan"></span>
                </button>
              </div>
            </td>
            <td>{{ item.singer }}</td>
            <td>{{ item.album }}</td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script>
import { mapState, mapGetters, mapActions, mapMutations } from "vuex";

export default {
  inject: ["audio", 'safePlay'],
  computed: {
    ...mapState("user", ["likeSongSheet"]),
    ...mapGetters(["currentSong"]),
  },
  methods: {
    ...mapActions("user", ["getLikeSong"]),
    ...mapMutations(["loadCurrentSongSheet", "loadCurrentSongIndex"]),
    songSheetPlay(sheet, index) {
      this.loadCurrentSongSheet(sheet);
      this.loadCurrentSongIndex(index);
      this.safePlay();
    },
  },
  created() {
    this.getLikeSong("music");
  },
};
</script>

<style lang="scss" scoped>
.table {
  width: 100%;
  border-collapse: collapse;
  table-layout: fixed;
  color: 14px;
  tr:not(:first-child):hover {
    background-color: rgb(247, 247, 247);
  }
  th {
    font-size: 13px;
    font-weight: 300;
    text-align: left;
    color: var(-color-text-sub);
  }
  th,
  td {
    position: relative;
    padding: 10px;
    white-space: nowrap;
    line-height: 1.2;
    &:first-child {
      width: 40%;
    }
    &:not(:first-child) {
      width: 30%;
    }
  }
  td:first-child:hover {
    .song-name {
      width: 70%;
    }
    .option-panel {
      display: inline-block;
    }
  }
  .active-song {
    color: var(--color2);
  }
}
.song-name {
  display: inline-block;
  width: 100%;
  overflow: hidden;
  text-overflow: ellipsis;
}
.option-panel {
  display: none;
  float: right;
  text-align: right;
}
</style>