module.exports = {
  plugins: [
    require("postcss-import"),
    require("tailwindcss"),
    require("postcss-nested")({bubble: ['screen']}),
    require("autoprefixer"),
    require("cssnano")({preset: 'default'})
  ],
};
