# Frontend Audit Report - HarvestNexus OS

## 1. Framework & Environment
- **Framework**: React 19
- **Build Tool**: Vite 6
- **Routing**: React Router DOM 7
- **Language**: TypeScript 5.8
- **Styling**: Tailwind CSS 4.1

## 2. Existing Route Tree
- `/` (Landing)
- `/auth/sign-in`
- `/auth/sign-up`
- `/app` (Dashboard/Overview)
- `/app/marketplace`
- `/app/orders/:orderId`
- `/app/finance`
- `/app/inspector/queue`

## 3. Auth Implementation
- **Provider**: Firebase Auth
- **State Management**: `AuthContext.tsx` providing `user`, `profile`, and `loading`.
- **Guards**: `ProtectedRoute` component in `App.tsx`.

## 4. Role & Organization Model
- **Roles**: `buyer`, `seller`, `inspector`, `admin`, `finance`.
- **Organization**: Users belong to an `orgId`. Organizations are stored in the `orgs` collection.
- **Enforcement**: `AppShell` filters navigation items based on the user's role.

## 5. Firestore Collections Referenced
- `users`: User profiles and roles.
- `orgs`: Organization details and verification status.
- `listings`: Marketplace commodity listings.
- `orders`: Trade records and status tracking.
- `escrows`: Financial security records.
- `timeline`: Audit trail events.
- `inspection_reports`: Quality verification data.

## 6. UI Component System
- **Base**: Tailwind CSS utility classes.
- **Icons**: Lucide React.
- **Animations**: Motion (formerly Framer Motion).
- **Core Components**: `AppShell`, `DataTable`, `StatusRail`, `TimelineFeed`.

## 7. Known Issues & Fixes
- **Firebase Initialization**: Added `isConfigured` guard to prevent crashes when API keys are missing.
- **Type Safety**: Basic types defined in `types.ts`, but direct Firestore field access (like timestamps) needs DTO protection.
