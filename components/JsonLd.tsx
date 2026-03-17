/**
 * Renders JSON-LD structured data for SEO, GEO, and AEO (SOP 3.3).
 */

interface JsonLdProps {
  data: object | object[];
}

export default function JsonLd({ data }: JsonLdProps) {
  const payload = Array.isArray(data) ? data : [data];
  return (
    <>
      {payload.map((item, i) => (
        <script
          key={i}
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(item) }}
        />
      ))}
    </>
  );
}
