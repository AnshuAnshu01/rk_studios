import React, { useState, useMemo } from 'react';
import { 
  INVESTMENT_TIERS, 
  DELIVERABLE_MATRIX, 
  ENHANCEMENTS, 
  EXTRA_SERVICES, 
  STUDIO_PRODUCTS, 
  InvestmentTier,
  StudioService,
  StudioProduct 
} from '../data/weddingData';
import { 
  Sparkles, 
  Check, 
  ChevronDown, 
  MessageCircle, 
  FileText, 
  CheckCircle2, 
  Camera, 
  Film, 
  Search, 
  ShoppingBag, 
  Gift, 
  MapPin, 
  Layers, 
  Plane, 
  Users, 
  Printer, 
  Clock, 
  PhoneCall, 
  ArrowRight,
  ShieldCheck,
  Star,
  ExternalLink
} from 'lucide-react';

interface ServicesPricingProps {
  onSelectTier?: (tier: InvestmentTier) => void;
  onOpenWhatsApp: (message?: string) => void;
  currency?: 'INR' | 'USD';
  setCurrency?: (c: 'INR' | 'USD') => void;
}

export const ServicesPricing: React.FC<ServicesPricingProps> = ({
  onSelectTier,
  onOpenWhatsApp
}) => {
  const [activeTab, setActiveTab] = useState<'collections' | 'services' | 'products' | 'enhancements' | 'matrix'>('services');
  const [serviceSearch, setServiceSearch] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [selectedProduct, setSelectedProduct] = useState<StudioProduct | null>(null);
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  // Filtered services
  const filteredServices = useMemo(() => {
    return EXTRA_SERVICES.filter(service => {
      const matchesSearch = 
        service.title.toLowerCase().includes(serviceSearch.toLowerCase()) ||
        service.description.toLowerCase().includes(serviceSearch.toLowerCase());
      const matchesCategory = selectedCategory === 'all' || service.category === selectedCategory;
      return matchesSearch && matchesCategory;
    });
  }, [serviceSearch, selectedCategory]);

  const categoryCounts = useMemo(() => {
    const counts: Record<string, number> = { all: EXTRA_SERVICES.length };
    EXTRA_SERVICES.forEach(s => {
      counts[s.category] = (counts[s.category] || 0) + 1;
    });
    return counts;
  }, []);

  const getCategoryBadgeLabel = (cat: string) => {
    switch (cat) {
      case 'weddings': return 'Wedding & Nuptials';
      case 'cinema': return 'Cinema & Video';
      case 'aerial': return 'Drone & Aerial';
      case 'portraits': return 'Portraits & Events';
      case 'lab': return 'Lab, Framing & Restoration';
      case 'regional': return 'Delhi NCR Hub';
      default: return 'Studio Service';
    }
  };

  const getServiceIcon = (category: string) => {
    switch (category) {
      case 'weddings': return <Camera className="w-4 h-4 text-[#C5A059]" />;
      case 'cinema': return <Film className="w-4 h-4 text-[#C5A059]" />;
      case 'aerial': return <Plane className="w-4 h-4 text-[#C5A059]" />;
      case 'portraits': return <Users className="w-4 h-4 text-[#C5A059]" />;
      case 'lab': return <Printer className="w-4 h-4 text-[#C5A059]" />;
      case 'regional': return <MapPin className="w-4 h-4 text-[#C5A059]" />;
      default: return <Sparkles className="w-4 h-4 text-[#C5A059]" />;
    }
  };

  const handleEnquireService = (title: string) => {
    onOpenWhatsApp(`Namaste RK Photo Studio! I would like to inquire about details and availability for "${title}".`);
  };

  const handleEnquireProduct = (title: string) => {
    onOpenWhatsApp(`Namaste RK Photo Studio! I am interested in ordering the personalized product "${title}". Please share details.`);
  };

  return (
    <div className="w-full bg-[#fcf9f4] text-[#1c1c19]">
      {/* Top Hero Section */}
      <section className="relative w-full px-4 sm:px-6 lg:px-8 pt-10 pb-12 text-center border-b border-[#e5e2dd]">
        <div className="max-w-4xl mx-auto flex flex-col items-center">
          <div className="flex items-center gap-3 mb-3 text-[#775a19]">
            <Sparkles className="w-5 h-5 text-[#775a19]" />
            <span className="font-headline text-xs tracking-[0.3em] uppercase text-[#775a19] font-medium">
              SERVICES &amp; STUDIO CATALOGUE • 17+ YEARS OF EXCELLENCE
            </span>
            <Sparkles className="w-5 h-5 text-[#775a19]" />
          </div>

          <h1 className="font-headline text-4xl sm:text-5xl lg:text-6xl text-[#1c1c19] tracking-tight leading-tight mt-1">
            Services &amp;{' '}
            <span className="font-script text-[#c5a059] font-normal text-[1.25em] inline-block">
              Products
            </span>
          </h1>

          <p className="font-serif text-lg sm:text-xl text-[#4e4639] max-w-3xl mt-4 leading-relaxed">
            From royal Indian wedding monographs and cinematic films to ancestral photo restoration, custom framing, and personalized keepsakes. Every service is tailored with utmost artistic reverence and dedicated consultations.
          </p>

          <div className="flex flex-wrap items-center justify-center gap-4 mt-6 text-xs font-serif text-[#706456]">
            <span className="flex items-center gap-1.5 bg-[#f6f2ea] px-3 py-1.5 rounded-full border border-[#e2dad0]">
              <ShieldCheck className="w-3.5 h-3.5 text-[#2E5A44]" />
              Opposite SBI Bank, Rohini Sector 23
            </span>
            <span className="flex items-center gap-1.5 bg-[#f6f2ea] px-3 py-1.5 rounded-full border border-[#e2dad0]">
              <Clock className="w-3.5 h-3.5 text-[#775a19]" />
              Open Mon–Sun 9:00 AM – 9:00 PM
            </span>
            <span className="flex items-center gap-1.5 bg-[#f6f2ea] px-3 py-1.5 rounded-full border border-[#e2dad0]">
              <PhoneCall className="w-3.5 h-3.5 text-[#45123E]" />
              Direct Studio Line: +91 92128 12625
            </span>
          </div>

          {/* Navigation Sub-Tabs */}
          <div className="w-full max-w-4xl mt-10 pt-4 flex flex-wrap items-center justify-center gap-2 sm:gap-3 text-xs font-headline uppercase tracking-wider">
            <button
              onClick={() => setActiveTab('services')}
              className={`px-4 py-2.5 rounded-lg border transition-all flex items-center gap-2 ${
                activeTab === 'services'
                  ? 'bg-[#45123E] text-white border-[#45123E] shadow-sm font-bold'
                  : 'bg-white text-[#524637] border-[#d8cfc2] hover:bg-[#f5f1eb]'
              }`}
            >
              <Camera className="w-4 h-4 text-[#EE9B42]" />
              <span>All Services ({EXTRA_SERVICES.length})</span>
            </button>

            <button
              onClick={() => setActiveTab('products')}
              className={`px-4 py-2.5 rounded-lg border transition-all flex items-center gap-2 ${
                activeTab === 'products'
                  ? 'bg-[#45123E] text-white border-[#45123E] shadow-sm font-bold'
                  : 'bg-white text-[#524637] border-[#d8cfc2] hover:bg-[#f5f1eb]'
              }`}
            >
              <Gift className="w-4 h-4 text-[#EE9B42]" />
              <span>Personalized Products ({STUDIO_PRODUCTS.length})</span>
            </button>

            <button
              onClick={() => setActiveTab('collections')}
              className={`px-4 py-2.5 rounded-lg border transition-all flex items-center gap-2 ${
                activeTab === 'collections'
                  ? 'bg-[#45123E] text-white border-[#45123E] shadow-sm font-bold'
                  : 'bg-white text-[#524637] border-[#d8cfc2] hover:bg-[#f5f1eb]'
              }`}
            >
              <Sparkles className="w-4 h-4 text-[#EE9B42]" />
              <span>Signature Collections</span>
            </button>

            <button
              onClick={() => setActiveTab('enhancements')}
              className={`px-4 py-2.5 rounded-lg border transition-all flex items-center gap-2 ${
                activeTab === 'enhancements'
                  ? 'bg-[#45123E] text-white border-[#45123E] shadow-sm font-bold'
                  : 'bg-white text-[#524637] border-[#d8cfc2] hover:bg-[#f5f1eb]'
              }`}
            >
              <Layers className="w-4 h-4 text-[#EE9B42]" />
              <span>Archival Enhancements</span>
            </button>

            <button
              onClick={() => setActiveTab('matrix')}
              className={`px-4 py-2.5 rounded-lg border transition-all flex items-center gap-2 ${
                activeTab === 'matrix'
                  ? 'bg-[#45123E] text-white border-[#45123E] shadow-sm font-bold'
                  : 'bg-white text-[#524637] border-[#d8cfc2] hover:bg-[#f5f1eb]'
              }`}
            >
              <FileText className="w-4 h-4 text-[#EE9B42]" />
              <span>Deliverables Matrix</span>
            </button>
          </div>
        </div>
      </section>

      {/* TAB 1: ALL 74 STUDIO SERVICES DIRECTORY */}
      {activeTab === 'services' && (
        <section className="w-full px-4 sm:px-6 lg:px-8 py-12 bg-[#fcf9f4]">
          <div className="max-w-7xl mx-auto">
            {/* Search and Category Filter Bar */}
            <div className="bg-white p-5 rounded-xl border border-[#ded5c7] shadow-xs mb-8 flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div className="relative flex-1">
                <Search className="w-5 h-5 absolute left-3.5 top-1/2 -translate-y-1/2 text-[#9A8B7A]" />
                <input
                  type="text"
                  placeholder="Search among all 74 studio services (e.g. Wedding, Drone, Framing, Video, Restoration)..."
                  value={serviceSearch}
                  onChange={e => setServiceSearch(e.target.value)}
                  className="w-full pl-11 pr-4 py-2.5 bg-[#FAF7F2] border border-[#DDD3C5] rounded-lg font-serif text-sm focus:outline-none focus:border-[#45123E] transition-colors"
                />
              </div>

              {/* Category Pills */}
              <div className="flex flex-wrap items-center gap-1.5 text-xs font-serif">
                <button
                  onClick={() => setSelectedCategory('all')}
                  className={`px-3 py-1.5 rounded-md transition-colors ${
                    selectedCategory === 'all'
                      ? 'bg-[#45123E] text-white font-bold'
                      : 'bg-[#F2ECE1] text-[#554636] hover:bg-[#EAE1D3]'
                  }`}
                >
                  All ({categoryCounts['all']})
                </button>
                <button
                  onClick={() => setSelectedCategory('weddings')}
                  className={`px-3 py-1.5 rounded-md transition-colors ${
                    selectedCategory === 'weddings'
                      ? 'bg-[#45123E] text-white font-bold'
                      : 'bg-[#F2ECE1] text-[#554636] hover:bg-[#EAE1D3]'
                  }`}
                >
                  Weddings ({categoryCounts['weddings'] || 0})
                </button>
                <button
                  onClick={() => setSelectedCategory('cinema')}
                  className={`px-3 py-1.5 rounded-md transition-colors ${
                    selectedCategory === 'cinema'
                      ? 'bg-[#45123E] text-white font-bold'
                      : 'bg-[#F2ECE1] text-[#554636] hover:bg-[#EAE1D3]'
                  }`}
                >
                  Cinema ({categoryCounts['cinema'] || 0})
                </button>
                <button
                  onClick={() => setSelectedCategory('portraits')}
                  className={`px-3 py-1.5 rounded-md transition-colors ${
                    selectedCategory === 'portraits'
                      ? 'bg-[#45123E] text-white font-bold'
                      : 'bg-[#F2ECE1] text-[#554636] hover:bg-[#EAE1D3]'
                  }`}
                >
                  Portraits &amp; Events ({categoryCounts['portraits'] || 0})
                </button>
                <button
                  onClick={() => setSelectedCategory('lab')}
                  className={`px-3 py-1.5 rounded-md transition-colors ${
                    selectedCategory === 'lab'
                      ? 'bg-[#45123E] text-white font-bold'
                      : 'bg-[#F2ECE1] text-[#554636] hover:bg-[#EAE1D3]'
                  }`}
                >
                  Lab, Framing &amp; Print ({categoryCounts['lab'] || 0})
                </button>
                <button
                  onClick={() => setSelectedCategory('regional')}
                  className={`px-3 py-1.5 rounded-md transition-colors ${
                    selectedCategory === 'regional'
                      ? 'bg-[#45123E] text-white font-bold'
                      : 'bg-[#F2ECE1] text-[#554636] hover:bg-[#EAE1D3]'
                  }`}
                >
                  Delhi NCR ({categoryCounts['regional'] || 0})
                </button>
              </div>
            </div>

            {/* Services Grid */}
            {filteredServices.length === 0 ? (
              <div className="bg-white p-12 text-center rounded-xl border border-[#ded5c7]">
                <Camera className="w-10 h-10 text-[#C5A059] mx-auto mb-3" />
                <h3 className="font-serif text-lg font-bold text-[#1C1C19]">No services match your search</h3>
                <p className="font-serif text-sm text-[#6C5F51] mt-1">Try another term or clear the filter to see all 74 studio services.</p>
                <button
                  onClick={() => { setServiceSearch(''); setSelectedCategory('all'); }}
                  className="mt-4 px-4 py-2 bg-[#45123E] text-white rounded text-xs uppercase tracking-wider font-semibold"
                >
                  Reset Search
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                {filteredServices.map((service) => (
                  <div
                    key={service.id}
                    className="bg-white p-6 rounded-xl border border-[#ded5c7] hover:border-[#C5A059] transition-all hover:shadow-md flex flex-col justify-between group"
                  >
                    <div>
                      {/* Top Tag & Icon */}
                      <div className="flex items-center justify-between mb-3">
                        <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded bg-[#FAF5EB] text-[11px] font-sans font-semibold uppercase tracking-wider text-[#775a19] border border-[#E8DFC9]">
                          {getServiceIcon(service.category)}
                          <span>{getCategoryBadgeLabel(service.category)}</span>
                        </span>
                        <span className="font-headline text-[10px] uppercase tracking-widest text-[#9D8E7D]">
                          {service.id.toUpperCase()}
                        </span>
                      </div>

                      <h3 className="font-serif text-xl font-bold text-[#1C1C19] group-hover:text-[#45123E] transition-colors leading-snug">
                        {service.title}
                      </h3>

                      <p className="font-serif text-sm text-[#574B3C] leading-relaxed mt-2.5">
                        {service.description}
                      </p>
                    </div>

                    <div className="pt-5 mt-5 border-t border-[#F0EBE1] flex items-center justify-between gap-3">
                      <span className="font-headline text-[11px] tracking-wider uppercase text-[#7C6E5E] font-medium">
                        Consultation on Request
                      </span>
                      <button
                        onClick={() => handleEnquireService(service.title)}
                        className="inline-flex items-center gap-1.5 px-3.5 py-1.5 bg-[#45123E] hover:bg-[#320B2C] text-white text-xs font-sans rounded font-semibold transition-colors shadow-xs"
                      >
                        <MessageCircle className="w-3.5 h-3.5 text-[#EE9B42]" />
                        <span>Enquire</span>
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </section>
      )}

      {/* TAB 2: PERSONALIZED STUDIO PRODUCTS (FROM GREXA SITE) */}
      {activeTab === 'products' && (
        <section className="w-full px-4 sm:px-6 lg:px-8 py-12 bg-[#f6f2ea] border-t border-[#e5e2dd]">
          <div className="max-w-7xl mx-auto">
            <div className="text-center max-w-3xl mx-auto mb-12">
              <span className="font-headline text-xs text-[#775a19] uppercase tracking-[0.25em] font-semibold block mb-1">
                HANDCRAFTED IN ROHINI ATELIER
              </span>
              <h2 className="font-headline text-3xl sm:text-4xl text-[#1c1c19]">
                Products from RK Photo Studio Rohini Sector 23
              </h2>
              <p className="font-serif text-base text-[#524435] mt-3">
                Tangible heirlooms designed to preserve love stories and auspicious family memories. Made with premium archival materials, custom calligraphy, and handcrafted detailing.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {STUDIO_PRODUCTS.map((prod) => (
                <div
                  key={prod.id}
                  className="bg-white rounded-xl overflow-hidden border border-[#d8cfc2] shadow-xs hover:shadow-lg transition-all flex flex-col justify-between group"
                >
                  <div>
                    {/* Product Image Frame */}
                    <div className="relative w-full h-64 bg-[#f0ede6] overflow-hidden flex items-center justify-center p-3">
                      <img
                        src={prod.imageUrl}
                        alt={prod.title}
                        className="w-full h-full object-contain group-hover:scale-105 transition-transform duration-500"
                        loading="lazy"
                      />
                      <span className="absolute top-3 left-3 bg-[#1C1C19]/85 text-white text-[10px] font-sans uppercase tracking-widest px-2.5 py-1 rounded backdrop-blur-xs font-semibold">
                        {prod.category}
                      </span>
                    </div>

                    {/* Details */}
                    <div className="p-5">
                      <h3 className="font-serif text-lg font-bold text-[#1C1C19] group-hover:text-[#45123E] transition-colors">
                        {prod.title}
                      </h3>
                      <p className="font-serif text-xs text-[#635546] leading-relaxed mt-2">
                        {prod.description}
                      </p>

                      <ul className="mt-4 space-y-1.5 pt-3 border-t border-[#F0EBE1]">
                        {prod.features.map((feat, idx) => (
                          <li key={idx} className="flex items-start gap-1.5 text-[11px] font-serif text-[#4C4033]">
                            <Check className="w-3.5 h-3.5 text-[#C5A059] shrink-0 mt-0.5" />
                            <span>{feat}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>

                  <div className="p-5 pt-0">
                    <button
                      onClick={() => handleEnquireProduct(prod.title)}
                      className="w-full py-2.5 rounded bg-[#45123E] hover:bg-[#320B2C] text-white font-sans text-xs uppercase tracking-wider font-semibold transition-colors flex items-center justify-center gap-2 shadow-xs"
                    >
                      <MessageCircle className="w-4 h-4 text-[#EE9B42]" />
                      <span>Enquire This Product</span>
                    </button>
                  </div>
                </div>
              ))}
            </div>

            {/* Studio Keepsake Assurance Banner */}
            <div className="mt-12 bg-white p-6 sm:p-8 rounded-xl border border-[#C5A059]/40 shadow-xs flex flex-col md:flex-row items-center justify-between gap-6">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-[#FAF5EB] border border-[#E5DAC4] flex items-center justify-center text-[#775a19] shrink-0">
                  <Gift className="w-6 h-6 text-[#775a19]" />
                </div>
                <div>
                  <h4 className="font-serif text-lg font-bold text-[#1C1C19]">
                    Need Custom Framing or Unique Family Gifting?
                  </h4>
                  <p className="font-serif text-sm text-[#615446]">
                    Bring your photographs to our studio opposite SBI Bank in Sector 23 Rohini for immediate framing consultations and custom layout previews.
                  </p>
                </div>
              </div>
              <button
                onClick={() => onOpenWhatsApp("Hi RK Photo Studio, I would like to inquire about customized photo frames and special gift options.")}
                className="shrink-0 px-6 py-3 bg-[#775a19] hover:bg-[#5f4611] text-white font-headline text-xs tracking-widest uppercase transition-colors rounded shadow-xs"
              >
                Discuss Custom Keepsake
              </button>
            </div>
          </div>
        </section>
      )}

      {/* TAB 3: SIGNATURE WEDDING COLLECTIONS (NO PRICES) */}
      {activeTab === 'collections' && (
        <section className="w-full px-4 sm:px-6 lg:px-8 py-16 bg-[#fcf9f4]">
          <div className="max-w-7xl mx-auto">
            <div className="text-center max-w-3xl mx-auto mb-12">
              <span className="font-headline text-xs text-[#775a19] uppercase tracking-[0.25em] font-semibold block mb-1">
                ROYAL BRIDAL MONOGRAPHS
              </span>
              <h2 className="font-headline text-3xl sm:text-4xl text-[#1c1c19]">
                Signature Wedding Collections
              </h2>
              <p className="font-serif text-base text-[#524435] mt-3">
                Archival wedding coverage personally directed with cinema cameras, master prime lenses, drone aerials, and hand-bound Italian leather and silk heirloom volumes.
              </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-stretch">
              {INVESTMENT_TIERS.map((tier) => (
                <div
                  key={tier.id}
                  className={`relative bg-white flex flex-col justify-between p-8 border transition-all ${
                    tier.isPatronPreferred
                      ? 'border-[#775a19] shadow-xl ring-1 ring-[#775a19]'
                      : 'border-[#d1c5b4]/60 shadow-xs hover:shadow-md'
                  }`}
                >
                  {tier.isPatronPreferred && (
                    <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 bg-[#775a19] text-white font-headline text-[10px] tracking-[0.2em] uppercase px-4 py-1 shadow-sm font-semibold">
                      Patron Preferred • Most Revered
                    </div>
                  )}

                  <div>
                    {/* Collection Header */}
                    <div className="border-b border-[#e5e2dd] pb-6 mb-6">
                      <span className="font-headline text-xs text-[#775a19] tracking-widest uppercase block mb-1">
                        {tier.collectionNumber}
                      </span>
                      <h3 className="font-headline text-3xl text-[#1c1c19]">
                        {tier.name}{' '}
                        <span className="font-script text-[#c5a059] font-normal text-[1.15em] inline-block">
                          {tier.nameHighlight}
                        </span>
                      </h3>
                      <p className="font-serif italic text-sm text-[#4e4639] mt-1">
                        {tier.subtitle}
                      </p>

                      {/* Tailored Proposal Note (Zero Prices!) */}
                      <div className="mt-5 p-3 rounded bg-[#FAF7F2] border border-[#E8DFC9] text-center">
                        <span className="font-headline text-xs uppercase tracking-widest text-[#775a19] font-semibold block">
                          Tailored Archival Proposal
                        </span>
                        <span className="font-serif text-xs text-[#6A5D4D] block mt-0.5">
                          {tier.duration}
                        </span>
                      </div>
                    </div>

                    {/* Features List */}
                    <div className="space-y-4 mb-8">
                      <span className="font-headline text-xs uppercase tracking-wider text-[#775a19] font-medium block">
                        Included Inclusions &amp; Guild:
                      </span>
                      {tier.features.map((feat, idx) => (
                        <div key={idx} className="flex items-start gap-3">
                          <Check className="w-4 h-4 text-[#775a19] shrink-0 mt-0.5" />
                          <div className="text-sm font-serif">
                            <strong className="text-[#1c1c19] font-medium">{feat.label}: </strong>
                            <span className="text-[#4e4639]">{feat.detail}</span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="pt-6 border-t border-[#e5e2dd] flex flex-col gap-2.5">
                    <button
                      onClick={() => {
                        if (onSelectTier) onSelectTier(tier);
                        onOpenWhatsApp(`Hello RK Photo Studio! I would like to reserve dates and request the proposal for "${tier.name} ${tier.nameHighlight}".`);
                      }}
                      className={`w-full py-3.5 font-headline text-xs uppercase tracking-widest transition-all text-center cursor-pointer font-bold ${
                        tier.isPatronPreferred
                          ? 'bg-[#775a19] hover:bg-[#5f4611] text-white shadow-sm'
                          : 'bg-[#1c1c19] hover:bg-[#45123E] text-white'
                      }`}
                    >
                      {tier.ctaText}
                    </button>
                    <button
                      onClick={() => onOpenWhatsApp(`Inquiry regarding ${tier.name} ${tier.nameHighlight} collection details and custom inclusions.`)}
                      className="w-full py-2.5 font-serif text-xs text-[#524435] hover:text-[#1c1c19] flex items-center justify-center gap-1.5 transition-colors"
                    >
                      <MessageCircle className="w-3.5 h-3.5 text-[#C5A059]" />
                      <span>Chat with Studio Concierge</span>
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* TAB 4: ARCHIVAL ENHANCEMENTS & BESPOKE UPGRADES (NO PRICES) */}
      {activeTab === 'enhancements' && (
        <section className="w-full px-4 sm:px-6 lg:px-8 py-16 bg-[#f6f3ee] border-t border-[#e5e2dd]">
          <div className="max-w-7xl mx-auto">
            <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-4">
              <div>
                <span className="font-headline text-xs text-[#775a19] uppercase tracking-[0.25em] block mb-1 font-semibold">
                  A LA CARTE COUTURE
                </span>
                <h2 className="font-headline text-3xl sm:text-4xl text-[#1c1c19]">
                  Archival Additions &amp; Production Extensions
                </h2>
              </div>
              <p className="font-serif text-base text-[#4e4639] max-w-md">
                Bespoke technical extensions seamlessly woven into your primary wedding coverage or standalone studio commissions.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {ENHANCEMENTS.map((enh) => (
                <div
                  key={enh.code}
                  className="bg-white p-6 rounded-xl border border-[#d1c5b4]/60 shadow-xs hover:border-[#775a19] transition-all flex flex-col justify-between"
                >
                  <div>
                    <div className="flex items-center justify-between mb-3">
                      <span className="font-headline text-[10px] text-[#775a19] uppercase tracking-widest font-semibold px-2.5 py-1 bg-[#fcf9f4] border border-[#e5e2dd] rounded">
                        {enh.badge}
                      </span>
                      <span className="font-headline text-[10px] uppercase tracking-widest text-[#9c9183]">
                        {enh.code}
                      </span>
                    </div>

                    <h3 className="font-headline text-lg text-[#1c1c19] font-medium leading-snug">
                      {enh.title}
                    </h3>
                    <p className="font-serif text-sm text-[#4e4639] mt-2.5 leading-relaxed">
                      {enh.description}
                    </p>
                  </div>

                  <div className="pt-4 mt-6 border-t border-[#e5e2dd] flex items-center justify-between">
                    <span className="font-headline text-[11px] uppercase tracking-wider text-[#706354]">
                      Inquire for Integration
                    </span>
                    <button
                      onClick={() => onOpenWhatsApp(`Hi RK Photo Studio, I would like to add "${enh.title}" to our wedding package.`)}
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded bg-[#45123E] hover:bg-[#320B2C] text-white text-xs font-sans font-semibold transition-colors"
                    >
                      <MessageCircle className="w-3.5 h-3.5 text-[#EE9B42]" />
                      <span>Inquire</span>
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* TAB 5: DELIVERABLES MATRIX (NO PRICES) */}
      {activeTab === 'matrix' && (
        <section className="w-full px-4 sm:px-6 lg:px-8 py-16 bg-[#fcf9f4]">
          <div className="max-w-7xl mx-auto">
            <div className="text-center max-w-3xl mx-auto mb-10">
              <span className="font-headline text-xs text-[#775a19] uppercase tracking-[0.25em] font-semibold block mb-1">
                TRANSPARENT ARTISAN SPECIFICATIONS
              </span>
              <h2 className="font-headline text-3xl sm:text-4xl text-[#1c1c19]">
                Deliverable Comparison Matrix
              </h2>
              <p className="font-serif text-base text-[#4e4639] mt-2">
                A rigorous overview of equipment, coverage durations, master plates, and physical heirlooms.
              </p>
            </div>

            <div className="overflow-x-auto bg-white border border-[#d1c5b4]/60 shadow-xs rounded-xl">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-[#FAF7F2] border-b border-[#e5e2dd]">
                    <th className="p-4 sm:p-5 font-headline text-xs uppercase tracking-wider text-[#1c1c19]">
                      Artisan Discipline
                    </th>
                    <th className="p-4 sm:p-5 font-headline text-xs uppercase tracking-wider text-[#775a19]">
                      The Atelier
                    </th>
                    <th className="p-4 sm:p-5 font-headline text-xs uppercase tracking-wider text-[#775a19] bg-[#FAF3E6]">
                      The Golden (Preferred)
                    </th>
                    <th className="p-4 sm:p-5 font-headline text-xs uppercase tracking-wider text-[#775a19]">
                      The Imperial
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#e5e2dd] font-serif text-sm">
                  {DELIVERABLE_MATRIX.map((row, idx) => (
                    <tr key={idx} className="hover:bg-[#fcf9f4]/50 transition-colors">
                      <td className="p-4 sm:p-5 font-headline text-xs uppercase tracking-wider text-[#1c1c19] bg-[#FAF7F2]/50 font-medium">
                        {row.discipline}
                      </td>
                      <td className="p-4 sm:p-5 text-[#4e4639]">
                        {row.monograph}
                      </td>
                      <td className="p-4 sm:p-5 text-[#1c1c19] font-medium bg-[#FAF3E6]/40">
                        {row.golden}
                      </td>
                      <td className="p-4 sm:p-5 text-[#4e4639]">
                        {row.imperial}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="mt-8 text-center">
              <button
                onClick={() => onOpenWhatsApp("Hello! I would like to review the Deliverables Matrix and discuss a customized wedding photography plan.")}
                className="px-6 py-3 bg-[#45123E] hover:bg-[#340C2E] text-white font-headline text-xs uppercase tracking-widest font-semibold transition-colors rounded shadow-xs"
              >
                Discuss Tailored Deliverables on WhatsApp
              </button>
            </div>
          </div>
        </section>
      )}

      {/* Flagship Studio Consultation & Location Canopy */}
      <section className="w-full px-4 sm:px-6 lg:px-8 py-14 bg-white border-t border-[#e5e2dd]">
        <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
          <div>
            <span className="font-headline text-xs text-[#775a19] uppercase tracking-[0.25em] font-semibold block mb-1">
              VISIT OUR ROHINI STUDIO
            </span>
            <h3 className="font-headline text-3xl text-[#1c1c19] leading-tight">
              Opposite State Bank of India (SBI), Pooth Kalan, Rohini Sector 23
            </h3>
            <p className="font-serif text-sm sm:text-base text-[#544738] mt-3 leading-relaxed">
              We welcome couples and families to visit our studio in person to touch our Florentine leather albums, inspect sample print finishes, view high-definition cinematic reels on calibrated monitors, and discuss custom packages over fresh masala chai.
            </p>

            <div className="mt-5 space-y-2 text-xs font-serif text-[#4B3E30]">
              <div className="flex items-center gap-2">
                <MapPin className="w-4 h-4 text-[#EE9B42]" />
                <span>Opposite SBI Bank, Pooth Kalan, Sector 20 / Sector 23, Rohini, Delhi – 110086</span>
              </div>
              <div className="flex items-center gap-2">
                <Clock className="w-4 h-4 text-[#EE9B42]" />
                <span>Monday to Sunday: 9:00 AM – 9:00 PM (7 Days Open)</span>
              </div>
              <div className="flex items-center gap-2">
                <PhoneCall className="w-4 h-4 text-[#EE9B42]" />
                <span>Direct Mobile: 9212812625 / 92128 12625</span>
              </div>
            </div>

            <div className="mt-6 flex flex-wrap items-center gap-3">
              <a
                href="https://share.google/XGXzmI1VT65XaGW7H"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-4 py-2.5 bg-[#45123E] hover:bg-[#340C2E] text-white rounded font-sans text-xs uppercase tracking-wider font-semibold transition-colors"
              >
                <span>Open Google Maps Pin</span>
                <ExternalLink className="w-3.5 h-3.5 text-[#EE9B42]" />
              </a>
              <button
                onClick={() => onOpenWhatsApp("Hi RK Photo Studio! I would like to schedule an in-person studio visit to view wedding albums and discuss options.")}
                className="inline-flex items-center gap-2 px-4 py-2.5 border border-[#C5A059] bg-[#FAF5EB] hover:bg-[#F3EAD8] text-[#1C1C19] rounded font-sans text-xs uppercase tracking-wider font-semibold transition-colors"
              >
                <MessageCircle className="w-3.5 h-3.5 text-[#25D366]" />
                <span>Schedule Studio Visit</span>
              </button>
            </div>
          </div>

          <div className="bg-[#FAF7F2] p-6 rounded-xl border border-[#ded5c7] space-y-4">
            <h4 className="font-serif text-base font-bold text-[#1C1C19] flex items-center gap-2">
              <Star className="w-4 h-4 text-[#F4B400] fill-current" />
              <span>Frequently Asked Questions</span>
            </h4>

            <div className="space-y-3">
              {[
                {
                  q: 'Do you offer custom packages without fixed price constraints?',
                  a: 'Yes, absolutely. Because every wedding varies in number of functions, guest sizes, and multi-city travel, we create bespoke packages tailored strictly to your specific needs so you only pay for what you actually require.'
                },
                {
                  q: 'Can you restore very old, torn family photos of Dada-Pardada?',
                  a: 'Yes! As highlighted in our authentic customer reviews, we specialize in advanced archival photo restoration. We repair creases, restore faded colors, enhance facial features, and provide fresh museum-grade framed copies.'
                },
                {
                  q: 'How quickly are the final wedding album and cinema films delivered?',
                  a: 'We deliver initial social media teasers within 72 hours. Full cinematic wedding films and master retouched photo folios are delivered within 4 to 6 weeks, followed by album design approval and handcrafting.'
                },
                {
                  q: 'Do you provide photo booth rentals and drone coverage across Delhi NCR?',
                  a: 'Yes, we provide licensed aerial drone operators and customized photo booth rental stations for weddings and parties across Rohini, Pitampura, Paschim Vihar, Kanjhawala, and greater Delhi NCR.'
                }
              ].map((item, i) => (
                <div key={i} className="border border-[#E2DAD0] rounded-lg bg-white overflow-hidden">
                  <button
                    onClick={() => setOpenFaq(openFaq === i ? null : i)}
                    className="w-full text-left p-3.5 font-serif text-sm font-semibold text-[#1C1C19] flex items-center justify-between gap-2"
                  >
                    <span>{item.q}</span>
                    <ChevronDown className={`w-4 h-4 text-[#775a19] shrink-0 transition-transform ${openFaq === i ? 'rotate-180' : ''}`} />
                  </button>
                  {openFaq === i && (
                    <div className="p-3.5 pt-0 font-serif text-xs text-[#5E5142] leading-relaxed border-t border-[#F0EBE1]">
                      {item.a}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
