import React from 'react';
import { BrowserRouter, Routes, Route, Navigate, Link } from 'react-router-dom';
import { AuthProvider, useAuth } from './context/AuthContext';
import { AppShell } from './components/AppShell';
import { isConfigured } from './lib/firebase';
import { AlertCircle, ShieldAlert } from 'lucide-react';

// Configuration Warning Component
const ConfigWarning = () => (
  <div className="min-h-screen bg-[#F9FAFB] flex items-center justify-center p-6">
    <div className="max-w-md w-full bg-white border border-[#E5E7EB] rounded-2xl p-8 shadow-sm text-center">
      <div className="h-16 w-16 bg-amber-50 rounded-full flex items-center justify-center mx-auto mb-6">
        <ShieldAlert className="h-8 w-8 text-amber-600" />
      </div>
      <h2 className="text-2xl font-bold text-[#111827] mb-2">Configuration Required</h2>
      <p className="text-[#6B7280] mb-8">
        Firebase API keys are missing. Please configure your environment variables in the Secrets panel to enable institutional trade features.
      </p>
      <div className="space-y-3 text-left bg-[#F3F4F6] p-4 rounded-xl text-xs font-mono text-[#4B5563]">
        <p>VITE_FIREBASE_API_KEY</p>
        <p>VITE_FIREBASE_PROJECT_ID</p>
        <p>VITE_FIREBASE_AUTH_DOMAIN</p>
      </div>
    </div>
  </div>
);

import { SignIn } from './pages/SignIn';
import { SignUp } from './pages/SignUp';
import { Marketplace } from './pages/Marketplace';
import { OrderDetails } from './pages/OrderDetails';
import { FinanceWorkspace } from './pages/FinanceWorkspace';
import { InspectorQueue } from './pages/InspectorQueue';

// Placeholder Components
const Landing = () => (
  <div className="min-h-screen bg-white flex flex-col items-center justify-center p-8 text-center">
    <div className="h-16 w-16 bg-[#059669] rounded-2xl flex items-center justify-center text-white font-bold text-3xl mb-8">HN</div>
    <h1 className="text-5xl font-bold tracking-tighter text-[#111827] mb-4">HarvestNexus OS</h1>
    <p className="text-xl text-[#6B7280] max-w-lg mb-12">The escrow-first, inspection-enabled, audit-grade B2B agricultural trade platform.</p>
    <div className="flex gap-4">
      <Link to="/auth/sign-in" className="px-8 py-4 bg-[#111827] text-white rounded-xl font-bold hover:bg-[#1F2937] transition-all">Sign In</Link>
      <Link to="/auth/sign-up" className="px-8 py-4 border border-[#E5E7EB] text-[#111827] rounded-xl font-bold hover:bg-[#F9FAFB] transition-all">Request Access</Link>
    </div>
  </div>
);

const Dashboard = () => {
  const { profile } = useAuth();
  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-[#111827]">Welcome, {profile?.displayName}</h1>
          <p className="text-[#6B7280] mt-1">Here is your institutional overview for {profile?.orgId}.</p>
        </div>
        <div className="flex items-center gap-2 px-4 py-2 bg-[#ECFDF5] text-[#059669] rounded-lg text-xs font-bold uppercase tracking-widest">
          <div className="h-2 w-2 bg-[#059669] rounded-full animate-pulse" />
          Live Network
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {[
          { label: 'Active Orders', value: '12', change: '+2' },
          { label: 'Pending RFQs', value: '5', change: '-1' },
          { label: 'Escrow Balance', value: '$124.5k', change: '+$12k' },
          { label: 'Trust Score', value: '98/100', change: 'Stable' },
        ].map((stat, i) => (
          <div key={i} className="p-6 bg-white rounded-2xl border border-[#E5E7EB] shadow-sm">
            <h3 className="text-[10px] font-bold text-[#9CA3AF] uppercase tracking-widest">{stat.label}</h3>
            <div className="flex items-baseline gap-2 mt-2">
              <p className="text-2xl font-bold text-[#111827]">{stat.value}</p>
              <span className="text-xs font-bold text-[#059669]">{stat.change}</span>
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="bg-white border border-[#E5E7EB] rounded-2xl p-8 shadow-sm">
          <h3 className="font-bold text-[#111827] mb-6">Recent Activity</h3>
          <div className="space-y-6">
            {[1, 2, 3].map(i => (
              <div key={i} className="flex gap-4">
                <div className="h-10 w-10 rounded-full bg-[#F3F4F6] flex items-center justify-center text-[#6B7280] shrink-0">
                  <div className="h-2 w-2 bg-[#059669] rounded-full" />
                </div>
                <div>
                  <p className="text-sm font-bold text-[#111827]">Order #ORD-229{i} status updated</p>
                  <p className="text-xs text-[#6B7280]">Escrow funded by Buyer. Waiting for fulfillment.</p>
                  <p className="text-[10px] text-[#9CA3AF] mt-1 uppercase">2 hours ago</p>
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className="bg-[#111827] text-white rounded-2xl p-8 shadow-lg flex flex-col justify-between">
          <div>
            <h3 className="text-xl font-bold mb-2">Escrow Protection Active</h3>
            <p className="text-sm opacity-70">All trades on HarvestNexus are secured by our institutional escrow system. Funds are held in a neutral wallet until quality verification is complete.</p>
          </div>
          <button className="mt-8 w-full py-4 bg-[#059669] hover:bg-[#047857] text-white rounded-xl font-bold transition-all">
            Learn About Trust Primitives
          </button>
        </div>
      </div>
    </div>
  );
};

const ProtectedRoute: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { user, loading } = useAuth();
  
  if (loading) return <div className="flex items-center justify-center h-screen">Loading...</div>;
  if (!user) return <Navigate to="/auth/sign-in" />;
  
  return <AppShell>{children}</AppShell>;
};

const PlaceholderPage = ({ title }: { title: string }) => (
  <div className="space-y-6">
    <div className="flex items-center justify-between">
      <h1 className="text-3xl font-bold tracking-tight text-[#111827]">{title}</h1>
      <div className="px-4 py-2 bg-amber-50 text-amber-700 rounded-lg text-xs font-bold border border-amber-100">
        Module Under Construction
      </div>
    </div>
    <div className="p-12 border-2 border-dashed border-[#E5E7EB] rounded-2xl flex flex-col items-center justify-center text-center">
      <div className="h-16 w-16 bg-[#F3F4F6] rounded-full flex items-center justify-center mb-4">
        <AlertCircle className="h-8 w-8 text-[#9CA3AF]" />
      </div>
      <p className="text-[#6B7280] max-w-sm">
        The {title} module is currently being scaffolded. Real-time Firestore integration for this workspace is pending.
      </p>
    </div>
  </div>
);

export default function App() {
  if (!isConfigured) {
    return <ConfigWarning />;
  }

  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          {/* Public Routes */}
          <Route path="/" element={<Landing />} />
          <Route path="/how-it-works" element={<PlaceholderPage title="How It Works" />} />
          <Route path="/trust" element={<PlaceholderPage title="Trust & Security" />} />
          <Route path="/pricing" element={<PlaceholderPage title="Pricing" />} />
          <Route path="/auth/sign-in" element={<SignIn />} />
          <Route path="/auth/sign-up" element={<SignUp />} />
          
          {/* App Root */}
          <Route path="/app" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
          <Route path="/app/notifications" element={<ProtectedRoute><PlaceholderPage title="Notifications" /></ProtectedRoute>} />
          <Route path="/app/settings" element={<ProtectedRoute><PlaceholderPage title="Settings" /></ProtectedRoute>} />

          {/* Buyer Module */}
          <Route path="/app/buyer/overview" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
          <Route path="/app/buyer/marketplace" element={<ProtectedRoute><Marketplace /></ProtectedRoute>} />
          <Route path="/app/buyer/listings/:listingId" element={<ProtectedRoute><PlaceholderPage title="Listing Details" /></ProtectedRoute>} />
          <Route path="/app/buyer/rfqs" element={<ProtectedRoute><PlaceholderPage title="My RFQs" /></ProtectedRoute>} />
          <Route path="/app/buyer/rfqs/new" element={<ProtectedRoute><PlaceholderPage title="Create RFQ" /></ProtectedRoute>} />
          <Route path="/app/buyer/rfqs/:rfqId" element={<ProtectedRoute><PlaceholderPage title="RFQ Details" /></ProtectedRoute>} />
          <Route path="/app/buyer/orders" element={<ProtectedRoute><PlaceholderPage title="My Orders" /></ProtectedRoute>} />
          <Route path="/app/buyer/orders/:orderId" element={<ProtectedRoute><OrderDetails /></ProtectedRoute>} />
          <Route path="/app/buyer/messages" element={<ProtectedRoute><PlaceholderPage title="Messages" /></ProtectedRoute>} />
          <Route path="/app/buyer/suppliers" element={<ProtectedRoute><PlaceholderPage title="Suppliers" /></ProtectedRoute>} />
          <Route path="/app/buyer/finance" element={<ProtectedRoute><FinanceWorkspace /></ProtectedRoute>} />

          {/* Seller Module */}
          <Route path="/app/seller/overview" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
          <Route path="/app/seller/listings" element={<ProtectedRoute><PlaceholderPage title="Inventory" /></ProtectedRoute>} />
          <Route path="/app/seller/listings/new" element={<ProtectedRoute><PlaceholderPage title="Create Listing" /></ProtectedRoute>} />
          <Route path="/app/seller/rfqs" element={<ProtectedRoute><PlaceholderPage title="Inbound RFQs" /></ProtectedRoute>} />
          <Route path="/app/seller/orders" element={<ProtectedRoute><PlaceholderPage title="Sales Orders" /></ProtectedRoute>} />
          <Route path="/app/seller/analytics" element={<ProtectedRoute><PlaceholderPage title="Analytics" /></ProtectedRoute>} />

          {/* Inspector Module */}
          <Route path="/app/inspector/overview" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
          <Route path="/app/inspector/queue" element={<ProtectedRoute><InspectorQueue /></ProtectedRoute>} />

          {/* Finance Module */}
          <Route path="/app/finance/overview" element={<ProtectedRoute><FinanceWorkspace /></ProtectedRoute>} />
          <Route path="/app/finance/escrow" element={<ProtectedRoute><FinanceWorkspace /></ProtectedRoute>} />
          <Route path="/app/finance/transactions" element={<ProtectedRoute><FinanceWorkspace /></ProtectedRoute>} />

          {/* Admin Module */}
          <Route path="/app/admin/overview" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
          <Route path="/app/admin/users" element={<ProtectedRoute><PlaceholderPage title="User Management" /></ProtectedRoute>} />
          <Route path="/app/admin/orgs" element={<ProtectedRoute><PlaceholderPage title="Org Management" /></ProtectedRoute>} />
          <Route path="/app/admin/disputes" element={<ProtectedRoute><PlaceholderPage title="Dispute Resolution" /></ProtectedRoute>} />

          {/* Shared */}
          <Route path="/app/messages" element={<ProtectedRoute><PlaceholderPage title="Messages" /></ProtectedRoute>} />
          <Route path="/app/orders/:orderId" element={<ProtectedRoute><OrderDetails /></ProtectedRoute>} />
          
          {/* Fallback */}
          <Route path="*" element={<Navigate to="/app" />} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}
