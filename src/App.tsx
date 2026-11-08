import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles, Layers, SlidersHorizontal, AlertCircle } from 'lucide-react';
import { CustomCursor } from './components/CustomCursor';
import { Navbar } from './components/Navbar';
import { HeroSection } from './components/HeroSection';
import { ProductCard } from './components/ProductCard';
import { ProductModal } from './components/ProductModal';
import { CategorySidebar } from './components/CategorySidebar';
import { MobileCarousel } from './components/MobileCarousel';
import { StatsSection } from './components/StatsSection';
import { Footer } from './components/Footer';
import { ProductComparison } from './components/ProductComparison';
import { CfaInquiryDrawer } from './components/CfaInquiryDrawer';
import { ENRICHED_PRODUCTS, RAW_PRODUCT_PAYLOAD } from './data/products';
import { Product, SortMode } from './types';

export const App: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>('All Products');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [sortMode, setSortMode] = useState<SortMode>('default');
  const [activeModalProduct, setActiveModalProduct] = useState<Product | null>(null);
  const [viewMode, setViewMode] = useState<'grid' | 'carousel'>('grid');
  const [comparedProductIds, setComparedProductIds] = useState<string[]>([]);
  const [isCompareMatrixOpen, setIsCompareMatrixOpen] = useState<boolean>(false);
  const [isCfaDrawerOpen, setIsCfaDrawerOpen] = useState<boolean>(false);

  const toggleCompare = (product: Product) => {
    if (comparedProductIds.includes(product.id)) {
      setComparedProductIds((prev) => prev.filter((id) => id !== product.id));
    } else {
      if (comparedProductIds.length >= 3) {
        alert('You can compare a maximum of 3 formulations at once.');
        return;
      }
      setComparedProductIds((prev) => [...prev, product.id]);
    }
  };

  const removeComparedProduct = (productId: string) => {
    setComparedProductIds((prev) => prev.filter((id) => id !== productId));
  };

  const clearComparison = () => {
    setComparedProductIds([]);
    setIsCompareMatrixOpen(false);
  };

  const comparedProducts = useMemo(() => {
    return ENRICHED_PRODUCTS.filter((p) => comparedProductIds.includes(p.id));
  }, [comparedProductIds]);

  // Derive unique categories including 'All Products'
  const categories = useMemo(() => {
    return ['All Products', ...RAW_PRODUCT_PAYLOAD.map((c) => c.category)];
  }, []);

  // Compute category counts
  const categoryCounts = useMemo(() => {
    const counts: Record<string, number> = {
      'All Products': ENRICHED_PRODUCTS.length,
    };
    RAW_PRODUCT_PAYLOAD.forEach((catGroup) => {
      counts[catGroup.category] = catGroup.products.length;
    });
    return counts;
  }, []);

  // Filter and sort products based on user selections
  const filteredProducts = useMemo(() => {
    let result = ENRICHED_PRODUCTS;

    // Filter by category
    if (selectedCategory !== 'All Products') {
      result = result.filter((p) => p.category === selectedCategory);
    }

    // Filter by search query (brand name, composition, therapeutic class)
    if (searchQuery.trim() !== '') {
      const q = searchQuery.toLowerCase().trim();
      result = result.filter(
        (p) =>
          p.name.toLowerCase().includes(q) ||
          p.composition.toLowerCase().includes(q) ||
          p.category.toLowerCase().includes(q) ||
          p.therapeuticArea.toLowerCase().includes(q)
      );
    }

    // Apply sorting
    const sorted = [...result];
    const parsePrice = (priceStr: string): number => {
      const numeric = parseInt(priceStr.replace(/[^0-9]/g, ''), 10);
      return isNaN(numeric) ? 0 : numeric;
    };

    if (sortMode === 'price-asc') {
      sorted.sort((a, b) => parsePrice(a.price) - parsePrice(b.price));
    } else if (sortMode === 'price-desc') {
      sorted.sort((a, b) => parsePrice(b.price) - parsePrice(a.price));
    } else if (sortMode === 'name-asc') {
      sorted.sort((a, b) => a.name.localeCompare(b.name));
    }

    return sorted;
  }, [selectedCategory, searchQuery, sortMode]);

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 font-sans selection:bg-blue-600 selection:text-white">
      {/* Custom Fluid Magnetic Cursor */}
      <CustomCursor />

      {/* Sticky Glassmorphic Navigation Bar */}
      <Navbar />

      {/* Hero Section with 3D Pill & Scroll Transforms */}
      <HeroSection />

      {/* Main Interactive Product Catalog Section */}
      <section id="products" className="py-20 bg-slate-50 relative scroll-mt-20">
        
        {/* Subtle Ambient Light Accents */}
        <div className="absolute top-10 right-0 w-96 h-96 bg-blue-100/60 rounded-full blur-3xl pointer-events-none -z-10" />
        <div className="absolute bottom-10 left-0 w-96 h-96 bg-sky-100/50 rounded-full blur-3xl pointer-events-none -z-10" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          {/* Section Super-Header */}
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 border border-blue-200 text-blue-700 text-xs font-bold uppercase tracking-wider mb-3">
                <Sparkles className="w-3.5 h-3.5 text-blue-600" />
                Therapeutic Formulations
              </div>
              <h2 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight">
                Our Pharmaceutical Portfolio
              </h2>
              <p className="text-slate-600 text-sm sm:text-base mt-2 max-w-xl">
                Hover or tap any formulation to inspect chemical stoichiometry, excipients, and regulatory pharmacopeial standards.
              </p>
            </div>

            {/* View Mode Toggle for Tablet/Mobile */}
            <div className="flex items-center gap-2 self-start md:self-auto bg-slate-200/70 p-1 rounded-xl">
              <button
                type="button"
                onClick={() => setViewMode('grid')}
                className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                  viewMode === 'grid'
                    ? 'bg-white text-blue-700 shadow-sm'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                Grid View
              </button>
              <button
                type="button"
                onClick={() => setViewMode('carousel')}
                className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                  viewMode === 'carousel'
                    ? 'bg-white text-blue-700 shadow-sm'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                Carousel View
              </button>
            </div>
          </div>

          {/* Main Layout: Gliding Sidebar + Product Cards */}
          <div className="flex flex-col lg:flex-row gap-8 lg:gap-10 items-start">
            
            {/* Filterable / Sortable Category Sidebar */}
            <CategorySidebar
              categories={categories}
              selectedCategory={selectedCategory}
              onSelectCategory={setSelectedCategory}
              categoryCounts={categoryCounts}
              searchQuery={searchQuery}
              onSearchChange={setSearchQuery}
              sortMode={sortMode}
              onSortChange={setSortMode}
              totalFilteredCount={filteredProducts.length}
            />

            {/* Product Display Area */}
            <main className="flex-1 w-full">
              
              {/* Active Filter Breadcrumbs / Status */}
              <div className="flex flex-wrap items-center justify-between gap-3 mb-6 p-4 rounded-xl bg-white border border-slate-200/80 shadow-xs">
                <div className="flex items-center gap-2 text-xs font-medium text-slate-600">
                  <span>Showing</span>
                  <span className="font-bold text-slate-900 bg-slate-100 px-2 py-0.5 rounded">
                    {filteredProducts.length}
                  </span>
                  <span>formulations in</span>
                  <span className="font-bold text-blue-600">
                    "{selectedCategory}"
                  </span>
                </div>

                {searchQuery && (
                  <button
                    type="button"
                    onClick={() => setSearchQuery('')}
                    className="text-xs font-semibold text-rose-600 hover:underline flex items-center gap-1"
                  >
                    Clear search filter
                  </button>
                )}
              </div>

              {/* Responsive Rendering: Carousel on mobile / toggle, Grid on desktop */}
              {filteredProducts.length === 0 ? (
                <div className="p-12 text-center bg-white rounded-3xl border border-slate-200 shadow-sm my-6">
                  <AlertCircle className="w-10 h-10 text-slate-400 mx-auto mb-3" />
                  <h4 className="text-base font-bold text-slate-800">
                    No matching pharmaceutical formulations found
                  </h4>
                  <p className="text-xs text-slate-500 mt-1 max-w-sm mx-auto">
                    Try searching by active salt name (e.g. "Dapagliflozin", "Telmisartan", "Esomeprazole") or reset the filters.
                  </p>
                  <button
                    type="button"
                    onClick={() => {
                      setSelectedCategory('All Products');
                      setSearchQuery('');
                    }}
                    className="mt-4 px-4 py-2 bg-blue-50 text-blue-700 text-xs font-bold rounded-xl hover:bg-blue-100 transition-colors"
                  >
                    Reset All Filters
                  </button>
                </div>
              ) : (
                <>
                  {/* Grid View (Desktop & Tablet Default) */}
                  <div
                    className={`${
                      viewMode === 'grid'
                        ? 'hidden md:grid md:grid-cols-2 xl:grid-cols-3 gap-6'
                        : 'hidden'
                    }`}
                  >
                    <AnimatePresence mode="popLayout">
                      {filteredProducts.map((product, idx) => (
                        <ProductCard
                          key={product.id}
                          product={product}
                          onOpenModal={setActiveModalProduct}
                          index={idx}
                          isCompared={comparedProductIds.includes(product.id)}
                          onToggleCompare={toggleCompare}
                        />
                      ))}
                    </AnimatePresence>
                  </div>

                  {/* Swipeable Carousel View (Mobile default + toggled mode) */}
                  <div
                    className={`${
                      viewMode === 'carousel'
                        ? 'block'
                        : 'block md:hidden'
                    }`}
                  >
                    <MobileCarousel
                      products={filteredProducts}
                      onOpenModal={setActiveModalProduct}
                    />
                  </div>
                </>
              )}

            </main>
          </div>

        </div>
      </section>

      {/* Clinical Certifications & Manufacturing Standards */}
      <StatsSection />

      {/* Stylized Footer with exact contact details & hover-staggered socials */}
      <Footer />

      {/* Expandable Deep Inspection Modal */}
      <ProductModal
        product={activeModalProduct}
        onClose={() => setActiveModalProduct(null)}
      />

      {/* Side-by-side Formulation Comparison Matrix */}
      <ProductComparison
        selectedProducts={comparedProducts}
        onRemove={removeComparedProduct}
        onClear={clearComparison}
        isOpen={isCompareMatrixOpen}
        onClose={() => setIsCompareMatrixOpen(!isCompareMatrixOpen)}
      />

      {/* Stockist & CFA Territory Application Slide-over Drawer */}
      <CfaInquiryDrawer
        isOpen={isCfaDrawerOpen}
        onClose={() => setIsCfaDrawerOpen(false)}
      />
    </div>
  );
};

export default App;

