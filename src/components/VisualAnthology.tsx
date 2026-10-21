import React, { useState, useRef, useEffect } from 'react';
import { 
  PLATES_DATA, 
  PlateItem, 
  GOOGLE_REVIEWS, 
  STUDIO_GALLERY_PHOTOS, 
  STUDIO_POSTS, 
  StudioPost,
  INVESTMENT_TIERS,
  InvestmentTier
} from '../data/weddingData';
import { 
  Camera, 
  Eye, 
  Sparkles, 
  Heart, 
  ArrowRight, 
  MessageCircle, 
  X, 
  CheckCircle, 
  CheckCircle2,
  Check, 
  ExternalLink,
  ImageIcon,
  BookOpen,
  Upload,
  Trash2,
  ImagePlus,
  Layers,
  Flame,
  Film,
  Maximize2,
  ChevronLeft,
  ChevronRight,
  Play,
  Pause,
  MapPin,
  Clock,
  Navigation,
  Phone,
  Award,
  Youtube,
  Facebook,
  Instagram
} from 'lucide-react';

export interface UserUploadedGalleryItem {
  id: string;
  url: string;
  caption?: string;
  ceremonyTag?: string;
  uploadedAt: string;
}

interface VisualAnthologyProps {
  onSelectPlate?: (plate: PlateItem) => void;
  onNavigateToReserve?: () => void;
  onSelectScreen?: (screen: string) => void;
  onOpenWhatsApp: (message?: string) => void;
  onOpenAppointmentModal?: () => void;
}

export const VisualAnthology: React.FC<VisualAnthologyProps> = ({
  onSelectPlate,
  onNavigateToReserve,
  onSelectScreen,
  onOpenWhatsApp,
  onOpenAppointmentModal
}) => {
  const [activeFilter, setActiveFilter] = useState<string>('all');
  const [favoritePlates, setFavoritePlates] = useState<string[]>([]);
  const [lightboxPlate, setLightboxPlate] = useState<PlateItem | null>(null);
  const [selectedGalleryPhoto, setSelectedGalleryPhoto] = useState<string | null>(null);
  const [selectedPost, setSelectedPost] = useState<StudioPost | null>(null);
  const [galleryDisplayCount, setGalleryDisplayCount] = useState<number>(12);

  // Pricing toggle (Single Event vs Complete Royal Nuptials)
  const [pricingPlan, setPricingPlan] = useState<'single' | 'multiday'>('multiday');

  // User uploaded ceremony photos for Our Studio Gallery & Real Ceremonies section
  const [userUploadedPhotos, setUserUploadedPhotos] = useState<UserUploadedGalleryItem[]>(() => {
    try {
      const saved = localStorage.getItem('rk_studio_custom_gallery_photos');
      return saved ? JSON.parse(saved) : [];
    } catch (err) {
      return [];
    }
  });
  const [isUploadModalOpen, setIsUploadModalOpen] = useState(false);
  const [uploadSuccessMessage, setUploadSuccessMessage] = useState<string | null>(null);
  const [selectedUploadFiles, setSelectedUploadFiles] = useState<Array<{ file: File; preview: string }>>([]);
  const [uploadCeremonyTag, setUploadCeremonyTag] = useState('Weddings & Pheras');
  const [uploadCaption, setUploadCaption] = useState('');
  const [isDragging, setIsDragging] = useState(false);
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  // Hero interactive central node active item & auto-advance loop
  const [heroActivePlateIdx, setHeroActivePlateIdx] = useState<number>(0);
  const [isHeroAutoPlaying, setIsHeroAutoPlaying] = useState<boolean>(true);
  const [isHeroHovered, setIsHeroHovered] = useState<boolean>(false);

  // Curated images for the luxury hero marquee (ordered exactly per reference design)
  const heroShowcasePlates = [
    PLATES_DATA[5], // Plate 06: The Sacred Agni (/images/6.jpg)
    PLATES_DATA[6], // Plate 07: The Royal Pre-Wedding Romance (/images/7.jpg)
    PLATES_DATA[9], // Plate 10: Bridal Splendor & Intricate Regalia
    PLATES_DATA[0], // Plate 01: The Crimson Veil at Pichola (/images/1.jpg)
    PLATES_DATA[1], // Plate 02: Serenade of Morning Light (/images/2.jpg)
    PLATES_DATA[2], // Plate 03: A Mother's Gaze (/images/3.jpg)
    PLATES_DATA[3], // Plate 04: The Whirlwind of Sangeet (/images/4.jpg)
    PLATES_DATA[4], // Plate 05: Promises under the Starlight (/images/5.jpg)
  ];

  const currentHeroPlate = heroShowcasePlates[heroActivePlateIdx] || heroShowcasePlates[0];

  // Hero video background ref and robust infinite loop playback
  const heroVideoRef = useRef<HTMLVideoElement | null>(null);
  const heroSectionRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    const video = heroVideoRef.current;
    if (!video) return;

    // Ensure audio is permanently muted so browsers allow uninterrupted auto-loop
    video.defaultMuted = true;
    video.muted = true;

    // Safe play trigger
    const attemptPlay = () => {
      if (video && video.paused) {
        video.play().catch(() => {});
      }
    };

    attemptPlay();

    // Ensure infinite looping on video end
    const handleEnded = () => {
      if (video) {
        video.currentTime = 0;
        attemptPlay();
      }
    };
    video.addEventListener('ended', handleEnded);

    // Play ONLY when hero section is in viewport; pause when scrolled away
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            attemptPlay();
          } else {
            if (video && !video.paused) {
              video.pause();
            }
          }
        });
      },
      { threshold: 0.1 }
    );

    if (heroSectionRef.current) {
      observer.observe(heroSectionRef.current);
    }

    // First user interaction failsafe (click / scroll)
    const handleFirstGesture = () => {
      attemptPlay();
      window.removeEventListener('click', handleFirstGesture);
      window.removeEventListener('touchstart', handleFirstGesture);
      window.removeEventListener('scroll', handleFirstGesture);
    };

    window.addEventListener('click', handleFirstGesture, { passive: true });
    window.addEventListener('touchstart', handleFirstGesture, { passive: true });
    window.addEventListener('scroll', handleFirstGesture, { passive: true });

    return () => {
      video.removeEventListener('ended', handleEnded);
      observer.disconnect();
      window.removeEventListener('click', handleFirstGesture);
      window.removeEventListener('touchstart', handleFirstGesture);
      window.removeEventListener('scroll', handleFirstGesture);
    };
  }, []);

  // Auto-advance loop timer: smoothly transitions to next image every 4.5 seconds
  useEffect(() => {
    if (!isHeroAutoPlaying || isHeroHovered) return;
    const interval = setInterval(() => {
      setHeroActivePlateIdx(prev => (prev + 1) % heroShowcasePlates.length);
    }, 4500);
    return () => clearInterval(interval);
  }, [isHeroAutoPlaying, isHeroHovered, heroShowcasePlates.length]);

  const handleFilesSelected = (files: FileList) => {
    const fileArray = Array.from(files).filter(file => file.type.startsWith('image/'));
    if (fileArray.length === 0) return;

    fileArray.forEach(file => {
      const reader = new FileReader();
      reader.onload = () => {
        if (typeof reader.result === 'string') {
          setSelectedUploadFiles(prev => [...prev, { file, preview: reader.result as string }]);
        }
      };
      reader.readAsDataURL(file);
    });
  };

  const handleConfirmUpload = () => {
    if (selectedUploadFiles.length === 0) return;

    const newItems: UserUploadedGalleryItem[] = selectedUploadFiles.map((item, idx) => ({
      id: `user-photo-${Date.now()}-${idx}-${Math.random().toString(36).substring(2, 7)}`,
      url: item.preview,
      caption: uploadCaption.trim() || undefined,
      ceremonyTag: uploadCeremonyTag,
      uploadedAt: new Date().toLocaleDateString('en-IN', { month: 'short', day: 'numeric', year: 'numeric' })
    }));

    const updated = [...newItems, ...userUploadedPhotos];
    setUserUploadedPhotos(updated);
    try {
      localStorage.setItem('rk_studio_custom_gallery_photos', JSON.stringify(updated));
    } catch (err) {
      console.warn('Local storage quota reached, saved in active session memory', err);
    }

    setUploadSuccessMessage(
      newItems.length === 1
        ? 'Photograph successfully added to Our Studio Gallery!'
        : `${newItems.length} photographs successfully added to Our Studio Gallery!`
    );
    setSelectedUploadFiles([]);
    setUploadCaption('');
    setIsUploadModalOpen(false);

    setTimeout(() => {
      setUploadSuccessMessage(null);
    }, 4500);
  };

  const handleDeleteUploadedPhoto = (e: React.MouseEvent, id: string) => {
    e.stopPropagation();
    const updated = userUploadedPhotos.filter(p => p.id !== id);
    setUserUploadedPhotos(updated);
    try {
      localStorage.setItem('rk_studio_custom_gallery_photos', JSON.stringify(updated));
    } catch (err) {
      console.warn(err);
    }
  };

  const allGalleryPhotos = [
    ...userUploadedPhotos.map(p => ({
      id: p.id,
      url: p.url,
      caption: p.caption,
      tag: p.ceremonyTag,
      isUserUpload: true
    })),
    ...STUDIO_GALLERY_PHOTOS.map((url, idx) => ({
      id: `studio-${idx}`,
      url,
      caption: undefined,
      tag: undefined,
      isUserUpload: false
    }))
  ];

  const handleOpenReserve = () => {
    if (onOpenAppointmentModal) {
      onOpenAppointmentModal();
    } else if (onNavigateToReserve) {
      onNavigateToReserve();
    } else if (onSelectScreen) {
      onSelectScreen('reserve');
    }
  };

  const handlePlateClick = (plate: PlateItem) => {
    setLightboxPlate(plate);
    if (onSelectPlate) {
      onSelectPlate(plate);
    }
  };

  const toggleFavorite = (e: React.MouseEvent, id: string) => {
    e.stopPropagation();
    setFavoritePlates(prev =>
      prev.includes(id) ? prev.filter(item => item !== id) : [...prev, id]
    );
  };

  const filteredPlates = activeFilter === 'all'
    ? PLATES_DATA
    : PLATES_DATA.filter(p => p.category === activeFilter);

  // Pricing display calculator
  const getTierPriceDisplay = (tierId: string) => {
    if (tierId === 'tier-1') {
      return pricingPlan === 'single' ? '₹ 1,75,000' : '₹ 2,85,000';
    }
    if (tierId === 'tier-2') {
      return pricingPlan === 'single' ? '₹ 3,95,000' : '₹ 5,85,000';
    }
    return pricingPlan === 'single' ? '₹ 7,50,000' : '₹ 11,50,000';
  };

  return (
    <div className="w-full bg-[#fcf9f4] text-[#1c1c19] min-h-screen relative overflow-hidden font-sans">
      
      {/* SVG Definitions for Light Mode Neural Gradients */}
      <svg className="absolute w-0 h-0 pointer-events-none" aria-hidden="true">
        <defs>
          <linearGradient id="goldGradientLight" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#a78b71" stopOpacity="0.8" />
            <stop offset="50%" stopColor="#c5a059" stopOpacity="0.7" />
            <stop offset="100%" stopColor="#45123E" stopOpacity="0.45" />
          </linearGradient>
        </defs>
      </svg>

      {/* ========================================================= */}
      {/* REDESIGNED LUXURY GLASS LUCID WEDDING PHOTOGRAPHY HERO    */}
      {/* Cinematic Background Video + Glass Lucid Centerpiece       */}
      {/* Edge-to-Edge Moving Photos with Bilateral Fade Vignettes  */}
      {/* ========================================================= */}
      {/* ========================================================= */}
      {/* HOME PAGE HERO - EXACT MATCH TO USER'S REFERENCE DESIGN    */}
      {/* 1. Top Section: Edge-to-Edge Moving Photo Cards            */}
      {/* 2. Bottom Section: Golden Bokeh Backdrop + Atelier Badge + */}
      {/*    "Every Frame, A Legacy" + Action Buttons                */}
      {/* ========================================================= */}
      <section 
        ref={heroSectionRef}
        className="relative w-full pt-20 sm:pt-24 pb-14 sm:pb-20 overflow-hidden flex flex-col justify-between"
        style={{
          background: 'radial-gradient(ellipse at 50% 75%, #e2d2ba 0%, #cdb592 38%, #b3976f 75%, #9b7e55 100%)'
        }}
      >
        {/* Cinematic ambient video overlay with soft opacity */}
        <div className="absolute inset-0 w-full h-full overflow-hidden pointer-events-none z-0">
          <video
            ref={heroVideoRef}
            src="/rk_bg.mp4"
            autoPlay
            muted
            loop
            playsInline
            preload="auto"
            onEnded={(e) => {
              e.currentTarget.currentTime = 0;
              e.currentTarget.play().catch(() => {});
            }}
            className="w-full h-full object-cover opacity-25 mix-blend-overlay"
          >
            <source src="/rk_bg.mp4" type="video/mp4" />
          </video>
          {/* Subtle gradient wash across top to keep navbar transition pristine */}
          <div className="absolute inset-0 bg-gradient-to-b from-[#fcf9f4]/80 via-transparent to-black/20 pointer-events-none" />
        </div>

        {/* Luminous Golden Bokeh Orbs & Sparkle Particles */}
        <div className="absolute inset-0 pointer-events-none z-0 overflow-hidden">
          {/* Large soft bokeh orbs */}
          <div className="absolute top-1/4 left-[15%] w-72 h-72 rounded-full bg-[#ffeaad]/25 blur-3xl" />
          <div className="absolute bottom-12 right-[18%] w-80 h-80 rounded-full bg-[#fde08b]/30 blur-3xl" />
          <div className="absolute bottom-8 left-[35%] w-96 h-96 rounded-full bg-[#fff4cc]/35 blur-3xl" />
          <div className="absolute top-1/2 right-[8%] w-60 h-60 rounded-full bg-[#eed7a1]/25 blur-2xl" />

          {/* Medium sparkling bokeh dots */}
          <div className="absolute top-[28%] left-[8%] w-12 h-12 rounded-full bg-white/40 blur-md" />
          <div className="absolute top-[65%] left-[22%] w-16 h-16 rounded-full bg-[#fff3c4]/50 blur-lg" />
          <div className="absolute top-[48%] right-[25%] w-14 h-14 rounded-full bg-[#fff6d6]/60 blur-md" />
          <div className="absolute bottom-[20%] left-[10%] w-20 h-20 rounded-full bg-[#ffe89e]/35 blur-xl" />
          <div className="absolute bottom-[25%] right-[12%] w-24 h-24 rounded-full bg-[#ffd875]/40 blur-xl" />

          {/* Golden glint sparkles */}
          <div className="absolute top-[52%] left-[18%] w-1.5 h-1.5 rounded-full bg-white shadow-[0_0_8px_3px_rgba(255,255,255,0.8)]" />
          <div className="absolute top-[40%] right-[32%] w-2 h-2 rounded-full bg-[#fff9db] shadow-[0_0_10px_4px_rgba(255,240,180,0.8)]" />
          <div className="absolute top-[72%] left-[42%] w-1.5 h-1.5 rounded-full bg-white shadow-[0_0_8px_3px_rgba(255,255,255,0.8)]" />
          <div className="absolute top-[62%] right-[15%] w-2.5 h-2.5 rounded-full bg-[#fffae8] shadow-[0_0_12px_4px_rgba(255,250,220,0.9)]" />
          <div className="absolute bottom-[15%] right-[28%] w-1.5 h-1.5 rounded-full bg-white shadow-[0_0_8px_3px_rgba(255,255,255,0.8)]" />
          <div className="absolute bottom-[35%] left-[30%] w-2 h-2 rounded-full bg-[#fff2b2] shadow-[0_0_10px_3px_rgba(255,242,178,0.7)]" />
        </div>

        {/* ========================================================= */}
        {/* 1. TOP HALF: MOVING PHOTO CARDS (EDGE-TO-EDGE MARQUEE)   */}
        {/* ========================================================= */}
        <div 
          className="relative w-screen left-1/2 -translate-x-1/2 overflow-hidden pt-2 pb-6 z-20 select-none"
          style={{
            WebkitMaskImage: 'linear-gradient(to right, transparent 0%, black 5%, black 95%, transparent 100%)',
            maskImage: 'linear-gradient(to right, transparent 0%, black 5%, black 95%, transparent 100%)'
          }}
        >
          {/* Frosted bilateral fade vignettes */}
          <div className="absolute top-0 bottom-0 left-0 w-16 sm:w-32 md:w-44 z-30 pointer-events-none bg-gradient-to-r from-[#d9caa9]/90 via-[#d9caa9]/40 to-transparent" />
          <div className="absolute top-0 bottom-0 right-0 w-16 sm:w-32 md:w-44 z-30 pointer-events-none bg-gradient-to-l from-[#d9caa9]/90 via-[#d9caa9]/40 to-transparent" />

          {/* Smooth continuous marquee */}
          <div className="animate-marquee-ltr flex items-center gap-4 sm:gap-5 will-change-transform py-2">
            {[...heroShowcasePlates, ...heroShowcasePlates].map((plate, index) => (
              <div
                key={`${plate.id}-${index}`}
                onClick={() => handlePlateClick(plate)}
                className="relative shrink-0 w-44 sm:w-60 md:w-64 aspect-[3/4] rounded-2xl sm:rounded-3xl overflow-hidden shadow-2xl transition-all duration-500 cursor-pointer group border border-white/60 hover:scale-[1.03] hover:border-[#ffe8a3] hover:shadow-[0_20px_45px_rgba(0,0,0,0.35)]"
                title={`View ${plate.title}`}
              >
                <img
                  src={plate.imageUrl}
                  alt={plate.title}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-108"
                  loading="lazy"
                />
                
                {/* Deep bottom vignette matching the screenshot */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/25 to-transparent opacity-80 group-hover:opacity-95 transition-opacity duration-300" />

                {/* Card Title & Location */}
                <div className="absolute bottom-3 left-3 sm:bottom-3.5 sm:left-4 sm:right-4 right-3 text-left">
                  <span className="font-serif italic text-white text-xs sm:text-base font-normal block leading-tight drop-shadow-md">
                    {plate.title}
                  </span>
                  <span className="font-serif text-[10px] sm:text-xs text-[#fef08a] font-light block truncate mt-0.5 sm:mt-1 drop-shadow-sm">
                    {plate.location.split(',')[0]}
                  </span>
                </div>

                <div className="absolute top-2.5 right-2.5 sm:top-3 sm:right-3 w-6 h-6 sm:w-7 sm:h-7 rounded-full bg-black/45 backdrop-blur-md text-white flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 border border-white/25">
                  <Eye className="w-3 sm:w-3.5 h-3 sm:h-3.5" />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* ========================================================= */}
        {/* 2. BOTTOM HALF: ATELIER ACTIVE + TYPOGRAPHY + ACTIONS     */}
        {/* ========================================================= */}
        <div className="relative z-30 max-w-4xl mx-auto px-3 sm:px-8 pt-3 sm:pt-6 pb-2 text-center flex flex-col items-center">
          
          {/* Pill Badge: ATELIER ACTIVE | Accepting 24 Bespoke Nuptials in 2026 */}
          <div className="inline-flex items-center gap-1.5 sm:gap-2.5 px-3.5 sm:px-5 py-1.5 rounded-full bg-white/95 backdrop-blur-md shadow-[0_4px_16px_rgba(0,0,0,0.08)] border border-stone-200/70 mb-4 sm:mb-6 transition-transform hover:scale-[1.02] max-w-[95%]">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse shrink-0" />
            <span className="text-[9px] sm:text-[11px] font-sans font-bold uppercase tracking-[0.16em] sm:tracking-[0.2em] text-[#065f46] shrink-0">
              ATELIER ACTIVE
            </span>
            <span className="text-stone-300 text-xs font-light">|</span>
            <span className="text-[11px] sm:text-[13px] font-sans text-stone-700 font-medium tracking-tight truncate">
              Accepting 24 Bespoke Nuptials in 2026
            </span>
          </div>

          {/* Main Headline: Every Frame, A Legacy */}
          <h1 
            className="font-serif tracking-tight leading-[1.06] mb-3 sm:mb-4 text-center select-none"
            style={{ fontSize: 'clamp(2.1rem, 7vw, 4.8rem)' }}
          >
            <span className="italic font-normal text-[#2b2723]">
              Every Frame,{' '}
            </span>
            <span className="not-italic font-bold text-[#45123E]">
              A Legacy
            </span>
          </h1>

          {/* Subtitle */}
          <p className="font-serif text-xs sm:text-base md:text-lg text-[#3d3429] max-w-2xl mx-auto leading-relaxed font-normal px-4 mb-6 sm:mb-8 drop-shadow-[0_1px_1px_rgba(255,255,255,0.4)]">
            Preserving the unshed tears, quiet pheras, and unrepeatable devotion of India's most evocative celebrations through timeless medium format artistry.
          </p>

          {/* Call to Action Buttons matching screenshot */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4 w-full sm:w-auto">
            <button
              onClick={() => {
                const el = document.getElementById('curated-anthology');
                if (el) el.scrollIntoView({ behavior: 'smooth' });
              }}
              className="w-full sm:w-auto px-7 sm:px-8 py-3.5 rounded-full bg-[#3b122d] hover:bg-[#2c0b20] text-white font-sans text-xs uppercase tracking-[0.18em] font-semibold transition-all duration-300 shadow-md hover:shadow-xl active:scale-95 cursor-pointer flex items-center justify-center gap-2"
            >
              <span>EXPLORE THE COLLECTION</span>
              <span className="text-[#e8d5b7] text-sm">→</span>
            </button>

            <button
              onClick={handleOpenReserve}
              className="w-full sm:w-auto px-7 sm:px-8 py-3.5 rounded-full bg-white/95 hover:bg-white text-[#1c1c19] border border-stone-200/90 font-sans text-xs uppercase tracking-[0.16em] font-semibold transition-all duration-300 shadow-sm hover:shadow-md active:scale-95 cursor-pointer text-center"
            >
              BOOK APPOINTMENT
            </button>
          </div>

        </div>

      </section>

      {/* ========================================================= */}
      {/* 4-COLUMN GLASSMORPHIC FEATURES GRID (LIGHT THEME) */}
      {/* ========================================================= */}
      <section className="w-full px-4 sm:px-8 lg:px-12 py-14 sm:py-20 border-t border-[#e5dfd5] relative bg-white/50">
        <div className="max-w-7xl mx-auto">
          
          <div className="text-center max-w-2xl mx-auto mb-10 sm:mb-16">
            <span className="font-sans text-[10px] sm:text-[11px] uppercase tracking-[0.25em] text-[#775a19] font-bold block mb-2 sm:mb-3">
              HAUTE DISCIPLINES &amp; CRAFTSMANSHIP
            </span>
            <h2 className="font-serif italic text-2xl sm:text-4xl text-[#1c1c19] font-normal">
              Engineered with Classical Reverence
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
            {[
              {
                icon: <Camera className="w-5 h-5 sm:w-6 sm:h-6 text-[#45123E]" />,
                title: "Medium Format 100MP",
                body: "Captured on Hasselblad and Leica prime glass with authentic silver halide skin calibrations for royal nuance."
              },
              {
                icon: <Film className="w-5 h-5 sm:w-6 sm:h-6 text-[#45123E]" />,
                title: "Arri & Alexa Cinema",
                body: "Hollywood-grade anamorphic framing and bespoke orchestral score mastering that turns pheras into cinema."
              },
              {
                icon: <Flame className="w-5 h-5 sm:w-6 sm:h-6 text-[#45123E]" />,
                title: "Sacred Vedic Lore",
                body: "Deep understanding of all 16 Indian ceremonies, from auspicious Muhurats to silent, heartfelt Vidais."
              },
              {
                icon: <Layers className="w-5 h-5 sm:w-6 sm:h-6 text-[#45123E]" />,
                title: "Florentine Heirlooms",
                body: "Museum deckled cotton rag hand-bound with Italian silk habotai, 24K gold foil and century-tested archival binding."
              }
            ].map((feature, idx) => (
              <div
                key={idx}
                className="glass-lucid-card p-5 sm:p-8 rounded-2xl sm:rounded-3xl flex flex-col justify-between group cursor-default border border-white/80 shadow-md hover:shadow-xl"
              >
                <div>
                  <div className="w-11 h-11 sm:w-12 sm:h-12 rounded-xl sm:rounded-2xl bg-[#45123E]/10 border border-[#45123E]/20 flex items-center justify-center mb-4 sm:mb-6 transition-transform duration-300 group-hover:scale-110">
                    {feature.icon}
                  </div>
                  <h3 className="font-sans font-bold text-lg sm:text-xl text-[#1c1c19] mb-2 sm:mb-3 tracking-tight">
                    {feature.title}
                  </h3>
                  <p className="font-sans text-xs sm:text-sm text-[#594d3f] leading-relaxed font-normal">
                    {feature.body}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ========================================================= */}
      {/* GRAND SALON CURATED PLATES GALLERY (MASONRY & FILTER TABS) */}
      {/* ========================================================= */}
      <section id="curated-anthology" className="w-full px-4 sm:px-8 lg:px-12 py-14 sm:py-20 border-t border-[#e5dfd5]/70 relative">
        <div className="max-w-7xl mx-auto">
          
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 sm:mb-12 gap-4 sm:gap-6">
            <div>
              <div className="inline-flex items-center gap-2 mb-2 text-[#775a19]">
                <Sparkles className="w-4 h-4 text-[#a78b71]" />
                <span className="font-sans text-[10px] sm:text-[11px] uppercase tracking-[0.25em] font-bold">
                  AUTHENTIC VISUAL ANTHOLOGY
                </span>
              </div>
              <h2 className="font-serif italic text-2xl sm:text-5xl text-[#1c1c19] font-normal">
                Curated Haute Plates
              </h2>
              <p className="font-sans text-xs sm:text-sm text-[#594d3f] max-w-xl mt-1.5 sm:mt-2 font-normal">
                Every frame captured on medium format glass plate and fine 35mm stock, preserving the raw emotional essence of sacred lineage.
              </p>
            </div>

            {/* Curatorial Folio Status */}
            <div className="flex items-center gap-2.5 text-xs font-sans text-[#594d3f]">
              <span className="px-3.5 py-1.5 rounded-full glass-lucid-pill text-[#1c1c19] font-semibold text-[11px] sm:text-xs">
                {filteredPlates.length} Plates Active
              </span>
              {favoritePlates.length > 0 && (
                <span className="px-3.5 py-1.5 rounded-full bg-[#45123E] text-[#FAF5EB] font-bold shadow-xs text-[11px] sm:text-xs">
                  ♥ {favoritePlates.length} Saved in Folio
                </span>
              )}
            </div>
          </div>

          {/* Category Filter Nav Tabs - Lucid floating pill scroll */}
          <div className="flex items-center overflow-x-auto scrollbar-none pb-3 mb-8 sm:mb-10 gap-2 border-b border-stone-200/70 -mx-4 px-4 sm:mx-0 sm:px-0">
            {[
              { id: 'all', label: `I. All Works (${PLATES_DATA.length})` },
              { id: 'pheras', label: 'II. Weddings & Pheras' },
              { id: 'pre-wedding', label: 'III. Pre-Wedding Romance' },
              { id: 'family', label: 'IV. Family Traditions' },
              { id: 'events', label: 'V. Special Occasions' },
              { id: 'haldi', label: 'VI. Haldi Turmeric' },
              { id: 'sangeet', label: 'VII. Sangeet & Baaraat' },
              { id: 'vidai', label: 'VIII. The Quiet Vidai' },
              { id: 'heirloom', label: 'IX. Bridal Heirlooms' },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveFilter(tab.id)}
                className={`px-4 py-2 rounded-full font-sans text-xs tracking-wider uppercase transition-all whitespace-nowrap cursor-pointer shrink-0 ${
                  activeFilter === tab.id
                    ? 'bg-[#3b122d] text-white font-bold shadow-md'
                    : 'glass-lucid-pill text-[#594d3f] hover:text-[#1c1c19] hover:bg-white'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          {/* Grand Plates Grid */}
          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start">
            {filteredPlates.map((plate, index) => {
              const isFaved = favoritePlates.includes(plate.id);

              return (
                <React.Fragment key={plate.id}>
                  {/* Curatorial Quote Interlude */}
                  {index === 5 && (
                    <div className="md:col-span-12 py-12 px-8 sm:px-16 my-8 rounded-3xl glass-lucid border border-white/90 shadow-[0_20px_50px_rgba(69,18,62,0.06),inset_0_1px_1px_rgba(255,255,255,0.95)] flex flex-col items-center text-center">
                      <span className="text-[#a78b71] font-serif text-3xl mb-2">§</span>
                      <blockquote className="font-serif italic text-xl sm:text-2xl text-[#1c1c19] max-w-3xl leading-snug">
                        “We don't count the megapixels or stage artificial poses. We wait in the shadows for that split second when a proud father hugs his new son-in-law, when the bride wipes away a tear at her Vidai, and when two souls realize their universe has just begun.”
                      </blockquote>
                      <span className="font-sans text-[11px] uppercase tracking-[0.25em] text-[#775a19] font-bold mt-4">
                        RK Photo &amp; Movies Production Philosophy
                      </span>
                    </div>
                  )}

                  <div
                    onClick={() => handlePlateClick(plate)}
                    className={`${plate.colSpanDesktop} rounded-3xl overflow-hidden glass-lucid-card group cursor-pointer relative flex flex-col justify-between border border-white/80 shadow-md hover:shadow-2xl`}
                  >
                    {/* Plate Photograph - framed cleanly */}
                    <div className={`w-full ${plate.aspectRatio} relative overflow-hidden bg-[#FAF5EB]`}>
                      <img
                        src={plate.imageUrl}
                        alt={plate.title}
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                        loading="lazy"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-transparent to-black/20 opacity-40 group-hover:opacity-70 transition-opacity" />

                      {/* Favorite Button */}
                      <button
                        onClick={(e) => toggleFavorite(e, plate.id)}
                        className="absolute top-4 right-4 w-9 h-9 rounded-full bg-black/60 backdrop-blur-md border border-white/20 text-white hover:text-[#e8d5b7] flex items-center justify-center transition-all cursor-pointer"
                        title="Add to personal folio"
                      >
                        <Heart className={`w-4 h-4 ${isFaved ? 'fill-[#e8d5b7] text-[#e8d5b7]' : ''}`} />
                      </button>

                      {/* Expand Icon on Hover */}
                      <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
                        <div className="w-12 h-12 rounded-full bg-white/80 backdrop-blur-md border border-white text-[#1c1c19] flex items-center justify-center shadow-lg">
                          <Eye className="w-5 h-5" />
                        </div>
                      </div>
                    </div>

                    {/* Plate Metadata */}
                    <div className="p-6 bg-white">
                      <div className="flex items-center justify-between text-xs text-[#786a5a] font-sans mb-1">
                        <span>{plate.location}</span>
                        <span className="text-[#a78b71] font-medium">{plate.filmStock}</span>
                      </div>
                      <h3 className="font-serif italic text-xl font-bold text-[#1c1c19] group-hover:text-[#45123E] transition-colors">
                        {plate.title}
                      </h3>
                      <p className="font-sans text-xs text-[#594d3f] mt-2 line-clamp-2 leading-relaxed">
                        {plate.caption}
                      </p>
                    </div>
                  </div>
                </React.Fragment>
              );
            })}
          </div>

        </div>
      </section>

      {/* ========================================================= */}
      {/* REDESIGNED SACRED MONOGRAPH TIERS (LUXURY GLASS LUCID)    */}
      {/* ========================================================= */}
      <section id="monograph-tiers" className="w-full px-4 sm:px-8 lg:px-12 py-16 sm:py-28 border-t border-[#e5dfd5] relative bg-gradient-to-b from-[#fcf9f4] via-white/80 to-[#fcf9f4] overflow-hidden">
        {/* Soft Ambient Radial Light */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[900px] h-[500px] bg-gradient-to-r from-[#c5a059]/10 via-[#45123E]/6 to-transparent blur-[140px] rounded-full pointer-events-none" />

        <div className="max-w-7xl mx-auto relative z-10">
          
          <div className="text-center max-w-3xl mx-auto mb-12 sm:mb-18">
            <div className="inline-flex items-center gap-2 mb-3 px-4 py-1.5 rounded-full bg-white/80 backdrop-blur-md border border-[#ded5c7] shadow-2xs">
              <span className="text-[#a78b71]">✦</span>
              <span className="font-sans text-[10px] sm:text-[11px] uppercase tracking-[0.25em] text-[#775a19] font-bold">
                ROYAL MATRIMONIAL EDITIONS • BESPOKE COMMISSIONS
              </span>
            </div>
            
            <h2 className="font-serif italic text-3xl sm:text-5xl lg:text-6xl text-[#1c1c19] font-normal tracking-tight">
              Sacred Monograph Tiers
            </h2>
            
            <p className="font-sans text-xs sm:text-sm md:text-base text-[#594d3f] mt-3 sm:mt-4 px-2 leading-relaxed max-w-2xl mx-auto">
              Strictly limited to twenty-four matrimonial celebrations per year to preserve supreme artistic devotion. Hand-bound in Florence, Italy, with archival pigment inks tested to endure for centuries.
            </p>

            {/* Responsive Duration Switcher */}
            <div className="mt-7 sm:mt-9 inline-flex flex-col sm:flex-row items-stretch sm:items-center p-1.5 rounded-2xl sm:rounded-full bg-white/90 backdrop-blur-xl border border-[#ded3c2] shadow-sm w-full sm:w-auto max-w-xs sm:max-w-none mx-auto gap-1 sm:gap-0">
              <button
                onClick={() => setPricingPlan('single')}
                className={`px-5 py-2.5 rounded-xl sm:rounded-full font-sans text-xs tracking-wider uppercase transition-all duration-300 cursor-pointer text-center ${
                  pricingPlan === 'single'
                    ? 'bg-[#45123E] text-white font-bold shadow-md'
                    : 'text-[#594d3f] hover:text-[#1c1c19] hover:bg-black/5'
                }`}
              >
                Intimate Nuptials (1–2 Days)
              </button>
              <button
                onClick={() => setPricingPlan('multiday')}
                className={`px-5 py-2.5 rounded-xl sm:rounded-full font-sans text-xs tracking-wider uppercase transition-all duration-300 cursor-pointer text-center ${
                  pricingPlan === 'multiday'
                    ? 'bg-[#45123E] text-white font-bold shadow-md'
                    : 'text-[#594d3f] hover:text-[#1c1c19] hover:bg-black/5'
                }`}
              >
                Royal Festivities (3–5 Days)
              </button>
            </div>
          </div>

          {/* Three-Tiered Layout with Glass Lucid Cards */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 sm:gap-8 items-stretch">
            {INVESTMENT_TIERS.map((tier, idx) => {
              const isCenterPro = tier.isPatronPreferred || idx === 1;

              return (
                <div
                  key={tier.id}
                  className={`relative rounded-3xl p-6 sm:p-10 flex flex-col justify-between transition-all duration-500 backdrop-blur-2xl ${
                    isCenterPro
                      ? 'bg-gradient-to-b from-white/95 via-[#FAF5EB]/90 to-white/95 border-2 border-[#45123E] shadow-2xl ring-4 ring-[#45123E]/10 lg:-translate-y-4'
                      : 'glass-lucid-card bg-white/85 border border-white/90 hover:border-[#a78b71] hover:bg-white/95'
                  }`}
                >
                  {/* Top-Centered Sovereign Badge */}
                  {isCenterPro && (
                    <div className="absolute -top-4 left-1/2 -translate-x-1/2 px-4 py-1.5 rounded-full bg-[#45123E] text-white font-sans text-[9px] sm:text-[10px] font-bold uppercase tracking-[0.22em] shadow-lg flex items-center gap-1.5 whitespace-nowrap border border-[#e8d5b7]/40">
                      <Sparkles className="w-3 h-3 text-[#e8d5b7]" />
                      <span>Patron Preferred • Sovereign Standard</span>
                    </div>
                  )}

                  <div>
                    {/* Header */}
                    <div className="mb-6 pb-5 border-b border-[#ded5c7]/60">
                      <div className="flex items-center justify-between mb-1.5">
                        <span className="font-sans text-[10px] uppercase tracking-[0.25em] text-[#775a19] font-bold">
                          {tier.collectionNumber}
                        </span>
                        {isCenterPro && (
                          <span className="font-sans text-[10px] uppercase tracking-wider text-emerald-800 bg-emerald-100/80 px-2.5 py-0.5 rounded-full font-semibold">
                            Full Access
                          </span>
                        )}
                      </div>
                      
                      <h3 className="font-serif italic text-2xl sm:text-3xl lg:text-4xl font-bold text-[#1c1c19] tracking-tight">
                        {tier.name} <span className="text-[#a78b71] not-italic">{tier.nameHighlight}</span>
                      </h3>
                      
                      <p className="font-sans text-xs text-[#6b5d4e] mt-1.5 leading-relaxed font-medium">
                        {tier.subtitle}
                      </p>
                    </div>

                    {/* Price display with glass styling */}
                    <div className="my-5 pb-5 border-b border-[#ded5c7]/60">
                      <div className="flex items-baseline gap-2">
                        <span className="font-sans font-extrabold text-3xl sm:text-5xl text-[#1c1c19] tracking-tight">
                          {getTierPriceDisplay(tier.id)}
                        </span>
                        <span className="font-sans text-xs text-[#786a5a]">/ celebration</span>
                      </div>
                      
                      <div className="mt-2 flex items-center gap-2">
                        <span className="w-2 h-2 rounded-full bg-[#a78b71] inline-block" />
                        <span className="font-sans text-xs text-[#775a19] font-semibold">
                          {pricingPlan === 'single' ? 'Intimate Ceremonies (1–2 Days)' : tier.duration}
                        </span>
                      </div>
                    </div>

                    {/* Features list with polished luxury checkmark badges */}
                    <ul className="space-y-3.5 my-6">
                      {tier.features.map((feat, fIdx) => (
                        <li key={fIdx} className="flex items-start gap-3 text-xs font-sans">
                          <div className={`w-4 h-4 rounded-full flex items-center justify-center shrink-0 mt-0.5 ${
                            isCenterPro
                              ? 'bg-[#45123E] text-white shadow-xs'
                              : 'bg-[#45123E]/10 text-[#45123E] border border-[#45123E]/20'
                          }`}>
                            <Check className="w-2.5 h-2.5 stroke-[3]" />
                          </div>
                          <div className="leading-relaxed">
                            <span className="text-[#1c1c19] font-bold">{feat.label}: </span>
                            <span className="text-[#594d3f]">{feat.detail}</span>
                          </div>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Dual Action Buttons */}
                  <div className="pt-6 border-t border-[#ded5c7]/60 space-y-2.5">
                    <button
                      onClick={() => onOpenWhatsApp(`Pranam! I would like to inquire about reserving ${tier.name} ${tier.nameHighlight} collection for our family celebration.`)}
                      className={`w-full py-3.5 sm:py-4 rounded-full font-sans text-xs uppercase tracking-[0.18em] font-bold transition-all shadow-md active:scale-95 cursor-pointer flex items-center justify-center gap-2 ${
                        isCenterPro
                          ? 'bg-[#45123E] text-white hover:bg-[#340C2E] shadow-xl hover:shadow-2xl'
                          : 'bg-[#FAF5EB] hover:bg-[#45123E] text-[#1c1c19] hover:text-white border border-[#ded5c7]'
                      }`}
                    >
                      <MessageCircle className="w-4 h-4 text-[#e8d5b7]" />
                      <span>{tier.ctaText}</span>
                    </button>

                    <button
                      onClick={handleOpenReserve}
                      className="w-full py-2.5 text-center text-[11px] font-sans font-semibold tracking-wider uppercase text-[#775a19] hover:text-[#45123E] transition-colors cursor-pointer"
                    >
                      Schedule In-Person Consultation →
                    </button>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Guarantee / Archival Integrity Seal */}
          <div className="mt-12 sm:mt-16 text-center max-w-xl mx-auto p-4 sm:p-5 rounded-2xl bg-white/70 backdrop-blur-md border border-[#ded5c7] text-xs text-[#594d3f]">
            <p className="flex items-center justify-center gap-2 font-medium text-[#1c1c19]">
              <span className="w-2 h-2 rounded-full bg-emerald-500" />
              <span>All monographs include 10-Year Cloud Redundancy &amp; Physical Master Negatives</span>
            </p>
          </div>

        </div>
      </section>

      {/* ========================================================= */}
      {/* TEAM SECTION (TWO-COLUMN WITH 4:5 GRAYSCALE TO COLOR) */}
      {/* ========================================================= */}
      <section className="w-full px-4 sm:px-8 lg:px-12 py-14 sm:py-24 border-t border-[#e5dfd5] relative">
        <div className="max-w-7xl mx-auto">
          
          <div className="text-center max-w-2xl mx-auto mb-10 sm:mb-16">
            <span className="font-sans text-[10px] sm:text-[11px] uppercase tracking-[0.25em] text-[#775a19] font-bold block mb-2 sm:mb-3">
              THE ARTISAN MASTERS
            </span>
            <h2 className="font-serif italic text-2xl sm:text-5xl text-[#1c1c19] font-normal">
              Guardians of Matrimonial Legacy
            </h2>
            <p className="font-sans text-xs sm:text-sm text-[#594d3f] mt-2 px-2">
              Thirty-five years of collective devotion to the visual heritage of India's most storied dynasties.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8 lg:gap-12">
            
            {/* Team Member 1 */}
            <div className="glass-card bg-white rounded-2xl sm:rounded-3xl p-5 sm:p-8 flex flex-col justify-between group border border-[#ded5c7]">
              <div className="w-full aspect-[4/5] rounded-xl sm:rounded-2xl overflow-hidden bg-[#FAF5EB] relative">
                <img
                  src={PLATES_DATA[0].imageUrl}
                  alt="Radhika & Karan"
                  className="w-full h-full object-cover grayscale transition-all duration-700 group-hover:grayscale-0 group-hover:scale-105"
                  loading="lazy"
                />
              </div>

              <div className="mt-5 sm:mt-6">
                <span className="font-sans text-[10px] uppercase tracking-[0.3em] text-[#775a19] font-bold block mb-1">
                  FOUNDER &amp; PRINCIPAL CURATOR
                </span>
                <h3 className="font-serif italic text-xl sm:text-3xl font-bold text-[#1c1c19]">
                  Radhika &amp; Karan
                </h3>
                <p className="font-sans text-xs sm:text-sm text-[#594d3f] mt-2.5 sm:mt-3 leading-relaxed">
                  Educated in fine arts and archival preservation, Radhika directs all emotional choreography and heirloom layout. Karan leads medium-format film development and rare hand-pulled platinum prints.
                </p>
              </div>
            </div>

            {/* Team Member 2 */}
            <div className="glass-card bg-white rounded-2xl sm:rounded-3xl p-5 sm:p-8 flex flex-col justify-between group border border-[#ded5c7]">
              <div className="w-full aspect-[4/5] rounded-xl sm:rounded-2xl overflow-hidden bg-[#FAF5EB] relative">
                <img
                  src={PLATES_DATA[2].imageUrl}
                  alt="Senior Cinématographe Guild"
                  className="w-full h-full object-cover grayscale transition-all duration-700 group-hover:grayscale-0 group-hover:scale-105"
                  loading="lazy"
                />
              </div>

              <div className="mt-5 sm:mt-6">
                <span className="font-sans text-[10px] uppercase tracking-[0.3em] text-[#775a19] font-bold block mb-1">
                  CHIEF CINEMATOGRAPHER &amp; COLORIST
                </span>
                <h3 className="font-serif italic text-xl sm:text-3xl font-bold text-[#1c1c19]">
                  Artisan Stills &amp; Alexa Guild
                </h3>
                <p className="font-sans text-xs sm:text-sm text-[#594d3f] mt-2.5 sm:mt-3 leading-relaxed">
                  Masters of natural illumination and synchronized multi-camera direction, ensuring no subtle gaze or unshed tear escapes cinematic permanence during the Saptapadi and Vidai.
                </p>
              </div>
            </div>

          </div>

        </div>
      </section>

      {/* ========================================================= */}
      {/* AUTHENTIC STUDIO GALLERY & REAL CEREMONIES (ROHINI SECTOR 23) */}
      {/* ========================================================= */}
      <section className="w-full px-4 sm:px-8 lg:px-12 py-14 sm:py-20 border-t border-[#e5dfd5] relative bg-white/50">
        <div className="max-w-7xl mx-auto">
          
          {uploadSuccessMessage && (
            <div className="mb-6 sm:mb-8 p-3.5 sm:p-4 rounded-xl sm:rounded-2xl bg-emerald-50 border border-emerald-300 text-emerald-800 flex items-center justify-between shadow-xs">
              <div className="flex items-center gap-2.5 sm:gap-3">
                <CheckCircle className="w-5 h-5 text-emerald-600 shrink-0" />
                <span className="font-sans text-xs font-medium">
                  {uploadSuccessMessage}
                </span>
              </div>
              <button onClick={() => setUploadSuccessMessage(null)} className="text-emerald-700 hover:text-emerald-900 p-1">
                <X className="w-4 h-4" />
              </button>
            </div>
          )}

          <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 sm:mb-12 gap-4 sm:gap-6">
            <div>
              <div className="inline-flex items-center gap-2 mb-2 text-[#775a19]">
                <ImageIcon className="w-4 h-4 text-[#a78b71]" />
                <span className="font-sans text-[10px] sm:text-[11px] uppercase tracking-[0.25em] font-bold">
                  AUTHENTIC PHOTO GALLERY • ROHINI SECTOR 23
                </span>
              </div>
              <h2 className="font-serif italic text-2xl sm:text-4xl text-[#1c1c19] font-normal">
                Real Ceremonies &amp; Studio Artifacts
              </h2>
              <p className="font-sans text-xs sm:text-sm text-[#594d3f] max-w-xl mt-1.5 font-normal">
                Glimpse into authentic bridal sittings, ancestral restorations, and family milestones captured by RK Photo Studio across Delhi NCR.
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-2.5 sm:gap-3">
              <button
                onClick={() => setIsUploadModalOpen(true)}
                className="flex-1 sm:flex-none px-4 sm:px-5 py-2.5 rounded-full bg-[#45123E] text-white font-sans text-xs uppercase tracking-wider font-bold hover:bg-[#340C2E] transition-all flex items-center justify-center gap-2 cursor-pointer shadow-md text-center"
              >
                <ImagePlus className="w-4 h-4 text-[#e8d5b7]" />
                <span>Upload Photos</span>
              </button>

              {galleryDisplayCount < allGalleryPhotos.length ? (
                <button
                  onClick={() => setGalleryDisplayCount(prev => Math.min(prev + 12, allGalleryPhotos.length))}
                  className="flex-1 sm:flex-none px-4 sm:px-5 py-2.5 rounded-full bg-white text-[#1c1c19] hover:bg-[#FAF5EB] border border-[#ded5c7] font-sans text-xs uppercase tracking-wider transition-colors cursor-pointer shadow-2xs text-center whitespace-nowrap"
                >
                  Load More ({allGalleryPhotos.length - galleryDisplayCount})
                </button>
              ) : allGalleryPhotos.length > 12 ? (
                <button
                  onClick={() => setGalleryDisplayCount(12)}
                  className="px-4 sm:px-5 py-2.5 rounded-full bg-white text-[#1c1c19] border border-[#ded5c7] font-sans text-xs uppercase tracking-wider transition-colors cursor-pointer"
                >
                  Show Less
                </button>
              ) : null}
            </div>
          </div>

          {/* Photo Gallery Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-2.5 sm:gap-4">
            {allGalleryPhotos.slice(0, galleryDisplayCount).map((item) => (
              <div
                key={item.id}
                onClick={() => setSelectedGalleryPhoto(item.url)}
                className="group relative aspect-square rounded-2xl overflow-hidden glass-card cursor-pointer border border-[#ded5c7] hover:border-[#45123E] transition-all duration-300 shadow-2xs"
              >
                <img
                  src={item.url}
                  alt="Studio capture"
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-108"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                  <Eye className="w-5 h-5 text-white" />
                </div>

                {item.isUserUpload && (
                  <button
                    onClick={(e) => handleDeleteUploadedPhoto(e, item.id)}
                    className="absolute top-2 right-2 p-1.5 rounded-full bg-black/70 text-red-400 hover:text-red-300 transition-colors z-10"
                    title="Delete uploaded photo"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                )}
              </div>
            ))}
          </div>

        </div>
      </section>



      {/* ========================================================= */}
      {/* STUDIO JOURNAL & WEDDING STORIES */}
      {/* ========================================================= */}
      <section className="w-full px-4 sm:px-8 lg:px-12 py-14 sm:py-20 border-t border-[#e5dfd5] relative bg-white/50">
        <div className="max-w-7xl mx-auto">
          
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 sm:mb-12 gap-4 sm:gap-6">
            <div>
              <div className="inline-flex items-center gap-2 mb-2 text-[#775a19]">
                <BookOpen className="w-4 h-4 text-[#a78b71]" />
                <span className="font-sans text-[10px] sm:text-[11px] uppercase tracking-[0.25em] font-bold">
                  STUDIO ARCHIVE • JOURNAL &amp; PHILOSOPHIES
                </span>
              </div>
              <h2 className="font-serif italic text-2xl sm:text-4xl text-[#1c1c19] font-normal">
                Wedding Stories &amp; Articles
              </h2>
            </div>
            
            <a
              href="https://rk-photo-401657.grexa.site"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-xs font-sans uppercase tracking-widest text-[#45123E] hover:underline font-bold transition-colors"
            >
              <span>Visit Official Site</span>
              <ExternalLink className="w-3.5 h-3.5 text-[#a78b71]" />
            </a>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5 sm:gap-6">
            {STUDIO_POSTS.map((post) => (
              <div
                key={post.id}
                className="glass-card bg-white rounded-2xl sm:rounded-3xl overflow-hidden flex flex-col justify-between group border border-[#ded5c7]"
              >
                <div>
                  <div className="w-full h-44 sm:h-48 overflow-hidden bg-[#FAF5EB] relative">
                    <img
                      src={post.imageUrl}
                      alt={post.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      loading="lazy"
                    />
                    <div className="absolute top-3 left-3 bg-white/90 backdrop-blur-md text-[#1c1c19] text-[10px] font-sans px-2.5 py-1 rounded-full font-bold border border-[#ded5c7]">
                      {post.date}
                    </div>
                  </div>

                  <div className="p-5 sm:p-6">
                    <h3 className="font-serif italic text-base sm:text-lg font-bold text-[#1c1c19] group-hover:text-[#45123E] transition-colors leading-snug line-clamp-2">
                      {post.title}
                    </h3>
                    <p className="font-sans text-xs text-[#594d3f] leading-relaxed mt-2 sm:mt-2.5 line-clamp-3">
                      {post.excerpt}
                    </p>
                  </div>
                </div>

                <div className="p-5 sm:p-6 pt-0">
                  <button
                    onClick={() => setSelectedPost(post)}
                    className="w-full py-2.5 rounded-full bg-[#FAF5EB] hover:bg-[#45123E] text-[#45123E] hover:text-white border border-[#ded5c7] hover:border-[#45123E] font-sans text-xs uppercase tracking-wider font-bold transition-all flex items-center justify-center gap-1.5 cursor-pointer text-center"
                  >
                    <span>Read Full Post</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* ========================================================= */}
      {/* 9. GOOGLE MAPS AT THE END OF THE LANDING PAGE             */}
      {/* ========================================================= */}
      <section className="w-full px-4 sm:px-6 lg:px-12 py-14 sm:py-20 border-t border-[#e5dfd5] bg-[#FAF5EB]">
        <div className="max-w-7xl mx-auto">
          
          <div className="text-center max-w-2xl mx-auto mb-8 sm:mb-10">
            <span className="font-sans text-[10px] sm:text-[11px] uppercase tracking-[0.25em] text-[#775a19] font-bold block mb-1.5 sm:mb-2">
              LOCATE OUR STUDIO
            </span>
            <h2 className="font-serif italic text-2xl sm:text-4xl text-[#1c1c19] font-normal">
              Visit Us in Rohini, Delhi
            </h2>
            <p className="font-sans text-xs sm:text-sm text-[#594d3f] mt-1.5 sm:mt-2 px-2">
              Sit with us over warm tea, browse archival leather monographs in person, and discuss your family's upcoming celebration dates.
            </p>
          </div>

          <div className="glass-card bg-white rounded-2xl sm:rounded-3xl overflow-hidden border border-[#ded5c7] shadow-xl p-2.5 sm:p-3">
            {/* Embedded Interactive Map */}
            <div className="relative w-full h-[280px] sm:h-[440px] rounded-xl sm:rounded-2xl overflow-hidden bg-[#e8e2d8]">
              <iframe
                title="RK Photo Studio Location Map"
                src="https://maps.google.com/maps?q=RK+Photo+Studio+Rohini+Sector+23+Delhi+110085&t=&z=15&ie=UTF8&iwloc=&output=embed"
                className="w-full h-full border-0 filter saturate-95"
                loading="lazy"
                allowFullScreen
              />

              {/* Minimal floating locator tag */}
              <div className="absolute top-3 left-3 sm:top-4 sm:left-4 bg-white/95 backdrop-blur-md px-3 py-1.5 rounded-full border border-[#ded5c7] shadow-md flex items-center gap-2 max-w-[90%]">
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 shrink-0" />
                <span className="font-sans text-[11px] sm:text-xs font-semibold text-[#1c1c19] truncate">
                  RK Photo Studio • Rohini Sector 23
                </span>
              </div>
            </div>

            {/* Direct Directions & Details Action Bar */}
            <div className="p-4 sm:p-6 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
              <div className="space-y-1.5">
                <div className="flex items-center gap-2">
                  <MapPin className="w-4 h-4 text-[#45123E] shrink-0" />
                  <span className="font-serif font-bold text-base text-[#1c1c19]">
                    RK Photo &amp; Movies Production
                  </span>
                </div>
                <p className="font-sans text-xs text-[#594d3f] leading-relaxed">
                  Opposite State Bank of India (SBI), Pooth Kalan, Rohini Sector 23, Delhi – 110085
                </p>
                <div className="flex flex-wrap items-center gap-3 sm:gap-4 text-[11px] font-sans text-[#786a5a] pt-1">
                  <span className="flex items-center gap-1">
                    <Clock className="w-3 h-3 text-[#a78b71] shrink-0" />
                    Mon–Sun: 9:00 AM – 9:00 PM
                  </span>
                  <span className="flex items-center gap-1">
                    <Phone className="w-3 h-3 text-[#45123E] shrink-0" />
                    <a href="tel:+919212812625" className="hover:underline font-semibold">+91 92128 12625</a>
                  </span>
                </div>

                {/* Verified Social Media Channels */}
                <div className="flex flex-wrap items-center gap-2 pt-1.5">
                  <a
                    href="https://www.youtube.com/@rkphotostudiorohinisector-23"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#ff0000]/10 text-[#cc0000] border border-[#ff0000]/25 hover:bg-[#ff0000] hover:text-white transition-all text-[11px] font-sans font-medium"
                    title="Watch Wedding Films on YouTube"
                  >
                    <Youtube className="w-3 h-3" />
                    <span>YouTube Channel</span>
                  </a>

                  <a
                    href="https://www.facebook.com/rkphotostudiorohinisector23/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#1877F2]/10 text-[#1877F2] border border-[#1877F2]/25 hover:bg-[#1877F2] hover:text-white transition-all text-[11px] font-sans font-medium"
                    title="Connect on Facebook"
                  >
                    <Facebook className="w-3 h-3" />
                    <span>Facebook</span>
                  </a>

                  <a
                    href="https://www.instagram.com/rkphotostudio/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#E4405F]/10 text-[#E4405F] border border-[#E4405F]/25 hover:bg-[#E4405F] hover:text-white transition-all text-[11px] font-sans font-medium"
                    title="Browse Instagram Archive"
                  >
                    <Instagram className="w-3 h-3" />
                    <span>Instagram</span>
                  </a>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2.5 w-full md:w-auto">
                <a
                  href="https://share.google/XGXzmI1VT65XaGW7H"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2 px-5 py-3 rounded-full bg-[#45123E] hover:bg-[#340C2E] text-white font-sans text-xs uppercase tracking-wider font-semibold transition-all shadow-md shrink-0 cursor-pointer text-center w-full sm:w-auto"
                >
                  <Navigation className="w-3.5 h-3.5 text-[#e8d5b7]" />
                  <span>Get Directions on Google Maps</span>
                  <ExternalLink className="w-3 h-3 opacity-80" />
                </a>

                {onOpenAppointmentModal && (
                  <button
                    onClick={onOpenAppointmentModal}
                    className="px-5 py-3 rounded-full bg-white hover:bg-[#FAF5EB] text-[#45123E] border border-[#ded5c7] hover:border-[#45123E] font-sans text-xs uppercase tracking-wider font-semibold transition-all cursor-pointer text-center w-full sm:w-auto"
                  >
                    Schedule In-Person Visit
                  </button>
                )}
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* ========================================================= */}
      {/* LIGHTBOX PLATE MODAL */}
      {/* ========================================================= */}
      {lightboxPlate && (
        <div 
          onClick={() => setLightboxPlate(null)}
          className="fixed inset-0 z-50 bg-black/85 backdrop-blur-md flex items-center justify-center p-3 sm:p-6"
        >
          <div 
            onClick={(e) => e.stopPropagation()}
            className="relative w-full max-w-5xl max-h-[92vh] bg-white rounded-2xl sm:rounded-3xl overflow-y-auto md:overflow-hidden border border-[#ded5c7] flex flex-col md:flex-row shadow-2xl animate-fadeIn"
          >
            <button
              onClick={() => setLightboxPlate(null)}
              className="absolute top-3 right-3 sm:top-4 sm:right-4 z-20 w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-black/70 text-white hover:text-[#e8d5b7] flex items-center justify-center transition-colors border border-white/20 cursor-pointer shadow-md"
              aria-label="Close plate view"
            >
              <X className="w-4 h-4 sm:w-5 sm:h-5" />
            </button>

            {/* Photo Column - shown gracefully without vertical squishing on phone screens */}
            <div className="w-full md:w-3/5 bg-[#14100c] flex items-center justify-center relative overflow-hidden p-2.5 sm:p-3 min-h-[220px] max-h-[42vh] md:max-h-[75vh]">
              <img
                src={lightboxPlate.imageUrl}
                alt={lightboxPlate.title}
                className="max-h-[38vh] md:max-h-[75vh] max-w-full object-contain rounded-xl shadow-2xl"
              />
            </div>

            {/* Content Column */}
            <div className="w-full md:w-2/5 p-5 sm:p-8 flex flex-col justify-between overflow-y-auto bg-[#FAF5EB]">
              <div>
                <span className="font-sans text-[10px] uppercase tracking-[0.25em] text-[#775a19] font-bold block mb-1">
                  CURATED FINE ART MONOGRAPH
                </span>
                <h3 className="font-serif italic text-xl sm:text-2xl font-bold text-[#1c1c19] mb-1.5 sm:mb-2">
                  {lightboxPlate.title}
                </h3>
                <p className="font-sans text-xs text-[#775a19] mb-3.5 sm:mb-4 font-medium">
                  {lightboxPlate.couple} • {lightboxPlate.location}
                </p>

                <div className="p-3.5 sm:p-4 rounded-xl sm:rounded-2xl bg-white border border-[#ded5c7] mb-3.5 sm:mb-4 text-xs font-serif text-[#3e3226] leading-relaxed">
                  <span className="text-[#45123E] font-bold block mb-1 font-sans text-[10px] sm:text-[11px] uppercase tracking-wider">
                    Emotional Context:
                  </span>
                  {lightboxPlate.emotionalStory}
                </div>

                <div className="space-y-1.5 text-xs font-sans text-[#594d3f]">
                  <div className="flex justify-between border-b border-[#e5ded4] py-1">
                    <span>Master Glass:</span>
                    <span className="text-[#1c1c19] font-semibold">{lightboxPlate.gear}</span>
                  </div>
                  <div className="flex justify-between border-b border-[#e5ded4] py-1">
                    <span>Film Stock:</span>
                    <span className="text-[#1c1c19] font-semibold">{lightboxPlate.filmStock}</span>
                  </div>
                </div>
              </div>

              <div className="pt-4 sm:pt-6 border-t border-[#ded5c7] flex items-center gap-2.5 sm:gap-3 mt-4">
                <button
                  onClick={() => onOpenWhatsApp(`Pranam! I would like to inquire regarding photographic plate: ${lightboxPlate.title}.`)}
                  className="flex-1 py-3 rounded-full bg-[#45123E] text-white font-sans text-xs uppercase tracking-widest font-bold hover:bg-[#340C2E] transition-all flex items-center justify-center gap-2 cursor-pointer shadow-md text-center"
                >
                  <MessageCircle className="w-4 h-4" />
                  <span>Enquire Plate</span>
                </button>
                <button
                  onClick={(e) => toggleFavorite(e, lightboxPlate.id)}
                  className={`p-3 rounded-full border border-[#ded5c7] transition-all cursor-pointer ${
                    favoritePlates.includes(lightboxPlate.id) ? 'bg-[#45123E] text-white' : 'bg-white text-[#1c1c19] hover:border-[#45123E]'
                  }`}
                  title="Favorite"
                >
                  <Heart className="w-4 h-4 sm:w-5 sm:h-5 fill-current" />
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ========================================================= */}
      {/* GALLERY PHOTO FULL PREVIEW MODAL */}
      {/* ========================================================= */}
      {selectedGalleryPhoto && (
        <div 
          onClick={() => setSelectedGalleryPhoto(null)}
          className="fixed inset-0 z-50 bg-black/90 backdrop-blur-md flex items-center justify-center p-3 sm:p-4"
        >
          <div className="relative max-w-4xl max-h-[90vh] flex items-center justify-center">
            <button
              onClick={() => setSelectedGalleryPhoto(null)}
              className="absolute -top-11 right-0 text-white hover:text-[#e8d5b7] p-2 cursor-pointer"
            >
              <X className="w-6 h-6" />
            </button>
            <img
              src={selectedGalleryPhoto}
              alt="Gallery Preview"
              className="max-h-[82vh] max-w-full rounded-xl sm:rounded-2xl border border-white/20 object-contain shadow-2xl"
            />
          </div>
        </div>
      )}

      {/* ========================================================= */}
      {/* USER PHOTO UPLOAD MODAL */}
      {/* ========================================================= */}
      {isUploadModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-3 sm:p-4">
          <div className="relative w-full max-w-lg bg-[#FAF5EB] rounded-2xl sm:rounded-3xl p-5 sm:p-8 border border-[#ded5c7] shadow-2xl max-h-[92vh] overflow-y-auto">
            <div className="flex items-center justify-between pb-3.5 sm:pb-4 border-b border-[#ded5c7] mb-5 sm:mb-6">
              <div>
                <h4 className="font-serif italic text-lg sm:text-xl font-bold text-[#1c1c19]">
                  Add to Studio Gallery
                </h4>
                <p className="font-sans text-xs text-[#594d3f]">
                  Contribute your wedding moments to RK Studios digital folio
                </p>
              </div>
              <button
                onClick={() => setIsUploadModalOpen(false)}
                className="text-[#786a5a] hover:text-[#1c1c19] p-1.5 cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Drag & Drop Area */}
            <div
              onClick={() => fileInputRef.current?.click()}
              onDragOver={(e) => { e.preventDefault(); setIsDragging(true); }}
              onDragLeave={() => setIsDragging(false)}
              onDrop={(e) => {
                e.preventDefault();
                setIsDragging(false);
                if (e.dataTransfer.files) handleFilesSelected(e.dataTransfer.files);
              }}
              className={`border-2 border-dashed rounded-xl sm:rounded-2xl p-5 sm:p-6 text-center cursor-pointer transition-all ${
                isDragging ? 'border-[#45123E] bg-white' : 'border-[#ded5c7] hover:border-[#45123E] bg-white/70'
              }`}
            >
              <Upload className="w-7 h-7 sm:w-8 sm:h-8 text-[#45123E] mx-auto mb-2" />
              <p className="font-sans text-xs text-[#1c1c19] font-bold">
                Click to browse or drag &amp; drop ceremony photos
              </p>
              <p className="font-sans text-[10px] text-[#786a5a] mt-1">
                JPEG, PNG, WebP up to 25MB each
              </p>
              <input
                ref={fileInputRef}
                type="file"
                multiple
                accept="image/*"
                onChange={(e) => e.target.files && handleFilesSelected(e.target.files)}
                className="hidden"
              />
            </div>

            {/* Selected Previews */}
            {selectedUploadFiles.length > 0 && (
              <div className="mt-3.5 sm:mt-4 flex gap-2 overflow-x-auto py-2">
                {selectedUploadFiles.map((item, idx) => (
                  <div key={idx} className="w-14 h-14 sm:w-16 sm:h-16 rounded-xl overflow-hidden relative shrink-0 border border-[#ded5c7]">
                    <img src={item.preview} alt="preview" className="w-full h-full object-cover" />
                  </div>
                ))}
              </div>
            )}

            {/* Caption Input */}
            <div className="mt-4">
              <label className="block text-[10px] sm:text-[11px] font-sans uppercase tracking-widest text-[#775a19] font-bold mb-1.5">
                Ceremony Caption (Optional)
              </label>
              <input
                type="text"
                value={uploadCaption}
                onChange={(e) => setUploadCaption(e.target.value)}
                placeholder="e.g. Sangeet evening at Rohini..."
                className="w-full bg-white border border-[#ded5c7] rounded-xl px-3.5 sm:px-4 py-2.5 text-xs text-[#1c1c19] placeholder-gray-400 focus:outline-none focus:border-[#45123E]"
              />
            </div>

            {/* Buttons */}
            <div className="mt-5 sm:mt-6 flex items-center justify-end gap-2.5 sm:gap-3">
              <button
                onClick={() => setIsUploadModalOpen(false)}
                className="px-4 sm:px-5 py-2.5 rounded-full text-xs font-sans text-[#786a5a] hover:text-[#1c1c19] cursor-pointer"
              >
                Cancel
              </button>
              <button
                onClick={handleConfirmUpload}
                disabled={selectedUploadFiles.length === 0}
                className="px-5 sm:px-6 py-2.5 rounded-full bg-[#45123E] text-white font-sans text-xs font-bold uppercase tracking-wider hover:bg-[#340C2E] disabled:opacity-40 transition-all cursor-pointer shadow-md"
              >
                Upload ({selectedUploadFiles.length})
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ========================================================= */}
      {/* STUDIO POST ARTICLE MODAL */}
      {/* ========================================================= */}
      {selectedPost && (
        <div 
          onClick={() => setSelectedPost(null)}
          className="fixed inset-0 z-50 bg-black/85 backdrop-blur-md flex items-center justify-center p-3 sm:p-6"
        >
          <div 
            onClick={(e) => e.stopPropagation()}
            className="relative w-full max-w-2xl max-h-[92vh] bg-white rounded-2xl sm:rounded-3xl overflow-y-auto p-5 sm:p-8 border border-[#ded5c7] shadow-2xl animate-fadeIn"
          >
            <button
              onClick={() => setSelectedPost(null)}
              className="absolute top-3.5 right-3.5 sm:top-4 sm:right-4 w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-[#FAF5EB] text-[#1c1c19] flex items-center justify-center hover:bg-[#45123E] hover:text-white transition-colors cursor-pointer"
            >
              <X className="w-4 h-4 sm:w-5 sm:h-5" />
            </button>

            <img
              src={selectedPost.imageUrl}
              alt={selectedPost.title}
              className="w-full h-44 sm:h-56 object-cover rounded-xl sm:rounded-2xl mb-5 sm:mb-6 shadow-sm"
            />

            <span className="text-[10px] font-sans uppercase tracking-[0.2em] text-[#775a19] font-bold">
              {selectedPost.date}
            </span>
            <h3 className="font-serif italic text-xl sm:text-2xl font-bold text-[#1c1c19] mt-1 mb-3 sm:mb-4 leading-snug">
              {selectedPost.title}
            </h3>
            <p className="font-serif text-xs sm:text-sm text-[#4e4235] leading-relaxed mb-5 sm:mb-6">
              {selectedPost.excerpt}
            </p>

            <div className="space-y-2 pt-4 border-t border-[#ded5c7]">
              <span className="font-sans text-xs text-[#45123E] font-bold uppercase tracking-wider block mb-2">
                Key Curatorial Highlights:
              </span>
              {selectedPost.highlights.map((h, i) => (
                <div key={i} className="flex items-center gap-2 text-xs font-sans text-[#594d3f]">
                  <CheckCircle className="w-3.5 h-3.5 text-[#a78b71] shrink-0" />
                  <span>{h}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

    </div>
  );
};
