# Sabin Khatri - Portfolio Website

A professional portfolio website with Apple-inspired minimalist design, optimized with Vite for maximum performance.

## 🚀 Features

- **Apple-inspired Design**: Clean, minimalist aesthetic with lots of white space
- **Optimized Build**: Vite-powered for fast loading and optimal performance
- **Responsive Design**: Works beautifully on all devices (desktop, tablet, mobile)
- **Smooth Animations**: Subtle fade-in effects and parallax scrolling
- **Image Support**: Multiple image sections throughout the portfolio
- **Modern Typography**: System fonts for that native Apple feel
- **Performance Optimized**: Minified CSS/JS, lazy loading, code splitting
- **All Resume Sections Included**:
  - Professional Summary
  - Certification
  - Technical Skills
  - Experience
  - Education
  - Projects (RAG & Machine Learning)
  - Reference

## 📦 Installation

1. Install dependencies:
```bash
npm install
```

## 🛠️ Development

Start the development server with hot reload:
```bash
npm run dev
```
The site will open at `http://localhost:3000`

## 🏗️ Build for Production

Build optimized production files:
```bash
npm run build
```

The optimized files will be in the `dist/` folder.

Preview the production build:
```bash
npm run preview
```

## 📁 Project Structure

```
MY_Porfolio/
├── index.html          # Main HTML structure
├── styles.css          # Apple-inspired styling
├── script.js           # Optimized JavaScript (ES6+)
├── vite.config.js      # Vite configuration
├── package.json        # Dependencies and scripts
├── images/             # Portfolio images directory
└── dist/               # Production build (generated)
```

## 🖼️ Adding Images

Images have been automatically downloaded and placed in the `images/` folder! These are professional stock images from Unsplash that match your portfolio theme.

**To download fresh images:**
```bash
node download-images.js
```

**To use your own images:**
Simply replace the images in the `images/` folder with your own, keeping the same filenames. See `images/README.md` for a complete list of required images and their recommended dimensions.

**Note**: Images are optional - the website will work perfectly fine without them, showing a clean design with your content.

## ⚡ Optimization Features

- **Code Splitting**: Automatic chunk splitting for optimal loading
- **Minification**: CSS and JS are minified in production
- **Asset Optimization**: Images are optimized and hashed
- **Lazy Loading**: Images load as you scroll
- **Tree Shaking**: Unused code is removed
- **Modern JavaScript**: ES6+ with class-based architecture
- **Request Animation Frame**: Smooth, performant animations

## 🎨 Design Features

- **Glassmorphism Navigation**: Translucent navbar with backdrop blur
- **Smooth Scrolling**: Elegant page transitions with easing
- **Fade-in Animations**: Content appears as you scroll
- **Card-based Layout**: Modern card design for all sections
- **Hover Effects**: Subtle interactions on interactive elements
- **Responsive Grid**: Adapts beautifully to any screen size

## 🔧 Customization

- **Content**: Edit `index.html` to update your information
- **Styling**: Modify CSS variables in `styles.css` `:root` section
- **Build Config**: Adjust `vite.config.js` for different optimization settings

## 📝 Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run optimize` - Build with production optimizations

## 🌐 Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## 📄 License

© 2025 Sabin Khatri. All rights reserved.

