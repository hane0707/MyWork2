const _works = [
  { id: 1, title: "ソネット", title_en: "Sonetto", title_cn: "十四行诗", image: "/img/sonetto.jpg", gallery_images: ["/img/sonetto/sonetto1.jpg","/img/sonetto/sonetto2.jpg","/img/sonetto/sonetto3.jpg","/img/sonetto/sonetto4.jpg","/img/sonetto/sonetto5.jpg"], material: "石粉粘土　水性ホビーカラー", created_at: "2023-12-5", voice: "こんにちは！　今日のシャツはあなたの瞳によく似合っていますね。", description: "初めての粘土作品。リバース1999のチェス駒が欲しくて欲しくて…。手に入らないなら作ってしまおう。それが沼の入口とも知らずに。" },
  { id: 2, title: "ヴェルティ", title_en: "Vertin", title_cn: "维尔汀", image: "/img/vertin.jpg", gallery_images: ["/img/vertin/vertin1.jpg","/img/vertin/vertin2.jpg","/img/vertin/vertin3.jpg","/img/vertin/vertin4.jpg","/img/vertin/vertin5.jpg"], material: "石粉粘土　水性ホビーカラー", created_at: "2023-12-9", voice: "つまり、私の実験は成功したということだ…ありがとう。", description: "まだ丸い頭部の作り方もわからず、歪んだ体が出来上がった。タイムキーパーは時を戻せるわけではない。" },
  { id: 3, title: "ポルターガイスト", title_en: "Poltergeist", title_cn: "吵闹鬼", image: "/img/poltergeist.jpg", gallery_images: ["/img/poltergeist/poltergeist1.jpg","/img/poltergeist/poltergeist2.jpg","/img/poltergeist/poltergeist3.jpg","/img/poltergeist/poltergeist4.jpg","/img/poltergeist/poltergeist5.jpg"], material: "石粉粘土　水性ホビーカラー", created_at: "2023-12-10", voice: "我が家へ、ようこそ。ここで…一緒に遊ぼ…", description: "陶器のようにつるつるに。お気に入りのチェス駒の1つ。中身は空洞なので実質シーツの立体物。" },
  { id: 4, title: "レグルス", title_en: "Regulus", title_cn: "星锑", image: "/img/regulus.jpg", gallery_images: ["/img/regulus/regulus1.jpg","/img/regulus/regulus2.jpg","/img/regulus/regulus3.jpg","/img/regulus/regulus4.jpg","/img/regulus/regulus5.jpg"], material: "石粉粘土　水性ホビーカラー", created_at: "2023-12-15", voice: "ロック！　ロック！　ロック！　チェンジ・ザ・ワールド！", description: "初めてスーツケースに来た星6キャラクター。100円のシールの有用性を学んだ。" },
  { id: 5, title: "サザビー", title_en: "Sotheby", title_cn: "苏芙比", image: "/img/sotheby.jpg", gallery_images: ["/img/sotheby/sotheby1.jpg","/img/sotheby/sotheby2.jpg","/img/sotheby/sotheby3.jpg","/img/sotheby/sotheby4.jpg"], material: "石粉粘土　水性ホビーカラー", created_at: "2023-12-19", voice: "ごきげんよう！　わたくし、サザビーと申しますわ。御覧の通りに完璧で博学な淑女ですの！", description: "おそらくver1.3以降に初登場していたらもっと複雑な形状をしていただろう。初期のシンプルな形状で本当に良かった。" },
  { id: 6, title: "レイクミドロの悪夢", title_en: "Green Lake Nightmare", title_cn: "绿湖噩梦", image: "/img/green_lake_nightmare.jpg", gallery_images: ["/img/nightmare/nightmare1.jpg","/img/nightmare/nightmare2.jpg","/img/nightmare/nightmare3.jpg","/img/nightmare/nightmare4.jpg","/img/nightmare/nightmare5.jpg"], material: "石膏　石粉粘土　水性ホビーカラー　レジン", created_at: "2024-1-14", voice: "まずは「単独行動をした者」、そして「逃げるのに失敗した者」。今はできるだけ集団行動した方がいい。", description: "ver1.2【レイクミドロの悪夢】より、「旧歯と古傷」に登場したレイクミドロカーバンクルのチェス駒とレイクミドロ風の台座。表面をレジンでコーティングし、より複雑な緑へ。" },
  { id: 7, title: "ドア", title_en: "Door", title_cn: "门", image: "/img/door.jpg", gallery_images: ["/img/door/door1.jpg","/img/door/door2.jpg","/img/door/door3.jpg"], material: "石膏　アクリル板　コルクシート　レジン　ミラー調塗料", created_at: "2024-1-19", voice: "こんにちは、好奇心旺盛な探索者さん。鏡に映る姿を見て、喜んで欲しいな。", description: "1/1スケールで作成した鏡の欠片。触れても誰も怪我をしない、優しい素材。掠れたミラーは実用には適さない。" },
  { id: 8, title: "カーバンクル", title_en: "Carbuncle", title_cn: "卡邦克鲁", image: "/img/carbuncle.jpg", gallery_images: ["/img/carbuncle/carbuncle1.jpg","/img/carbuncle/carbuncle2.jpg","/img/carbuncle/carbuncle3.jpg","/img/carbuncle/carbuncle4.jpg","/img/carbuncle/carbuncle5.jpg","/img/carbuncle/carbuncle6.jpg","/img/carbuncle/carbuncle7.jpg"], material: "石膏　石粉粘土　水性ホビーカラー", created_at: "2024-1-19", voice: "金の延べ棒？美味しい？ガリガリ…おっ！うまい！", description: "余った石膏や粘土でお手軽に作れる猫たち。" },
  { id: 9, title: "クインシー", title_en: "Sweet Fable", title_cn: "甘甜的寓言", image: "/img/sweet_fable.jpg", gallery_images: ["/img/sweet_fable/sweet_fable1.jpg","/img/sweet_fable/sweet_fable2.jpg","/img/sweet_fable/sweet_fable3.jpg","/img/sweet_fable/sweet_fable4.jpg","/img/sweet_fable/sweet_fable5.jpg"], material: "石膏　石粉粘土　水性ホビーカラー", created_at: "2024-1-19", voice: "そうだ、こいつはいつだって単独で動く。あらゆるおとぎ話の導入のように、これが全ての始まりだ。", description: "余った石膏や粘土でお手軽に作れる猫たち。みかんをお一ついかが？" },
  { id: 10, title: "トゲ持ち武者", title_en: "Thorny", title_cn: "带刺", image: "/img/thorny.jpg", gallery_images: ["/img/thorny/thorny1.jpg","/img/thorny/thorny2.jpg","/img/thorny/thorny3.jpg","/img/thorny/thorny4.jpg"], material: "石粉粘土　アクリル塗料", created_at: "2024-1-30", voice: "そうだ、こいつらのトゲは小さくて取るに足らない…", description: "ver1.3【モルパンク遊記】の「ストリ探し」で登場したサボテンモチーフのカーバンクル。（メインステージにも一部登場）　その愛らしさから意外に多くのファンがいる模様。" },
  { id: 11, title: "カンジーラ", title_en: "Kanjira", title_cn: "坎吉拉", image: "/img/kanjira.jpg", gallery_images: ["/img/kanjira/kanjira1.jpg","/img/kanjira/kanjira2.jpg","/img/kanjira/kanjira3.jpg","/img/kanjira/kanjira4.jpg","/img/kanjira/kanjira5.jpg"], material: "石膏　石粉粘土　アクリル塗料", created_at: "2024-2-7", voice: "にひ！カンジーラの――、ん〜思いつかないや。とにかく入場料は10ルピ〜まいどあり！", description: "塗料をアクリルガッシュに変更してから初めて作った神秘学家。この頃からより立体的な作りを意識し始める。重ねられた布は石膏の上に粘土を重ねたもの。" },
  { id: 12, title: "カーラ・ボナー", title_en: "Black Dwarf", title_cn: "伽菈波那", image: "/img/black_dwarf.jpg", gallery_images: ["/img/black_dwarf/black_dwarf1.jpg","/img/black_dwarf/black_dwarf2.jpg","/img/black_dwarf/black_dwarf3.jpg","/img/black_dwarf/black_dwarf4.jpg","/img/black_dwarf/black_dwarf5.jpg"], material: "石膏　石粉粘土　アクリル塗料", created_at: "2024-2-7", voice: "ふふ…あなたがこの刻に訪れる予測していた。どうぞ座って、タイムキーパー。", description: "このチェス駒を作ることはあらかじめ予見されていた。カンジーラと同じくアクリルガッシュ過渡期の作品。" },
  { id: 13, title: "マチルダ", title_en: "Matilda Bouanich", title_cn: "玛蒂尔达", image: "/img/matilda_bouanich.jpg", gallery_images: ["/img/matilda/matilda1.jpg","/img/matilda/matilda2.jpg","/img/matilda/matilda3.jpg","/img/matilda/matilda4.jpg","/img/matilda/matilda5.jpg","/img/matilda/matilda6.jpg","/img/matilda/matilda7.jpg","/img/matilda/matilda8.jpg"], material: "石膏　石粉粘土　アクリル塗料", created_at: "2024-2-8", voice: "入る前には必ずノックをしなさい！はい、外に出てやり直し！「どうぞ」と言ったら入ってきて！", description: "Vive la France, Vive la Matilda!" },
  { id: 14, title: "新スターゲイザーズ", title_en: "The New Stargazers", title_cn: "新观星者们", image: "/img/the_new_stargazers.jpg", gallery_images: ["/img/stargazers/stargazers1.jpg"], material: "石膏　石粉粘土　アクリル塗料", created_at: "2024-2-16", voice: "みんな帰れる…なんて良い場所なんだ。", description: "2次創作CP用に作ったセット。残念ながら賞は逃したが、納得のいく宇宙と造形を得た。" },
  { id: 15, title: "シャーマィン", title_en: "Shamane", title_cn: "鬃毛沙砾", image: "/img/shamane.jpg", gallery_images: ["/img/shamane/shamane1.jpg","/img/shamane/shamane2.jpg","/img/shamane/shamane3.jpg","/img/shamane/shamane4.jpg","/img/shamane/shamane5.jpg"], material: "石膏　石粉粘土　アクリル塗料　毛糸", created_at: "2024-2-16", voice: "ああ、もちろんさ。お前さんが街角を通り過ぎた時には　もう来たって分かってたよ…何か手伝えることはあるかい？", description: "パーツの分割や自分なりの形にこだわりだした頃の作品。コートは取り外し可能。" },
  { id: 16, title: "カシャパシャ", title_en: "Click", title_cn: "喀嚓喀嚓", image: "/img/click.jpg", gallery_images: ["/img/click/click1.jpg","/img/click/click2.jpg","/img/click/click3.jpg","/img/click/click4.jpg"], material: "石膏　石粉粘土　アクリル塗料", created_at: "2024-2-25", voice: "お嬢さん、もしよかったら…先にノックをしてくれないか？", description: "まだ公式からは登場していないチェス駒。量産した石膏の素体を削り、粘土で細部のパーツを作っている。" },
  { id: 17, title: "コーンブルメ", title_en: "Bkornblume", title_cn: "柏林以东", image: "/img/bkornblume.jpg", gallery_images: ["/img/bkornblume/bkornblume1.jpg","/img/bkornblume/bkornblume2.jpg","/img/bkornblume/bkornblume3.jpg","/img/bkornblume/bkornblume4.jpg"], material: "石膏　石粉粘土　アクリル塗料", created_at: "2024-2-25", voice: "訪ねて来られるのはあまり好きじゃないかな…良くないコトを連想するから。", description: "頭部は時短目的で発泡スチロール球に薄く粘土を重ね、実験的に作った。作ってきたチェス駒の中で、初めて1000いいねを超えた作品になった。" },
  { id: 18, title: "スイートハート", title_en: "Sweetheart", title_cn: "玛丽莲", image: "/img/sweetheart.jpg", gallery_images: ["/img/sweetheart/sweetheart1.jpg","/img/sweetheart/sweetheart2.jpg","/img/sweetheart/sweetheart3.jpg","/img/sweetheart/sweetheart4.jpg","/img/sweetheart/sweetheart5.jpg"], material: "石膏　石粉粘土　アクリル塗料", created_at: "2024-3-1", voice: "静かな場所に長くいると、いつも心が物寂しくなっちゃうの。", description: "まだ公式からは登場していないチェス駒。ツヤを出し、思わず手に取りたくなる質感。" },
  { id: 19, title: "アルカナ", title_en: "Arcana", title_cn: "阿尔卡纳", image: "/img/arcana.jpg", gallery_images: ["/img/arcana/arcana1.jpg","/img/arcana/arcana2.jpg","/img/arcana/arcana3.jpg","/img/arcana/arcana4.jpg","/img/arcana/arcana5.jpg","/img/arcana/arcana6.jpg"], material: "石膏　石粉粘土　アクリル塗料　真鍮線", created_at: "2024-3-8", voice: "そなたが出会った神秘学家達は…みな幸せに暮らしていたかしら？", description: "より複雑な形状にチャレンジした、オリジナルデザインのチェス駒。胴体はほぼ石膏を削り出したもの。" },
];

export default {
  getWorks(cb) {
    setTimeout(() => cb(_works), 100);
  },
};