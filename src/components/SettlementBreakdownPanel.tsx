import React from 'react';
import { CreditCard, Info, ArrowDownRight } from 'lucide-react';
import { cn } from '../lib/utils';

interface SettlementLine {
  label: string;
  amount: number;
  type: 'credit' | 'debit';
  isTotal?: boolean;
}

interface SettlementBreakdownPanelProps {
  lines: SettlementLine[];
  currency: string;
}

export const SettlementBreakdownPanel: React.FC<SettlementBreakdownPanelProps> = ({ lines, currency }) => {
  return (
    <div className="bg-white border border-[#E5E7EB] rounded-2xl shadow-sm overflow-hidden">
      <div className="p-5 border-b border-[#E5E7EB] flex items-center justify-between bg-[#F9FAFB]">
        <div className="flex items-center gap-2">
          <CreditCard className="h-5 w-5 text-[#4B5563]" />
          <h3 className="font-bold text-[#111827]">Settlement Breakdown</h3>
        </div>
        <Info className="h-4 w-4 text-[#9CA3AF] cursor-help" />
      </div>
      <div className="p-6 space-y-4">
        {lines.map((line, i) => (
          <div 
            key={i} 
            className={cn(
              "flex justify-between items-center",
              line.isTotal ? "pt-4 border-t border-[#E5E7EB] mt-4" : ""
            )}
          >
            <span className={cn(
              "text-sm",
              line.isTotal ? "font-bold text-[#111827]" : "text-[#6B7280]"
            )}>
              {line.label}
            </span>
            <span className={cn(
              "text-sm font-mono",
              line.isTotal ? "text-lg font-bold text-[#059669]" : 
              line.type === 'credit' ? "text-[#059669]" : "text-[#DC2626]"
            )}>
              {line.type === 'debit' && i > 0 ? '-' : ''}{currency} {line.amount.toLocaleString(undefined, { minimumFractionDigits: 2 })}
            </span>
          </div>
        ))}
      </div>
      <div className="px-6 py-4 bg-[#F9FAFB] border-t border-[#E5E7EB]">
        <div className="flex items-center gap-2 text-[10px] text-[#9CA3AF] uppercase font-bold tracking-widest">
          <ArrowDownRight className="h-3 w-3" />
          Escrow Release Triggered by Inspection Pass
        </div>
      </div>
    </div>
  );
};
