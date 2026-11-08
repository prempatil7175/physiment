# Physiment Pharma - Interactive Therapeutic Products Experience

An elite, high-performance React application built for **Physiment Pharma**, engineered with modern Motion Design, Tailwind CSS, and Framer Motion.

---

## 🌟 Key Highlights & Engineering Features

### 1. Motion & Visual Experience
- **Cinematic Hero Section:**
  - Full-height (`min-h-screen`) hero.
  - Staggered word-by-word text reveal on mount using Framer Motion spring physics.
  - Interactive 3D floating pharmaceutical capsule with dual medical color tones, internal bio-pellets, and mouse parallax tilt.
  - Scroll-linked animations using `useScroll` and `useTransform` to gracefully scale and fade the hero while pulling up the product catalog.
- **"Crazy" 3D Product Cards:**
  - 3D tilt on hover with normalized pointer vector tracking, dynamic spring physics (`rotateX`, `rotateY`).
  - Luminous radial gradient border spotlight that dynamically tracks the cursor across the card edges.
  - Seamless layout morph expansion (`layoutId`) revealing full chemical formulation, pharmacopeial colorants (IP / USPNF), and active pharmaceutical ingredients (APIs).
- **Gliding Category Sidebar:**
  - Sticky sidebar with animated active indicator pill using Framer Motion's `layoutId="categorySliderPill"`.
  - Instant fuzzy search across brand names, chemical compositions, and therapeutic classes.
  - Real-time sorting (Default, Price: Low to High, Price: High to Low, Brand Name: A to Z).
  - Dynamic formulation count badges.
- **Mobile Swipeable Carousel:**
  - Fully responsive design that converts into an inertia-driven, drag-scrollable carousel on mobile screens.
- **Fluid Magnetic Cursor:**
  - Custom dual-stage cursor with smooth spring trailing and expanding state when hovering over cards and interactive elements.
- **Footer with Staggered Social Links:**
  - Dark medical aesthetic with corporate headquarters address, contact numbers, and hover-staggered spring animations for social channels.

---

## 🧪 Exact Mock Data Payload Included

- **PHYSIDAP:** PHYSIDAP 10, PHYSIDAP S 10/100, PHYSIDAP TRIO
- **PHYSITEL:** PHYSITEL 40, PHYSITEL 80, PHYSITEL LN 10/40, PHYSITEL CT 6.25, PHYSITEL TRIO, PHYSITEL M 25
- **CARDIAC & DIABETIC CARE:** CV-ACS, PHYGIL XR-30, PHYGIL XR-60, PHYGIL M XR-60
- **GASTROINTESTINAL & MULTIVITAMINS:** PHYSOME-40, PHYSOME-DSR, DALMECO, PHYSIWELL

---

## 🚀 Getting Started

### Prerequisites
- Node.js (v18.0.0 or higher)
- npm, pnpm, or yarn

### Installation
```bash
# Clone or navigate into the directory
cd c:\antigravity\Physiment

# Install dependencies
npm install
# or
pnpm install
```

### Development Server
```bash
npm run dev
# Starts Vite dev server at http://localhost:3000
```

### Production Build
```bash
npm run build
npm run preview
```

---

## 📂 Project Architecture

```
Physiment/
├── index.html                  # HTML entry point with custom Google Fonts
├── package.json                # Dependencies: React 18, Framer Motion, Lucide, Tailwind
├── postcss.config.js           # PostCSS configuration
├── tailwind.config.js          # Tailwind theme tokens & pharma palette
├── tsconfig.json               # TypeScript config
├── vite.config.ts              # Vite configuration
└── src/
    ├── App.tsx                 # Main application orchestrator
    ├── main.tsx                # React DOM render entry
    ├── types/
    │   └── index.ts            # Type definitions & product interfaces
    ├── data/
    │   └── products.ts         # Exact mock data payload & company contact info
    ├── styles/
    │   └── index.css           # Custom clinical grid, glassmorphism & cursor styles
    └── components/
        ├── CustomCursor.tsx    # Magnetic trailing cursor with spring physics
        ├── Navbar.tsx          # Sticky glassmorphic navigation bar
        ├── HeroSection.tsx     # Staggered word reveal & scroll-linked transforms
        ├── FloatingPill3D.tsx  # Interactive 3D floating capsule graphic
        ├── ProductCard.tsx     # 3D tilt, cursor spotlight, and layout morph card
        ├── ProductModal.tsx    # Deep chemical inspection modal
        ├── CategorySidebar.tsx # Gliding category tabs, search & sort
        ├── MobileCarousel.tsx  # Touch-friendly drag/swipe mobile carousel
        ├── StatsSection.tsx    # Clinical certifications & purity telemetry
        └── Footer.tsx          # Stylized footer with exact address, contacts & socials
```

---

## 🏛️ Company Details

- **Address:** Unit No. 105, Aradhya One C-wing Chsl, Pestom Sagar, Amar Mahal, Chembur (w), Mumbai-Maharastra 400089
- **Email:** info@physimentpharma.com
- **Phone:** +91 85919 21818 | +91 22315 90863
- **Certifications:** WHO-GMP, ISO 9001:2015, Schedule M Compliant

