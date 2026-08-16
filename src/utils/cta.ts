import site from '../data/site.json';

/**
 * The primary call to action. A booking URL is the goal, but the site must
 * never ship a dead button — with no scheduler configured this degrades to
 * email rather than rendering an empty link.
 */
export function primaryCta(): { href: string; label: string; external: boolean } {
  const url = site.booking?.url?.trim();

  if (url) {
    return {
      href: url,
      label: site.booking.label || 'Book a call',
      external: true,
    };
  }

  return {
    href: `mailto:${site.email}`,
    label: 'Get in touch',
    external: false,
  };
}

/** True once a real scheduler is configured. */
export function hasBooking(): boolean {
  return Boolean(site.booking?.url?.trim());
}
