<template>
  <div>
      <div class="container">
          <div class="left">
            <Navbar />
          </div>
          <div class="po-r h-100 right">
            <div>
              <GlobalControl />
            </div>
            <div>
              <transition>
                <router-view></router-view>
              </transition>
            </div>
            <div class="footer">
              <MusicController />
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
  overflow: auto;
  padding: 10px 20px 50px;
}
.footer {
  border-top: 1px solid #ddd;
  padding: 10px 0;
  margin-left: 200px;
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  background-color: var(--color1);
}
.v-enter, .v-leave-to {
  transform: translate(20px);
}
.v-enter-active, v-leave-active {
  transition: all 0.2s;
}
</style>