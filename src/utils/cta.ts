import site from '../data/site.json';
import { t, type Lang } from './i18n';

/**
 * The primary call to action. A booking URL is the goal, but the site must
 * never ship a dead button — with no scheduler configured this degrades to
 * email rather than rendering an empty link.
 *
 * Pass `lang` on the bilingual homepage to get the label in that language;
 * without it the label comes from site.json, as before.
 */
export function primaryCta(lang?: Lang): { href: string; label: string; external: boolean } {
  const url = site.booking?.url?.trim();
  const copy = lang ? t(lang).cta : undefined;

  if (url) {
    return {
      href: url,
      label: copy?.book || site.booking.label || 'Book a call',
      external: true,
    };
  }

  return {
    href: `mailto:${site.email}`,
    label: copy?.fallback || 'Get in touch',
    external: false,
  };
}

/** True once a real scheduler is configured. */
export function hasBooking(): boolean {
  return Boolean(site.booking?.url?.trim());
}
