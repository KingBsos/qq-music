<template>
  <div ref="div" class="container">
    <div class="pY1rem">
      <h2>播放队列</h2>
      <div class="music-num">
        <span>{{ currentSongSheet.length }}</span>首歌曲
      </div>
    </div>
    <div class="flex-1 po-relative">
      <div class="w-100 h-100 po-absolute o-a">
        <div class="music-list-item" v-for="(item, index) in currentSongSheet" :key="item.id">
          <div class="left wS-n pY_5rem">
            <h4 class="text-overflow">{{ item.name }}</h4>
            <h5 class="text-overflow music-singer">{{ item.singer }}</h5>
          </div>
          <div class="right tA-c vA-m_">
            <div class="control-panel">
              <button class="btn custom-button" @click="loadCurrentSongIndex(index)">
                <span class="iconfont icon-weibiaoti--"></span>
              </button>
              <button class="btn custom-button">
                <span class="iconfont icon-xihuan1" :class="{active: item.like}"></span>
              </button>
              <button class="btn custom-button">
                <span class="iconfont icon-dingwei"></span>
              </button>
              <button class="btn custom-button">
                <span class="iconfont icon-caidan"></span>
              </button>
            </div>
            <span class="time-panel">
              <small>00:00</small>
            </span>
          </div>
        </div>
      </div>
    </div>
    <div class="tA-r pB_5rem">
      <button class="btn" @click="$emit('close')">
        <span class="iconfont icon-yinleliebiao-"></span>收起
      </button>
    </div>
  </div>
</template>

<script>
import { mapState, mapMutations } from "vuex";
export default {
  computed: {
    ...mapState(["currentSongSheet"])
  },
  methods: {
    ...mapMutations(["loadCurrentSongIndex"]),
    documentClick(event) {
      let bool = this.$refs.div.contains(event.target);
      if (!bool) {
        this.$emit("close");
      }
    }
  },
  mounted() {
    this.$nextTick(() => {
      document.addEventListener("click", this.documentClick);
    });
  },
  beforeDestroy() {
    document.removeEventListener("click", this.documentClick);
  }
};
</script>

<style lang="scss" scoped>
.container {
  position: absolute;
  right: 0;
  top: 0;
  bottom: 0;
  width: 300px;
  background-color: #fff;
  z-index: 1000;
  padding: 15px;
  display: flex;
  flex-direction: column;
}
.music-list-item {
  display: flex;
}
.music-num {
  font-size: 14px;
  color: #999;
}
.music-singer {
  color: #999;
  font-size: 13px;
  line-height: 1.5;
}
.music-list-item:hover {
  .left {
    width: 50%;
  }
  .right {
    width: 50%;
    .control-panel {
      display: inline-block;
    }
    .time-panel {
      display: none;
    }
  }
}
.left {
  width: 80%;
}
.right {
  width: 20%;
  .control-panel {
    display: none;
    .custom-button .iconfont {
      font-size: 1.35rem;
      padding: 5px;
    }
  }
}
.iconfont.active {
  color: #f00;
}
</style>