export interface PlateItem {
  id: string;
  plateNumber: string;
  title: string;
  couple: string;
  location: string;
  category: 'pheras' | 'haldi' | 'sangeet' | 'vidai' | 'heirloom' | 'pre-wedding' | 'family' | 'events';
  imageUrl: string;
  gear: string;
  filmStock: string;
  caption: string;
  emotionalStory: string;
  colSpanDesktop: string;
  aspectRatio: string;
}

export const PLATES_DATA: PlateItem[] = [
  {
    id: 'plate-01',
    plateNumber: 'PLATE NO. 01',
    title: 'The Crimson Veil at Pichola',
    couple: 'Maharani Gayatri & Devraj',
    location: 'Lake Pichola, Udaipur, Rajasthan',
    category: 'pheras',
    imageUrl: '/images/1.jpg',
    gear: 'Hasselblad H6D-100c • 80mm f/2.2',
    filmStock: 'Natural Daylight • The Crimson Veil at Pichola',
    caption: 'The quiet pause before the Baaraat arrives. Her mother gently adjusts the heirloom nathni, hands trembling with twenty-four years of quiet love.',
    emotionalStory: 'As her mother fastened the pearl chain behind Gayatri’s ear, both avoided looking into each other’s eyes in the mirror — afraid that a single glance would break the dam of tears held back all morning.',
    colSpanDesktop: 'md:col-span-7',
    aspectRatio: 'aspect-[4/5]'
  },
  {
    id: 'plate-02',
    plateNumber: 'PLATE NO. 02',
    title: 'Serenade of Morning Light',
    couple: 'Elysia & Julian',
    location: 'Villa Balbianello, Lake Como, Italy',
    category: 'heirloom',
    imageUrl: '/images/2.jpg',
    gear: 'Leica M11 • Summilux-M 50mm f/1.4 ASPH',
    filmStock: 'Kodak Tri-X Film Tone • Serenade of Morning Light',
    caption: 'Laughter etched in the morning sun — stealing a secret stolen glance before the sacred fires are lit.',
    emotionalStory: 'A quiet sunrise escape before the palace courtyard woke up to the sound of shehnais. For forty minutes, the world belonged solely to their whispers.',
    colSpanDesktop: 'md:col-span-5',
    aspectRatio: 'aspect-[3/4]'
  },
  {
    id: 'plate-03',
    plateNumber: 'PLATE NO. 03',
    title: "A Mother's Gaze",
    couple: 'The Solitary Adornment',
    location: 'Rambagh Palace, Jaipur, Rajasthan',
    category: 'heirloom',
    imageUrl: '/images/3.jpg',
    gear: 'Hasselblad 90mm Macro • ISO 64',
    filmStock: 'Studio Broncolor Indirect Softbox',
    caption: 'Witnessing her daughter adorned in red raw silk, fighting back tears in the heritage mirror.',
    emotionalStory: 'The intricate mehendi on her palms held the initials of both their families woven into sacred peacocks. In that vintage mirror, four generations of women looked back.',
    colSpanDesktop: 'md:col-span-4',
    aspectRatio: 'aspect-square'
  },
  {
    id: 'plate-04',
    plateNumber: 'PLATE NO. 04',
    title: 'The Whirlwind of Sangeet',
    couple: 'Sangeet in Gilded Light',
    location: 'Umaid Bhawan, Jodhpur',
    category: 'sangeet',
    imageUrl: '/images/4.jpg',
    gear: 'Leica SL2-S • Summilux 35mm f/1.4',
    filmStock: 'Kinetic Ambient Shutter Sync 1/40s',
    caption: 'When dhol beats take over, spinning under strings of marigold and fairy lights till the early dawn.',
    emotionalStory: 'Even 84-year-old Dadu stepped onto the dance floor, raising his walking stick in sheer ecstasy as forty cousins joined in chorus.',
    colSpanDesktop: 'md:col-span-4',
    aspectRatio: 'aspect-[4/5]'
  },
  {
    id: 'plate-05',
    plateNumber: 'PLATE NO. 05',
    title: 'Promises under the Starlight',
    couple: 'Midnight in Vendôme',
    location: 'Place Vendôme, Paris, France',
    category: 'heirloom',
    imageUrl: '/images/5.jpg',
    gear: 'Contax 645 • Planar 80mm f/2',
    filmStock: 'Kodak Portra 400 Color Negative',
    caption: 'Quiet footsteps through palace cloisters as the universe stills around them.',
    emotionalStory: 'A stillness after weeks of grandeur — just two lovers holding hands under antique gas lamps, whispering of tomorrow’s sacred rites.',
    colSpanDesktop: 'md:col-span-4',
    aspectRatio: 'aspect-square'
  },
  {
    id: 'plate-06',
    plateNumber: 'PLATE NO. 06',
    title: 'The Sacred Agni',
    couple: 'Ananya in Chiaroscuro',
    location: 'Private Haveli, Old Jaipur',
    category: 'pheras',
    imageUrl: '/images/6.jpg',
    gear: 'Mamiya RZ67 Pro II • Sekor 110mm f/2.8',
    filmStock: 'Ilford HP5 Plus 400 • Silver Gelatin Fine Finish',
    caption: 'Seven sacred circles around the holy fire. Eyes locked, lifetimes of devotion promised without words.',
    emotionalStory: 'The smoke of cedarwood, ghee, and roasted grains carried the Vedic mantras into the twilight sky. With every step around the fire, two paths melted forever into one.',
    colSpanDesktop: 'md:col-span-5',
    aspectRatio: 'aspect-[3/4]'
  },
  {
    id: 'plate-07',
    plateNumber: 'PLATE NO. 07',
    title: 'The Royal Pre-Wedding Romance',
    couple: 'Aditya & Simran',
    location: 'Heritage Palace Grounds, Delhi NCR',
    category: 'pre-wedding',
    imageUrl: '/images/7.jpg',
    gear: 'Sony A1 • FE 50mm f/1.2 GM Prime',
    filmStock: 'Golden Hour Natural Sunbeam',
    caption: 'Capturing love before the big day — pure candid warmth and laughter between the soon-to-be bride and groom.',
    emotionalStory: 'Away from the hustle of wedding planners and RSVP manifests, Aditya took Simran’s hand as the autumn sun dipped behind the palace pavilion.',
    colSpanDesktop: 'md:col-span-7',
    aspectRatio: 'aspect-[16/10]'
  },
  {
    id: 'plate-08',
    plateNumber: 'PLATE NO. 08',
    title: 'Authentic Studio Portraiture',
    couple: 'RK Studio Master Archive',
    location: 'Rohini Sector 23 Studio, Delhi',
    category: 'family',
    imageUrl: 'https://lh3.googleusercontent.com/grass-cs/AABkmLfwfiJ0rCtmFPPifsbafMmi_sY-n80iSjbbFSZMmermI3EgaQHbV130aCmAcIrkbWBU8IkMlxabJwkTdSyVAIdpUHTzsV3iLKcctkFY8pBH406daL_EwvE258n30Qe4c0SBPTF6o3ZZ-1Vn',
    gear: 'Canon EOS R5 • 85mm f/1.4L IS USM',
    filmStock: 'Archival Studio Portrait Curve',
    caption: 'Real captures from our Rohini flagship studio — timeless family memories framed for generations.',
    emotionalStory: 'Over seventeen years of preserving family warmth, celebrating milestones, and creating archival prints with lifelong durability.',
    colSpanDesktop: 'md:col-span-4',
    aspectRatio: 'aspect-[4/5]'
  },
  {
    id: 'plate-09',
    plateNumber: 'PLATE NO. 09',
    title: 'Heirloom Framing & Restoration',
    couple: 'Ancestral Generations',
    location: 'Delhi NCR Atelier',
    category: 'heirloom',
    imageUrl: 'https://lh3.googleusercontent.com/grass-cs/AABkmLeYZRpZUY8-JjJXDpSOPKGDSBHxKrmnqmybImEt4YXaNsm9szA4wlhifuAiMlrr5_SI0nY549ep1KJMCfth5cvvIEdhAUIkP9ggCRaiBWcNN7wA7X4nZliUX9n1G4zhPytccAH2MCWi6R7z',
    gear: 'Precision Scan & Medium Format Master',
    filmStock: 'Archival Rag & Custom Wood Frame',
    caption: 'Restoring treasured vintage portraits and hand-framing wedding keepsakes with museum preservation standards.',
    emotionalStory: 'Bringing old photographs of beloved grandfathers and mothers back to life with state-of-the-art retouching and heirloom finishing.',
    colSpanDesktop: 'md:col-span-4',
    aspectRatio: 'aspect-[4/5]'
  },
  {
    id: 'plate-10',
    plateNumber: 'PLATE NO. 10',
    title: 'Bridal Splendor & Intricate Regalia',
    couple: 'The Royal Bride',
    location: 'Delhi NCR Wedding Pavilion',
    category: 'heirloom',
    imageUrl: 'https://lh3.googleusercontent.com/grass-cs/AABkmLcsk3cjvupP9J-9kJnk4alsXbCRk3S8DmoJvD-OYv7GbFh6RWRrq-Mgil6aSw1D4ikt4lUSe63guEUe1W6HESgGyZCFHR-D8wwVY45hlQ1PFtWXCftapBCqg6s49ULaQD4gdhmrJm5EU5A',
    gear: 'Sony A7R V • 50mm f/1.2 GM',
    filmStock: 'Natural Ambient Glow',
    caption: 'Every auspicious detail preserved in breathtaking resolution and true-to-life colors.',
    emotionalStory: 'The nervous smile right as the shehnai plays, captured with tenderness and discretion.',
    colSpanDesktop: 'md:col-span-4',
    aspectRatio: 'aspect-[4/5]'
  },
  {
    id: 'plate-11',
    plateNumber: 'PLATE NO. 11',
    title: 'Grand Baaraat & Festive Joy',
    couple: 'The Celebration Entourage',
    location: 'Delhi Lawn Pavilions',
    category: 'events',
    imageUrl: 'https://lh3.googleusercontent.com/grass-cs/AABkmLcFpde1aWOd3adQFD_Y0Upa1nelHhJdpZjS3VhTaT6sE1uPKse-6MZ3BlKqOVz1zd16s3aul1ABNg4LPdESaayRtia-0iDaE7EGKTuqAATxT2_ZHBULHWszExB0KyMpeveyhXa0b8kRQeev',
    gear: 'Leica SL2 • 24-70mm f/2.8',
    filmStock: 'Festive Sparkle Atmosphere',
    caption: 'Unrestrained happiness, dhol rhythms, and family camaraderie that define an Indian wedding.',
    emotionalStory: 'Laughter echoing across the venue as cousins and uncles celebrate the start of a lifetime together.',
    colSpanDesktop: 'md:col-span-6',
    aspectRatio: 'aspect-[4/3]'
  },
  {
    id: 'plate-12',
    plateNumber: 'PLATE NO. 12',
    title: 'Sacred Pheras & Eternal Vows',
    couple: 'United in Agni',
    location: 'Mandapam Pavilion, Delhi',
    category: 'pheras',
    imageUrl: 'https://lh3.googleusercontent.com/grass-cs/AABkmLd8AXSbwUzVTY_wme_w-uCsNkg4XqN6bpjABDP18hALZ2JLuW2XHuogVpqnMuZtOdZ_9om3Sb5oV8USVAkZn0tBi1dl9tfU7YdkrhwRRwvDt9P-gWb6sDChiRZL_br6ZQznAioOoTu12qg',
    gear: 'Nikon Z9 • 85mm f/1.2 S',
    filmStock: 'Golden Firelight Natural Curve',
    caption: 'Seven steps around the holy fire to seal companionship across all lifetimes.',
    emotionalStory: 'The solemn grace of Vedic rituals captured with pure artistic reverence.',
    colSpanDesktop: 'md:col-span-6',
    aspectRatio: 'aspect-[4/3]'
  }
];

export interface InvestmentTier {
  id: string;
  collectionNumber: string;
  subtitle: string;
  name: string;
  nameHighlight: string;
  pricingNote: string;
  duration: string;
  isPatronPreferred?: boolean;
  features: { label: string; detail: string }[];
  ctaText: string;
}

export const INVESTMENT_TIERS: InvestmentTier[] = [
  {
    id: 'tier-1',
    collectionNumber: 'COLLECTION NO. I',
    subtitle: 'Intimate Nuptials & Sittings',
    name: 'The Atelier',
    nameHighlight: 'Monograph',
    pricingNote: 'Bespoke Consultation • Tailored to Ceremony Scale',
    duration: '1 Full Day or 2 Intimate Half-Days (up to 12 hours)',
    features: [
      { label: 'Coverage', detail: '1 Full Day or 2 Intimate Half-Days (up to 12 hours)' },
      { label: 'Artisans', detail: 'Senior Associate Photographer & Cinematographer' },
      { label: 'Still Yield', detail: '400+ Hand-Retouched Master Color Plates' },
      { label: 'Haute Cinema', detail: '5-7 Minute 4K Cinematic Highlight Vignette' },
      { label: 'Bookbinding', detail: '12×12 Linen Bound 40-Page Layflat Folio' },
      { label: 'Delivery', detail: 'Private Encrypted Gallery Cloud Archive (10 Yrs)' }
    ],
    ctaText: 'Inquire For Monograph Availability'
  },
  {
    id: 'tier-2',
    collectionNumber: 'PATRON PREFERRED — NO. II',
    subtitle: 'Tri-Nuptial Court Monograph',
    name: 'The Golden',
    nameHighlight: 'Heritage',
    pricingNote: 'Archival Preservation Suite Included • Custom Proposal',
    duration: '3 Full Days Complete Immersion (Sangeet, Phere, Reception)',
    isPatronPreferred: true,
    features: [
      { label: 'Coverage', detail: '3 Full Days Complete Immersion (Sangeet, Phere, Reception)' },
      { label: 'Artisan Guild', detail: '2 Master Photographers + 2 Motion Cinematographers' },
      { label: 'Still Yield', detail: '850+ Fine Art Color Corrected & Retouched Plates' },
      { label: 'Haute Cinema', detail: '15-20 Min Theatrical Wedding Film + 4 Min Teaser' },
      { label: 'Aerial Suite', detail: 'Single Certified 4K Drone Operator for Palace Grounds' },
      { label: 'Heirloom Album', detail: 'Handcrafted 14×14 Silk Velvet 60-Page Volume' },
      { label: 'Curator Box', detail: 'Gilded Walnut Heirloom USB & 20 Cotton Rag Matted Prints' }
    ],
    ctaText: 'Request Heritage Proposal'
  },
  {
    id: 'tier-3',
    collectionNumber: 'COLLECTION NO. III',
    subtitle: 'Sovereign Grand Monograph',
    name: 'The Imperial',
    nameHighlight: 'Heirloom',
    pricingNote: 'Principal Director RK Personally Present • Comprehensive',
    duration: '5 Days Comprehensive Festivities & Pre-Shoots',
    features: [
      { label: 'Direction', detail: 'Personally Directed & Captured by Founder RK' },
      { label: 'Coverage', detail: '5 Days Comprehensive Festivities & Pre-Shoots' },
      { label: 'Full Guild', detail: '4 Master Stills Artisans + 3 Cinema Specialists' },
      { label: 'Aerial Guild', detail: 'Dual Sync Drones (Indoor Micro-FPV + Outdoor 6K)' },
      { label: 'Stills Yield', detail: '1,500+ Archival Grade Frames + Hasselblad Session' },
      { label: 'Cinema Suite', detail: '40-Min Feature Film + 6-Min Haute Trailer + Raw SSD' },
      { label: 'Leather Heirlooms', detail: 'Florentine Gold-Embossed Master Album + 2 Parent Folios' }
    ],
    ctaText: 'Request Private Audience'
  }
];

export interface DeliverableRow {
  discipline: string;
  monograph: string;
  golden: string;
  imperial: string;
}

export const DELIVERABLE_MATRIX: DeliverableRow[] = [
  { discipline: 'Principal Directorship', monograph: 'Senior Atelier Fellow', golden: 'Lead Cinématographe Guild', imperial: 'Personally by Founder RK' },
  { discipline: 'Duration of Ceremony Coverage', monograph: '1–2 Days (12 Hours Total)', golden: '3 Full Days (Unrestricted)', imperial: '5 Full Days All Access' },
  { discipline: 'Total Artisan Fleet on Grounds', monograph: '2 Master Artisans', golden: '4 Master Artisans + 1 Aerialist', imperial: '7 Artisans + 2 Drone Pilots' },
  { discipline: 'Master Still Retouched Plates', monograph: '400+ Curated Plates', golden: '850+ Fine Art Plates', imperial: '1,500+ Museum Plates' },
  { discipline: 'Medium Format 100MP Sessions', monograph: '—', golden: 'Bridal Solo Portraiture', imperial: 'Full Bridal, Groom & Couple Sittings' },
  { discipline: 'Cinematographic Cut & Theatrical Film', monograph: '5-Min Highlight Capsule', golden: '15-20 Min Feature + Teaser', imperial: '40-Min Feature + SDE + Teaser' },
  { discipline: 'Drone & Aerial Architecture', monograph: '—', golden: 'Single 4K Drone Included', imperial: 'Dual Drones (FPV & 6K Pro)' },
  { discipline: 'Physical Heirloom Binding', monograph: '12×12 Linen Folio (40pp)', golden: '14×14 Silk Velvet (60pp)', imperial: '16×16 Florentine Leather + 2 Parents' },
  { discipline: 'Raw Cinema SSD Drive Vault', monograph: 'Optional Upgrade', golden: 'Optional Upgrade', imperial: 'Included (2TB LaCie Rugged Pro)' },
  { discipline: 'Curated Archival Turnaround', monograph: '8 Weeks', golden: '6 Weeks (Teaser in 72 Hrs)', imperial: '30 Days Priority White-Glove' }
];

export interface EnhancementItem {
  code: string;
  title: string;
  description: string;
  badge: string;
  icon: string;
}

export const ENHANCEMENTS: EnhancementItem[] = [
  {
    code: 'ENH-01',
    title: 'Same-Day Reception Cinema Edit',
    description: 'A dedicated on-site editor crafting a 3-minute cinematic showreel projected during the evening gala dinner.',
    badge: 'On-Site Fleet',
    icon: 'speed'
  },
  {
    code: 'ENH-02',
    title: 'Pair of Parent Mini-Heirloom Folios',
    description: 'Exact 10×10 companion duplicates of the primary couple album bound in Japanese bookcloth with custom foil family monograms.',
    badge: 'Set of Two',
    icon: 'auto_stories'
  },
  {
    code: 'ENH-03',
    title: 'Aerobatic FPV Drone Suite',
    description: 'Dynamic acrobatic high-speed one-take flythroughs skimming palace corridors, grand chandeliers, and expansive courtyard gatherings.',
    badge: 'Per Event Day',
    icon: 'flight'
  },
  {
    code: 'ENH-04',
    title: 'Raw Cinema Uncut SSD Drive Vault',
    description: 'Every uncompressed Apple ProRes & Sony RAW motion recording provided on an engraved 2TB LaCie Rugged armored solid state drive.',
    badge: 'Physical Hardware',
    icon: 'database'
  },
  {
    code: 'ENH-05',
    title: '35mm Kodak Portra Analog Session',
    description: '10 rolls of Kodak Portra 400 & Tri-X black and white shot on vintage Leica M cameras, accompanied by hand-developed contact sheets.',
    badge: '360 Analog Frames',
    icon: 'camera'
  },
  {
    code: 'ENH-06',
    title: 'Archival Platinum Pigment Prints',
    description: 'Set of five 24×36-inch museum-grade Hahnemühle rag prints signed by RK with 200-year anti-fading archival certification.',
    badge: '5 Framed Folios',
    icon: 'history_edu'
  }
];

export interface StudioService {
  id: string;
  title: string;
  description: string;
  category: 'weddings' | 'cinema' | 'aerial' | 'portraits' | 'lab' | 'regional';
  icon: string;
}

export const EXTRA_SERVICES: StudioService[] = [
  {
    "id": "srv-1",
    "title": "Wedding And Engagement Photo",
    "description": "Capture your wedding and engagement moments beautifully with RK Photo Studio Rohini Sector 23. We specialize in candid wedding photography that tells your love story naturally, serving couples across Rohini, Delhi.",
    "category": "weddings",
    "icon": "Camera"
  },
  {
    "id": "srv-2",
    "title": "Aerial Photographs",
    "description": "Aerial wedding photography brings a stunning perspective to your special day. RK Photo Studio Rohini Sector 23 captures breathtaking overhead shots of your venue and celebration in Rohini, Delhi.",
    "category": "aerial",
    "icon": "Plane"
  },
  {
    "id": "srv-3",
    "title": "Beach Wedding",
    "description": "Beach wedding photography services capture the romance of seaside ceremonies. RK Photo Studio Rohini Sector 23 in Rohini, Delhi documents your coastal celebration with natural lighting and candid moments.",
    "category": "weddings",
    "icon": "Camera"
  },
  {
    "id": "srv-4",
    "title": "Bridal Photography",
    "description": "Bridal photography sessions highlight your beauty and elegance on your wedding day. RK Photo Studio Rohini Sector 23 creates stunning bridal portraits with expert photography bridal poses in Rohini, Delhi.",
    "category": "weddings",
    "icon": "Camera"
  },
  {
    "id": "srv-5",
    "title": "Corporate Photo",
    "description": "Corporate photography services for businesses in Rohini, Delhi. RK Photo Studio Rohini Sector 23 delivers professional images for your company events, team photos, and corporate headshots.",
    "category": "portraits",
    "icon": "Users"
  },
  {
    "id": "srv-6",
    "title": "Couple Photography",
    "description": "Couples photography captures the connection between you and your partner. RK Photo Studio Rohini Sector 23 in Rohini, Delhi creates intimate and natural images that celebrate your relationship beautifully.",
    "category": "weddings",
    "icon": "Camera"
  },
  {
    "id": "srv-7",
    "title": "Destination Wedding Photography",
    "description": "Destination wedding photography for couples celebrating away from home. RK Photo Studio Rohini Sector 23, based in Rohini, Delhi, travels to document your special day wherever your journey takes you.",
    "category": "weddings",
    "icon": "Camera"
  },
  {
    "id": "srv-8",
    "title": "Elopement Photography",
    "description": "Elopement photography captures intimate ceremonies with authenticity. RK Photo Studio Rohini Sector 23 in Rohini, Delhi documents your private celebration with discretion and artistic vision.",
    "category": "weddings",
    "icon": "Camera"
  },
  {
    "id": "srv-9",
    "title": "Events And Parties Photo",
    "description": "Events and parties photography preserves your celebration memories. RK Photo Studio Rohini Sector 23 covers all types of gatherings in Rohini, Delhi with professional and candid coverage.",
    "category": "weddings",
    "icon": "Camera"
  },
  {
    "id": "srv-10",
    "title": "Family And Group Photo",
    "description": "Family and group photography brings everyone together for lasting memories. RK Photo Studio Rohini Sector 23 in Rohini, Delhi creates warm, natural portraits of your loved ones.",
    "category": "portraits",
    "icon": "Users"
  },
  {
    "id": "srv-11",
    "title": "Headshots And Portraits",
    "description": "Headshots and portraits for professionals and individuals. RK Photo Studio Rohini Sector 23 in Rohini, Delhi provides polished images perfect for LinkedIn, resumes, and personal branding.",
    "category": "portraits",
    "icon": "Users"
  },
  {
    "id": "srv-12",
    "title": "Honeymoons",
    "description": "Honeymoon photography captures romantic moments from your first trip as newlyweds. RK Photo Studio Rohini Sector 23, based in Rohini, Delhi, documents your special journey with beautiful imagery.",
    "category": "weddings",
    "icon": "Camera"
  },
  {
    "id": "srv-13",
    "title": "Individual Photo",
    "description": "Individual photography sessions showcase your personality and style. RK Photo Studio Rohini Sector 23 in Rohini, Delhi creates personalized portraits that reflect who you are.",
    "category": "weddings",
    "icon": "Camera"
  },
  {
    "id": "srv-14",
    "title": "Marriage Proposal Photography",
    "description": "Marriage proposal photography captures the moment you ask forever. RK Photo Studio Rohini Sector 23 in Rohini, Delhi discreetly documents your proposal with emotion and authenticity.",
    "category": "weddings",
    "icon": "Camera"
  },
  {
    "id": "srv-15",
    "title": "Maternity And Newborn Photo",
    "description": "Maternity and newborn photography celebrates new life and growing families. RK Photo Studio Rohini Sector 23 in Rohini, Delhi creates gentle, beautiful images of your precious moments.",
    "category": "portraits",
    "icon": "Users"
  },
  {
    "id": "srv-16",
    "title": "Photo Booth Rental",
    "description": "Photo booth rentals add fun to any event. RK Photo Studio Rohini Sector 23 provides entertaining photo booth setups for weddings and parties throughout Rohini, Delhi.",
    "category": "portraits",
    "icon": "Users"
  },
  {
    "id": "srv-17",
    "title": "Photo Editing",
    "description": "Photo editing services enhance your images with professional retouching. RK Photo Studio Rohini Sector 23 in Rohini, Delhi refines color, lighting, and composition to perfect your photos.",
    "category": "cinema",
    "icon": "Film"
  },
  {
    "id": "srv-18",
    "title": "Pre Wedding Photo Shoot",
    "description": "Pre-wedding photo shoots capture your romance before the big day. RK Photo Studio Rohini Sector 23 specializes in pre wedding photography across beautiful locations in Rohini, Delhi.",
    "category": "weddings",
    "icon": "Camera"
  },
  {
    "id": "srv-19",
    "title": "Product Photo",
    "description": "Product photography showcases your merchandise professionally. RK Photo Studio Rohini Sector 23 in Rohini, Delhi creates high-quality images for e-commerce, catalogs, and marketing materials.",
    "category": "portraits",
    "icon": "Users"
  },
  {
    "id": "srv-20",
    "title": "Real Estate Photo",
    "description": "Real estate photography presents properties in their best light. RK Photo Studio Rohini Sector 23 in Rohini, Delhi captures stunning images that help sell homes and commercial spaces faster.",
    "category": "portraits",
    "icon": "Users"
  },
  {
    "id": "srv-21",
    "title": "Rural Wedding",
    "description": "Rural wedding photography documents countryside celebrations with charm. RK Photo Studio Rohini Sector 23, based in Rohini, Delhi, travels to capture authentic village wedding traditions.",
    "category": "weddings",
    "icon": "Camera"
  },
  {
    "id": "srv-22",
    "title": "School Portraits",
    "description": "School portraits capture students at every stage of learning. RK Photo Studio Rohini Sector 23 in Rohini, Delhi provides professional photography for schools and educational institutions.",
    "category": "portraits",
    "icon": "Users"
  },
  {
    "id": "srv-23",
    "title": "Trash The Dress Rehearsal",
    "description": "Trash-the-dress photography creates adventurous post-wedding images. RK Photo Studio Rohini Sector 23 in Rohini, Delhi captures creative and carefree moments in your wedding gown.",
    "category": "weddings",
    "icon": "Camera"
  },
  {
    "id": "srv-24",
    "title": "Wedding Albums",
    "description": "Wedding albums preserve your marriage photos in beautiful keepsakes. RK Photo Studio Rohini Sector 23 in Rohini, Delhi designs custom albums that tell your wedding story elegantly.",
    "category": "weddings",
    "icon": "Camera"
  },
  {
    "id": "srv-25",
    "title": "Wedding Ceremony Photography",
    "description": "Wedding ceremony photography documents every ritual and emotion. RK Photo Studio Rohini Sector 23 in Rohini, Delhi captures your vows and traditions with sensitivity and artistry.",
    "category": "weddings",
    "icon": "Camera"
  },
  {
    "id": "srv-26",
    "title": "Wedding Photo Packages",
    "description": "Wedding photo packages offer complete coverage for your celebration. RK Photo Studio Rohini Sector 23 in Rohini, Delhi provides flexible packages tailored to your needs and budget.",
    "category": "weddings",
    "icon": "Camera"
  },
  {
    "id": "srv-27",
    "title": "Making Of Wedding Photography",
    "description": "Wedding preparations photography captures getting-ready moments. RK Photo Studio Rohini Sector 23 in Rohini, Delhi documents the excitement and anticipation before your ceremony begins.",
    "category": "weddings",
    "icon": "Camera"
  },
  {
    "id": "srv-28",
    "title": "Wedding Rehearsal",
    "description": "Wedding rehearsal photography covers your practice ceremony. RK Photo Studio Rohini Sector 23 in Rohini, Delhi captures candid moments as you prepare for your big day.",
    "category": "weddings",
    "icon": "Camera"
  },
  {
    "id": "srv-29",
    "title": "Photo Albums",
    "description": "Photo albums transform your memories into tangible treasures. RK Photo Studio Rohini Sector 23 in Rohini, Delhi creates beautifully designed albums for any occasion.",
    "category": "weddings",
    "icon": "Camera"
  },
  {
    "id": "srv-30",
    "title": "Photo Frames",
    "description": "Photo framing services display your images beautifully. RK Photo Studio Rohini Sector 23 in Rohini, Delhi offers custom framing solutions that complement your photos and décor.",
    "category": "lab",
    "icon": "Palette"
  },
  {
    "id": "srv-31",
    "title": "Photo Printing",
    "description": "Photo printing brings your digital images to life. RK Photo Studio Rohini Sector 23 in Rohini, Delhi delivers high-quality prints in various sizes and finishes.",
    "category": "lab",
    "icon": "Palette"
  },
  {
    "id": "srv-32",
    "title": "Passport Photos",
    "description": "Passport photography meets official requirements for travel documents. RK Photo Studio Rohini Sector 23 in Rohini, Delhi provides quick, compliant passport photos.",
    "category": "lab",
    "icon": "Palette"
  },
  {
    "id": "srv-33",
    "title": "Canvas Printing",
    "description": "Canvas printing transforms your photos into gallery-quality art. RK Photo Studio Rohini Sector 23 in Rohini, Delhi creates stunning canvas prints for home and office display.",
    "category": "lab",
    "icon": "Palette"
  },
  {
    "id": "srv-34",
    "title": "Mug Printing",
    "description": "Mug printing personalizes everyday items with your favorite photos. RK Photo Studio Rohini Sector 23 in Rohini, Delhi creates custom photo mugs perfect for gifts.",
    "category": "lab",
    "icon": "Palette"
  },
  {
    "id": "srv-35",
    "title": "Online Photo Ordering",
    "description": "Online photo ordering makes getting prints convenient. RK Photo Studio Rohini Sector 23 in Rohini, Delhi lets you order prints and products from home with easy delivery.",
    "category": "weddings",
    "icon": "Camera"
  },
  {
    "id": "srv-36",
    "title": "Same Day Photo Service",
    "description": "Same-day photo service provides quick turnaround when you need it. RK Photo Studio Rohini Sector 23 in Rohini, Delhi delivers fast printing without compromising quality.",
    "category": "weddings",
    "icon": "Camera"
  },
  {
    "id": "srv-37",
    "title": "Self Service Photos",
    "description": "Self service photos let you print images at your convenience. RK Photo Studio Rohini Sector 23 in Rohini, Delhi offers easy-to-use kiosks for instant printing.",
    "category": "lab",
    "icon": "Palette"
  },
  {
    "id": "srv-38",
    "title": "photography rohini",
    "description": "Photography services in Rohini for all occasions. RK Photo Studio Rohini Sector 23 provides professional wedding photoshoot and portrait photography throughout Rohini, Delhi.",
    "category": "regional",
    "icon": "MapPin"
  },
  {
    "id": "srv-39",
    "title": "photography pitampura",
    "description": "Photography services covering Pitampura and surrounding areas. RK Photo Studio Rohini Sector 23, based in Rohini, Delhi, serves clients in Pitampura with complete photography solutions.",
    "category": "regional",
    "icon": "MapPin"
  },
  {
    "id": "srv-40",
    "title": "photography paschim vihar",
    "description": "Photography services for Paschim Vihar residents and events. RK Photo Studio Rohini Sector 23 in Rohini, Delhi extends professional photography coverage to Paschim Vihar.",
    "category": "regional",
    "icon": "MapPin"
  },
  {
    "id": "srv-41",
    "title": "photography kamjhawla",
    "description": "Photography services available in Kamjhawla area. RK Photo Studio Rohini Sector 23, located in Rohini, Delhi, provides photography coverage for Kamjhawla events and portraits.",
    "category": "regional",
    "icon": "MapPin"
  },
  {
    "id": "srv-42",
    "title": "Wedding Videography",
    "description": "Wedding videography captures your celebration in motion. RK Photo Studio Rohini Sector 23 in Rohini, Delhi creates cinematic films that preserve your wedding day forever.",
    "category": "cinema",
    "icon": "Film"
  },
  {
    "id": "srv-43",
    "title": "Baby Photos",
    "description": "Baby photography captures precious early moments. RK Photo Studio Rohini Sector 23 in Rohini, Delhi creates adorable images of your little one with patience and care.",
    "category": "portraits",
    "icon": "Users"
  },
  {
    "id": "srv-44",
    "title": "Portrait Photography",
    "description": "Portrait photography showcases individuals with artistic vision. RK Photo Studio Rohini Sector 23 in Rohini, Delhi creates timeless portraits that capture personality and character.",
    "category": "weddings",
    "icon": "Camera"
  },
  {
    "id": "srv-45",
    "title": "Photo Restoration",
    "description": "Photo restoration brings old and damaged photos back to life. RK Photo Studio Rohini Sector 23 in Rohini, Delhi digitally repairs and enhances your cherished memories.",
    "category": "lab",
    "icon": "Palette"
  },
  {
    "id": "srv-46",
    "title": "Newborn Photography",
    "description": "Newborn photography captures your baby&#x27;s first days. RK Photo Studio Rohini Sector 23 in Rohini, Delhi specializes in safe, gentle sessions for newborns and families.",
    "category": "weddings",
    "icon": "Camera"
  },
  {
    "id": "srv-47",
    "title": "Childrens Photography",
    "description": "Children&#x27;s photography captures youthful energy and innocence. RK Photo Studio Rohini Sector 23 in Rohini, Delhi creates playful, natural images of kids at every age.",
    "category": "portraits",
    "icon": "Users"
  },
  {
    "id": "srv-48",
    "title": "Party Photography",
    "description": "Party photography documents celebrations with energy and fun. RK Photo Studio Rohini Sector 23 in Rohini, Delhi covers birthday parties and social events with vibrant imagery.",
    "category": "portraits",
    "icon": "Users"
  },
  {
    "id": "srv-49",
    "title": "Group Photography",
    "description": "Group photography brings teams and families together. RK Photo Studio Rohini Sector 23 in Rohini, Delhi organizes and captures large groups with professionalism.",
    "category": "portraits",
    "icon": "Users"
  },
  {
    "id": "srv-50",
    "title": "Headshot Photography",
    "description": "Headshot photography creates professional images for your career. RK Photo Studio Rohini Sector 23 in Rohini, Delhi delivers polished headshots for business and personal use.",
    "category": "portraits",
    "icon": "Users"
  },
  {
    "id": "srv-51",
    "title": "Retouching",
    "description": "Photo retouching perfects your images with subtle enhancements. RK Photo Studio Rohini Sector 23 in Rohini, Delhi provides professional retouching that looks natural.",
    "category": "lab",
    "icon": "Palette"
  },
  {
    "id": "srv-52",
    "title": "Photo Enlargements",
    "description": "Photo enlargements turn favorite images into statement pieces. RK Photo Studio Rohini Sector 23 in Rohini, Delhi produces large-format prints with exceptional clarity.",
    "category": "weddings",
    "icon": "Camera"
  },
  {
    "id": "srv-53",
    "title": "Graduation Photography",
    "description": "Graduation photography celebrates academic achievements. RK Photo Studio Rohini Sector 23 in Rohini, Delhi captures milestone moments for graduates and their families.",
    "category": "portraits",
    "icon": "Users"
  },
  {
    "id": "srv-54",
    "title": "Black And White",
    "description": "Black-and-white photography creates timeless, artistic images. RK Photo Studio Rohini Sector 23 in Rohini, Delhi specializes in monochrome photography with dramatic impact.",
    "category": "portraits",
    "icon": "Users"
  },
  {
    "id": "srv-55",
    "title": "Fine Art Photography",
    "description": "Fine art photography transforms moments into artistic expressions. RK Photo Studio Rohini Sector 23 in Rohini, Delhi creates gallery-worthy images with creative vision.",
    "category": "portraits",
    "icon": "Users"
  },
  {
    "id": "srv-56",
    "title": "Studio Rentals",
    "description": "Studio rental provides professional space for your photo shoots. RK Photo Studio Rohini Sector 23 in Rohini, Delhi offers fully equipped studio space with lighting and backdrops.",
    "category": "portraits",
    "icon": "Users"
  },
  {
    "id": "srv-57",
    "title": "Commercial Photography",
    "description": "Commercial photography serves businesses and brands. RK Photo Studio Rohini Sector 23 in Rohini, Delhi creates compelling images for advertising, marketing, and corporate communications.",
    "category": "portraits",
    "icon": "Users"
  },
  {
    "id": "srv-58",
    "title": "Digital Printing",
    "description": "Digital printing delivers high-quality photo prints quickly. RK Photo Studio Rohini Sector 23 in Rohini, Delhi uses advanced technology for vibrant, lasting prints.",
    "category": "lab",
    "icon": "Palette"
  },
  {
    "id": "srv-59",
    "title": "Posters",
    "description": "Poster printing creates large-format displays for any purpose. RK Photo Studio Rohini Sector 23 in Rohini, Delhi produces eye-catching posters for events and promotions.",
    "category": "lab",
    "icon": "Palette"
  },
  {
    "id": "srv-60",
    "title": "Specialty Printing",
    "description": "Specialty printing offers unique photo products. RK Photo Studio Rohini Sector 23 in Rohini, Delhi creates custom prints on various materials and surfaces.",
    "category": "lab",
    "icon": "Palette"
  },
  {
    "id": "srv-61",
    "title": "Card Printing",
    "description": "Card printing creates personalized greeting cards and invitations. RK Photo Studio Rohini Sector 23 in Rohini, Delhi designs custom cards with your photos.",
    "category": "lab",
    "icon": "Palette"
  },
  {
    "id": "srv-62",
    "title": "Video Service",
    "description": "Videography services capture events in cinematic quality. RK Photo Studio Rohini Sector 23 in Rohini, Delhi provides comprehensive video coverage for all occasions.",
    "category": "cinema",
    "icon": "Film"
  },
  {
    "id": "srv-63",
    "title": "Event Video Production",
    "description": "Event video production documents your gatherings professionally. RK Photo Studio Rohini Sector 23 in Rohini, Delhi creates engaging videos of conferences, parties, and celebrations.",
    "category": "cinema",
    "icon": "Film"
  },
  {
    "id": "srv-64",
    "title": "Special Event Productions",
    "description": "Special event productions capture milestone celebrations. RK Photo Studio Rohini Sector 23 in Rohini, Delhi produces memorable videos for anniversaries, retirements, and special occasions.",
    "category": "cinema",
    "icon": "Film"
  },
  {
    "id": "srv-65",
    "title": "Full Service Video Production",
    "description": "Full-service video production handles every aspect of filmmaking. RK Photo Studio Rohini Sector 23 in Rohini, Delhi manages planning, shooting, and editing for complete video projects.",
    "category": "cinema",
    "icon": "Film"
  },
  {
    "id": "srv-66",
    "title": "Video Editing",
    "description": "Video editing transforms raw footage into polished films. RK Photo Studio Rohini Sector 23 in Rohini, Delhi provides professional editing with music, effects, and color grading.",
    "category": "cinema",
    "icon": "Film"
  },
  {
    "id": "srv-67",
    "title": "Post Production Services",
    "description": "Post-production services refine your video projects. RK Photo Studio Rohini Sector 23 in Rohini, Delhi offers editing, color correction, and sound design for professional results.",
    "category": "cinema",
    "icon": "Film"
  },
  {
    "id": "srv-68",
    "title": "Pre Production Services",
    "description": "Pre-production services plan your video projects thoroughly. RK Photo Studio Rohini Sector 23 in Rohini, Delhi handles scripting, storyboarding, and scheduling for smooth shoots.",
    "category": "cinema",
    "icon": "Film"
  },
  {
    "id": "srv-69",
    "title": "Elopement Videography",
    "description": "Elopement videography films intimate wedding ceremonies. RK Photo Studio Rohini Sector 23 in Rohini, Delhi creates discreet, beautiful videos of your private celebration.",
    "category": "cinema",
    "icon": "Film"
  },
  {
    "id": "srv-70",
    "title": "Aerial Videography",
    "description": "Aerial videography adds dramatic perspectives to your videos. RK Photo Studio Rohini Sector 23 in Rohini, Delhi captures stunning overhead footage for weddings and events.",
    "category": "cinema",
    "icon": "Film"
  },
  {
    "id": "srv-71",
    "title": "Product Demonstrations",
    "description": "Product demonstration videos showcase how items work. RK Photo Studio Rohini Sector 23 in Rohini, Delhi creates clear, engaging videos for marketing and training purposes.",
    "category": "portraits",
    "icon": "Users"
  },
  {
    "id": "srv-72",
    "title": "Promotional Video Production",
    "description": "Promotional video production markets your business effectively. RK Photo Studio Rohini Sector 23 in Rohini, Delhi creates compelling videos that attract customers and build brands.",
    "category": "cinema",
    "icon": "Film"
  },
  {
    "id": "srv-73",
    "title": "Family Video Productions",
    "description": "Family video productions preserve your family stories. RK Photo Studio Rohini Sector 23 in Rohini, Delhi creates heartwarming videos of family gatherings and milestones.",
    "category": "cinema",
    "icon": "Film"
  },
  {
    "id": "srv-74",
    "title": "Aerial Photography",
    "description": "Aerial photography captures stunning bird&#x27;s-eye views. RK Photo Studio Rohini Sector 23 in Rohini, Delhi uses drone technology for unique perspectives of events and properties.",
    "category": "aerial",
    "icon": "Plane"
  }
];

export interface StudioProduct {
  id: string;
  title: string;
  category: string;
  imageUrl: string;
  description: string;
  features: string[];
}

export const STUDIO_PRODUCTS: StudioProduct[] = [
  {
    id: 'prod-1',
    title: 'Personalized Floral Ring | Together Forever',
    category: 'Custom Keepsakes & Frames',
    imageUrl: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRLnWTcDdGdfugmzWqAnlB_Mf6KtfzBa6ORWy7jxYwmWf0r&usqp=CAY&s=4',
    description: 'Custom handcrafted floral ring keepsake plaque inscribed with couple names, engagement date, preserved floral accents, and golden calligraphic lettering.',
    features: [
      'Custom couple names & engagement / wedding date engraving',
      'Preserved botanical florals & golden calligraphy accents',
      'Museum-clear acrylic encasement with velvet backing',
      'Perfect heirloom gift for anniversaries and bridal sittings'
    ]
  },
  {
    id: 'prod-2',
    title: 'his, Nala Her Simba',
    category: 'Bespoke Couple Framing',
    imageUrl: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRC_VPGhPwhfcignVU2-8XkbfkwsFEuZqkBGveD12bymeCg&usqp=CAY&s=4',
    description: 'Bespoke romantic duo portrait keepsake inspired by eternal loyalty, customized with your pre-wedding photographs, personal vows, and premium wood framing.',
    features: [
      'Dual portrait composite with custom vow etching',
      'Fine art cotton rag print with 100-year fade resistance',
      'Handcrafted matte black or gilded champagne frame',
      'Ready to hang with archival mounting hardware'
    ]
  },
  {
    id: 'prod-3',
    title: 'Magic Mugs',
    category: 'Personalized Photo Keepsakes',
    imageUrl: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRc1dqInGR8jJJhWiUJRv788-S0wGn21APbJDohwDgX5gJ6&usqp=CAY&s=4',
    description: 'Heat-sensitive thermochromic ceramic photo mug that reveals your cherished wedding or pre-wedding portrait in vivid color when filled with a warm beverage.',
    features: [
      'Heat-activated reveal effect with ultra-high resolution printing',
      'Premium ceramic with glossy scratch-resistant finish',
      'Dishwasher and microwave safe thermal coating',
      'Popular personalized favor for family elders and wedding guests'
    ]
  },
  {
    id: 'prod-4',
    title: 'Handcrafted Tuscan Leather Heirloom Album',
    category: 'Archival Bookbinding',
    imageUrl: 'https://lh3.googleusercontent.com/grass-cs/AABkmLeYZRpZUY8-JjJXDpSOPKGDSBHxKrmnqmybImEt4YXaNsm9szA4wlhifuAiMlrr5_SI0nY549ep1KJMCfth5cvvIEdhAUIkP9ggCRaiBWcNN7wA7X4nZliUX9n1G4zhPytccAH2MCWi6R7z',
    description: 'Florentine full-grain leather master wedding album hand-bound with seamless layflat panoramic spreads, thick archival art paper, and gold-foil family debossing.',
    features: [
      'Seamless 180° layflat panoramic double-page spreads',
      'Fuji Crystal Archive HD photographic paper',
      'Custom embossed couple crest and wedding date in real gold foil',
      'Fitted wooden archival presentation box included'
    ]
  }
];

export interface StudioPost {
  id: string;
  title: string;
  date: string;
  imageUrl: string;
  excerpt: string;
  content: string;
  highlights: string[];
}

export const STUDIO_POSTS: StudioPost[] = [
  {
    id: 'post-1',
    title: 'Your wedding deserves more than basic coverage – it deserves a cinematic film that captures emotions',
    date: 'October 18, 2026',
    imageUrl: 'https://lh3.googleusercontent.com/p/AF1QipPXNsWaOa-l_m6BAPnuPcHT_XQuLNM0zc-0dR4y',
    excerpt: 'At RK Photo Studio Rohini Sector 23, we blend creative storytelling with modern wedding photography and film-making to turn your big day into a timeless movie you’ll love to rewatch.',
    content: 'Looking for a photo studio near me or a photographer near me for your wedding? Our experienced team in Rohini, Delhi specialises in cinematic wedding films, candid wedding photography and elegant pre wedding shoot in Delhi locations that truly reflect your journey together.',
    highlights: [
      'Cinematic wedding films with story-driven editing and soulful music',
      'Natural, candid wedding photography that captures real emotions, not forced poses',
      'Creative pre wedding concepts across iconic Delhi and Rohini spots',
      'Convenient photo studio in Rohini for consultations, photo selection and photo printing'
    ]
  },
  {
    id: 'post-2',
    title: 'Planning your dream wedding in Rohini, Delhi? Capture every emotion, ritual and candid smile',
    date: 'October 17, 2026',
    imageUrl: 'https://lh3.googleusercontent.com/p/AF1QipNaibQ6QRn0sg6ZarJrAh_4LVaEVjg-uw5ZWpC_',
    excerpt: 'Planning your dream wedding in Rohini, Delhi? Capture every emotion, ritual and candid smile with RK Photo Studio Rohini Sector 23.',
    content: 'Our experienced team specializes in capturing intimate nuptials and lavish celebrations alike. From early morning Haldi to midnight Saptapadi vows, our unobtrusive documentary approach lets you live every moment fully.',
    highlights: [
      'Over 17 years of trusted wedding photography across Delhi NCR',
      'State of the art 4K cinema cameras and certified drone pilots',
      'Customized albums with velvety finishes and lifetime color guarantee',
      'Personalized consultations right opposite SBI Bank, Sector 20 / 23 Rohini'
    ]
  },
  {
    id: 'post-3',
    title: 'Your wedding day is made of real, unscripted moments – and that’s exactly what we love to preserve',
    date: 'October 16, 2026',
    imageUrl: 'https://lh3.googleusercontent.com/p/AF1QipPek6QRiBu19g4HrTxA-xaF97Ax8Nrta0sTfcK2',
    excerpt: 'Your wedding day is made of real, unscripted moments – and that’s exactly what we love to preserve at RK Photo Studio Rohini Sector 23.',
    content: 'Every bride’s tear during Vidai, every proud glance from the father of the bride, and every joyful dance move during the Baaraat has a sacred heartbeat. We preserve it with grace and artistic precision.',
    highlights: [
      'Unscripted, genuine human connections over posed artificial shots',
      'Same day teasers and swift turnaround for family sharing',
      'Archival restoration of ancestral portraits alongside modern nuptials',
      'Friendly, courteous team with dedicated wedding directors'
    ]
  }
];

export const STUDIO_GALLERY_PHOTOS: string[] = [
  "https://lh3.googleusercontent.com/grass-cs/AABkmLfwfiJ0rCtmFPPifsbafMmi_sY-n80iSjbbFSZMmermI3EgaQHbV130aCmAcIrkbWBU8IkMlxabJwkTdSyVAIdpUHTzsV3iLKcctkFY8pBH406daL_EwvE258n30Qe4c0SBPTF6o3ZZ-1Vn=s0",
  "https://lh3.googleusercontent.com/grass-cs/AABkmLeYZRpZUY8-JjJXDpSOPKGDSBHxKrmnqmybImEt4YXaNsm9szA4wlhifuAiMlrr5_SI0nY549ep1KJMCfth5cvvIEdhAUIkP9ggCRaiBWcNN7wA7X4nZliUX9n1G4zhPytccAH2MCWi6R7z=s0",
  "https://lh3.googleusercontent.com/grass-cs/AABkmLcsk3cjvupP9J-9kJnk4alsXbCRk3S8DmoJvD-OYv7GbFh6RWRrq-Mgil6aSw1D4ikt4lUSe63guEUe1W6HESgGyZCFHR-D8wwVY45hlQ1PFtWXCftapBCqg6s49ULaQD4gdhmrJm5EU5A=s0",
  "https://lh3.googleusercontent.com/grass-cs/AABkmLcFpde1aWOd3adQFD_Y0Upa1nelHhJdpZjS3VhTaT6sE1uPKse-6MZ3BlKqOVz1zd16s3aul1ABNg4LPdESaayRtia-0iDaE7EGKTuqAATxT2_ZHBULHWszExB0KyMpeveyhXa0b8kRQeev=s0",
  "https://lh3.googleusercontent.com/grass-cs/AABkmLd8AXSbwUzVTY_wme_w-uCsNkg4XqN6bpjABDP18hALZ2JLuW2XHuogVpqnMuZtOdZ_9om3Sb5oV8USVAkZn0tBi1dl9tfU7YdkrhwRRwvDt9P-gWb6sDChiRZL_br6ZQznAioOoTu12qg=s0",
  "https://lh3.googleusercontent.com/grass-cs/AABkmLcyn91lIGiV2gKkOtjfA-t2OfBRGgQQtCKBMuZKP8hnfEDvKKigLaULG54-oyGv8Ce0eNAUJTKD-aUkuDC4dVFnIGQx8sheq4AbGdI8b79cSGWNE-dwzHOesso2-mAc_5B7HzHhEsDD9nA7=s0",
  "https://lh3.googleusercontent.com/grass-cs/AABkmLdn-Oymvb_H1nExFZNOoVeSPnsDHti3V2BQZ5VVoZWNDfGGzUL-3xC1917G2dzdSP65u7jSrCrOKk8Z9sb9U54mahrKXhISt9ok13u6ONM5lr_aUo6Hx2MgdwQXvSexUIPpHzQFB2tKYLx8=s0",
  "https://lh3.googleusercontent.com/grass-cs/AABkmLfafra5I-I2-XWEzk_GoSQWAeMd87w_8b0hghFL47LlITA6FUmoV97skJzpeT0xAI7MAH8Xbc9Sw7F_PY5n8AQTB8iD7gnNOxvoI3WO8PJriMyjHHsQSpbAj2pSkGM7KjlhVFI31T1UJ_Q=s0",
  "https://lh3.googleusercontent.com/grass-cs/AABkmLfpfLqrCLZTvpOqAUUc5x2rtyc62P2yX7uiKi3D9G3PMbroi4RoUIZc0Fa-qk7MgqDmG6P7unel4kleHDnhoGZajqvcCzxyJwGMXkwFIiNW9WJRM0PZNUKlxBm6GURTfRCwJlS8OtVpRJM=s0",
  "https://lh3.googleusercontent.com/grass-cs/AABkmLf51mCFoPL-Inzbb3aN5dSrU0n2YEQ0M8kotM2aYSDMgjWs84DVS97OYDY3y1T_4KiZBol1OdS73uBjux272XGjR6u6JdfAAR03wbJtNeOuHQx4y-0Ef86_q_H0eULmDV_012uG64kHFTkD=s0",
  "https://lh3.googleusercontent.com/grass-cs/AABkmLdws59OHkXY69Yv-YKusDkqnaAc9PBJmrJI681c1A46HWFw2dj8zMVhezfnjeZaTbcgLHR7rft2psKIKRLljQTZxpnS5B7AFE4uJegqSVwKJFHiQpMO0F7jei_4fmjXjO_futKfuihvvsA6=s0",
  "https://lh3.googleusercontent.com/grass-cs/AABkmLcyh3z1heYvYWfRuAfLVQHi3_PkeIi64mpWA-9PGZNB9m0A7y2rTKmTLHihi3rGcUiZVJoo0hEcfYczIud8yIUVjGeFXI1ESuYWYUAGukIsBNX2BkwomvMKIj8MyIXJaV0UUl9S2iiZOizg=s0",
  "https://lh3.googleusercontent.com/grass-cs/AABkmLeS1FbJho2bIBpAo0YCkiubGcWLxcZkCQ-rJzmHxpgVScaIdshK5ISLZpuHyy4qhx8jzKwT8r5B71sQkT2y5yGr6385Tik9NhI_MvSulObYl_IguuqqXN4hDdz6E3pocu9O6YgnnScR8a4=s0",
  "https://lh3.googleusercontent.com/grass-cs/AABkmLcJfMvMYIIDRmClxxbvaX1GYoCpyQyR-xH8425EVB4f6Se2oMjnmOhFuShD4aaWMrQxbMNZv_nq2Tnm4H3ZQmx3YnGiaBMNrIiHRaw6_Bqfe8DOacNImFSqIfj0G-GsqjpOy9Y9sZQUyZX5=s0",
  "https://lh3.googleusercontent.com/grass-cs/AABkmLcCnRLeWPzqkchKi4zABXckaFMdWo70mnmT9lEO95cq9bSBr7rOH2YDsd08aE8ctNo2ZNWSLQ2-IasawSmWY34IBhHqYhnFG-yiw1b_sKL3Ub_axkNC53OjmcyW1xA4L8KFlUz1z6aIPUM=s0",
  "https://lh3.googleusercontent.com/grass-cs/AABkmLeVLAUAs4rhnwmcDf8uxBbUCCxYKbeDoKyBvQLSXF4Y5d6qBvcc2rH73oYX9jwzKywraqgJ-lCkbjDmbIh1iN4oA95TM5EeY0nUUhXzgdRu0SVyBR7C7-fv-JKZzbjvc4nwZf4BwTY53i0Q=s0",
  "https://lh3.googleusercontent.com/grass-cs/AABkmLeGnXp7K7nU4LL9S5iWKzWTpAzpsQqR_xayzyQbSyU_SogNXyMW4R_TO2Y748Iva6iR2qEe9jqT5dD7mO8H1bZd1O53T_vYfPPPBj1jJmuxZ58Q5L6ImK_PHivozOqWzPL5aKwMyeOIe_FH=s0",
  "https://lh3.googleusercontent.com/grass-cs/AABkmLcBXS_Y0dtYE8Zr6ju29Wd94FGhM_HIXpHnrMaaEXEh9gvqGMgFAQZMZ6nDdZDf_xasbyRp9G66JGY2rTH5ci_QbuOiBpq5OhOf5Oh_BG3IC2ADu_tQbF0hVlUfhjOOBVFzE8g3BO2jIITt=s0",
  "https://lh3.googleusercontent.com/grass-cs/AABkmLesk7tsxoKw_83R9NFNEbc5M3OC0pW1k1H9Q0E4y13tcYK-xthCk79JfgED_IZEoE5tcXzTgaPXp5U-eNblzNvCDeO8bSqDEKHmfDSR_0KrTrMia3FaZpw27sY1gif8O2IDQUZbu-oh-rju=s0",
  "https://lh3.googleusercontent.com/grass-cs/AABkmLcNekV_IonNbVCHE2U8F59fKvwRwaRr4BN-3qiP24fXn1-1Wz81hL8Ob_TfesIFHL1p68d1jRq-m8akeTtGocpgih25pNHZIsMTMN-9ytF4IUgst_iEecRA-O-lf0xUwD9ubKTbNAm5oaQ=s0"
];

export interface RitualDetail {
  id: string;
  name: string;
  hindiName: string;
  timing: string;
  dressRecommendation: string;
  spiritualMeaning: string;
  emotionalSignificance: string;
  familyRole: string;
  sacredSymbolism: string;
  shlokaOrQuote: string;
  shlokaTranslation: string;
  photoPlateId?: string;
}

export const SACRED_RITUALS: RitualDetail[] = [
  {
    id: 'haldi',
    name: 'Haldi & Tel Baan',
    hindiName: 'हल्दी व तेल बाण',
    timing: 'Morning (10:00 AM – 1:00 PM)',
    dressRecommendation: 'Sunlit yellow silks, lightweight chanderi, or mustard kurtas to welcome turmeric blessings without fear of stains.',
    spiritualMeaning: 'Purification of body and spirit. Turmeric is revered as an antiseptic of both physical impurities and negative energies, invoking Surya and Mangal devatas for glowing health.',
    emotionalSignificance: 'The purest, most unfiltered laughter of the wedding. Sisters, aunts, and grandmothers smear paste on cheeks, dancing to folk dholaks while feeding sweets to the nervous bride and groom.',
    familyRole: 'Elders initiate with dub grass dipped in mustard oil and raw milk, followed by an enthusiastic floral marigold shower from cousins and younger siblings.',
    sacredSymbolism: 'Golden radiance representing the dawn of conjugal harmony and abundance.',
    shlokaOrQuote: 'हल्दी रंगे अंग अंग, जीवन में घुले नव रंग।',
    shlokaTranslation: 'May the golden turmeric adorn every limb, infusing your life with vibrant new blessings.'
  },
  {
    id: 'mehendi-sangeet',
    name: 'Mehendi & Sangeet Soirée',
    hindiName: 'मेहँदी व संगीत संध्या',
    timing: 'Twilight & Evening (6:00 PM – Late Night)',
    dressRecommendation: 'Emerald green, jewel tones, midnight blues, mirror work lehengas, and embroidered bandhgalas.',
    spiritualMeaning: 'Cooling the nervous system prior to the intense solemnity of the nuptials. The dark shade of henna represents the depth of mutual affection and marital devotion.',
    emotionalSignificance: 'Where two families drop all formality and merge into one tribe. The aunties sing traditional boliyan teasing the in-laws, while the bride quietly smiles as her groom searches for his initials hidden in her palms.',
    familyRole: 'Chachis and Maasis lead the choreography; brothers lift the groom on shoulders during high-energy Bhangra and Garba medleys.',
    sacredSymbolism: 'Intricate vines and peacock motifs signifying fertility, longevity, and flourishing lineage.',
    shlokaOrQuote: 'रची मेहंदी सहेलियों संग, पिया के नाम का चढ़ा रंग।',
    shlokaTranslation: 'Henna etched in sisterhood, steeped in the deep warmth of his devotion.'
  },
  {
    id: 'baaraat-milni',
    name: 'Baaraat & Dwar Milni',
    hindiName: 'बारात व द्वार मिलनी',
    timing: 'Late Afternoon (4:00 PM – 5:30 PM)',
    dressRecommendation: 'Regal pastels, rose-gold sherwanis, safas (turbans) for both sides, and pure georgette sarees.',
    spiritualMeaning: 'The triumphant arrival of the groom as a sovereign prince, seeking permission to enter the bride’s ancestral threshold with humility and joy.',
    emotionalSignificance: 'The bride’s mother greets the groom with an aarti and gently pulls his nose (naak kheenchai) to playfully remind him of humility. Fathers of both sides embrace in the Milni, garlanded with fresh jasmine and silver coin shawls.',
    familyRole: 'The groom’s friends form an impenetrable dancing fortress; the bride’s sisters demand the ceremonial "Toran / Shagun" tribute at the threshold.',
    sacredSymbolism: 'Union not merely of two individuals, but the respectful blending of two genealogical lineages.',
    shlokaOrQuote: 'सम्बंधो द्वयोः कुलस्य शुभंकरः।',
    shlokaTranslation: 'May the union of these two venerable lineages bring auspicious peace to all.'
  },
  {
    id: 'jaimala',
    name: 'Jaimala (Garland Exchange)',
    hindiName: 'जयमाला / वरमाला',
    timing: 'Sunset / Godhuli Bela (5:45 PM – 6:30 PM)',
    dressRecommendation: 'Opulent traditional bridal lehenga in crimson or ivory-gold; groom in hand-embroidered royal ivory sherwani.',
    spiritualMeaning: 'Voluntary mutual acceptance. Just as Sita placed the garland around Rama, the bride sovereignly chooses her partner before all assembled witnesses.',
    emotionalSignificance: 'The mischievous battle where brothers hoist the bride and groom onto their shoulders to make garlanding impossible, concluding in a soft, tender glance when the floral collars touch.',
    familyRole: 'Brothers lift the couple; cousins shower rose petals from balconies; the shehnai reaches its ecstatic crescendo.',
    sacredSymbolism: 'Fresh rose and jasmine blossoms symbolizing fragrance, beauty, and unconditional goodwill.',
    shlokaOrQuote: 'हृदयं ते ददामि मयि चित्तं समाहितम्।',
    shlokaTranslation: 'I offer thee my heart, and let our consciousness dwell in unison.'
  },
  {
    id: 'kanyadaan',
    name: 'Kanyadaan & Hastamelap',
    hindiName: 'कन्यादान व हस्तमिलाप',
    timing: 'Evening Mandap (7:00 PM – 8:00 PM)',
    dressRecommendation: 'Sacred ceremonial attire; elders wearing traditional dhotis, raw silk kurtas, and Banarasi drapes.',
    spiritualMeaning: 'The highest Vedic gift (daan). A father and mother surrender their daughter not as property, but as Lakshmi (the embodiment of prosperity) entrusted to Vishnu.',
    emotionalSignificance: 'The quietest, most tear-streaked moment in the mandap. The father places his daughter’s palm over the groom’s, pouring holy Ganga water and betel leaves between them as his voice breaks with unspoken prayer.',
    familyRole: 'Parents of the bride perform the sacred hand-fasting (Hastamelap); the groom’s sister ties the Granthi Bandhan (sacred knot) connecting their stoles.',
    sacredSymbolism: 'Water flowing through joined hands signifying the unyielding flow of truth, devotion, and life.',
    shlokaOrQuote: 'गौरीं कन्यामिमां विप्र यथाशक्ति समर्पये।',
    shlokaTranslation: 'This beloved daughter, embodiment of Gauri, I entrust into your sacred care.'
  },
  {
    id: 'saptapadi',
    name: 'Saptapadi & Agni Pradakshina (The 7 Vows)',
    hindiName: 'सप्तपदी व अग्नि प्रदक्षिणा',
    timing: 'Auspicious Muhurat (8:00 PM – 9:00 PM)',
    dressRecommendation: 'Sacred wedding attire connected by the Granthi Bandhan.',
    spiritualMeaning: 'Seven sacred steps around Agni Devata (the Fire Witness). According to ancient Vedic law, taking seven steps together seals an unbreakable, eternal friendship (sakhya).',
    emotionalSignificance: 'The solemn heartbeat of the entire marriage. Every step is an unspoken pact — to nourish each other in sickness, to share sorrows in silence, and to remain steadfast when winds howl.',
    familyRole: 'Brothers offer puffed rice (Laja Homa) into the fire for prosperity; sisters-in-law hide the groom’s juttis (shoes).',
    sacredSymbolism: 'Seven steps representing food, strength, wealth, happiness, progeny, seasons, and lifelong spiritual friendship.',
    shlokaOrQuote: 'सखा सप्तपदा भव, सख्यं ते गमेयम्।',
    shlokaTranslation: 'With seven sacred steps, become my eternal companion. May I never swerve from this fellowship.'
  },
  {
    id: 'sindoor-mangalsutra',
    name: 'Sindoor Daan & Mangalsutra',
    hindiName: 'सिंदूर दान व मंगलसूत्र',
    timing: 'Concluding Mandap Rites (9:15 PM – 9:45 PM)',
    dressRecommendation: 'Ceremonial bridal regalia with veil held softly over the forehead.',
    spiritualMeaning: 'The sanctification of womanhood. Vermilion at the hairline activates the agnya chakra; the black beads absorb negative planetary vibrations.',
    emotionalSignificance: 'The bride’s eyes brim with silent tears of joy as the golden auspicious necklace touches her neck. In an instant, she is transformed from a daughter into a wife and sovereign equal.',
    familyRole: 'Maternal aunts assist with the veil; elder suhasinis (married women) whisper sacred blessings into the bride’s ear.',
    sacredSymbolism: 'Gold and black beads embodying light and protection; vermilion embodying life force and longevity.',
    shlokaOrQuote: 'माङ्गल्यं तन्तुनानेन मम जीवनहेतुना।',
    shlokaTranslation: 'This sacred thread is the cornerstone of my life; may you live blessed for a hundred autumns.'
  },
  {
    id: 'vidai',
    name: 'The Vidai (Threshold Farewell)',
    hindiName: 'विदाई (सजल विदा)',
    timing: 'Post-Mandap / Dawn Departure',
    dressRecommendation: 'Bridal ensemble draped in a protective travel shawl or family heirloom pashmina.',
    spiritualMeaning: 'The sacred transition from the maternal home to the marital hearth. The bride throws three handfuls of raw rice and coins behind her over her head.',
    emotionalSignificance: 'The most heartbreakingly beautiful moment in Indian human emotion. A stoic father who never cried in thirty years collapses into his daughter’s arms. The mother presses sacred laddoos into her hands.',
    familyRole: 'Brothers push the decorated car / doli as a symbolic final push of care into her new destiny.',
    sacredSymbolism: 'Throwing rice backwards signifies repaying the parental debt and wishing eternal bounty for the home she is leaving behind.',
    shlokaOrQuote: 'सदा सुखिनो भवन्तु पितृगृहात् पतिगृहं गच्छन्ती।',
    shlokaTranslation: 'Leaving the parents’ threshold to illuminate a new hearth, may your path always be showered in peace.'
  }
];

export interface GuestRSVP {
  id: string;
  name: string;
  phone: string;
  email: string;
  side: 'Ladkewale (Groom)' | 'Ladkiwale (Bride)' | 'Mutual / Dear Friend';
  eventsAttending: string[];
  totalGuests: number;
  dietary: 'Jain' | 'Pure Vegetarian' | 'Sattvic' | 'Regular / Non-Veg' | 'Vegan' | 'Nut Allergy';
  stayRequired: boolean;
  notes: string;
  songRequest?: string;
  status: 'Confirmed' | 'Tentative' | 'Regretfully Declined';
  registeredAt: string;
}

export const INITIAL_GUESTS: GuestRSVP[] = [
  {
    id: 'g-1',
    name: 'Rajendra & Sunita Singhania',
    phone: '+91 98200 12345',
    email: 'singhania.raj@heritage.in',
    side: 'Ladkewale (Groom)',
    eventsAttending: ['Haldi', 'Sangeet', 'Pheras', 'Reception'],
    totalGuests: 3,
    dietary: 'Jain',
    stayRequired: true,
    notes: 'Arriving Udaipur on 18th morning. Need ground floor room for Bauji.',
    songRequest: 'Ghoomar traditional folk',
    status: 'Confirmed',
    registeredAt: 'Oct 14, 2026'
  },
  {
    id: 'g-2',
    name: 'Col. Vikramaditya Rathore & Family',
    phone: '+91 98111 67890',
    email: 'vikram.rathore@army.gov.in',
    side: 'Ladkiwale (Bride)',
    eventsAttending: ['Sangeet', 'Pheras', 'Reception'],
    totalGuests: 4,
    dietary: 'Pure Vegetarian',
    stayRequired: true,
    notes: 'Grandfather will accompany for Kanyadaan ceremony.',
    songRequest: 'Chaudhary by Amit Trivedi',
    status: 'Confirmed',
    registeredAt: 'Oct 15, 2026'
  },
  {
    id: 'g-3',
    name: 'Ananya & Rohan Deshmukh',
    phone: '+91 97690 54321',
    email: 'ananya.deshmukh@gmail.com',
    side: 'Mutual / Dear Friend',
    eventsAttending: ['Sangeet', 'Pheras'],
    totalGuests: 2,
    dietary: 'Regular / Non-Veg',
    stayRequired: false,
    notes: 'Flying in from London on 19th! So excited to see both of you.',
    songRequest: 'Gallan Goodiyan',
    status: 'Confirmed',
    registeredAt: 'Oct 16, 2026'
  },
  {
    id: 'g-4',
    name: 'Dr. Meenakshi & Arvind Iyer',
    phone: '+91 98400 99887',
    email: 'dr.iyer@apollo.org',
    side: 'Ladkewale (Groom)',
    eventsAttending: ['Reception'],
    totalGuests: 2,
    dietary: 'Sattvic',
    stayRequired: false,
    notes: 'Blessings from Chennai. Looking forward to meeting both families.',
    songRequest: 'Kalyana Samayal Saadham',
    status: 'Confirmed',
    registeredAt: 'Oct 17, 2026'
  },
  {
    id: 'g-5',
    name: 'Siddharth & Priya Mehra',
    phone: '+91 99100 44332',
    email: 'sidmehra@venture.co',
    side: 'Ladkiwale (Bride)',
    eventsAttending: ['Haldi', 'Sangeet', 'Pheras', 'Reception'],
    totalGuests: 2,
    dietary: 'Vegan',
    stayRequired: true,
    notes: 'College roommates reunion! Ready to burn the dance floor.',
    songRequest: 'Balle Balle Ji Soniya De',
    status: 'Confirmed',
    registeredAt: 'Oct 18, 2026'
  }
];

export interface BlessingNote {
  id: string;
  author: string;
  relation: string;
  side: 'Bride Side' | 'Groom Side' | 'Elders Prayer';
  message: string;
  date: string;
}

export const INITIAL_BLESSINGS: BlessingNote[] = [
  {
    id: 'b-1',
    author: 'Dadi Maa (Kalyani Devi)',
    relation: 'Paternal Grandmother',
    side: 'Elders Prayer',
    message: 'May Annapurna always reside in your kitchen, and may laughter echo through every corridor of your home. You were both born under auspicious stars; never let go of each other’s hands in the storm.',
    date: 'Yesterday'
  },
  {
    id: 'b-2',
    author: 'Sunil Chacha & Meena Chachi',
    relation: 'Paternal Uncle & Aunt',
    side: 'Groom Side',
    message: 'We still remember when you used to run around Mehrangarh in knickers asking for jalebis! Today you stand tall as a groom. Treat your bride with reverence, kindness, and eternal patience.',
    date: '2 days ago'
  },
  {
    id: 'b-3',
    author: 'Ria & Tanya',
    relation: 'Sisters of the Bride',
    side: 'Bride Side',
    message: 'To the girl who shared her wardrobe, secrets, and midnight Maggi with us: Jiju better be ready to give us our Joota Chupai shagun without bargaining! We love you to the moon and back.',
    date: '3 days ago'
  },
  {
    id: 'b-4',
    author: 'Pandit Jagannath Shastri',
    relation: 'Family Raj-Purohit',
    side: 'Elders Prayer',
    message: 'शुभम करोति कल्याणम आरोग्यम धनसंपदा। May the seven sacred steps taken around the eternal Agni illuminate your journey across all lifetimes.',
    date: '5 days ago'
  }
];

export interface GoogleReview {
  id: string;
  author: string;
  location: string;
  rating: number;
  timeAgo: string;
  eventType: string;
  reviewText: string;
  verified: boolean;
  avatarBg: string;
  avatarImg?: string;
}

export const GOOGLE_REVIEWS: GoogleReview[] = [
  {
    id: 'rev-1',
    author: 'Sandeep Gupta',
    location: 'Rohini, Delhi',
    rating: 5,
    timeAgo: 'October 17, 2026',
    eventType: 'Photo Restoration & Heritage Framing',
    reviewText: 'Very very nice studio! Go to this studio and take your oldest photo with you, like Dada or Dada-Pardada photo, it is ready and available with great editing and perfect archival framing.',
    verified: true,
    avatarBg: 'bg-[#45123E]',
    avatarImg: 'https://lh3.googleusercontent.com/a-/ALV-UjVRIq7acWJBNGtrsf303HM-OwuhkqIs6pGVc18lJOpsDKzXJ6ZeFg=s120-c-rp-mo-br100'
  },
  {
    id: 'rev-2',
    author: 'Ashiya Malik',
    location: 'Delhi NCR',
    rating: 5,
    timeAgo: 'July 14, 2026',
    eventType: 'Wedding Photography & Custom Framing',
    reviewText: 'I had a wonderful experience with this photo studio. Their communication was excellent from start to finish, and the staff was always helpful, patient, and responsive. The photo framing and overall quality of the work were outstanding. The attention to detail and professionalism really stood out. I am extremely happy with the final result and would highly recommend this studio to anyone looking for high-quality photography and framing services.',
    verified: true,
    avatarBg: 'bg-[#775a19]',
    avatarImg: 'https://lh3.googleusercontent.com/a-/ALV-UjXCYEV4hc7YFW-ibJda_dG40n6FBexPXhfffFzaym8ydJa6U-LP=s120-c-rp-mo-br100'
  },
  {
    id: 'rev-3',
    author: 'Prerak Garg',
    location: 'Rohini Sector 23, Delhi',
    rating: 5,
    timeAgo: 'October 13, 2026',
    eventType: 'Photography & Print Services',
    reviewText: 'Great and timely service. Staff is courteous and delivers top notch prints and album layouts ahead of schedule.',
    verified: true,
    avatarBg: 'bg-[#2E5A44]',
    avatarImg: 'https://lh3.googleusercontent.com/a-/ALV-UjXxJFCQTId1Ah9a4346FCCD028Tplwhc570o4zts1tA-yquiwE=s120-c-rp-mo-br100'
  },
  {
    id: 'rev-4',
    author: 'Sheetal Sharma',
    location: 'Rohini, Delhi',
    rating: 5,
    timeAgo: 'April 1, 2026',
    eventType: 'Wedding & Candid Shoot',
    reviewText: 'Highly professional service with stunning results. Highly recommended for anyone looking for uncompromised wedding and event memories.',
    verified: true,
    avatarBg: 'bg-[#7A2E2E]',
    avatarImg: 'https://lh3.googleusercontent.com/a/ACg8ocJIoJFvaSkNwleqs3vJj-fH-wg0E3IFHPeqVag94v00FXF29Xs=s120-c-rp-mo-br100'
  },
  {
    id: 'rev-5',
    author: 'Jyoti Singh',
    location: 'Delhi',
    rating: 5,
    timeAgo: 'June 18, 2026',
    eventType: 'Wedding & Family Portraiture',
    reviewText: 'Bohot acha kaam hai uncle ji ka! Very polite, cooperative and captured our family event so gracefully 😍😍',
    verified: true,
    avatarBg: 'bg-[#4A3B69]',
    avatarImg: 'https://lh3.googleusercontent.com/a/ACg8ocIsMBtLq0n4_sxeIeJaTLTBrFIao3Pq81YGvaCURrD-iHifAw=s120-c-rp-mo-br100'
  },
  {
    id: 'rev-6',
    author: 'VIDHI Kumari',
    location: 'Delhi NCR',
    rating: 5,
    timeAgo: 'June 18, 2026',
    eventType: 'Ceremony Shoot & Albums',
    reviewText: 'Photo dekh ke dil khush ho gaya! The colors, clarity, and facial expressions captured are just breathtaking.',
    verified: true,
    avatarBg: 'bg-[#5B3A1C]',
    avatarImg: 'https://lh3.googleusercontent.com/a-/ALV-UjX3WdLxBQg0f-_kl3BNTGPoUTKAMamCVRCn9yYNaESF_FfG-Dbqpg=s120-c-rp-mo-br100'
  },
  {
    id: 'rev-7',
    author: 'Radha Sharma',
    location: 'Pitampura, Delhi',
    rating: 5,
    timeAgo: 'March 27, 2026',
    eventType: 'Events & Parties Photo',
    reviewText: 'Awesome Services. Very patient team with children and elders. Delighted with the framing quality.',
    verified: true,
    avatarBg: 'bg-[#1976D2]',
    avatarImg: 'https://lh3.googleusercontent.com/a/ACg8ocJc50raLL3N54-NDjrSnxLoZJ8qx6IJ3PWEMw5F93NGbMnx87oO=s120-c-rp-mo-br100'
  },
  {
    id: 'rev-8',
    author: 'Jyoti Kumari',
    location: 'Pooth Kalan, Rohini',
    rating: 5,
    timeAgo: 'March 14, 2026',
    eventType: 'Studio Portraits & Framing',
    reviewText: 'Good job sir! Clean studio setup right opposite SBI Bank and very courteous customer service.',
    verified: true,
    avatarBg: 'bg-[#45123E]',
    avatarImg: 'https://lh3.googleusercontent.com/a/ACg8ocIKslzn9z8BpAGWzfUVdsid2XiV06vYyj0BJNKnm9_RSGTDAw=s120-c-rp-mo-br100'
  }
];
