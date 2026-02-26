import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { doc, getDoc, collection, query, where, getDocs, orderBy } from 'firebase/firestore';
import { db } from '../lib/firebase';
import { Order, TimelineEvent, Escrow, OrderStatus } from '../types';
import { mapOrderDTO, mapTimelineEventDTO, mapEscrowDTO } from '../lib/dtos';
import { StatusRail } from '../components/StatusRail';
import { TimelineFeed } from '../components/TimelineFeed';
import { DocumentVault } from '../components/DocumentVault';
import { SettlementBreakdownPanel } from '../components/SettlementBreakdownPanel';
import { 
  Shield, 
  FileText, 
  Download, 
  ExternalLink, 
  AlertCircle,
  CreditCard,
  Truck,
  ClipboardCheck,
  CheckCircle2,
  Info
} from 'lucide-react';
import { cn } from '../lib/utils';

export const OrderDetails: React.FC = () => {
  const { orderId } = useParams<{ orderId: string }>();
  const [order, setOrder] = useState<Order | null>(null);
  const [timeline, setTimeline] = useState<TimelineEvent[]>([]);
  const [escrow, setEscrow] = useState<Escrow | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchOrderData = async () => {
      if (!orderId) return;
      try {
        // Fetch Order
        const orderSnap = await getDoc(doc(db, 'orders', orderId));
        if (orderSnap.exists()) {
          const orderData = mapOrderDTO(orderSnap.data(), orderSnap.id);
          setOrder(orderData);

          // Fetch Escrow
          if (orderData.escrowId) {
            const escrowSnap = await getDoc(doc(db, 'escrows', orderData.escrowId));
            if (escrowSnap.exists()) {
              setEscrow(mapEscrowDTO(escrowSnap.data(), escrowSnap.id));
            }
          }
        }

        // Fetch Timeline
        const timelineQuery = query(
          collection(db, 'timeline'), 
          where('orderId', '==', orderId),
          orderBy('timestamp', 'desc')
        );
        const timelineSnap = await getDocs(timelineQuery);
        setTimeline(timelineSnap.docs.map(doc => mapTimelineEventDTO(doc.data(), doc.id)));

      } catch (error) {
        console.error("Error fetching order details:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchOrderData();
  }, [orderId]);

  if (loading) return <div className="flex items-center justify-center h-64">Loading order details...</div>;
  if (!order) return <div className="p-8 text-center bg-red-50 text-red-600 rounded-xl">Order not found.</div>;

  const settlementLines = [
    { label: 'Commodity Value', amount: order.totalAmount, type: 'credit' as const },
    { label: 'Escrow Fee (0.5%)', amount: order.totalAmount * 0.005, type: 'debit' as const },
    { label: 'Inspection Fee', amount: 500, type: 'debit' as const },
    { label: 'Net Payout', amount: order.totalAmount * 0.995 - 500, type: 'credit' as const, isTotal: true },
  ];

  const mockDocs = [
    { id: '1', name: 'Trade Agreement.pdf', type: 'pdf', size: '1.2 MB', uploadedAt: new Date(), status: 'verified' as const },
    { id: '2', name: 'Escrow Confirmation.pdf', type: 'pdf', size: '450 KB', uploadedAt: new Date(), status: 'verified' as const },
    { id: '3', name: 'Bill of Lading.pdf', type: 'pdf', size: '2.1 MB', uploadedAt: new Date(), status: 'missing' as const },
  ];

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-3 mb-2">
            <span className="text-xs font-bold uppercase tracking-widest text-[#6B7280]">Order #{order.id}</span>
            <span className={cn(
              "px-2 py-0.5 rounded-full text-[10px] font-bold uppercase",
              order.status === 'closed' ? "bg-[#ECFDF5] text-[#059669]" : "bg-[#FFFBEB] text-[#D97706]"
            )}>
              {order.status.replace('_', ' ')}
            </span>
          </div>
          <h1 className="text-3xl font-bold tracking-tight text-[#111827]">Order Management</h1>
        </div>
        <div className="flex gap-3">
          <button className="px-4 py-2 border border-[#E5E7EB] text-[#4B5563] rounded-lg font-bold text-sm hover:bg-[#F9FAFB] transition-all flex items-center gap-2">
            <Download className="h-4 w-4" />
            Export Audit Log
          </button>
          <button className="px-4 py-2 bg-[#111827] text-white rounded-lg font-bold text-sm hover:bg-[#1F2937] transition-all flex items-center gap-2">
            <ExternalLink className="h-4 w-4" />
            View Contract
          </button>
        </div>
      </div>

      {/* Workflow Visualization */}
      <StatusRail currentStatus={order.status} />

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left Column - Details & Timeline */}
        <div className="lg:col-span-2 space-y-8">
          {/* Main Info Card */}
          <div className="bg-white border border-[#E5E7EB] rounded-2xl shadow-sm overflow-hidden">
            <div className="p-6 border-b border-[#E5E7EB] bg-[#F9FAFB] flex items-center justify-between">
              <h3 className="font-bold text-[#111827]">Trade Overview</h3>
              <div className="flex items-center gap-2 text-[#059669] text-xs font-bold">
                <Shield className="h-4 w-4" />
                Escrow Protected
              </div>
            </div>
            <div className="p-8 grid grid-cols-1 md:grid-cols-2 gap-12">
              <div className="space-y-6">
                <div>
                  <label className="text-[10px] font-bold uppercase tracking-widest text-[#9CA3AF]">Buyer Organization</label>
                  <p className="font-bold text-[#111827] mt-1">{order.buyerOrgId}</p>
                </div>
                <div>
                  <label className="text-[10px] font-bold uppercase tracking-widest text-[#9CA3AF]">Seller Organization</label>
                  <p className="font-bold text-[#111827] mt-1">{order.sellerOrgId}</p>
                </div>
              </div>
              <div className="space-y-6">
                <div>
                  <label className="text-[10px] font-bold uppercase tracking-widest text-[#9CA3AF]">Total Value</label>
                  <p className="text-2xl font-bold text-[#111827] mt-1">{order.currency} {order.totalAmount.toLocaleString()}</p>
                </div>
                <div>
                  <label className="text-[10px] font-bold uppercase tracking-widest text-[#9CA3AF]">Escrow Status</label>
                  <div className="flex items-center gap-2 mt-1">
                    <div className={cn(
                      "h-2 w-2 rounded-full",
                      escrow?.status === 'funded' ? "bg-[#059669]" : "bg-[#D97706]"
                    )} />
                    <p className="font-bold text-sm capitalize">{escrow?.status || 'Pending'}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Timeline Feed */}
          <div className="bg-white border border-[#E5E7EB] rounded-2xl shadow-sm p-8">
            <h3 className="font-bold text-[#111827] mb-8 flex items-center gap-2">
              Audit Timeline
              <span className="text-xs font-normal text-[#6B7280]">(Immutable Trail)</span>
            </h3>
            <TimelineFeed events={timeline} />
          </div>
        </div>

        {/* Right Column - Actions & Documents */}
        <div className="space-y-8">
          {/* Action Panel */}
          <div className="bg-[#111827] text-white rounded-2xl shadow-lg p-8">
            <h3 className="font-bold text-lg mb-6">Required Actions</h3>
            <div className="space-y-4">
              {order.status === 'escrow_pending' && (
                <button className="w-full py-4 bg-[#059669] hover:bg-[#047857] text-white rounded-xl font-bold transition-all flex items-center justify-center gap-2">
                  <CreditCard className="h-5 w-5" />
                  Fund Escrow Wallet
                </button>
              )}
              {order.status === 'escrow_funded' && (
                <div className="p-4 bg-white/10 rounded-xl border border-white/10">
                  <p className="text-sm opacity-80">Waiting for seller to initiate fulfillment.</p>
                </div>
              )}
              <button className="w-full py-4 bg-white/10 hover:bg-white/20 text-white rounded-xl font-bold transition-all flex items-center justify-center gap-2">
                <AlertCircle className="h-5 w-5" />
                Raise Dispute
              </button>
            </div>
          </div>

          {/* Document Vault */}
          <DocumentVault documents={mockDocs} />

          {/* Settlement Breakdown */}
          <SettlementBreakdownPanel lines={settlementLines} currency={order.currency} />
        </div>
      </div>
    </div>
  );
};
