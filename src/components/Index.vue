<template>
  <div>
    <div class="container">
      <div class="left">
        <Navbar class="h-100" />
      </div>
      <div class="po-r f1">
        <div class="right">
          <div class="top-control">
            <GlobalControl />
          </div>
          <div class="w-100 h-100 o-auto">
            <transition>
              <router-view></router-view>
            </transition>
          </div>
          <div class="footer">
            <MusicController class="h-100 pT-1R pX-1R" />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Navbar from "./Navbar.vue";
import GlobalControl from "./GlobalControl.vue";
import MusicController from "./MusicController.vue";

export default {
  components: {
    Navbar,
    GlobalControl,
    MusicController
  }
};
</script>

<style scoped>
.container {
  position: relative;
  display: flex;
  width: 100%;
  height: 100%;
  background-color: var(--global-theme-color);
}
.left {
  flex-shrink: 0;
  height: 100%;
  background-color: #fafafa;
}
.right {
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  padding: 55px 20px 80px;
}
.top-control {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  padding: 10px;
}
.footer {
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  height: 80px;
  background-color: var(--color1);
  z-index: 1;
}
.v-enter,
.v-leave-to {
  transform: translate(20px);
}
.v-enter-active,
v-leave-active {
  transition: all 0.2s;
}
@media screen and (max-width: 400px) {
  .right {
    padding: 55px 5px 80px;
  }
}
</style>