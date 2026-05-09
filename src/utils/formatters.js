export const formatRs = (n) => {
  return `Rs. ${new Intl.NumberFormat('en-PK').format(n)}`;
};

export const formatTime = (seconds) => {
  if (seconds <= 0) return "ENDED";
  
  if (seconds >= 3600) {
    const h = Math.floor(seconds / 3600);
    const m = Math.floor((seconds % 3600) / 60);
    return `${h}h ${m}m`;
  }
  
  const m = Math.floor(seconds / 60);
  const s = seconds % 60;
  return `${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
};

export const timeAgo = (date) => {
  const seconds = Math.floor((new Date() - new Date(date)) / 1000);
  
  let interval = seconds / 31536000;
  if (interval > 1) return Math.floor(interval) + "y ago";
  
  interval = seconds / 2592000;
  if (interval > 1) return Math.floor(interval) + "mo ago";
  
  interval = seconds / 86400;
  if (interval > 1) return Math.floor(interval) + "d ago";
  
  interval = seconds / 3600;
  if (interval > 1) return Math.floor(interval) + "h ago";
  
  interval = seconds / 60;
  if (interval > 1) return Math.floor(interval) + "m ago";
  
  return "just now";
};

export const timerColorClass = (seconds) => {
  if (seconds <= 0) return "text-dim";
  if (seconds < 600) return "text-red"; // < 10 mins
  if (seconds < 1800) return "text-amber"; // < 30 mins
  return "text-emerald";
};

export const progressPct = (timeLeft, maxTime) => {
  return Math.min(100, Math.max(0, (timeLeft / maxTime) * 100));
};
