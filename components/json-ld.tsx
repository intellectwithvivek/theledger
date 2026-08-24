/**
 * Serialises a structured-data graph into a single script tag.
 *
 * A server component with no state, so the JSON-LD is present in the HTML
 * the crawler receives rather than being injected after hydration.
 *
 * `<` is escaped because the payload is interpolated into a raw script
 * element: an article title containing a literal `</script>` would
 * otherwise close the tag early. Escaping the angle bracket as a unicode
 * sequence keeps the JSON valid and the document intact.
 */
export function JsonLd({ data }: { data: unknown }) {
  const json = JSON.stringify(data).replace(/</g, '\\u003c')

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: json }}
    />
  )
}
