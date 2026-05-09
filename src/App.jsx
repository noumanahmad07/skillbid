import { useEffect } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { useAuctionStore } from './store/auctionStore';
import { useUIStore } from './store/uiStore';
import { useAuthStore } from './store/authStore';

// Components
import { Navbar } from './components/layout/Navbar';
import { ToastContainer } from './components/ui/Toast.jsx';

// Pages
import Home from './pages/Home';
import Auctions from './pages/Auctions';
import AuctionDetail from './pages/AuctionDetail';
import Login from './pages/Auth/Login';
import Register from './pages/Auth/Register';
import Dashboard from './pages/Dashboard';
import PostAuction from './pages/PostAuction';
import MyBids from './pages/MyBids';
import Profile from './pages/Profile';
import ProfileView from './pages/ProfileView';
import Messages from './pages/Messages';
import Leaderboard from './pages/Leaderboard';
import Settings from './pages/Settings';
import HowItWorks from './pages/HowItWorks';

function App() {
  const tickTimers = useAuctionStore(state => state.tickTimers);
  const simulateRandomBid = useAuctionStore(state => state.simulateRandomBid);
  const toasts = useUIStore(state => state.toasts);
  const removeToast = useUIStore(state => state.removeToast);
  const addToast = useUIStore(state => state.addToast);
  const isAuthenticated = useAuthStore(state => state.isAuthenticated);
  const user = useAuthStore(state => state.user);

  // Real-time Simulation
  useEffect(() => {
    // Tick timers every second
    const timerInterval = setInterval(() => {
      tickTimers();
    }, 1000);

    // Random bids every 10-18 seconds
    const bidInterval = setInterval(() => {
      const bidData = simulateRandomBid();
      if (bidData) {
        addToast(`⚡ New bid of Rs. ${bidData.amount} on "${bidData.auction.title}"`, 'info', 4000);
      }
    }, 15000);

    return () => {
      clearInterval(timerInterval);
      clearInterval(bidInterval);
    };
  }, [tickTimers, simulateRandomBid, addToast]);

  const AuthGuard = ({ children, role }) => {
    if (!isAuthenticated) return <Navigate to="/login" replace />;
    if (role && user?.role !== role) return <Navigate to="/" replace />;
    return children;
  };

  return (
    <div className="min-h-screen bg-off font-body">
      <Navbar />
      
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/auctions" element={<Auctions />} />
        <Route path="/auctions/:id" element={<AuctionDetail />} />
        <Route path="/login" element={!isAuthenticated ? <Login /> : <Navigate to="/" />} />
        <Route path="/register" element={!isAuthenticated ? <Register /> : <Navigate to="/" />} />
        
        <Route path="/dashboard" element={<AuthGuard role="student"><Dashboard /></AuthGuard>} />
        <Route path="/post-auction" element={<AuthGuard role="student"><PostAuction /></AuthGuard>} />
        
        <Route path="/my-bids" element={<AuthGuard role="buyer"><MyBids /></AuthGuard>} />
        
        <Route path="/profile" element={<AuthGuard><Profile /></AuthGuard>} />
        <Route path="/profile/:userId" element={<ProfileView />} />
        <Route path="/messages" element={<AuthGuard><Messages /></AuthGuard>} />
        <Route path="/leaderboard" element={<Leaderboard />} />
        <Route path="/settings" element={<AuthGuard><Settings /></AuthGuard>} />
        <Route path="/how-it-works" element={<HowItWorks />} />
        
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>

      <ToastContainer toasts={toasts} onRemove={removeToast} />
    </div>
  );
}

export default App;
