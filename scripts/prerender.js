// Injects the server-rendered app into dist/index.html so crawlers get the
// full page without running JavaScript, and writes a fresh sitemap.xml.
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";

const SITE_URL = "https://klinikatanuki.com/";
const root = fileURLToPath(new URL("..", import.meta.url));
const dist = path.join(root, "dist");
const ssrDir = path.join(root, "dist-ssr");

const { render } = await import(
  pathToFileURL(path.join(ssrDir, "entry-server.js")).href
);

const indexPath = path.join(dist, "index.html");
const template = fs.readFileSync(indexPath, "utf-8");
if (!template.includes("<!--app-html-->")) {
  throw new Error("dist/index.html is missing the <!--app-html--> placeholder");
}
fs.writeFileSync(indexPath, template.replace("<!--app-html-->", render()));

const lastmod = new Date().toISOString().slice(0, 10);
fs.writeFileSync(
  path.join(dist, "sitemap.xml"),
  `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url>
    <loc>${SITE_URL}</loc>
    <lastmod>${lastmod}</lastmod>
  </url>
</urlset>
`
);

fs.rmSync(ssrDir, { recursive: true, force: true });
console.log("Prerendered dist/index.html and wrote dist/sitemap.xml");
