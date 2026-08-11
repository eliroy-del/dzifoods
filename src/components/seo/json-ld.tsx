/**
 * Renders structured data. Uses a plain <script> tag (not next/script) so the
 * markup is present in the initial server response for crawlers.
 */
export function JsonLd({ data, id }: { data: object | object[]; id?: string }) {
  return (
    <script
      id={id}
      type="application/ld+json"
      // The payload is built from typed constants, never from user input.
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data).replace(/</g, "\\u003c") }}
    />
  );
}
