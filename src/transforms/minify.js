const minify = require("terser").minify;

module.exports = async (value, outputPath) => {
  if (outputPath.endsWith('.js')) {
    const minifiedjs = await minify(value, {});
    return minifiedjs.code;
  };
  return value;
};
