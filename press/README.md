# Press

Ready to publish material about Mvua Protocol. Nothing in this folder is part of the site build.

The article is published at [emeditweb.vercel.app/blog/insurance-that-pays-when-the-rain-doesnt-mvua-protocol](https://emeditweb.vercel.app/blog/insurance-that-pays-when-the-rain-doesnt-mvua-protocol).

| File | What it is |
|---|---|
| `mvua-protocol-blog-post.md` | Article: "Insurance That Pays When the Rain Doesn't: What I'm Building With Mvua Protocol" (about 1,300 words, Markdown with frontmatter). |
| `where-rain-data-can-be-trusted.md` | Article: "Two Datasets, 36 Places: Where Rainfall Insurance Can Be Trusted" (about 1,250 words): the second dataset check across 36 sites in 12 countries, why West Africa does not pass yet, and the four regions frozen on testnet. Reuses the existing cover image. |
| `mvua-protocol-cover.svg` | Editable source of the cover image (1672x941). |
| `../public/press/mvua-protocol-cover.png` | The cover image, also served at `https://mvua-site.vercel.app/press/mvua-protocol-cover.png`. |

## Publishing the article on another blog

1. Copy `public/press/mvua-protocol-cover.png` into that blog's image folder, for example `public/blog/`.
2. Point the cover at it: the frontmatter already uses `coverImage: /blog/mvua-protocol-cover.png`; change the image line at the top of the article to the same path, or remove it if the blog shows the frontmatter cover itself.
