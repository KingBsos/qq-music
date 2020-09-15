<template>
  <div class="vm-container-input">
      <input v-bind="$attrs" v-on="listeners.other" @click="$emit('input', $event.target.value)" class="vm-input">
      <span class="vm-icon" v-if="$scopedSlots.default">
        <slot></slot>
      </span>
  </div>
</template>

<script>
export default {
    inheritAttrs: false,
    computed: {
        listeners() {
            let {input, change, ...other} = this.$listeners;
            return {input, change, other};
        }
    },
    mounted() {
        //console.log(this.$style)
    }
}
</script>

<style scoped>
.vm-container-input {
    display: inline-block;
    width: 200px;
    border: 1px solid #ccc;
    position: relative;
}
.vm-input {
    width: 100%;
    height: 100%;
    border: 0px;
    background-color: transparent;
    font-size: inherit;
}
.vm-input:focus {
    outline: none;
}
.vm-icon {
    position: absolute;
    top: 50%;
    left: 0px;
    transform: translate(0, -50%);
}
</style>