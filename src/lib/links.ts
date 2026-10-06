/** Props that open absolute http(s) links in a new tab; placeholders and anchors stay in place. */
export function externalLinkProps(href: string) {
  return /^https?:/.test(href) ? { target: '_blank', rel: 'noreferrer' } : {}
}
