// Everything the site shows. Lists sort newest first; within a year, the order
// here is the order on the page.
//
// `layout` picks the project page:
//   stages      title screen, then each process stage — shown last to first
//   collection  title screen, then each item — shown last to first
//   detail      title screen, then a paragraph and an outbound link
//
// Physical projects also carry an `origin`. `hidden: true` keeps a project in
// the data without it appearing (or being reachable) anywhere on the site.

export const CATEGORIES = [
  { id: 'physical', name: 'PHYSICAL', title: 'Physical' },
  { id: 'digital', name: 'DIGITAL', title: 'Digital' },
];

// How physical work came about. EVERYTHING is a pass-through rather than a
// value any project carries.
export const ORIGINS = [
  { id: 'manufactured', name: 'MANUFACTURED', title: 'Manufactured' },
  { id: 'conceptualized', name: 'CONCEPTUALIZED', title: 'Conceptualized' },
  { id: 'everything', name: 'EVERYTHING', title: 'Everything' },
];

const IMG = 'https://res.cloudinary.com/dbey0lqda/image/upload';

const PROJECTS = [
  {
    slug: 'toting-tray',
    name: 'Toting Tray',
    description: 'Industry Partnered Project, Renishaw',
    year: 2026,
    category: 'physical',
    origin: 'manufactured',
    layout: 'stages',
    image: `${IMG}/v1773524747/WhatsApp_Image_2026-03-14_at_21.39.56_1_phmuqc.jpg`,
    stages: [
      {
        title: 'STAGE 1 – ENGINEERING CHALLENGE',
        text: 'Redesign the toting mechanism used to clean high precision parts manufactured by Renishaw.',
        image: `${IMG}/v1773241437/Picture4_leuekm.png`,
      },
      {
        title: 'STAGE 2 – CONCEPT DESIGN & MATERIAL SELECTION',
        text: 'Redesign toting system to fit the dimension requirements whilst improving overall structural strength and chemical resistance.',
        image: `${IMG}/v1773241437/Picture1_j9cgag.jpg`,
      },
      {
        title: 'STAGE 3 – EMBODIMENT DESIGN',
        text: 'Final design.',
        image: `${IMG}/v1773241437/Picture3_owbwso.png`,
      },
    ],
  },
  {
    slug: 'truss-bridge',
    name: 'Truss Bridge',
    description: 'Smart Campus Project Detailed Design',
    year: 2025,
    category: 'physical',
    origin: 'manufactured',
    layout: 'stages',
    image: `${IMG}/v1773524748/WhatsApp_Image_2026-03-14_at_21.39.56_2_zpie7i.jpg`,
    stages: [
      {
        title: 'STAGE 1 – ENGINEERING CHALLENGE',
        text: '1. Investigate the feasibility of a sustainable monorail system for university transportation.\n2. Design and manufacture a model bridge to enable this method of transportation.',
        image: `${IMG}/v1773241437/Monorail_Straddle_Beam_Design-1_1_funram.jpg`,
      },
      {
        title: 'STAGE 2 – DESIGN SELECTION',
        text: 'Inspired by truss bridge designs, decreasing overall weight and material and construction cost whilst maintaining the same structural rigidity.',
        image: `${IMG}/v1773245806/Picture24_cnyg7t.jpg`,
      },
      {
        title: 'STAGE 3 – MANUFACTURING AND TESTS',
        text: 'Using CAD software to create a bridge design from a single sheet of aluminium which is water cut.',
        image: `${IMG}/v1773246146/WhatsApp_Image_2026-03-11_at_16.20.49_r5dnrr.jpg`,
      },
    ],
  },
  {
    slug: 'trebuchet',
    name: 'Trebuchet',
    description: 'Trebuchet, Sprint Based Project',
    year: 2025,
    category: 'physical',
    origin: 'manufactured',
    layout: 'stages',
    image: `${IMG}/v1773315986/Design_sem_nome_5_dsfgju.png`,
    stages: [
      {
        title: 'STAGE 1 – ENGINEERING CHALLENGE',
        text: 'The sprung Trebuchet project is a variation of the Design Sprint which was first used in Google Corporation for innovations and product development. It is a time-constrained, multi-disciplinary, five-phased process that reduces the risks associated with launching a new product, service, or features of an existing product/service.',
        image: `${IMG}/v1773246587/WhatsApp_Image_2026-03-11_at_16.28.14_qerqma.jpg`,
      },
      {
        title: 'STAGE 2 – CONCEPT SKETCHES',
        image: `${IMG}/v1773246586/WhatsApp_Image_2026-03-11_at_16.28.01_wpotbw.jpg`,
      },
      {
        title: 'STAGE 3 – MANUFACTURING',
        image: `${IMG}/v1773246602/WhatsApp_Image_2026-03-11_at_16.20.49_1_t63yax.jpg`,
      },
    ],
  },
  {
    slug: '911-collection',
    name: '911 Collection',
    description: '911 Inspired Products, Coming Soon',
    year: 2025,
    category: 'physical',
    origin: 'conceptualized',
    layout: 'collection',
    image: `${IMG}/v1773269837/Gemini_Generated_Image_oev627oev627oev6_iazi3t.png`,
    items: [
      {
        title: 'CHARGING CABLE HOLDER',
        image: `${IMG}/v1773317184/WhatsApp_Image_2026-03-12_at_12.04.18_nfbtms.jpg`,
      },
      {
        title: 'KEYCHAIN',
        image: `${IMG}/v1773317192/WhatsApp_Image_2026-03-12_at_12.04.18_1_cke9kl.jpg`,
      },
      {
        title: 'PAPERWEIGHT',
        image: `${IMG}/v1773269837/Gemini_Generated_Image_oev627oev627oev6_iazi3t.png`,
      },
    ],
  },
  {
    slug: 'research-paper',
    name: 'Research Paper',
    description: 'Ballast Tanks Research Paper',
    year: 2023,
    category: 'physical',
    origin: 'manufactured',
    // Kept in full for future use. Give it a real `link.href` before unhiding.
    hidden: true,
    layout: 'detail',
    image: `${IMG}/v1773524747/WhatsApp_Image_2026-03-14_at_21.39.56_jizoee.jpg`,
    text: 'Researched and analysed the origin, design and operation of ballast tank systems used in marine vessels such as submarines and container ships.',
    link: { label: 'RESEARCH PAPER', href: null },
  },
  {
    slug: 'sophie-real-estate',
    name: 'Sophie Real Estate Portugal',
    description: 'Sophie Real Estate, Instagram Account',
    year: 2023,
    category: 'digital',
    layout: 'detail',
    device: 'iphone',
    image: `${IMG}/v1773251449/LOGO_WHITE.png_jcomck.png`,
    screen: `${IMG}/v1773245580/WhatsApp_Image_2026-03-11_at_16.11.35_yypozc.jpg`,
    text: "I helped build the digital presence of Sophie Real Estate Portugal, developing and managing its social media platforms while running both paid and organic marketing campaigns. Through targeted content and advertising strategies, the campaigns generated over 400 qualified leads, helping connect potential buyers with the agency's properties.",
    link: {
      label: 'SOPHIE REAL ESTATE',
      href: 'https://www.instagram.com/sophierealestateportugal',
    },
  },
  {
    slug: 'golden-visa-campaign',
    name: 'Golden Visa Campaign',
    description: 'Sophie Real Estate, Golden Visa Campaign Website',
    year: 2023,
    category: 'digital',
    layout: 'detail',
    device: 'macbook',
    image: `${IMG}/v1773269849/Design_sem_nome_4_eblzoz.png`,
    screen: `${IMG}/v1773241438/Screenshot_2026-03-10_213514_za5lg1.png`,
    text: 'I designed and developed a website as part of a campaign targeting Golden Visa investors interested in Portugal. The platform was created to showcase the services offered by Sophie Real Estate as a trusted partner for property acquisitions, presenting investment opportunities and guiding international buyers through the process of purchasing real estate in Portugal.',
    link: { label: 'SOPHIE REAL ESTATE', href: 'https://www.sophierealestate.eu/' },
  },
  {
    slug: 'watch-world-collectors',
    name: 'Watch World Collectors',
    description: 'TikTok Watch Community',
    year: 2023,
    category: 'digital',
    layout: 'detail',
    device: 'iphone',
    image: `${IMG}/v1773241470/WhatsApp_Image_2026-03-10_at_21.33.06_uthpac.jpg`,
    screen: `${IMG}/v1773241460/WhatsApp_Image_2026-03-10_at_21.33.06_1_auw4p1.jpg`,
    text: 'I created Watch World Collectors on TikTok as a space for watch enthusiasts to share their passion for timepieces. What started as a simple idea quickly grew into a community of collectors and admirers, reaching 12.7K followers, 6 million views, and over 345K likes, all brought together by a shared appreciation for watches.',
    link: { label: 'WATCH WORLD COLLECTORS', href: 'https://www.tiktok.com/@watchworldcollectors' },
  },
];

const VISIBLE = PROJECTS.filter(p => !p.hidden).sort((a, b) => b.year - a.year);

export function projectsIn(category, origin = 'everything') {
  return VISIBLE.filter(
    p => p.category === category && (origin === 'everything' || p.origin === origin),
  );
}

export function findProject(slug) {
  return VISIBLE.find(p => p.slug === slug);
}

// The trail shown in the top bar of a project's page.
export function projectCrumbs(project) {
  if (project.category !== 'physical') {
    return [{ label: project.category, to: `/${project.category}` }, { label: project.name }];
  }
  const origin = ORIGINS.find(o => o.id === project.origin);
  return [
    { label: 'physical', to: '/physical' },
    { label: origin.name, to: `/physical/${origin.id}` },
    { label: project.name },
  ];
}

// Where a project's BACK leads when the visitor didn't arrive from a list.
export function parentPath(project) {
  return project.category === 'physical' ? `/physical/${project.origin}` : `/${project.category}`;
}
