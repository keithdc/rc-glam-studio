/**
 * @file utils.ts — Utility functions for class name merging (required by shadcn/magicui)
 * @shared
 * @dependencies clsx, tailwind-merge
 */
import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

/** Merges class names using clsx and tailwind-merge for conflict resolution. */
export function cn(...inputs: ClassValue[]): string {
  return twMerge(clsx(inputs));
}
