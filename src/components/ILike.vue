<template>
  <div>
    <div class="container">
      <div class="wrap pB-1R">
        <h1 class="mT-1R">我喜欢</h1>
        <ul class="mY-1R">
          <li class="d-iB mR-1R">
            <router-link class="link" to="/ilike/song">歌曲{{ 208 }}</router-link>
          </li>
          <li class="d-iB mL-1R mR-1R">
            <router-link class="link" to="/ilike/songsheet">歌单{{ 0 }}</router-link>
          </li>
          <li class="d-iB mL-1R mR-1R">
            <router-link class="link" to="/ilike/album">专辑{{ 0 }}</router-link>
          </li>
          <li class="d-iB mL-1R mR-1R">
            <router-link class="link" to="/ilike/anchorstation">主播电台{{ 0 }}</router-link>
          </li>
          <li class="d-iB mL-1R">
            <router-link class="link" to="/ilike/video">视频{{ 0 }}</router-link>
          </li>
        </ul>
        <button class="custom-btn btn-primary mR-1R">
          <span class="iconfont icon-play"></span> 播放全部
        </button>
        <button class="custom-btn mR-1R">
          <span class="iconfont icon-xiazai"></span> 下载
        </button>
        <button class="custom-btn">
          <span class="iconfont icon-liebiao"></span> 批量操作
        </button>
        </div>
      <router-view></router-view>
    </div>
  </div>
</template>

<script>
export default {};
</script>

<style scoped>
.container {
  height: 100%;
}
.wrap {
  position: sticky;
  top: -50px;
  background-color: #fff;
  z-index: 1;
}
.custom-btn {
  padding: 7px 30px;
  border: 0px;
  border-radius: 50px;
  font-size: 16px;
  font-weight: 600;
}
.btn-primary {
  color: #fff;
  background-color: var(--color2);
}
.custom-btn:hover {
  box-shadow: 0 0 0px 500px rgba(0, 0, 0, 0.031) inset;
}
.link {
  padding: 5px;
  color: #333;
  border: 3px solid transparent;
}
.router-link-active {
  color: var(--color2);
  border-bottom: 3px solid var(--color2);
}
</style>