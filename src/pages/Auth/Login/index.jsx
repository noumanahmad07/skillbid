import { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Mail, Lock, Eye, EyeOff, AlertCircle } from 'lucide-react';
import { motion } from 'framer-motion';
import { useAuthStore } from '../../../store/authStore';
import { useUIStore } from '../../../store/uiStore';
import { loginSchema } from '../../../utils/validators';
import { Input } from '../../../components/ui/Input';
import { Button } from '../../../components/ui/Button';
import { Card } from '../../../components/ui/Card';

export default function Login() {
  const [showPassword, setShowPassword] = useState(false);
  const { login, isLoading } = useAuthStore();
  const { addToast } = useUIStore();
  const navigate = useNavigate();
  const location = useLocation();

  const { register, handleSubmit, formState: { errors } } = useForm({
    resolver: zodResolver(loginSchema)
  });

  const onSubmit = async (data) => {
    const result = await login(data.email, data.password);
    if (result.ok) {
      addToast(`Welcome back, ${result.data.name}!`, 'success');
      const from = location.state?.from?.pathname || (result.data.role === 'student' ? '/dashboard' : '/auctions');
      navigate(from, { replace: true });
    }
  };

  return (
    <div className="min-h-[calc(100vh-var(--nav-h))] pt-nav bg-off flex items-center justify-center px-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-[420px]"
      >
        <div className="text-center mb-8">
          <Link to="/" className="inline-flex items-center gap-1 mb-4">
            <span className="text-3xl font-display font-bold text-text">Skill</span>
            <span className="text-3xl font-display font-bold text-indigo">Bid</span>
          </Link>
          <h2 className="text-2xl font-display font-bold text-text">Welcome back</h2>
          <p className="text-text2 font-medium">Log in to manage your auctions and bids</p>
        </div>

        <Card padding="lg" className="shadow-lg border-2">
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            <Input
              label="Email Address"
              type="email"
              placeholder="ayesha@lums.edu.pk"
              icon={Mail}
              error={errors.email?.message}
              {...register('email')}
            />
            
            <Input
              label="Password"
              type={showPassword ? 'text' : 'password'}
              placeholder="••••••••"
              icon={Lock}
              actionIcon={showPassword ? EyeOff : Eye}
              onActionClick={() => setShowPassword(!showPassword)}
              error={errors.password?.message}
              {...register('password')}
            />

            <Button type="submit" block size="lg" loading={isLoading}>
              Log in
            </Button>
          </form>

          <div className="mt-8 pt-6 border-t border-border text-center">
            <p className="text-sm text-text2">
              Don't have an account? <br />
              <Link to="/register" className="font-bold text-indigo hover:underline">
                Sign up for free →
              </Link>
            </p>
          </div>
        </Card>

        {/* Demo Accounts Info */}
        <div className="mt-8 p-4 bg-indigo-light/50 border border-indigo/10 rounded-xl">
          <div className="flex gap-3">
            <AlertCircle className="text-indigo shrink-0" size={20} />
            <div>
              <p className="text-xs font-bold text-indigo uppercase tracking-widest mb-2">Demo Accounts</p>
              <div className="space-y-2">
                <p className="text-[11px] text-text2 font-medium">
                  <span className="font-bold text-indigo">Student:</span> ayesha@lums.edu.pk / pass123
                </p>
                <p className="text-[11px] text-text2 font-medium">
                  <span className="font-bold text-indigo">Buyer:</span> ali.hassan@gmail.com / pass123
                </p>
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
