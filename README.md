# AI-Powered Brand Styling Demo

This is a [Next.js](https://nextjs.org) project that demonstrates **AI-powered automatic brand styling** for websites using Prismic CMS.

## What This Project Does

This project combines **AI vision capabilities** with the **Brand.dev API** to automatically style websites based on brand analysis:

1. **Fetches brand data** from any domain (logos, colors, descriptions)
2. **AI analyzes the live website** to understand visual prominence
3. **Updates CSS variables** in `app/globals.css`
4. **All components automatically reflect** the new brand colors

## Getting Started

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to see the result.

## Styling System

All colors are defined as CSS variables in `app/globals.css`. Components use these variables via Tailwind's arbitrary value syntax (e.g., `bg-[var(--color-background)]`).

For detailed documentation on available variables, usage examples, and AI agent instructions, see:

**[.cursor/rules/styling.mdc](.cursor/rules/styling.mdc)**

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run slicemachine` - Launch Slice Machine

## Learn More

- [Next.js Documentation](https://nextjs.org/docs)
- [Prismic Documentation](https://prismic.io/docs)
- [Brand.dev API](https://brand.dev)
