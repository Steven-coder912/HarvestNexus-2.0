import React, { useState, useEffect } from 'react';
import { collection, query, where, getDocs } from 'firebase/firestore';
import { db } from '../lib/firebase';
import { Escrow, Order } from '../types';
import { mapEscrowDTO, formatDate } from '../lib/dtos';
import { DataTable } from '../components/DataTable';
import { 
  Wallet, 
  ArrowUpRight, 
  ArrowDownLeft, 
  ShieldCheck, 
  FileText,
  TrendingUp,
  PieChart
} from 'lucide-react';
import { cn } from '../lib/utils';

export const FinanceWorkspace: React.FC = () => {
  const [escrows, setEscrows] = useState<Escrow[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchFinanceData = async () => {
      try {
        const q = query(collection(db, 'escrows'));
        const querySnapshot = await getDocs(q);
        setEscrows(querySnapshot.docs.map(doc => mapEscrowDTO(doc.data(), doc.id)));
      } catch (error) {
        console.error("Error fetching finance data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchFinanceData();
  }, []);

  const stats = [
    { label: 'Total Escrow Volume', value: '$1,240,000', change: '+12.5%', icon: Wallet, color: 'text-blue-600', bg: 'bg-blue-50' },
    { label: 'Active Escrow Balance', value: '$450,000', change: '-2.4%', icon: ShieldCheck, color: 'text-[#059669]', bg: 'bg-[#ECFDF5]' },
    { label: 'Platform Fees (MTD)', value: '$12,450', change: '+8.1%', icon: TrendingUp, color: 'text-purple-600', bg: 'bg-purple-50' },
  ];

  const columns = [
    { header: 'Escrow ID', accessor: (e: Escrow) => e.id, className: 'font-mono text-xs' },
    { header: 'Order ID', accessor: (e: Escrow) => e.orderId, className: 'font-mono text-xs' },
    { header: 'Amount', accessor: (e: Escrow) => `$${e.amount.toLocaleString()}` },
    { 
      header: 'Status', 
      accessor: (e: Escrow) => (
        <span className={cn(
          "px-2 py-1 rounded-full text-[10px] font-bold uppercase",
          e.status === 'funded' ? "bg-[#ECFDF5] text-[#059669]" : 
          e.status === 'released' ? "bg-blue-50 text-blue-600" : "bg-[#FFFBEB] text-[#D97706]"
        )}>
          {e.status}
        </span>
      ) 
    },
    { header: 'Funded At', accessor: (e: Escrow) => formatDate(e.fundedAt) },
  ];

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold tracking-tight text-[#111827]">Finance Workspace</h1>
        <p className="text-[#6B7280] mt-1">Manage institutional settlements, escrow balances, and audit reports.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {stats.map((stat, i) => (
          <div key={i} className="bg-white border border-[#E5E7EB] rounded-2xl p-6 shadow-sm">
            <div className="flex items-center justify-between mb-4">
              <div className={cn("p-2 rounded-lg", stat.bg)}>
                <stat.icon className={cn("h-5 w-5", stat.color)} />
              </div>
              <span className={cn(
                "text-xs font-bold",
                stat.change.startsWith('+') ? "text-[#059669]" : "text-red-600"
              )}>
                {stat.change}
              </span>
            </div>
            <p className="text-xs font-bold uppercase tracking-widest text-[#9CA3AF]">{stat.label}</p>
            <p className="text-2xl font-bold text-[#111827] mt-1">{stat.value}</p>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-6">
          <div className="flex items-center justify-between">
            <h3 className="font-bold text-[#111827]">Active Escrow Ledger</h3>
            <button className="text-xs font-bold text-[#059669] hover:underline flex items-center gap-1">
              <FileText className="h-3 w-3" />
              Download Statement
            </button>
          </div>
          <DataTable columns={columns} data={escrows} isLoading={loading} />
        </div>

        <div className="space-y-6">
          <h3 className="font-bold text-[#111827]">Settlement Distribution</h3>
          <div className="bg-white border border-[#E5E7EB] rounded-2xl p-8 shadow-sm flex flex-col items-center justify-center min-h-[300px]">
            <PieChart className="h-32 w-32 text-[#E5E7EB] mb-4" />
            <p className="text-sm text-[#9CA3AF] text-center">Settlement analytics will appear here as trade volume increases.</p>
          </div>
          
          <div className="bg-[#111827] text-white rounded-2xl p-6 shadow-lg">
            <h4 className="font-bold mb-4">Quick Actions</h4>
            <div className="space-y-3">
              <button className="w-full py-3 bg-[#059669] hover:bg-[#047857] rounded-xl text-sm font-bold transition-all">
                Initiate Batch Settlement
              </button>
              <button className="w-full py-3 bg-white/10 hover:bg-white/20 rounded-xl text-sm font-bold transition-all">
                Generate Tax Report
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
