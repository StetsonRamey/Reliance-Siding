const sorByDisplayOrder = require("./src/utils/sort-by-display-order.js");

// FILTERS
const dateFilter = require("./src/filters/date-filter.js");
const w3DateFilter = require("./src/filters/w3-date-filter.js");

// TRANSFORMS
const jsMinifier = require("./src/transforms/minify.js");

const isProduction = process.env.NODE_ENV === "production";

module.exports = (config) => {
  if (!isProduction) {
    config.addPassthroughCopy("./src/js/");
  }
  config.addPassthroughCopy("./src/images/");

  // add a custom watch target to rebuild when css changes
  config.addWatchTarget("./src/css/*.css");
  config.addWatchTarget("./src/js/*.js");

  config.setBrowserSyncConfig({
    ...config.browserSyncConfig,
    files: ["src/css/*.css", "src/js/*.js"],
    ghostMode: false,
  });

  // TRANSFORMS --------------
  // minify our js output
  if (isProduction) {
    config.addTransform("jsMin", jsMinifier);
  }

  // FILTERS ------------------
  // useful little filter for logging stuff to the console (on server not client)
  config.addFilter("log", (value) => {
    console.log("you logged this", value);
  });

  config.addFilter("dateFilter", dateFilter);
  config.addFilter("w3DateFilter", w3DateFilter);

  //Returns a list of people ordered by filename
  config.addCollection("people", (collection) => {
    return collection.getFilteredByGlob("./src/people/*.md").sort((a, b) => {
      return Number(a.fileSlug) > Number(b.fileSlug) ? 1 : -1;
    });
  });

  //Returns a collection of blog posts in reverse date order
  config.addCollection("blog", (collection) => {
    return [...collection.getFilteredByGlob("./src/posts/*.md")].reverse();
  });

  // Returns work page items, sorted by display order
  config.addCollection("work", (collection) => {
    return sorByDisplayOrder(collection.getFilteredByGlob("./src/work/*.md"));
  });

  // Returns Hardie items, sorted by display order
  config.addCollection("hardie", (collection) => {
    return sorByDisplayOrder(collection.getFilteredByGlob("./src/hardie/*.md"));
  });
  // Returns work page items, sorted by display order and filtered by features
  config.addCollection("featuredWork", (collection) => {
    return sorByDisplayOrder(
      collection.getFilteredByGlob("./src/work/*.md")
    ).filter((x) => x.data.featured);
  });

  // Tell 11ty to use the .eleventyignore and ignore our .gitignore file
  config.setUseGitIgnore(false);

  return {
    markdownTemplateEngine: "njk",
    dataTemplateEngine: "njk",
    htmlTemplateEngine: "njk",
    dir: {
      input: "src",
      output: "dist",
    },
  };
};
