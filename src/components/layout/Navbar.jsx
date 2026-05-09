import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, ChevronDown, LogOut, User, Settings, Bell, MessageSquare } from 'lucide-react';
import { cn } from '../../utils/cn';
import { useAuthStore } from '../../store/authStore';
import { useAuctionStore } from '../../store/auctionStore';
import { Avatar } from '../ui/Avatar';
import { Button } from '../ui/Button';

export const Navbar = () => {
  const user = useAuthStore(state => state.user);
  const logout = useAuthStore(state => state.logout);
  const isAuthenticated = useAuthStore(state => state.isAuthenticated);
  const liveCount = useAuctionStore(state => state.auctions.filter(a => a.status === 'live').length);
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [userDropdownOpen, setUserDropdownOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 10);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setMobileMenuOpen(false);
    setUserDropdownOpen(false);
  }, [location]);

  const navLinks = [
    { label: 'Home', path: '/' },
    { label: 'Live Auctions', path: '/auctions' },
    { label: 'Leaderboard', path: '/leaderboard' },
    { label: 'How It Works', path: '/how-it-works' },
  ];

  if (isAuthenticated) {
    if (user.role === 'student') {
      // Student specific links could be added here or just filter
    } else {
      // Buyer specific links
    }
  }

  return (
    <nav className={cn(
      "fixed top-0 left-0 right-0 z-50 h-nav bg-white/95 backdrop-blur-md border-bottom border-border transition-all duration-300",
      isScrolled && "shadow-sm"
    )}>
      <div className="max-w-7xl mx-auto px-4 h-full flex items-center justify-between">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-1">
          <span className="text-2xl font-display font-bold text-text">Skill</span>
          <span className="text-2xl font-display font-bold text-indigo">Bid</span>
        </Link>

        {/* Desktop Nav */}
        <div className="hidden lg:flex items-center gap-8">
          {navLinks.map(link => (
            <motion.div
              key={link.path}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              transition={{ type: "spring", stiffness: 400, damping: 17 }}
            >
              <Link 
                to={link.path}
                className={cn(
                  "text-sm font-medium transition-colors hover:text-indigo",
                  location.pathname === link.path ? "text-indigo" : "text-text2"
                )}
              >
                {link.label}
              </Link>
            </motion.div>
          ))}
          
          <div className="flex items-center gap-2 px-3 py-1 bg-red-light rounded-full pulse-red">
            <span className="w-2 h-2 rounded-full bg-red" />
            <span className="text-[11px] font-bold text-red uppercase tracking-wider">LIVE {liveCount}</span>
          </div>
        </div>

        {/* Auth / Actions */}
        <div className="hidden lg:flex items-center gap-4">
          {!isAuthenticated ? (
            <>
              <Link to="/login">
                <Button variant="ghost" size="sm">Log in</Button>
              </Link>
              <Link to="/register">
                <Button variant="primary" size="sm">Register free</Button>
              </Link>
            </>
          ) : (
            <div className="flex items-center gap-4">
              <Link to="/messages" className="text-text2 hover:text-indigo relative">
                <MessageSquare size={20} />
                <span className="absolute -top-1 -right-1 w-4 h-4 bg-red text-white text-[10px] flex items-center justify-center rounded-full">2</span>
              </Link>
              
              <div className="relative">
                <button 
                  onClick={() => setUserDropdownOpen(!userDropdownOpen)}
                  className="flex items-center gap-2 p-1 pl-2 hover:bg-off rounded-full transition-colors"
                >
                  <span className="text-sm font-semibold text-text2">{user.name.split(' ')[0]}</span>
                  <Avatar name={user.name} size={32} />
                  <ChevronDown size={14} className={cn("transition-transform", userDropdownOpen && "rotate-180")} />
                </button>

                <AnimatePresence>
                  {userDropdownOpen && (
                    <motion.div
                      initial={{ opacity: 0, scale: 0.95, y: 10 }}
                      animate={{ opacity: 1, scale: 1, y: 0 }}
                      exit={{ opacity: 0, scale: 0.95, y: 10 }}
                      className="absolute right-0 mt-2 w-56 bg-white border border-border shadow-lg rounded-xl overflow-hidden"
                    >
                      <div className="p-4 border-bottom border-border bg-off/50">
                        <p className="text-sm font-bold text-text">{user.name}</p>
                        <p className="text-xs text-muted truncate">{user.email}</p>
                        <div className="mt-2 inline-block px-2 py-0.5 bg-indigo-light text-indigo text-[10px] font-bold rounded uppercase">
                          {user.role}
                        </div>
                      </div>
                      <div className="p-2">
                        <Link to={user.role === 'student' ? '/dashboard' : '/my-bids'}>
                          <button className="w-full flex items-center gap-3 px-3 py-2 text-sm text-text2 hover:bg-off hover:text-indigo rounded-lg transition-colors">
                            <User size={16} /> Dashboard
                          </button>
                        </Link>
                        <Link to="/profile">
                          <button className="w-full flex items-center gap-3 px-3 py-2 text-sm text-text2 hover:bg-off hover:text-indigo rounded-lg transition-colors">
                            <User size={16} /> My Profile
                          </button>
                        </Link>
                        <Link to="/settings">
                          <button className="w-full flex items-center gap-3 px-3 py-2 text-sm text-text2 hover:bg-off hover:text-indigo rounded-lg transition-colors">
                            <Settings size={16} /> Settings
                          </button>
                        </Link>
                        <div className="my-1 border-bottom border-border" />
                        <button 
                          onClick={logout}
                          className="w-full flex items-center gap-3 px-3 py-2 text-sm text-red hover:bg-red-light rounded-lg transition-colors"
                        >
                          <LogOut size={16} /> Log Out
                        </button>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </div>
          )}
        </div>

        {/* Mobile Toggle */}
        <button 
          className="lg:hidden p-2 text-text2"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        >
          {mobileMenuOpen ? <X /> : <Menu />}
        </button>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="lg:hidden absolute top-nav left-0 right-0 bg-white border-bottom border-border shadow-xl p-4 flex flex-col gap-2"
          >
            {navLinks.map(link => (
              <Link 
                key={link.path}
                to={link.path}
                className={cn(
                  "p-3 rounded-lg font-medium",
                  location.pathname === link.path ? "bg-indigo-light text-indigo" : "text-text2 hover:bg-off"
                )}
              >
                {link.label}
              </Link>
            ))}
            {!isAuthenticated ? (
              <div className="grid grid-cols-2 gap-4 mt-4">
                <Link to="/login">
                  <Button variant="outline" block>Log in</Button>
                </Link>
                <Link to="/register">
                  <Button variant="primary" block>Register</Button>
                </Link>
              </div>
            ) : (
              <div className="mt-4 pt-4 border-t border-border">
                <Link to={user.role === 'student' ? '/dashboard' : '/my-bids'} className="block p-3 text-text2 font-medium">Dashboard</Link>
                <Link to="/profile" className="block p-3 text-text2 font-medium">Profile</Link>
                <button onClick={logout} className="w-full text-left p-3 text-red font-medium">Log Out</button>
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};
