/**
 * @file portfolio-media.ts — Loads photos dropped into public/portfolio collection folders
 * @shared
 * @dependencies virtual:portfolio-media
 */
import portfolioMedia from "virtual:portfolio-media";

export type WorkCategory =
  | "Bridal"
  | "Editorial"
  | "Events"
  | "Everyday"
  | "Lessons";

export interface PortfolioPhoto {
  id: string;
  src?: string;
  label: string;
  category: WorkCategory;
  aspect: "portrait" | "landscape" | "square";
}

export interface CollectionPreview {
  category: WorkCategory;
  folder: keyof typeof portfolioMedia;
  coverSrc: string | undefined;
  photoCount: number;
}

export const WORK_CATEGORIES: WorkCategory[] = [
  "Bridal",
  "Editorial",
  "Events",
  "Everyday",
  "Lessons",
];

const FOLDER_TO_CATEGORY: Record<keyof typeof portfolioMedia, WorkCategory> = {
  bridal: "Bridal",
  editorial: "Editorial",
  events: "Events",
  everyday: "Everyday",
  lessons: "Lessons",
};

const PLACEHOLDER_LOOKS: Array<{
  label: string;
  category: WorkCategory;
  aspect: PortfolioPhoto["aspect"];
}> = [
  { label: "Bridal Classic", category: "Bridal", aspect: "portrait" },
  { label: "Soft Glam Bride", category: "Bridal", aspect: "landscape" },
  { label: "Bridal Party", category: "Bridal", aspect: "landscape" },
  { label: "Beach Wedding", category: "Bridal", aspect: "portrait" },
  { label: "Editorial Bold", category: "Editorial", aspect: "square" },
  { label: "Magazine Cover", category: "Editorial", aspect: "portrait" },
  { label: "Creative Art", category: "Editorial", aspect: "square" },
  { label: "Fashion Week", category: "Editorial", aspect: "portrait" },
  { label: "Debut Night", category: "Events", aspect: "landscape" },
  { label: "Prom Queen", category: "Events", aspect: "square" },
  { label: "Gala Evening", category: "Events", aspect: "portrait" },
  { label: "Corporate Ready", category: "Everyday", aspect: "portrait" },
  { label: "Date Night Glow", category: "Everyday", aspect: "landscape" },
  { label: "Natural Dewy", category: "Everyday", aspect: "square" },
  { label: "Tutorial Session", category: "Lessons", aspect: "landscape" },
  { label: "Smokey Eye Class", category: "Lessons", aspect: "portrait" },
];

const CATEGORY_TO_FOLDER: Record<WorkCategory, keyof typeof portfolioMedia> = {
  Bridal: "bridal",
  Editorial: "editorial",
  Events: "events",
  Everyday: "everyday",
  Lessons: "lessons",
};

/** Turns a file path like /portfolio/bridal/beach-wedding.jpg into a display label. */
function labelFromSrc(src: string): string {
  const file = decodeURIComponent(src.split("/").pop() ?? "");
  const base = file.replace(/\.[^.]+$/, "");
  return base
    .replace(/[-_]+/g, " ")
    .replace(/\b\w/g, (char) => char.toUpperCase());
}

/** True when the value is a known work collection. */
export function isWorkCategory(value: string): value is WorkCategory {
  return WORK_CATEGORIES.includes(value as WorkCategory);
}

/** Cover card for each collection on the home highlights section. */
export function getCollectionPreviews(): CollectionPreview[] {
  return WORK_CATEGORIES.map((category) => {
    const folder = CATEGORY_TO_FOLDER[category];
    const urls = portfolioMedia[folder];
    return {
      category,
      folder,
      coverSrc: urls[0],
      photoCount: urls.length,
    };
  });
}

/** Full gallery photos grouped by work type. */
export function getPortfolioPhotos(): PortfolioPhoto[] {
  return Object.entries(FOLDER_TO_CATEGORY).flatMap(([folder, category]) => {
    const urls = portfolioMedia[folder as keyof typeof FOLDER_TO_CATEGORY];
    return urls.map((src, index) => ({
      id: `${folder}-${String(index)}`,
      src,
      label: labelFromSrc(src),
      category,
      aspect: "portrait" as const,
    }));
  });
}

/** Real photos plus placeholder tiles for collections that are still empty. */
export function getPortfolioGalleryItems(): PortfolioPhoto[] {
  const realPhotos = getPortfolioPhotos();
  const filledCategories = new Set(realPhotos.map((photo) => photo.category));
  const placeholders: PortfolioPhoto[] = PLACEHOLDER_LOOKS.filter(
    (look) => !filledCategories.has(look.category),
  ).map((look, index) => ({
    id: `placeholder-${look.category}-${String(index)}`,
    label: look.label,
    category: look.category,
    aspect: look.aspect,
  }));

  return [...realPhotos, ...placeholders];
}
