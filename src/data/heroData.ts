export type HeroSlide = {
  id: string
  model: string
  headline: string
  subhead: string
  primaryCta: string
  secondaryCta: string
  secondaryHref: string
  thumbnail: string
  media: string
  mediaType: 'image'
  detailMedia: string
}

export const heroSlides: HeroSlide[] = [
  {
    id: 'hospitality',
    model: 'Hospitality',
    headline: 'Smarter Rooms. Better Guest Wi-Fi.',
    subhead:
      'Integrated HSIA, IPTV, room automation, and security for hotels and resorts—installed and supported by one partner.',
    primaryCta: 'Book a Property Walkthrough',
    secondaryCta: 'View Hotel Systems',
    secondaryHref: '#systems',
    thumbnail: '/images/hospitality-thumb.jpg',
    media: '/images/hospitality-detail.jpg',
    mediaType: 'image',
    detailMedia: '/images/hospitality-detail.jpg',
  },
  {
    id: 'healthcare',
    model: 'Healthcare',
    headline: 'Hospital Systems That Never Go Down.',
    subhead:
      'Compliant nurse call, access control, fire alarms, and clinical networks built for 24/7 medical facilities.',
    primaryCta: 'Talk to Our Engineers',
    secondaryCta: 'View Healthcare Systems',
    secondaryHref: '#systems',
    thumbnail: '/images/healthcare-thumb.jpg',
    media: '/images/healthcare-detail.jpg',
    mediaType: 'image',
    detailMedia: '/images/healthcare-detail.jpg',
  },
  {
    id: 'corporate',
    model: 'Corporate & Commercial',
    headline: 'Smart Infrastructure for Commercial Buildings.',
    subhead:
      'Cut running costs and simplify security with integrated BMS, biometric access, CCTV, and boardroom AV.',
    primaryCta: 'Request a Site Assessment',
    secondaryCta: 'View Commercial Systems',
    secondaryHref: '#systems',
    thumbnail: '/images/corporate-thumb.jpg',
    media: '/images/corporate-detail.jpg',
    mediaType: 'image',
    detailMedia: '/images/corporate-detail.jpg',
  },
  {
    id: 'learning',
    model: 'Learning Institutions',
    headline: 'Campus-Wide Networks and Security That Scale.',
    subhead:
      'High-density Wi-Fi, fiber backbones, classroom AV, and perimeter access built for thousands of students.',
    primaryCta: 'Plan a Campus Upgrade',
    secondaryCta: 'View Campus Systems',
    secondaryHref: '#systems',
    thumbnail: '/images/learning-thumb.jpg',
    media: '/images/learning-detail.jpg',
    mediaType: 'image',
    detailMedia: '/images/learning-detail.jpg',
  },
  {
    id: 'aviation',
    model: 'Aviation',
    headline: 'Terminal Security and Comms Built to Code.',
    subhead:
      'Airside-to-landside access control, PAVA, surveillance, and redundant fiber backbones for modern airports.',
    primaryCta: 'Speak With an Aviation Lead',
    secondaryCta: 'View Aviation Systems',
    secondaryHref: '#systems',
    thumbnail: '/images/aviation-thumb.jpg',
    media: '/images/aviation-detail.jpg',
    mediaType: 'image',
    detailMedia: '/images/aviation-detail.jpg',
  },
  {
    id: 'mining',
    model: 'Remote & Mining Camps',
    headline: 'Reliable Networks and Security Anywhere.',
    subhead:
      'Ruggedized camp Wi-Fi, worker IPTV, gate tracking, and perimeter CCTV for remote sites.',
    primaryCta: 'Scope Your Remote Site',
    secondaryCta: 'View Remote Camp Systems',
    secondaryHref: '#systems',
    thumbnail: '/images/mining-thumb.jpg',
    media: '/images/mining-detail.jpg',
    mediaType: 'image',
    detailMedia: '/images/mining-detail.jpg',
  },
]
