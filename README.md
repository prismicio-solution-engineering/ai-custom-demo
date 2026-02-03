# AI-Powered Brand Styling Demo

This is a [Next.js](https://nextjs.org) project that demonstrates **AI-powered automatic brand styling** for websites using Prismic CMS.

## 🎨 What This Project Does

This project combines **AI vision capabilities** with the **Brand.dev API** to automatically style websites based on brand analysis:

1. **Fetches brand data** from any domain (logos, colors, descriptions)
2. **AI analyzes the live website** to understand visual prominence
3. **Generates CSS variables** optimized for the brand
4. **Applies styling** to all Prismic slices automatically

## 🚀 Getting Started

### Install Dependencies

```bash
npm install
```

### Set Up Environment Variables

Create a `.env.local` file:

```env
BRAND_DEV_API_KEY=your_brand_dev_api_key
USE_MOCK_BRANDING=false
PRISMIC_DEBUG=false
DEBUG_MODE=false
```

### Run Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to see the result.

## 🤖 AI Brand Style Generation

### Generate Brand Styles for a Domain

```bash
npm run generate-brand -- example.com
```

This command:
1. Analyzes the target domain using AI
2. Fetches official brand data from Brand.dev
3. Uses Claude Agent SDK to "see" the website
4. Generates optimized CSS variables
5. Writes them to `app/brand-variables.css`

### Source of Truth

**`app/brand-variables.css`** is the single source of truth for all brand styling.

The AI modifies this file directly with variables like:
- `--color-primary`
- `--color-secondary`
- `--color-background`
- `--text-heading`
- `--text-body`

All Prismic slices reference these CSS variables for consistent branding.

## 📁 Project Structure

```
app/
├── brand-variables.css   # ✨ Source of truth (AI-generated)
├── globals.css           # Global styles (imports brand-variables)
└── layout.tsx            # Root layout

lib/
├── fetchStyles.ts        # Brand.dev API integration
├── generateBrandStyles.ts # AI style generation logic
└── aiAgent.ts            # Claude Agent SDK wrapper

scripts/
└── generate-brand.ts     # CLI script for brand generation

slices/
└── [various slices]      # Prismic components (use CSS variables)
```

## 🎯 How to Use in Slices

In your Prismic slices, reference the CSS variables:

```tsx
// slices/Hero/index.tsx
const Hero = ({ slice }) => (
  <section style={{ 
    backgroundColor: 'var(--color-background)',
    color: 'var(--text-body)'
  }}>
    <h1 style={{ color: 'var(--color-primary)' }}>
      {slice.primary.heading}
    </h1>
  </section>
);
```

Or use Tailwind with CSS variables:

```tsx
<div className="bg-[var(--color-primary)] text-[var(--text-heading)]">
  Content here
</div>
```

## 🔧 Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run slicemachine` - Launch Slice Machine
- `npm run generate-brand -- <domain>` - Generate brand styles for a domain

## 📚 Learn More

- [Next.js Documentation](https://nextjs.org/docs)
- [Prismic Documentation](https://prismic.io/docs)
- [Brand.dev API](https://brand.dev)
- [Claude Agent SDK](https://github.com/anthropics/anthropic-sdk-typescript)

## 🚢 Deploy

Deploy on [Vercel](https://vercel.com/new):

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/yourusername/ai-custom-demo)
