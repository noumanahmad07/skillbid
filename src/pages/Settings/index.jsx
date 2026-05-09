import { useState } from 'react';
import { Bell, Shield, Lock, Trash2, AlertCircle } from 'lucide-react';
import { PageWrapper } from '../../components/layout/PageWrapper';
import { Card } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';
import { useUIStore } from '../../store/uiStore';
import { cn } from '../../utils/cn';

export default function Settings() {
  const { addToast } = useUIStore();
  const [notifications, setNotifications] = useState({
    bids: true,
    ending: true,
    won: true,
    messages: true,
  });

  const toggleNotif = (key) => {
    setNotifications(prev => ({ ...prev, [key]: !prev[key] }));
  };

  return (
    <PageWrapper className="pt-12 max-w-4xl">
      <div className="mb-12">
        <h1 className="text-4xl font-display font-extrabold text-text">Settings</h1>
        <p className="text-text2 font-medium">Manage your account preferences and notifications.</p>
      </div>

      <div className="space-y-8">
        {/* Notifications */}
        <Card padding="lg">
          <div className="flex items-center gap-3 mb-8">
            <Bell className="text-indigo" size={24} />
            <h2 className="text-xl font-bold text-text">Notification Preferences</h2>
          </div>
          
          <div className="space-y-6">
            <ToggleRow 
              title="New bid on my auction" 
              desc="Get notified when someone places a bid on your listing."
              enabled={notifications.bids}
              onToggle={() => toggleNotif('bids')}
            />
            <ToggleRow 
              title="Auction ending soon" 
              desc="Receive an alert when your auction has less than 10 minutes left."
              enabled={notifications.ending}
              onToggle={() => toggleNotif('ending')}
            />
            <ToggleRow 
              title="Auction won" 
              desc="Get instant notification when you win an auction or your auction sells."
              enabled={notifications.won}
              onToggle={() => toggleNotif('won')}
            />
            <ToggleRow 
              title="New messages" 
              desc="Get notified when a buyer or student sends you a message."
              enabled={notifications.messages}
              onToggle={() => toggleNotif('messages')}
            />
          </div>

          <div className="mt-8 p-4 bg-off border border-border rounded-xl flex gap-3">
            <AlertCircle className="text-muted shrink-0" size={20} />
            <p className="text-xs text-text2 font-medium">
              Coming soon: WhatsApp & Email alerts for all notifications.
            </p>
          </div>
        </Card>

        {/* Account Deletion */}
        <Card padding="lg" className="border-red/20 bg-red-light/5">
          <div className="flex items-center gap-3 mb-4">
            <Trash2 className="text-red" size={24} />
            <h2 className="text-xl font-bold text-red">Danger Zone</h2>
          </div>
          <p className="text-sm text-text2 mb-6">
            Once you delete your account, there is no going back. All your data, auctions, and history will be permanently removed.
          </p>
          <Button variant="danger" outline onClick={() => {
            addToast("Account deletion requires email confirmation.", "info");
          }}>Delete Account Permanently</Button>
        </Card>
      </div>
    </PageWrapper>
  );
}

const ToggleRow = ({ title, desc, enabled, onToggle }) => {
  return (
    <div className="flex items-center justify-between gap-6 pb-6 border-b border-border last:border-0 last:pb-0">
      <div>
        <p className="text-sm font-bold text-text mb-1">{title}</p>
        <p className="text-xs text-muted font-medium">{desc}</p>
      </div>
      <button 
        onClick={onToggle}
        className={cn(
          "relative w-12 h-6 rounded-full transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-indigo/20",
          enabled ? "bg-indigo" : "bg-off2"
        )}
      >
        <div className={cn(
          "absolute top-1 left-1 w-4 h-4 bg-white rounded-full transition-transform duration-200",
          enabled ? "translate-x-6" : "translate-x-0"
        )} />
      </button>
    </div>
  );
};
