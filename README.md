This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Email (contact form & calculator leads)

Contact form and calculator leads are sent to **fennordevelopments@gmail.com** via [Resend](https://resend.com). For this to work:

1. **Get an API key** at [resend.com](https://resend.com) (sign up, then create an API key).
2. **Set the env var** where the app runs:
   - **Local:** create a `.env.local` file with `RESEND_API_KEY=re_xxxxx`.
   - **Vercel:** Project → Settings → Environment Variables → add `RESEND_API_KEY` with your key, then redeploy.
   - **Other hosts:** add `RESEND_API_KEY` to the production environment and redeploy.

If `RESEND_API_KEY` is missing, the contact form will show “Email is not configured” and calculator leads will not be sent (no error is shown to the user). Check the browser Network tab for `/api/contact` or `/api/calculator-lead` to see 503 when the key is missing.

**Production:** Resend may require a **verified domain** for emails to be delivered. Add your domain at [resend.com/domains](https://resend.com/domains), add the DNS records they give you, then set `RESEND_FROM="Fennor Developments <hello@yourdomain.ie>"` in your production env. Do not use @gmail.com for `RESEND_FROM`. If unset, the app uses `onboarding@resend.dev`, which can be limited in production.

## Gallery

Images in `public/gallery/` are shown on the gallery and solar-gallery pages. Only **root-level** files are listed (the `thumbs/` folder is used for grid thumbnails, not as separate images).

- **HEIC photos:** Browsers don’t display HEIC. To show them, convert to JPG once:
  ```bash
  npm run gallery:convert-heic
  ```
  This creates a `.jpg` for each `.heic`/`.HEIC` in `public/gallery/`. Then run `npm run generate-thumbs` (or `npm run build`) to create thumbnails.

- **Thumbnails:** Before building, run `npm run generate-thumbs` to create small JPGs in `public/gallery/thumbs/` for faster grid loading.

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.

### Make sure the **latest** deployment is live (gallery + SEO)

If the live site is missing the gallery photos or SEO updates, **Production** may be pointing at an old deployment.

1. In the [Vercel dashboard](https://vercel.com), open your project.
2. Go to **Deployments**.
3. Find the deployment from the **latest commit on `main`** (e.g. most recent “Ready” build).
4. Open the **⋯** menu on that deployment → **Promote to Production**.

After promoting, the live site will serve that build (with gallery, SEO, and all pushed changes). New pushes to `main` will create new deployments; promote the latest one when you want it live.
# fennor-developments-website
# fennor-developments-website
# fennor-developments-website
# fennor-developments-website
