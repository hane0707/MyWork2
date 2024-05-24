<template>
  <v-container class="fadein my-5">
    <div class="my-5 text-3xl border1999 text-center">
      <p class="fl-1999">Privacy Policy</p>
    </div>
    <v-card variant="flat">
      <v-container class="textarea">
        <h1 class="text-2xl font-bold mb-4">アクセス解析ツールについて</h1>
        <div class="text-lg ml-4 mb-8">
          <p>当サイトでは、利用状況の分析にGoogle社が提供するGoogleアナリティクス及びFirebaseを使用しています。Googleアナリティクス及びFirebaseではトラフィックデータの収集のためにクッキー（Cookie）を使用しております。トラフィックデータは匿名で収集されており、個人を特定するものではありません。</p>
          <p>GoogleアナリティクスおよびFirebaseによるデータ収集の仕組みや利用規約については以下をご覧ください。</p>
          <br>
          <ul>
            <li class="my-1"><a href="https://policies.google.com/privacy?hl=ja" target="_blank">Googleポリシーと規約</a></li>
            <li class="my-1"><a href="https://marketingplatform.google.com/about/analytics/terms/jp/" target="_blank">Googleアナリティクス利用規約</a></li>
            <li class="my-1"><a href="https://firebase.google.com/terms" target="_blank">Firebaseの利用規約</a></li>
          </ul>
        </div>
        <h1 class="text-2xl font-bold mb-4">免責事項</h1>
        <div class="text-lg ml-4 mb-8">
          <p>当サイトは二次創作ファンサイトであり、作品の原作・版権元とは一切関係ありません。当サイトで提供される情報を用いたことによっていかなる損失・損害が発生しても、一切の責任を負いません。</p>
          <p>当サイトからリンクなどによって他のサイトに移動された場合、移動先サイトで提供される情報、サービス等について一切の責任を負いません。</p>
        </div>
        <h1 class="text-2xl font-bold mb-4">著作権について</h1>
        <div class="text-lg ml-4 mb-8">
          <p>当サイトに掲載した文章・画像等の著作物を無断転載することを禁止します。（リバース:1999からの引用部を除く）</p>
        </div>
        <h1 class="text-2xl font-bold mb-4">リンクポリシー</h1>
        <div class="text-lg ml-4 mb-8">
          <p>当サイトはリンクフリーです。ただし、各チェス駒の詳細ページ（~/work/work-[xx]）への直接リンクはお控えください。サイトの仕様上、画面表示が崩れる可能性があります。その場合は一度別ページへ移動後、WORKSページから目的の詳細ページへ遷移してください。</p>
        </div>
        <h1 class="text-2xl font-bold mb-4">お問い合わせについて</h1>
        <div class="text-lg ml-4">
          <p>現在当サイトではお問い合わせフォームを設けておりません。</p>
          <p>お問い合わせの際は以下のメールアドレスへご連絡ください。</p>
          <p>haku.craft1205@gmail.com</p>
        </div>
      </v-container>
      
    </v-card>
  </v-container>
</template>

<script setup lang="ts">
useHead({ title: 'Privacy Policy' })
</script>

<style scoped>
.fl-1999::first-letter {
  padding:0 0 0 0.7em;
}
.textarea {
  max-width: 1280px;
  min-height: 340px;
}
a {
  color: blue;
}
</style>