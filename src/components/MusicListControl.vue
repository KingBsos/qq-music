<template>
  <div class="d-iB">
    <div class="d-iB">
      <button class="btn fS-1_25R" @click.stop="open">
        <span class="iconfont icon-yinleliebiao-"></span>
        <span>{{ number }}</span>
      </button>
      <Portal to="MusicListSidebar">
        <transition name="sidebar">
          <MusicListSidebar v-if="isOpen" @close="close"/>
        </transition>
      </Portal>
    </div>
  </div>
</template>

<script>
import MusicListSidebar from "./MusicListSidebar.vue";

export default {
  props: {
    number: {
      type: Number,
      default: 0
    }
  },
  data: () => ({
    isOpen: false
  }),
  components: {
    MusicListSidebar
  },
  methods: {
    open() {
      this.isOpen = true;
    },
    close() {
      this.isOpen = false;
    }
  }
};
</script>

<style scoped>
.sidebar-enter,
.sidebar-leave-to {
  transform: translate(100%);
}
.sidebar-enter-active,
.sidebar-leave-active {
  transition: all .5s;
}
</style>