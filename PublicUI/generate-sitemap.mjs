// generate-sitemap.mjs
import { SitemapStream, streamToPromise } from "sitemap";
import { createWriteStream } from "fs";

const sitemap = new SitemapStream({ hostname: "https://bodycheck.ai" });

// ✅ Define your routes manually
const routes = [
  "/",
  "/sample-report",
  "/demo-dashboard",
  "/contact",
  "/terms",
  "/privacy"
];

for (const route of routes) {
  sitemap.write({ url: route, changefreq: "weekly", priority: route === "/" ? 1.0 : 0.8 });
}

sitemap.end();

// Wait for stream to complete
const sitemapData = await streamToPromise(sitemap);

// Write sitemap to public folder
createWriteStream("./public/sitemap.xml").write(sitemapData);

console.log("✅ Sitemap generated successfully at ./public/sitemap.xml");
