<template>
  <div>
    <div>
      <header>
        <slot name="header" :changeItem="changeItem" :currentItem="menuItemKey"></slot>
      </header>
      <div class="content">
        <div class="prev-control VA-M">
          <slot name="prev">
            <button class="BTN custom-control-button" @click="pageReduce">&laquo;</button>
          </slot>
        </div>
        <div class="next-control VA-M">
          <slot name="next">
            <button class="BTN custom-control-button" @click="pageAdd">&raquo;</button>
          </slot>
        </div>
        <div class="row" v-for="(x, xIndex) in row" :key="xIndex">
          <div class="column" v-for="(y, yIndex) in column" :key="yIndex">
            <slot v-if="currentItem(x, y)" v-bind="currentItem(x, y)"></slot>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    row: {
      type: Number,
      default: 1,
    },
    column: {
      type: Number,
      default: 3,
    },
    contentData: {
      type: [Array, Object],
      default: () => ({ default: [] }),
    },
  },
  data() {
    return {
      menuItemKey: "",
      pageNum: 0,
    };
  },
  computed: {
    pageCapacity() {
      return this.pageNum * this.row * this.column;
    },
    _contentData() {
      if (Array.isArray(this.contentData)) return { default: this.contentData };
      else return this.contentData;
    },
  },
  watch: {
    _contentData() {
      this.menuItemKey = Object.keys(this._contentData)[0];
    },
  },
  methods: {
    currentItem(x, y) {
      let currentNum = this.pageCapacity + this.column * (x - 1) + y - 1;
      return this._contentData[this.menuItemKey][currentNum];
    },
    changeItem(key) {
      this.menuItemKey = key;
    },
    pageAdd() {
      if (
        this.pageCapacity + this.row * this.column <
        this._contentData[this.menuItemKey].length
      )
        this.pageNum++;
    },
    pageReduce() {
      if (this.pageNum > 0) this.pageNum--;
    },
  },
  created() {
    this.menuItemKey = Object.keys(this._contentData)[0];
  },
};
</script>

<style scoped>
.content {
  position: relative;
  z-index: 0;
}
.row {
  display: flex;
}
.column {
  flex: 1;
}
.prev-control,
.next-control {
  position: absolute;
  opacity: 0;
  top: 50%;
  transform: translate(0, -50%);
  z-index: 1;
}
.prev-control {
  left: 0;
}
.next-control {
  right: 0;
}
.content:hover .prev-control,
.content:hover .next-control {
  opacity: 1;
}
.custom-control-button {
  width: 35px;
  height: 35px;
  background-color: rgba(221, 221, 221, 0.288);
  border-radius: 50%;
  transition: all 0.3s;
}
.custom-control-button:hover {
  background-color: rgba(221, 221, 221, 0.719);
}
</style>