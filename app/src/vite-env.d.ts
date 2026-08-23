/**
 * @file vite-env.d.ts — Vite client types and virtual portfolio manifest
 * @shared
 */
/// <reference types="vite/client" />

declare module "virtual:portfolio-media" {
  interface PortfolioManifest {
    bridal: string[];
    editorial: string[];
    events: string[];
    everyday: string[];
    lessons: string[];
  }

  const manifest: PortfolioManifest;
  export default manifest;
}
