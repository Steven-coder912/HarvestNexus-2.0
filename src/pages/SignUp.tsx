import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { createUserWithEmailAndPassword, updateProfile } from 'firebase/auth';
import { doc, setDoc } from 'firebase/firestore';
import { auth, db } from '../lib/firebase';
import { Shield, ArrowRight, Loader2, Building2 } from 'lucide-react';
import { motion } from 'motion/react';
import { UserRole } from '../types';

export const SignUp: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [displayName, setDisplayName] = useState('');
  const [role, setRole] = useState<UserRole>('buyer');
  const [orgName, setOrgName] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    try {
      const { user } = await createUserWithEmailAndPassword(auth, email, password);
      await updateProfile(user, { displayName });
      
      const orgId = orgName.toLowerCase().replace(/\s+/g, '-');
      
      // Create User Profile
      await setDoc(doc(db, 'users', user.uid), {
        uid: user.uid,
        email,
        displayName,
        role,
        orgId,
        createdAt: new Date(),
      });

      // Create Organization
      await setDoc(doc(db, 'orgs', orgId), {
        id: orgId,
        name: orgName,
        type: role === 'seller' ? 'seller' : 'buyer',
        verified: false,
        createdAt: new Date(),
      });

      navigate('/app');
    } catch (err: any) {
      setError(err.message || 'Failed to sign up');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex bg-white font-sans">
      {/* Left Side - Visual */}
      <div className="hidden lg:flex lg:w-1/2 bg-[#111827] p-16 flex-col justify-between relative overflow-hidden">
        <div className="relative z-10">
          <div className="flex items-center gap-3 text-white mb-12">
            <div className="h-10 w-10 bg-[#059669] rounded-xl flex items-center justify-center text-white font-bold text-xl">
              HN
            </div>
            <span className="font-bold text-2xl tracking-tight">HarvestNexus OS</span>
          </div>
          <h1 className="text-6xl font-bold text-white leading-tight tracking-tighter max-w-md">
            Join the <span className="italic font-serif font-light opacity-80 text-[#059669]">Future</span> of Agricultural Trade.
          </h1>
        </div>
        
        <div className="relative z-10 space-y-8">
          <div className="flex items-start gap-4 text-white/90">
            <Building2 className="h-6 w-6 mt-1 shrink-0 text-[#059669]" />
            <div>
              <h3 className="font-bold text-lg">Institutional Onboarding</h3>
              <p className="text-sm opacity-80">Verified organizations only. We maintain a high-trust network for professional traders.</p>
            </div>
          </div>
        </div>

        {/* Decorative elements */}
        <div className="absolute -bottom-24 -right-24 w-96 h-96 bg-[#059669]/20 rounded-full blur-3xl"></div>
      </div>

      {/* Right Side - Form */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-8 sm:p-16 overflow-y-auto">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="w-full max-w-md space-y-10 py-8"
        >
          <div className="space-y-2">
            <h2 className="text-3xl font-bold tracking-tight text-[#111827]">Create Account</h2>
            <p className="text-[#6B7280]">Register your organization on HarvestNexus.</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            {error && (
              <div className="p-4 bg-red-50 border border-red-100 text-red-600 text-sm rounded-lg">
                {error}
              </div>
            )}
            
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="text-xs font-bold uppercase tracking-widest text-[#6B7280]">Full Name</label>
                <input 
                  type="text" 
                  required
                  value={displayName}
                  onChange={(e) => setDisplayName(e.target.value)}
                  className="w-full px-4 py-3 bg-[#F9FAFB] border border-[#E5E7EB] rounded-xl focus:ring-2 focus:ring-[#059669] focus:border-transparent transition-all outline-none"
                  placeholder="John Doe"
                />
              </div>
              <div className="space-y-2">
                <label className="text-xs font-bold uppercase tracking-widest text-[#6B7280]">Role</label>
                <select 
                  value={role}
                  onChange={(e) => setRole(e.target.value as UserRole)}
                  className="w-full px-4 py-3 bg-[#F9FAFB] border border-[#E5E7EB] rounded-xl focus:ring-2 focus:ring-[#059669] focus:border-transparent transition-all outline-none"
                >
                  <option value="buyer">Buyer</option>
                  <option value="seller">Seller</option>
                  <option value="inspector">Inspector</option>
                </select>
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-xs font-bold uppercase tracking-widest text-[#6B7280]">Organization Name</label>
              <input 
                type="text" 
                required
                value={orgName}
                onChange={(e) => setOrgName(e.target.value)}
                className="w-full px-4 py-3 bg-[#F9FAFB] border border-[#E5E7EB] rounded-xl focus:ring-2 focus:ring-[#059669] focus:border-transparent transition-all outline-none"
                placeholder="Global Agri Corp"
              />
            </div>

            <div className="space-y-2">
              <label className="text-xs font-bold uppercase tracking-widest text-[#6B7280]">Email Address</label>
              <input 
                type="email" 
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-3 bg-[#F9FAFB] border border-[#E5E7EB] rounded-xl focus:ring-2 focus:ring-[#059669] focus:border-transparent transition-all outline-none"
                placeholder="name@company.com"
              />
            </div>

            <div className="space-y-2">
              <label className="text-xs font-bold uppercase tracking-widest text-[#6B7280]">Password</label>
              <input 
                type="password" 
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-3 bg-[#F9FAFB] border border-[#E5E7EB] rounded-xl focus:ring-2 focus:ring-[#059669] focus:border-transparent transition-all outline-none"
                placeholder="••••••••"
              />
            </div>

            <button 
              type="submit"
              disabled={loading}
              className="w-full py-4 bg-[#059669] text-white rounded-xl font-bold flex items-center justify-center gap-2 hover:bg-[#047857] transition-all disabled:opacity-50 group"
            >
              {loading ? <Loader2 className="h-5 w-5 animate-spin" /> : (
                <>
                  Register Organization
                  <ArrowRight className="h-5 w-5 group-hover:translate-x-1 transition-transform" />
                </>
              )}
            </button>
          </form>

          <p className="text-center text-sm text-[#6B7280]">
            Already have an account? <Link to="/auth/sign-in" className="font-bold text-[#059669] hover:underline">Sign In</Link>
          </p>
        </motion.div>
      </div>
    </div>
  );
};
