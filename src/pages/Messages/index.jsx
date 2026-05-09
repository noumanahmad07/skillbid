import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Send, Search, MoreVertical, Phone, Video, Image, Paperclip } from 'lucide-react';
import { PageWrapper } from '../../components/layout/PageWrapper';
import { Avatar } from '../../components/ui/Avatar';
import { Card } from '../../components/ui/Card';
import { cn } from '../../utils/cn';

const conversations = [
  { id: 1, name: 'Ayesha Raza', sub: 'LUMS • Student', lastMsg: 'I have shared the logo drafts, please check.', time: '2m ago', unread: 2, online: true },
  { id: 2, name: 'Bilal Ahmed', sub: 'FAST • Student', lastMsg: 'The dashboard is almost ready.', time: '1h ago', unread: 0, online: true },
  { id: 3, name: 'Ali Hassan', sub: 'Buyer', lastMsg: 'Can we hop on a quick call?', time: '2d ago', unread: 0, online: false },
];

const initialMessages = [
  { id: 1, text: "Hi! I'm interested in your brand design auction.", sender: 'them', time: '10:30 AM' },
  { id: 2, text: "Great! I've worked on similar projects before. Here's my portfolio.", sender: 'me', time: '10:32 AM' },
  { id: 3, text: "Looks amazing. I just placed a bid.", sender: 'them', time: '10:35 AM' },
  { id: 4, text: "I have shared the logo drafts, please check.", sender: 'them', time: '11:00 AM' },
];

export default function Messages() {
  const [selectedId, setSelectedId] = useState(1);
  const [messages, setMessages] = useState(initialMessages);
  const [input, setInput] = useState('');
  const scrollRef = useRef(null);

  const selectedConv = conversations.find(c => c.id === selectedId);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  const handleSend = (e) => {
    e.preventDefault();
    if (!input.trim()) return;
    
    const newMsg = {
      id: Date.now(),
      text: input,
      sender: 'me',
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };
    
    setMessages([...messages, newMsg]);
    setInput('');
  };

  return (
    <PageWrapper className="pt-8 h-[calc(100vh-var(--nav-h))] overflow-hidden flex flex-col" bg="white">
      <div className="flex-1 flex border border-border rounded-2xl overflow-hidden bg-white mb-8 shadow-lg">
        {/* Sidebar */}
        <aside className="w-full md:w-80 border-r border-border flex flex-col bg-off/30">
          <div className="p-6 border-b border-border bg-white">
            <h1 className="text-xl font-display font-bold text-text mb-4">Messages</h1>
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-muted" size={16} />
              <input 
                type="text" 
                placeholder="Search chats..."
                className="w-full bg-off border border-border rounded-lg pl-10 pr-4 py-2 text-sm outline-none focus:border-indigo"
              />
            </div>
          </div>
          
          <div className="flex-1 overflow-y-auto">
            {conversations.map((conv) => (
              <button
                key={conv.id}
                onClick={() => setSelectedId(conv.id)}
                className={cn(
                  "w-full p-4 flex gap-3 text-left transition-all relative",
                  selectedId === conv.id ? "bg-white shadow-sm z-10" : "hover:bg-white/50"
                )}
              >
                {selectedId === conv.id && <div className="absolute left-0 top-0 bottom-0 w-1 bg-indigo" />}
                <div className="relative">
                  <Avatar name={conv.name} size={48} />
                  {conv.online && <div className="absolute bottom-0 right-0 w-3 h-3 bg-emerald border-2 border-white rounded-full" />}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex justify-between items-start mb-1">
                    <p className="text-sm font-bold text-text truncate">{conv.name}</p>
                    <span className="text-[10px] font-bold text-muted uppercase">{conv.time}</span>
                  </div>
                  <p className="text-xs text-text2 truncate pr-4">{conv.lastMsg}</p>
                </div>
                {conv.unread > 0 && (
                  <div className="absolute right-4 bottom-4 w-5 h-5 bg-indigo text-white text-[10px] font-bold flex items-center justify-center rounded-full">
                    {conv.unread}
                  </div>
                )}
              </button>
            ))}
          </div>
        </aside>

        {/* Chat Window */}
        <main className="flex-1 flex flex-col bg-white">
          {/* Header */}
          <header className="p-4 border-b border-border flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Avatar name={selectedConv.name} size={40} />
              <div>
                <p className="text-sm font-bold text-text">{selectedConv.name}</p>
                <p className="text-[10px] text-indigo font-bold uppercase tracking-tight">{selectedConv.sub}</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <button className="p-2 text-muted hover:text-indigo hover:bg-indigo-light rounded-lg transition-all"><Phone size={20} /></button>
              <button className="p-2 text-muted hover:text-indigo hover:bg-indigo-light rounded-lg transition-all"><Video size={20} /></button>
              <button className="p-2 text-muted hover:text-text2 hover:bg-off rounded-lg transition-all"><MoreVertical size={20} /></button>
            </div>
          </header>

          {/* Messages Area */}
          <div 
            ref={scrollRef}
            className="flex-1 overflow-y-auto p-6 space-y-6 bg-off/20"
          >
            <div className="text-center">
              <span className="px-3 py-1 bg-off2 rounded-full text-[10px] font-bold text-muted uppercase tracking-widest">Today</span>
            </div>
            
            {messages.map((msg) => (
              <div 
                key={msg.id}
                className={cn(
                  "flex flex-col max-w-[80%]",
                  msg.sender === 'me' ? "ml-auto items-end" : "mr-auto items-start"
                )}
              >
                <div className={cn(
                  "p-4 rounded-2xl text-sm leading-relaxed",
                  msg.sender === 'me' 
                    ? "bg-indigo text-white rounded-br-none shadow-md shadow-indigo/10" 
                    : "bg-white border border-border text-text rounded-bl-none shadow-sm"
                )}>
                  {msg.text}
                </div>
                <span className="text-[10px] font-bold text-muted uppercase mt-2 px-1 tracking-tighter opacity-60">
                  {msg.time}
                </span>
              </div>
            ))}
          </div>

          {/* Input Bar */}
          <footer className="p-4 border-t border-border">
            <form onSubmit={handleSend} className="flex items-center gap-3 bg-off p-2 rounded-xl border border-border focus-within:border-indigo transition-colors">
              <div className="flex gap-1 px-2">
                <button type="button" className="p-2 text-muted hover:text-indigo transition-colors"><Paperclip size={18} /></button>
                <button type="button" className="p-2 text-muted hover:text-indigo transition-colors"><Image size={18} /></button>
              </div>
              <input 
                type="text" 
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Type a message..."
                className="flex-1 bg-transparent border-none outline-none text-sm font-medium text-text"
              />
              <button 
                type="submit"
                disabled={!input.trim()}
                className="bg-indigo text-white p-2.5 rounded-lg hover:bg-indigo2 transition-all disabled:opacity-50 disabled:grayscale"
              >
                <Send size={18} />
              </button>
            </form>
          </footer>
        </main>
      </div>
    </PageWrapper>
  );
}
