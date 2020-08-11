<template>
  <div>
      <div class="container">
          <div class="left">
            <Navbar />
          </div>
          <div>
            <div>
              <GlobalControl />
            </div>
            <div>
              <router-view></router-view>
            </div>
          </div>
      </div>
  </div>
</template>

<script>
import Navbar from './Navbar.vue';
import GlobalControl from './GlobalControl.vue';

export default {
  components: {
    Navbar, GlobalControl
  }
}
</script>

<style scoped>
.container {
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
}
</style>