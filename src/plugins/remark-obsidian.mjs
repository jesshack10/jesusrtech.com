import fs from 'node:fs';
import path from 'node:path';

/**
 * Understands the Obsidian flavour of Markdown, so notes written in the
 * vault render correctly on the site without being rewritten first.
 *
 * Handles:
 *   [[Note]] · [[Note|Alias]] · [[Note#Heading]]   → links
 *   ![[image.png]]                                 → images
 *   ==highlight==                                  → <mark>
 *   > [!note] Title                                → callouts
 *
 * A wikilink pointing at a note with no public page renders as plain
 * text rather than a dead link — an unpublished note must never become a
 * 404 for a visitor.
 */

const CONTENT_ROOT = 'src/content';

/** Collections that have a public route, mapped to their URL prefix. */
const ROUTED = {
  blog: '/blog',
  projects: '/projects',
  decisions: '/decisions',
};

/** Where Obsidian is configured to drop attachments. Served as /attachments/*. */
const ATTACHMENTS_URL = '/attachments';

const CALLOUTS = {
  note: 'Note',
  info: 'Info',
  tip: 'Tip',
  important: 'Important',
  warning: 'Warning',
  caution: 'Caution',
  danger: 'Danger',
  error: 'Error',
  success: 'Success',
  question: 'Question',
  example: 'Example',
  quote: 'Quote',
  todo: 'Todo',
};

/**
 * A note only earns a link if the site actually builds a page for it.
 * Linking to a draft or an unpublished decision would produce a 404, which
 * is worse than rendering the words unlinked.
 */
function hasPublicPage(collection, filePath) {
  let frontmatter = '';
  try {
    const raw = fs.readFileSync(filePath, 'utf8');
    const match = /^---\r?\n([\s\S]*?)\r?\n---/.exec(raw);
    if (!match) return collection !== 'decisions'; // no frontmatter, no gate
    frontmatter = match[1];
  } catch {
    return false;
  }

  const flag = (key) => {
    const found = new RegExp(`^${key}:\\s*(true|false)\\s*$`, 'm').exec(frontmatter);
    return found ? found[1] === 'true' : null;
  };

  if (collection === 'blog') return flag('draft') !== true;
  if (collection === 'decisions') return flag('publish') === true;

  return true;
}

/**
 * Index every note by basename so [[Some Note]] resolves the way it does
 * inside Obsidian — by name, regardless of folder.
 */
function buildNoteIndex() {
  const index = new Map();

  let collections = [];
  try {
    collections = fs.readdirSync(CONTENT_ROOT, { withFileTypes: true });
  } catch {
    return index; // no content dir yet; every link falls back to plain text
  }

  for (const collection of collections) {
    if (!collection.isDirectory() || collection.name.startsWith('_')) continue;

    const prefix = ROUTED[collection.name];
    if (!prefix) continue; // collection has no public route

    const dir = path.join(CONTENT_ROOT, collection.name);
    for (const file of fs.readdirSync(dir)) {
      if (!/\.mdx?$/.test(file)) continue;

      const full = path.join(dir, file);
      if (!hasPublicPage(collection.name, full)) continue;

      const slug = file.replace(/\.mdx?$/, '');
      // Last one wins only if the name is not already taken, so a note is
      // never silently repointed at a different collection.
      if (!index.has(slug)) index.set(slug, `${prefix}/${slug}`);
    }
  }

  return index;
}

/** Obsidian matches note names loosely; mirror that. */
function normalise(name) {
  return name.trim().toLowerCase().replace(/\s+/g, '-');
}

function resolveNote(index, target) {
  return index.get(target.trim()) ?? index.get(normalise(target)) ?? null;
}

function slugifyHeading(heading) {
  return heading
    .trim()
    .toLowerCase()
    .replace(/[^\w\s-]/g, '')
    .replace(/\s+/g, '-');
}

const IMAGE_EXT = /\.(png|jpe?g|gif|svg|webp|avif)$/i;

/** Split one text node into the nodes its Obsidian syntax describes. */
function expandText(value, index) {
  // Embeds and links first, then highlights inside whatever text remains.
  const pattern = /(!?)\[\[([^\]|#]+)(#[^\]|]+)?(?:\|([^\]]+))?\]\]/g;
  const out = [];
  let last = 0;
  let match;

  while ((match = pattern.exec(value)) !== null) {
    if (match.index > last) {
      out.push(...expandHighlights(value.slice(last, match.index)));
    }

    const [raw, bang, target, hash, alias] = match;
    const isEmbed = bang === '!';
    const label = alias?.trim() || target.trim();

    if (isEmbed && IMAGE_EXT.test(target.trim())) {
      out.push({
        type: 'image',
        url: `${ATTACHMENTS_URL}/${encodeURIComponent(target.trim())}`,
        alt: label,
      });
    } else {
      const href = resolveNote(index, target);

      if (href) {
        out.push({
          type: 'link',
          url: hash ? `${href}#${slugifyHeading(hash.slice(1))}` : href,
          children: [{ type: 'text', value: label }],
        });
      } else {
        // Unpublished or unknown note: keep the words, drop the link.
        out.push({
          type: 'strong',
          data: {
            hName: 'span',
            hProperties: { className: ['wikilink-unresolved'] },
          },
          children: [{ type: 'text', value: label }],
        });
      }
    }

    last = match.index + raw.length;
  }

  if (last === 0) return null; // nothing matched; let highlights handle it
  if (last < value.length) out.push(...expandHighlights(value.slice(last)));

  return out;
}

/** ==text== → <mark>text</mark> */
function expandHighlights(value) {
  const pattern = /==([^=]+)==/g;
  const out = [];
  let last = 0;
  let match;

  while ((match = pattern.exec(value)) !== null) {
    if (match.index > last) {
      out.push({ type: 'text', value: value.slice(last, match.index) });
    }
    out.push({
      type: 'strong',
      data: { hName: 'mark' },
      children: [{ type: 'text', value: match[1] }],
    });
    last = match.index + match[0].length;
  }

  if (last === 0) return [{ type: 'text', value }];
  if (last < value.length) out.push({ type: 'text', value: value.slice(last) });

  return out;
}

/** > [!warning] Title → a styled callout block. */
function transformCallout(node) {
  const firstBlock = node.children?.[0];
  if (firstBlock?.type !== 'paragraph') return;

  const firstText = firstBlock.children?.[0];
  if (firstText?.type !== 'text') return;

  const match = /^\[!(\w+)\]([+-])?\s*(.*)/.exec(firstText.value);
  if (!match) return;

  const type = match[1].toLowerCase();
  if (!(type in CALLOUTS)) return;

  const title = match[3].trim() || CALLOUTS[type];

  node.data = {
    ...node.data,
    hName: 'aside',
    hProperties: { className: ['callout', `callout-${type}`] },
  };

  // Drop the marker line; if it carried body text on the same line, keep it.
  const rest = firstText.value.slice(match[0].length).replace(/^\n/, '');
  firstText.value = rest;

  const remaining = firstBlock.children.filter(
    (child, i) => i !== 0 || child.value !== '',
  );

  const titleNode = {
    type: 'paragraph',
    data: { hProperties: { className: ['callout-title'] } },
    children: [{ type: 'text', value: title }],
  };

  node.children = remaining.length > 0
    ? [titleNode, { ...firstBlock, children: remaining }, ...node.children.slice(1)]
    : [titleNode, ...node.children.slice(1)];
}

const SKIP = new Set(['code', 'inlineCode', 'html', 'yaml', 'mdxjsEsm']);

export default function remarkObsidian() {
  const index = buildNoteIndex();

  return function transform(tree) {
    walk(tree);

    function walk(node) {
      if (!node || SKIP.has(node.type)) return;

      if (node.type === 'blockquote') transformCallout(node);

      if (!Array.isArray(node.children)) return;

      const next = [];
      let changed = false;

      for (const child of node.children) {
        if (child.type === 'text') {
          const expanded = expandText(child.value, index);
          if (expanded) {
            next.push(...expanded);
            changed = true;
            continue;
          }

          const highlighted = expandHighlights(child.value);
          if (highlighted.length > 1) {
            next.push(...highlighted);
            changed = true;
            continue;
          }
        }

        walk(child);
        next.push(child);
      }

      if (changed) node.children = next;
    }
  };
}
