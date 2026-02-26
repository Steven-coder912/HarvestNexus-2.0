import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../lib/firebase';
import { Shield, ArrowRight, Loader2 } from 'lucide-react';
import { motion } from 'motion/react';

export const SignIn: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    try {
      await signInWithEmailAndPassword(auth, email, password);
      navigate('/app');
    } catch (err: any) {
      setError(err.message || 'Failed to sign in');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex bg-white font-sans">
      {/* Left Side - Visual */}
      <div className="hidden lg:flex lg:w-1/2 bg-[#059669] p-16 flex-col justify-between relative overflow-hidden">
        <div className="relative z-10">
          <div className="flex items-center gap-3 text-white mb-12">
            <div className="h-10 w-10 bg-white rounded-xl flex items-center justify-center text-[#059669] font-bold text-xl">
              HN
            </div>
            <span className="font-bold text-2xl tracking-tight">HarvestNexus OS</span>
          </div>
          <h1 className="text-6xl font-bold text-white leading-tight tracking-tighter max-w-md">
            The Institutional Standard for <span className="italic font-serif font-light opacity-80">Agri-Trade.</span>
          </h1>
        </div>
        
        <div className="relative z-10 space-y-8">
          <div className="flex items-start gap-4 text-white/90">
            <Shield className="h-6 w-6 mt-1 shrink-0" />
            <div>
              <h3 className="font-bold text-lg">Escrow-First Workflow</h3>
              <p className="text-sm opacity-80">Funds are secured before fulfillment begins, protecting both parties.</p>
            </div>
          </div>
          <div className="flex items-start gap-4 text-white/90">
            <Shield className="h-6 w-6 mt-1 shrink-0" />
            <div>
              <h3 className="font-bold text-lg">Inspection-Linked Settlement</h3>
              <p className="text-sm opacity-80">Payments are only released after independent quality verification.</p>
            </div>
          </div>
        </div>

        {/* Decorative elements */}
        <div className="absolute -bottom-24 -right-24 w-96 h-96 bg-white/10 rounded-full blur-3xl"></div>
        <div className="absolute top-1/2 -left-24 w-64 h-64 bg-black/10 rounded-full blur-3xl"></div>
      </div>

      {/* Right Side - Form */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-8 sm:p-16">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="w-full max-w-md space-y-10"
        >
          <div className="space-y-2">
            <h2 className="text-3xl font-bold tracking-tight text-[#111827]">Welcome Back</h2>
            <p className="text-[#6B7280]">Access your institutional trade dashboard.</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            {error && (
              <div className="p-4 bg-red-50 border border-red-100 text-red-600 text-sm rounded-lg">
                {error}
              </div>
            )}
            
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
              <div className="flex justify-between items-center">
                <label className="text-xs font-bold uppercase tracking-widest text-[#6B7280]">Password</label>
                <a href="#" className="text-xs font-semibold text-[#059669] hover:underline">Forgot password?</a>
              </div>
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
              className="w-full py-4 bg-[#111827] text-white rounded-xl font-bold flex items-center justify-center gap-2 hover:bg-[#1F2937] transition-all disabled:opacity-50 group"
            >
              {loading ? <Loader2 className="h-5 w-5 animate-spin" /> : (
                <>
                  Sign In to Dashboard
                  <ArrowRight className="h-5 w-5 group-hover:translate-x-1 transition-transform" />
                </>
              )}
            </button>
          </form>

          <p className="text-center text-sm text-[#6B7280]">
            Don't have an account? <Link to="/auth/sign-up" className="font-bold text-[#059669] hover:underline">Request Access</Link>
          </p>
        </motion.div>
      </div>
    </div>
  );
};
