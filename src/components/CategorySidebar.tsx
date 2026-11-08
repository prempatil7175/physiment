import React from 'react';
import { motion } from 'framer-motion';
import { Search, X, SlidersHorizontal, ArrowUpDown, Filter, Sparkles } from 'lucide-react';
import { SortMode } from '../types';

interface CategorySidebarProps {
  categories: string[];
  selectedCategory: string;
  onSelectCategory: (category: string) => void;
  categoryCounts: Record<string, number>;
  searchQuery: string;
  onSearchChange: (query: string) => void;
  sortMode: SortMode;
  onSortChange: (mode: SortMode) => void;
  totalFilteredCount: number;
}

export const CategorySidebar: React.FC<CategorySidebarProps> = ({
  categories,
  selectedCategory,
  onSelectCategory,
  categoryCounts,
  searchQuery,
  onSearchChange,
  sortMode,
  onSortChange,
  totalFilteredCount,
}) => {
  return (
    <aside className="w-full lg:w-80 shrink-0">
      <div className="sticky top-28 space-y-6">
        
        {/* Search Bar Panel */}
        <div className="glass-panel p-5 rounded-2xl shadow-sm border border-slate-200/80">
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-500 flex items-center gap-1.5">
              <Search className="w-3.5 h-3.5 text-blue-600" />
              Search Portfolio
            </span>
            {searchQuery && (
              <span className="text-[11px] font-semibold text-blue-600 bg-blue-50 px-2 py-0.5 rounded-full">
                {totalFilteredCount} found
              </span>
            )}
          </div>

          <div className="relative">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => onSearchChange(e.target.value)}
              placeholder="Search by brand, salt, or dosage..."
              className="w-full pl-9 pr-8 py-2.5 text-sm bg-white border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all placeholder:text-slate-400 font-medium text-slate-800"
            />
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-3.5 pointer-events-none" />
            {searchQuery && (
              <button
                type="button"
                onClick={() => onSearchChange('')}
                className="absolute right-2.5 top-3 p-0.5 rounded-full text-slate-400 hover:text-slate-600 hover:bg-slate-100 transition-colors"
              >
                <X className="w-4 h-4" />
              </button>
            )}
          </div>
        </div>

        {/* Categories Navigation Panel */}
        <div className="glass-panel p-5 rounded-2xl shadow-sm border border-slate-200/80">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-500 flex items-center gap-1.5">
              <Filter className="w-3.5 h-3.5 text-blue-600" />
              Therapeutic Portfolios
            </h3>
            <span className="text-[11px] font-semibold text-slate-400">
              {categories.length} Categories
            </span>
          </div>

          <div className="space-y-1.5" role="tablist">
            {categories.map((category) => {
              const isSelected = selectedCategory === category;
              const count = categoryCounts[category] || 0;

              return (
                <button
                  key={category}
                  type="button"
                  onClick={() => onSelectCategory(category)}
                  className={`relative w-full text-left px-3.5 py-3 rounded-xl text-xs sm:text-sm font-semibold transition-all duration-200 flex items-center justify-between group ${
                    isSelected ? 'text-blue-700 font-bold' : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100/70'
                  }`}
                  role="tab"
                  aria-selected={isSelected}
                >
                  {/* Sliding Background Indicator Pill */}
                  {isSelected && (
                    <motion.div
                      layoutId="categorySliderPill"
                      className="absolute inset-0 bg-gradient-to-r from-blue-50 to-sky-50/70 border border-blue-200/90 rounded-xl shadow-sm"
                      transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                    />
                  )}

                  <span className="relative z-10 truncate pr-2">
                    {category}
                  </span>

                  <span
                    className={`relative z-10 text-xs px-2 py-0.5 rounded-full font-mono transition-colors ${
                      isSelected
                        ? 'bg-blue-600 text-white font-bold'
                        : 'bg-slate-100 text-slate-500 group-hover:bg-slate-200'
                    }`}
                  >
                    {count}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Sorting & Filter Options Panel */}
        <div className="glass-panel p-5 rounded-2xl shadow-sm border border-slate-200/80">
          <div className="flex items-center justify-between mb-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500 flex items-center gap-1.5">
              <ArrowUpDown className="w-3.5 h-3.5 text-blue-600" />
              Sort Formulations
            </h4>
          </div>

          <div className="space-y-2">
            {[
              { id: 'default', label: 'Default Clinical Order' },
              { id: 'price-asc', label: 'Price: Low to High' },
              { id: 'price-desc', label: 'Price: High to Low' },
              { id: 'name-asc', label: 'Brand Name: A to Z' },
            ].map((option) => (
              <label
                key={option.id}
                className="flex items-center gap-2.5 text-xs font-medium text-slate-700 cursor-pointer p-2 rounded-lg hover:bg-slate-50 transition-colors"
              >
                <input
                  type="radio"
                  name="sort-mode"
                  checked={sortMode === option.id}
                  onChange={() => onSortChange(option.id as SortMode)}
                  className="w-3.5 h-3.5 text-blue-600 border-slate-300 focus:ring-blue-500 cursor-pointer"
                />
                <span>{option.label}</span>
              </label>
            ))}
          </div>
        </div>

        {/* Quality Assurance Certificate Banner */}
        <div className="rounded-2xl p-4 bg-gradient-to-br from-blue-900 to-indigo-950 text-white shadow-lg relative overflow-hidden">
          <div className="absolute top-0 right-0 -mr-4 -mt-4 w-24 h-24 bg-sky-400/20 rounded-full blur-xl pointer-events-none" />
          <div className="flex items-center gap-2 mb-2">
            <Sparkles className="w-4 h-4 text-cyan-400" />
            <span className="text-[11px] font-bold uppercase tracking-wider text-cyan-300">
              Direct Supply Guarantee
            </span>
          </div>
          <p className="text-xs text-slate-300 leading-relaxed mb-3">
            Physiment products are manufactured in compliance with cGMP, ISO, and Schedule M standards.
          </p>
          <a
            href="#cfa"
            className="inline-block text-[11px] font-bold text-white bg-blue-600/80 hover:bg-blue-600 px-3 py-1.5 rounded-lg border border-white/10 transition-colors"
          >
            Become an Authorized Distributor →
          </a>
        </div>

      </div>
    </aside>
  );
};

