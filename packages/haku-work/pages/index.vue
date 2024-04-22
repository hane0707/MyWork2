<template>
  <div>
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
  head() {
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
