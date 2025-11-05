# Quick Start Guide - Adding Your Media

## 📍 Where to Put Your Files

### Folder Structure (Already Created For You!)
```
public/
  └── portfolio/
      ├── design/      ← Put design images here
      ├── film/        ← Put film stills/thumbnails here
      └── modeling/    ← Put modeling photos here
```

## ⚡ Quick Steps

### 1. Add Your Images
Copy your image files into the appropriate folders:
- Design work → `public/portfolio/design/`
- Film work → `public/portfolio/film/`
- Modeling work → `public/portfolio/modeling/`

### 2. Update the Code
Open `app/page.tsx` and find these sections (around lines 10-40):

**For Design:**
```typescript
const designWork = [
  {
    id: '1',
    title: 'Your Project Name',
    category: 'Design',
    image: '/portfolio/design/your-image-filename.jpg',
    description: 'Optional description here',
  },
];
```

**For Film:**
```typescript
const filmWork = [
  {
    id: '1',
    title: 'Your Film Title',
    category: 'Film',
    image: '/portfolio/film/your-image-filename.jpg',
    description: 'Optional description here',
  },
];
```

**For Modeling:**
```typescript
const modelingWork = [
  {
    id: '1',
    title: 'Your Project Title',
    category: 'Modeling',
    image: '/portfolio/modeling/your-image-filename.jpg',
    description: 'Optional description here',
  },
];
```

### 3. Example

If you have a file called `my-logo.jpg` in the design folder:

1. ✅ File is at: `public/portfolio/design/my-logo.jpg`
2. ✅ In code, use: `image: '/portfolio/design/my-logo.jpg'`

**Note:** The path always starts with `/portfolio/` and matches your folder structure!

### 4. Update Contact Info

Open `app/components/Contact.tsx` and replace:
- `your.email@example.com` with your actual email
- `https://instagram.com/yourhandle` with your actual Instagram URL

### 5. View Your Site

Run `npm run dev` and visit `http://localhost:3000`

---

**That's it!** Your portfolio will automatically display your work in a beautiful grid layout.

