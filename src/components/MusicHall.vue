<template>
  <div>
    <div class="container">
      <header>
        <h1>音乐馆</h1>
        <ul class="menu">
          <li class="menu-item" v-for="(item, index) in menuData" :key="index">
            <router-link class="menu-link" :to="{ name: item.url }"
              ><span>{{ item.text }}</span></router-link
            >
          </li>
        </ul>
      </header>
      <router-view></router-view>
    </div>
  </div>
</template>

<script>
const menuData = [
  { text: "精选", url: "carefullyselected" },
  { text: "排行", url: "ranking" },
  { text: "歌手", url: "singer" },
  { text: "分类歌单", url: "classifiedsonglist" },
  { text: "数字专辑", url: "digitalalbum" },
  { text: "有声节目", url: "audioprogram" },
  { text: "手机专享", url: "excusiveuseformobilephone" },
];
export default {
  data() {
    return {
      menuData,
    };
  }
};
</script>

<style scoped>
.container {
  padding: 15px;
}
header {
  position: sticky;
  top: -45px;
  background-color: #fff;
  z-index: 1;
}
.menu {
  margin-top: 10px;
  white-space: nowrap;
  overflow: auto;
}
.menu-item {
  display: inline-block;
}
.menu-link {
  padding: 5px 20px;
  color: #333;
}
.menu-link span {
  padding-bottom: 5px;
  border-bottom: 3px solid transparent;
}
.menu-item:first-child .menu-link {
  padding-left: 0px;
}
.menu-item:last-child .menu-link {
  padding-right: 0px;
}
.menu-link.router-link-active span {
  display: inline-block;
  color: var(--color2);
  border-color: var(--color2);
}
</style>