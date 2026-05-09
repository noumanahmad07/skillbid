import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { ChevronLeft, Info, Plus, X, Rocket, Image as ImageIcon, UploadCloud } from 'lucide-react';
import { useRef } from 'react';
import { useAuctionStore } from '../../store/auctionStore';
import { useUIStore } from '../../store/uiStore';
import { useAuthStore } from '../../store/authStore';
import { auctionSchema } from '../../utils/validators';
import { PageWrapper } from '../../components/layout/PageWrapper';
import { Input } from '../../components/ui/Input';
import { Button } from '../../components/ui/Button';
import { Card } from '../../components/ui/Card';
import { Badge } from '../../components/ui/Badge';
import { CATEGORIES, AUCTION_DURATIONS, DELIVERY_TIMES } from '../../config/constants';
import { cn } from '../../utils/cn';

export default function PostAuction() {
  const navigate = useNavigate();
  const { addAuction } = useAuctionStore();
  const { addToast } = useUIStore();
  const { user } = useAuthStore();
  
  const [selectedDuration, setSelectedDuration] = useState(6);
  const [tags, setTags] = useState([]);
  const [tagInput, setTagInput] = useState('');
  const [imagePreview, setImagePreview] = useState(null);
  const fileInputRef = useRef(null);

  const { register, handleSubmit, formState: { errors }, setValue } = useForm({
    resolver: zodResolver(auctionSchema),
    defaultValues: {
      tags: [],
      duration: 6
    }
  });

  const handleAddTag = (e) => {
    if (e.key === 'Enter' && tagInput.trim()) {
      e.preventDefault();
      if (tags.length < 5 && !tags.includes(tagInput.trim())) {
        const newTags = [...tags, tagInput.trim()];
        setTags(newTags);
        setValue('tags', newTags);
        setTagInput('');
      }
    }
  };

  const removeTag = (tagToRemove) => {
    const newTags = tags.filter(t => t !== tagToRemove);
    setTags(newTags);
    setValue('tags', newTags);
  };
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      if (file.size > 5 * 1024 * 1024) {
        addToast("Image too large (Max 5MB)", "error");
        return;
      }
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
        setValue('image', reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const removeImage = () => {
    setImagePreview(null);
    setValue('image', '');
    if (fileInputRef.current) fileInputRef.current.value = '';
  };

  const onError = (errors) => {
    console.error("Form Errors:", errors);
    addToast("Please fix the errors in the form", "error");
  };

  const onSubmit = (data) => {
    try {
      const newAuction = {
        id: 'a' + Math.random().toString(36).substr(2, 5),
        ...data,
        student: {
          id: user?.id || 'guest',
          name: user?.name || 'Guest Student',
          university: user?.university || 'University',
          rating: user?.rating || 5.0
        },
        currentBid: data.startingBid,
        timeLeft: data.duration * 3600,
        maxTime: data.duration * 3600,
        bidCount: 0,
        bids: [],
        image: data.image || "https://images.unsplash.com/photo-1544391682-178565a03975?w=800&q=80",
        status: 'live',
        featured: false,
      };

      addAuction(newAuction);
      addToast("Your auction is live! 🚀", "success");
      navigate(`/auctions/${newAuction.id}`);
    } catch (err) {
      console.error("Submission error:", err);
      addToast("Failed to launch auction", "error");
    }
  };

  return (
    <PageWrapper className="pt-8 max-w-3xl">
      <Link to="/dashboard" className="flex items-center gap-2 text-sm font-bold text-muted hover:text-indigo transition-colors mb-8">
        <ChevronLeft size={16} /> Back to Dashboard
      </Link>

      <div className="mb-12">
        <p className="text-[11px] font-mono font-bold text-muted uppercase tracking-widest mb-2">New Auction</p>
        <h1 className="text-4xl font-display font-extrabold text-text">Post your skill</h1>
        <p className="text-text2 font-medium">Be precise to attract the best bids from businesses.</p>
      </div>

      <Card padding="lg" className="shadow-lg border-2">
        <form onSubmit={handleSubmit(onSubmit, onError)} className="space-y-8">
          {/* Image Upload Area */}
          <div className="space-y-3">
            <label className="block text-sm font-bold text-text2 uppercase tracking-wider">Project Cover Photo</label>
            <div 
              onClick={() => !imagePreview && fileInputRef.current?.click()}
              className={cn(
                "relative aspect-video rounded-2xl border-2 border-dashed transition-all cursor-pointer overflow-hidden flex flex-col items-center justify-center gap-3",
                imagePreview 
                  ? "border-indigo shadow-inner" 
                  : "border-border2 bg-off/50 hover:bg-off hover:border-indigo"
              )}
            >
              {imagePreview ? (
                <>
                  <img src={imagePreview} alt="Preview" className="w-full h-full object-cover" />
                  <div className="absolute inset-0 bg-black/40 opacity-0 hover:opacity-100 transition-opacity flex items-center justify-center">
                    <button 
                      type="button"
                      onClick={(e) => { e.stopPropagation(); removeImage(); }}
                      className="bg-red text-white p-2 rounded-full hover:scale-110 transition-transform"
                    >
                      <X size={20} />
                    </button>
                  </div>
                </>
              ) : (
                <>
                  <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center shadow-sm text-indigo">
                    <UploadCloud size={24} />
                  </div>
                  <div className="text-center">
                    <p className="text-sm font-bold text-text">Click to upload your work</p>
                    <p className="text-[11px] text-muted font-medium mt-1">High-quality JPG/PNG (Max 5MB)</p>
                  </div>
                </>
              )}
            </div>
            <input 
              type="file" 
              ref={fileInputRef}
              onChange={handleImageChange}
              accept="image/*"
              className="hidden"
            />
            {errors.image && <p className="text-xs text-red font-medium">{errors.image.message}</p>}
          </div>

          {/* Title */}
          <Input
            label="Auction Title"
            placeholder="e.g. I will design your brand logo with 3 concepts"
            error={errors.title?.message}
            {...register('title')}
          />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Category */}
            <div className="space-y-1.5">
              <label className="block text-sm font-medium text-text2">Skill Category</label>
              <select 
                {...register('category')}
                className="w-full bg-white border border-border rounded-xl px-3.5 py-2.5 outline-none focus:border-indigo focus:ring-4 focus:ring-indigo/10 transition-all"
              >
                <option value="">Select a category</option>
                {CATEGORIES.filter(c => c !== 'All').map(cat => (
                  <option key={cat} value={cat}>{cat}</option>
                ))}
              </select>
              {errors.category && <p className="text-xs text-red font-medium">{errors.category.message}</p>}
            </div>

            {/* Starting Bid */}
            <Input
              label="Starting Bid (Rs.)"
              type="number"
              placeholder="200"
              error={errors.startingBid?.message}
              {...register('startingBid', { valueAsNumber: true })}
            />
          </div>

          {/* Description */}
          <div className="space-y-1.5">
            <label className="block text-sm font-medium text-text2">Detailed Description</label>
            <textarea
              {...register('description')}
              rows={5}
              placeholder="Be precise: what files will you deliver, how many revisions, what info do you need from buyer?"
              className="w-full bg-white border border-border rounded-xl px-3.5 py-2.5 outline-none focus:border-indigo focus:ring-4 focus:ring-indigo/10 transition-all resize-none"
            />
            {errors.description && <p className="text-xs text-red font-medium">{errors.description.message}</p>}
          </div>

          {/* Tags */}
          <div className="space-y-3">
            <label className="block text-sm font-medium text-text2">Tags (Max 5)</label>
            <div className="flex flex-wrap gap-2 mb-2">
              {tags.map(tag => (
                <Badge key={tag} variant="indigo" className="pr-1 py-1">
                  {tag}
                  <button onClick={() => removeTag(tag)} className="ml-1 hover:bg-indigo hover:text-white rounded transition-colors p-0.5">
                    <X size={10} />
                  </button>
                </Badge>
              ))}
            </div>
            <input
              type="text"
              value={tagInput}
              onChange={(e) => setTagInput(e.target.value)}
              onKeyDown={handleAddTag}
              placeholder="Type tag and press Enter..."
              className="w-full bg-white border border-border rounded-xl px-3.5 py-2.5 outline-none focus:border-indigo transition-all"
            />
            {errors.tags && <p className="text-xs text-red font-medium">{errors.tags.message}</p>}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Delivery Time */}
            <div className="space-y-1.5">
              <label className="block text-sm font-medium text-text2">Delivery Time</label>
              <select 
                {...register('deliveryTime')}
                className="w-full bg-white border border-border rounded-xl px-3.5 py-2.5 outline-none focus:border-indigo focus:ring-4 focus:ring-indigo/10 transition-all"
              >
                <option value="">Select time</option>
                {DELIVERY_TIMES.map(time => (
                  <option key={time} value={time}>{time}</option>
                ))}
              </select>
              {errors.deliveryTime && <p className="text-xs text-red font-medium">{errors.deliveryTime.message}</p>}
            </div>

            {/* Duration Selector */}
            <div className="space-y-1.5">
              <label className="block text-sm font-medium text-text2">Auction Duration</label>
              <div className="grid grid-cols-3 gap-2">
                {AUCTION_DURATIONS.map((d) => (
                  <button
                    key={d.value}
                    type="button"
                    onClick={() => {
                      setSelectedDuration(d.value);
                      setValue('duration', d.value);
                    }}
                    className={cn(
                      "py-2 rounded-lg text-xs font-bold border transition-all",
                      selectedDuration === d.value 
                        ? "bg-indigo-light border-indigo text-indigo" 
                        : "bg-white border-border text-text2 hover:border-indigo/50"
                    )}
                  >
                    {d.label}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Terms Notice */}
          <div className="p-4 bg-off border border-border rounded-xl flex gap-3">
            <Info className="text-muted shrink-0" size={20} />
            <p className="text-xs text-text2 leading-relaxed font-medium">
              SkillBid takes <span className="font-bold text-indigo">12%</span> from the winning bid. You keep 88%. 
              Payment is held in <span className="font-bold text-indigo">escrow</span> until you deliver the work.
            </p>
          </div>

          <Button type="submit" block size="lg" icon={Rocket} className="h-14 text-lg">
            Launch Auction Now
          </Button>
        </form>
      </Card>
    </PageWrapper>
  );
}
