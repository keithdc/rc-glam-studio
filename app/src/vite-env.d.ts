/**
 * @file vite-env.d.ts — Vite client types and virtual media manifests
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

declare module "virtual:about-media" {
  const urls: string[];
  export default urls;
}
