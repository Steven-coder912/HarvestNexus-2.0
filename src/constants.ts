import { 
  LayoutDashboard, 
  ShoppingBag, 
  FileText, 
  Package, 
  ShieldCheck, 
  MessageSquare, 
  Bell, 
  Settings, 
  Users, 
  CreditCard,
  Search,
  ClipboardCheck,
  BarChart3,
  Gavel,
  Building2,
  AlertCircle
} from 'lucide-react';
import { UserRole } from './types';

export interface NavItem {
  label: string;
  path: string;
  icon: any;
  roles: UserRole[];
}

export const NAVIGATION_ITEMS: NavItem[] = [
  // Shared
  { label: 'Dashboard', path: '/app', icon: LayoutDashboard, roles: ['buyer', 'seller', 'inspector', 'admin', 'finance'] },
  
  // Buyer
  { label: 'Marketplace', path: '/app/buyer/marketplace', icon: Search, roles: ['buyer'] },
  { label: 'My RFQs', path: '/app/buyer/rfqs', icon: FileText, roles: ['buyer'] },
  { label: 'My Orders', path: '/app/buyer/orders', icon: Package, roles: ['buyer'] },
  { label: 'Suppliers', path: '/app/buyer/suppliers', icon: Users, roles: ['buyer'] },
  
  // Seller
  { label: 'Inventory', path: '/app/seller/listings', icon: ShoppingBag, roles: ['seller'] },
  { label: 'Inbound RFQs', path: '/app/seller/rfqs', icon: Gavel, roles: ['seller'] },
  { label: 'Sales Orders', path: '/app/seller/orders', icon: Package, roles: ['seller'] },
  { label: 'Analytics', path: '/app/seller/analytics', icon: BarChart3, roles: ['seller'] },

  // Inspector
  { label: 'Inspection Queue', path: '/app/inspector/queue', icon: ClipboardCheck, roles: ['inspector'] },
  
  // Finance
  { label: 'Escrow Ledger', path: '/app/finance/escrow', icon: ShieldCheck, roles: ['finance', 'admin'] },
  { label: 'Transactions', path: '/app/finance/transactions', icon: CreditCard, roles: ['finance', 'admin'] },

  // Admin
  { label: 'User Management', path: '/app/admin/users', icon: Users, roles: ['admin'] },
  { label: 'Org Management', path: '/app/admin/orgs', icon: Building2, roles: ['admin'] },
  { label: 'Disputes', path: '/app/admin/disputes', icon: AlertCircle, roles: ['admin'] },

  // Shared Bottom
  { label: 'Messages', path: '/app/messages', icon: MessageSquare, roles: ['buyer', 'seller', 'inspector', 'admin', 'finance'] },
  { label: 'Settings', path: '/app/settings', icon: Settings, roles: ['buyer', 'seller', 'inspector', 'admin', 'finance'] },
];
