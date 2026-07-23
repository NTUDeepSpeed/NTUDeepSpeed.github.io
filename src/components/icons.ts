/** Inline SVG icons from the design system (stroke-based, currentColor). */

const base = (size: number, strokeWidth: number, body: string): string =>
  `<svg width="${size}" height="${size}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="${strokeWidth}" stroke-linecap="round" stroke-linejoin="round">${body}</svg>`;

export const icons = {
  github: (size = 14) =>
    base(size, 1.8, '<path d="M9 18l-4-6 4-6"></path><path d="M15 6l4 6-4 6"></path>'),
  instagram: (size = 14) =>
    base(
      size,
      1.8,
      '<rect x="3" y="3" width="18" height="18" rx="5"></rect><circle cx="12" cy="12" r="4"></circle><circle cx="17.3" cy="6.7" r="0.6" fill="currentColor" stroke="none"></circle>',
    ),
  linkedin: (size = 14) =>
    base(
      size,
      1.8,
      '<rect x="3" y="3" width="18" height="18" rx="2"></rect><line x1="7.5" y1="10" x2="7.5" y2="16.5"></line><circle cx="7.5" cy="7" r="0.6" fill="currentColor" stroke="none"></circle><path d="M11.5 16.5v-4a2.2 2.2 0 0 1 4.4 0v4"></path><line x1="11.5" y1="10" x2="11.5" y2="16.5"></line>',
    ),
  email: (size = 14) =>
    base(size, 1.8, '<rect x="3" y="5" width="18" height="14" rx="2"></rect><path d="M3 7l9 6 9-6"></path>'),
  location: (size = 16) =>
    base(
      size,
      1.8,
      '<path d="M12 21s-7-6.2-7-11.5A7 7 0 0 1 19 9.5C19 14.8 12 21 12 21z"></path><circle cx="12" cy="9.5" r="2.5"></circle>',
    ),
  arrowRight: (size = 14) => base(size, 2.5, '<path d="M5 12h14M13 5l7 7-7 7"></path>'),
  arrowLeft: (size = 14) => base(size, 2.5, '<path d="M19 12H5M11 19l-7-7 7-7"></path>'),
  external: (size = 12) => base(size, 2.2, '<path d="M7 17L17 7"></path><path d="M8 7h9v9"></path>'),
};
