/**
 * Extract a YouTube video ID from the URL shapes people actually paste:
 * watch?v=, youtu.be/, /embed/, /shorts/, /live/.
 * Returns null for anything else so callers can fall back to a supplied
 * thumbnail rather than requesting a broken image.
 */
export function youtubeId(url: string): string | null {
  let parsed: URL;
  try {
    parsed = new URL(url);
  } catch {
    return null;
  }

  const host = parsed.hostname.replace(/^www\./, '');

  if (host === 'youtu.be') {
    return parsed.pathname.slice(1).split('/')[0] || null;
  }

  if (host !== 'youtube.com' && host !== 'm.youtube.com' && host !== 'youtube-nocookie.com') {
    return null;
  }

  const v = parsed.searchParams.get('v');
  if (v) return v;

  const match = parsed.pathname.match(/^\/(?:embed|shorts|live)\/([^/?#]+)/);
  return match ? match[1] : null;
}

/**
 * Thumbnail for a video. An explicit `thumbnail` always wins — it is the
 * only option for non-YouTube platforms.
 */
export function videoThumbnail(url: string, thumbnail?: string): string | null {
  if (thumbnail) return thumbnail;

  const id = youtubeId(url);
  return id ? `https://i.ytimg.com/vi/${id}/hqdefault.jpg` : null;
}

/** Privacy-preserving embed URL, for a future lightbox or detail page. */
export function youtubeEmbedUrl(url: string): string | null {
  const id = youtubeId(url);
  return id ? `https://www.youtube-nocookie.com/embed/${id}` : null;
}
