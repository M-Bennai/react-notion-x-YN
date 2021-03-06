"use strict";

const withBundleAnalyzer = require("@next/bundle-analyzer")({
  enabled: process.env.ANALYZE === "true",
});

module.exports = withBundleAnalyzer({
  images: {
    domains: ["www.notion.so", "images.unsplash.com"],
  },
  async redirects() {
    return [
      // redirect the index page to our notion test suite
      {
        source: "/",
        destination: "/0265184804eb43388231161927864e13",
        // don't set permanent to true because it will get cached by the browser
        // while developing on localhost
        permanent: false,
      },
    ];
  },
});
