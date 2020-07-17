<!--
 * @Author: mingxing.huang
 * @Date: 2020-07-16 17:26:52
--> 
<template>
  <div class="rl-image-box">
    <img :src="src"
         class="image"
         @click="clickImg">
    <transition name="show-big">
      <div v-show="showBig"
           class="big-img"
           @click="clickImg">
        <img :src="src"
             :style="bigImgStyle"></div>
    </transition>
  </div>
</template>

<script>
export default {
  name: 'rl-img',
  props: {
    imgName: {
      type: String,
      required: true
    },
    format: {
      type: String,
      default: '.png'
    }
  },
  data() {
    return {
      showBig: false,
      bigImgStyle: '',
      src: require(`@/assets/${this.imgName}${this.format}`)
    }
  },
  mounted() {
    let img = new Image()
    img.src = this.src
    img.onload = () => {
      // 设置宽度为700px
      let width = 700
      let height = (700 * img.height) / img.width
      const top = (document.body.clientHeight - height) / 2
      const left = (document.body.clientWidth - width) / 2
      this.bigImgStyle = {
        width: '700px',
        marginLeft: left + 'px',
        marginTop: top < 0 ? 0 : top + 'px',
        cursor: 'pointer'
      }
    }
  },
  methods: {
    clickImg() {
      this.showBig = !this.showBig
    }
  }
}
</script>

<style lang="scss" scoped>
.rl-image-box {
  width: 600px;
  border-radius: 4px;
  .image {
    width: 100%;
    border-radius: 4px;
    cursor: pointer;
  }
  .big-img {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: rgba($color: #ffffff, $alpha: 0.8);
    z-index: 100;
    overflow-x: hidden;
    overflow-y: auto;
    scrollbar-width: none; /* firefox */
    -ms-overflow-style: none; /* IE 10+ */
    &::-webkit-scrollbar {
      display: none; /* Chrome Safari */
    }
  }
  .show-big-enter-active {
    animation: show-in 0.1s;
  }
  .show-big-leave-active {
    animation: show-in 0.1s reverse;
  }
  @keyframes show-in {
    0% {
      transform: scale(0);
    }
    100% {
      transform: scale(1, 1, 1);
    }
  }
}
</style>