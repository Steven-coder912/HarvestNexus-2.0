import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Menu, 
  X, 
  LogOut, 
  Bell, 
  Search, 
  ChevronRight,
  Building2,
  WifiOff
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { NAVIGATION_ITEMS } from '../constants';
import { cn } from '../lib/utils';
import { auth } from '../lib/firebase';

export const AppShell: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [isOnline, setIsOnline] = useState(navigator.onLine);
  const { profile } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const handleOnline = () => setIsOnline(true);
    const handleOffline = () => setIsOnline(false);

    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);

  const handleSignOut = async () => {
    await auth?.signOut();
    navigate('/auth/sign-in');
  };

  const filteredNav = NAVIGATION_ITEMS.filter(item => 
    profile?.role && item.roles.includes(profile.role)
  );

  return (
    <div className="flex h-screen bg-[#F8F9FA] text-[#1A1A1A] font-sans">
      {/* Sidebar */}
      <motion.aside
        initial={false}
        animate={{ width: isSidebarOpen ? 280 : 80 }}
        className="relative flex flex-col border-r border-[#E5E7EB] bg-white transition-all duration-300 ease-in-out z-20"
      >
        <div className="flex h-16 items-center px-6 border-b border-[#E5E7EB]">
          <Link to="/app" className="flex items-center gap-3 overflow-hidden">
            <div className="h-8 w-8 bg-[#059669] rounded-lg flex items-center justify-center text-white font-bold shrink-0">
              HN
            </div>
            {isSidebarOpen && (
              <span className="font-bold text-lg tracking-tight whitespace-nowrap">
                HarvestNexus <span className="text-[#059669]">OS</span>
              </span>
            )}
          </Link>
        </div>

        <nav className="flex-1 overflow-y-auto py-6 px-3 space-y-1">
          {filteredNav.map((item) => {
            const isActive = location.pathname === item.path;
            const Icon = item.icon;
            return (
              <Link
                key={item.path}
                to={item.path}
                className={cn(
                  "flex items-center gap-3 px-3 py-2.5 rounded-lg transition-all duration-200 group",
                  isActive 
                    ? "bg-[#ECFDF5] text-[#059669] font-medium" 
                    : "text-[#6B7280] hover:bg-[#F3F4F6] hover:text-[#111827]"
                )}
              >
                <Icon className={cn("h-5 w-5 shrink-0", isActive ? "text-[#059669]" : "text-[#9CA3AF] group-hover:text-[#4B5563]")} />
                {isSidebarOpen && <span className="truncate">{item.label}</span>}
                {isActive && isSidebarOpen && (
                  <motion.div layoutId="active-nav" className="ml-auto">
                    <ChevronRight className="h-4 w-4" />
                  </motion.div>
                )}
              </Link>
            );
          })}
        </nav>

        <div className="p-4 border-t border-[#E5E7EB]">
          <button
            onClick={handleSignOut}
            className="flex items-center gap-3 w-full px-3 py-2.5 text-[#6B7280] hover:bg-[#FEE2E2] hover:text-[#DC2626] rounded-lg transition-all duration-200"
          >
            <LogOut className="h-5 w-5 shrink-0" />
            {isSidebarOpen && <span className="font-medium">Sign Out</span>}
          </button>
        </div>
      </motion.aside>

      {/* Main Content */}
      <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
        {/* Top Bar */}
        <header className="h-16 bg-white border-b border-[#E5E7EB] flex items-center justify-between px-8 z-10">
          <div className="flex items-center gap-4 flex-1">
            <button 
              onClick={() => setIsSidebarOpen(!isSidebarOpen)}
              className="p-2 hover:bg-[#F3F4F6] rounded-lg text-[#6B7280]"
            >
              {isSidebarOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
            <div className="relative max-w-md w-full hidden md:block">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-[#9CA3AF]" />
              <input 
                type="text" 
                placeholder="Search orders, RFQs, or assets..." 
                className="w-full pl-10 pr-4 py-2 bg-[#F3F4F6] border-transparent focus:bg-white focus:border-[#059669] focus:ring-1 focus:ring-[#059669] rounded-lg text-sm transition-all"
              />
            </div>
          </div>

          <div className="flex items-center gap-6">
            {!isOnline && (
              <div className="flex items-center gap-2 px-3 py-1.5 bg-red-50 text-red-600 rounded-lg text-xs font-bold border border-red-100 animate-pulse">
                <WifiOff className="h-3.5 w-3.5" />
                <span>Offline Mode</span>
              </div>
            )}
            
            <div className="flex items-center gap-2 px-3 py-1.5 bg-[#F3F4F6] rounded-full text-xs font-medium text-[#4B5563]">
              <Building2 className="h-3.5 w-3.5" />
              <span>{profile?.orgId || 'No Organization'}</span>
            </div>
            
            <button className="relative p-2 text-[#6B7280] hover:bg-[#F3F4F6] rounded-full transition-colors">
              <Bell className="h-5 w-5" />
              <span className="absolute top-1.5 right-1.5 h-2 w-2 bg-[#EF4444] border-2 border-white rounded-full"></span>
            </button>

            <div className="flex items-center gap-3 pl-6 border-l border-[#E5E7EB]">
              <div className="text-right hidden sm:block">
                <p className="text-sm font-semibold text-[#111827]">{profile?.displayName}</p>
                <p className="text-xs text-[#6B7280] capitalize">{profile?.role}</p>
              </div>
              <div className="h-9 w-9 bg-[#E5E7EB] rounded-full flex items-center justify-center text-[#4B5563] font-bold">
                {profile?.displayName?.charAt(0) || 'U'}
              </div>
            </div>
          </div>
        </header>

        {/* Page Content */}
        <main className="flex-1 overflow-y-auto p-8">
          <AnimatePresence mode="wait">
            <motion.div
              key={location.pathname}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.2 }}
            >
              {children}
            </motion.div>
          </AnimatePresence>
        </main>
      </div>
    </div>
  );
};
