/** @type {import('postcss-load-config').Config} */
const config = {
  plugins: [
    'postcss-import',
    'tailwindcss/nesting',
    'tailwindcss',
    /*
      - https://github.com/postcss/autoprefixer#browsers we are using browserslist from package.json
      - run for browserslist testing "npx autoprefixer --info"
    */
    'autoprefixer',
  ],
}

export default config
