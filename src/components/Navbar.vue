<template>
  <div>
    <div class="container">
      <div>
        <img class="logo mY-1R" :src="pic"/>
      </div>
      <div>
        <h3 class="title">在线音乐</h3>
        <ul>
          <li class="d-iB w-100 p-_25R">
            <router-link class="d-iB w-100 link" to="/musichall">
              <span class="pR-_5R iconfont icon-yinyue"></span>音乐馆
            </router-link>
          </li>
          <li class="d-iB w-100 p-_25R">
            <router-link class="d-iB w-100 link" to="/video">
              <span class="pR-_5R iconfont icon-shipin1"></span>视频
            </router-link>
          </li>
          <li class="d-iB w-100 p-_25R">
            <router-link class="d-iB w-100 link" to="/radiostation">
              <span class="pR-_5R iconfont icon-diantai"></span>电台
            </router-link>
          </li>
        </ul>
      </div>
      <div>
        <h3 class="title">我的音乐</h3>
        <ul>
          <li v-if="logged" class="d-iB w-100 p-_25R">
            <router-link class="d-iB w-100 link" to="/ilike">
              <span class="pR-_5R iconfont icon-xihuan1"></span>我喜欢
            </router-link>
          </li>
          <li class="d-iB w-100 p-_25R">
            <router-link class="d-iB w-100 link" to="/localanddownload">
              <span class="pR-_5R iconfont icon-icon-test"></span>本地和下载
            </router-link>
          </li>
          <li class="d-iB w-100 p-_25R">
            <router-link class="d-iB w-100 link" to="/playhistory">
              <span class="pR-_5R iconfont icon-lishi1"></span>播放历史
            </router-link>
          </li>
          <li class="d-iB w-100 p-_25R">
            <router-link class="d-iB w-100 link" to="/auditionlist">
              <span class="pR-_5R iconfont icon-yinleliebiao-"></span>试听列表
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
import pic from '../assets/pic/qqmusic.png';
import { mapState } from 'vuex';

export default {
  data() {
    return {
      pic
    }
  },
  computed: {
    ...mapState(['logged'])
  }
};
</script>

<style scoped>
.container {
  padding: 10px 20px;
  color: var(--color1);
}
.logo {
  width: 100px;
}
.title {
  font-size: 12px;
  color: var(--color4);
  padding: 10px 5px;
  font-weight: 300;
}
.link {
  padding: 5px;
  color: var(--color3);
  font-size: 16px;
  border-radius: 7px;
}
.link:hover:not(.router-link-active) {
  background-color: var(--color5);
}
.router-link-active {
  background-color: var(--color2);
  color: #fff;
}
</style>