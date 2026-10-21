import React, { useState } from 'react';
import { SACRED_RITUALS, RitualDetail } from '../data/weddingData';
import { Sparkles, Heart, MessageSquare, Feather, Clock, Palette, Users } from 'lucide-react';
import { PageHero } from './PageHero';

interface SacredRitualsHubProps {
  onNavigateToGallery?: () => void;
  onNavigateToRsvp?: () => void;
  onOpenRsvp?: () => void;
}

export const SacredRitualsHub: React.FC<SacredRitualsHubProps> = ({
  onNavigateToGallery,
  onNavigateToRsvp,
  onOpenRsvp
}) => {
  const handleRsvpClick = () => {
    if (onOpenRsvp) onOpenRsvp();
    else if (onNavigateToRsvp) onNavigateToRsvp();
  };
  const [selectedRitual, setSelectedRitual] = useState<RitualDetail>(SACRED_RITUALS[0]);
  const [familyStories, setFamilyStories] = useState<{ author: string; ritualName: string; text: string; date: string }[]>([
    {
      author: 'Aarti Bua (Jaipur)',
      ritualName: 'Haldi & Tel Baan',
      text: 'In our ancestral haveli, we always mix dried rose petals ground on a stone sil-batta with fresh raw milk from the family gaushala. When Gayatri smiled today, I saw my mother’s eyes in her.',
      date: '2 days ago'
    },
    {
      author: 'Gaurav Bhaiya (New Delhi)',
      ritualName: 'Baaraat & Dwar Milni',
      text: 'Remember when Devraj fell into the mud pond playing cricket at age nine? Today he mounted the Marwari stallion like Prithviraj Chauhan himself. We danced for two hours straight until the dhol player asked for water!',
      date: 'Yesterday'
    }
  ]);

  const [newStoryAuthor, setNewStoryAuthor] = useState('');
  const [newStoryRitual, setNewStoryRitual] = useState('Haldi & Tel Baan');
  const [newStoryText, setNewStoryText] = useState('');
  const [showStoryForm, setShowStoryForm] = useState(false);

  const handleAddStory = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newStoryAuthor.trim() || !newStoryText.trim()) return;

    setFamilyStories(prev => [
      {
        author: newStoryAuthor.trim(),
        ritualName: newStoryRitual,
        text: newStoryText.trim(),
        date: 'Just now'
      },
      ...prev
    ]);

    setNewStoryAuthor('');
    setNewStoryText('');
    setShowStoryForm(false);
  };

  return (
    <div className="w-full bg-[#fcf9f4] text-[#1c1c19] min-h-screen pb-16 font-sans">
      {/* Page Hero with Distinct Existing Landscape Photo (/images/6.jpg) */}
      <PageHero
        badge="Vedic Heritage & Family Lore"
        title="The Living Language of"
        titleHighlight="Sacred Rituals"
        subtitle="Every thread of auspicious turmeric, every vow whispered around the sacred fire, and every tearful blessing showered from elder hands carries generations of quiet devotion. Here, we honor the deep emotional soul behind each ritual."
        backgroundImageUrl="/images/6.jpg"
        primaryAction={{
          label: "RSVP For Ceremonies",
          onClick: handleRsvpClick
        }}
      />

      {/* Main Rituals Explorer */}
      <section className="w-full px-4 sm:px-8 lg:px-12 py-8 sm:py-12">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-8 items-start">
          {/* Left Column: Ritual Selector Sidebar (Horizontal swipeable ribbon on smartphone, vertical sidebar on desktop) */}
          <div className="lg:col-span-4 flex flex-col gap-2">
            <span className="font-headline text-[10px] sm:text-xs uppercase tracking-widest text-[#7f7667] mb-0.5 block">
              The Nuptial Progression (Swipe to Select)
            </span>
            <div className="flex lg:flex-col overflow-x-auto lg:overflow-visible scrollbar-none pb-2 lg:pb-0 gap-2 -mx-4 px-4 sm:mx-0 sm:px-0">
              {SACRED_RITUALS.map((ritual, idx) => {
                const isSelected = selectedRitual.id === ritual.id;
                return (
                  <button
                    key={ritual.id}
                    onClick={() => setSelectedRitual(ritual)}
                    className={`w-auto shrink-0 lg:w-full text-left px-3.5 sm:px-4 py-2.5 sm:py-3.5 rounded-2xl border transition-all flex items-center lg:items-start justify-between gap-2.5 sm:gap-3 cursor-pointer whitespace-nowrap lg:whitespace-normal ${
                      isSelected
                        ? 'bg-[#3b122d] text-white border-white/80 shadow-md'
                        : 'glass-lucid-pill hover:bg-white text-[#1c1c19]'
                    }`}
                  >
                    <div className="flex flex-col">
                      <div className="flex items-center gap-1.5 sm:gap-2">
                        <span className={`font-numeral text-xs font-bold ${isSelected ? 'text-[#e8d5b7]' : 'text-[#775a19]'}`}>
                          0{idx + 1}.
                        </span>
                        <span className={`font-headline text-sm sm:text-base font-semibold ${isSelected ? 'text-white' : 'text-[#1c1c19]'}`}>
                          {ritual.name}
                        </span>
                      </div>
                      <span className={`font-serif text-[11px] sm:text-xs mt-0.5 ${isSelected ? 'text-white/80' : 'text-[#7f7667]'}`}>
                        {ritual.hindiName} • {ritual.timing.split(' ')[0]}
                      </span>
                    </div>
                    {isSelected && (
                      <span className="text-[#e8d5b7] text-[9px] sm:text-[10px] font-headline font-bold uppercase tracking-wider px-2 py-0.5 rounded-full bg-white/20 ml-2">
                        ACTIVE
                      </span>
                    )}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Right Column: In-Depth Ritual Chronicle (Span 8) */}
          <div className="lg:col-span-8 flex flex-col gap-6">
            <div className="glass-lucid-card p-6 sm:p-10 rounded-3xl border border-white/85 shadow-2xl relative">
              {/* Ornate corner motifs */}
              <div className="absolute top-3 left-3 w-3 h-3 border-t-2 border-l-2 border-[#c5a059]"></div>
              <div className="absolute top-3 right-3 w-3 h-3 border-t-2 border-r-2 border-[#c5a059]"></div>
              <div className="absolute bottom-3 left-3 w-3 h-3 border-b-2 border-l-2 border-[#c5a059]"></div>
              <div className="absolute bottom-3 right-3 w-3 h-3 border-b-2 border-r-2 border-[#c5a059]"></div>

              {/* Ritual Title & Hindi Inscription */}
              <div className="border-b border-[#e5e2dd] pb-6 mb-6">
                <div className="flex items-center justify-between flex-wrap gap-2 text-xs font-headline uppercase tracking-widest text-[#7f7667]">
                  <span className="text-[#775a19] font-bold">
                    Ceremonial Chronicle
                  </span>
                  <div className="flex items-center gap-2">
                    <Clock className="w-3.5 h-3.5 text-[#775a19]" />
                    <span>{selectedRitual.timing}</span>
                  </div>
                </div>

                <h2 className="font-headline text-3xl sm:text-4xl text-[#1c1c19] mt-2 font-bold">
                  {selectedRitual.name}
                </h2>
                <span className="font-headline text-xl text-[#c5a059] block mt-1">
                  {selectedRitual.hindiName}
                </span>
              </div>

              {/* Sacred Shloka Box */}
              <div className="bg-[#fcf9f4] p-5 border border-[#c5a059]/60 mb-6 text-center">
                <span className="font-serif text-lg sm:text-xl text-[#775a19] font-medium block leading-relaxed">
                  "{selectedRitual.shlokaOrQuote}"
                </span>
                <span className="font-serif italic text-sm text-[#4e4639] block mt-2">
                  {selectedRitual.shlokaTranslation}
                </span>
              </div>

              {/* Emotional Significance Section */}
              <div className="space-y-6">
                <div>
                  <h3 className="font-headline text-xs uppercase tracking-widest text-[#775a19] font-bold mb-2 flex items-center gap-2">
                    <Heart className="w-4 h-4 text-[#775a19]" />
                    <span>The Unspoken Human Emotion</span>
                  </h3>
                  <p className="font-serif text-base text-[#1c1c19] leading-relaxed">
                    {selectedRitual.emotionalSignificance}
                  </p>
                </div>

                <div>
                  <h3 className="font-headline text-xs uppercase tracking-widest text-[#775a19] font-bold mb-2 flex items-center gap-2">
                    <Sparkles className="w-4 h-4 text-[#775a19]" />
                    <span>Vedic Spiritual Meaning</span>
                  </h3>
                  <p className="font-serif text-base text-[#4e4639] leading-relaxed">
                    {selectedRitual.spiritualMeaning}
                  </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-4 border-t border-[#e5e2dd]">
                  <div>
                    <h3 className="font-headline text-xs uppercase tracking-widest text-[#775a19] font-bold mb-1 flex items-center gap-2">
                      <Users className="w-4 h-4 text-[#775a19]" />
                      <span>Role of Clan &amp; Family</span>
                    </h3>
                    <p className="font-serif text-sm text-[#4e4639] leading-relaxed">
                      {selectedRitual.familyRole}
                    </p>
                  </div>

                  <div>
                    <h3 className="font-headline text-xs uppercase tracking-widest text-[#775a19] font-bold mb-1 flex items-center gap-2">
                      <Palette className="w-4 h-4 text-[#775a19]" />
                      <span>Attire &amp; Palette Advice</span>
                    </h3>
                    <p className="font-serif text-sm text-[#4e4639] leading-relaxed">
                      {selectedRitual.dressRecommendation}
                    </p>
                  </div>
                </div>
              </div>

              {/* Bottom Quick Action */}
              <div className="mt-8 pt-6 border-t border-[#e5e2dd] flex flex-wrap items-center justify-between gap-4">
                <button
                  onClick={onNavigateToGallery}
                  className="font-headline text-xs uppercase tracking-wider text-[#775a19] hover:underline flex items-center gap-1.5"
                >
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>Inspect Master Visual Plates for This Ritual</span>
                </button>
                <button
                  onClick={() => setShowStoryForm(true)}
                  className="bg-[#f0ede9] hover:bg-[#ebe8e3] text-[#1c1c19] px-4 py-2 border border-[#d1c5b4] font-headline text-xs uppercase tracking-wider transition-colors flex items-center gap-2"
                >
                  <Feather className="w-3.5 h-3.5 text-[#775a19]" />
                  <span>Share Family Memory / Custom</span>
                </button>
              </div>
            </div>

            {/* Share Family Memory Form (Modal / Expandable) */}
            {showStoryForm && (
              <div className="bg-[#f6f3ee] p-6 border border-[#c5a059] shadow-md">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="font-headline text-base text-[#1c1c19] font-bold">
                    Record a Custom or Memory for {selectedRitual.name}
                  </h3>
                  <button
                    onClick={() => setShowStoryForm(false)}
                    className="text-[#7f7667] hover:text-[#1c1c19] text-xs font-headline uppercase"
                  >
                    Close
                  </button>
                </div>
                <form onSubmit={handleAddStory} className="space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="font-headline text-xs uppercase tracking-wider text-[#1c1c19] block mb-1">
                        Your Name &amp; Relation *
                      </label>
                      <input
                        type="text"
                        required
                        value={newStoryAuthor}
                        onChange={e => setNewStoryAuthor(e.target.value)}
                        placeholder="e.g. Ramesh Uncle (London)"
                        className="w-full bg-white border border-[#d1c5b4] px-3 py-2 text-sm font-serif focus:outline-none focus:border-[#775a19]"
                      />
                    </div>
                    <div>
                      <label className="font-headline text-xs uppercase tracking-wider text-[#1c1c19] block mb-1">
                        Associated Ritual
                      </label>
                      <select
                        value={newStoryRitual}
                        onChange={e => setNewStoryRitual(e.target.value)}
                        className="w-full bg-white border border-[#d1c5b4] px-3 py-2 text-sm font-serif focus:outline-none focus:border-[#775a19]"
                      >
                        {SACRED_RITUALS.map(r => (
                          <option key={r.id} value={r.name}>{r.name}</option>
                        ))}
                      </select>
                    </div>
                  </div>
                  <div>
                    <label className="font-headline text-xs uppercase tracking-wider text-[#1c1c19] block mb-1">
                      Family Custom or Memory *
                    </label>
                    <textarea
                      required
                      rows={3}
                      value={newStoryText}
                      onChange={e => setNewStoryText(e.target.value)}
                      placeholder="Share what this ritual meant to our elders or a special tradition passed down in your family..."
                      className="w-full bg-white border border-[#d1c5b4] p-3 text-sm font-serif focus:outline-none focus:border-[#775a19]"
                    />
                  </div>
                  <button
                    type="submit"
                    className="bg-[#775a19] text-white px-6 py-2.5 font-headline text-xs uppercase tracking-widest font-bold hover:bg-[#5f4611] transition-colors"
                  >
                    Publish to Family Lore
                  </button>
                </form>
              </div>
            )}

            {/* Family Stories Feed */}
            <div className="bg-[#f6f3ee] p-6 border border-[#d1c5b4]/60">
              <div className="flex items-center justify-between mb-4">
                <span className="font-headline text-xs uppercase tracking-widest text-[#775a19] font-bold">
                  Clan Memories &amp; Lore Feed
                </span>
                <span className="font-serif text-xs text-[#7f7667]">
                  {familyStories.length} Shared Blessings
                </span>
              </div>
              <div className="space-y-4">
                {familyStories.map((story, sIdx) => (
                  <div key={sIdx} className="bg-white p-4 border border-[#e5e2dd] shadow-xs">
                    <div className="flex items-center justify-between text-xs font-headline text-[#7f7667] mb-2">
                      <span className="font-bold text-[#1c1c19]">{story.author}</span>
                      <span className="text-[#c5a059]">{story.ritualName} • {story.date}</span>
                    </div>
                    <p className="font-serif text-sm text-[#4e4639] leading-relaxed italic">
                      "{story.text}"
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
