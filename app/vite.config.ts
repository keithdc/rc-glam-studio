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

    result[folder] = fs
      .readdirSync(dir)
      .filter((file) => IMAGE_EXT.test(file))
      .sort((a, b) => a.localeCompare(b, undefined, { numeric: true }))
      .map((file) => `/portfolio/${folder}/${encodeURIComponent(file)}`);
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
      return undefined;
    },
    load(id): string | undefined {
      if (id !== RESOLVED_VIRTUAL_ID) {
        return undefined;
      }
      return `export default ${JSON.stringify(scanPortfolio(root))}`;
    },
    configureServer(server): void {
      const watchDir = path.join(root, "public", "portfolio");
      server.watcher.add(watchDir);
      server.watcher.on("all", (_event, file) => {
        if (!file.includes(`${path.sep}portfolio`)) {
          return;
        }
        const mod = server.moduleGraph.getModuleById(RESOLVED_VIRTUAL_ID);
        if (mod) {
          void server.reloadModule(mod);
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
