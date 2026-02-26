import React from 'react';
import { X, ChevronDown, ShieldCheck, Clock, DollarSign, Tag, Award } from 'lucide-react';
import { cn } from '../lib/utils';

interface FilterPanelProps {
  isOpen: boolean;
  onClose: () => void;
  filters: {
    commodity: string;
    grade: string;
    minPrice: string;
    maxPrice: string;
    leadTime: string;
    escrowOnly: boolean;
  };
  setFilters: (filters: any) => void;
  onApply: () => void;
  onReset: () => void;
}

export const FilterPanel: React.FC<FilterPanelProps> = ({
  isOpen,
  onClose,
  filters,
  setFilters,
  onApply,
  onReset
}) => {
  if (!isOpen) return null;

  const commodities = ['All', 'Wheat', 'Corn', 'Soybeans', 'Rice', 'Coffee', 'Cocoa'];
  const grades = ['All', 'Grade A', 'Grade B', 'Grade C', 'Premium', 'Standard'];
  const leadTimes = ['Any', '< 7 days', '1-2 weeks', '2-4 weeks', '1 month+'];

  return (
    <div className="bg-white border border-[#E5E7EB] rounded-2xl shadow-lg overflow-hidden mb-8 animate-in fade-in slide-in-from-top-4 duration-200">
      <div className="p-5 border-b border-[#E5E7EB] flex items-center justify-between bg-[#F9FAFB]">
        <div className="flex items-center gap-2">
          <Tag className="h-5 w-5 text-[#4B5563]" />
          <h3 className="font-bold text-[#111827]">Advanced Filters</h3>
        </div>
        <button 
          onClick={onClose}
          className="p-1 hover:bg-[#E5E7EB] rounded-lg text-[#6B7280] transition-colors"
        >
          <X className="h-5 w-5" />
        </button>
      </div>

      <div className="p-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {/* Commodity Filter */}
        <div className="space-y-2">
          <label className="text-[10px] font-bold uppercase tracking-widest text-[#9CA3AF] flex items-center gap-1.5">
            <Tag className="h-3 w-3" />
            Commodity Type
          </label>
          <div className="relative">
            <select 
              value={filters.commodity}
              onChange={(e) => setFilters({ ...filters, commodity: e.target.value })}
              className="w-full pl-4 pr-10 py-2.5 bg-[#F9FAFB] border border-[#E5E7EB] rounded-xl appearance-none focus:ring-2 focus:ring-[#059669] focus:border-transparent outline-none transition-all text-sm font-medium"
            >
              {commodities.map(c => <option key={c} value={c}>{c}</option>)}
            </select>
            <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-[#9CA3AF] pointer-events-none" />
          </div>
        </div>

        {/* Grade Filter */}
        <div className="space-y-2">
          <label className="text-[10px] font-bold uppercase tracking-widest text-[#9CA3AF] flex items-center gap-1.5">
            <Award className="h-3 w-3" />
            Quality Grade
          </label>
          <div className="relative">
            <select 
              value={filters.grade}
              onChange={(e) => setFilters({ ...filters, grade: e.target.value })}
              className="w-full pl-4 pr-10 py-2.5 bg-[#F9FAFB] border border-[#E5E7EB] rounded-xl appearance-none focus:ring-2 focus:ring-[#059669] focus:border-transparent outline-none transition-all text-sm font-medium"
            >
              {grades.map(g => <option key={g} value={g}>{g}</option>)}
            </select>
            <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-[#9CA3AF] pointer-events-none" />
          </div>
        </div>

        {/* Price Range */}
        <div className="space-y-2">
          <label className="text-[10px] font-bold uppercase tracking-widest text-[#9CA3AF] flex items-center gap-1.5">
            <DollarSign className="h-3 w-3" />
            Price Range (USD)
          </label>
          <div className="flex items-center gap-2">
            <input 
              type="number"
              placeholder="Min"
              value={filters.minPrice}
              onChange={(e) => setFilters({ ...filters, minPrice: e.target.value })}
              className="w-full px-4 py-2.5 bg-[#F9FAFB] border border-[#E5E7EB] rounded-xl focus:ring-2 focus:ring-[#059669] focus:border-transparent outline-none transition-all text-sm font-medium"
            />
            <span className="text-[#9CA3AF]">—</span>
            <input 
              type="number"
              placeholder="Max"
              value={filters.maxPrice}
              onChange={(e) => setFilters({ ...filters, maxPrice: e.target.value })}
              className="w-full px-4 py-2.5 bg-[#F9FAFB] border border-[#E5E7EB] rounded-xl focus:ring-2 focus:ring-[#059669] focus:border-transparent outline-none transition-all text-sm font-medium"
            />
          </div>
        </div>

        {/* Lead Time */}
        <div className="space-y-2">
          <label className="text-[10px] font-bold uppercase tracking-widest text-[#9CA3AF] flex items-center gap-1.5">
            <Clock className="h-3 w-3" />
            Lead Time
          </label>
          <div className="relative">
            <select 
              value={filters.leadTime}
              onChange={(e) => setFilters({ ...filters, leadTime: e.target.value })}
              className="w-full pl-4 pr-10 py-2.5 bg-[#F9FAFB] border border-[#E5E7EB] rounded-xl appearance-none focus:ring-2 focus:ring-[#059669] focus:border-transparent outline-none transition-all text-sm font-medium"
            >
              {leadTimes.map(lt => <option key={lt} value={lt}>{lt}</option>)}
            </select>
            <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-[#9CA3AF] pointer-events-none" />
          </div>
        </div>

        {/* Escrow Toggle */}
        <div className="flex items-end pb-1">
          <label className="flex items-center gap-3 cursor-pointer group">
            <div className="relative">
              <input 
                type="checkbox" 
                className="sr-only"
                checked={filters.escrowOnly}
                onChange={(e) => setFilters({ ...filters, escrowOnly: e.target.checked })}
              />
              <div className={cn(
                "w-12 h-6 rounded-full transition-colors duration-200 ease-in-out",
                filters.escrowOnly ? "bg-[#059669]" : "bg-[#E5E7EB]"
              )}></div>
              <div className={cn(
                "absolute left-1 top-1 bg-white w-4 h-4 rounded-full transition-transform duration-200 ease-in-out",
                filters.escrowOnly ? "translate-x-6" : "translate-x-0"
              )}></div>
            </div>
            <div className="flex items-center gap-2">
              <ShieldCheck className={cn(
                "h-4 w-4 transition-colors",
                filters.escrowOnly ? "text-[#059669]" : "text-[#9CA3AF]"
              )} />
              <span className="text-sm font-bold text-[#4B5563] group-hover:text-[#111827] transition-colors">
                Escrow Eligible Only
              </span>
            </div>
          </label>
        </div>
      </div>

      <div className="p-5 bg-[#F9FAFB] border-t border-[#E5E7EB] flex items-center justify-end gap-3">
        <button 
          onClick={onReset}
          className="px-4 py-2 text-sm font-bold text-[#6B7280] hover:text-[#111827] transition-colors"
        >
          Reset All
        </button>
        <button 
          onClick={onApply}
          className="px-6 py-2 bg-[#111827] text-white rounded-lg font-bold text-sm hover:bg-[#1F2937] transition-all shadow-sm"
        >
          Apply Filters
        </button>
      </div>
    </div>
  );
};
