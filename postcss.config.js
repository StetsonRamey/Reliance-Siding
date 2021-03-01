


module.exports = ({ env }) => ({
  plugins: [
    require("postcss-import"),
    require("tailwindcss"),
    require("postcss-nested")({bubble: ['screen']}),
    require("autoprefixer"),
    env === 'production' ? require("cssnano")({preset: 'default'})(): false,
  ],
});
