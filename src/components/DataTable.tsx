import React from 'react';
import { ChevronLeft, ChevronRight, MoreHorizontal } from 'lucide-react';
import { cn } from '../lib/utils';

interface Column<T> {
  header: string;
  accessor: keyof T | ((item: T) => React.ReactNode);
  className?: string;
}

interface DataTableProps<T> {
  columns: Column<T>[];
  data: T[];
  onRowClick?: (item: T) => void;
  isLoading?: boolean;
}

export function DataTable<T extends { id: string | number }>({ 
  columns, 
  data, 
  onRowClick,
  isLoading 
}: DataTableProps<T>) {
  return (
    <div className="w-full bg-white border border-[#E5E7EB] rounded-xl shadow-sm overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-[#F9FAFB] border-b border-[#E5E7EB]">
              {columns.map((col, i) => (
                <th 
                  key={i} 
                  className={cn(
                    "px-6 py-4 text-[11px] font-bold uppercase tracking-wider text-[#6B7280] font-serif italic",
                    col.className
                  )}
                >
                  {col.header}
                </th>
              ))}
              <th className="px-6 py-4 w-10"></th>
            </tr>
          </thead>
          <tbody className="divide-y divide-[#E5E7EB]">
            {isLoading ? (
              [1, 2, 3].map(i => (
                <tr key={i} className="animate-pulse">
                  {columns.map((_, j) => (
                    <td key={j} className="px-6 py-4">
                      <div className="h-4 bg-[#F3F4F6] rounded w-full"></div>
                    </td>
                  ))}
                  <td className="px-6 py-4"></td>
                </tr>
              ))
            ) : data.length === 0 ? (
              <tr>
                <td colSpan={columns.length + 1} className="px-6 py-12 text-center text-[#9CA3AF]">
                  No records found.
                </td>
              </tr>
            ) : (
              data.map((item) => (
                <tr 
                  key={item.id} 
                  onClick={() => onRowClick?.(item)}
                  className={cn(
                    "group transition-colors duration-150",
                    onRowClick ? "cursor-pointer hover:bg-[#F9FAFB]" : ""
                  )}
                >
                  {columns.map((col, i) => (
                    <td key={i} className={cn("px-6 py-4 text-sm text-[#4B5563]", col.className)}>
                      {typeof col.accessor === 'function' 
                        ? col.accessor(item) 
                        : (item[col.accessor] as React.ReactNode)}
                    </td>
                  ))}
                  <td className="px-6 py-4 text-right">
                    <button className="p-1 text-[#9CA3AF] hover:text-[#111827] rounded-md transition-colors">
                      <MoreHorizontal className="h-4 w-4" />
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
      
      {/* Pagination Placeholder */}
      <div className="px-6 py-4 bg-[#F9FAFB] border-t border-[#E5E7EB] flex items-center justify-between">
        <span className="text-xs text-[#6B7280]">
          Showing <span className="font-medium text-[#111827]">{data.length}</span> results
        </span>
        <div className="flex items-center gap-2">
          <button className="p-1.5 border border-[#E5E7EB] rounded-md text-[#9CA3AF] hover:bg-white disabled:opacity-50" disabled>
            <ChevronLeft className="h-4 w-4" />
          </button>
          <button className="p-1.5 border border-[#E5E7EB] rounded-md text-[#9CA3AF] hover:bg-white disabled:opacity-50" disabled>
            <ChevronRight className="h-4 w-4" />
          </button>
        </div>
      </div>
    </div>
  );
}
