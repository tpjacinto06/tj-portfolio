import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import FloatingDeviceGallery from './FloatingDeviceGallery';
import FadeImage from './FadeImage';
import SisyphusIntro from './SisyphusIntro';
import { scrollToY, scrollToTopImmediate } from './smoothScroll';

const INTRO_KEY = 'tj-intro-played';

// The intro plays once per session — returning to the homepage from a project
// shows the settled logo rather than replaying the whole sequence. Kept pure:
// StrictMode double-invokes state initialisers, so recording that it played
// has to happen in an effect, not here.
function shouldPlayIntro() {
  if (typeof window === 'undefined') return false;
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return false;
  try {
    return !sessionStorage.getItem(INTRO_KEY);
  } catch {
    // Private browsing or blocked storage — play it, just don't remember.
    return true;
  }
}

// Shared entrance motion: content resolves upward out of nothing rather than
// hard-cutting in. `delay` staggers siblings.
const reveal = (delay = 0) => ({
  initial: { opacity: 0, y: 24 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 1, ease: [0.16, 1, 0.3, 1], delay },
});

const CATEGORIES = [
  { id: 'all', name: 'ALL' },
  { id: 'physical', name: 'PHYSICAL', shortName: 'PH' },
  { id: 'digital', name: 'DIGITAL', shortName: 'DI' }
];

// Splits a product's `process` text into per-stage { title, text } entries.
function getStageContent(process, stageNum) {
  const lines = process.split('\n');
  const stageIndex = lines.findIndex(line => line.toUpperCase().includes(`STAGE ${stageNum}`));
  if (stageIndex === -1) return { title: `STAGE ${stageNum}`, text: '' };

  const nextIndex = lines.slice(stageIndex + 1).findIndex(line => /STAGE \d/.test(line.toUpperCase()));
  const endIndex = nextIndex === -1 ? lines.length : stageIndex + 1 + nextIndex;

  return {
    title: lines[stageIndex].trim(),
    text: lines.slice(stageIndex + 1, endIndex).join('\n').trim()
  };
}

function scrollToElement(id) {
  const el = document.getElementById(id);
  if (!el) return;
  const rect = el.getBoundingClientRect();
  const absoluteTop = rect.top + window.pageYOffset;
  const targetScroll = absoluteTop + rect.height - window.innerHeight;
  scrollToY(targetScroll);
}

export default function Portfolio() {
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [showAbout, setShowAbout] = useState(false);
  const [showInquire, setShowInquire] = useState(false);
  const [showArrow, setShowArrow] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [playIntro] = useState(shouldPlayIntro);

  useEffect(() => {
    if (!playIntro) return;
    try {
      sessionStorage.setItem(INTRO_KEY, '1');
    } catch {
      // Storage unavailable — the intro simply replays next load.
    }
  }, [playIntro]);

  const categories = CATEGORIES;

  const products = [
    {
      id: 1,
      name: "Toting Tray",
      description: "Industry Partnered Project, Renishaw",
      year: "2026",
      category: "physical",
      type: "standard",
      image: "https://res.cloudinary.com/dbey0lqda/image/upload/v1773524747/WhatsApp_Image_2026-03-14_at_21.39.56_1_phmuqc.jpg",
      processImages: [
        "https://res.cloudinary.com/dbey0lqda/image/upload/v1773241437/Picture4_leuekm.png",
        "https://res.cloudinary.com/dbey0lqda/image/upload/v1773241437/Picture1_j9cgag.jpg",
        "https://res.cloudinary.com/dbey0lqda/image/upload/v1773241437/Picture3_owbwso.png"
      ],
      process: "STAGE 1 – ENGINEERING CHALLENGE\nRedesign the toting mechanism used to clean high precision parts manufactured by Renishaw.\n\nSTAGE 2 – CONCEPT DESIGN & MATERIAL SELECTION\nRedesign toting system to fit the dimension requirements whilst improving overall structural strength and chemical resistance.\n\nSTAGE 3 – EMBODIMENT DESIGN\nFinal design."
    },
    {
      id: 2,
      name: "Truss Bridge",
      description: "Smart Campus Project Detailed Design",
      year: "2025",
      category: "physical",
      type: "standard",
      image: "https://res.cloudinary.com/dbey0lqda/image/upload/v1773524748/WhatsApp_Image_2026-03-14_at_21.39.56_2_zpie7i.jpg",
      processImages: [
        "https://res.cloudinary.com/dbey0lqda/image/upload/v1773241437/Monorail_Straddle_Beam_Design-1_1_funram.jpg",
        "https://res.cloudinary.com/dbey0lqda/image/upload/v1773245806/Picture24_cnyg7t.jpg",
        "https://res.cloudinary.com/dbey0lqda/image/upload/v1773246146/WhatsApp_Image_2026-03-11_at_16.20.49_r5dnrr.jpg"
      ],
      process: "STAGE 1 – ENGINEERING CHALLENGE\n1. Investigate the feasibility of a sustainable monorail system for university transportation.\n2. Design and manufacture a model bridge to enable this method of transportation.\n\nSTAGE 2 – DESIGN SELECTION\nInspired by truss bridge designs, decreasing overall weight and material and construction cost whilst maintaining the same structural rigidity.\n\nSTAGE 3 – MANUFACTURING AND TESTS\nUsing CAD software to create a bridge design from a single sheet of aluminium which is water cut."
    },
    {
      id: 3,
      name: "Trebuchet",
      description: "Trebuchet, Sprint Based Project",
      year: "2025",
      category: "physical",
      type: "standard",
      image: "https://res.cloudinary.com/dbey0lqda/image/upload/v1773315986/Design_sem_nome_5_dsfgju.png",
      processImages: [
        "https://res.cloudinary.com/dbey0lqda/image/upload/v1773246587/WhatsApp_Image_2026-03-11_at_16.28.14_qerqma.jpg",
        "https://res.cloudinary.com/dbey0lqda/image/upload/v1773246586/WhatsApp_Image_2026-03-11_at_16.28.01_wpotbw.jpg",
        "https://res.cloudinary.com/dbey0lqda/image/upload/v1773246602/WhatsApp_Image_2026-03-11_at_16.20.49_1_t63yax.jpg"
      ],
      process: "STAGE 1 – ENGINEERING CHALLENGE\nThe sprung Trebuchet project is a variation of the Design Sprint which was first used in Google Corporation for innovations and product development. It is a time-constrained, multi-disciplinary, five-phased process that reduces the risks associated with launching a new product, service, or features of an existing product/service.\n\nSTAGE 2 – CONCEPT SKETCHES\n\nSTAGE 3 – MANUFACTURING"
    },
    {
      id: 4,
      name: "911 Collection",
      description: "911 Inspired Products, Coming Soon",
      year: "2025",
      category: "physical",
      type: "911-collection",
      image: "https://res.cloudinary.com/dbey0lqda/image/upload/v1773269837/Gemini_Generated_Image_oev627oev627oev6_iazi3t.png",
      processImages: [
        "https://res.cloudinary.com/dbey0lqda/image/upload/v1773317184/WhatsApp_Image_2026-03-12_at_12.04.18_nfbtms.jpg",
        "https://res.cloudinary.com/dbey0lqda/image/upload/v1773317192/WhatsApp_Image_2026-03-12_at_12.04.18_1_cke9kl.jpg",
        "https://res.cloudinary.com/dbey0lqda/image/upload/v1773269837/Gemini_Generated_Image_oev627oev627oev6_iazi3t.png"
      ],
      productTitles: ["CHARGING CABLE HOLDER", "KEYCHAIN", "PAPERWEIGHT"]
    },
    {
      id: 5,
      name: "Research Paper",
      description: "Ballast Tanks Research Paper",
      year: "2023",
      category: "physical",
      type: "research-paper",
      image: "https://res.cloudinary.com/dbey0lqda/image/upload/v1773524747/WhatsApp_Image_2026-03-14_at_21.39.56_jizoee.jpg",
      descriptionText: "Researched and analysed the origin, design and operation of ballast tank systems used in marine vessels such as submarines and container ships.",
      buttonText: "RESEARCH PAPER",
      buttonLink: "#"
    },
    {
      id: 7,
      name: "Sophie Real Estate Portugal",
      description: "Sophie Real Estate, Instagram Account",
      year: "2023",
      category: "digital",
      type: "social-media",
      image: "https://res.cloudinary.com/dbey0lqda/image/upload/v1773251449/LOGO_WHITE.png_jcomck.png",
      profileImage: "https://res.cloudinary.com/dbey0lqda/image/upload/v1773245580/WhatsApp_Image_2026-03-11_at_16.11.35_yypozc.jpg",
      descriptionText: "I helped build the digital presence of Sophie Real Estate Portugal, developing and managing its social media platforms while running both paid and organic marketing campaigns. Through targeted content and advertising strategies, the campaigns generated over 400 qualified leads, helping connect potential buyers with the agency's properties.",
      buttonText: "SOPHIE REAL ESTATE",
      buttonLink: "https://www.instagram.com/sophierealestateportugal",
      screenshotAspect: "phone",
      deviceType: "iphone"
    },
    {
      id: 8,
      name: "Golden Visa Campaign",
      description: "Sophie Real Estate, Golden Visa Campaign Website",
      year: "2023",
      category: "digital",
      type: "social-media",
      image: "https://res.cloudinary.com/dbey0lqda/image/upload/v1773269849/Design_sem_nome_4_eblzoz.png",
      profileImage: "https://res.cloudinary.com/dbey0lqda/image/upload/v1773241438/Screenshot_2026-03-10_213514_za5lg1.png",
      descriptionText: "I designed and developed a website as part of a campaign targeting Golden Visa investors interested in Portugal. The platform was created to showcase the services offered by Sophie Real Estate as a trusted partner for property acquisitions, presenting investment opportunities and guiding international buyers through the process of purchasing real estate in Portugal.",
      buttonText: "SOPHIE REAL ESTATE",
      buttonLink: "https://www.sophierealestate.eu/",
      screenshotAspect: "video",
      deviceType: "macbook"
    },
    {
      id: 6,
      name: "Watch World Collectors",
      description: "TikTok Watch Community",
      year: "2023",
      category: "digital",
      type: "social-media",
      image: "https://res.cloudinary.com/dbey0lqda/image/upload/v1773241470/WhatsApp_Image_2026-03-10_at_21.33.06_uthpac.jpg",
      profileImage: "https://res.cloudinary.com/dbey0lqda/image/upload/v1773241460/WhatsApp_Image_2026-03-10_at_21.33.06_1_auw4p1.jpg",
      descriptionText: "I created Watch World Collectors on TikTok as a space for watch enthusiasts to share their passion for timepieces. What started as a simple idea quickly grew into a community of collectors and admirers, reaching 12.7K followers, 6 million views, and over 345K likes, all brought together by a shared appreciation for watches.",
      buttonText: "WATCH WORLD COLLECTORS",
      buttonLink: "https://www.tiktok.com/@watchworldcollectors",
      screenshotAspect: "phone",
      deviceType: "iphone"
    }
  ];

  // Reset scroll to top when viewing product details
  useEffect(() => {
    if (selectedProduct || showAbout || showInquire) {
      scrollToTopImmediate();
    }
  }, [selectedProduct, showAbout, showInquire]);

  // Reset scroll when returning to category page
  useEffect(() => {
    if (!selectedProduct && !showAbout && !showInquire && selectedCategory !== 'all') {
      scrollToTopImmediate();
    }
  }, [selectedProduct, showAbout, showInquire, selectedCategory]);

  // Handle arrow visibility based on scroll
  useEffect(() => {
    if (!selectedProduct) return;

    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      const windowHeight = window.innerHeight;
      
      setShowArrow(scrollPosition < windowHeight * 0.8);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [selectedProduct]);

  // Filter products by category and sort by year (newest first)
  const filteredProducts = (selectedCategory === 'all'
    ? [...products]
    : products.filter(p => p.category === selectedCategory)
  ).sort((a, b) => parseInt(b.year) - parseInt(a.year));

  // Inquire Page
  if (showInquire) {
    return (
      <div className="min-h-screen bg-paper">
        {/* Navigation */}
        <nav className="fixed top-0 w-full bg-paper/80 backdrop-blur-md z-50">
          <div className="max-w-screen-2xl mx-auto px-8 md:px-16 py-6 flex items-center">
            <button 
              onClick={() => setShowInquire(false)}
              className="text-xs tracking-[0.2em] font-light hover:opacity-50 transition-opacity duration-700 ease-luxe"
            >
              BACK
            </button>
          </div>
        </nav>

        {/* Inquire Content */}
        <main className="pt-32 pb-24 px-8 md:px-16">
          <div className="max-w-2xl mx-auto">
            <div className="mb-12">
              <h1 className="text-3xl tracking-[0.1em] font-light mb-12">Inquire</h1>
              <div className="space-y-6 text-sm leading-relaxed font-light text-vandyke/90">
                <div>
                  <p className="text-xs tracking-[0.2em] text-vandyke/40 mb-2">EMAIL</p>
                  <a href="mailto:tomasjacinto06@gmail.com" className="text-lg hover:opacity-50 transition-opacity duration-700 ease-luxe">
                    tomasjacinto06@gmail.com
                  </a>
                </div>
                <div>
                  <p className="text-xs tracking-[0.2em] text-vandyke/40 mb-2">PHONE</p>
                  <a href="tel:+351915807500" className="text-lg hover:opacity-50 transition-opacity duration-700 ease-luxe">
                    +351 915 807 500
                  </a>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    );
  }

  // About Modal
  if (showAbout) {
    const handleCVClick = () => {
      // Open CV in new tab - you can replace this URL with your actual CV PDF URL
      window.open('https://drive.google.com/file/d/1H9amYZtm4aLcRjg4Mk4iN_QWeMBm-KJQ/view?usp=drive_link', '_blank');
    };

    return (
      <div className="min-h-screen bg-paper">
        {/* Navigation */}
        <nav className="fixed top-0 w-full bg-paper/80 backdrop-blur-md z-50">
          <div className="max-w-screen-2xl mx-auto px-8 md:px-16 py-6 flex items-center">
            <button 
              onClick={() => setShowAbout(false)}
              className="text-xs tracking-[0.2em] font-light hover:opacity-50 transition-opacity duration-700 ease-luxe"
            >
              BACK
            </button>
          </div>
        </nav>

        {/* About Content */}
        <main className="min-h-screen flex items-center justify-center px-8 md:px-16 py-32">
          <div className="max-w-2xl mx-auto flex flex-col justify-center flex-1">
            <div className="space-y-16">
              {/* Title with equal top spacing */}
              <div>
                <h1 className="text-3xl tracking-[0.1em] font-light">TJ</h1>
              </div>

              {/* Bio text */}
              <div className="text-sm leading-relaxed font-light text-vandyke/90 space-y-6">
                <p>
                  Ambitious second-year Mechanical Engineering student at Loughborough University (predicted 1st), driven by a genuine curiosity for how things work and a desire to build things that matter. With a background spanning engineering projects, international sports competitions, and real-world work experience.
                </p>
                <p>
                  This website was created with <span className="text-xl font-normal">ZERO</span> coding knowledge with only the help of Anthropic Claude Code. This portfolio is a testament to the impact and opportunity that Artificial Intelligence will have in all fields.
                </p>
              </div>

              {/* CV Button aligned left */}
              <div>
                <button
                  onClick={handleCVClick}
                  className="text-sm md:text-lg tracking-[0.15em] font-light hover:opacity-50 transition-opacity duration-700 ease-luxe"
                >
                  CURRICULUM VITAE
                </button>
              </div>
            </div>
          </div>
        </main>
      </div>
    );
  }

  if (selectedProduct) {
    // CUSTOM LAYOUT 1: Research Paper
    if (selectedProduct.type === "research-paper") {
      const scrollToBottom = () => scrollToElement('description-section');

      return (
        <div className="min-h-screen bg-paper">
          <nav className="fixed top-0 w-full bg-paper/80 backdrop-blur-md z-50">
            <div className="max-w-screen-2xl mx-auto px-8 md:px-16 py-6 flex items-center">
              <button 
                onClick={() => {
                  setSelectedProduct(null);
                  setShowArrow(true);
                  scrollToTopImmediate();
                }}
                className="text-xs tracking-[0.2em] font-light hover:opacity-50 transition-opacity duration-700 ease-luxe"
              >
                BACK
              </button>
            </div>
          </nav>

          {/* Hero Image */}
          <section className="h-screen relative flex items-center justify-center bg-paper">
            <motion.h1 {...reveal(0.1)} className="text-3xl md:text-5xl lg:text-6xl tracking-[0.2em] font-light text-center px-8 max-w-4xl">
              {selectedProduct.name.toUpperCase()}
            </motion.h1>
            
            {showArrow && (
              <button 
                onClick={scrollToBottom}
                className="absolute bottom-12 left-1/2 -translate-x-1/2 z-10 animate-bounce cursor-pointer hover:opacity-70 transition-opacity duration-700 ease-luxe"
              >
                <svg 
                  width="24" 
                  height="40" 
                  viewBox="0 0 24 40" 
                  fill="none" 
                  stroke="black" 
                  strokeWidth="1.5"
                >
                  <path d="M12 0 L12 36 M12 36 L6 30 M12 36 L18 30" />
                </svg>
              </button>
            )}
          </section>

          {/* Description Section with Button Below */}
          <section id="description-section" className="bg-paper pb-24 px-8 md:px-16 flex items-center justify-center min-h-screen">
            <div className="max-w-2xl mx-auto text-center">
              <p className="text-sm leading-relaxed font-light text-vandyke/75 mb-12">
                {selectedProduct.descriptionText}
              </p>
              <button
                onClick={() => window.open(selectedProduct.buttonLink, '_blank')}
                className="text-base md:text-2xl tracking-[0.15em] font-light hover:opacity-50 transition-opacity duration-700 ease-luxe"
              >
                {selectedProduct.buttonText}
              </button>
            </div>
          </section>
        </div>
      );
    }

    // CUSTOM LAYOUT 2: Social Media / Website (TikTok, Instagram, Golden Visa)
    if (selectedProduct.type === "social-media") {
      const scrollToBottom = () => scrollToElement('social-description-section-' + selectedProduct.id);

      const aspectRatio = selectedProduct.screenshotAspect === "square" ? "aspect-square" : selectedProduct.screenshotAspect === "video" ? "aspect-video" : "aspect-[9/16]";

      return (
        <div className="min-h-screen bg-paper">
          <nav className="fixed top-0 w-full bg-paper/80 backdrop-blur-md z-50">
            <div className="max-w-screen-2xl mx-auto px-8 md:px-16 py-6 flex items-center">
              <button 
                onClick={() => {
                  setSelectedProduct(null);
                  setShowArrow(true);
                  scrollToTopImmediate();
                }}
                className="text-xs tracking-[0.2em] font-light hover:opacity-50 transition-opacity duration-700 ease-luxe"
              >
                BACK
              </button>
            </div>
          </nav>

          {/* Hero Image */}
          <section className="h-screen relative flex items-center justify-center bg-paper">
            <motion.h1 {...reveal(0.1)} className="text-3xl md:text-5xl lg:text-6xl tracking-[0.2em] font-light text-center px-8 max-w-4xl">
              {selectedProduct.name.toUpperCase()}
            </motion.h1>
            
            {showArrow && (
              <button 
                onClick={scrollToBottom}
                className="absolute bottom-12 left-1/2 -translate-x-1/2 z-10 animate-bounce cursor-pointer hover:opacity-70 transition-opacity duration-700 ease-luxe"
              >
                <svg 
                  width="24" 
                  height="40" 
                  viewBox="0 0 24 40" 
                  fill="none" 
                  stroke="black" 
                  strokeWidth="1.5"
                >
                  <path d="M12 0 L12 36 M12 36 L6 30 M12 36 L18 30" />
                </svg>
              </button>
            )}
          </section>

          {/* Screenshot Section - clickable image, hidden for video aspect (Golden Visa) */}
          {selectedProduct.screenshotAspect !== "video" && (
            <section className="bg-paper py-24 px-8 md:px-16 flex items-center justify-center min-h-screen">
              <div className="max-w-md mx-auto">
                <button 
                  onClick={() => window.open(selectedProduct.buttonLink, '_blank')}
                  className="block hover:opacity-70 transition-opacity duration-700 ease-luxe cursor-pointer"
                >
                  <div className={`${aspectRatio} bg-vandyke/5 overflow-hidden`}>
                    <FadeImage 
                      src={selectedProduct.profileImage} 
                      alt="Screenshot"
                      className="w-full h-full object-cover"
                    />
                  </div>
                </button>
              </div>
            </section>
          )}

          {/* Description Section at Bottom */}
          <section id={'social-description-section-' + selectedProduct.id} className="bg-paper pb-24 px-8 md:px-16 flex items-center justify-center min-h-screen">
            <div className="max-w-2xl mx-auto text-center">
              <p className="text-sm leading-relaxed font-light text-vandyke/75 mb-12">
                {selectedProduct.descriptionText}
              </p>
              <button
                onClick={() => window.open(selectedProduct.buttonLink, '_blank')}
                className="text-base md:text-2xl tracking-[0.15em] font-light hover:opacity-50 transition-opacity duration-700 ease-luxe"
              >
                {selectedProduct.buttonText}
              </button>
            </div>
          </section>
        </div>
      );
    }

    // CUSTOM LAYOUT 3: 911 Collection
    if (selectedProduct.type === "911-collection") {
      const scrollToProduct1 = () => scrollToElement('product-1');

      return (
        <div className="min-h-screen bg-paper">
          <nav className="fixed top-0 w-full bg-paper/80 backdrop-blur-md z-50">
            <div className="max-w-screen-2xl mx-auto px-8 md:px-16 py-6 flex items-center">
              <button 
                onClick={() => {
                  setSelectedProduct(null);
                  setShowArrow(true);
                  scrollToTopImmediate();
                }}
                className="text-xs tracking-[0.2em] font-light hover:opacity-50 transition-opacity duration-700 ease-luxe"
              >
                BACK
              </button>
            </div>
          </nav>

          {/* Hero Image */}
          <section className="h-screen relative flex items-center justify-center bg-paper">
            <motion.h1 {...reveal(0.1)} className="text-3xl md:text-5xl lg:text-6xl tracking-[0.2em] font-light text-center px-8 max-w-4xl">
              {selectedProduct.name.toUpperCase()}
            </motion.h1>
            
            {showArrow && (
              <button 
                onClick={scrollToProduct1}
                className="absolute bottom-12 left-1/2 -translate-x-1/2 z-10 animate-bounce cursor-pointer hover:opacity-70 transition-opacity duration-700 ease-luxe"
              >
                <svg 
                  width="24" 
                  height="40" 
                  viewBox="0 0 24 40" 
                  fill="none" 
                  stroke="black" 
                  strokeWidth="1.5"
                >
                  <path d="M12 0 L12 36 M12 36 L6 30 M12 36 L18 30" />
                </svg>
              </button>
            )}
          </section>

          {/* Products in reverse order (3, 2, 1) */}
          <section className="bg-paper py-24 px-8 md:px-16">
            <div className="max-w-4xl mx-auto">
              
              {/* Product 3 */}
              <div className="mb-32">
                <div className="mb-8">
                  <h2 className="text-2xl tracking-[0.15em] font-light mb-8">
                    {selectedProduct.productTitles[2]}
                  </h2>
                </div>
                
                <div className="aspect-video bg-vandyke/5 overflow-hidden">
                  <FadeImage 
                    src={selectedProduct.processImages[2]} 
                    alt={selectedProduct.productTitles[2]}
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>

              {/* Product 2 */}
              <div className="mb-32">
                <div className="mb-8">
                  <h2 className="text-2xl tracking-[0.15em] font-light mb-8">
                    {selectedProduct.productTitles[1]}
                  </h2>
                </div>
                
                <div className="aspect-video bg-vandyke/5 overflow-hidden">
                  <FadeImage 
                    src={selectedProduct.processImages[1]} 
                    alt={selectedProduct.productTitles[1]}
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>

              {/* Product 1 */}
              <div id="product-1" className="mb-24">
                <div className="mb-8">
                  <h2 className="text-2xl tracking-[0.15em] font-light mb-8">
                    {selectedProduct.productTitles[0]}
                  </h2>
                </div>
                
                <div className="aspect-video bg-vandyke/5 overflow-hidden">
                  <FadeImage 
                    src={selectedProduct.processImages[0]} 
                    alt={selectedProduct.productTitles[0]}
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>

            </div>
          </section>
        </div>
      );
    }

    // DEFAULT LAYOUT: Standard 3-Stage Design Process
    const scrollToStage1 = () => scrollToElement('stage-1');

    return (
      <div className="min-h-screen bg-paper">
        <nav className="fixed top-0 w-full bg-paper/80 backdrop-blur-md z-50">
          <div className="max-w-screen-2xl mx-auto px-8 md:px-16 py-6 flex items-center">
            <button 
              onClick={() => {
                setSelectedProduct(null);
                setShowArrow(true);
                scrollToTopImmediate();
              }}
              className="text-xs tracking-[0.2em] font-light hover:opacity-50 transition-opacity duration-700 ease-luxe"
            >
              BACK
            </button>
          </div>
        </nav>

        <section className="h-screen relative flex items-center justify-center bg-paper">
          <motion.h1 {...reveal(0.1)} className="text-3xl md:text-5xl lg:text-6xl tracking-[0.2em] font-light text-center px-8 max-w-4xl">
            {selectedProduct.name.toUpperCase()}
          </motion.h1>
          
          {showArrow && (
            <button 
              onClick={scrollToStage1}
              className="absolute bottom-12 left-1/2 -translate-x-1/2 z-10 animate-bounce cursor-pointer hover:opacity-70 transition-opacity duration-700 ease-luxe"
            >
              <svg 
                width="24" 
                height="40" 
                viewBox="0 0 24 40" 
                fill="none" 
                stroke="black" 
                strokeWidth="1.5"
              >
                <path d="M12 0 L12 36 M12 36 L6 30 M12 36 L18 30" />
              </svg>
            </button>
          )}
        </section>

        <section className="bg-paper py-24 px-8 md:px-16">
          <div className="max-w-4xl mx-auto">

            {[3, 2, 1].map(stageNum => {
              const { title, text } = getStageContent(selectedProduct.process, stageNum);
              return (
                <div
                  key={stageNum}
                  id={stageNum === 1 ? 'stage-1' : undefined}
                  className={stageNum === 1 ? 'mb-24' : 'mb-32'}
                >
                  <div className="mb-8">
                    <h2 className="text-2xl tracking-[0.15em] font-light mb-8">
                      {title}
                    </h2>
                  </div>

                  <div className="aspect-video bg-vandyke/5 overflow-hidden mb-8 md:max-w-2xl md:mx-auto">
                    <FadeImage
                      src={selectedProduct.processImages[stageNum - 1]}
                      alt={`Stage ${stageNum}`}
                      className="w-full h-full object-cover"
                    />
                  </div>

                  {text && (
                    <p className="text-sm leading-relaxed font-light text-vandyke/75 max-w-2xl whitespace-pre-line">
                      {text}
                    </p>
                  )}
                </div>
              );
            })}

          </div>
        </section>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-paper">
      {/* Show homepage with category selection */}
      {selectedCategory === 'all' ? (
        <div className="h-screen flex items-center justify-center px-8">
          <div className="w-full flex flex-col items-center justify-center gap-10 md:gap-14">
            <SisyphusIntro play={playIntro} />

            <div className="flex flex-row items-center gap-10 md:gap-16">
              {categories.filter(c => c.id !== 'all').map((cat, i) => (
                <motion.button
                  key={cat.id}
                  {...reveal(2.4 + i * 0.12)}
                  onClick={() => setSelectedCategory(cat.id)}
                  className="text-lg md:text-2xl tracking-[0.15em] font-light hover:opacity-50 transition-opacity duration-700 ease-luxe"
                >
                  {cat.shortName}
                </motion.button>
              ))}
            </div>

            {/* About button */}
            <motion.button
              {...reveal(2.64)}
              onClick={() => setShowAbout(true)}
              className="text-lg md:text-2xl tracking-[0.15em] font-light hover:opacity-50 transition-opacity duration-700 ease-luxe"
            >
              TJ
            </motion.button>
          </div>
        </div>
      ) : (
        <>
          {/* Category Page Navigation */}
          <nav className="fixed top-0 w-full bg-paper/80 backdrop-blur-md z-50">
            <div className="max-w-screen-2xl mx-auto px-8 md:px-16 py-6 flex items-center">
              <button
                onClick={() => setSelectedCategory('all')}
                className="text-xs tracking-[0.2em] font-light hover:opacity-50 transition-opacity duration-700 ease-luxe"
              >
                BACK
              </button>
            </div>
          </nav>

          {/* Category Header */}
          <motion.div {...reveal()} className="pt-32 pb-12 px-8 md:px-16 text-center">
            <h1 className="text-3xl tracking-[0.15em] font-light">
              {categories.find(c => c.id === selectedCategory)?.name}
            </h1>
          </motion.div>

          {/* Gallery */}
          {selectedCategory === 'digital' && filteredProducts.length > 0 ? (
            <FloatingDeviceGallery products={filteredProducts} onSelect={setSelectedProduct} />
          ) : (
            <main className="pb-24 px-8 md:px-16">
              <div className="max-w-screen-2xl mx-auto">
                {filteredProducts.length > 0 ? (
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12 md:gap-16">
                    {filteredProducts.map((product, i) => (
                      <motion.div
                        key={product.id}
                        {...reveal(0.15 + i * 0.08)}
                        data-cursor="VIEW"
                        className="group cursor-pointer"
                        onClick={() => setSelectedProduct(product)}
                      >
                        <div className="aspect-square bg-vandyke/5 overflow-hidden mb-4 relative">
                          <FadeImage
                            src={product.image}
                            alt={product.name}
                            delay={0.15 + i * 0.08}
                            className="w-full h-full object-cover group-hover:scale-105"
                          />
                          {/* Desktop hover overlay with name and year */}
                          <div className="hidden md:flex absolute inset-0 bg-paper/90 backdrop-blur-sm opacity-0 group-hover:opacity-100 transition-opacity duration-700 ease-luxe items-center justify-center">
                            <div className="text-center">
                              <h3 className="text-lg tracking-[0.1em] font-light mb-1">{product.name}</h3>
                              <p className="text-xs tracking-[0.2em] text-vandyke/60">{product.year}</p>
                            </div>
                          </div>
                        </div>

                        <p className="text-xs tracking-[0.15em] font-light text-vandyke/75">
                          {product.description}, {product.year}
                        </p>
                      </motion.div>
                    ))}
                  </div>
                ) : (
                  <div className="min-h-[50vh] flex items-center justify-center">
                    <p className="text-sm tracking-[0.2em] font-light text-vandyke/40">
                      Coming soon…
                    </p>
                  </div>
                )}
              </div>
            </main>
          )}
        </>
      )}
    </div>
  );
}
