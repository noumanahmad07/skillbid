import { create } from 'zustand';

const SEEDED_AUCTIONS = [
  {
    id: 'a1',
    title: "Complete Brand Identity Package",
    student: { id: 's1', name: 'Ayesha Raza', university: 'LUMS', rating: 4.9 },
    category: 'Design',
    image: "https://images.unsplash.com/photo-1561070791-2526d30994b5?w=800&q=80",
    currentBid: 4200,
    timeLeft: 5520, // 92 min
    maxTime: 7200,
    bids: [
      { id: 'b1', bidderName: 'Ali Khan', amount: 4200, time: new Date(Date.now() - 1000 * 60 * 5).toISOString() },
      { id: 'b2', bidderName: 'Sara Ahmed', amount: 3800, time: new Date(Date.now() - 1000 * 60 * 15).toISOString() },
    ],
    bidCount: 14,
    featured: true,
    description: "I will provide a complete branding guide including logo, typography, and color palette.",
    tags: ['Logo', 'Branding', 'Figma'],
    deliveryTime: '3 days',
    status: 'live'
  },
  {
    id: 'a2',
    title: "React.js Admin Dashboard",
    student: { id: 's2', name: 'Bilal Ahmed', university: 'FAST NUCES', rating: 4.8 },
    category: 'Development',
    image: "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=800&q=80",
    currentBid: 6800,
    timeLeft: 660, // 11 min
    maxTime: 14400,
    bids: [],
    bidCount: 21,
    featured: true,
    description: "Professional dashboard built with React and Tailwind CSS.",
    tags: ['React', 'Dashboard', 'Tailwind'],
    deliveryTime: '5 days',
    status: 'live'
  },
  {
    id: 'a3',
    title: "YouTube Video Edit (10 min)",
    student: { id: 's3', name: 'Sara Malik', university: 'Beaconhouse', rating: 4.7 },
    category: 'Video & Media',
    image: "https://images.unsplash.com/photo-1492724441997-5dc865305da7?w=800&q=80",
    currentBid: 1600,
    timeLeft: 9300, // 155 min
    maxTime: 10800,
    bids: [],
    bidCount: 7,
    description: "High-quality video editing for your YouTube channel.",
    tags: ['YouTube', 'Editing', 'Vlog'],
    deliveryTime: '2 days',
    status: 'live'
  },
  {
    id: 'a4',
    title: "Android App — 2 Screens",
    student: { id: 's4', name: 'Hassan Tariq', university: 'NUST', rating: 4.6 },
    category: 'Development',
    image: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=800&q=80",
    currentBid: 4600,
    timeLeft: 3480, // 58 min
    maxTime: 7200,
    bids: [],
    bidCount: 9,
    description: "Modern Android application with 2 custom screens.",
    tags: ['Android', 'Kotlin', 'Mobile'],
    deliveryTime: '7 days',
    status: 'live'
  },
  {
    id: 'a5',
    title: "Investor Business Plan",
    student: { id: 's5', name: 'Fatima Noor', university: 'IBA Karachi', rating: 4.9 },
    category: 'Writing',
    image: "https://images.unsplash.com/photo-1455390582262-044cdead277a?w=800&q=80",
    currentBid: 3100,
    timeLeft: 2280, // 38 min
    maxTime: 3600,
    bids: [],
    bidCount: 11,
    description: "Professional business plan for startups and investors.",
    tags: ['Business', 'Writing', 'Startup'],
    deliveryTime: '5 days',
    status: 'live'
  },
  {
    id: 'a6',
    title: "30-Post Social Media Pack",
    student: { id: 's6', name: 'Omar Sheikh', university: 'Punjab Uni', rating: 4.5 },
    category: 'Design',
    image: "https://images.unsplash.com/photo-1572044162444-ad60f128bde2?w=800&q=80",
    currentBid: 2500,
    timeLeft: 6900, // 115 min
    maxTime: 14400,
    bids: [],
    bidCount: 0,
    description: "Creative social media posts for your brand.",
    tags: ['Social Media', 'Design', 'Instagram'],
    deliveryTime: '10 days',
    status: 'live'
  },
  {
    id: 'a7',
    title: "20 Product Photo Retouches",
    student: { id: 's7', name: 'Zara Hussain', university: 'Kinnaird', rating: 4.8 },
    category: 'Photography',
    image: "https://images.unsplash.com/photo-1542038784456-1ea8e935640e?w=800&q=80",
    currentBid: 1200,
    timeLeft: 420, // 7 min
    maxTime: 1800,
    bids: [],
    bidCount: 6,
    description: "Professional photo retouching and color correction.",
    tags: ['Photos', 'Editing', 'Product'],
    deliveryTime: '1 day',
    status: 'live'
  },
  {
    id: 'a8',
    title: "5-Page WordPress Website",
    student: { id: 's8', name: 'Ali Baig', university: 'COMSATS', rating: 4.7 },
    category: 'Development',
    image: "https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=800&q=80",
    currentBid: 3900,
    timeLeft: 4740, // 79 min
    maxTime: 7200,
    bids: [],
    bidCount: 12,
    description: "Custom WordPress website for your business.",
    tags: ['WordPress', 'Web', 'Blog'],
    deliveryTime: '5 days',
    status: 'live'
  }
];

export const useAuctionStore = create((set, get) => ({
  auctions: SEEDED_AUCTIONS,
  filters: { cat: 'All', q: '' },
  isLoading: false,
  
  setFilters: (newFilters) => {
    set((state) => ({ filters: { ...state.filters, ...newFilters } }));
  },
  
  addAuction: (auction) => {
    set((state) => ({ auctions: [auction, ...state.auctions] }));
  },
  
  updateAuction: (id, patch) => {
    set((state) => ({
      auctions: state.auctions.map((a) => (a.id === id ? { ...a, ...patch } : a)),
    }));
  },
  
  tickTimers: () => {
    set((state) => ({
      auctions: state.auctions.map((a) => {
        if (a.timeLeft <= 0) return { ...a, status: 'ended', timeLeft: 0 };
        return { ...a, timeLeft: a.timeLeft - 1 };
      }),
    }));
  },
  
  placeBidOptimistic: (auctionId, bid) => {
    const { auctions } = get();
    const auction = auctions.find((a) => a.id === auctionId);
    if (!auction) return;
    
    const newBid = {
      id: 'b' + Math.random().toString(36).substr(2, 5),
      ...bid,
      time: new Date().toISOString(),
    };
    
    set((state) => ({
      auctions: state.auctions.map((a) => 
        a.id === auctionId 
          ? { 
              ...a, 
              currentBid: bid.amount, 
              bidCount: a.bidCount + 1,
              bids: [newBid, ...(a.bids || [])] 
            } 
          : a
      ),
    }));
  },
  
  simulateRandomBid: () => {
    const { auctions } = get();
    const liveAuctions = auctions.filter((a) => a.status === 'live');
    if (liveAuctions.length === 0) return;
    
    const randomIndex = Math.floor(Math.random() * liveAuctions.length);
    const auction = liveAuctions[randomIndex];
    const bidIncrease = Math.floor(auction.currentBid * (0.05 + Math.random() * 0.1)); // 5-15% increase
    const amount = auction.currentBid + bidIncrease;
    
    get().placeBidOptimistic(auction.id, {
      bidderName: ['Zaid', 'Umar', 'Hamza', 'Anas', 'Mariam', 'Zainab'][Math.floor(Math.random() * 6)],
      amount,
    });
    
    return { auction, amount };
  },
}));
