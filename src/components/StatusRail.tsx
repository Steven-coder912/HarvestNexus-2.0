import React from 'react';
import { CheckCircle2, Circle, Clock, AlertCircle } from 'lucide-react';
import { OrderStatus } from '../types';
import { cn } from '../lib/utils';

interface StatusRailProps {
  currentStatus: OrderStatus;
}

const STAGES: { label: string; value: OrderStatus }[] = [
  { label: 'Draft', value: 'draft' },
  { label: 'Escrow Pending', value: 'escrow_pending' },
  { label: 'Escrow Funded', value: 'escrow_funded' },
  { label: 'Fulfillment', value: 'fulfillment' },
  { label: 'In Transit', value: 'in_transit' },
  { label: 'Inspection', value: 'inspection' },
  { label: 'Settlement', value: 'settlement' },
  { label: 'Closed', value: 'closed' },
];

export const StatusRail: React.FC<StatusRailProps> = ({ currentStatus }) => {
  const currentIndex = STAGES.findIndex(s => s.value === currentStatus);

  return (
    <div className="w-full py-8 px-4 bg-white border border-[#E5E7EB] rounded-xl shadow-sm overflow-x-auto">
      <div className="flex items-center min-w-[800px]">
        {STAGES.map((stage, index) => {
          const isCompleted = index < currentIndex;
          const isCurrent = index === currentIndex;
          const isPending = index > currentIndex;

          return (
            <React.Fragment key={stage.value}>
              <div className="flex flex-col items-center flex-1 relative">
                <div className={cn(
                  "h-10 w-10 rounded-full flex items-center justify-center border-2 transition-all duration-300 z-10",
                  isCompleted ? "bg-[#059669] border-[#059669] text-white" :
                  isCurrent ? "bg-white border-[#059669] text-[#059669] ring-4 ring-[#ECFDF5]" :
                  "bg-white border-[#E5E7EB] text-[#9CA3AF]"
                )}>
                  {isCompleted ? <CheckCircle2 className="h-6 w-6" /> :
                   isCurrent ? <Clock className="h-6 w-6 animate-pulse" /> :
                   <Circle className="h-6 w-6" />}
                </div>
                <span className={cn(
                  "mt-3 text-xs font-semibold uppercase tracking-wider text-center",
                  isCurrent ? "text-[#059669]" : "text-[#6B7280]"
                )}>
                  {stage.label}
                </span>
                
                {/* Connector Line */}
                {index < STAGES.length - 1 && (
                  <div className={cn(
                    "absolute top-5 left-[calc(50%+20px)] w-[calc(100%-40px)] h-0.5 z-0",
                    isCompleted ? "bg-[#059669]" : "bg-[#E5E7EB]"
                  )} />
                )}
              </div>
            </React.Fragment>
          );
        })}
      </div>
    </div>
  );
};
