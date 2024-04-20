/** @type {import('tailwindcss').Config} */
module.exports = {
  // cssの適用対象範囲を指定
  content: [
    './*vue',
    './components/**/*.vue',
    './layouts/**/*.vue',
    './pages/**/*.vue'
  ],
  theme: {
    extend: {},
  },
  plugins: [],
}

