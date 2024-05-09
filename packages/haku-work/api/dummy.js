const _works = [
  {
    id: 1,
    title: "ソネット",
    description: "ソネットの紹介文が入ります。紹介文が入ります。紹介文が入ります。紹介文が入ります。紹介文が入ります。紹介文が入ります。紹介文が入ります。紹介文が入ります。紹介文が入ります。紹介文が入ります。紹介文が入ります。",
    material: "素材名が入ります。",
    created_at: "2023-12-14",
    image: "/img/temp4.jpg",
    gallery_images: ["/img/sonetto/temp6.jpg", "/img/sonetto/temp7.jpg", "/img/sonetto/temp8.jpg", "/img/sonetto/temp9.jpg", "/img/sonetto/temp10.jpg"]
  },
  {
    id: 2,
    title: "ポルターガイスト",
    description: "ポルターガイストの紹介文が入ります。紹介文が入ります。紹介文が入ります。紹介文が入ります。紹介文が入ります。紹介文が入ります。紹介文が入ります。紹介文が入ります。紹介文が入ります。紹介文が入ります。紹介文が入ります。",
    material: "素材名が入ります。",
    created_at: "2023-12-14",
    image: "/img/temp5.jpg",
    gallery_images: ["/img/sonetto/temp6.jpg", "/img/sonetto/temp7.jpg", "/img/sonetto/temp8.jpg", "/img/sonetto/temp9.jpg", "/img/sonetto/temp10.jpg"]
  },
  {
    id: 3,
    title: "レグルス",
    description: "レグルスの紹介文が入ります。紹介文が入ります。紹介文が入ります。紹介文が入ります。紹介文が入ります。紹介文が入ります。紹介文が入ります。紹介文が入ります。紹介文が入ります。紹介文が入ります。紹介文が入ります。",
    material: "素材名が入ります。",
    created_at: "2023-12-14",
    image: "/img/temp6.jpg",
    gallery_images: ["/img/sonetto/temp6.jpg", "/img/sonetto/temp7.jpg", "/img/sonetto/temp8.jpg", "/img/sonetto/temp9.jpg", "/img/sonetto/temp10.jpg"]
  },
  {
    id: 4,
    title: "ヴェルティ",
    description: "ヴェルティの紹介文が入ります。紹介文が入ります。紹介文が入ります。紹介文が入ります。紹介文が入ります。紹介文が入ります。紹介文が入ります。紹介文が入ります。紹介文が入ります。紹介文が入ります。紹介文が入ります。",
    material: "素材名が入ります。",
    created_at: "2023-12-14",
    image: "/img/temp7.jpg",
    gallery_images: ["/img/sonetto/temp6.jpg", "/img/sonetto/temp7.jpg", "/img/sonetto/temp8.jpg", "/img/sonetto/temp9.jpg", "/img/sonetto/temp10.jpg"]
  },
  {
    id: 5,
    title: "シャーマィン",
    description: "シャーマィンの紹介文が入ります。紹介文が入ります。紹介文が入ります。紹介文が入ります。紹介文が入ります。紹介文が入ります。紹介文が入ります。紹介文が入ります。紹介文が入ります。紹介文が入ります。紹介文が入ります。",
    material: "素材名が入ります。",
    created_at: "2023-12-14",
    image: "/img/temp8.jpg",
    gallery_images: ["/img/sonetto/temp6.jpg", "/img/sonetto/temp7.jpg", "/img/sonetto/temp8.jpg", "/img/sonetto/temp9.jpg", "/img/sonetto/temp10.jpg"]
  },
  {
    id: 6,
    title: "カーバンクル",
    description: "カーバンクルの紹介文が入ります。紹介文が入ります。紹介文が入ります。紹介文が入ります。紹介文が入ります。紹介文が入ります。紹介文が入ります。紹介文が入ります。紹介文が入ります。紹介文が入ります。紹介文が入ります。",
    material: "素材名が入ります。",
    created_at: "2023-12-14",
    image: "/img/temp9.jpg",
    gallery_images: ["/img/sonetto/temp6.jpg", "/img/sonetto/temp7.jpg", "/img/sonetto/temp8.jpg", "/img/sonetto/temp9.jpg", "/img/sonetto/temp10.jpg"]
  },
  {
    id: 7,
    title: "クインシー",
    description: "クインシーの紹介文が入ります。紹介文が入ります。紹介文が入ります。紹介文が入ります。紹介文が入ります。紹介文が入ります。紹介文が入ります。紹介文が入ります。紹介文が入ります。紹介文が入ります。紹介文が入ります。",
    material: "素材名が入ります。",
    created_at: "2023-12-14",
    image: "/img/temp4.jpg",
    gallery_images: ["/img/sonetto/temp6.jpg", "/img/sonetto/temp7.jpg", "/img/sonetto/temp8.jpg", "/img/sonetto/temp9.jpg", "/img/sonetto/temp10.jpg"]
  },
  {
    id: 8,
    title: "コーンブルメ",
    description: "コーンブルメの紹介文が入ります。紹介文が入ります。紹介文が入ります。紹介文が入ります。紹介文が入ります。紹介文が入ります。紹介文が入ります。紹介文が入ります。紹介文が入ります。紹介文が入ります。紹介文が入ります。",
    material: "素材名が入ります。",
    created_at: "2023-12-14",
    image: "/img/temp5.jpg",
    gallery_images: ["/img/sonetto/temp6.jpg", "/img/sonetto/temp7.jpg", "/img/sonetto/temp8.jpg", "/img/sonetto/temp9.jpg", "/img/sonetto/temp10.jpg"]
  },
];

export default {
  getWorks(cb) {
    setTimeout(() => cb(_works), 100);
  },
};