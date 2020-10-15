<template>
  <div>
    <div>
      <table class="table">
        <thead>
          <tr>
            <th>歌曲</th>
            <th class="hidden2">歌手</th>
            <th class="hidden1">专辑</th>
          </tr>
        </thead>
        <tbody>
          <tr
            :class="[item.name == currentSong.name ? 'active-song' : '']"
            v-for="(item, index) in likeSongs"
            :key="item.id"
          >
            <td>
              <div class="d-f">
                <span
                  :class="['iconfont', 'like-button vA-m_', 'mr_5rem', item.like ? 'color-red icon-xihuan1' : 'icon-xihuan']"
                  @click="deleteSong(item.id)"
                ></span>
                <div class="left-panel">
                  <div class="song-name vA-m_">{{ item.name }}</div>
                </div>
                <div class="option-panel vA-m_">
                  <button class="btn" @click="songSheetPlay(likeSongs, index)">
                    <span class="iconfont icon-weibiaoti--"></span>
                  </button>
                  <button class="btn mX-_25R">
                    <span class="iconfont icon-tianjia"></span>
                  </button>
                  <button class="btn mR-_25R">
                    <span class="iconfont icon-xiazai"></span>
                  </button>
                  <button class="btn">
                    <span class="iconfont icon-caidan"></span>
                  </button>
                </div>
              </div>
            </td>
            <td class="TO hidden2">{{ item.singer }}</td>
            <td class="TO hidden1">{{ item.album.name }}</td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script>
import { mapState, mapGetters, mapActions, mapMutations } from "vuex";

export default {
  inject: ["audio", "safePlay"],
  computed: {
    ...mapState("user", ["likeSongSheet"]),
    ...mapGetters('user/iLikeData', ['likeSongs']),
    ...mapGetters(["currentSong"])
  },
  methods: {
    ...mapMutations(["loadCurrentSongSheet", "loadCurrentSongIndex"]),
    ...mapActions('user/iLikeData', ['fetchSong', 'deleteSong']),
    songSheetPlay(sheet, index) {
      this.loadCurrentSongSheet(sheet);
      this.loadCurrentSongIndex(index);
      this.safePlay();
    }
  },
  created() {
    this.fetchSong();
  }
};
</script>

<style lang="scss" scoped>
.table {
  .iconfont {
    font-size: 20px;
  }
  .like-button {
    font-size: 14px;
  }
  width: 100%;
  border-collapse: collapse;
  table-layout: fixed;
  font-size: 14px;
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
    .option-panel {
      display: inline-block;
    }
  }
  .active-song {
    color: var(--color2);
  }
}
.song-name {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  padding-right: 5px;
  overflow: hidden;
  text-overflow: ellipsis;
}
.left-panel {
  flex: 1;
  padding: 12px 0;
  position: relative;
}
.option-panel {
  display: none;
  float: right;
  text-align: right;
}
@media screen and (max-width: 500px) {
  .hidden1 {
    display: none;
  }
}
@media screen and (max-width: 430px) {
  .hidden2 {
    display: none;
  }
}
</style>