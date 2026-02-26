# Frontend Gap Analysis - HarvestNexus OS

## 1. Sitemap Gaps
The current implementation lacks the deep nested structure required for institutional procurement:
- **Missing Buyer Sub-routes**: `/app/buyer/overview`, `/app/buyer/rfqs`, `/app/buyer/suppliers`, etc.
- **Missing Seller Sub-routes**: `/app/seller/overview`, `/app/seller/listings`, `/app/seller/analytics`, etc.
- **Missing Admin Module**: `/app/admin/*` is completely missing.
- **Missing Public Pages**: `/how-it-works`, `/trust`, `/pricing`.

## 2. Component Gaps
The following enterprise-grade components are required but not yet implemented:
- `OrganizationSwitcher`: For multi-org or workspace switching.
- `ComparisonTable`: For comparing multiple RFQ quotes side-by-side.
- `DocumentVault`: A dedicated file management UI for trade documents.
- `EvidenceUploader`: Specialized uploader for inspection photos and dispute evidence.
- `SettlementBreakdownPanel`: Detailed fee and payout visualization.
- `FilterBar`: Advanced filtering with chips and multi-select.

## 3. Data Layer Gaps
- **DTO Layer**: Missing a formal Data Transfer Object layer to safely map Firestore documents to UI models.
- **Timestamp Safety**: Current code might call `.toDate()` on null fields; needs DTO guards.
- **Organization Scoping**: Queries need to be strictly scoped to the active `orgId`.

## 4. Workflow Gaps
- **RFQ System**: RFQ creation and quote management are not yet implemented.
- **Dispute Management**: Admin dispute resolution UI is missing.
- **Notification Center**: A dedicated notifications page and indicator are needed.
