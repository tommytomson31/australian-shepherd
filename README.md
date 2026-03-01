# Heritage Hill Aussies - Website

A modern Next.js website for Heritage Hill Aussies with Sanity.io CMS integration for easy content management.

## Features

- **Sanity.io CMS**: Easily manage puppies, pages, galleries, and more
- **Dynamic Content**: All content is fetched from Sanity and can be updated without code changes
- **Embedded Studio**: Access the CMS at `/studio` on your website
- **Responsive Design**: Beautiful on all devices
- **TypeScript**: Full type safety throughout the codebase

## Getting Started

### Prerequisites

- Node.js 18+ installed
- npm or yarn package manager
- A Sanity.io account (free tier available)

### 1. Install Dependencies

```bash
npm install
```

### 2. Set Up Sanity

1. Go to [sanity.io/manage](https://www.sanity.io/manage) and create a new project
2. Note your **Project ID** from the project dashboard
3. Copy `.env.local.example` to `.env.local`:

```bash
copy .env.local.example .env.local
```

4. Edit `.env.local` and add your Sanity credentials:

```env
NEXT_PUBLIC_SANITY_PROJECT_ID=your_project_id_here
NEXT_PUBLIC_SANITY_DATASET=production
```

### 3. Configure CORS (Required for Studio)

1. Go to [sanity.io/manage](https://www.sanity.io/manage) and select your project
2. Navigate to **API** → **CORS origins**
3. Add your domains:
   - `http://localhost:3000` (for development)
   - `https://yourdomain.com` (for production)

### 4. Run the Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to see the website.

Access the Sanity Studio at [http://localhost:3000/studio](http://localhost:3000/studio) to manage content.

## Content Management

### Accessing the CMS

Navigate to `/studio` on your website (e.g., `https://yourdomain.com/studio`). Log in with your Sanity account.

### Content Types

#### Puppies
Manage your puppy listings with:
- Name, gender, age, price
- Status (Available, Reserved, Sold)
- Multiple images with gallery support
- Color/markings description
- Parent dog references

#### Parent Dogs
Add information about your breeding dogs:
- Name, gender, color
- Health tests completed
- AKC registration info
- Multiple images

#### Photo Galleries
Create galleries to showcase:
- Past litters
- Happy families
- Your dogs and property
- Events and activities

#### Pages
Create custom pages with:
- Rich text content (headings, lists, links)
- Inline images
- SEO settings
- Hero images

#### Testimonials
Add customer testimonials with:
- Quote text
- Author name and location
- Optional photo

#### Site Settings
Configure global settings:
- Site name and tagline
- Contact information
- Social media links
- Logo

## Moving Images to Public Folder

Your existing images need to be accessible by Next.js. The images are already in the `images` folder, which is included in the `public` directory structure for Next.js.

To ensure images work:
1. Create a `public` folder in your project root (if not exists)
2. Move or copy the `images` folder into `public`

The images will then be accessible at paths like `/images/Parents and past litters/Hero Image.jpg`.

## Deployment

### Vercel (Recommended)

1. Push your code to GitHub
2. Import the project in [Vercel](https://vercel.com)
3. Add environment variables in Vercel dashboard
4. Deploy!

### Environment Variables for Production

Set these in your hosting platform:

```
NEXT_PUBLIC_SANITY_PROJECT_ID=your_project_id
NEXT_PUBLIC_SANITY_DATASET=production
```

## Project Structure

```
├── app/
│   ├── (site)/           # Main website pages
│   │   ├── page.tsx      # Home page
│   │   ├── about/        # About page
│   │   ├── puppies/      # Puppies listing
│   │   ├── contact/      # Contact page
│   │   ├── gallery/      # Photo galleries
│   │   └── [slug]/       # Dynamic CMS pages
│   ├── studio/           # Sanity Studio (CMS)
│   ├── layout.tsx        # Root layout
│   └── globals.css       # Global styles
├── components/           # React components
├── sanity/
│   ├── lib/              # Sanity client & queries
│   └── schemas/          # Content type schemas
├── public/               # Static assets
│   └── images/           # Your images
└── css/                  # Additional styles
```

## Customization

### Adding New Content Types

1. Create a new schema in `sanity/schemas/`
2. Export it from `sanity/schemas/index.ts`
3. Add queries in `sanity/lib/queries.ts`
4. Create components/pages to display the content

### Styling

The site uses your existing CSS from `css/styles.css` plus Tailwind CSS utilities. Modify either to customize the appearance.

## Support

For questions about this website, contact the development team.

For Sanity.io documentation, visit [sanity.io/docs](https://www.sanity.io/docs).
