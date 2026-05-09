import { Search } from 'lucide-react';
import { cn } from '../../utils/cn';
import { CATEGORIES } from '../../config/constants';

export const AuctionFilters = ({ filters, onChange }) => {
  return (
    <div className="space-y-6">
      {/* Search Bar */}
      <div className="relative group">
        <div className="absolute left-4 top-1/2 -translate-y-1/2 text-muted group-focus-within:text-indigo transition-colors">
          <Search size={20} />
        </div>
        <input 
          type="text"
          placeholder="Search for logos, React, video editing..."
          value={filters.q}
          onChange={(e) => onChange({ q: e.target.value })}
          className="w-full bg-white border border-border rounded-xl pl-12 pr-4 py-4 outline-none transition-all focus:border-indigo focus:ring-4 focus:ring-indigo/5"
        />
      </div>

      {/* Categories */}
      <div className="flex flex-wrap gap-2">
        {CATEGORIES.map((cat) => (
          <button
            key={cat}
            onClick={() => onChange({ cat })}
            className={cn(
              "px-5 py-2 rounded-full text-sm font-bold transition-all border",
              filters.cat === cat 
                ? "bg-indigo border-indigo text-white shadow-md shadow-indigo/20 scale-105" 
                : "bg-white border-border text-text2 hover:border-indigo hover:text-indigo"
            )}
          >
            {cat}
          </button>
        ))}
      </div>
    </div>
  );
};
