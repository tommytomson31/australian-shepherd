# Heritage Hill Aussies — SEO, GEO & AEO Crawl Submission Guide

This guide walks you through submitting the site for crawling and indexing per **LK Digital SEO/GEO/AEO SOP v2**. Complete these steps after the site is live and `NEXT_PUBLIC_SITE_URL` is set to your production URL.

---

## 1. Pre-submission checklist

- [ ] Site is **live** on your production domain (e.g. `https://heritagehillaussies.com`).
- [ ] **HTTPS** is enforced (no mixed content).
- [ ] **Environment variable** `NEXT_PUBLIC_SITE_URL` is set in production to your exact site URL (no trailing slash).
- [ ] You have verified access to:
  - [Google Search Console](https://search.google.com/search-console)
  - [Bing Webmaster Tools](https://www.bing.com/webmasters)

---

## 2. Verify technical endpoints

Open these URLs in a browser (replace with your real domain if different):

| URL | Purpose |
|-----|--------|
| `https://yoursite.com/robots.txt` | Shows crawl rules and link to sitemap. |
| `https://yoursite.com/sitemap.xml` | Lists all indexable URLs. |

- **robots.txt** should allow `/` and reference `https://yoursite.com/sitemap.xml`.
- **sitemap.xml** should include homepage, `/about`, `/puppies`, `/contact`, `/gallery`, `/privacy`, `/terms`, and any Sanity CMS pages.

---

## 3. Google Search Console (GSC)

### 3.1 Add the property

1. Go to [Google Search Console](https://search.google.com/search-console).
2. Click **Add property**.
3. Choose **URL prefix** and enter your full site URL, e.g. `https://heritagehillaussies.com`.
4. Verify ownership using one of:
   - **HTML file upload** (upload the file to `public/` and enter the path).
   - **HTML tag** (add the meta tag to the site; we can add a `verification` field in `metadata` in `app/layout.tsx` when you have the tag).
   - **Google Analytics** or **Google Tag Manager** if already on the site.
   - **DNS** (TXT record) if you have access to DNS.

### 3.2 Submit the sitemap

1. In GSC, open **Sitemaps** (left sidebar).
2. Under **Add a new sitemap**, enter: `sitemap.xml`
3. Click **Submit**.

Google will start crawling. Coverage and indexing may take a few days to weeks.

### 3.3 Request indexing for key URLs (optional)

1. Use the **URL Inspection** tool at the top.
2. Enter a URL (e.g. homepage, `/puppies`, `/contact`).
3. Click **Request indexing** for important pages you want crawled soon.

---

## 4. Bing Webmaster Tools

### 4.1 Add the site

1. Go to [Bing Webmaster Tools](https://www.bing.com/webmasters).
2. **Add a site** and enter your URL.
3. Verify ownership (e.g. XML file, meta tag, or DNS).

### 4.2 Submit the sitemap

1. In the dashboard, go to **Sitemaps**.
2. Enter: `https://yoursite.com/sitemap.xml`
3. Submit.

Bing will crawl using the same sitemap as Google.

---

## 5. Optional: Validate structured data

- **Google:** [Rich Results Test](https://search.google.com/test/rich-results) — test your homepage and `/contact` (FAQ schema).
- **Generic:** [Schema.org Validator](https://validator.schema.org/) — paste page URL or HTML.

Fix any errors reported before relying on rich results.

---

## 6. Ongoing (per SOP)

- **Monthly:** Check GSC for crawl errors, coverage, and Core Web Vitals.
- **When adding content:** Sitemap updates automatically; new Sanity pages are included on next build.
- **Quarterly:** Full technical audit (crawl, schema, CWV, internal links) as in SOP §9.3.

---

## 7. Quick reference — what’s already implemented

| SOP area | Implementation |
|----------|----------------|
| **Crawlability** | `app/robots.ts` — allows crawlers + AI bots (GPTBot, Google-Extended, PerplexityBot, ClaudeBot). |
| **Sitemap** | `app/sitemap.ts` — dynamic sitemap (static routes + Sanity pages). |
| **Schema** | Organization, WebSite (+ SearchAction), LocalBusiness, WebPage, BreadcrumbList, FAQPage on Contact. |
| **Metadata** | Title template, meta description, Open Graph, Twitter cards, canonicals. |
| **Security** | `next.config.js` — X-Frame-Options, X-Content-Type-Options, Referrer-Policy. |
| **Base URL** | Set `NEXT_PUBLIC_SITE_URL` in production for sitemap, canonicals, and OG URLs. |

---

*Reference: LK Digital SEO/GEO/AEO SOP v2.0 | February 2026*
