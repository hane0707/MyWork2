const _works = [
  {
    id: "1",
    title: "ソネット",
    description: "紹介文が入ります。紹介文が入ります。紹介文が入ります。紹介文が入ります。紹介文が入ります。紹介文が入ります。紹介文が入ります。紹介文が入ります。紹介文が入ります。紹介文が入ります。紹介文が入ります。",
    material: "素材名が入ります。",
    created_at: "2023-12-14",
    image: "/img/temp4.jpg"
  },
  {
    id: "2",
    title: "ポルターガイスト",
    description: "紹介文が入ります。紹介文が入ります。紹介文が入ります。紹介文が入ります。紹介文が入ります。紹介文が入ります。紹介文が入ります。紹介文が入ります。紹介文が入ります。紹介文が入ります。紹介文が入ります。",
    material: "素材名が入ります。",
    created_at: "2023-12-14",
    image: "/img/temp5.jpg"
  },
  {
    id: "3",
    title: "レグルス",
    description: "紹介文が入ります。紹介文が入ります。紹介文が入ります。紹介文が入ります。紹介文が入ります。紹介文が入ります。紹介文が入ります。紹介文が入ります。紹介文が入ります。紹介文が入ります。紹介文が入ります。",
    material: "素材名が入ります。",
    created_at: "2023-12-14",
    image: "/img/temp6.jpg"
  },
  {
    id: "4",
    title: "ヴェルティ",
    description: "紹介文が入ります。紹介文が入ります。紹介文が入ります。紹介文が入ります。紹介文が入ります。紹介文が入ります。紹介文が入ります。紹介文が入ります。紹介文が入ります。紹介文が入ります。紹介文が入ります。",
    material: "素材名が入ります。",
    created_at: "2023-12-14",
    image: "/img/temp7.jpg"
  },
  {
    id: "5",
    title: "シャーマィン",
    description: "紹介文が入ります。紹介文が入ります。紹介文が入ります。紹介文が入ります。紹介文が入ります。紹介文が入ります。紹介文が入ります。紹介文が入ります。紹介文が入ります。紹介文が入ります。紹介文が入ります。",
    material: "素材名が入ります。",
    created_at: "2023-12-14",
    image: "/img/temp8.jpg"
  },
  {
    id: "6",
    title: "カーバンクル",
    description: "紹介文が入ります。紹介文が入ります。紹介文が入ります。紹介文が入ります。紹介文が入ります。紹介文が入ります。紹介文が入ります。紹介文が入ります。紹介文が入ります。紹介文が入ります。紹介文が入ります。",
    material: "素材名が入ります。",
    created_at: "2023-12-14",
    image: "/img/temp9.jpg"
  },
  {
    id: "7",
    title: "クインシー",
    description: "紹介文が入ります。紹介文が入ります。紹介文が入ります。紹介文が入ります。紹介文が入ります。紹介文が入ります。紹介文が入ります。紹介文が入ります。紹介文が入ります。紹介文が入ります。紹介文が入ります。",
    material: "素材名が入ります。",
    created_at: "2023-12-14",
    image: "/img/temp4.jpg"
  },
  {
    id: "8",
    title: "コーンブルメ",
    description: "紹介文が入ります。紹介文が入ります。紹介文が入ります。紹介文が入ります。紹介文が入ります。紹介文が入ります。紹介文が入ります。紹介文が入ります。紹介文が入ります。紹介文が入ります。紹介文が入ります。",
    material: "素材名が入ります。",
    created_at: "2023-12-14",
    image: "/img/temp5.jpg"
  },
];

export default {
  getWorks(cb) {
    setTimeout(() => cb(_works), 100);
  },
};