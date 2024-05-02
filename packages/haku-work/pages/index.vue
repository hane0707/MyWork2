<template>
  <div class="shutter"></div>
  <div class="contents">
    <!-- 各コンポーネント呼び出し -->
    <MainKeyvisual />
    <section class="section-area about">
      <About />
    </section>
    <section class="section-area works">
      <Works />
    </section>
  </div>
</template>

<script>
export default {
  head () {
    return {
      title: 'Topページ',
      meta: [{
        hid: 'description',
        name: 'description',
        content: 'Topページ。',
      }]
    }
  },
}
</script>

<style scoped>
.shutter{
  position:fixed;
  top:0;
  left:0;
  right:0;
  bottom:0;
  background-image: url("/img/bg-img.png");
  z-index:9999;
}
.shutter::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  bottom: 0;
  margin: auto;
  background-color: #fff;
  width: 0;
  height: 1px;
}
.shutter {
  -webkit-animation: byeShutter 2.6s forwards;
          animation: byeShutter 2.6s forwards;
}
.shutter::before {
  -webkit-animation: shutterOpen 2.6s forwards;
          animation: shutterOpen 2.6s forwards;
}
@keyframes byeShutter {
  70% {
    opacity: 1;
  }
  100% {
    opacity: 0;
    display: none;
    z-index: -1;
  }
}
@keyframes shutterOpen {
  0% {
    width: 0;
    height: 1px;
  }
  50% {
    width: 100%;
    height: 1px;
  }
  90% {
    width: 100%;
    height: 100%;
  }
  100% {
    width: 100%;
    height: 100%;
  }
}
</style>