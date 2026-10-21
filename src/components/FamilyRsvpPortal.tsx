import React, { useState } from 'react';
import { INITIAL_GUESTS, INITIAL_BLESSINGS, GuestRSVP, BlessingNote } from '../data/weddingData';
import { Sparkles, Users, CheckCircle2, Download, Search, Plus, Filter, Heart, MessageCircle, Calendar } from 'lucide-react';

interface FamilyRsvpPortalProps {
  onOpenRituals?: () => void;
}

export const FamilyRsvpPortal: React.FC<FamilyRsvpPortalProps> = ({ onOpenRituals }) => {
  const [activeTab, setActiveTab] = useState<'rsvp-wall' | 'host-dashboard'>('rsvp-wall');
  const [guests, setGuests] = useState<GuestRSVP[]>(INITIAL_GUESTS);
  const [blessings, setBlessings] = useState<BlessingNote[]>(INITIAL_BLESSINGS);

  // Guest RSVP Form state
  const [rsvpForm, setRsvpForm] = useState({
    name: '',
    phone: '',
    email: '',
    side: 'Ladkewale (Groom)' as GuestRSVP['side'],
    eventsAttending: ['Haldi', 'Sangeet', 'Pheras', 'Reception'],
    totalGuests: 2,
    dietary: 'Pure Vegetarian' as GuestRSVP['dietary'],
    stayRequired: true,
    notes: '',
    songRequest: ''
  });
  const [rsvpSubmitted, setRsvpSubmitted] = useState(false);

  // New blessing form state
  const [blessingAuthor, setBlessingAuthor] = useState('');
  const [blessingRelation, setBlessingRelation] = useState('');
  const [blessingSide, setBlessingSide] = useState<'Bride Side' | 'Groom Side' | 'Elders Prayer'>('Bride Side');
  const [blessingMessage, setBlessingMessage] = useState('');
  const [showBlessingForm, setShowBlessingForm] = useState(false);

  // Host dashboard filters
  const [searchQuery, setSearchQuery] = useState('');
  const [sideFilter, setSideFilter] = useState<string>('all');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [showAddGuestModal, setShowAddGuestModal] = useState(false);

  // Handle Event checkbox toggle in RSVP form
  const toggleEvent = (event: string) => {
    setRsvpForm(prev => ({
      ...prev,
      eventsAttending: prev.eventsAttending.includes(event)
        ? prev.eventsAttending.filter(e => e !== event)
        : [...prev.eventsAttending, event]
    }));
  };

  const handleRsvpSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!rsvpForm.name.trim() || !rsvpForm.phone.trim()) return;

    const newGuest: GuestRSVP = {
      id: `g-${Date.now()}`,
      name: rsvpForm.name.trim(),
      phone: rsvpForm.phone.trim(),
      email: rsvpForm.email.trim() || 'liaison@family.in',
      side: rsvpForm.side,
      eventsAttending: rsvpForm.eventsAttending,
      totalGuests: Number(rsvpForm.totalGuests) || 1,
      dietary: rsvpForm.dietary,
      stayRequired: rsvpForm.stayRequired,
      notes: rsvpForm.notes.trim(),
      songRequest: rsvpForm.songRequest.trim(),
      status: 'Confirmed',
      registeredAt: 'Just now'
    };

    setGuests(prev => [newGuest, ...prev]);
    setRsvpSubmitted(true);
  };

  const handleBlessingSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!blessingAuthor.trim() || !blessingMessage.trim()) return;

    const newBlessing: BlessingNote = {
      id: `b-${Date.now()}`,
      author: blessingAuthor.trim(),
      relation: blessingRelation.trim() || 'Beloved Relative',
      side: blessingSide,
      message: blessingMessage.trim(),
      date: 'Just now'
    };

    setBlessings(prev => [newBlessing, ...prev]);
    setBlessingAuthor('');
    setBlessingRelation('');
    setBlessingMessage('');
    setShowBlessingForm(false);
  };

  // Export CSV
  const handleExportCsv = () => {
    const headers = ['Name', 'Phone', 'Email', 'Side', 'Guests', 'Events', 'Dietary', 'Stay Needed', 'Song Request', 'Status', 'Notes'];
    const rows = guests.map(g => [
      `"${g.name}"`,
      `"${g.phone}"`,
      `"${g.email}"`,
      `"${g.side}"`,
      g.totalGuests,
      `"${g.eventsAttending.join(', ')}"`,
      `"${g.dietary}"`,
      g.stayRequired ? 'Yes' : 'No',
      `"${g.songRequest || ''}"`,
      `"${g.status}"`,
      `"${g.notes || ''}"`
    ]);

    const csvContent = 'data:text/csv;charset=utf-8,' + [headers.join(','), ...rows.map(e => e.join(','))].join('\n');
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', `Wedding_Guest_Manifest_${new Date().toISOString().slice(0, 10)}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  // Calculations for Host Dashboard
  const totalInvitedGuests = 450;
  const totalConfirmedHeadcount = guests
    .filter(g => g.status === 'Confirmed')
    .reduce((sum, g) => sum + g.totalGuests, 0);

  const ladkewaleCount = guests
    .filter(g => g.side.includes('Groom'))
    .reduce((sum, g) => sum + g.totalGuests, 0);

  const ladkiwaleCount = guests
    .filter(g => g.side.includes('Bride'))
    .reduce((sum, g) => sum + g.totalGuests, 0);

  const filteredGuests = guests.filter(g => {
    const matchesSearch = g.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      g.phone.includes(searchQuery) ||
      g.email.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesSide = sideFilter === 'all' || g.side === sideFilter;
    const matchesStatus = statusFilter === 'all' || g.status === statusFilter;
    return matchesSearch && matchesSide && matchesStatus;
  });

  return (
    <div className="w-full bg-[#fcf9f4] text-[#1c1c19] min-h-screen pt-20 sm:pt-24 pb-16 font-sans">
      {/* Header Banner with Distinct Landscape Photo (/images/4.jpg) */}
      <section className="relative w-full px-6 sm:px-8 lg:px-12 pt-8 pb-14 text-center border-b border-[#ded5c7] overflow-hidden bg-[#FAF5EB]">
        {/* Landscape Photo Layer */}
        <div className="absolute inset-0 w-full h-full overflow-hidden pointer-events-none z-0">
          <img
            src="/images/4.jpg"
            alt=""
            className="w-full h-full object-cover object-center opacity-25 scale-105"
            loading="eager"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-[#FAF5EB]/85 via-[#FAF5EB]/70 to-[#FAF5EB]" />
          <div className="absolute inset-0 bg-gradient-to-r from-[#FAF5EB]/90 via-transparent to-[#FAF5EB]/90" />
        </div>

        <div className="max-w-4xl mx-auto flex flex-col items-center relative z-10 glass-lucid px-6 sm:px-10 py-8 sm:py-12 rounded-3xl border border-white/85 shadow-2xl backdrop-blur-2xl">
          <div className="inline-flex items-center gap-2 mb-3 text-[#775a19]">
            <Sparkles className="w-4 h-4 text-[#a78b71]" />
            <span className="font-sans text-[11px] tracking-[0.25em] uppercase font-bold">
              Family Warmth &amp; Sacred Hospitality
            </span>
          </div>

          <h1 className="font-serif italic font-normal text-4xl sm:text-5xl lg:text-6xl text-[#1c1c19] tracking-tight leading-tight">
            Family Portal &amp;{' '}
            <span className="text-[#45123E] not-italic font-bold inline-block hover:text-[#775a19] transition-colors">
              Sacred RSVP
            </span>
          </h1>

          <p className="font-serif text-base sm:text-lg text-[#594d3f] max-w-2xl mt-4 leading-relaxed font-normal">
            In our Indian homes, every guest brings a blessing of the divine (<em>Atithi Devo Bhava</em>). Confirm your presence across auspicious ceremonies, share stay preferences, and leave lifelong blessings for the couple.
          </p>

          {/* Master View Mode Switcher */}
          <div className="mt-8 flex items-center justify-center p-1 rounded-full glass-lucid-pill border border-white/90">
            <button
              onClick={() => setActiveTab('rsvp-wall')}
              className={`px-6 py-2.5 rounded-full font-sans text-xs uppercase tracking-wider transition-all cursor-pointer ${
                activeTab === 'rsvp-wall'
                  ? 'bg-[#45123E] text-white font-bold shadow-md'
                  : 'text-[#594d3f] hover:text-[#1c1c19]'
              }`}
            >
              Guest RSVP &amp; Aashirwad Wall
            </button>
            <button
              onClick={() => setActiveTab('host-dashboard')}
              className={`px-6 py-2.5 rounded-full font-sans text-xs uppercase tracking-wider transition-all cursor-pointer ${
                activeTab === 'host-dashboard'
                  ? 'bg-[#45123E] text-white font-bold shadow-md'
                  : 'text-[#594d3f] hover:text-[#1c1c19]'
              }`}
            >
              Host &amp; Clan Dashboard
            </button>
          </div>
        </div>
      </section>

      {/* View 1: Guest RSVP & Aashirwad Wall */}
      {activeTab === 'rsvp-wall' && (
        <section className="w-full px-6 sm:px-8 lg:px-12 py-12">
          <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            {/* Left: RSVP Form (Span 7) */}
            <div className="lg:col-span-7 glass-lucid-card p-6 sm:p-10 rounded-3xl border border-white/85 shadow-2xl relative">
              <div className="border-b border-[#e5e2dd] pb-4 mb-6">
                <span className="font-headline text-xs uppercase tracking-widest text-[#775a19] font-bold block mb-1">
                  Sacred Attendance
                </span>
                <h2 className="font-headline text-2xl sm:text-3xl text-[#1c1c19] font-semibold">
                  Register Your Family RSVP
                </h2>
                <p className="font-serif text-sm text-[#4e4639] mt-1">
                  Please let the host families know which celebrations you will grace with your presence.
                </p>
              </div>

              {!rsvpSubmitted ? (
                <form onSubmit={handleRsvpSubmit} className="space-y-6">
                  {/* Personal details */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="font-headline text-xs uppercase tracking-wider text-[#1c1c19] block mb-1">
                        Full Name / Family Name *
                      </label>
                      <input
                        type="text"
                        required
                        value={rsvpForm.name}
                        onChange={e => setRsvpForm({ ...rsvpForm, name: e.target.value })}
                        placeholder="e.g. Ramesh & Meena Singhal"
                        className="w-full bg-[#f6f3ee] border border-[#d1c5b4] px-3 py-2 text-sm font-serif focus:outline-none focus:border-[#775a19]"
                      />
                    </div>
                    <div>
                      <label className="font-headline text-xs uppercase tracking-wider text-[#1c1c19] block mb-1">
                        WhatsApp Number *
                      </label>
                      <input
                        type="tel"
                        required
                        value={rsvpForm.phone}
                        onChange={e => setRsvpForm({ ...rsvpForm, phone: e.target.value })}
                        placeholder="+91 98765 43210"
                        className="w-full bg-[#f6f3ee] border border-[#d1c5b4] px-3 py-2 text-sm font-serif focus:outline-none focus:border-[#775a19]"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="font-headline text-xs uppercase tracking-wider text-[#1c1c19] block mb-1">
                        Relation / Side *
                      </label>
                      <select
                        value={rsvpForm.side}
                        onChange={e => setRsvpForm({ ...rsvpForm, side: e.target.value as GuestRSVP['side'] })}
                        className="w-full bg-[#f6f3ee] border border-[#d1c5b4] px-3 py-2 text-sm font-serif focus:outline-none focus:border-[#775a19]"
                      >
                        <option value="Ladkewale (Groom)">Ladkewale (Groom's Side)</option>
                        <option value="Ladkiwale (Bride)">Ladkiwale (Bride's Side)</option>
                        <option value="Mutual / Dear Friend">Mutual / Dear Friend</option>
                      </select>
                    </div>
                    <div>
                      <label className="font-headline text-xs uppercase tracking-wider text-[#1c1c19] block mb-1">
                        Total Family Members Attending *
                      </label>
                      <input
                        type="number"
                        min="1"
                        max="10"
                        required
                        value={rsvpForm.totalGuests}
                        onChange={e => setRsvpForm({ ...rsvpForm, totalGuests: parseInt(e.target.value) || 1 })}
                        className="w-full bg-[#f6f3ee] border border-[#d1c5b4] px-3 py-2 text-sm font-serif focus:outline-none focus:border-[#775a19]"
                      />
                    </div>
                  </div>

                  {/* Multi-event Attendance Checkboxes */}
                  <div>
                    <label className="font-headline text-xs uppercase tracking-wider text-[#1c1c19] block mb-2">
                      Ceremonies You Will Grace
                    </label>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      {[
                        { id: 'Haldi', label: 'Haldi & Tel Baan (Day 1 Morning)' },
                        { id: 'Sangeet', label: 'Grand Sangeet & Soirée (Day 1 Evening)' },
                        { id: 'Pheras', label: 'Sacred Pheras & Mandap (Day 2 Sunset)' },
                        { id: 'Reception', label: 'Royal Daawat & Reception (Day 2 Night)' }
                      ].map(item => {
                        const checked = rsvpForm.eventsAttending.includes(item.id);
                        return (
                          <label
                            key={item.id}
                            className={`flex items-center gap-3 p-3 border cursor-pointer select-none transition-colors ${
                              checked
                                ? 'bg-[#fcf9f4] border-[#775a19] text-[#1c1c19]'
                                : 'bg-[#f6f3ee] border-[#d1c5b4]/50 text-[#7f7667]'
                            }`}
                          >
                            <input
                              type="checkbox"
                              checked={checked}
                              onChange={() => toggleEvent(item.id)}
                              className="accent-[#775a19]"
                            />
                            <span className="font-serif text-sm font-medium">{item.label}</span>
                          </label>
                        );
                      })}
                    </div>
                  </div>

                  {/* Dietary & Stay Options */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="font-headline text-xs uppercase tracking-wider text-[#1c1c19] block mb-1">
                        Dietary Preference
                      </label>
                      <select
                        value={rsvpForm.dietary}
                        onChange={e => setRsvpForm({ ...rsvpForm, dietary: e.target.value as GuestRSVP['dietary'] })}
                        className="w-full bg-[#f6f3ee] border border-[#d1c5b4] px-3 py-2 text-sm font-serif focus:outline-none focus:border-[#775a19]"
                      >
                        <option value="Pure Vegetarian">Pure Vegetarian</option>
                        <option value="Jain">Jain (No Root Veg)</option>
                        <option value="Sattvic">Sattvic (No Onion/Garlic)</option>
                        <option value="Regular / Non-Veg">Regular / Awadhi Non-Veg</option>
                        <option value="Vegan">Vegan</option>
                        <option value="Nut Allergy">Nut Allergy</option>
                      </select>
                    </div>
                    <div>
                      <label className="font-headline text-xs uppercase tracking-wider text-[#1c1c19] block mb-1">
                        Estate Hospitality / Stay Required?
                      </label>
                      <select
                        value={rsvpForm.stayRequired ? 'yes' : 'no'}
                        onChange={e => setRsvpForm({ ...rsvpForm, stayRequired: e.target.value === 'yes' })}
                        className="w-full bg-[#f6f3ee] border border-[#d1c5b4] px-3 py-2 text-sm font-serif focus:outline-none focus:border-[#775a19]"
                      >
                        <option value="yes">Yes — Reserve Palace Hotel Room</option>
                        <option value="no">No — Local Resident / Self Arranged</option>
                      </select>
                    </div>
                  </div>

                  {/* Song Request & Special Notes */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="font-headline text-xs uppercase tracking-wider text-[#1c1c19] block mb-1">
                        Sangeet Dance Floor Request
                      </label>
                      <input
                        type="text"
                        value={rsvpForm.songRequest}
                        onChange={e => setRsvpForm({ ...rsvpForm, songRequest: e.target.value })}
                        placeholder="e.g. London Thumakda, Sasural Genda Phool"
                        className="w-full bg-[#f6f3ee] border border-[#d1c5b4] px-3 py-2 text-sm font-serif focus:outline-none focus:border-[#775a19]"
                      />
                    </div>
                    <div>
                      <label className="font-headline text-xs uppercase tracking-wider text-[#1c1c19] block mb-1">
                        Arrival Details or Accessibility Note
                      </label>
                      <input
                        type="text"
                        value={rsvpForm.notes}
                        onChange={e => setRsvpForm({ ...rsvpForm, notes: e.target.value })}
                        placeholder="e.g. Need wheelchair assistance for Bauji"
                        className="w-full bg-[#f6f3ee] border border-[#d1c5b4] px-3 py-2 text-sm font-serif focus:outline-none focus:border-[#775a19]"
                      />
                    </div>
                  </div>

                  <button
                    type="submit"
                    className="w-full bg-[#775a19] text-white py-3.5 font-headline text-xs uppercase tracking-widest font-bold hover:bg-[#5f4611] transition-colors shadow-md flex items-center justify-center gap-2"
                  >
                    <CheckCircle2 className="w-4 h-4" />
                    <span>Confirm Auspicious RSVP</span>
                  </button>
                </form>
              ) : (
                <div className="bg-[#fcf9f4] p-8 border border-[#c5a059] text-center space-y-4">
                  <div className="w-12 h-12 bg-[#775a19] text-white rounded-full flex items-center justify-center mx-auto">
                    <CheckCircle2 className="w-6 h-6" />
                  </div>
                  <h3 className="font-headline text-2xl text-[#1c1c19] font-bold">
                    Auspicious RSVP Registered!
                  </h3>
                  <p className="font-serif text-base text-[#4e4639] max-w-md mx-auto leading-relaxed">
                    Thank you, <strong>{rsvpForm.name}</strong>. Both families are overjoyed to welcome your party of <strong>{rsvpForm.totalGuests}</strong>. A formal guest pass has been dispatched to {rsvpForm.phone}.
                  </p>
                  <div className="pt-2">
                    <button
                      onClick={() => setRsvpSubmitted(false)}
                      className="text-xs font-headline text-[#775a19] uppercase tracking-wider underline hover:text-[#1c1c19]"
                    >
                      Submit Another Family Member RSVP
                    </button>
                  </div>
                </div>
              )}
            </div>

            {/* Right: The Sacred Aashirwad Wall (Span 5) */}
            <div className="lg:col-span-5 flex flex-col gap-6">
              <div className="glass-lucid-card p-6 sm:p-8 rounded-3xl border border-white/85 shadow-2xl">
                <div className="flex items-center justify-between pb-3 mb-4 border-b border-[#e5e2dd]">
                  <div className="flex items-center gap-2 text-[#775a19]">
                    <Heart className="w-4 h-4 text-[#775a19]" />
                    <span className="font-headline text-xs uppercase tracking-widest text-[#775a19] font-bold">
                      The Sacred Aashirwad Wall
                    </span>
                  </div>
                  <button
                    onClick={() => setShowBlessingForm(!showBlessingForm)}
                    className="text-xs font-headline uppercase tracking-wider text-[#775a19] hover:underline flex items-center gap-1"
                  >
                    <Plus className="w-3.5 h-3.5" />
                    <span>Leave a Blessing</span>
                  </button>
                </div>

                <p className="font-serif text-sm text-[#4e4639] leading-relaxed mb-4">
                  Before the wedding lehenga is stitched and the shehnai plays, our elders and loved ones lay the true foundation: prayer and good wishes.
                </p>

                {/* Submit New Blessing Drawer */}
                {showBlessingForm && (
                  <form onSubmit={handleBlessingSubmit} className="bg-[#f6f3ee] p-4 border border-[#c5a059] mb-4 space-y-3">
                    <div className="grid grid-cols-2 gap-2">
                      <input
                        type="text"
                        required
                        value={blessingAuthor}
                        onChange={e => setBlessingAuthor(e.target.value)}
                        placeholder="Your Name *"
                        className="bg-white border border-[#d1c5b4] px-2.5 py-1.5 text-xs font-serif"
                      />
                      <input
                        type="text"
                        value={blessingRelation}
                        onChange={e => setBlessingRelation(e.target.value)}
                        placeholder="Relation (e.g. Mami Ji)"
                        className="bg-white border border-[#d1c5b4] px-2.5 py-1.5 text-xs font-serif"
                      />
                    </div>
                    <select
                      value={blessingSide}
                      onChange={e => setBlessingSide(e.target.value as BlessingNote['side'])}
                      className="w-full bg-white border border-[#d1c5b4] px-2.5 py-1.5 text-xs font-serif"
                    >
                      <option value="Bride Side">Bride's Clan (Ladkiwale)</option>
                      <option value="Groom Side">Groom's Clan (Ladkewale)</option>
                      <option value="Elders Prayer">Elders / Purohit Prayer</option>
                    </select>
                    <textarea
                      required
                      rows={3}
                      value={blessingMessage}
                      onChange={e => setBlessingMessage(e.target.value)}
                      placeholder="Write your heartfelt blessing, advice, or prayer for the couple..."
                      className="w-full bg-white border border-[#d1c5b4] p-2 text-xs font-serif"
                    />
                    <div className="flex justify-end gap-2">
                      <button
                        type="button"
                        onClick={() => setShowBlessingForm(false)}
                        className="text-[11px] font-headline uppercase text-[#7f7667]"
                      >
                        Cancel
                      </button>
                      <button
                        type="submit"
                        className="bg-[#775a19] text-white px-4 py-1.5 font-headline text-[11px] uppercase tracking-wider font-semibold"
                      >
                        Post Blessing
                      </button>
                    </div>
                  </form>
                )}

                {/* Blessings Stream */}
                <div className="space-y-4 max-h-[520px] overflow-y-auto pr-1">
                  {blessings.map(b => (
                    <div
                      key={b.id}
                      className="p-4 bg-[#fcf9f4] border border-[#e5e2dd] shadow-xs relative"
                    >
                      <div className="flex items-center justify-between text-xs font-headline mb-1">
                        <span className="font-bold text-[#1c1c19]">{b.author}</span>
                        <span className="text-[#c5a059] text-[10px] tracking-wider uppercase font-medium">
                          {b.side}
                        </span>
                      </div>
                      <span className="font-serif italic text-xs text-[#7f7667] block mb-2">
                        {b.relation} • {b.date}
                      </span>
                      <p className="font-serif text-sm text-[#4e4639] leading-relaxed italic border-l-2 border-[#c5a059] pl-3">
                        "{b.message}"
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* View 2: Host & Clan Manager Dashboard */}
      {activeTab === 'host-dashboard' && (
        <section className="w-full px-4 sm:px-6 lg:px-8 py-12">
          <div className="max-w-7xl mx-auto space-y-8">
            {/* KPI Cards Row */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="bg-white p-5 border border-[#d1c5b4]/60 shadow-xs">
                <span className="font-headline text-[11px] uppercase tracking-wider text-[#7f7667] block">
                  Total Invited
                </span>
                <span className="font-numeral text-3xl font-bold text-[#1c1c19] mt-1 block">
                  {totalInvitedGuests}
                </span>
                <span className="font-serif text-xs text-[#7f7667]">Across 180 families</span>
              </div>

              <div className="bg-white p-5 border border-[#d1c5b4]/60 shadow-xs">
                <span className="font-headline text-[11px] uppercase tracking-wider text-[#775a19] block">
                  Confirmed Headcount
                </span>
                <span className="font-numeral text-3xl font-bold text-[#775a19] mt-1 block">
                  {totalConfirmedHeadcount}
                </span>
                <span className="font-serif text-xs text-[#775a19]">
                  {Math.round((totalConfirmedHeadcount / totalInvitedGuests) * 100)}% attendance rate
                </span>
              </div>

              <div className="bg-white p-5 border border-[#d1c5b4]/60 shadow-xs">
                <span className="font-headline text-[11px] uppercase tracking-wider text-[#7f7667] block">
                  Ladkewale (Groom)
                </span>
                <span className="font-numeral text-3xl font-bold text-[#1c1c19] mt-1 block">
                  {ladkewaleCount}
                </span>
                <span className="font-serif text-xs text-[#7f7667]">Rooms allocated</span>
              </div>

              <div className="bg-white p-5 border border-[#d1c5b4]/60 shadow-xs">
                <span className="font-headline text-[11px] uppercase tracking-wider text-[#7f7667] block">
                  Ladkiwale (Bride)
                </span>
                <span className="font-numeral text-3xl font-bold text-[#1c1c19] mt-1 block">
                  {ladkiwaleCount}
                </span>
                <span className="font-serif text-xs text-[#7f7667]">Hosting clan</span>
              </div>
            </div>

            {/* Filter and Search Bar */}
            <div className="bg-white p-4 border border-[#d1c5b4]/60 shadow-sm flex flex-col md:flex-row items-center justify-between gap-4">
              <div className="flex items-center gap-3 w-full md:w-auto">
                <div className="relative flex-1 sm:w-64">
                  <Search className="w-4 h-4 text-[#7f7667] absolute left-3 top-1/2 -translate-y-1/2" />
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={e => setSearchQuery(e.target.value)}
                    placeholder="Search by name, phone..."
                    className="w-full pl-9 pr-3 py-1.5 bg-[#f6f3ee] border border-[#d1c5b4] text-xs font-serif focus:outline-none focus:border-[#775a19]"
                  />
                </div>

                <select
                  value={sideFilter}
                  onChange={e => setSideFilter(e.target.value)}
                  className="bg-[#f6f3ee] border border-[#d1c5b4] px-2.5 py-1.5 text-xs font-serif"
                >
                  <option value="all">All Sides</option>
                  <option value="Ladkewale (Groom)">Ladkewale</option>
                  <option value="Ladkiwale (Bride)">Ladkiwale</option>
                  <option value="Mutual / Dear Friend">Mutual Friends</option>
                </select>

                <select
                  value={statusFilter}
                  onChange={e => setStatusFilter(e.target.value)}
                  className="bg-[#f6f3ee] border border-[#d1c5b4] px-2.5 py-1.5 text-xs font-serif"
                >
                  <option value="all">All Statuses</option>
                  <option value="Confirmed">Confirmed</option>
                  <option value="Tentative">Tentative</option>
                </select>
              </div>

              <div className="flex items-center gap-3 w-full md:w-auto justify-end">
                <button
                  onClick={handleExportCsv}
                  className="inline-flex items-center gap-2 bg-[#f0ede9] hover:bg-[#ebe8e3] text-[#1c1c19] px-4 py-2 border border-[#d1c5b4] font-headline text-xs uppercase tracking-wider transition-colors"
                >
                  <Download className="w-3.5 h-3.5 text-[#775a19]" />
                  <span>Export CSV Manifest</span>
                </button>
              </div>
            </div>

            {/* Guest Table */}
            <div className="bg-white border border-[#d1c5b4]/60 shadow-sm overflow-x-auto">
              <table className="w-full min-w-[720px] text-left font-serif text-sm">
                <thead>
                  <tr className="bg-[#ebe8e3] text-[#1c1c19] font-headline text-xs uppercase tracking-wider border-b border-[#d1c5b4]">
                    <th className="py-3 px-4">Guest / Family</th>
                    <th className="py-3 px-4">Clan Side</th>
                    <th className="py-3 px-4 text-center">Party</th>
                    <th className="py-3 px-4">Ceremonies</th>
                    <th className="py-3 px-4">Dietary</th>
                    <th className="py-3 px-4">Stay</th>
                    <th className="py-3 px-4 text-center">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#e5e2dd]">
                  {filteredGuests.map(guest => (
                    <tr key={guest.id} className="hover:bg-[#fcf9f4] transition-colors">
                      <td className="py-3 px-4">
                        <span className="font-bold text-[#1c1c19] block">{guest.name}</span>
                        <span className="text-xs text-[#7f7667]">{guest.phone}</span>
                        {guest.songRequest && (
                          <span className="text-[11px] text-[#775a19] block italic mt-0.5">
                            Song: {guest.songRequest}
                          </span>
                        )}
                      </td>
                      <td className="py-3 px-4 text-xs font-headline uppercase text-[#4e4639]">
                        {guest.side}
                      </td>
                      <td className="py-3 px-4 text-center font-numeral font-bold text-[#1c1c19]">
                        {guest.totalGuests}
                      </td>
                      <td className="py-3 px-4 text-xs text-[#4e4639]">
                        {guest.eventsAttending.join(', ')}
                      </td>
                      <td className="py-3 px-4 text-xs text-[#4e4639]">
                        {guest.dietary}
                      </td>
                      <td className="py-3 px-4 text-xs">
                        {guest.stayRequired ? (
                          <span className="text-[#775a19] font-semibold">Palace Room</span>
                        ) : (
                          <span className="text-[#7f7667]">Local</span>
                        )}
                      </td>
                      <td className="py-3 px-4 text-center">
                        <span className="inline-block px-2.5 py-0.5 font-headline text-[10px] tracking-wider uppercase font-bold bg-[#ffdea5] text-[#261900]">
                          {guest.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                  {filteredGuests.length === 0 && (
                    <tr>
                      <td colSpan={7} className="py-8 text-center text-[#7f7667] font-serif">
                        No guests matching the selected query.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </section>
      )}
    </div>
  );
};
