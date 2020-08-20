<template>
  <div>
    <div class="container">
      <span>{{ currentTime | timeFormat }}</span>
      <span class="mX-_25R">{{ '/' }}</span>
      <span>{{ duration | timeFormat }}</span>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    currentTime: Number,
    duration: Number
  },
  filters: {
    timeFormat(s) {
      if (isNaN(s)) s = 0;
      s = Math.round(s);
      let min = Math.floor(s / 60);
      let sec = s % 60;
      min = min < 10 ? "0" + min : min;
      sec = sec < 10 ? "0" + sec : sec;
      return `${min}:${sec}`;
    }
  }
};
</script>

<style scoped>
.container {
  width: 100%;
  height: 100%;
  display: inline-flex;
  justify-content: center;
  align-items: center;
}
</style>