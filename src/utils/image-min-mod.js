#!/usr/bin/env node

// This is pulled from here: https://github.com/adamduncan/imagemin-dir
// it is a wrapper around imagemin that allows me to preserve the folder structure from
// src directory to dist directory so my image links aren't all messed up
// OF NOTE: it hasn't been merged because it may not be cross platform compatible
// but since this is just for me and I'm on mac, not an issue here
// also helpful: https://stackoverflow.com/questions/42526941/is-it-possible-to-use-imagemin-cli-and-keep-the-same-folder-structure-of-compres

const imagemin = require("imagemin-dir"); // alternative to imagemin
const imageminMozjpeg = require("imagemin-mozjpeg");
const imageminOptipng = require("imagemin-optipng");

(async () => {
  const files = await imagemin(["src/images/**/*.{jpg,jpeg,png,svg}"], {
    destination: "dist/",
    preserveDirectories: true,
    plugins: [
      imageminMozjpeg({ quality: 60, progressive: true }),
      imageminOptipng({ optimizationLevel: 5, interlaced: null }),
    ],
  });
  // console.log(files);
})();
