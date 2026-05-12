const API_BASE = import.meta.env.VITE_API_URL || 'http://localhost:5001/api';

// Strip /api from the end to get the base server URL (for uploaded images)
export const SERVER_BASE = API_BASE.replace(/\/api$/, '');

/**
 * Resolves a project thumbnail to a full usable URL.
 * - Uploaded files: /uploads/xxx.jpg → http://localhost:5001/uploads/xxx.jpg
 * - External URLs: https://... → unchanged
 * - Empty / undefined → ''
 */
export function getImageUrl(thumbnail) {
  if (!thumbnail) return '';
  if (thumbnail.startsWith('/uploads')) return `${SERVER_BASE}${thumbnail}`;
  return thumbnail;
}

/**
 * Normalise a raw MongoDB project doc into the shape the frontend expects.
 */
export function normaliseProject(p) {
  return {
    ...p,
    id: p._id,
    slug: p._id,
    coverImage: getImageUrl(p.thumbnail),
    tags: p.technologies ? p.technologies.split(',').map(t => t.trim()) : [],
  };
}
