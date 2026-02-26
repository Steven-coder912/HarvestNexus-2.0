import React, { useState, useEffect } from 'react';
import { collection, query, where, getDocs } from 'firebase/firestore';
import { db } from '../lib/firebase';
import { InspectionReport, Order } from '../types';
import { DataTable } from '../components/DataTable';
import { 
  ClipboardCheck, 
  MapPin, 
  Calendar, 
  AlertTriangle,
  FileSearch,
  CheckCircle
} from 'lucide-react';
import { cn } from '../lib/utils';

export const InspectorQueue: React.FC = () => {
  const [reports, setReports] = useState<InspectionReport[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchQueue = async () => {
      try {
        const q = query(collection(db, 'inspection_reports'), where('status', '==', 'pending'));
        const querySnapshot = await getDocs(q);
        setReports(querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as InspectionReport)));
      } catch (error) {
        console.error("Error fetching inspection queue:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchQueue();
  }, []);

  const columns = [
    { header: 'Report ID', accessor: (r: InspectionReport) => r.id, className: 'font-mono text-xs' },
    { header: 'Order ID', accessor: (r: InspectionReport) => r.orderId, className: 'font-mono text-xs' },
    { 
      header: 'Priority', 
      accessor: () => (
        <span className="px-2 py-1 bg-red-50 text-red-600 text-[10px] font-bold uppercase rounded-full">
          High
        </span>
      ) 
    },
    { 
      header: 'Created', 
      accessor: (r: InspectionReport) => new Date(r.createdAt.seconds * 1000).toLocaleDateString() 
    },
    {
      header: 'Action',
      accessor: () => (
        <button className="px-3 py-1.5 bg-[#111827] text-white text-xs font-bold rounded-lg hover:bg-[#1F2937] transition-all">
          Start Inspection
        </button>
      )
    }
  ];

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-[#111827]">Inspection Queue</h1>
          <p className="text-[#6B7280] mt-1">Verify commodity quality to trigger escrow release.</p>
        </div>
        <div className="flex items-center gap-4">
          <div className="text-right">
            <p className="text-xs font-bold text-[#9CA3AF] uppercase tracking-widest">Active Inspector</p>
            <p className="font-bold text-[#111827]">ID: INS-9920</p>
          </div>
          <div className="h-12 w-12 bg-[#F3F4F6] rounded-xl flex items-center justify-center text-[#059669]">
            <ClipboardCheck className="h-6 w-6" />
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white border border-[#E5E7EB] rounded-2xl p-6 shadow-sm">
          <p className="text-xs font-bold text-[#9CA3AF] uppercase tracking-widest">Pending</p>
          <p className="text-3xl font-bold text-[#111827] mt-2">{reports.length}</p>
        </div>
        <div className="bg-white border border-[#E5E7EB] rounded-2xl p-6 shadow-sm">
          <p className="text-xs font-bold text-[#9CA3AF] uppercase tracking-widest">Completed (MTD)</p>
          <p className="text-3xl font-bold text-[#111827] mt-2">142</p>
        </div>
        <div className="bg-white border border-[#E5E7EB] rounded-2xl p-6 shadow-sm">
          <p className="text-xs font-bold text-[#9CA3AF] uppercase tracking-widest">Avg. Turnaround</p>
          <p className="text-3xl font-bold text-[#111827] mt-2">4.2h</p>
        </div>
        <div className="bg-white border border-[#E5E7EB] rounded-2xl p-6 shadow-sm">
          <p className="text-xs font-bold text-[#9CA3AF] uppercase tracking-widest">Accuracy Rate</p>
          <p className="text-3xl font-bold text-[#059669] mt-2">99.8%</p>
        </div>
      </div>

      <div className="bg-white border border-[#E5E7EB] rounded-2xl shadow-sm overflow-hidden">
        <div className="p-6 border-b border-[#E5E7EB] flex items-center justify-between">
          <h3 className="font-bold text-[#111827]">Assigned Tasks</h3>
          <div className="flex items-center gap-2">
            <div className="flex items-center gap-1 text-xs text-[#6B7280]">
              <div className="h-2 w-2 bg-red-500 rounded-full" /> Urgent
            </div>
          </div>
        </div>
        <DataTable columns={columns} data={reports} isLoading={loading} />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="bg-[#F9FAFB] border border-[#E5E7EB] rounded-2xl p-8">
          <h3 className="font-bold text-[#111827] mb-4 flex items-center gap-2">
            <AlertTriangle className="h-5 w-5 text-amber-500" />
            Quality Disputes
          </h3>
          <p className="text-sm text-[#6B7280] mb-6">There are 2 active disputes requiring secondary inspection.</p>
          <button className="px-6 py-3 bg-white border border-[#E5E7EB] text-[#111827] rounded-xl font-bold text-sm hover:bg-white transition-all">
            Review Disputes
          </button>
        </div>
        <div className="bg-[#ECFDF5] border border-[#059669]/20 rounded-2xl p-8">
          <h3 className="font-bold text-[#059669] mb-4 flex items-center gap-2">
            <CheckCircle className="h-5 w-5" />
            Certification Center
          </h3>
          <p className="text-sm text-[#065F46] mb-6">Your inspector certification is valid until Dec 2026.</p>
          <button className="px-6 py-3 bg-[#059669] text-white rounded-xl font-bold text-sm hover:bg-[#047857] transition-all">
            View Credentials
          </button>
        </div>
      </div>
    </div>
  );
};
