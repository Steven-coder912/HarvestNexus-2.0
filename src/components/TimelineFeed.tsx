import React from 'react';
import { motion } from 'motion/react';
import { User, Package, ShieldCheck, ClipboardCheck, CreditCard, CheckCircle } from 'lucide-react';
import { TimelineEvent } from '../types';
import { cn } from '../lib/utils';

interface TimelineFeedProps {
  events: TimelineEvent[];
}

const getIcon = (type: string) => {
  switch (type) {
    case 'order_created': return Package;
    case 'escrow_funded': return ShieldCheck;
    case 'inspection_started': return ClipboardCheck;
    case 'settlement_initiated': return CreditCard;
    case 'order_closed': return CheckCircle;
    default: return User;
  }
};

export const TimelineFeed: React.FC<TimelineFeedProps> = ({ events }) => {
  return (
    <div className="space-y-8 relative before:absolute before:inset-0 before:ml-5 before:-translate-x-px before:h-full before:w-0.5 before:bg-gradient-to-b before:from-transparent before:via-[#E5E7EB] before:to-transparent">
      {events.map((event, index) => {
        const Icon = getIcon(event.type);
        return (
          <motion.div 
            key={event.id}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.1 }}
            className="relative flex items-start gap-6 pl-1"
          >
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-white border border-[#E5E7EB] shadow-sm z-10">
              <Icon className="h-5 w-5 text-[#4B5563]" />
            </div>
            <div className="flex-1 pt-1.5">
              <div className="flex items-center justify-between gap-4">
                <h4 className="text-sm font-bold text-[#111827]">{event.message}</h4>
                <time className="text-xs font-mono text-[#9CA3AF] uppercase">
                  {new Date(event.timestamp?.seconds * 1000).toLocaleString()}
                </time>
              </div>
              <p className="mt-1 text-xs text-[#6B7280]">
                By <span className="font-semibold text-[#4B5563]">{event.actorName}</span>
              </p>
            </div>
          </motion.div>
        );
      })}
    </div>
  );
};
