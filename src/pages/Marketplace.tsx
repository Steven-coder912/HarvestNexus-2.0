import React, { useState, useEffect } from 'react';
import { collection, query, where, getDocs } from 'firebase/firestore';
import { db } from '../lib/firebase';
import { Listing } from '../types';
import { mapListingDTO } from '../lib/dtos';
import { DataTable } from '../components/DataTable';
import { FilterPanel } from '../components/FilterPanel';
import { Search, Filter, Plus, MapPin, Tag, SlidersHorizontal } from 'lucide-react';

export const Marketplace: React.FC = () => {
  const [listings, setListings] = useState<Listing[]>([]);
  const [filteredListings, setFilteredListings] = useState<Listing[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  
  const [filters, setFilters] = useState({
    commodity: 'All',
    grade: 'All',
    minPrice: '',
    maxPrice: '',
    leadTime: 'Any',
    escrowOnly: false
  });

  useEffect(() => {
    const fetchListings = async () => {
      try {
        const q = query(collection(db, 'listings'), where('status', '==', 'active'));
        const querySnapshot = await getDocs(q);
        const data = querySnapshot.docs.map(doc => mapListingDTO(doc.data(), doc.id));
        setListings(data);
        setFilteredListings(data);
      } catch (error) {
        console.error("Error fetching listings:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchListings();
  }, []);

  const applyFilters = () => {
    let result = [...listings];

    // Search term filter
    if (searchTerm) {
      const term = searchTerm.toLowerCase();
      result = result.filter(l => 
        l.commodity.toLowerCase().includes(term) || 
        l.title.toLowerCase().includes(term) ||
        l.location.toLowerCase().includes(term) ||
        l.qualityGrade.toLowerCase().includes(term)
      );
    }

    // Advanced filters
    if (filters.commodity !== 'All') {
      result = result.filter(l => l.commodity === filters.commodity);
    }

    if (filters.grade !== 'All') {
      result = result.filter(l => l.qualityGrade.includes(filters.grade.replace('Grade ', '')));
    }

    if (filters.minPrice) {
      result = result.filter(l => l.pricePerUnit >= Number(filters.minPrice));
    }

    if (filters.maxPrice) {
      result = result.filter(l => l.pricePerUnit <= Number(filters.maxPrice));
    }

    if (filters.escrowOnly) {
      // Assuming all listings are escrow eligible for now, or add a field to Listing type
      // result = result.filter(l => l.escrowEligible);
    }

    setFilteredListings(result);
    setIsFilterOpen(false);
  };

  const resetFilters = () => {
    const defaultFilters = {
      commodity: 'All',
      grade: 'All',
      minPrice: '',
      maxPrice: '',
      leadTime: 'Any',
      escrowOnly: false
    };
    setFilters(defaultFilters);
    setFilteredListings(listings);
    setSearchTerm('');
  };

  useEffect(() => {
    // Re-apply filters when search term changes (debounced search would be better but this is simple)
    const timer = setTimeout(() => {
      applyFilters();
    }, 300);
    return () => clearTimeout(timer);
  }, [searchTerm, listings]);

  const columns = [
    { 
      header: 'Commodity', 
      accessor: (l: Listing) => (
        <div className="flex items-center gap-3">
          <div className="h-10 w-10 bg-[#F3F4F6] rounded-lg flex items-center justify-center text-[#059669]">
            <Tag className="h-5 w-5" />
          </div>
          <div>
            <p className="font-bold text-[#111827]">{l.commodity}</p>
            <p className="text-xs text-[#6B7280]">{l.title}</p>
          </div>
        </div>
      )
    },
    { header: 'Quantity', accessor: (l: Listing) => `${l.quantity} ${l.unit}` },
    { header: 'Price', accessor: (l: Listing) => `${l.currency} ${l.pricePerUnit}/${l.unit}` },
    { 
      header: 'Location', 
      accessor: (l: Listing) => (
        <div className="flex items-center gap-1 text-xs">
          <MapPin className="h-3 w-3 text-[#9CA3AF]" />
          {l.location}
        </div>
      ) 
    },
    { 
      header: 'Quality', 
      accessor: (l: Listing) => (
        <span className="px-2 py-1 bg-[#ECFDF5] text-[#059669] text-[10px] font-bold uppercase rounded-full">
          Grade {l.qualityGrade}
        </span>
      ) 
    },
  ];

  return (
    <div className="space-y-8">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-[#111827]">Global Marketplace</h1>
          <p className="text-[#6B7280] mt-1">Institutional-grade agricultural commodities with escrow protection.</p>
        </div>
        <button className="flex items-center gap-2 px-6 py-3 bg-[#059669] text-white rounded-xl font-bold hover:bg-[#047857] transition-all shadow-sm">
          <Plus className="h-5 w-5" />
          Create Listing
        </button>
      </div>

      <div className="flex flex-col md:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-[#9CA3AF]" />
          <input 
            type="text" 
            placeholder="Search by commodity, location, or grade..." 
            className="w-full pl-12 pr-4 py-3 bg-white border border-[#E5E7EB] rounded-xl focus:ring-2 focus:ring-[#059669] focus:border-transparent outline-none transition-all"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <button className="flex items-center gap-2 px-6 py-3 bg-white border border-[#E5E7EB] text-[#4B5563] rounded-xl font-bold hover:bg-[#F9FAFB] transition-all">
          <Filter className="h-5 w-5" />
          Filters
        </button>
      </div>

      <DataTable 
        columns={columns} 
        data={listings} 
        isLoading={loading}
        onRowClick={(l) => console.log('Selected listing:', l)}
      />
    </div>
  );
};
