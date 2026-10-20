import React, { useState } from 'react';
import { SACRED_RITUALS, RitualDetail } from '../data/weddingData';
import { Sparkles, Heart, Volume2, VolumeX, MessageSquare, Feather, Clock, Palette, Users } from 'lucide-react';

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
  const [isPlayingAudio, setIsPlayingAudio] = useState(false);
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

  // Web Audio Synthesizer for serene Indian Tanpura / Temple Bell ambient atmosphere
  const toggleAmbientSound = () => {
    try {
      if (!isPlayingAudio) {
        const AudioContextClass = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
        const ctx = new AudioContextClass();
        
        // Gentle Tanpura root drone (C#3 ~ 138.59 Hz)
        const osc1 = ctx.createOscillator();
        const osc2 = ctx.createOscillator();
        const gainNode = ctx.createGain();

        osc1.type = 'sine';
        osc1.frequency.setValueAtTime(138.59, ctx.currentTime);
        
        osc2.type = 'triangle';
        osc2.frequency.setValueAtTime(207.65, ctx.currentTime); // Fifth note (G#3)

        gainNode.gain.setValueAtTime(0.04, ctx.currentTime);

        osc1.connect(gainNode);
        osc2.connect(gainNode);
        gainNode.connect(ctx.destination);

        osc1.start();
        osc2.start();

        // Save reference to window for toggling
        (window as unknown as { __tanpuraCtx?: AudioContext }).__tanpuraCtx = ctx;
        setIsPlayingAudio(true);
      } else {
        const win = window as unknown as { __tanpuraCtx?: AudioContext };
        if (win.__tanpuraCtx) {
          win.__tanpuraCtx.close();
          win.__tanpuraCtx = undefined;
        }
        setIsPlayingAudio(false);
      }
    } catch {
      setIsPlayingAudio(false);
    }
  };

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
    <div className="w-full bg-[#fcf9f4] text-[#1c1c19] bg-dots min-h-screen pt-28 pb-16 font-sans">
      {/* Header Banner */}
      <section className="w-full px-6 sm:px-8 lg:px-12 pt-6 pb-12 text-center border-b border-[#ded5c7]">
        <div className="max-w-4xl mx-auto flex flex-col items-center">
          <div className="inline-flex items-center gap-2 mb-3 text-[#775a19]">
            <Sparkles className="w-4 h-4 text-[#a78b71]" />
            <span className="font-sans text-[11px] tracking-[0.25em] uppercase font-bold">
              Vedic Heritage &amp; Clan Lore
            </span>
          </div>

          <h1 className="font-serif italic font-normal text-4xl sm:text-5xl lg:text-6xl text-[#1c1c19] tracking-tight leading-tight">
            The Living Language of{' '}
            <span className="text-[#45123E] not-italic font-bold inline-block hover:text-[#775a19] transition-colors">
              Sacred Rituals
            </span>
          </h1>

          <p className="font-serif text-base sm:text-lg text-[#594d3f] max-w-2xl mt-4 leading-relaxed font-normal">
            Every thread of turmeric, every vow around the Agni, and every grain of rice showered from elder hands carries centuries of family prayer. Here, we illuminate the profound emotional and Vedic meaning behind each ceremony.
          </p>

          {/* Tanpura Ambient Toggle & Action Strip */}
          <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
            <button
              onClick={toggleAmbientSound}
              className={`inline-flex items-center gap-2 px-6 py-3 rounded-full font-sans text-xs uppercase tracking-wider transition-all border cursor-pointer ${
                isPlayingAudio
                  ? 'bg-[#45123E] text-white border-[#45123E] shadow-md font-bold'
                  : 'bg-white text-[#45123E] border-[#ded5c7] hover:bg-[#FAF5EB] shadow-2xs font-bold'
              }`}
            >
              {isPlayingAudio ? (
                <>
                  <Volume2 className="w-4 h-4 animate-pulse text-[#e8d5b7]" />
                  <span>Tanpura Ambiance Playing</span>
                </>
              ) : (
                <>
                  <VolumeX className="w-4 h-4 text-[#775a19]" />
                  <span>Play Sacred Tanpura Drone</span>
                </>
              )}
            </button>

            <button
              onClick={handleRsvpClick}
              className="inline-flex items-center gap-2 bg-[#45123E] text-white hover:bg-[#340C2E] px-6 py-3 rounded-full font-sans text-xs uppercase tracking-wider font-bold transition-all shadow-md cursor-pointer"
            >
              <span>RSVP For Ceremonies</span>
            </button>
          </div>
        </div>
      </section>

      {/* Main Rituals Explorer */}
      <section className="w-full px-6 sm:px-8 lg:px-12 py-12">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Column: Ritual Selector Sidebar (Span 4) */}
          <div className="lg:col-span-4 flex flex-col gap-3">
            <span className="font-headline text-xs uppercase tracking-widest text-[#7f7667] mb-1 block">
              The Nuptial Progression
            </span>
            <div className="space-y-2">
              {SACRED_RITUALS.map((ritual, idx) => {
                const isSelected = selectedRitual.id === ritual.id;
                return (
                  <button
                    key={ritual.id}
                    onClick={() => setSelectedRitual(ritual)}
                    className={`w-full text-left p-4 border transition-all flex items-start justify-between gap-3 ${
                      isSelected
                        ? 'bg-white border-[#775a19] shadow-md ring-1 ring-[#775a19]'
                        : 'bg-[#f6f3ee] border-[#d1c5b4]/50 hover:bg-white text-[#1c1c19]'
                    }`}
                  >
                    <div className="flex flex-col">
                      <div className="flex items-center gap-2">
                        <span className="font-numeral text-xs text-[#775a19] font-bold">
                          0{idx + 1}.
                        </span>
                        <span className="font-headline text-base font-semibold text-[#1c1c19]">
                          {ritual.name}
                        </span>
                      </div>
                      <span className="font-serif text-xs text-[#7f7667] mt-1">
                        {ritual.hindiName} • {ritual.timing.split(' ')[0]}
                      </span>
                    </div>
                    {isSelected && (
                      <span className="text-[#775a19] text-xs font-headline font-bold">
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
            <div className="bg-white p-6 sm:p-10 border border-[#d1c5b4]/70 shadow-lg relative">
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
