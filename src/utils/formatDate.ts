/* Frontmatter dates are parsed as UTC midnight. Formatting in UTC keeps a post
   dated 2026-07-12 reading "July 12" no matter where the site is built. */

export function formatDate(date: Date): string {
  return date.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    timeZone: 'UTC',
  });
}

export function formatDateShort(date: Date): string {
  return date.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    timeZone: 'UTC',
  });
}
