import { useForm } from 'react-hook-form';
import { motion } from 'framer-motion';
import { User, Camera, Shield, Bell, Lock } from 'lucide-react';
import { useAuthStore } from '../../store/authStore';
import { useUIStore } from '../../store/uiStore';
import { PageWrapper } from '../../components/layout/PageWrapper';
import { Card } from '../../components/ui/Card';
import { Input } from '../../components/ui/Input';
import { Button } from '../../components/ui/Button';
import { Avatar } from '../../components/ui/Avatar';
import { Badge } from '../../components/ui/Badge';

export default function Profile() {
  const { user, updateUser } = useAuthStore();
  const { addToast } = useUIStore();

  const { register, handleSubmit, formState: { isDirty } } = useForm({
    defaultValues: {
      name: user?.name,
      university: user?.university,
      bio: user?.bio,
      whatsapp: user?.whatsapp || '03001234567'
    }
  });

  const onSubmit = (data) => {
    updateUser(data);
    addToast("Profile updated successfully! ✓", "success");
  };

  return (
    <PageWrapper className="pt-12 max-w-4xl">
      <div className="mb-12">
        <h1 className="text-4xl font-display font-extrabold text-text">My Profile</h1>
        <p className="text-text2 font-medium">Manage your personal information and preferences.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Profile Card */}
        <div className="lg:col-span-1 space-y-6">
          <Card padding="lg" className="text-center">
            <div className="relative inline-block mb-6">
              <Avatar name={user?.name} size={88} className="mx-auto border-4 border-white shadow-md" />
              <button className="absolute bottom-0 right-0 p-2 bg-white border border-border rounded-full shadow-sm hover:bg-off transition-colors">
                <Camera size={16} className="text-indigo" />
              </button>
            </div>
            <h3 className="text-xl font-bold text-text">{user?.name}</h3>
            <p className="text-sm font-bold text-indigo uppercase tracking-wider mb-2">{user?.university || 'Buyer'}</p>
            <Badge variant="indigo" className="mb-6">{user?.role}</Badge>
            
            <div className="pt-6 border-t border-border flex flex-col gap-2">
              <Button variant="outline" size="sm" block>View Public Profile</Button>
            </div>
          </Card>
        </div>

        {/* Form Area */}
        <div className="lg:col-span-2 space-y-8">
          <Card padding="lg">
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
              <h2 className="text-lg font-bold text-text flex items-center gap-2">
                <User size={20} className="text-indigo" /> Personal Information
              </h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Input
                  label="Full Name"
                  {...register('name')}
                />
                <Input
                  label={user?.role === 'student' ? "University" : "Company"}
                  {...register('university')}
                />
              </div>

              <div className="space-y-1.5">
                <label className="block text-sm font-medium text-text2">Bio</label>
                <textarea
                  {...register('bio')}
                  rows={4}
                  className="w-full bg-white border border-border rounded-xl px-3.5 py-2.5 outline-none focus:border-indigo focus:ring-4 focus:ring-indigo/10 transition-all resize-none"
                />
              </div>

              <Input
                label="WhatsApp Number"
                {...register('whatsapp')}
              />

              <div className="pt-4 flex justify-end gap-3">
                <Button type="button" variant="ghost">Cancel</Button>
                <Button type="submit" variant="primary" disabled={!isDirty}>Save Changes</Button>
              </div>
            </form>
          </Card>

          <Card padding="lg">
            <h2 className="text-lg font-bold text-text flex items-center gap-2 mb-6">
              <Lock size={20} className="text-indigo" /> Security
            </h2>
            <div className="space-y-4">
              <div className="flex items-center justify-between p-4 bg-off border border-border rounded-xl">
                <div>
                  <p className="text-sm font-bold text-text">Password</p>
                  <p className="text-xs text-muted">Last changed 2 months ago</p>
                </div>
                <Button variant="outline" size="sm">Change Password</Button>
              </div>
              <div className="flex items-center justify-between p-4 bg-off border border-border rounded-xl">
                <div>
                  <p className="text-sm font-bold text-text">Two-Factor Authentication</p>
                  <p className="text-xs text-muted">Secure your account with 2FA</p>
                </div>
                <Button variant="outline" size="sm">Enable</Button>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </PageWrapper>
  );
}
