<template>
  <div>
    <div class="container">
      <div>
        <img class="logo mY-1R" :src="pic" />
      </div>
      <div>
        <h3 class="title">在线音乐</h3>
        <ul>
          <li>
            <router-link class="d-iB w-100 link" to="/index/musichall">
              <span class="mr1rem iconfont icon-yinyue"></span>
              <span>音乐馆</span>
            </router-link>
          </li>
          <li>
            <router-link class="d-iB w-100 link" to="/index/video">
              <span class="mr1rem iconfont icon-shipin1"></span>
              <span>视频</span>
            </router-link>
          </li>
          <li>
            <router-link class="d-iB w-100 link" to="/index/radiostation">
              <span class="mr1rem iconfont icon-diantai"></span>
              <span>电台</span>
            </router-link>
          </li>
        </ul>
      </div>
      <div>
        <h3 class="title">我的音乐</h3>
        <ul>
          <li v-if="logged">
            <router-link class="d-iB w-100 link" to="/index/ilike">
              <span class="mr1rem iconfont icon-xihuan1"></span>
              <span>我喜欢</span>
            </router-link>
          </li>
          <li>
            <router-link class="d-iB w-100 link" to="/index/localanddownload">
              <span class="mr1rem iconfont icon-icon-test"></span>
              <span>本地和下载</span>
            </router-link>
          </li>
          <li>
            <router-link class="d-iB w-100 link" to="/index/playhistory">
              <span class="mr1rem iconfont icon-lishi1"></span>
              <span>播放历史</span>
            </router-link>
          </li>
          <li>
            <router-link class="d-iB w-100 link" to="/index/auditionlist">
              <span class="mr1rem iconfont icon-yinleliebiao-"></span>
              <span>试听列表</span>
            </router-link>
          </li>
        </ul>
      </div>
      <template v-if="logged">
        <div>
          <h3 class="title">创建的歌单</h3>
        </div>
        <div>
          <h3 class="title">收藏的歌单</h3>
        </div>
      </template>
    </div>
  </div>
</template>

<script>
import pic from "../assets/pic/qqmusic.png";
import { mapState } from "vuex";

export default {
  data() {
    return {
      pic
    };
  },
  computed: {
    ...mapState(["logged"])
  }
};
</script>

<style scoped>
.container {
  height: 100%;
  padding: 10px;
  color: var(--color1);
  background-color: rgb(245, 245, 245);
  overflow-x: hidden;
  overflow-y: auto;
}
@media screen and (max-width: 850px) {
  .container {
    width: 40px;
    padding: 0;
  }
  .logo {
    display: none;
  }
}
.logo {
  width: 100px;
}
.title {
  font-size: 12px;
  color: var(--color4);
  padding: 15px;
  font-weight: 300;
}
.link {
  padding: 3px 30px 3px 15px;
  color: var(--color3);
  font-size: 16px;
  border-radius: 5px;
}
.link:hover:not(.router-link-active) {
  background-color: var(--color5);
}
.router-link-active {
  background-color: var(--color2);
  color: #fff;
}
li {
  white-space: nowrap;
  padding: 5px 0;
}
</style>