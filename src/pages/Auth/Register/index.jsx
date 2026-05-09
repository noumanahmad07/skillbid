import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Mail, Lock, Eye, EyeOff, User, Building2, GraduationCap } from 'lucide-react';
import { motion } from 'framer-motion';
import { useAuthStore } from '../../../store/authStore';
import { useUIStore } from '../../../store/uiStore';
import { registerSchema } from '../../../utils/validators';
import { Input } from '../../../components/ui/Input';
import { Button } from '../../../components/ui/Button';
import { Card } from '../../../components/ui/Card';
import { cn } from '../../../utils/cn';

export default function Register() {
  const [showPassword, setShowPassword] = useState(false);
  const [role, setRole] = useState('student');
  const { register: registerUser, isLoading } = useAuthStore();
  const { addToast } = useUIStore();
  const navigate = useNavigate();

  const { register, handleSubmit, formState: { errors } } = useForm({
    resolver: zodResolver(registerSchema),
    defaultValues: { role: 'student' }
  });

  const onSubmit = async (data) => {
    const result = await registerUser({ ...data, role });
    if (result.ok) {
      addToast("Account created successfully! Welcome to SkillBid.", 'success');
      navigate(role === 'student' ? '/dashboard' : '/auctions');
    }
  };

  return (
    <div className="min-h-[calc(100vh-var(--nav-h))] pt-nav bg-off flex items-center justify-center px-4 py-20">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-[480px]"
      >
        <div className="text-center mb-8">
          <Link to="/" className="inline-flex items-center gap-1 mb-4">
            <span className="text-3xl font-display font-bold text-text">Skill</span>
            <span className="text-3xl font-display font-bold text-indigo">Bid</span>
          </Link>
          <h2 className="text-2xl font-display font-bold text-text">Create your account</h2>
          <p className="text-text2 font-medium">Join Pakistan's fastest growing talent marketplace</p>
        </div>

        <Card padding="lg" className="shadow-lg border-2">
          {/* Role Selector */}
          <div className="grid grid-cols-2 gap-4 mb-8">
            <button
              type="button"
              onClick={() => setRole('student')}
              className={cn(
                "p-4 rounded-xl border-2 text-left transition-all",
                role === 'student' ? "border-indigo bg-indigo-light/30" : "border-border bg-white hover:border-indigo/30"
              )}
            >
              <GraduationCap className={cn("mb-2", role === 'student' ? "text-indigo" : "text-muted")} />
              <p className="text-sm font-bold text-text">Student</p>
              <p className="text-[10px] text-muted font-bold uppercase">Post & Earn</p>
            </button>
            <button
              type="button"
              onClick={() => setRole('buyer')}
              className={cn(
                "p-4 rounded-xl border-2 text-left transition-all",
                role === 'buyer' ? "border-indigo bg-indigo-light/30" : "border-border bg-white hover:border-indigo/30"
              )}
            >
              <Building2 className={cn("mb-2", role === 'buyer' ? "text-indigo" : "text-muted")} />
              <p className="text-sm font-bold text-text">Business</p>
              <p className="text-[10px] text-muted font-bold uppercase">Hire & Bid</p>
            </button>
          </div>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Input
                label="Full Name"
                placeholder="Ayesha Raza"
                error={errors.name?.message}
                {...register('name')}
              />
              <Input
                label={role === 'student' ? "University" : "Company"}
                placeholder={role === 'student' ? "LUMS" : "Stripe PK"}
                error={errors.university?.message || errors.company?.message}
                {...register(role === 'student' ? 'university' : 'company')}
              />
            </div>

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

            <div className="flex items-start gap-2 pt-2">
              <input 
                type="checkbox" 
                id="terms" 
                className="mt-1 w-4 h-4 text-indigo rounded border-border focus:ring-indigo"
                {...register('terms')}
              />
              <label htmlFor="terms" className="text-xs text-text2 leading-relaxed">
                I agree to the <Link to="/terms" className="text-indigo font-bold hover:underline">Terms of Service</Link> and <Link to="/privacy" className="text-indigo font-bold hover:underline">Privacy Policy</Link>
              </label>
            </div>
            {errors.terms && <p className="text-[10px] text-red font-bold uppercase tracking-tight">{errors.terms.message}</p>}

            <Button type="submit" block size="lg" loading={isLoading} className="mt-6">
              Create free account
            </Button>
          </form>

          <div className="mt-8 pt-6 border-t border-border text-center">
            <p className="text-sm text-text2">
              Already have an account? <br />
              <Link to="/login" className="font-bold text-indigo hover:underline">
                Sign in to your account →
              </Link>
            </p>
          </div>
        </Card>
      </motion.div>
    </div>
  );
}
