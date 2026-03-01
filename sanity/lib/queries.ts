import { groq } from 'next-sanity';

export const puppiesQuery = groq`
  *[_type == "puppy"] | order(orderRank) {
    _id,
    name,
    gender,
    age,
    price,
    status,
    color,
    description,
    "images": images[].asset->url,
    "mainImage": images[0].asset->url
  }
`;

export const availablePuppiesQuery = groq`
  *[_type == "puppy" && status == "available"] | order(orderRank) {
    _id,
    name,
    gender,
    age,
    price,
    status,
    color,
    description,
    "images": images[].asset->url,
    "mainImage": images[0].asset->url
  }
`;

export const puppyBySlugQuery = groq`
  *[_type == "puppy" && slug.current == $slug][0] {
    _id,
    name,
    slug,
    gender,
    age,
    price,
    status,
    color,
    description,
    "images": images[].asset->url,
    "mainImage": images[0].asset->url,
    parents->{
      name,
      "image": image.asset->url
    }
  }
`;

export const parentsQuery = groq`
  *[_type == "parent"] | order(name) {
    _id,
    name,
    gender,
    color,
    description,
    "images": images[].asset->url,
    "mainImage": images[0].asset->url
  }
`;

export const galleryQuery = groq`
  *[_type == "gallery"] | order(orderRank) {
    _id,
    title,
    slug,
    description,
    "images": images[]{
      "url": asset->url,
      alt,
      caption
    }
  }
`;

export const galleryBySlugQuery = groq`
  *[_type == "gallery" && slug.current == $slug][0] {
    _id,
    title,
    slug,
    description,
    "images": images[]{
      "url": asset->url,
      alt,
      caption
    }
  }
`;

export const pageBySlugQuery = groq`
  *[_type == "page" && slug.current == $slug][0] {
    _id,
    title,
    slug,
    content,
    seo
  }
`;

export const testimonialsQuery = groq`
  *[_type == "testimonial"] | order(orderRank) {
    _id,
    quote,
    author,
    location,
    "image": image.asset->url
  }
`;

export const siteSettingsQuery = groq`
  *[_type == "siteSettings"][0] {
    siteName,
    tagline,
    description,
    email,
    phone,
    address,
    "logo": logo.asset->url,
    socialMedia
  }
`;
