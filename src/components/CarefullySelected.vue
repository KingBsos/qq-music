<template>
  <div>
    <div v-if="ready" class="container">
      <el-carousel height="150px" class="MY1rem zi0">
        <template v-if="width < 600">
          <el-carousel-item v-for="(item, index) in pageData.carouselData" :key="index">
            <div class="carousel-item-wrap">
              <div class="carousel-item">
                <img class="carousel-img" :src="item.poster" />
              </div>
            </div>
          </el-carousel-item>
        </template>
        <template v-else-if="width < 1000">
          <el-carousel-item
            v-for="(item, index) in splitArr(pageData.carouselData, 2)"
            :key="index"
          >
            <div class="carousel-item-wrap">
              <div class="carousel-item" v-for="(item2, index2) in item" :key="index2">
                <img class="carousel-img" :src="item2.poster" />
              </div>
            </div>
          </el-carousel-item>
        </template>
        <template v-else>
          <el-carousel-item
            v-for="(item, index) in splitArr(pageData.carouselData, 3)"
            :key="index"
          >
            <div class="carousel-item-wrap">
              <div class="carousel-item" v-for="(item2, index2) in item" :key="index2">
                <img class="carousel-img" :src="item2.poster" />
              </div>
            </div>
          </el-carousel-item>
        </template>
      </el-carousel>
      <BlockListDisplay
        class="mY2rem"
        :contentData="pageData.officalSongList"
        :column="column.commoly"
      >
        <template #header>
          <h1 class="title">官方歌单</h1>
        </template>
        <template #default="{name, poster}">
          <div class="card">
            <div class="card-body">
              <img class="poster" :src="poster" />
              <div class="card-control-panel">
                <button class="BTN"><span class="iconfont icon-weibiaoti-- custom-item-play-button"></span></button>
              </div>
            </div>
            <p>{{name}}</p>
          </div>
        </template>
      </BlockListDisplay>
      <BlockListDisplay
        class="mY2rem"
        :contentData="pageData.recommendedSongList"
        :column="column.commoly"
      >
        <template #header>
          <h1 class="title">推荐歌单</h1>
        </template>
        <template #default="{name, poster}">
          <div class="card">
            <div class="card-body">
              <img class="poster" :src="poster" />
              <div class="card-control-panel">
                <button class="BTN"><span class="iconfont icon-weibiaoti-- custom-item-play-button"></span></button>
              </div>
            </div>
            <p>{{name}}</p>
          </div>
        </template>
      </BlockListDisplay>
      <BlockListDisplay
        class="mY2rem"
        :contentData="pageData.recommendedVideo"
        :column="column.commoly"
      >
        <template #header>
          <h1 class="title">推荐视频</h1>
        </template>
        <template #default="{name, poster}">
          <div class="card">
            <div class="card-body">
              <img class="poster" :src="poster" />
              <div class="card-control-panel">
                <button class="BTN"><span class="iconfont icon-weibiaoti-- custom-item-play-button"></span></button>
              </div>
            </div>
            <p>{{name}}</p>
          </div>
        </template>
      </BlockListDisplay>
      <BlockListDisplay class="mY2rem" :contentData="pageData.latestIssue" :column="column.commoly">
        <template #header="{changeItem, currentItem}">
          <div class="header-title">
            <h1 class="title">最新发行</h1>
            <span
              class="newest-menu-item"
              :class="{active: currentItem === item}"
              v-for="(item, index) in Object.keys(pageData.latestIssue)"
              :key="index"
              @click="changeItem(item)"
            >{{item}}</span>
          </div>
        </template>
        <template #default="{name, poster}">
          <div class="card">
            <div class="card-body">
              <img class="poster" :src="poster" />
              <div class="card-control-panel">
                <button class="BTN"><span class="iconfont icon-weibiaoti-- custom-item-play-button"></span></button>
              </div>
            </div>
            <p>{{name}}</p>
          </div>
        </template>
      </BlockListDisplay>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import BlockListDisplay from "./base/BlockListDisplay.vue";

function columnNum(width) {
  if (width < 350) return 1;
  else if (width < 555) return 2;
  else if (width < 800) return 3;
  else if (width < 1000) return 4;
  else if (width < 1550) return 5;
  else return 6;
}
export default {
  data() {
    return {
      ready: false,
      pageData: {
        carouselData: [],
        officalSongList: [],
        recommendedSongList: [],
        recommendedVideo: [],
        latestIssue: [],
      },
      width: 0,
      column: {
        commoly: 1,
      },
    };
  },
  methods: {
    resizeHandle() {
      this.width = window.innerWidth;
      this.column.commoly = columnNum(window.innerWidth);
    },
    splitArr(arr, length) {
      let newArr = [];
      let childArr = [];
      for (let i of arr) {
        if (childArr.length < length) childArr.push(i);
        else {
          newArr.push(childArr);
          childArr = [i];
        }
      }
      newArr.push(childArr);
      return newArr;
    },
  },
  components: {
    BlockListDisplay,
  },
  created() {
    this.width = window.innerWidth;
    this.column.commoly = columnNum(window.innerWidth);
    window.addEventListener("resize", this.resizeHandle);
    axios("/data/carefullySelected")
      .then((result) => result.data.data)
      .then((data) => (this.pageData = data))
      .then(() => this.ready = true);
  },
  beforeDestroy() {
    window.removeEventListener("resize", this.resizeHandle);
  },
};
</script>

<style scoped>
.container {
  position: relative;
  z-index: 0;
}
.carousel-item-wrap {
  display: flex;
  margin: 0px -10px;
}
.carousel-item {
  height: 150px;
  display: flex;
  flex: 1;
  margin: 0px 10px;
}
.carousel-img {
  flex: 1;
  margin: 0 5px;
  border-radius: 15px;
}
.carousel-img:first-child {
  margin-left: 0px;
}
.carousel-img:last-child {
  margin-right: 0px;
}
.card {
  margin: 0px 15px;
}
.card-body {
  position: relative;
}
.card-body:hover {
  transform: translate(0, -10px);
  transition: all 0.5s;
}
.card-control-panel {
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  background-color: rgba(0, 0, 0, 0.349);
  opacity: 0;
  border-radius: 10px;
  display: flex;
  justify-content: center;
  align-items: center;
}
.card-body:hover .card-control-panel {
  opacity: 1;
}
>>> .row {
  margin: 0 -15px;
}
.poster {
  border-radius: 10px;
  width: 100%;
  height: auto;
  vertical-align: top;
}
.header-title {
  display: flex;
  align-items: center;
}
.title {
  margin: 0px 0px 10px 0px;
  font-weight: 500;
  font-size: 1.5rem;
}
.newest-menu-item {
  font-size: 14px;
  margin: 0px 20px;
  cursor: pointer;
}
.newest-menu-item:first-of-type {
  margin-left: 50px;
}
.newest-menu-item.active {
  color: var(--color2);
}
.custom-item-play-button {
  color: #fff;
  font-size: 3rem
}
.custom-item-play-button:hover {
  color: var(--color2);
}
</style>
