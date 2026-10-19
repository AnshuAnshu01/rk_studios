import React, { useState } from 'react';
import { 
  PLATES_DATA, 
  PlateItem, 
  GOOGLE_REVIEWS, 
  STUDIO_GALLERY_PHOTOS, 
  STUDIO_POSTS, 
  StudioPost 
} from '../data/weddingData';
import { 
  Camera, 
  Eye, 
  Filter, 
  Sparkles, 
  Heart, 
  ArrowRight, 
  MessageCircle, 
  Calendar, 
  X, 
  ChevronLeft, 
  ChevronRight, 
  Star, 
  CheckCircle, 
  ExternalLink,
  ImageIcon,
  BookOpen
} from 'lucide-react';

interface VisualAnthologyProps {
  onSelectPlate?: (plate: PlateItem) => void;
  onNavigateToReserve?: () => void;
  onSelectScreen?: (screen: string) => void;
  onOpenWhatsApp: (message?: string) => void;
}

export const VisualAnthology: React.FC<VisualAnthologyProps> = ({
  onSelectPlate,
  onNavigateToReserve,
  onSelectScreen,
  onOpenWhatsApp
}) => {
  const [activeFilter, setActiveFilter] = useState<string>('all');
  const [favoritePlates, setFavoritePlates] = useState<string[]>([]);
  const [lightboxPlate, setLightboxPlate] = useState<PlateItem | null>(null);
  const [selectedGalleryPhoto, setSelectedGalleryPhoto] = useState<string | null>(null);
  const [selectedPost, setSelectedPost] = useState<StudioPost | null>(null);
  const [galleryDisplayCount, setGalleryDisplayCount] = useState<number>(12);

  const handleOpenReserve = () => {
    if (onNavigateToReserve) {
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

  return (
    <div className="w-full bg-[#fcf9f4] text-[#1c1c19]">
      {/* Monograph Prelude & Archival Hero Bar */}
      <section className="w-full px-4 sm:px-6 lg:px-8 pt-8 pb-4 bg-[#fcf9f4] border-b border-[#e5e2dd]/60">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-baseline justify-between gap-4 text-xs font-headline uppercase tracking-widest">
          <div className="flex items-center gap-2 text-[#775a19]">
            <Sparkles className="w-3.5 h-3.5" />
            <span className="font-semibold text-[#775a19]">
              A SACRED WITNESS TO YOUR SACRED RITUALS • ARCHIVAL MONOGRAPHS
            </span>
          </div>
          <div className="flex flex-wrap items-center gap-4 text-[#7f7667]">
            <span>CURATED BY RADHIKA &amp; KARAN</span>
            <span className="text-[#d1c5b4]">•</span>
            <span>500+ ARTIFACT CELEBRATIONS</span>
            <span className="text-[#d1c5b4]">•</span>
            <span>COMO • UDAIPUR • PARIS • JAIPUR</span>
          </div>
        </div>
      </section>

      {/* Editorial Master Title Section */}
      <section className="w-full px-4 sm:px-6 lg:px-8 py-12 lg:py-16 text-center">
        <div className="max-w-5xl mx-auto flex flex-col items-center">
          <div className="inline-flex items-center gap-3 mb-4">
            <div className="w-12 h-px bg-[#775a19]/40"></div>
            <span className="font-headline text-xs text-[#775a19] uppercase tracking-[0.25em] font-medium">
              Curated Haute Visuals
            </span>
            <div className="w-12 h-px bg-[#775a19]/40"></div>
          </div>

          <h1 className="font-headline text-4xl sm:text-5xl lg:text-6xl text-[#1c1c19] tracking-tight leading-tight max-w-4xl">
            The Tears, The Laughter, &amp;{' '}
            <span className="font-script text-[#c5a059] font-normal text-[1.25em] tracking-normal inline-block hover:scale-105 transition-transform duration-300">
              The Sacred Promises
            </span>
          </h1>

          <p className="font-serif text-lg sm:text-xl text-[#4e4639] max-w-3xl mt-6 leading-relaxed">
            An Indian wedding is not merely an event — it is a father whispering through unshed tears as his daughter takes her final steps across the courtyard. It is the mischievous laughter shared under the golden glow of Haldi, the nervous tremor in your hands during the Saptapadi, and the quiet glance across a crowded mandap that says: <em>"It is really us."</em> We cradle the unspoken emotions of your lineage so generations from now, your grandchildren feel the pulse of this sacred day.
          </p>

          {/* Classical Filter Nav Tabs (Roman Numerals) */}
          <div className="w-full max-w-5xl mt-12 pt-4 border-t border-b border-[#d1c5b4]/50 flex flex-wrap items-center justify-center gap-y-3 gap-x-5 sm:gap-x-7 text-xs font-headline uppercase tracking-widest">
            <button
              onClick={() => setActiveFilter('all')}
              className={`py-2 relative transition-all ${
                activeFilter === 'all'
                  ? 'text-[#775a19] font-bold border-b-2 border-[#775a19]'
                  : 'text-[#615e5c] hover:text-[#1c1c19]'
              }`}
            >
              I. All Works ({PLATES_DATA.length})
            </button>
            <button
              onClick={() => setActiveFilter('pheras')}
              className={`py-2 relative transition-all ${
                activeFilter === 'pheras'
                  ? 'text-[#775a19] font-bold border-b-2 border-[#775a19]'
                  : 'text-[#615e5c] hover:text-[#1c1c19]'
              }`}
            >
              II. Weddings &amp; Pheras
            </button>
            <button
              onClick={() => setActiveFilter('pre-wedding')}
              className={`py-2 relative transition-all ${
                activeFilter === 'pre-wedding'
                  ? 'text-[#775a19] font-bold border-b-2 border-[#775a19]'
                  : 'text-[#615e5c] hover:text-[#1c1c19]'
              }`}
            >
              III. Pre-Wedding Romance
            </button>
            <button
              onClick={() => setActiveFilter('family')}
              className={`py-2 relative transition-all ${
                activeFilter === 'family'
                  ? 'text-[#775a19] font-bold border-b-2 border-[#775a19]'
                  : 'text-[#615e5c] hover:text-[#1c1c19]'
              }`}
            >
              IV. Family Traditions
            </button>
            <button
              onClick={() => setActiveFilter('events')}
              className={`py-2 relative transition-all ${
                activeFilter === 'events'
                  ? 'text-[#775a19] font-bold border-b-2 border-[#775a19]'
                  : 'text-[#615e5c] hover:text-[#1c1c19]'
              }`}
            >
              V. Special Occasion Events
            </button>
            <button
              onClick={() => setActiveFilter('haldi')}
              className={`py-2 relative transition-all ${
                activeFilter === 'haldi'
                  ? 'text-[#775a19] font-bold border-b-2 border-[#775a19]'
                  : 'text-[#615e5c] hover:text-[#1c1c19]'
              }`}
            >
              VI. Haldi Turmeric
            </button>
            <button
              onClick={() => setActiveFilter('sangeet')}
              className={`py-2 relative transition-all ${
                activeFilter === 'sangeet'
                  ? 'text-[#775a19] font-bold border-b-2 border-[#775a19]'
                  : 'text-[#615e5c] hover:text-[#1c1c19]'
              }`}
            >
              VII. Sangeet &amp; Baaraat
            </button>
            <button
              onClick={() => setActiveFilter('vidai')}
              className={`py-2 relative transition-all ${
                activeFilter === 'vidai'
                  ? 'text-[#775a19] font-bold border-b-2 border-[#775a19]'
                  : 'text-[#615e5c] hover:text-[#1c1c19]'
              }`}
            >
              VIII. The Quiet Vidai
            </button>
            <button
              onClick={() => setActiveFilter('heirloom')}
              className={`py-2 relative transition-all ${
                activeFilter === 'heirloom'
                  ? 'text-[#775a19] font-bold border-b-2 border-[#775a19]'
                  : 'text-[#615e5c] hover:text-[#1c1c19]'
              }`}
            >
              IX. Bridal Heirlooms
            </button>
          </div>

          {/* Curatorial Meta Bar */}
          <div className="w-full max-w-5xl flex items-center justify-between mt-3 px-2 text-[#7f7667] text-xs font-headline uppercase tracking-wider">
            <div className="flex items-center gap-2">
              <Filter className="w-3.5 h-3.5 text-[#775a19]" />
              <span>Archival Medium Format Glass Plate &amp; 35mm C41</span>
            </div>
            <div className="flex items-center gap-4">
              <span>{filteredPlates.length} Curated Plates Displayed</span>
              {favoritePlates.length > 0 && (
                <span className="text-[#775a19] font-semibold">
                  ♥ {favoritePlates.length} Saved in Family Folio
                </span>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* The Grand Salon Gallery (12-Plate Masonry Wall) */}
      <section className="w-full px-4 sm:px-6 lg:px-8 pb-16">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-12 gap-8 items-start">
          {/* Render Plates with dynamic spans and quote interlude */}
          {filteredPlates.map((plate, index) => {
            const isFaved = favoritePlates.includes(plate.id);

            return (
              <React.Fragment key={plate.id}>
                {/* Insert Curatorial Quote after Plate 5 if visible */}
                {index === 5 && (
                  <div className="md:col-span-12 py-10 px-6 sm:px-12 my-6 bg-[#f6f3ee] border-y border-[#d1c5b4]/50 flex flex-col items-center text-center">
                    <span className="text-[#775a19] font-serif text-3xl mb-1">§</span>
                    <blockquote className="font-headline text-xl sm:text-2xl italic text-[#1c1c19] max-w-3xl leading-snug">
                      “We don't count the megapixels or stage artificial poses. We wait in the shadows for that split second when a proud father hugs his new son-in-law, when the bride wipes away a tear at her Vidai, and when two souls realize their universe has just begun.”
                    </blockquote>
                    <span className="font-headline text-xs uppercase tracking-[0.2em] text-[#7f7667] mt-3">
                      — RK Studios, Haute Heritage
                    </span>
                  </div>
                )}

                <div
                  onClick={() => handlePlateClick(plate)}
                  className={`${plate.colSpanDesktop} flex flex-col group cursor-pointer`}
                >
                  {/* Brass Ornate Frame */}
                  <div className="p-3 bg-white border border-[#d1c5b4]/70 shadow-[0_12px_32px_-8px_rgba(119,90,25,0.1)] relative transition-all duration-500 hover:-translate-y-1 hover:shadow-xl">
                    {/* Brass corner brackets */}
                    <div className="absolute top-2 left-2 w-3 h-3 border-t-2 border-l-2 border-[#c5a059] z-20 pointer-events-none"></div>
                    <div className="absolute top-2 right-2 w-3 h-3 border-t-2 border-r-2 border-[#c5a059] z-20 pointer-events-none"></div>
                    <div className="absolute bottom-2 left-2 w-3 h-3 border-b-2 border-l-2 border-[#c5a059] z-20 pointer-events-none"></div>
                    <div className="absolute bottom-2 right-2 w-3 h-3 border-b-2 border-r-2 border-[#c5a059] z-20 pointer-events-none"></div>

                    {/* Image Container */}
                    <div className={`relative w-full overflow-hidden bg-[#ebe8e3] ${plate.aspectRatio}`}>
                      <img
                        src={plate.imageUrl}
                        alt={plate.caption}
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                        loading="lazy"
                      />

                      {/* Hover Overlay */}
                      <div className="absolute inset-0 bg-gradient-to-t from-[#1c1c19]/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end justify-between p-5 text-white">
                        <div>
                          <span className="font-headline text-[11px] tracking-widest text-[#ffdea5] uppercase block">
                            {plate.location}
                          </span>
                          <span className="font-script text-xl text-white">
                            {plate.couple}
                          </span>
                        </div>
                        <div className="flex items-center gap-2">
                          <button
                            onClick={(e) => toggleFavorite(e, plate.id)}
                            className="w-8 h-8 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center hover:bg-white text-white hover:text-[#775a19] transition-colors"
                            title={isFaved ? 'Saved in Folio' : 'Save to Family Folio'}
                          >
                            <Heart className={`w-4 h-4 ${isFaved ? 'fill-[#775a19] text-[#775a19]' : ''}`} />
                          </button>
                          <div className="w-8 h-8 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center text-white">
                            <Eye className="w-4 h-4" />
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Metadata & Caption */}
                  <div className="mt-3 px-1 flex flex-col gap-1">
                    <div className="flex justify-between items-baseline">
                      <div className="flex items-center gap-2">
                        <span className="font-numeral text-xs text-[#775a19] font-bold tracking-wider">
                          {plate.plateNumber} —
                        </span>
                        <h3 className="font-headline text-base text-[#1c1c19] font-semibold">
                          {plate.title}
                        </h3>
                      </div>
                      <span className="font-numeral text-[11px] text-[#7f7667] uppercase tracking-wider">
                        {plate.gear}
                      </span>
                    </div>
                    <p className="font-serif text-sm text-[#4e4639] italic leading-relaxed">
                      {plate.caption}
                    </p>
                  </div>
                </div>
              </React.Fragment>
            );
          })}
        </div>
      </section>

      {/* Archival Print Guild Section (Leather Folios & Museum Grade Prints) */}
      <section className="w-full px-4 sm:px-6 lg:px-8 py-16 bg-[#f6f3ee] border-t border-[#e5e2dd]">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          {/* Left Editorial Narrative */}
          <div className="lg:col-span-5 flex flex-col gap-4">
            <div className="flex items-center gap-2 text-[#775a19]">
              <Sparkles className="w-4 h-4" />
              <span className="font-headline text-xs uppercase tracking-[0.2em] font-medium text-[#775a19]">
                The Archival Print Guild
              </span>
            </div>

            <h2 className="font-headline text-3xl sm:text-4xl text-[#1c1c19] tracking-tight leading-tight">
              Crafted for Hands That Will Touch These Folios{' '}
              <span className="font-script text-[#c5a059] font-normal text-[1.15em] inline-block">
                Decades Hence
              </span>
            </h2>

            <p className="font-serif text-base text-[#4e4639] leading-relaxed">
              Long after the marigold garlands have dried and the wedding lehenga is wrapped in heirloom muslin, these hand-bound silk and calfskin volumes will rest upon your family mantelpiece — letting your children smell the scent of that holy fire and feel the gentle warmth of their grandparents' blessings.
            </p>

            <div className="grid grid-cols-2 gap-4 pt-2">
              <div className="p-4 bg-white border border-[#d1c5b4]/60">
                <span className="font-numeral text-2xl text-[#775a19] font-bold block">
                  300 Yrs
                </span>
                <span className="font-headline text-[11px] uppercase tracking-wider text-[#7f7667]">
                  Archival Cotton Rag Paper
                </span>
              </div>
              <div className="p-4 bg-white border border-[#d1c5b4]/60">
                <span className="font-numeral text-2xl text-[#775a19] font-bold block">
                  Hand-Stitched
                </span>
                <span className="font-headline text-[11px] uppercase tracking-wider text-[#7f7667]">
                  Silk &amp; Pure Gold Leaf Deboss
                </span>
              </div>
            </div>

            <div className="pt-2">
              <button
                onClick={onNavigateToReserve}
                className="inline-flex items-center gap-3 bg-[#1c1c19] text-[#ffdea5] hover:bg-[#31302d] px-6 py-3 font-headline text-xs tracking-widest uppercase transition-colors shadow-sm"
              >
                <span>Commission Your Family's Heirloom Volume</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Right Album Imagery */}
          <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div className="flex flex-col group">
              <div className="p-2 bg-white border border-[#d1c5b4]/60 shadow-md aspect-[4/5] overflow-hidden">
                <img
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuDY5D3GslIkJ6VNeLvPMUFsE-VhSyOIs3cQO1El1bv-dqRAAIVGRG5n_38Da1mJQRSU1GnIt4IJd47RCDge_DTY0rV1s72nKnkRgSUco5MRYwqJy6rFJ1MB9OejHqziU2jrhhI91RTDlmOkxBx_8mu2Q8mfJx4RAK4OxmpYqhTJIzr8PD9lNHqNm0Kbu4QAPFA5H2PrIBoD3mGZE6-6Vs08tngQJqL8nYpz4Drp5_XtjVduLGwKsFWQ"
                  alt="The Florentine Grand Volume"
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  loading="lazy"
                />
              </div>
              <span className="font-headline text-xs text-[#775a19] uppercase tracking-widest mt-2">
                The Florentine Grand Volume
              </span>
              <span className="font-serif text-xs text-[#7f7667]">
                Vegetable-tanned leather, heavy cotton lustre pages
              </span>
            </div>

            <div className="flex flex-col group mt-0 sm:mt-8">
              <div className="p-2 bg-white border border-[#d1c5b4]/60 shadow-md aspect-[4/5] overflow-hidden">
                <img
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuAqFNPmgTmyUMArcDbBVCmOayGFxVI3XdjNYUDiJJHiABAPz2wFDbA0_pjt3aot-bt77TVlgdSlJhvQdosXZ3c8cJ5fDZWRX34ga0MbwyZfHSz4oXFi4r7EM4-1uyeuH1GqbrfLilZE4CkkxxfjCw2CUPhbipPWKvewI8QxyfKgoRqOQpo2honttn7i_wjm_KHPbYHnSB6RcO54aY__ka8cs92fxXdEIG4RY8UhbVwfijSGqO9OL-Zi"
                  alt="The Deckled Silk Folio Box"
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  loading="lazy"
                />
              </div>
              <span className="font-headline text-xs text-[#775a19] uppercase tracking-widest mt-2">
                The Deckled Silk Folio Box
              </span>
              <span className="font-serif text-xs text-[#7f7667]">
                Museum archival deckled prints with 24k foil seals
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* Authentic Studio Photo Gallery (From RK Photo Studio Rohini) */}
      <section className="w-full px-4 sm:px-6 lg:px-8 py-16 bg-[#F4EFE6] border-t border-[#E0D7CB]">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-4">
            <div>
              <div className="inline-flex items-center gap-2 mb-2 text-[#775a19]">
                <ImageIcon className="w-4 h-4 text-[#C5A059]" />
                <span className="font-headline text-xs uppercase tracking-[0.25em] font-semibold">
                  AUTHENTIC PHOTO GALLERY • ROHINI SECTOR 23
                </span>
              </div>
              <h2 className="font-headline text-3xl sm:text-4xl text-[#1C1C19]">
                Our Studio Gallery &amp; Real Ceremonies
              </h2>
              <p className="font-serif text-base text-[#5D5042] max-w-xl mt-1">
                A glimpse into real Indian weddings, bridal sittings, ancestral restorations, and family milestones captured by RK Photo Studio across Delhi NCR.
              </p>
            </div>

            <div className="flex items-center gap-3">
              <span className="font-sans text-xs text-[#7A6A58] font-medium">
                Showing {Math.min(galleryDisplayCount, STUDIO_GALLERY_PHOTOS.length)} of {STUDIO_GALLERY_PHOTOS.length} Photos
              </span>
              {galleryDisplayCount < STUDIO_GALLERY_PHOTOS.length ? (
                <button
                  onClick={() => setGalleryDisplayCount(prev => Math.min(prev + 12, STUDIO_GALLERY_PHOTOS.length))}
                  className="px-4 py-2 bg-[#45123E] hover:bg-[#320B2C] text-white text-xs font-sans rounded font-semibold transition-colors shadow-xs"
                >
                  Load More Photos
                </button>
              ) : (
                <button
                  onClick={() => setGalleryDisplayCount(12)}
                  className="px-4 py-2 bg-white text-[#45123E] border border-[#45123E] text-xs font-sans rounded font-semibold transition-colors"
                >
                  Show Less
                </button>
              )}
            </div>
          </div>

          {/* Photo Gallery Masonry / Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3 sm:gap-4">
            {STUDIO_GALLERY_PHOTOS.slice(0, galleryDisplayCount).map((imgUrl, idx) => (
              <div
                key={idx}
                onClick={() => setSelectedGalleryPhoto(imgUrl)}
                className="group relative aspect-square bg-[#E8DFD3] rounded-lg overflow-hidden border border-[#D5C9B7] shadow-xs cursor-pointer hover:shadow-lg transition-all"
              >
                <img
                  src={imgUrl}
                  alt={`RK Photo Studio business capture ${idx + 1}`}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                  <div className="w-9 h-9 rounded-full bg-white/90 text-[#1C1C19] flex items-center justify-center shadow-md">
                    <Eye className="w-4 h-4 text-[#45123E]" />
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-8 text-center">
            <p className="font-serif italic text-xs text-[#7A6A58]">
              All gallery images captured and processed at RK Photo Studio Rohini Sector 23, Delhi.
            </p>
          </div>
        </div>
      </section>

      {/* Google Verified Reviews & Client Reflections Section */}
      <section className="w-full px-4 sm:px-6 lg:px-8 py-16 bg-[#F8F3EA] border-t border-[#E2DAD0]">
        <div className="max-w-7xl mx-auto">
          {/* Section Header */}
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-4">
            <div>
              <div className="inline-flex items-center gap-2 mb-2">
                <span className="w-2.5 h-2.5 rounded-full bg-[#34A853]" />
                <span className="font-sans text-[11px] uppercase tracking-widest text-[#45123E] font-bold">
                  Google Business Verified • Rohini Sector 23
                </span>
              </div>
              <h2 className="font-headline text-3xl sm:text-4xl text-[#1C1C19]">
                Client Reflections &amp; Google Reviews
              </h2>
              <p className="font-serif text-base text-[#5D5042] max-w-xl mt-1">
                Real words from families, brides, and grooms whose sacred vows and milestones we have had the honor to capture.
              </p>
            </div>

            {/* Google Rating Overview Badge */}
            <div className="bg-white p-4 rounded-lg border border-[#DCD3C5] shadow-xs flex items-center gap-4 shrink-0">
              <div className="text-center pr-4 border-r border-[#E8DFD3]">
                <div className="flex items-center justify-center gap-1">
                  <span className="font-serif text-3xl font-bold text-[#1C1C19] leading-none">4.9</span>
                  <div className="flex text-[#F4B400]">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-current" />
                    ))}
                  </div>
                </div>
                <span className="font-sans text-[10px] text-[#7C6E5E] uppercase tracking-wider block mt-1">
                  Google Verified
                </span>
              </div>
              <div>
                <span className="font-serif text-xs text-[#2A231C] font-semibold block">
                  RK Photo Studio — Delhi
                </span>
                <span className="font-sans text-[11px] text-[#7C6E5E] block">
                  Opp. SBI Bank, Rohini Sector 23
                </span>
                <a
                  href="https://share.google/XGXzmI1VT65XaGW7H"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-sans text-[11px] text-[#45123E] font-semibold hover:underline inline-flex items-center gap-1 mt-0.5"
                >
                  <span>View Google Profile</span>
                  <ExternalLink className="w-3 h-3 text-[#EE9B42]" />
                </a>
              </div>
            </div>
          </div>

          {/* Reviews Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {GOOGLE_REVIEWS.map((rev) => (
              <div
                key={rev.id}
                className="bg-white p-6 rounded-lg border border-[#E0D7CB] shadow-xs hover:shadow-md transition-shadow flex flex-col justify-between"
              >
                <div>
                  {/* Card Header: Stars & Event Tag */}
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex text-[#F4B400] gap-0.5">
                      {[...Array(rev.rating)].map((_, i) => (
                        <Star key={i} className="w-4 h-4 fill-current" />
                      ))}
                    </div>
                    <span className="font-sans text-[10px] uppercase tracking-wider text-[#7A6956] bg-[#F7F2EA] px-2 py-0.5 rounded">
                      {rev.timeAgo}
                    </span>
                  </div>

                  {/* Review Text */}
                  <p className="font-serif text-sm text-[#3E342B] leading-relaxed italic mb-4">
                    “{rev.reviewText}”
                  </p>
                </div>

                {/* Reviewer Details */}
                <div className="pt-3 border-t border-[#EFE8DE] flex items-center justify-between">
                  <div className="flex items-center gap-2.5">
                    {rev.avatarImg ? (
                      <img 
                        src={rev.avatarImg} 
                        alt={rev.author} 
                        className="w-8 h-8 rounded-full object-cover shrink-0 border border-[#C5A059]/40" 
                        loading="lazy"
                      />
                    ) : (
                      <div className={`w-8 h-8 rounded-full ${rev.avatarBg} text-white flex items-center justify-center font-serif text-xs font-bold shrink-0`}>
                        {rev.author.charAt(0)}
                      </div>
                    )}
                    <div>
                      <span className="font-serif font-bold text-sm text-[#1C1C19] block leading-tight">
                        {rev.author}
                      </span>
                      <span className="font-sans text-[11px] text-[#847565]">
                        {rev.location}
                      </span>
                    </div>
                  </div>

                  {rev.verified && (
                    <div className="flex items-center gap-1 text-[#2E7D32]" title="Verified Google Review">
                      <CheckCircle className="w-3.5 h-3.5" />
                      <span className="font-sans text-[10px] font-semibold">Verified</span>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>

          {/* Bottom Review Action */}
          <div className="mt-8 text-center">
            <a
              href="https://share.google/XGXzmI1VT65XaGW7H"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded bg-[#45123E] hover:bg-[#340C2E] text-white font-sans text-xs uppercase tracking-widest font-semibold transition-all shadow-sm"
            >
              <span>Write a Review on Google Maps</span>
              <ExternalLink className="w-3.5 h-3.5 text-[#EE9B42]" />
            </a>
          </div>
        </div>
      </section>

      {/* Latest Posts & Updates (From RK Photo Studio) */}
      <section className="w-full px-4 sm:px-6 lg:px-8 py-16 bg-[#FAF7F0] border-t border-[#E2DAD0]">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-4">
            <div>
              <div className="inline-flex items-center gap-2 mb-2 text-[#775a19]">
                <BookOpen className="w-4 h-4 text-[#C5A059]" />
                <span className="font-headline text-xs uppercase tracking-[0.25em] font-semibold">
                  FROM THE BUSINESS • LATEST POSTS &amp; UPDATES
                </span>
              </div>
              <h2 className="font-headline text-3xl sm:text-4xl text-[#1C1C19]">
                Studio Journal &amp; Wedding Stories
              </h2>
              <p className="font-serif text-base text-[#5D5042] max-w-xl mt-1">
                Articles, creative philosophies, and local shoot highlights from our Rohini, Delhi team.
              </p>
            </div>
            <a
              href="https://rk-photo-401657.grexa.site"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-4 py-2 border border-[#C5A059] bg-white rounded font-sans text-xs uppercase tracking-wider text-[#45123E] font-semibold hover:bg-[#FAF4E8] transition-colors"
            >
              <span>Visit Official Site</span>
              <ExternalLink className="w-3.5 h-3.5 text-[#C5A059]" />
            </a>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {STUDIO_POSTS.map((post) => (
              <div
                key={post.id}
                className="bg-white rounded-xl overflow-hidden border border-[#DCD3C5] shadow-xs hover:shadow-lg transition-all flex flex-col justify-between group"
              >
                <div>
                  <div className="relative w-full h-52 overflow-hidden bg-[#ECE4D8]">
                    <img
                      src={post.imageUrl}
                      alt={post.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      loading="lazy"
                    />
                    <div className="absolute top-3 left-3 bg-[#1C1C19]/80 backdrop-blur-xs text-white text-[11px] font-sans px-2.5 py-1 rounded font-medium">
                      {post.date}
                    </div>
                  </div>
                  <div className="p-6">
                    <h3 className="font-serif text-lg font-bold text-[#1C1C19] group-hover:text-[#45123E] transition-colors line-clamp-2 leading-snug">
                      {post.title}
                    </h3>
                    <p className="font-serif text-sm text-[#5D5042] leading-relaxed mt-2.5 line-clamp-3">
                      {post.excerpt}
                    </p>

                    <div className="mt-4 pt-4 border-t border-[#F0EBE1] space-y-1.5">
                      {post.highlights.slice(0, 2).map((h, i) => (
                        <div key={i} className="flex items-start gap-1.5 text-xs font-serif text-[#483C2F]">
                          <CheckCircle className="w-3.5 h-3.5 text-[#C5A059] shrink-0 mt-0.5" />
                          <span className="line-clamp-1">{h}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="p-6 pt-0">
                  <button
                    onClick={() => setSelectedPost(post)}
                    className="w-full py-2.5 rounded bg-[#FAF5EB] hover:bg-[#45123E] text-[#45123E] hover:text-white border border-[#D5C9B7] hover:border-[#45123E] font-sans text-xs uppercase tracking-wider font-semibold transition-all flex items-center justify-center gap-1.5 cursor-pointer"
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

      {/* Curatorial Reservation Monograph Banner */}
      <section className="w-full px-4 sm:px-6 lg:px-8 py-16 bg-white text-center border-t border-[#e5e2dd]">
        <div className="max-w-4xl mx-auto flex flex-col items-center">
          <div className="w-10 h-10 mb-3 flex items-center justify-center text-[#775a19]">
            <Camera className="w-8 h-8" />
          </div>
          <h3 className="font-headline text-3xl sm:text-4xl text-[#1c1c19] tracking-tight">
            Every Indian wedding has an unrepeatable soul.{' '}
            <span className="font-script text-[#c5a059] font-normal text-[1.15em] inline-block">
              Entrust us with yours.
            </span>
          </h3>
          <p className="font-serif text-base sm:text-lg text-[#4e4639] mt-3 max-w-2xl leading-relaxed">
            Whether a courtyard wedding in ancestral Rajasthan, an intimate gathering in your family home, or a seaside celebration under the stars — we take only 24 weddings a year to ensure every ritual and prayer receives our entire heart.
          </p>
          <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
            <button
              onClick={handleOpenReserve}
              className="inline-flex items-center gap-2 bg-[#775a19] hover:bg-[#5f4611] text-white px-6 py-3 font-headline text-xs tracking-widest uppercase transition-colors shadow-sm cursor-pointer"
            >
              <span>Speak With Our Wedding Concierge</span>
              <Calendar className="w-4 h-4" />
            </button>
            <button
              onClick={() => onOpenWhatsApp()}
              className="inline-flex items-center gap-2 border border-[#d1c5b4] bg-[#fcf9f4] hover:bg-[#f0ede9] text-[#1c1c19] px-6 py-3 font-headline text-xs tracking-widest uppercase transition-colors cursor-pointer"
            >
              <MessageCircle className="w-4 h-4 text-[#775a19]" />
              <span>Direct WhatsApp Private Line</span>
            </button>
          </div>
          <span className="font-headline text-xs text-[#7f7667] uppercase tracking-widest mt-6 block">
            Direct Inquiries • rkphotostudio23@gmail.com • Rohini Sector 23, Delhi (Opp. SBI Bank) • +91 92128 12625
          </span>
        </div>
      </section>

      {/* Interactive Plate Lightbox Modal */}
      {lightboxPlate && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/85 backdrop-blur-md">
          <div className="relative w-full max-w-5xl bg-[#FAF5EB] border border-[#C5A059]/40 rounded-xl shadow-2xl overflow-hidden flex flex-col max-h-[92vh]">
            {/* Top Modal Bar */}
            <div className="flex items-center justify-between p-4 bg-[#1C1C19] text-[#FAF5EB] border-b border-[#C5A059]/30">
              <div className="flex items-center gap-3">
                <span className="font-sans text-[11px] font-bold uppercase tracking-widest text-[#EE9B42]">
                  {lightboxPlate.plateNumber}
                </span>
                <span className="text-[#C5A059]">•</span>
                <h4 className="font-serif text-lg font-bold text-[#F3EFE6] truncate">
                  {lightboxPlate.title}
                </h4>
              </div>
              <button
                onClick={() => setLightboxPlate(null)}
                className="p-1.5 rounded-full text-[#A89886] hover:text-white hover:bg-white/10 transition-colors"
                aria-label="Close plate view"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            {/* Modal Content */}
            <div className="flex-1 overflow-y-auto grid grid-cols-1 lg:grid-cols-12 bg-[#FAF5EB]">
              {/* Main Photo View */}
              <div className="lg:col-span-8 bg-[#111110] flex items-center justify-center p-2 sm:p-4 min-h-[350px] lg:min-h-[500px]">
                <img
                  src={lightboxPlate.imageUrl}
                  alt={lightboxPlate.caption}
                  className="max-h-[75vh] w-auto max-w-full object-contain shadow-2xl"
                />
              </div>

              {/* Archival Monograph Details */}
              <div className="lg:col-span-4 p-6 flex flex-col justify-between border-t lg:border-t-0 lg:border-l border-[#E2DAD0] bg-[#FAF5EB]">
                <div className="space-y-4">
                  <div className="flex items-center justify-between text-xs font-sans uppercase tracking-wider text-[#7A6A58]">
                    <span>{lightboxPlate.couple}</span>
                    <span>{lightboxPlate.location}</span>
                  </div>

                  <p className="font-serif italic text-base sm:text-lg text-[#3E342B] leading-relaxed border-l-2 border-[#C5A059] pl-3 py-1">
                    “{lightboxPlate.emotionalStory}”
                  </p>

                  <div className="space-y-2.5 pt-2 text-xs text-[#5D5042]">
                    <div className="bg-[#EFE7DC] p-3 rounded border border-[#E0D5C5] space-y-1.5">
                      <div className="flex items-center justify-between font-sans">
                        <span className="font-semibold text-[#45123E]">Medium / Stock:</span>
                        <span>{lightboxPlate.filmStock}</span>
                      </div>
                      <div className="flex items-center justify-between font-sans">
                        <span className="font-semibold text-[#45123E]">Camera &amp; Optics:</span>
                        <span>{lightboxPlate.gear}</span>
                      </div>
                      <div className="flex items-center justify-between font-sans">
                        <span className="font-semibold text-[#45123E]">Plate Catalog:</span>
                        <span>{lightboxPlate.plateNumber}</span>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="pt-6 border-t border-[#E2DAD0] space-y-2 mt-6">
                  <button
                    onClick={() => {
                      setLightboxPlate(null);
                      handleOpenReserve();
                    }}
                    className="w-full py-2.5 rounded bg-[#45123E] hover:bg-[#340C2E] text-white font-serif text-xs uppercase tracking-widest font-semibold transition-colors flex items-center justify-center gap-2"
                  >
                    <Calendar className="w-4 h-4 text-[#EE9B42]" />
                    <span>Inquire For This Ceremony</span>
                  </button>
                  <button
                    onClick={() => {
                      setLightboxPlate(null);
                      onOpenWhatsApp();
                    }}
                    className="w-full py-2.5 rounded bg-[#25D366] hover:bg-[#20ba59] text-white font-sans text-xs uppercase tracking-widest font-bold transition-colors flex items-center justify-center gap-2"
                  >
                    <MessageCircle className="w-4 h-4 fill-current" />
                    <span>Discuss With Atelier Curator</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
      {/* Full-size Gallery Lightbox Modal */}
      {selectedGalleryPhoto && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/90 backdrop-blur-md">
          <div className="relative max-w-4xl max-h-[90vh] bg-[#111110] rounded-xl overflow-hidden border border-[#C5A059]/40 shadow-2xl flex flex-col">
            <div className="flex items-center justify-between p-3 bg-[#1C1C19] text-white border-b border-white/10">
              <span className="font-headline text-xs uppercase tracking-widest text-[#EE9B42]">
                RK Photo Studio Rohini Gallery Archive
              </span>
              <button
                onClick={() => setSelectedGalleryPhoto(null)}
                className="p-1 rounded-full text-white/70 hover:text-white hover:bg-white/10 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            <div className="p-2 sm:p-4 flex items-center justify-center overflow-hidden">
              <img
                src={selectedGalleryPhoto}
                alt="RK Photo Studio full view"
                className="max-h-[75vh] w-auto max-w-full object-contain"
              />
            </div>
            <div className="p-4 bg-[#1C1C19] border-t border-white/10 flex flex-wrap items-center justify-between gap-3">
              <span className="font-serif text-xs text-[#C5A059]">
                Opposite SBI Bank, Sector 20 / 23 Rohini, Delhi • Call: +91 92128 12625
              </span>
              <button
                onClick={() => {
                  setSelectedGalleryPhoto(null);
                  onOpenWhatsApp("Hi RK Photo Studio, I saw this capture from your gallery and would like to inquire about similar wedding / portrait coverage!");
                }}
                className="px-4 py-2 bg-[#25D366] hover:bg-[#20ba59] text-white text-xs font-sans rounded font-bold uppercase tracking-wider flex items-center gap-1.5"
              >
                <MessageCircle className="w-3.5 h-3.5 fill-current" />
                <span>Inquire About This Style</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Post Detail Modal */}
      {selectedPost && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/85 backdrop-blur-md">
          <div className="relative w-full max-w-3xl max-h-[90vh] bg-[#FCF9F4] rounded-xl overflow-hidden border border-[#C5A059]/50 shadow-2xl flex flex-col">
            <div className="flex items-center justify-between p-4 bg-[#1C1C19] text-white border-b border-[#C5A059]/30">
              <div>
                <span className="font-sans text-[11px] uppercase tracking-widest text-[#EE9B42]">
                  {selectedPost.date}
                </span>
                <h4 className="font-serif text-base sm:text-lg font-bold text-[#F5EFE6] line-clamp-1">
                  {selectedPost.title}
                </h4>
              </div>
              <button
                onClick={() => setSelectedPost(null)}
                className="p-1 rounded-full text-white/70 hover:text-white hover:bg-white/10 transition-colors"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto p-6 space-y-4">
              <div className="w-full h-64 sm:h-80 rounded-lg overflow-hidden bg-[#ECE4D8] border border-[#DDD3C5]">
                <img
                  src={selectedPost.imageUrl}
                  alt={selectedPost.title}
                  className="w-full h-full object-cover"
                />
              </div>

              <h3 className="font-serif text-xl sm:text-2xl font-bold text-[#1C1C19]">
                {selectedPost.title}
              </h3>

              <p className="font-serif text-base text-[#4C3F32] leading-relaxed">
                {selectedPost.excerpt}
              </p>

              <p className="font-serif text-sm text-[#5D5042] leading-relaxed">
                {selectedPost.content}
              </p>

              <div className="bg-[#FAF4EB] p-4 rounded-lg border border-[#E5DAC6] space-y-2">
                <span className="font-headline text-xs uppercase tracking-wider text-[#775a19] font-bold block">
                  Studio Highlights:
                </span>
                {selectedPost.highlights.map((h, i) => (
                  <div key={i} className="flex items-start gap-2 text-xs font-serif text-[#3E3225]">
                    <CheckCircle className="w-4 h-4 text-[#C5A059] shrink-0 mt-0.5" />
                    <span>{h}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="p-4 bg-[#F5EFE3] border-t border-[#E0D5C3] flex items-center justify-between gap-3">
              <span className="font-serif text-xs text-[#706253]">
                RK Photo Studio Rohini Sector 23
              </span>
              <button
                onClick={() => {
                  const title = selectedPost.title;
                  setSelectedPost(null);
                  onOpenWhatsApp(`Hi RK Photo Studio, I read your post "${title}" and would like to discuss our wedding plans.`);
                }}
                className="px-5 py-2.5 bg-[#45123E] hover:bg-[#320B2C] text-white rounded font-sans text-xs uppercase tracking-wider font-semibold transition-colors flex items-center gap-2"
              >
                <MessageCircle className="w-4 h-4 text-[#EE9B42]" />
                <span>Discuss on WhatsApp</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
