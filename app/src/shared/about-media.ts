/**
 * @file about-media.ts — Loads ranked photos from public/about
 * @shared
 * @dependencies virtual:about-media
 */
import aboutMedia from "virtual:about-media";

export interface AboutPhoto {
  src: string;
  label: string;
}

/** Strips 01- ranking prefixes so 01-eye-master.jpg becomes "Eye Master". */
function labelFromSrc(src: string): string {
  const file = decodeURIComponent(src.split("/").pop() ?? "");
  const base = file.replace(/\.[^.]+$/, "").replace(/^\d+[-_\s]+/, "");
  return base
    .replace(/[-_]+/g, " ")
    .replace(/\b\w/g, (char) => char.toUpperCase());
}

/** About carousel slides, ordered by filename (01-, 02-, 03-). */
export function getAboutPhotos(): AboutPhoto[] {
  return aboutMedia.map((src) => ({
    src,
    label: labelFromSrc(src),
  }));
}
