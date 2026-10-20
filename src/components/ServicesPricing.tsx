import React, { useState, useMemo } from 'react';
import { 
  INVESTMENT_TIERS, 
  DELIVERABLE_MATRIX, 
  ENHANCEMENTS, 
  EXTRA_SERVICES, 
  STUDIO_PRODUCTS, 
  InvestmentTier
} from '../data/weddingData';
import { 
  Sparkles, 
  Check, 
  CheckCircle2, 
  ChevronDown, 
  MessageCircle, 
  FileText, 
  Camera, 
  Film, 
  Search, 
  Gift, 
  MapPin, 
  Layers, 
  Plane, 
  Users, 
  Printer, 
  Clock, 
  PhoneCall, 
  ShieldCheck, 
  ExternalLink 
} from 'lucide-react';
import { PageHero } from './PageHero';

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
  const [activeTab, setActiveTab] = useState<'collections' | 'services' | 'products' | 'enhancements' | 'matrix'>('collections');
  const [serviceSearch, setServiceSearch] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
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
      case 'weddings': return <Camera className="w-4 h-4 text-[#45123E]" />;
      case 'cinema': return <Film className="w-4 h-4 text-[#45123E]" />;
      case 'aerial': return <Plane className="w-4 h-4 text-[#45123E]" />;
      case 'portraits': return <Users className="w-4 h-4 text-[#45123E]" />;
      case 'lab': return <Printer className="w-4 h-4 text-[#45123E]" />;
      case 'regional': return <MapPin className="w-4 h-4 text-[#45123E]" />;
      default: return <Sparkles className="w-4 h-4 text-[#45123E]" />;
    }
  };

  const handleEnquireService = (title: string) => {
    onOpenWhatsApp(`Namaste RK Photo Studio! I would like to inquire about details and availability for "${title}".`);
  };

  const handleEnquireProduct = (title: string) => {
    onOpenWhatsApp(`Namaste RK Photo Studio! I am interested in ordering the personalized product "${title}". Please share details.`);
  };

  return (
    <div className="w-full bg-[#fcf9f4] text-[#1c1c19] min-h-screen pb-16 font-sans">
      
      {/* 1. Page Hero with Glowing Fire Background & Photos Moving Left to Right */}
      <PageHero
        badge="Transparent Pricing & Collections"
        title="An Investment in"
        titleHighlight="Generational Love"
        subtitle="The laughter of childhood friends, the proud gaze of a father, and vows whispered before the sacred havan agni. We treat every celebration as a priceless family heirloom."
        primaryAction={{
          label: "Inquire via WhatsApp",
          onClick: () => onOpenWhatsApp("Pranam! We would love to discuss wedding photography collections and custom quotes.")
        }}
        secondaryAction={{
          label: "Call Studio (+91 92128 12625)",
          onClick: () => window.open('tel:+919212812625')
        }}
      />

      {/* Navigation Sub-Tabs Bar */}
      <div className="w-full px-3 sm:px-6 lg:px-12 py-3 sm:py-5 bg-white/85 border-b border-[#e5dfd5] sticky top-16 sm:top-20 z-30 backdrop-blur-md">
        <div className="max-w-7xl mx-auto flex items-center overflow-x-auto scrollbar-none pb-1 sm:pb-0 sm:flex-wrap sm:justify-center gap-1.5 sm:gap-3 text-xs font-sans uppercase tracking-wider -mx-3 px-3 sm:mx-0 sm:px-0">
          <button
            onClick={() => setActiveTab('collections')}
            className={`px-3.5 sm:px-4 py-2 rounded-full border transition-all flex items-center gap-1.5 sm:gap-2 cursor-pointer shrink-0 whitespace-nowrap ${
              activeTab === 'collections'
                ? 'bg-[#45123E] text-white border-[#45123E] shadow-sm font-bold'
                : 'bg-white text-[#594d3f] border-[#ded5c7] hover:text-[#1c1c19] hover:border-[#45123E]'
            }`}
          >
            <Sparkles className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-[#e8d5b7]" />
            <span>Wedding Collections</span>
          </button>

          <button
            onClick={() => setActiveTab('services')}
            className={`px-3.5 sm:px-4 py-2 rounded-full border transition-all flex items-center gap-1.5 sm:gap-2 cursor-pointer shrink-0 whitespace-nowrap ${
              activeTab === 'services'
                ? 'bg-[#45123E] text-white border-[#45123E] shadow-sm font-bold'
                : 'bg-white text-[#594d3f] border-[#ded5c7] hover:text-[#1c1c19] hover:border-[#45123E]'
            }`}
          >
            <Camera className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-[#e8d5b7]" />
            <span>All Studio Services ({EXTRA_SERVICES.length})</span>
          </button>

          <button
            onClick={() => setActiveTab('products')}
            className={`px-3.5 sm:px-4 py-2 rounded-full border transition-all flex items-center gap-1.5 sm:gap-2 cursor-pointer shrink-0 whitespace-nowrap ${
              activeTab === 'products'
                ? 'bg-[#45123E] text-white border-[#45123E] shadow-sm font-bold'
                : 'bg-white text-[#594d3f] border-[#ded5c7] hover:text-[#1c1c19] hover:border-[#45123E]'
            }`}
          >
            <Gift className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-[#e8d5b7]" />
            <span>Personalized Keepsakes ({STUDIO_PRODUCTS.length})</span>
          </button>

          <button
            onClick={() => setActiveTab('enhancements')}
            className={`px-3.5 sm:px-4 py-2 rounded-full border transition-all flex items-center gap-1.5 sm:gap-2 cursor-pointer shrink-0 whitespace-nowrap ${
              activeTab === 'enhancements'
                ? 'bg-[#45123E] text-white border-[#45123E] shadow-sm font-bold'
                : 'bg-white text-[#594d3f] border-[#ded5c7] hover:text-[#1c1c19] hover:border-[#45123E]'
            }`}
          >
            <Layers className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-[#e8d5b7]" />
            <span>Heirloom Enhancements</span>
          </button>

          <button
            onClick={() => setActiveTab('matrix')}
            className={`px-3.5 sm:px-4 py-2 rounded-full border transition-all flex items-center gap-1.5 sm:gap-2 cursor-pointer shrink-0 whitespace-nowrap ${
              activeTab === 'matrix'
                ? 'bg-[#45123E] text-white border-[#45123E] shadow-sm font-bold'
                : 'bg-white text-[#594d3f] border-[#ded5c7] hover:text-[#1c1c19] hover:border-[#45123E]'
            }`}
          >
            <FileText className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-[#e8d5b7]" />
            <span>Deliverables Matrix</span>
          </button>
        </div>
      </div>

      {/* TAB 1: ALL 74 STUDIO SERVICES DIRECTORY */}
      {activeTab === 'services' && (
        <section className="w-full px-4 sm:px-8 lg:px-12 py-8 sm:py-12">
          <div className="max-w-7xl mx-auto">
            
            {/* Search and Category Filter Bar */}
            <div className="glass-card bg-white p-4 sm:p-5 rounded-2xl sm:rounded-3xl border border-[#ded5c7] mb-6 sm:mb-8 flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div className="relative flex-1">
                <Search className="w-4 h-4 sm:w-5 sm:h-5 absolute left-3.5 sm:left-4 top-1/2 -translate-y-1/2 text-[#786a5a]" />
                <input
                  type="text"
                  placeholder="Search among all 74 studio services..."
                  value={serviceSearch}
                  onChange={e => setServiceSearch(e.target.value)}
                  className="w-full pl-10 sm:pl-12 pr-4 py-2.5 sm:py-3 bg-[#FAF5EB] border border-[#ded5c7] rounded-xl sm:rounded-2xl font-sans text-xs sm:text-sm text-[#1c1c19] placeholder-gray-500 focus:outline-none focus:border-[#45123E] transition-colors"
                />
              </div>

              {/* Category Pills - Smooth horizontal swipe on smartphone */}
              <div className="flex items-center overflow-x-auto scrollbar-none pb-1 sm:pb-0 sm:flex-wrap gap-1.5 text-xs font-sans -mx-2 px-2 sm:mx-0 sm:px-0">
                {[
                  { id: 'all', label: `All (${categoryCounts['all']})` },
                  { id: 'weddings', label: `Weddings (${categoryCounts['weddings'] || 0})` },
                  { id: 'cinema', label: `Cinema (${categoryCounts['cinema'] || 0})` },
                  { id: 'portraits', label: `Portraits (${categoryCounts['portraits'] || 0})` },
                  { id: 'lab', label: `Lab & Framing (${categoryCounts['lab'] || 0})` },
                  { id: 'regional', label: `Delhi NCR (${categoryCounts['regional'] || 0})` },
                ].map((cat) => (
                  <button
                    key={cat.id}
                    onClick={() => setSelectedCategory(cat.id)}
                    className={`px-3 py-1.5 rounded-full transition-all cursor-pointer shrink-0 whitespace-nowrap text-[11px] sm:text-xs ${
                      selectedCategory === cat.id
                        ? 'bg-[#45123E] text-white font-bold shadow-xs'
                        : 'bg-[#FAF5EB] text-[#594d3f] hover:text-[#1c1c19] border border-[#ded5c7]'
                    }`}
                  >
                    {cat.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Services Grid */}
            {filteredServices.length === 0 ? (
              <div className="glass-card bg-white p-8 sm:p-12 text-center rounded-2xl sm:rounded-3xl border border-[#ded5c7]">
                <Camera className="w-10 h-10 text-[#a78b71] mx-auto mb-3" />
                <h3 className="font-serif italic text-lg sm:text-xl font-bold text-[#1c1c19]">No services match your search</h3>
                <p className="font-sans text-xs text-[#594d3f] mt-1 font-normal">Try another term or clear the filter to see all 74 studio disciplines.</p>
                <button
                  onClick={() => { setServiceSearch(''); setSelectedCategory('all'); }}
                  className="mt-4 px-5 py-2.5 bg-[#45123E] text-white rounded-full text-xs uppercase tracking-wider font-bold hover:bg-[#340C2E] transition-all cursor-pointer shadow-md"
                >
                  Reset Search
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5">
                {filteredServices.map((service) => (
                  <div
                    key={service.id}
                    className="glass-card bg-white p-5 sm:p-6 rounded-2xl sm:rounded-3xl border border-[#ded5c7] hover:border-[#45123E] flex flex-col justify-between group shadow-2xs hover:shadow-md transition-all"
                  >
                    <div>
                      {/* Top Tag & Icon */}
                      <div className="flex items-center justify-between mb-4">
                        <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#FAF5EB] text-[10px] font-sans font-bold uppercase tracking-wider text-[#45123E] border border-[#e5ded4]">
                          {getServiceIcon(service.category)}
                          <span>{getCategoryBadgeLabel(service.category)}</span>
                        </span>
                        <span className="font-sans text-[10px] uppercase tracking-widest text-[#786a5a] font-mono font-medium">
                          {service.id.toUpperCase()}
                        </span>
                      </div>

                      <h3 className="font-serif italic text-xl font-bold text-[#1c1c19] group-hover:text-[#45123E] transition-colors leading-snug">
                        {service.title}
                      </h3>

                      <p className="font-sans text-xs text-[#594d3f] leading-relaxed mt-2.5">
                        {service.description}
                      </p>
                    </div>

                    <div className="pt-5 mt-5 border-t border-[#e8dfd2] flex items-center justify-between gap-3">
                      <span className="font-sans text-[10px] tracking-wider uppercase text-[#786a5a] font-medium">
                        Custom Proposal
                      </span>
                      <button
                        onClick={() => handleEnquireService(service.title)}
                        className="inline-flex items-center gap-1.5 px-4 py-2 bg-[#45123E] hover:bg-[#340C2E] text-white text-xs font-sans rounded-full font-bold transition-all shadow-xs cursor-pointer"
                      >
                        <MessageCircle className="w-3.5 h-3.5 fill-current text-[#25D366]" />
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

      {/* TAB 2: PERSONALIZED STUDIO PRODUCTS */}
      {activeTab === 'products' && (
        <section className="w-full px-6 sm:px-8 lg:px-12 py-12">
          <div className="max-w-7xl mx-auto">
            <div className="text-center max-w-3xl mx-auto mb-12">
              <span className="font-sans text-[11px] text-[#775a19] uppercase tracking-[0.25em] font-bold block mb-1">
                HANDCRAFTED IN ROHINI ATELIER
              </span>
              <h2 className="font-serif italic text-3xl sm:text-4xl text-[#1c1c19] font-normal">
                Tangible Heirlooms &amp; Keepsakes
              </h2>
              <p className="font-sans text-xs sm:text-sm text-[#594d3f] mt-2">
                Tangible heirlooms designed to preserve love stories and auspicious family memories. Made with premium archival materials, custom calligraphy, and handcrafted detailing.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {STUDIO_PRODUCTS.map((prod) => (
                <div
                  key={prod.id}
                  className="glass-card bg-white rounded-3xl overflow-hidden flex flex-col justify-between group border border-[#ded5c7] shadow-2xs hover:shadow-lg transition-all"
                >
                  <div>
                    {/* Product Image Frame */}
                    <div className="relative w-full h-60 bg-[#FAF5EB] overflow-hidden flex items-center justify-center p-3 border-b border-[#ded5c7]">
                      <img
                        src={prod.imageUrl}
                        alt={prod.title}
                        className="w-full h-full object-contain group-hover:scale-105 transition-transform duration-500"
                        loading="lazy"
                      />
                      <span className="absolute top-3 left-3 bg-[#45123E] text-white text-[9px] font-sans uppercase tracking-widest px-2.5 py-1 rounded-full font-bold shadow-xs">
                        {prod.category}
                      </span>
                    </div>

                    {/* Details */}
                    <div className="p-6">
                      <h3 className="font-serif italic text-lg font-bold text-[#1c1c19] group-hover:text-[#45123E] transition-colors">
                        {prod.title}
                      </h3>
                      <p className="font-sans text-xs text-[#594d3f] leading-relaxed mt-2">
                        {prod.description}
                      </p>

                      <ul className="mt-4 space-y-1.5 pt-3 border-t border-[#e8dfd2]">
                        {prod.features.map((feat, idx) => (
                          <li key={idx} className="flex items-start gap-1.5 text-[11px] font-sans text-[#4a3d31]">
                            <Check className="w-3 h-3 text-[#775a19] shrink-0 mt-0.5" />
                            <span>{feat}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>

                  <div className="p-6 pt-0">
                    <button
                      onClick={() => handleEnquireProduct(prod.title)}
                      className="w-full py-2.5 rounded-full bg-[#FAF5EB] hover:bg-[#45123E] text-[#45123E] hover:text-white font-sans text-xs uppercase tracking-wider font-bold transition-all flex items-center justify-center gap-2 border border-[#ded5c7] cursor-pointer shadow-2xs"
                    >
                      <MessageCircle className="w-4 h-4 text-[#25D366] fill-current" />
                      <span>Enquire This Keepsake</span>
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* TAB 3: SIGNATURE WEDDING COLLECTIONS */}
      {activeTab === 'collections' && (
        <section className="w-full px-4 sm:px-8 lg:px-12 py-8 sm:py-12">
          <div className="max-w-7xl mx-auto">
            <div className="text-center max-w-3xl mx-auto mb-8 sm:mb-12">
              <span className="font-sans text-[10px] sm:text-[11px] text-[#775a19] uppercase tracking-[0.25em] font-bold block mb-1">
                ROYAL BRIDAL MONOGRAPHS
              </span>
              <h2 className="font-serif italic text-2xl sm:text-4xl text-[#1c1c19] font-normal">
                Signature Wedding Collections
              </h2>
              <p className="font-sans text-xs sm:text-sm text-[#594d3f] mt-2 px-2">
                Archival wedding coverage personally directed with cinema cameras, master prime lenses, drone aerials, and hand-bound Italian leather and silk heirloom volumes.
              </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 sm:gap-8 items-stretch">
              {INVESTMENT_TIERS.map((tier) => (
                <div
                  key={tier.id}
                  className={`relative bg-white rounded-2xl sm:rounded-3xl flex flex-col justify-between p-6 sm:p-10 transition-all border ${
                    tier.isPatronPreferred
                      ? 'border-[#45123E] shadow-xl sm:shadow-2xl ring-2 ring-[#45123E]/20 lg:-translate-y-2'
                      : 'border-[#ded5c7] hover:border-[#a78b71] shadow-2xs'
                  }`}
                >
                  {tier.isPatronPreferred && (
                    <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 px-3.5 sm:px-4 py-1 rounded-full bg-[#45123E] text-white font-sans text-[9px] sm:text-[10px] font-extrabold uppercase tracking-[0.2em] shadow-md whitespace-nowrap">
                      Patron Preferred • Most Revered
                    </div>
                  )}

                  <div>
                    {/* Collection Header */}
                    <div className="border-b border-[#e8dfd2] pb-6 mb-6">
                      <span className="font-sans text-[10px] uppercase tracking-[0.25em] text-[#775a19] font-bold block mb-1">
                        {tier.collectionNumber}
                      </span>
                      <h3 className="font-serif italic text-2xl sm:text-3xl font-bold text-[#1c1c19]">
                        {tier.name} <span className="text-[#a78b71]">{tier.nameHighlight}</span>
                      </h3>
                      <p className="font-sans text-xs text-[#6b5d4e] mt-1">
                        {tier.subtitle}
                      </p>

                      <div className="mt-5 p-3.5 rounded-2xl bg-[#FAF5EB] border border-[#ded5c7] text-center">
                        <span className="font-sans text-[11px] uppercase tracking-widest text-[#45123E] font-bold block">
                          Tailored Archival Proposal
                        </span>
                        <span className="font-sans text-xs text-[#786a5a] block mt-0.5">
                          {tier.duration}
                        </span>
                      </div>
                    </div>

                    {/* Features List */}
                    <div className="space-y-3.5 mb-8">
                      {tier.features.map((feat, idx) => (
                        <div key={idx} className="flex items-start gap-3 text-xs font-sans">
                          <Check className="w-3.5 h-3.5 text-[#45123E] shrink-0 mt-0.5" />
                          <div>
                            <strong className="text-[#1c1c19] font-bold">{feat.label}: </strong>
                            <span className="text-[#594d3f]">{feat.detail}</span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="pt-6 border-t border-[#e8dfd2] flex flex-col gap-3">
                    <button
                      onClick={() => {
                        if (onSelectTier) onSelectTier(tier);
                        onOpenWhatsApp(`Hello RK Photo Studio! I would like to reserve dates and request the proposal for "${tier.name} ${tier.nameHighlight}".`);
                      }}
                      className={`w-full py-3.5 rounded-full font-sans text-xs uppercase tracking-widest transition-all text-center cursor-pointer font-bold ${
                        tier.isPatronPreferred
                          ? 'bg-[#45123E] text-white hover:bg-[#340C2E] shadow-md'
                          : 'bg-[#FAF5EB] hover:bg-[#45123E] text-[#1c1c19] hover:text-white border border-[#ded5c7]'
                      }`}
                    >
                      {tier.ctaText}
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* TAB 4: ARCHIVAL ENHANCEMENTS */}
      {activeTab === 'enhancements' && (
        <section className="w-full px-4 sm:px-8 lg:px-12 py-8 sm:py-12">
          <div className="max-w-7xl mx-auto">
            <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 sm:mb-10 gap-3 sm:gap-4">
              <div>
                <span className="font-sans text-[10px] sm:text-[11px] text-[#775a19] uppercase tracking-[0.25em] block mb-1 font-bold">
                  A LA CARTE COUTURE
                </span>
                <h2 className="font-serif italic text-2xl sm:text-4xl text-[#1c1c19] font-normal">
                  Archival Additions &amp; Extensions
                </h2>
              </div>
              <p className="font-sans text-xs sm:text-sm text-[#594d3f] max-w-md">
                Bespoke technical extensions seamlessly woven into your primary wedding coverage or standalone studio commissions.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
              {ENHANCEMENTS.map((enh) => (
                <div
                  key={enh.code}
                  className="glass-card bg-white p-5 sm:p-6 rounded-2xl sm:rounded-3xl border border-[#ded5c7] flex flex-col justify-between shadow-2xs hover:shadow-md transition-all"
                >
                  <div>
                    <div className="flex items-center justify-between mb-3">
                      <span className="font-sans text-[9px] sm:text-[10px] text-[#45123E] uppercase tracking-widest font-bold px-2.5 py-1 bg-[#FAF5EB] border border-[#ded5c7] rounded-full">
                        {enh.badge}
                      </span>
                      <span className="font-sans text-[9px] sm:text-[10px] uppercase tracking-widest text-[#786a5a] font-mono">
                        {enh.code}
                      </span>
                    </div>

                    <h3 className="font-serif italic text-base sm:text-lg text-[#1c1c19] font-bold leading-snug">
                      {enh.title}
                    </h3>
                    <p className="font-sans text-xs text-[#594d3f] mt-2 sm:mt-2.5 leading-relaxed">
                      {enh.description}
                    </p>
                  </div>

                  <div className="pt-3.5 sm:pt-4 mt-5 sm:mt-6 border-t border-[#e8dfd2] flex items-center justify-between">
                    <span className="font-sans text-[10px] uppercase tracking-wider text-[#786a5a] font-medium">
                      Integrate into Monograph
                    </span>
                    <button
                      onClick={() => onOpenWhatsApp(`Hi RK Photo Studio, I would like to add "${enh.title}" to our wedding package.`)}
                      className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-[#45123E] hover:bg-[#340C2E] text-white text-xs font-sans font-bold transition-all shadow-2xs cursor-pointer"
                    >
                      <MessageCircle className="w-3.5 h-3.5 text-[#25D366] fill-current" />
                      <span>Inquire</span>
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* TAB 5: DELIVERABLES MATRIX */}
      {activeTab === 'matrix' && (
        <section className="w-full px-4 sm:px-8 lg:px-12 py-8 sm:py-12">
          <div className="max-w-7xl mx-auto">
            <div className="text-center max-w-3xl mx-auto mb-8 sm:mb-10">
              <span className="font-sans text-[10px] sm:text-[11px] text-[#775a19] uppercase tracking-[0.25em] font-bold block mb-1">
                TRANSPARENT ARTISAN SPECIFICATIONS
              </span>
              <h2 className="font-serif italic text-2xl sm:text-4xl text-[#1c1c19] font-normal">
                Deliverable Comparison Matrix
              </h2>
              <p className="font-sans text-xs sm:text-sm text-[#594d3f] mt-1.5 sm:mt-2 px-2">
                A rigorous overview of equipment, coverage durations, master plates, and physical heirlooms.
              </p>
            </div>

            <div className="overflow-x-auto bg-white border border-[#ded5c7] rounded-2xl sm:rounded-3xl shadow-sm">
              <table className="w-full text-left border-collapse min-w-[540px]">
                <thead>
                  <tr className="border-b border-[#ded5c7] bg-[#FAF5EB]">
                    <th className="p-3.5 sm:p-5 font-sans text-xs uppercase tracking-wider text-[#1c1c19] font-bold">
                      Artisan Discipline
                    </th>
                    <th className="p-3.5 sm:p-5 font-sans text-xs uppercase tracking-wider text-[#775a19] font-bold">
                      The Atelier
                    </th>
                    <th className="p-3.5 sm:p-5 font-sans text-xs uppercase tracking-wider text-[#45123E] font-bold bg-[#f5ecdd]">
                      The Golden (Preferred)
                    </th>
                    <th className="p-3.5 sm:p-5 font-sans text-xs uppercase tracking-wider text-[#775a19] font-bold">
                      The Imperial
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#e8dfd2] font-sans text-xs">
                  {DELIVERABLE_MATRIX.map((row, idx) => (
                    <tr key={idx} className="hover:bg-[#FAF5EB]/50 transition-colors">
                      <td className="p-3.5 sm:p-5 font-bold text-[#1c1c19]">
                        {row.discipline}
                      </td>
                      <td className="p-3.5 sm:p-5 text-[#594d3f]">
                        {row.monograph}
                      </td>
                      <td className="p-3.5 sm:p-5 text-[#45123E] font-bold bg-[#f5ecdd]/40">
                        {row.golden}
                      </td>
                      <td className="p-3.5 sm:p-5 text-[#594d3f]">
                        {row.imperial}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </section>
      )}

      {/* Flagship Studio Consultation & Location Canopy */}
      <section className="w-full px-4 sm:px-8 lg:px-12 py-12 sm:py-16 border-t border-[#e5dfd5] bg-white">
        <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8 items-center">
          <div>
            <span className="font-sans text-[10px] sm:text-[11px] text-[#775a19] uppercase tracking-[0.25em] font-bold block mb-1">
              VISIT OUR ROHINI STUDIO
            </span>
            <h3 className="font-serif italic text-xl sm:text-3xl text-[#1c1c19] leading-tight font-bold">
              Opposite State Bank of India (SBI), Pooth Kalan, Rohini Sector 23
            </h3>
            <p className="font-serif text-xs sm:text-base text-[#594d3f] mt-2.5 sm:mt-3 leading-relaxed">
              We welcome couples and families to visit our studio in person to touch our Florentine leather albums, inspect sample print finishes, view high-definition cinematic reels on calibrated monitors, and discuss custom packages over fresh masala chai.
            </p>

            <div className="mt-5 space-y-2 text-xs font-sans text-[#594d3f]">
              <div className="flex items-center gap-2">
                <MapPin className="w-4 h-4 text-[#45123E]" />
                <span>Opposite SBI Bank, Pooth Kalan, Sector 23, Rohini, Delhi – 110085</span>
              </div>
              <div className="flex items-center gap-2">
                <Clock className="w-4 h-4 text-[#45123E]" />
                <span>Monday to Sunday: 9:00 AM – 9:00 PM (7 Days Open)</span>
              </div>
              <div className="flex items-center gap-2">
                <PhoneCall className="w-4 h-4 text-[#45123E]" />
                <span>Direct Studio Mobile: +91 92128 12625</span>
              </div>
            </div>

            <div className="mt-6 flex flex-wrap items-center gap-3">
              <a
                href="https://share.google/XGXzmI1VT65XaGW7H"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-5 py-2.5 bg-[#45123E] text-white rounded-full font-sans text-xs uppercase tracking-wider font-bold hover:bg-[#340C2E] transition-all shadow-sm"
              >
                <span>Google Maps Directions</span>
                <ExternalLink className="w-3.5 h-3.5 text-[#e8d5b7]" />
              </a>
              <button
                onClick={() => onOpenWhatsApp("Hi RK Photo Studio! I would like to schedule an in-person studio visit to view wedding albums and discuss options.")}
                className="inline-flex items-center gap-2 px-5 py-2.5 border border-[#ded5c7] bg-[#FAF5EB] hover:bg-[#45123E] hover:text-white text-[#1c1c19] rounded-full font-sans text-xs uppercase tracking-wider font-bold transition-all shadow-2xs"
              >
                <MessageCircle className="w-3.5 h-3.5 text-[#25D366] fill-current" />
                <span>Schedule Studio Visit</span>
              </button>
            </div>
          </div>

          {/* Frequently Asked Questions */}
          <div className="bg-[#FAF5EB] p-6 rounded-3xl border border-[#ded5c7] space-y-4 shadow-sm">
            <h4 className="font-serif italic text-lg font-bold text-[#1c1c19] flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-[#45123E]" />
              <span>Frequently Asked Questions</span>
            </h4>

            <div className="space-y-3">
              {[
                {
                  q: 'Do you offer custom packages without fixed price constraints?',
                  a: 'Yes, absolutely. Because every wedding varies in number of functions, guest sizes, and multi-city travel, we create bespoke packages tailored strictly to your specific needs so you only pay for what you actually require.'
                },
                {
                  q: 'Can you restore very old, torn family photos of ancestors?',
                  a: 'Yes! As highlighted in our authentic customer reviews, we specialize in advanced archival photo restoration. We repair creases, restore faded colors, enhance facial features, and provide fresh museum-grade framed copies.'
                },
                {
                  q: 'How quickly are the final wedding album and cinema films delivered?',
                  a: 'We deliver initial social media teasers within 72 hours. Full cinematic wedding films and master retouched photo folios are delivered within 4 to 6 weeks, followed by album design approval and handcrafting.'
                },
                {
                  q: 'Do you provide drone coverage across Delhi NCR?',
                  a: 'Yes, we provide licensed aerial drone operators and customized photo booth rental stations for weddings and parties across Rohini, Pitampura, Paschim Vihar, Kanjhawala, and greater Delhi NCR.'
                }
              ].map((item, i) => (
                <div key={i} className="border border-[#ded5c7] rounded-2xl bg-white overflow-hidden shadow-2xs">
                  <button
                    onClick={() => setOpenFaq(openFaq === i ? null : i)}
                    className="w-full text-left p-3.5 font-sans text-xs font-bold text-[#1c1c19] flex items-center justify-between gap-2"
                  >
                    <span>{item.q}</span>
                    <ChevronDown className={`w-4 h-4 text-[#775a19] shrink-0 transition-transform ${openFaq === i ? 'rotate-180' : ''}`} />
                  </button>
                  {openFaq === i && (
                    <div className="p-3.5 pt-0 font-serif text-xs text-[#594d3f] leading-relaxed border-t border-[#f0e8de]">
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
