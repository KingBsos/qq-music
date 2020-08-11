<template>
  <div>
    <div class="container">
      <div>
        <img />
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
              <span class="pR-_5R iconfont icon-shipin"></span>视频
            </router-link>
          </li>
          <li class="d-iB w-100 p-_25R">
            <router-link class="d-iB w-100 link" to="/radiostation">
              <span class="pR-_5R iconfont icon-luyinjishouyinjidiantai
"></span>电台
            </router-link>
          </li>
        </ul>
      </div>
      <div>
        <h3 class="title">我的音乐</h3>
        <ul>
          <li class="d-iB w-100 p-_25R">
            <router-link class="d-iB w-100 link" to="/ilike">
              <span class="pR-_5R iconfont icon-xihuan"></span>我喜欢
            </router-link>
          </li>
          <li class="d-iB w-100 p-_25R">
            <router-link class="d-iB w-100 link" to="/localanddownload">
              <span class="pR-_5R iconfont icon-icon-test"></span>本地和下载
            </router-link>
          </li>
          <li class="d-iB w-100 p-_25R">
            <router-link class="d-iB w-100 link" to="/playhistory">
              <span class="pR-_5R iconfont icon-shijian1"></span>播放历史
            </router-link>
          </li>
          <li class="d-iB w-100 p-_25R">
            <router-link class="d-iB w-100 link" to="/auditionlist">
              <span class="pR-_5R iconfont icon-liebiao"></span>试听列表
            </router-link>
          </li>
        </ul>
      </div>
      <div>
        <h3 class="title">创建的歌单</h3>
      </div>
      <div>
        <h3 class="title">收藏的歌单</h3>
      </div>
    </div>
  </div>
</template>

<script>
export default {};
</script>

<style scoped>
.container {
  padding: 10px 20px;
  color: var(--color-main);
}
.title {
  font-size: 12px;
  color: var(--color-text-sub);
  padding: 10px 5px;
  font-weight: lighter;
}
.link {
  padding: 5px;
  color: var(--color-text-main);
  font-size: 16px;
  border-radius: 7px;
}
.link:hover:not(.router-link-exact-active) {
  background-color: var(--color-sub);
}
.router-link-exact-active {
  background-color: var(--color-important);
  color: var(--color-text-important);
}
</style>