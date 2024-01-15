/** @type {import('tailwindcss').Config} */
export default {
  content: [
    // 在 tailwind.config.js 文件中添加所有模板文件的路径。
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {},
  },
  plugins: [],
}

