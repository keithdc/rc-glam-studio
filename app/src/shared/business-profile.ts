/**
 * @file business-profile.ts — Studio contact, links, and brand copy (single source of truth)
 * @shared
 */

export interface BusinessProfile {
  brandName: string;
  brandSubtitle: string;
  tagline: string;
  /** Short services line for print calling card front */
  callingCardServices: string;
  email: string;
  phoneDisplay: string;
  phoneTel: string;
  location: string;
  websiteUrl: string;
  websiteQrUrl: string;
  websiteDisplay: string;
  instagramUrl: string;
  instagramQrUrl: string;
  instagramHandle: string;
  facebookUrl: string;
  facebookQrUrl: string;
  facebookDisplay: string;
}

/** Canonical business details used on the site and print calling card. */
export const BUSINESS_PROFILE: BusinessProfile = {
  brandName: "Rhoda Cordova",
  brandSubtitle: "MUA",
  tagline: "Professional Makeup Artist",
  callingCardServices: "Bridal · Events · Editorial",
  email: "rhodacordova.mua@gmail.com",
  phoneDisplay: "+63 927 402 8885",
  phoneTel: "+639274028885",
  location: "Metro Manila · Cavite · Laguna",
  websiteUrl: "https://rc-glam-studio.vercel.app/",
  websiteQrUrl: "https://rc-glam-studio.vercel.app/?utm_source=qr",
  websiteDisplay: "rc-glam-studio.vercel.app",
  instagramUrl: "https://www.instagram.com/rhodacordova_mua",
  instagramQrUrl:
    "https://www.instagram.com/rhodacordova_mua?utm_source=qr",
  instagramHandle: "@rhodacordova_mua",
  facebookUrl:
    "https://www.facebook.com/share/19oGGaVU5Y/?mibextid=wwXIfr",
  facebookQrUrl:
    "https://www.facebook.com/share/19oGGaVU5Y/?mibextid=wwXIfr&utm_source=qr",
  facebookDisplay: "Follow on Facebook",
};