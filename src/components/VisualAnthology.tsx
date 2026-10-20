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
  Star, 
  CheckCircle, 
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
  Pause
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

  // Curated 8 best images for the luxury hero loop
  const heroShowcasePlates = [
    PLATES_DATA[0], // Plate 01: The Crimson Veil at Pichola (/images/1.jpg)
    PLATES_DATA[1], // Plate 02: Serenade of Morning Light (/images/2.jpg)
    PLATES_DATA[2], // Plate 03: A Mother's Gaze (/images/3.jpg)
    PLATES_DATA[3], // Plate 04: The Whirlwind of Sangeet (/images/4.jpg)
    PLATES_DATA[4], // Plate 05: Promises under the Starlight (/images/5.jpg)
    PLATES_DATA[5], // Plate 06: The Sacred Agni (/images/6.jpg)
    PLATES_DATA[6], // Plate 07: The Royal Pre-Wedding Romance (/images/7.jpg)
    PLATES_DATA[9], // Plate 10: Bridal Splendor & Intricate Regalia
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
    <div className="w-full bg-[#fcf9f4] text-[#1c1c19] bg-dots min-h-screen relative overflow-hidden font-sans">
      
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
      {/* LUXURY EDITORIAL WEDDING PHOTOGRAPHY HERO SECTION */}
      {/* ========================================================= */}
      <section 
        ref={heroSectionRef}
        className="relative w-full pt-28 sm:pt-32 pb-20 px-4 sm:px-6 lg:px-12 flex flex-col items-center justify-center text-center overflow-hidden"
      >
        
        {/* Cinematic Background Video - Hero Section Only */}
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
            className="w-full h-full object-cover opacity-85 scale-100"
          >
            <source src="/rk_bg.mp4" type="video/mp4" />
          </video>
          {/* Subtle cinematic scrim: keeps video movement clearly visible while protecting text contrast */}
          <div className="absolute inset-0 bg-black/20" />
          <div className="absolute inset-0 bg-gradient-to-b from-[#fcf9f4]/35 via-transparent to-[#fcf9f4]" />
        </div>

        {/* Soft Ambient Warm Ivory-to-Champagne Lighting */}
        <div className="absolute top-16 left-1/2 -translate-x-1/2 w-[700px] h-[380px] bg-gradient-to-b from-[#c5a059]/15 via-[#a78b71]/10 to-transparent blur-[130px] rounded-full pointer-events-none z-0" />

        {/* 1. Live Notification Pill */}
        <div className="relative z-10 inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full bg-white/95 backdrop-blur-md border border-[#e2d8cb] shadow-sm mb-6 transition-all hover:border-[#a78b71]">
          <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse inline-block" />
          <span className="font-sans font-bold text-[9px] text-emerald-800 tracking-widest uppercase">
            ATELIER ACTIVE
          </span>
          <span className="w-px h-3 bg-[#ded5c7]" />
          <span className="font-sans text-xs text-[#524436] tracking-wide font-medium">
            Accepting 24 Bespoke Nuptials in 2026
          </span>
        </div>

        {/* 2. Refined Serif Headline: "Every Frame, A Legacy" */}
        <h1 
          className="relative z-10 font-serif italic font-normal text-[#1c1c19] tracking-tight leading-[1.08] max-w-4xl mx-auto drop-shadow-sm"
          style={{ fontSize: 'clamp(2.75rem, 6.2vw, 5.25rem)' }}
        >
          Every Frame,{' '}
          <span className="text-[#45123E] font-serif not-italic font-bold">
            A Legacy
          </span>
        </h1>

        {/* Understated Editorial Description */}
        <p className="relative z-10 font-serif text-base sm:text-xl text-[#3d3023] max-w-2xl mx-auto mt-5 leading-relaxed font-medium drop-shadow-xs">
          Preserving the unshed tears, quiet pheras, and unrepeatable devotion of India’s most evocative celebrations through timeless medium format artistry.
        </p>

        {/* 3. Minimal "Explore the Collection" Button in Deep Burgundy */}
        <div className="mt-8 flex flex-wrap items-center justify-center gap-4 z-20">
          <button
            onClick={() => {
              const el = document.getElementById('curated-anthology');
              if (el) el.scrollIntoView({ behavior: 'smooth' });
            }}
            className="px-8 py-3.5 rounded-full bg-[#45123E] text-white hover:bg-[#340C2E] font-sans text-xs uppercase tracking-[0.22em] font-semibold transition-all duration-300 shadow-[0_4px_20px_rgba(69,18,62,0.25)] hover:shadow-[0_8px_30px_rgba(69,18,62,0.35)] active:scale-95 cursor-pointer flex items-center gap-2.5"
          >
            <span>Explore the Collection</span>
            <ArrowRight className="w-3.5 h-3.5 text-[#e8d5b7]" />
          </button>
          <button
            onClick={handleOpenReserve}
            className="px-7 py-3.5 rounded-full bg-white/85 hover:bg-white text-[#45123E] border border-[#dcd3c5] hover:border-[#45123E] font-sans text-xs uppercase tracking-[0.2em] font-medium backdrop-blur-md transition-all duration-300 shadow-2xs active:scale-95 cursor-pointer"
          >
            Book Appointment
          </button>
        </div>

        {/* ========================================================= */}
        {/* EDITORIAL GALLERY EXHIBITION: FOCAL PORTRAIT + ASYMMETRIC SUPPORTING */}
        {/* Auto-advancing loop through 8 best images with pause on hover */}
        {/* ========================================================= */}
        <div className="relative w-full max-w-7xl mx-auto mt-12 sm:mt-16 min-h-[540px] sm:min-h-[620px] lg:min-h-[660px] flex items-center justify-center">
          
          {/* Asymmetrical Supporting Photograph 1: Upper Left (Next image in loop preview) */}
          {(() => {
            const leftPlate = heroShowcasePlates[(heroActivePlateIdx + 1) % heroShowcasePlates.length];
            const leftIdx = (heroActivePlateIdx + 1) % heroShowcasePlates.length;
            return (
              <div 
                onClick={() => setHeroActivePlateIdx(leftIdx)}
                className="hidden xl:flex absolute left-4 2xl:left-12 top-6 2xl:top-10 flex-col p-2.5 z-10 cursor-pointer text-left group bg-[#f8f4ec]/90 backdrop-blur-md rounded-2xl border border-[#e5dcce] shadow-md hover:shadow-xl transition-all duration-500 hover:-translate-y-1.5"
                style={{ width: '220px' }}
                title={`Switch focal plate to ${leftPlate.title}`}
              >
                <div className="w-full h-56 rounded-xl overflow-hidden bg-[#FAF5EB] relative border border-[#e8dfd1]">
                  <img
                    key={leftPlate.id}
                    src={leftPlate.imageUrl}
                    alt={leftPlate.title}
                    className="w-full h-full object-cover object-center transition-all duration-700 group-hover:scale-105"
                  />
                  <span className="absolute top-2 left-2 text-[8px] font-sans uppercase tracking-widest bg-black/75 text-[#FAF5EB] px-2 py-0.5 rounded-full font-semibold">
                    {leftPlate.plateNumber}
                  </span>
                </div>
                <div className="mt-2.5 px-1 pb-0.5">
                  <span className="font-serif italic text-xs font-semibold text-[#1c1c19] block truncate group-hover:text-[#45123E] transition-colors">
                    {leftPlate.title}
                  </span>
                  <span className="font-sans text-[10px] text-[#786a5a] block tracking-tight mt-0.5">
                    {leftPlate.gear.split('•')[0] || leftPlate.location}
                  </span>
                </div>
              </div>
            );
          })()}

          {/* MAIN FOCAL PHOTOGRAPH: Beautifully cropped portrait frame with continuous auto loop */}
          <div 
            onMouseEnter={() => setIsHeroHovered(true)}
            onMouseLeave={() => setIsHeroHovered(false)}
            className="relative z-20 w-full max-w-[390px] sm:max-w-[440px] md:max-w-[470px] aspect-[4/5] sm:aspect-[14/17] rounded-[28px] p-2.5 sm:p-3 bg-[#f8f4ec] border border-[#e5dcce] editorial-frame-shadow flex flex-col justify-between group transition-all duration-700"
          >
            
            {/* Inner portrait canvas with slow cinematic image reveal */}
            <div className="relative w-full h-full rounded-[22px] overflow-hidden bg-[#181310] flex flex-col justify-between">
              
              {/* Soft ambient blur backdrop */}
              <img
                key={`bg-${currentHeroPlate.id}`}
                src={currentHeroPlate.imageUrl}
                alt=""
                className="absolute inset-0 w-full h-full object-cover filter blur-2xl opacity-35 scale-110 pointer-events-none transition-opacity duration-1000"
              />

              {/* Main focal portrait photograph with gentle cinematic fade-in and subtle parallax */}
              <div className="absolute inset-0 z-0 overflow-hidden flex items-center justify-center">
                <img
                  key={`hero-${currentHeroPlate.id}`}
                  src={currentHeroPlate.imageUrl}
                  alt={currentHeroPlate.title}
                  className="w-full h-full object-cover object-center animate-cinematic transition-transform duration-1000 ease-out group-hover:scale-[1.025]"
                />
              </div>

              {/* Top Bar inside Portrait Frame */}
              <div className="relative z-10 p-3.5 sm:p-4 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="font-sans text-[9px] uppercase tracking-[0.25em] text-[#FAF5EB] bg-black/65 backdrop-blur-md px-2.5 py-1 rounded-full border border-white/20 font-semibold">
                    {currentHeroPlate.plateNumber}
                  </span>
                  <span className="font-sans text-[9px] uppercase tracking-wider text-gray-200 hidden sm:inline bg-black/50 backdrop-blur-xs px-2.5 py-1 rounded-full">
                    {currentHeroPlate.location}
                  </span>
                </div>
                
                <div className="flex items-center gap-1.5">
                  {/* Play/Pause Auto-Advance Indicator */}
                  <button
                    onClick={() => setIsHeroAutoPlaying(!isHeroAutoPlaying)}
                    className="w-8 h-8 rounded-full bg-black/60 backdrop-blur-md border border-white/20 text-white hover:text-[#e8d5b7] flex items-center justify-center transition-all cursor-pointer"
                    title={isHeroAutoPlaying ? "Pause auto-loop" : "Resume auto-loop"}
                    aria-label="Toggle auto loop"
                  >
                    {isHeroAutoPlaying ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5 fill-current" />}
                  </button>

                  <button
                    onClick={() => handlePlateClick(currentHeroPlate)}
                    className="w-8 h-8 rounded-full bg-black/60 backdrop-blur-md border border-white/20 text-white hover:text-[#e8d5b7] flex items-center justify-center transition-all cursor-pointer"
                    title="Expand Full Screen Plate"
                    aria-label="Expand photo"
                  >
                    <Maximize2 className="w-3.5 h-3.5" />
                  </button>
                  <button
                    onClick={(e) => toggleFavorite(e, currentHeroPlate.id)}
                    className="w-8 h-8 rounded-full bg-black/60 backdrop-blur-md border border-white/20 text-white hover:text-[#e8d5b7] flex items-center justify-center transition-all cursor-pointer"
                    title="Save plate to collection"
                    aria-label="Save plate"
                  >
                    <Heart className={`w-3.5 h-3.5 ${favoritePlates.includes(currentHeroPlate.id) ? 'fill-[#e8d5b7] text-[#e8d5b7]' : ''}`} />
                  </button>
                </div>
              </div>

              {/* Prev / Next Quick Nav Overlay Buttons (Hover visible) */}
              <div className="relative z-10 px-3 flex items-center justify-between pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <button
                  onClick={() => setHeroActivePlateIdx(prev => (prev - 1 + heroShowcasePlates.length) % heroShowcasePlates.length)}
                  className="pointer-events-auto w-9 h-9 rounded-full bg-black/50 hover:bg-black/80 backdrop-blur-md border border-white/20 text-white flex items-center justify-center transition-all cursor-pointer shadow-lg hover:scale-110 active:scale-95"
                  title="Previous Plate"
                  aria-label="Previous plate"
                >
                  <ChevronLeft className="w-5 h-5" />
                </button>
                <button
                  onClick={() => setHeroActivePlateIdx(prev => (prev + 1) % heroShowcasePlates.length)}
                  className="pointer-events-auto w-9 h-9 rounded-full bg-black/50 hover:bg-black/80 backdrop-blur-md border border-white/20 text-white flex items-center justify-center transition-all cursor-pointer shadow-lg hover:scale-110 active:scale-95"
                  title="Next Plate"
                  aria-label="Next plate"
                >
                  <ChevronRight className="w-5 h-5" />
                </button>
              </div>

              {/* Clean Bottom Overlay with High Contrast Details & Elegant 8-Dot Nav */}
              <div className="relative z-10 pt-16 pb-4 sm:pb-5 px-4 sm:px-5 bg-gradient-to-t from-black/92 via-black/60 to-transparent flex flex-col gap-2.5 text-left">
                <div>
                  <h3 className="font-serif italic text-lg sm:text-2xl font-normal text-white tracking-wide drop-shadow-sm">
                    {currentHeroPlate.title}
                  </h3>
                  <p className="font-sans text-[11px] sm:text-xs text-[#e8d5b7] font-light mt-0.5 tracking-wide truncate">
                    {currentHeroPlate.couple} • {currentHeroPlate.gear}
                  </p>
                </div>

                {/* Elegant Minimal Navigation Dots with Smooth Transition */}
                <div className="flex items-center justify-between pt-1 border-t border-white/15 mt-1">
                  <div className="flex items-center gap-2">
                    <span className="text-[9px] font-mono tracking-widest text-white/70 uppercase">
                      0{heroActivePlateIdx + 1} / 0{heroShowcasePlates.length}
                    </span>
                    {isHeroAutoPlaying && !isHeroHovered && (
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse inline-block" title="Auto-looping active" />
                    )}
                  </div>

                  <div className="flex items-center gap-1.5">
                    {heroShowcasePlates.map((_, idx) => (
                      <button
                        key={idx}
                        onClick={() => setHeroActivePlateIdx(idx)}
                        className={`h-1.5 rounded-full transition-all duration-500 cursor-pointer ${
                          heroActivePlateIdx === idx 
                            ? 'w-5 bg-[#c5a059] shadow-[0_0_8px_rgba(197,160,89,0.7)]' 
                            : 'w-1.5 bg-white/40 hover:bg-white/80'
                        }`}
                        title={`Select Plate 0${idx + 1}`}
                        aria-label={`Go to plate 0${idx + 1}`}
                      />
                    ))}
                  </div>
                </div>

                {/* Subtle Auto-Advance Progress Line */}
                {isHeroAutoPlaying && !isHeroHovered && (
                  <div className="w-full h-[2px] bg-white/10 rounded-full overflow-hidden mt-0.5">
                    <div 
                      key={`progress-${heroActivePlateIdx}`}
                      className="h-full bg-gradient-to-r from-[#c5a059] via-[#e8d5b7] to-[#FAF5EB] animate-slide-progress" 
                    />
                  </div>
                )}
              </div>

            </div>
          </div>

          {/* Asymmetrical Supporting Photograph 2: Lower Right (Subsequent image in loop preview) */}
          {(() => {
            const rightPlate = heroShowcasePlates[(heroActivePlateIdx + 2) % heroShowcasePlates.length];
            const rightIdx = (heroActivePlateIdx + 2) % heroShowcasePlates.length;
            return (
              <div 
                onClick={() => setHeroActivePlateIdx(rightIdx)}
                className="hidden xl:flex absolute right-4 2xl:right-12 bottom-6 2xl:bottom-10 flex-col p-2.5 z-10 cursor-pointer text-left group bg-[#f8f4ec]/90 backdrop-blur-md rounded-2xl border border-[#e5dcce] shadow-md hover:shadow-xl transition-all duration-500 hover:-translate-y-1.5"
                style={{ width: '220px' }}
                title={`Switch focal plate to ${rightPlate.title}`}
              >
                <div className="w-full h-56 rounded-xl overflow-hidden bg-[#FAF5EB] relative border border-[#e8dfd1]">
                  <img
                    key={rightPlate.id}
                    src={rightPlate.imageUrl}
                    alt={rightPlate.title}
                    className="w-full h-full object-cover object-top transition-all duration-700 group-hover:scale-105"
                  />
                  <span className="absolute top-2 left-2 text-[8px] font-sans uppercase tracking-widest bg-black/75 text-[#FAF5EB] px-2 py-0.5 rounded-full font-semibold">
                    {rightPlate.plateNumber}
                  </span>
                </div>
                <div className="mt-2.5 px-1 pb-0.5">
                  <span className="font-serif italic text-xs font-semibold text-[#1c1c19] block truncate group-hover:text-[#45123E] transition-colors">
                    {rightPlate.title}
                  </span>
                  <span className="font-sans text-[10px] text-[#786a5a] block tracking-tight mt-0.5">
                    {rightPlate.gear.split('•')[0] || rightPlate.location}
                  </span>
                </div>
              </div>
            );
          })()}

        </div>

        {/* Small Screen Supporting Plates Strip (Mobile & Tablet friendly) */}
        <div className="flex xl:hidden items-center justify-center gap-3 mt-6">
          {heroShowcasePlates.map((plate, idx) => (
            <button
              key={plate.id}
              onClick={() => setHeroActivePlateIdx(idx)}
              className={`w-12 h-14 rounded-lg overflow-hidden border transition-all ${
                heroActivePlateIdx === idx 
                  ? 'border-[#45123E] ring-2 ring-[#45123E]/30 scale-105' 
                  : 'border-[#ded5c7] opacity-60 hover:opacity-100'
              }`}
              title={plate.title}
            >
              <img src={plate.imageUrl} alt="" className="w-full h-full object-cover" />
            </button>
          ))}
        </div>

      </section>

      {/* ========================================================= */}
      {/* 4-COLUMN GLASSMORPHIC FEATURES GRID (LIGHT THEME) */}
      {/* ========================================================= */}
      <section className="w-full px-6 sm:px-8 lg:px-12 py-20 border-t border-[#e5dfd5] relative bg-white/50">
        <div className="max-w-7xl mx-auto">
          
          <div className="text-center max-w-2xl mx-auto mb-16">
            <span className="font-sans text-[11px] uppercase tracking-[0.25em] text-[#775a19] font-bold block mb-3">
              HAUTE DISCIPLINES &amp; CRAFTSMANSHIP
            </span>
            <h2 className="font-serif italic text-3xl sm:text-4xl text-[#1c1c19] font-normal">
              Engineered with Classical Reverence
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                icon: <Camera className="w-6 h-6 text-[#45123E]" />,
                title: "Medium Format 100MP",
                body: "Captured on Hasselblad and Leica prime glass with authentic silver halide skin calibrations for royal nuance."
              },
              {
                icon: <Film className="w-6 h-6 text-[#45123E]" />,
                title: "Arri & Alexa Cinema",
                body: "Hollywood-grade anamorphic framing and bespoke orchestral score mastering that turns pheras into cinema."
              },
              {
                icon: <Flame className="w-6 h-6 text-[#45123E]" />,
                title: "Sacred Vedic Lore",
                body: "Deep understanding of all 16 Indian ceremonies, from auspicious Muhurats to silent, heartfelt Vidais."
              },
              {
                icon: <Layers className="w-6 h-6 text-[#45123E]" />,
                title: "Florentine Heirlooms",
                body: "Museum deckled cotton rag hand-bound with Italian silk habotai, 24K gold foil and century-tested archival binding."
              }
            ].map((feature, idx) => (
              <div
                key={idx}
                className="glass-card glass-card-hover p-8 rounded-3xl flex flex-col justify-between group cursor-default border border-[#ded5c7]"
              >
                <div>
                  <div className="w-12 h-12 rounded-2xl bg-[#45123E]/10 border border-[#45123E]/20 flex items-center justify-center mb-6 transition-transform duration-300 group-hover:scale-110">
                    {feature.icon}
                  </div>
                  <h3 className="font-sans font-bold text-xl text-[#1c1c19] mb-3 tracking-tight">
                    {feature.title}
                  </h3>
                  <p className="font-sans text-sm text-[#594d3f] leading-relaxed font-normal">
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
      <section id="curated-anthology" className="w-full px-6 sm:px-8 lg:px-12 py-20 border-t border-[#e5dfd5] relative">
        <div className="max-w-7xl mx-auto">
          
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
            <div>
              <div className="inline-flex items-center gap-2 mb-2 text-[#775a19]">
                <Sparkles className="w-4 h-4 text-[#a78b71]" />
                <span className="font-sans text-[11px] uppercase tracking-[0.25em] font-bold">
                  AUTHENTIC VISUAL ANTHOLOGY
                </span>
              </div>
              <h2 className="font-serif italic text-3xl sm:text-5xl text-[#1c1c19] font-normal">
                Curated Haute Plates
              </h2>
              <p className="font-sans text-sm text-[#594d3f] max-w-xl mt-2 font-normal">
                Every frame captured on medium format glass plate and fine 35mm stock, preserving the raw emotional essence of sacred lineage.
              </p>
            </div>

            {/* Curatorial Folio Status */}
            <div className="flex items-center gap-3 text-xs font-sans text-[#594d3f]">
              <span className="px-3.5 py-1.5 rounded-full bg-white border border-[#ded5c7] text-[#1c1c19] font-semibold shadow-2xs">
                {filteredPlates.length} Plates Active
              </span>
              {favoritePlates.length > 0 && (
                <span className="px-3.5 py-1.5 rounded-full bg-[#45123E] text-[#FAF5EB] font-bold shadow-xs">
                  ♥ {favoritePlates.length} Saved in Folio
                </span>
              )}
            </div>
          </div>

          {/* Category Filter Nav Tabs */}
          <div className="flex items-center overflow-x-auto scrollbar-none pb-4 mb-10 gap-2 border-b border-[#ded5c7]">
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
                className={`px-4 py-2 rounded-full font-sans text-xs tracking-wider uppercase transition-all whitespace-nowrap cursor-pointer ${
                  activeFilter === tab.id
                    ? 'bg-[#45123E] text-white font-bold shadow-sm'
                    : 'bg-white text-[#594d3f] hover:text-[#1c1c19] border border-[#ded5c7] hover:border-[#45123E]'
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
                    <div className="md:col-span-12 py-12 px-8 sm:px-16 my-8 rounded-3xl bg-[#FAF5EB] border border-[#e2d5c3] shadow-xs flex flex-col items-center text-center">
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
                    className={`${plate.colSpanDesktop} rounded-3xl overflow-hidden glass-card glass-card-hover group cursor-pointer relative flex flex-col justify-between border border-[#ded5c7]`}
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

                      {/* Plate Badge */}
                      <div className="absolute top-4 left-4">
                        <span className="font-sans text-[10px] uppercase tracking-widest text-white bg-black/60 backdrop-blur-md px-3 py-1 rounded-full border border-white/20 font-bold">
                          {plate.plateNumber}
                        </span>
                      </div>

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
      {/* PRICING SECTION (THREE-TIERED LAYOUT WITH CENTER HIGHLIGHT) */}
      {/* ========================================================= */}
      <section className="w-full px-6 sm:px-8 lg:px-12 py-24 border-t border-[#e5dfd5] relative bg-white/50">
        <div className="max-w-7xl mx-auto">
          
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="font-sans text-[11px] uppercase tracking-[0.25em] text-[#775a19] font-bold block mb-3">
              BESPOKE PATRON COMMISSIONS
            </span>
            <h2 className="font-serif italic text-3xl sm:text-5xl text-[#1c1c19] font-normal">
              Sacred Monograph Tiers
            </h2>
            <p className="font-sans text-sm text-[#594d3f] mt-3">
              Limited to twenty-four matrimonial celebrations per year to preserve unparalleled artistic dedication.
            </p>

            {/* Pill-shaped toggle */}
            <div className="mt-8 inline-flex items-center p-1 rounded-full bg-[#f0eae0] border border-[#ded3c2]">
              <button
                onClick={() => setPricingPlan('single')}
                className={`px-5 py-2 rounded-full font-sans text-xs tracking-wider uppercase transition-all cursor-pointer ${
                  pricingPlan === 'single'
                    ? 'bg-[#45123E] text-white font-bold shadow-md'
                    : 'text-[#594d3f] hover:text-[#1c1c19]'
                }`}
              >
                Intimate (1–2 Days)
              </button>
              <button
                onClick={() => setPricingPlan('multiday')}
                className={`px-5 py-2 rounded-full font-sans text-xs tracking-wider uppercase transition-all cursor-pointer ${
                  pricingPlan === 'multiday'
                    ? 'bg-[#45123E] text-white font-bold shadow-md'
                    : 'text-[#594d3f] hover:text-[#1c1c19]'
                }`}
              >
                Royal Festivities (3–5 Days)
              </button>
            </div>
          </div>

          {/* Three-Tiered Layout */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-stretch">
            {INVESTMENT_TIERS.map((tier, idx) => {
              const isCenterPro = tier.isPatronPreferred || idx === 1;

              return (
                <div
                  key={tier.id}
                  className={`relative rounded-3xl p-8 sm:p-10 flex flex-col justify-between transition-all duration-300 glass-card bg-white ${
                    isCenterPro
                      ? 'border-[#45123E] shadow-2xl ring-2 ring-[#45123E]/20 -translate-y-2 lg:-translate-y-4'
                      : 'border-[#ded5c7] hover:border-[#a78b71]'
                  }`}
                >
                  {/* Top-Centered Badge */}
                  {isCenterPro && (
                    <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 px-4 py-1 rounded-full bg-[#45123E] text-white font-sans text-[10px] font-extrabold uppercase tracking-[0.2em] shadow-md">
                      Most Popular • Patron Preferred
                    </div>
                  )}

                  <div>
                    {/* Header */}
                    <div className="mb-6">
                      <span className="font-sans text-[10px] uppercase tracking-[0.25em] text-[#775a19] font-bold block mb-1">
                        {tier.collectionNumber}
                      </span>
                      <h3 className="font-serif italic text-2xl sm:text-3xl font-bold text-[#1c1c19]">
                        {tier.name} <span className="text-[#a78b71]">{tier.nameHighlight}</span>
                      </h3>
                      <p className="font-sans text-xs text-[#6b5d4e] mt-1">
                        {tier.subtitle}
                      </p>
                    </div>

                    {/* Price in 48px bold font */}
                    <div className="my-6 pb-6 border-b border-[#e8dfd2]">
                      <div className="flex items-baseline gap-2">
                        <span className="font-sans font-bold text-4xl sm:text-5xl text-[#1c1c19] tracking-tight">
                          {getTierPriceDisplay(tier.id)}
                        </span>
                        <span className="font-sans text-xs text-[#786a5a]">/ celebration</span>
                      </div>
                      <span className="font-sans text-[11px] text-[#775a19] block mt-1.5 font-medium">
                        {tier.duration}
                      </span>
                    </div>

                    {/* Features list */}
                    <ul className="space-y-3.5 my-6">
                      {tier.features.map((feat, fIdx) => (
                        <li key={fIdx} className="flex items-start gap-3 text-xs font-sans">
                          <div className="w-4 h-4 rounded-full bg-[#45123E]/10 border border-[#45123E]/30 flex items-center justify-center shrink-0 mt-0.5">
                            <Check className="w-2.5 h-2.5 text-[#45123E]" />
                          </div>
                          <div>
                            <span className="text-[#1c1c19] font-bold">{feat.label}: </span>
                            <span className="text-[#594d3f]">{feat.detail}</span>
                          </div>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* CTA Button */}
                  <div className="pt-6">
                    <button
                      onClick={() => onOpenWhatsApp(`Pranam! I would like to inquire about reserving ${tier.name} ${tier.nameHighlight} collection.`)}
                      className={`w-full py-4 rounded-full font-sans text-xs uppercase tracking-[0.2em] font-bold transition-all shadow-md active:scale-95 cursor-pointer ${
                        isCenterPro
                          ? 'bg-[#45123E] text-white hover:bg-[#340C2E] shadow-lg'
                          : 'bg-[#FAF5EB] hover:bg-[#45123E] text-[#1c1c19] hover:text-white border border-[#ded5c7]'
                      }`}
                    >
                      {tier.ctaText}
                    </button>
                  </div>
                </div>
              );
            })}
          </div>

        </div>
      </section>

      {/* ========================================================= */}
      {/* TEAM SECTION (TWO-COLUMN WITH 4:5 GRAYSCALE TO COLOR) */}
      {/* ========================================================= */}
      <section className="w-full px-6 sm:px-8 lg:px-12 py-24 border-t border-[#e5dfd5] relative">
        <div className="max-w-7xl mx-auto">
          
          <div className="text-center max-w-2xl mx-auto mb-16">
            <span className="font-sans text-[11px] uppercase tracking-[0.25em] text-[#775a19] font-bold block mb-3">
              THE ARTISAN MASTERS
            </span>
            <h2 className="font-serif italic text-3xl sm:text-5xl text-[#1c1c19] font-normal">
              Guardians of Matrimonial Legacy
            </h2>
            <p className="font-sans text-sm text-[#594d3f] mt-2">
              Thirty-five years of collective devotion to the visual heritage of India's most storied dynasties.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12">
            
            {/* Team Member 1 */}
            <div className="glass-card bg-white rounded-3xl p-6 sm:p-8 flex flex-col justify-between group border border-[#ded5c7]">
              <div className="w-full aspect-[4/5] rounded-2xl overflow-hidden bg-[#FAF5EB] relative">
                <img
                  src={PLATES_DATA[0].imageUrl}
                  alt="Radhika & Karan"
                  className="w-full h-full object-cover grayscale transition-all duration-700 group-hover:grayscale-0 group-hover:scale-105"
                  loading="lazy"
                />
              </div>

              <div className="mt-6">
                <span className="font-sans text-[10px] uppercase tracking-[0.3em] text-[#775a19] font-bold block mb-1">
                  FOUNDER &amp; PRINCIPAL CURATOR
                </span>
                <h3 className="font-serif italic text-2xl sm:text-3xl font-bold text-[#1c1c19]">
                  Radhika &amp; Karan
                </h3>
                <p className="font-sans text-xs sm:text-sm text-[#594d3f] mt-3 leading-relaxed">
                  Educated in fine arts and archival preservation, Radhika directs all emotional choreography and heirloom layout. Karan leads medium-format film development and rare hand-pulled platinum prints.
                </p>
              </div>
            </div>

            {/* Team Member 2 */}
            <div className="glass-card bg-white rounded-3xl p-6 sm:p-8 flex flex-col justify-between group border border-[#ded5c7]">
              <div className="w-full aspect-[4/5] rounded-2xl overflow-hidden bg-[#FAF5EB] relative">
                <img
                  src={PLATES_DATA[2].imageUrl}
                  alt="Senior Cinématographe Guild"
                  className="w-full h-full object-cover grayscale transition-all duration-700 group-hover:grayscale-0 group-hover:scale-105"
                  loading="lazy"
                />
              </div>

              <div className="mt-6">
                <span className="font-sans text-[10px] uppercase tracking-[0.3em] text-[#775a19] font-bold block mb-1">
                  CHIEF CINEMATOGRAPHER &amp; COLORIST
                </span>
                <h3 className="font-serif italic text-2xl sm:text-3xl font-bold text-[#1c1c19]">
                  Artisan Stills &amp; Alexa Guild
                </h3>
                <p className="font-sans text-xs sm:text-sm text-[#594d3f] mt-3 leading-relaxed">
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
      <section className="w-full px-6 sm:px-8 lg:px-12 py-20 border-t border-[#e5dfd5] relative bg-white/50">
        <div className="max-w-7xl mx-auto">
          
          {uploadSuccessMessage && (
            <div className="mb-8 p-4 rounded-2xl bg-emerald-50 border border-emerald-300 text-emerald-800 flex items-center justify-between shadow-xs">
              <div className="flex items-center gap-3">
                <CheckCircle className="w-5 h-5 text-emerald-600" />
                <span className="font-sans text-xs font-medium">
                  {uploadSuccessMessage}
                </span>
              </div>
              <button onClick={() => setUploadSuccessMessage(null)} className="text-emerald-700 hover:text-emerald-900 p-1">
                <X className="w-4 h-4" />
              </button>
            </div>
          )}

          <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
            <div>
              <div className="inline-flex items-center gap-2 mb-2 text-[#775a19]">
                <ImageIcon className="w-4 h-4 text-[#a78b71]" />
                <span className="font-sans text-[11px] uppercase tracking-[0.25em] font-bold">
                  AUTHENTIC PHOTO GALLERY • ROHINI SECTOR 23
                </span>
              </div>
              <h2 className="font-serif italic text-3xl sm:text-4xl text-[#1c1c19] font-normal">
                Real Ceremonies &amp; Studio Artifacts
              </h2>
              <p className="font-sans text-xs sm:text-sm text-[#594d3f] max-w-xl mt-1.5">
                Glimpse into authentic bridal sittings, ancestral restorations, and family milestones captured by RK Photo Studio across Delhi NCR.
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-3">
              <button
                onClick={() => setIsUploadModalOpen(true)}
                className="px-5 py-2.5 rounded-full bg-[#45123E] text-white font-sans text-xs uppercase tracking-wider font-bold hover:bg-[#340C2E] transition-all flex items-center gap-2 cursor-pointer shadow-md"
              >
                <ImagePlus className="w-4 h-4 text-[#e8d5b7]" />
                <span>Upload Photos</span>
              </button>

              {galleryDisplayCount < allGalleryPhotos.length ? (
                <button
                  onClick={() => setGalleryDisplayCount(prev => Math.min(prev + 12, allGalleryPhotos.length))}
                  className="px-5 py-2.5 rounded-full bg-white text-[#1c1c19] hover:bg-[#FAF5EB] border border-[#ded5c7] font-sans text-xs uppercase tracking-wider transition-colors cursor-pointer shadow-2xs"
                >
                  Load More ({allGalleryPhotos.length - galleryDisplayCount} remaining)
                </button>
              ) : allGalleryPhotos.length > 12 ? (
                <button
                  onClick={() => setGalleryDisplayCount(12)}
                  className="px-5 py-2.5 rounded-full bg-white text-[#1c1c19] border border-[#ded5c7] font-sans text-xs uppercase tracking-wider transition-colors cursor-pointer"
                >
                  Show Less
                </button>
              ) : null}
            </div>
          </div>

          {/* Photo Gallery Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3 sm:gap-4">
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
      {/* GOOGLE VERIFIED REVIEWS (4.9★ IN ROHINI SECTOR 23) */}
      {/* ========================================================= */}
      <section className="w-full px-6 sm:px-8 lg:px-12 py-20 border-t border-[#e5dfd5] relative">
        <div className="max-w-7xl mx-auto">
          
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
            <div>
              <div className="inline-flex items-center gap-2 mb-2 text-[#775a19]">
                <Star className="w-4 h-4 text-[#F4B400] fill-current" />
                <span className="font-sans text-[11px] uppercase tracking-[0.25em] font-bold">
                  GOOGLE VERIFIED PATRON TESTIMONIALS
                </span>
              </div>
              <h2 className="font-serif italic text-3xl sm:text-4xl text-[#1c1c19] font-normal">
                Loved by Five Hundred Royal Families
              </h2>
            </div>
            
            <a
              href="https://share.google/XGXzmI1VT65XaGW7H"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-white hover:bg-[#FAF5EB] text-[#1c1c19] border border-[#ded5c7] font-sans text-xs uppercase tracking-wider transition-all shadow-2xs"
            >
              <span className="font-bold">4.9★ on Google Maps</span>
              <ExternalLink className="w-3.5 h-3.5 text-[#a78b71]" />
            </a>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {GOOGLE_REVIEWS.map((rev) => (
              <div
                key={rev.id}
                className="glass-card bg-white p-6 rounded-3xl flex flex-col justify-between border border-[#ded5c7]"
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex text-[#F4B400] gap-0.5">
                      {[...Array(rev.rating)].map((_, i) => (
                        <Star key={i} className="w-3.5 h-3.5 fill-current" />
                      ))}
                    </div>
                    <span className="font-sans text-[10px] uppercase tracking-wider text-[#786a5a] bg-[#FAF5EB] px-2.5 py-0.5 rounded-full border border-[#e5ded4]">
                      {rev.timeAgo}
                    </span>
                  </div>

                  <p className="font-serif text-sm text-[#3e3226] leading-relaxed italic mb-6">
                    “{rev.reviewText}”
                  </p>
                </div>

                <div className="pt-4 border-t border-[#e8dfd2] flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    {rev.avatarImg ? (
                      <img 
                        src={rev.avatarImg} 
                        alt={rev.author} 
                        className="w-8 h-8 rounded-full object-cover shrink-0 border border-[#a78b71]/40" 
                        loading="lazy"
                      />
                    ) : (
                      <div className={`w-8 h-8 rounded-full ${rev.avatarBg} text-white flex items-center justify-center font-sans text-xs font-bold shrink-0`}>
                        {rev.author.charAt(0)}
                      </div>
                    )}
                    <div>
                      <span className="font-sans font-bold text-xs text-[#1c1c19] block">
                        {rev.author}
                      </span>
                      <span className="font-sans text-[10px] text-[#786a5a]">
                        {rev.location}
                      </span>
                    </div>
                  </div>

                  {rev.verified && (
                    <div className="flex items-center gap-1 text-emerald-700 text-[10px] font-sans font-semibold">
                      <CheckCircle className="w-3.5 h-3.5 text-emerald-600" />
                      <span>Verified</span>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* ========================================================= */}
      {/* STUDIO JOURNAL & WEDDING STORIES */}
      {/* ========================================================= */}
      <section className="w-full px-6 sm:px-8 lg:px-12 py-20 border-t border-[#e5dfd5] relative bg-white/50">
        <div className="max-w-7xl mx-auto">
          
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
            <div>
              <div className="inline-flex items-center gap-2 mb-2 text-[#775a19]">
                <BookOpen className="w-4 h-4 text-[#a78b71]" />
                <span className="font-sans text-[11px] uppercase tracking-[0.25em] font-bold">
                  STUDIO ARCHIVE • JOURNAL &amp; PHILOSOPHIES
                </span>
              </div>
              <h2 className="font-serif italic text-3xl sm:text-4xl text-[#1c1c19] font-normal">
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

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {STUDIO_POSTS.map((post) => (
              <div
                key={post.id}
                className="glass-card bg-white rounded-3xl overflow-hidden flex flex-col justify-between group border border-[#ded5c7]"
              >
                <div>
                  <div className="w-full h-48 overflow-hidden bg-[#FAF5EB] relative">
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

                  <div className="p-6">
                    <h3 className="font-serif italic text-lg font-bold text-[#1c1c19] group-hover:text-[#45123E] transition-colors leading-snug line-clamp-2">
                      {post.title}
                    </h3>
                    <p className="font-sans text-xs text-[#594d3f] leading-relaxed mt-2.5 line-clamp-3">
                      {post.excerpt}
                    </p>
                  </div>
                </div>

                <div className="p-6 pt-0">
                  <button
                    onClick={() => setSelectedPost(post)}
                    className="w-full py-2.5 rounded-full bg-[#FAF5EB] hover:bg-[#45123E] text-[#45123E] hover:text-white border border-[#ded5c7] hover:border-[#45123E] font-sans text-xs uppercase tracking-wider font-bold transition-all flex items-center justify-center gap-1.5 cursor-pointer"
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
      {/* LIGHTBOX PLATE MODAL */}
      {/* ========================================================= */}
      {lightboxPlate && (
        <div 
          onClick={() => setLightboxPlate(null)}
          className="fixed inset-0 z-50 bg-black/85 backdrop-blur-md flex items-center justify-center p-4 sm:p-6"
        >
          <div 
            onClick={(e) => e.stopPropagation()}
            className="relative w-full max-w-5xl max-h-[92vh] bg-white rounded-3xl overflow-hidden border border-[#ded5c7] flex flex-col md:flex-row shadow-2xl animate-fadeIn"
          >
            <button
              onClick={() => setLightboxPlate(null)}
              className="absolute top-4 right-4 z-20 w-10 h-10 rounded-full bg-black/70 text-white hover:text-[#e8d5b7] flex items-center justify-center transition-colors border border-white/20"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Photo Column - shown FULLY and properly */}
            <div className="w-full md:w-3/5 bg-[#14100c] flex items-center justify-center relative overflow-hidden p-3">
              <img
                src={lightboxPlate.imageUrl}
                alt={lightboxPlate.title}
                className="max-h-[75vh] max-w-full object-contain rounded-xl shadow-2xl"
              />
            </div>

            {/* Content Column */}
            <div className="w-full md:w-2/5 p-6 sm:p-8 flex flex-col justify-between overflow-y-auto bg-[#FAF5EB]">
              <div>
                <span className="font-sans text-[10px] uppercase tracking-[0.25em] text-[#775a19] font-bold block mb-1">
                  {lightboxPlate.plateNumber}
                </span>
                <h3 className="font-serif italic text-2xl font-bold text-[#1c1c19] mb-2">
                  {lightboxPlate.title}
                </h3>
                <p className="font-sans text-xs text-[#775a19] mb-4 font-medium">
                  {lightboxPlate.couple} • {lightboxPlate.location}
                </p>

                <div className="p-4 rounded-2xl bg-white border border-[#ded5c7] mb-4 text-xs font-serif text-[#3e3226] leading-relaxed">
                  <span className="text-[#45123E] font-bold block mb-1 font-sans text-[11px] uppercase tracking-wider">
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

              <div className="pt-6 border-t border-[#ded5c7] flex items-center gap-3">
                <button
                  onClick={() => onOpenWhatsApp(`Pranam! I would like to inquire regarding photographic plate: ${lightboxPlate.title}.`)}
                  className="flex-1 py-3 rounded-full bg-[#45123E] text-white font-sans text-xs uppercase tracking-widest font-bold hover:bg-[#340C2E] transition-all flex items-center justify-center gap-2 cursor-pointer shadow-md"
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
                  <Heart className="w-5 h-5 fill-current" />
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
          className="fixed inset-0 z-50 bg-black/90 backdrop-blur-md flex items-center justify-center p-4"
        >
          <div className="relative max-w-4xl max-h-[90vh] flex items-center justify-center">
            <button
              onClick={() => setSelectedGalleryPhoto(null)}
              className="absolute -top-12 right-0 text-white hover:text-[#e8d5b7] p-2"
            >
              <X className="w-6 h-6" />
            </button>
            <img
              src={selectedGalleryPhoto}
              alt="Gallery Preview"
              className="max-h-[85vh] max-w-full rounded-2xl border border-white/20 object-contain shadow-2xl"
            />
          </div>
        </div>
      )}

      {/* ========================================================= */}
      {/* USER PHOTO UPLOAD MODAL */}
      {/* ========================================================= */}
      {isUploadModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="relative w-full max-w-lg bg-[#FAF5EB] rounded-3xl p-6 sm:p-8 border border-[#ded5c7] shadow-2xl">
            <div className="flex items-center justify-between pb-4 border-b border-[#ded5c7] mb-6">
              <div>
                <h4 className="font-serif italic text-xl font-bold text-[#1c1c19]">
                  Add to Studio Gallery
                </h4>
                <p className="font-sans text-xs text-[#594d3f]">
                  Contribute your wedding moments to RK Studios digital folio
                </p>
              </div>
              <button
                onClick={() => setIsUploadModalOpen(false)}
                className="text-[#786a5a] hover:text-[#1c1c19] p-1"
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
              className={`border-2 border-dashed rounded-2xl p-6 text-center cursor-pointer transition-all ${
                isDragging ? 'border-[#45123E] bg-white' : 'border-[#ded5c7] hover:border-[#45123E] bg-white/70'
              }`}
            >
              <Upload className="w-8 h-8 text-[#45123E] mx-auto mb-2" />
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
              <div className="mt-4 flex gap-2 overflow-x-auto py-2">
                {selectedUploadFiles.map((item, idx) => (
                  <div key={idx} className="w-16 h-16 rounded-xl overflow-hidden relative shrink-0 border border-[#ded5c7]">
                    <img src={item.preview} alt="preview" className="w-full h-full object-cover" />
                  </div>
                ))}
              </div>
            )}

            {/* Caption Input */}
            <div className="mt-4">
              <label className="block text-[11px] font-sans uppercase tracking-widest text-[#775a19] font-bold mb-1.5">
                Ceremony Caption (Optional)
              </label>
              <input
                type="text"
                value={uploadCaption}
                onChange={(e) => setUploadCaption(e.target.value)}
                placeholder="e.g. Sangeet evening at Rohini..."
                className="w-full bg-white border border-[#ded5c7] rounded-xl px-4 py-2.5 text-xs text-[#1c1c19] placeholder-gray-400 focus:outline-none focus:border-[#45123E]"
              />
            </div>

            {/* Buttons */}
            <div className="mt-6 flex items-center justify-end gap-3">
              <button
                onClick={() => setIsUploadModalOpen(false)}
                className="px-5 py-2.5 rounded-full text-xs font-sans text-[#786a5a] hover:text-[#1c1c19]"
              >
                Cancel
              </button>
              <button
                onClick={handleConfirmUpload}
                disabled={selectedUploadFiles.length === 0}
                className="px-6 py-2.5 rounded-full bg-[#45123E] text-white font-sans text-xs font-bold uppercase tracking-wider hover:bg-[#340C2E] disabled:opacity-40 transition-all cursor-pointer shadow-md"
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
          className="fixed inset-0 z-50 bg-black/85 backdrop-blur-md flex items-center justify-center p-4 sm:p-6"
        >
          <div 
            onClick={(e) => e.stopPropagation()}
            className="relative w-full max-w-2xl max-h-[90vh] bg-white rounded-3xl overflow-y-auto p-6 sm:p-8 border border-[#ded5c7] shadow-2xl animate-fadeIn"
          >
            <button
              onClick={() => setSelectedPost(null)}
              className="absolute top-4 right-4 w-9 h-9 rounded-full bg-[#FAF5EB] text-[#1c1c19] flex items-center justify-center hover:bg-[#45123E] hover:text-white transition-colors"
            >
              <X className="w-5 h-5" />
            </button>

            <img
              src={selectedPost.imageUrl}
              alt={selectedPost.title}
              className="w-full h-56 object-cover rounded-2xl mb-6 shadow-sm"
            />

            <span className="text-[10px] font-sans uppercase tracking-[0.2em] text-[#775a19] font-bold">
              {selectedPost.date}
            </span>
            <h3 className="font-serif italic text-2xl font-bold text-[#1c1c19] mt-1 mb-4">
              {selectedPost.title}
            </h3>
            <p className="font-serif text-sm text-[#4e4235] leading-relaxed mb-6">
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
