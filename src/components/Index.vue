<template>
  <div>
      <div class="container">
          <div class="left">
            <Navbar />
          </div>
          <div class="po-relative h-100 right">
            <div class="top-control">
              <GlobalControl />
            </div>
            <div class="h-100 o-auto">
              <transition>
                <router-view></router-view>
              </transition>
            </div>
            <div class="footer">
              <MusicController class="h-100 p-1R" />
            </div>
          </div>
      </div>
  </div>
</template>

<script>
import Navbar from './Navbar.vue';
import GlobalControl from './GlobalControl.vue';
import MusicController from './MusicController.vue';

export default {
  components: {
    Navbar, GlobalControl, MusicController
  }
}
</script>

<style scoped>
.container {
  position: relative;
    padding: 0px 0px 0px 200px;
    overflow: hidden;
    width: 100vw;
    height: 100vh;
    background-color: var(--global-theme-color);
}
.left {
  position: absolute;
  left: 0;
  top: 0;
  width: 200px;
  height: 100%;
  background-color: #fafafa;
}
.right {
  padding: 55px 20px 80px;
}
.top-control {
  padding: 10px 10px 10px 220px;
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
}
.footer {
  margin-left: 200px;
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  height: 80px;
  background-color: var(--color1);
  z-index: 1;
}
.v-enter, .v-leave-to {
  transform: translate(20px);
}
.v-enter-active, v-leave-active {
  transition: all 0.2s;
}
</style>