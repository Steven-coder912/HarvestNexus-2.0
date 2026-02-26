export type UserRole = 'buyer' | 'seller' | 'inspector' | 'admin' | 'finance';

export interface UserProfile {
  uid: string;
  email: string;
  displayName: string;
  role: UserRole;
  orgId: string;
  createdAt: any;
}

export interface Organization {
  id: string;
  name: string;
  type: 'buyer' | 'seller' | 'institution';
  verified: boolean;
  createdAt: any;
}

export interface Listing {
  id: string;
  sellerId: string;
  sellerOrgId: string;
  title: string;
  description: string;
  commodity: string;
  quantity: number;
  unit: string;
  pricePerUnit: number;
  currency: string;
  location: string;
  qualityGrade: string;
  images: string[];
  status: 'active' | 'sold' | 'archived';
  createdAt: any;
}

export interface RFQ {
  id: string;
  buyerId: string;
  buyerOrgId: string;
  commodity: string;
  quantity: number;
  unit: string;
  targetPrice?: number;
  location: string;
  deadline: any;
  status: 'open' | 'closed' | 'awarded';
  createdAt: any;
}

export type OrderStatus = 
  | 'draft' 
  | 'escrow_pending' 
  | 'escrow_funded' 
  | 'fulfillment' 
  | 'in_transit' 
  | 'inspection' 
  | 'settlement' 
  | 'closed';

export interface Order {
  id: string;
  buyerId: string;
  buyerOrgId: string;
  sellerId: string;
  sellerOrgId: string;
  listingId?: string;
  rfqId?: string;
  status: OrderStatus;
  totalAmount: number;
  currency: string;
  escrowId: string;
  createdAt: any;
  updatedAt: any;
}

export interface Escrow {
  id: string;
  orderId: string;
  amount: number;
  status: 'pending' | 'funded' | 'released' | 'disputed' | 'refunded';
  fundedAt?: any;
  releasedAt?: any;
}

export interface InspectionReport {
  id: string;
  orderId: string;
  inspectorId: string;
  status: 'pending' | 'completed' | 'failed';
  findings: string;
  evidenceUrls: string[];
  grade: string;
  createdAt: any;
}

export interface TimelineEvent {
  id: string;
  orderId: string;
  type: string;
  message: string;
  actorId: string;
  actorName: string;
  timestamp: any;
}
