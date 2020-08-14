<template>
  <div>
    <div class="clear">
      <div class="f-l">
        <button class="b-0 bg-t p-_25R fS-2R">←</button>
        <button class="b-0 bg-t p-_25R fS-2R">→</button>
        <BaseInput class="input mX-1R fS-_75R" placeholder="搜索音乐">
          <span class="iconfont icon-sousuo mL-1R fS-_75R"></span>
        </BaseInput>
      </div>
      <div class="f-r">
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
.input {
  width: 250px;
  padding: 8px 40px;
  background-color: rgb(241, 241, 241);
  border: 0;
  color: #999;
  border-radius: 30px;
}
</style>