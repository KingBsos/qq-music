<template>
  <div>
    <div class="container clear">
      <div class="left f-l vA-m_">
        <button class="btn mX-_5R fS-1_5R">←</button>
        <button class="btn mX-_5R fS-1_5R">→</button>
        <BaseInput class="input mX-1R fS-_75R" placeholder="搜索音乐">
          <span class="iconfont icon-sousuo mL-1R fS-_75R"></span>
        </BaseInput>
      </div>
      <div class="right f-r vA-m_">
        <button class="b-0">{{ logged ? name : '点我登录'}}</button>
      </div>
    </div>
  </div>
</template>

<script>
import BaseInput from "./BaseInput.vue";
import { mapState } from 'vuex';

export default {
  components: {
    BaseInput
  },
  computed: {
    ...mapState({
      logged: 'logged',
      name: state => state.user.name
    })
  }
};
</script>

<style scoped>
.container {
  height: 50px;
  background-color: #fff;
}
.left, .right {
  height: 100%;
}
.input {
  width: 250px;
  padding: 8px 40px;
  background-color: rgb(241, 241, 241);
  border: 0;
  color: #999;
  border-radius: 30px;
}
</style>