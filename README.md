# Portfolio Website

A modern, sleek, and professional portfolio website showcasing design, film, and modeling work.

## Getting Started

### Development

First, install the dependencies:

```bash
npm install
```

Then, run the development server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser to see your portfolio.

### Building for Production

To create a production build:

```bash
npm run build
npm start
```

## 📁 Where to Upload Your Media Files

### Step 1: Create Portfolio Folders

Create the following folder structure in the `public` directory:

```
public/
  └── portfolio/
      ├── design/
      ├── film/
      └── modeling/
```

### Step 2: Add Your Images/Videos

1. **For Design Work:**
   - Place your design images in `public/portfolio/design/`
   - Recommended formats: `.jpg`, `.png`, `.webp`
   - Recommended size: 1200x1200px or larger (square format works best)
   - Name your files descriptively (e.g., `brand-identity-project.jpg`)

2. **For Film Work:**
   - Place film stills/thumbnails in `public/portfolio/film/`
   - You can also add video files here (`.mp4`, `.webm`)
   - Recommended thumbnail size: 1920x1080px or larger
   - Name your files descriptively (e.g., `short-film-the-journey.jpg`)

3. **For Modeling Work:**
   - Place your modeling photos in `public/portfolio/modeling/`
   - Recommended formats: `.jpg`, `.png`, `.webp`
   - Recommended size: 1200x1800px or larger (portrait format works well)
   - Name your files descriptively (e.g., `editorial-vogue-2024.jpg`)

### Step 3: Update the Portfolio Content

Open `app/page.tsx` and find the sections marked with comments:

```typescript
// Add your design work here
const designWork = [
  {
    id: '1',
    title: 'Your Project Title',
    category: 'Design',
    image: '/portfolio/design/your-image.jpg',
    description: 'A brief description of your project',
  },
  // Add more projects...
];
```

**For each piece of work, add an object with:**
- `id`: A unique identifier (e.g., '1', '2', '3')
- `title`: The name of your project
- `category`: 'Design', 'Film', or 'Modeling'
- `image`: The path to your image (starting with `/portfolio/...`)
- `description`: (Optional) A brief description of the project

### Example: Adding a Design Project

1. Upload your image to `public/portfolio/design/my-logo-design.jpg`
2. In `app/page.tsx`, add to the `designWork` array:

```typescript
const designWork = [
  {
    id: '1',
    title: 'Logo Design for Tech Startup',
    category: 'Design',
    image: '/portfolio/design/my-logo-design.jpg',
    description: 'A modern, minimalist logo design exploring geometric shapes',
  },
];
```

### Example: Adding a Film Project

1. Upload your film still to `public/portfolio/film/my-short-film.jpg`
2. In `app/page.tsx`, add to the `filmWork` array:

```typescript
const filmWork = [
  {
    id: '1',
    title: 'Short Film: "The Journey"',
    category: 'Film',
    image: '/portfolio/film/my-short-film.jpg',
    description: 'A 5-minute narrative exploring themes of identity and belonging',
  },
];
```

### Example: Adding a Modeling Project

1. Upload your photo to `public/portfolio/modeling/editorial-shoot.jpg`
2. In `app/page.tsx`, add to the `modelingWork` array:

```typescript
const modelingWork = [
  {
    id: '1',
    title: 'Fashion Editorial - Spring Collection',
    category: 'Modeling',
    image: '/portfolio/modeling/editorial-shoot.jpg',
    description: 'Collaboration with photographer for spring fashion editorial',
  },
];
```

## 🎨 Customizing Your Portfolio

### Update Personal Information

1. **Hero Section:** Edit `app/components/Hero.tsx` to change your name and tagline
2. **About Section:** Edit `app/components/About.tsx` to update your bio
3. **Contact Section:** Edit `app/components/Contact.tsx` to add your email and social media links

### Update Site Metadata

Edit `app/layout.tsx` to change the title and description that appears in browser tabs and search results.

### Styling

The site uses Tailwind CSS for styling. You can customize colors, fonts, and spacing by editing the component files or the global styles in `app/globals.css`.

## 📝 Tips for Best Results

1. **Image Optimization:**
   - Use high-quality images but compress them for web (keep file sizes under 500KB per image)
   - Use tools like [TinyPNG](https://tinypng.com) or [Squoosh](https://squoosh.app) to compress images
   - Square images (1:1) work best for the grid layout

2. **Naming Conventions:**
   - Use lowercase letters and hyphens for file names (e.g., `my-project-2024.jpg`)
   - Avoid spaces and special characters in file names

3. **Organizing Your Work:**
   - Keep related projects together
   - Consider the order - the first items will appear first in the grid

## 🚀 Deploying Your Portfolio

### Deploy to Vercel (Recommended)

1. Push your code to GitHub
2. Go to [vercel.com](https://vercel.com)
3. Import your GitHub repository
4. Vercel will automatically deploy your site

### Other Deployment Options

- **Netlify:** Similar to Vercel, connect your GitHub repo
- **GitHub Pages:** Requires additional configuration
- **Any hosting service:** Build with `npm run build` and upload the `.next` folder

## 📧 Need Help?

If you need to make changes or have questions about updating your portfolio, refer back to this README or the code comments in `app/page.tsx`.

---

**Note:** Make sure to replace placeholder content (like email addresses and social media links) with your actual contact information before deploying!
