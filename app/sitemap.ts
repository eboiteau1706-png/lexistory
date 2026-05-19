import { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    { url: "https://lexistory.fr", lastModified: new Date(), changeFrequency: "daily", priority: 1 },
    { url: "https://lexistory.fr/classement", lastModified: new Date(), changeFrequency: "daily", priority: 0.8 },
    { url: "https://lexistory.fr/rangs", lastModified: new Date(), changeFrequency: "monthly", priority: 0.6 },
    { url: "https://lexistory.fr/a-propos", lastModified: new Date(), changeFrequency: "monthly", priority: 0.5 },
    { url: "https://lexistory.fr/login", lastModified: new Date(), changeFrequency: "monthly", priority: 0.4 },
  ];
}