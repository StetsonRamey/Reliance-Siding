const postCssConfig = {
  plugins: [
    require("postcss-import"),
    require("tailwindcss"),
    require("postcss-nested")({ bubble: ["screen"] }),
    require("autoprefixer"),
  ],
};

if (process.env.NODE_ENV === "production") {
  postCssConfig.plugins.push(require("cssnano")({ preset: "default" }));
}

module.exports = postCssConfig;
