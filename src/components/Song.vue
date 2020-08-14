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
              <tr v-for="(item, index) in likeSongSheet" :key="index">
                <td>
                  <div class="song-name">{{ item.name }}</div>
                  <div class="option-panel">
                    <button @click="songSheetPlay(likeSongSheet, index)">播放</button>
                  </div>
                </td>
                <td>
                  {{ item.singer }}
                </td>
                <td>
                  {{ item.album }}
                </td>
              </tr>
            </tbody>
          </table>
      </div>
  </div>
</template>

<script>
import { mapState, mapActions, mapMutations } from 'vuex';

export default {
  inject: ['audio'],
  computed: {
    ...mapState('user', ['likeSongSheet'])
  },
  methods: {
    ...mapActions('user', ['getLikeSong']),
    ...mapMutations(['loadCurrentSongSheet', 'loadCurrentSongIndex']),
    songSheetPlay(sheet, index) {
      this.loadCurrentSongSheet(sheet);
      this.loadCurrentSongIndex(index);
      this.$nextTick(() => {
        this.audio.play();
      });
    }
  },
  created() {
    this.getLikeSong('music');
  }
}
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
  th, td {
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
  td:first-child:hover{
    .song-name {
      width: 70%;
    }
    .option-panel{
      display: inline-block;
    }
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
  width: 30%;
}
</style>