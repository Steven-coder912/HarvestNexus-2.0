import { 
  Listing, 
  RFQ, 
  Order, 
  Escrow, 
  InspectionReport, 
  UserProfile, 
  Organization, 
  TimelineEvent 
} from '../types';

/**
 * Safe Timestamp to Date conversion
 */
export const safeDate = (timestamp: any): Date | null => {
  if (!timestamp) return null;
  if (timestamp.toDate && typeof timestamp.toDate === 'function') {
    return timestamp.toDate();
  }
  if (timestamp.seconds) {
    return new Date(timestamp.seconds * 1000);
  }
  return null;
};

/**
 * Safe Date to String display
 */
export const formatDate = (timestamp: any, fallback = '—'): string => {
  const date = safeDate(timestamp);
  return date ? date.toLocaleString() : fallback;
};

export const mapUserDTO = (data: any): UserProfile => ({
  uid: data.uid || '',
  email: data.email || '',
  displayName: data.displayName || 'Unknown User',
  role: data.role || 'buyer',
  orgId: data.orgId || '',
  createdAt: data.createdAt || null,
});

export const mapOrgDTO = (data: any): Organization => ({
  id: data.id || '',
  name: data.name || 'Unknown Organization',
  type: data.type || 'buyer',
  verified: Boolean(data.verified),
  createdAt: data.createdAt || null,
});

export const mapListingDTO = (data: any, id: string): Listing => ({
  id,
  sellerId: data.sellerId || '',
  sellerOrgId: data.sellerOrgId || '',
  title: data.title || 'Untitled Listing',
  description: data.description || '',
  commodity: data.commodity || 'Unknown',
  quantity: Number(data.quantity) || 0,
  unit: data.unit || 'units',
  pricePerUnit: Number(data.pricePerUnit) || 0,
  currency: data.currency || 'USD',
  location: data.location || 'Unknown',
  qualityGrade: data.qualityGrade || 'N/A',
  images: Array.isArray(data.images) ? data.images : [],
  status: data.status || 'active',
  createdAt: data.createdAt || null,
});

export const mapRFQDTO = (data: any, id: string): RFQ => ({
  id,
  buyerId: data.buyerId || '',
  buyerOrgId: data.buyerOrgId || '',
  commodity: data.commodity || 'Unknown',
  quantity: Number(data.quantity) || 0,
  unit: data.unit || 'units',
  targetPrice: data.targetPrice ? Number(data.targetPrice) : undefined,
  location: data.location || 'Unknown',
  deadline: data.deadline || null,
  status: data.status || 'open',
  createdAt: data.createdAt || null,
});

export const mapOrderDTO = (data: any, id: string): Order => ({
  id,
  buyerId: data.buyerId || '',
  buyerOrgId: data.buyerOrgId || '',
  sellerId: data.sellerId || '',
  sellerOrgId: data.sellerOrgId || '',
  listingId: data.listingId,
  rfqId: data.rfqId,
  status: data.status || 'draft',
  totalAmount: Number(data.totalAmount) || 0,
  currency: data.currency || 'USD',
  escrowId: data.escrowId || '',
  createdAt: data.createdAt || null,
  updatedAt: data.updatedAt || null,
});

export const mapEscrowDTO = (data: any, id: string): Escrow => ({
  id,
  orderId: data.orderId || '',
  amount: Number(data.amount) || 0,
  status: data.status || 'pending',
  fundedAt: data.fundedAt || null,
  releasedAt: data.releasedAt || null,
});

export const mapInspectionReportDTO = (data: any, id: string): InspectionReport => ({
  id,
  orderId: data.orderId || '',
  inspectorId: data.inspectorId || '',
  status: data.status || 'pending',
  findings: data.findings || '',
  evidenceUrls: Array.isArray(data.evidenceUrls) ? data.evidenceUrls : [],
  grade: data.grade || 'N/A',
  createdAt: data.createdAt || null,
});

export const mapTimelineEventDTO = (data: any, id: string): TimelineEvent => ({
  id,
  orderId: data.orderId || '',
  type: data.type || 'system',
  message: data.message || '',
  actorId: data.actorId || '',
  actorName: data.actorName || 'System',
  timestamp: data.timestamp || null,
});
