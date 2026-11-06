import { createServer } from "node:http";
import { readFileSync, statSync } from "node:fs";
import { resolve, extname, sep } from "node:path";
const root = resolve(import.meta.dirname, "../dist");
const types = {
  ".html": "text/html; charset=utf-8",
  ".md": "text/plain; charset=utf-8",
  ".css": "text/css",
  ".js": "text/javascript",
  ".json": "application/json",
  ".png": "image/png",
};
createServer((req, res) => {
  try {
    const url = new URL(req.url, "http://localhost");
    if (url.pathname === "/") {
      res.writeHead(302, { Location: "/draw.backgrounds/" });
      res.end();
      return;
    }
    if (!url.pathname.startsWith("/draw.backgrounds/"))
      throw Error("Not found");
    let file = resolve(
      root,
      decodeURIComponent(url.pathname.slice("/draw.backgrounds/".length)),
    );
    if (file !== root && !file.startsWith(root + sep)) throw Error("Not found");
    if (statSync(file).isDirectory()) file = resolve(file, "index.html");
    res.writeHead(200, {
      "Content-Type": types[extname(file)] || "application/octet-stream",
    });
    res.end(readFileSync(file));
  } catch {
    res.writeHead(404);
    res.end("Not found");
  }
}).listen(Number(process.env.PORT || 4321), "0.0.0.0", () =>
  console.log("Preview http://localhost:4321/draw.backgrounds/"),
);
