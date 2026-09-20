/**
 * @file vite.config.ts — Vite build configuration
 * @shared
 * @dependencies vite, @vitejs/plugin-react
 */
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import fs from "node:fs";
import path from "node:path";
import type { Plugin } from "vite";

const PORTFOLIO_FOLDERS = [
  "bridal",
  "editorial",
  "events",
  "everyday",
  "lessons",
] as const;

const IMAGE_EXT = /\.(jpe?g|png|webp|gif)$/i;
const VIRTUAL_ID = "virtual:portfolio-media";
const RESOLVED_VIRTUAL_ID = `\0${VIRTUAL_ID}`;
const ABOUT_VIRTUAL_ID = "virtual:about-media";
const RESOLVED_ABOUT_VIRTUAL_ID = `\0${ABOUT_VIRTUAL_ID}`;

/** Lists image files in a folder, sorted so 01- comes before 02-. */
function scanImageDir(dir: string, urlPrefix: string): string[] {
  if (!fs.existsSync(dir)) {
    return [];
  }

  return fs
    .readdirSync(dir)
    .filter((file) => IMAGE_EXT.test(file))
    .sort((a, b) => a.localeCompare(b, undefined, { numeric: true }))
    .map((file) => `${urlPrefix}/${encodeURIComponent(file)}`);
}

/** Reads image filenames from public/portfolio/{folder}. */
function scanPortfolio(root: string): Record<string, string[]> {
  const portfolioRoot = path.join(root, "public", "portfolio");
  const result: Record<string, string[]> = {};

  for (const folder of PORTFOLIO_FOLDERS) {
    const dir = path.join(portfolioRoot, folder);
    if (!fs.existsSync(dir)) {
      result[folder] = [];
      continue;
    }

    result[folder] = scanImageDir(dir, `/portfolio/${folder}`);
  }

  return result;
}

/** Virtual module so dropping files into public/portfolio updates the gallery. */
function portfolioMediaPlugin(): Plugin {
  let root = "";

  return {
    name: "portfolio-media",
    configResolved(config): void {
      root = config.root;
    },
    resolveId(id): string | undefined {
      if (id === VIRTUAL_ID) {
        return RESOLVED_VIRTUAL_ID;
      }
      if (id === ABOUT_VIRTUAL_ID) {
        return RESOLVED_ABOUT_VIRTUAL_ID;
      }
      return undefined;
    },
    load(id): string | undefined {
      if (id === RESOLVED_VIRTUAL_ID) {
        return `export default ${JSON.stringify(scanPortfolio(root))}`;
      }
      if (id === RESOLVED_ABOUT_VIRTUAL_ID) {
        const urls = scanImageDir(
          path.join(root, "public", "about"),
          "/about",
        );
        return `export default ${JSON.stringify(urls)}`;
      }
      return undefined;
    },
    configureServer(server): void {
      const portfolioDir = path.join(root, "public", "portfolio");
      const aboutDir = path.join(root, "public", "about");
      server.watcher.add(portfolioDir);
      server.watcher.add(aboutDir);
      server.watcher.on("all", (_event, file) => {
        if (file.includes(`${path.sep}portfolio`)) {
          const mod = server.moduleGraph.getModuleById(RESOLVED_VIRTUAL_ID);
          if (mod) {
            void server.reloadModule(mod);
          }
        }
        if (file.includes(`${path.sep}about`)) {
          const mod = server.moduleGraph.getModuleById(
            RESOLVED_ABOUT_VIRTUAL_ID,
          );
          if (mod) {
            void server.reloadModule(mod);
          }
        }
      });
    },
  };
}

export default defineConfig({
  plugins: [react(), portfolioMediaPlugin()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
});
