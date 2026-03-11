import React, { useState, useEffect } from 'react';
import { ArrowLeft } from 'lucide-react';

export default function Portfolio() {
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [showAbout, setShowAbout] = useState(false);
  const [showInquire, setShowInquire] = useState(false);
  const [showArrow, setShowArrow] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState('all');

  // Load Inter font
  useEffect(() => {
    const link = document.createElement('link');
    link.href = 'https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600&display=swap';
    link.rel = 'stylesheet';
    document.head.appendChild(link);
    
    // Apply font to body
    document.body.style.fontFamily = "'Inter', sans-serif";
    
    return () => {
      document.head.removeChild(link);
      document.body.style.fontFamily = '';
    };
  }, []);

  const categories = [
    { id: 'all', name: 'ALL', description: 'Complete collection of work' },
    { id: 'marketing', name: 'MARKETING', description: 'Marketing projects' },
    { id: 'independent', name: 'INDEPENDENT PROJECTS', description: 'Independent work' },
    { id: 'engineering', name: 'MECHANICAL ENGINEERING', description: 'Engineering projects' }
  ];

  const defaultProducts = [
    {
      id: 1,
      name: "Toting Tray",
      description: "Industry Partnered Project, Renishaw",
      year: "2026",
      category: "engineering",
      type: "standard",
      image: "https://res.cloudinary.com/dbey0lqda/image/upload/v1773241437/18e65f4d-f910-4e4b-8dc2-91b2802d99d8_yrdiuv.png",
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
      category: "engineering",
      type: "standard",
      image: "https://res.cloudinary.com/dbey0lqda/image/upload/v1773245807/Picture12_nxep9y.jpg",
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
      category: "engineering",
      type: "standard",
      image: "https://res.cloudinary.com/dbey0lqda/image/upload/v1773246602/WhatsApp_Image_2026-03-11_at_16.20.49_1_t63yax.jpg",
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
      category: "independent",
      type: "911-collection",
      image: "https://images.unsplash.com/photo-1503376780353-7e6692767b70?w=800&q=80",
      processImages: [
        "https://images.unsplash.com/photo-1503376780353-7e6692767b70?w=800&q=80",
        "https://images.unsplash.com/photo-1503376780353-7e6692767b70?w=800&q=80",
        "https://images.unsplash.com/photo-1503376780353-7e6692767b70?w=800&q=80"
      ],
      productTitles: ["CHARGING CABLE HOLDER", "KEYCHAIN", "PAPERWEIGHT"]
    },
    {
      id: 5,
      name: "Research Paper",
      description: "Ballast Tanks Research Paper",
      year: "2023",
      category: "independent",
      type: "research-paper",
      image: "https://images.unsplash.com/photo-1532619675605-1ede6c2ed2b0?w=800&q=80",
      descriptionText: "Researched and analysed the origin, design and operation of ballast tank systems used in marine vessels such as submarines and container ships.",
      buttonText: "RESEARCH PAPER",
      buttonLink: "/path-to-research-paper.pdf"
    },
    {
      id: 6,
      name: "Watch World Collectors",
      description: "TikTok Watch Community",
      year: "2023",
      category: "independent",
      type: "social-media",
      image: "https://res.cloudinary.com/dbey0lqda/image/upload/v1773241470/WhatsApp_Image_2026-03-10_at_21.33.06_uthpac.jpg",
      profileImage: "https://res.cloudinary.com/dbey0lqda/image/upload/v1773241460/WhatsApp_Image_2026-03-10_at_21.33.06_1_auw4p1.jpg",
      descriptionText: "I created Watch World Collectors on TikTok as a space for watch enthusiasts to share their passion for timepieces. What started as a simple idea quickly grew into a community of collectors and admirers, reaching 12.7K followers, 6 million views, and over 345K likes, all brought together by a shared appreciation for watches.",
      buttonText: "WATCH WORLD COLLECTORS",
      buttonLink: "https://www.tiktok.com/@your-account",
      screenshotAspect: "phone"
    },
    {
      id: 7,
      name: "Sophie Real Estate Portugal",
      description: "Sophie Real Estate, Instagram Account",
      year: "2023",
      category: "marketing",
      type: "social-media",
      image: "https://res.cloudinary.com/dbey0lqda/image/upload/v1773245572/LOGO_NORAL.png_k6ejc1.png",
      profileImage: "https://res.cloudinary.com/dbey0lqda/image/upload/v1773245580/WhatsApp_Image_2026-03-11_at_16.11.35_yypozc.jpg",
      descriptionText: "I helped build the digital presence of Sophie Real Estate Portugal, developing and managing its social media platforms while running both paid and organic marketing campaigns. Through targeted content and advertising strategies, the campaigns generated over 400 qualified leads, helping connect potential buyers with the agency's properties.",
      buttonText: "SOPHIE REAL ESTATE",
      buttonLink: "https://www.instagram.com/sophierealestate",
      screenshotAspect: "phone"
    },
    {
      id: 8,
      name: "Golden Visa Campaign",
      description: "Sophie Real Estate, Golden Visa Campaign Website",
      year: "2023",
      category: "marketing",
      type: "social-media",
      image: "https://res.cloudinary.com/dbey0lqda/image/upload/v1773241438/Screenshot_2026-03-10_213436_drok0m.png",
      profileImage: "https://res.cloudinary.com/dbey0lqda/image/upload/v1773241438/Screenshot_2026-03-10_213514_za5lg1.png",
      descriptionText: "I designed and developed a website as part of a campaign targeting Golden Visa investors interested in Portugal. The platform was created to showcase the services offered by Sophie Real Estate as a trusted partner for property acquisitions, presenting investment opportunities and guiding international buyers through the process of purchasing real estate in Portugal.",
      buttonText: "SOPHIE REAL ESTATE",
      buttonLink: "https://www.sophierealestate.com/golden-visa",
      screenshotAspect: "square"
    }
  ];

  const products = defaultProducts;

  // Reset scroll to top when viewing product details
  useEffect(() => {
    if (selectedProduct || showAbout || showInquire) {
      window.scrollTo(0, 0);
    }
  }, [selectedProduct, showAbout, showInquire]);

  // Reset scroll when returning to category page
  useEffect(() => {
    if (!selectedProduct && !showAbout && !showInquire && selectedCategory !== 'all') {
      window.scrollTo(0, 0);
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
  const filteredProducts = selectedCategory === 'all' 
    ? products.sort((a, b) => parseInt(b.year) - parseInt(a.year))
    : products.filter(p => p.category === selectedCategory).sort((a, b) => parseInt(b.year) - parseInt(a.year));

  // Inquire Page
  if (showInquire) {
    return (
      <div className="min-h-screen bg-white" style={{ fontFamily: "'Inter', sans-serif" }}>
        {/* Navigation */}
        <nav className="fixed top-0 w-full bg-white/80 backdrop-blur-md z-50">
          <div className="max-w-screen-2xl mx-auto px-8 md:px-16 py-6 flex items-center justify-between">
            <button 
              onClick={() => setShowInquire(false)}
              className="flex items-center gap-2 text-xs tracking-[0.2em] font-light hover:opacity-50 transition-opacity"
            >
              <ArrowLeft size={16} strokeWidth={1} />
              BACK
            </button>
            <div className="text-sm tracking-[0.3em] font-light">TJ</div>
            <div className="w-16"></div>
          </div>
        </nav>

        {/* Inquire Content */}
        <main className="pt-32 pb-24 px-8 md:px-16">
          <div className="max-w-2xl mx-auto">
            <div className="mb-12">
              <h1 className="text-3xl tracking-[0.1em] font-light mb-12">Get in Touch</h1>
              <div className="space-y-6 text-sm leading-relaxed font-light text-neutral-700">
                <div>
                  <p className="text-xs tracking-[0.2em] text-neutral-400 mb-2">EMAIL</p>
                  <a href="mailto:tomasjacinto06@gmail.com" className="text-lg hover:opacity-50 transition-opacity">
                    tomasjacinto06@gmail.com
                  </a>
                </div>
                <div>
                  <p className="text-xs tracking-[0.2em] text-neutral-400 mb-2">PHONE</p>
                  <a href="tel:+351915807500" className="text-lg hover:opacity-50 transition-opacity">
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
      window.open('/path-to-your-cv.pdf', '_blank');
    };

    return (
      <div className="min-h-screen bg-white" style={{ fontFamily: "'Inter', sans-serif" }}>
        {/* Navigation */}
        <nav className="fixed top-0 w-full bg-white/80 backdrop-blur-md z-50">
          <div className="max-w-screen-2xl mx-auto px-8 md:px-16 py-6 flex items-center justify-between">
            <button 
              onClick={() => setShowAbout(false)}
              className="flex items-center gap-2 text-xs tracking-[0.2em] font-light hover:opacity-50 transition-opacity"
            >
              <ArrowLeft size={16} strokeWidth={1} />
              BACK
            </button>
            <div className="text-sm tracking-[0.3em] font-light">TJ</div>
            <div className="w-16"></div>
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
              <div className="text-sm leading-relaxed font-light text-neutral-700 space-y-6">
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
                  className="text-sm md:text-lg tracking-[0.15em] font-light hover:opacity-50 transition-opacity"
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
      const scrollToBottom = () => {
        const descSection = document.getElementById('description-section');
        if (descSection) {
          const rect = descSection.getBoundingClientRect();
          const absoluteTop = rect.top + window.pageYOffset;
          const targetScroll = absoluteTop + rect.height - window.innerHeight;
          
          window.scrollTo({
            top: targetScroll,
            behavior: 'smooth'
          });
        }
      };

      return (
        <div className="min-h-screen bg-white" style={{ fontFamily: "'Inter', sans-serif" }}>
          <nav className="fixed top-0 w-full bg-white/80 backdrop-blur-md z-50">
            <div className="max-w-screen-2xl mx-auto px-8 md:px-16 py-6 flex items-center justify-between">
              <button 
                onClick={() => {
                  setSelectedProduct(null);
                  setShowArrow(true);
                  window.scrollTo(0, 0);
                }}
                className="flex items-center gap-2 text-xs tracking-[0.2em] font-light hover:opacity-50 transition-opacity"
              >
                <ArrowLeft size={16} strokeWidth={1} />
                BACK
              </button>
              <div className="text-sm tracking-[0.3em] font-light">RESEARCH</div>
              <div className="w-16"></div>
            </div>
          </nav>

          {/* Hero Image */}
          <section className="h-screen relative flex items-center justify-center">
            <div className="absolute inset-0 bg-neutral-50">
              <img 
                src={selectedProduct.image} 
                alt={selectedProduct.name}
                className="w-full h-full object-cover"
              />
            </div>
            
            {showArrow && (
              <button 
                onClick={scrollToBottom}
                className="absolute bottom-12 left-1/2 -translate-x-1/2 z-10 animate-bounce cursor-pointer hover:opacity-70 transition-opacity bg-white rounded-full p-4 shadow-lg"
              >
                <svg 
                  width="24" 
                  height="40" 
                  viewBox="0 0 24 40" 
                  fill="none" 
                  stroke="black" 
                  strokeWidth="1"
                >
                  <path d="M12 0 L12 36 M12 36 L6 30 M12 36 L18 30" />
                </svg>
              </button>
            )}
          </section>

          {/* Button Section */}
          <section className="bg-white py-24 px-8 md:px-16 flex items-center justify-center min-h-screen">
            <div className="max-w-2xl mx-auto text-center">
              <button
                onClick={() => window.open(selectedProduct.buttonLink, '_blank')}
                className="text-base md:text-2xl tracking-[0.15em] font-light hover:opacity-50 transition-opacity"
              >
                {selectedProduct.buttonText}
              </button>
            </div>
          </section>

          {/* Description Section at Bottom */}
          <section id="description-section" className="bg-white pb-24 px-8 md:px-16">
            <div className="max-w-2xl mx-auto">
              <p className="text-sm leading-relaxed font-light text-neutral-600">
                {selectedProduct.descriptionText}
              </p>
            </div>
          </section>
        </div>
      );
    }

    // CUSTOM LAYOUT 2: Social Media / Website (TikTok, Instagram, Golden Visa)
    if (selectedProduct.type === "social-media") {
      const scrollToBottom = () => {
        const descSection = document.getElementById('social-description-section-' + selectedProduct.id);
        if (descSection) {
          const rect = descSection.getBoundingClientRect();
          const absoluteTop = rect.top + window.pageYOffset;
          const targetScroll = absoluteTop + rect.height - window.innerHeight;
          
          window.scrollTo({
            top: targetScroll,
            behavior: 'smooth'
          });
        }
      };

      const aspectRatio = selectedProduct.screenshotAspect === "square" ? "aspect-square" : "aspect-[9/16]";

      return (
        <div className="min-h-screen bg-white" style={{ fontFamily: "'Inter', sans-serif" }}>
          <nav className="fixed top-0 w-full bg-white/80 backdrop-blur-md z-50">
            <div className="max-w-screen-2xl mx-auto px-8 md:px-16 py-6 flex items-center justify-between">
              <button 
                onClick={() => {
                  setSelectedProduct(null);
                  setShowArrow(true);
                  window.scrollTo(0, 0);
                }}
                className="flex items-center gap-2 text-xs tracking-[0.2em] font-light hover:opacity-50 transition-opacity"
              >
                <ArrowLeft size={16} strokeWidth={1} />
                BACK
              </button>
              <div className="text-sm tracking-[0.3em] font-light">
                {selectedProduct.screenshotAspect === "square" ? "WEBSITE" : "SOCIAL MEDIA"}
              </div>
              <div className="w-16"></div>
            </div>
          </nav>

          {/* Hero Image */}
          <section className="h-screen relative flex items-center justify-center">
            <div className="absolute inset-0 bg-neutral-50">
              <img 
                src={selectedProduct.image} 
                alt={selectedProduct.name}
                className="w-full h-full object-cover"
              />
            </div>
            
            {showArrow && (
              <button 
                onClick={scrollToBottom}
                className="absolute bottom-12 left-1/2 -translate-x-1/2 z-10 animate-bounce cursor-pointer hover:opacity-70 transition-opacity bg-white rounded-full p-4 shadow-lg"
              >
                <svg 
                  width="24" 
                  height="40" 
                  viewBox="0 0 24 40" 
                  fill="none" 
                  stroke="black" 
                  strokeWidth="1"
                >
                  <path d="M12 0 L12 36 M12 36 L6 30 M12 36 L18 30" />
                </svg>
              </button>
            )}
          </section>

          {/* Button Section */}
          <section className="bg-white py-24 px-8 md:px-16 flex items-center justify-center min-h-screen">
            <div className="max-w-2xl mx-auto text-center">
              <button
                onClick={() => window.open(selectedProduct.buttonLink, '_blank')}
                className="text-base md:text-2xl tracking-[0.15em] font-light hover:opacity-50 transition-opacity"
              >
                {selectedProduct.buttonText}
              </button>
            </div>
          </section>

          {/* Screenshot Section */}
          <section className="bg-white py-24 px-8 md:px-16">
            <div className="max-w-md mx-auto">
              <div className={`${aspectRatio} bg-neutral-50 overflow-hidden`}>
                <img 
                  src={selectedProduct.profileImage} 
                  alt="Screenshot"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          </section>

          {/* Description Section at Bottom */}
          <section id={'social-description-section-' + selectedProduct.id} className="bg-white pb-24 px-8 md:px-16">
            <div className="max-w-2xl mx-auto">
              <p className="text-sm leading-relaxed font-light text-neutral-600">
                {selectedProduct.descriptionText}
              </p>
            </div>
          </section>
        </div>
      );
    }

    // CUSTOM LAYOUT 3: 911 Collection
    if (selectedProduct.type === "911-collection") {
      const scrollToProduct1 = () => {
        const section = document.getElementById('product-1');
        if (section) {
          const rect = section.getBoundingClientRect();
          const absoluteTop = rect.top + window.pageYOffset;
          const targetScroll = absoluteTop + rect.height - window.innerHeight;
          
          window.scrollTo({
            top: targetScroll,
            behavior: 'smooth'
          });
        }
      };

      return (
        <div className="min-h-screen bg-white" style={{ fontFamily: "'Inter', sans-serif" }}>
          <nav className="fixed top-0 w-full bg-white/80 backdrop-blur-md z-50">
            <div className="max-w-screen-2xl mx-auto px-8 md:px-16 py-6 flex items-center justify-between">
              <button 
                onClick={() => {
                  setSelectedProduct(null);
                  setShowArrow(true);
                  window.scrollTo(0, 0);
                }}
                className="flex items-center gap-2 text-xs tracking-[0.2em] font-light hover:opacity-50 transition-opacity"
              >
                <ArrowLeft size={16} strokeWidth={1} />
                BACK
              </button>
              <div className="text-sm tracking-[0.3em] font-light">911 COLLECTION</div>
              <div className="w-16"></div>
            </div>
          </nav>

          {/* Hero Image */}
          <section className="h-screen relative flex items-center justify-center">
            <div className="absolute inset-0 bg-neutral-50">
              <img 
                src={selectedProduct.image} 
                alt={selectedProduct.name}
                className="w-full h-full object-cover"
              />
            </div>
            
            {showArrow && (
              <button 
                onClick={scrollToProduct1}
                className="absolute bottom-12 left-1/2 -translate-x-1/2 z-10 animate-bounce cursor-pointer hover:opacity-70 transition-opacity bg-white rounded-full p-4 shadow-lg"
              >
                <svg 
                  width="24" 
                  height="40" 
                  viewBox="0 0 24 40" 
                  fill="none" 
                  stroke="black" 
                  strokeWidth="1"
                >
                  <path d="M12 0 L12 36 M12 36 L6 30 M12 36 L18 30" />
                </svg>
              </button>
            )}
          </section>

          {/* Products in reverse order (3, 2, 1) */}
          <section className="bg-white py-24 px-8 md:px-16">
            <div className="max-w-4xl mx-auto">
              
              {/* Product 3 */}
              <div className="mb-32">
                <div className="mb-8">
                  <h2 className="text-2xl tracking-[0.15em] font-light mb-8">
                    {selectedProduct.productTitles[2]}
                  </h2>
                </div>
                
                <div className="aspect-video bg-neutral-50 overflow-hidden">
                  <img 
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
                
                <div className="aspect-video bg-neutral-50 overflow-hidden">
                  <img 
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
                
                <div className="aspect-video bg-neutral-50 overflow-hidden">
                  <img 
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
    const scrollToStage1 = () => {
      const stage1Section = document.getElementById('stage-1');
      if (stage1Section) {
        const rect = stage1Section.getBoundingClientRect();
        const absoluteTop = rect.top + window.pageYOffset;
        const targetScroll = absoluteTop + rect.height - window.innerHeight;
        
        window.scrollTo({
          top: targetScroll,
          behavior: 'smooth'
        });
      }
    };

    return (
      <div className="min-h-screen bg-white" style={{ fontFamily: "'Inter', sans-serif" }}>
        <nav className="fixed top-0 w-full bg-white/80 backdrop-blur-md z-50">
          <div className="max-w-screen-2xl mx-auto px-8 md:px-16 py-6 flex items-center justify-between">
            <button 
              onClick={() => {
                setSelectedProduct(null);
                setShowArrow(true);
                window.scrollTo(0, 0);
              }}
              className="flex items-center gap-2 text-xs tracking-[0.2em] font-light hover:opacity-50 transition-opacity"
            >
              <ArrowLeft size={16} strokeWidth={1} />
              BACK
            </button>
            <div className="text-sm tracking-[0.3em] font-light">DESIGN PROCESS</div>
            <div className="w-16"></div>
          </div>
        </nav>

        <section className="h-screen relative flex items-center justify-center">
          <div className="absolute inset-0 bg-neutral-50">
            <img 
              src={selectedProduct.image} 
              alt={selectedProduct.name}
              className="w-full h-full object-cover"
            />
          </div>
          
          {showArrow && (
            <button 
              onClick={scrollToStage1}
              className="absolute bottom-12 left-1/2 -translate-x-1/2 z-10 animate-bounce cursor-pointer hover:opacity-70 transition-opacity bg-white rounded-full p-4 shadow-lg"
            >
              <svg 
                width="24" 
                height="40" 
                viewBox="0 0 24 40" 
                fill="none" 
                stroke="black" 
                strokeWidth="1"
              >
                <path d="M12 0 L12 36 M12 36 L6 30 M12 36 L18 30" />
              </svg>
            </button>
          )}
        </section>

        <section className="bg-white py-24 px-8 md:px-16">
          <div className="max-w-4xl mx-auto">
            
            {/* Stage 3 */}
            <div className="mb-32">
              <div className="mb-8">
                <h2 className="text-2xl tracking-[0.15em] font-light mb-8">
                  {selectedProduct.process.split('\n').find(line => line.toUpperCase().includes('STAGE 3'))?.trim() || 'STAGE 3'}
                </h2>
              </div>
              
              <div className="aspect-video bg-neutral-50 overflow-hidden mb-8">
                <img 
                  src={selectedProduct.processImages[2]} 
                  alt="Stage 3"
                  className="w-full h-full object-cover"
                />
              </div>
              
              {(() => {
                const lines = selectedProduct.process.split('\n');
                const stage3Index = lines.findIndex(line => line.toUpperCase().includes('STAGE 3'));
                if (stage3Index === -1) return null;
                
                const nextStageIndex = lines.slice(stage3Index + 1).findIndex(line => line.toUpperCase().includes('STAGE'));
                const endIndex = nextStageIndex === -1 ? lines.length : stage3Index + 1 + nextStageIndex;
                
                const stage3Text = lines.slice(stage3Index + 1, endIndex).join('\n').trim();
                
                return stage3Text && stage3Text.length > 0 ? (
                  <p className="text-sm leading-relaxed font-light text-neutral-600 max-w-2xl whitespace-pre-line">
                    {stage3Text}
                  </p>
                ) : null;
              })()}
            </div>

            {/* Stage 2 */}
            <div className="mb-32">
              <div className="mb-8">
                <h2 className="text-2xl tracking-[0.15em] font-light mb-8">
                  {selectedProduct.process.split('\n').find(line => line.toUpperCase().includes('STAGE 2'))?.trim() || 'STAGE 2'}
                </h2>
              </div>
              
              <div className="aspect-video bg-neutral-50 overflow-hidden mb-8">
                <img 
                  src={selectedProduct.processImages[1]} 
                  alt="Stage 2"
                  className="w-full h-full object-cover"
                />
              </div>
              
              {(() => {
                const lines = selectedProduct.process.split('\n');
                const stage2Index = lines.findIndex(line => line.toUpperCase().includes('STAGE 2'));
                if (stage2Index === -1) return null;
                
                const stage3Index = lines.slice(stage2Index + 1).findIndex(line => line.toUpperCase().includes('STAGE 3'));
                const endIndex = stage3Index === -1 ? lines.length : stage2Index + 1 + stage3Index;
                
                const stage2Text = lines.slice(stage2Index + 1, endIndex).join('\n').trim();
                
                return stage2Text && stage2Text.length > 0 ? (
                  <p className="text-sm leading-relaxed font-light text-neutral-600 max-w-2xl whitespace-pre-line">
                    {stage2Text}
                  </p>
                ) : null;
              })()}
            </div>

            {/* Stage 1 */}
            <div id="stage-1" className="mb-24">
              <div className="mb-8">
                <h2 className="text-2xl tracking-[0.15em] font-light mb-8">
                  {selectedProduct.process.split('\n').find(line => line.toUpperCase().includes('STAGE 1'))?.trim() || 'STAGE 1'}
                </h2>
              </div>
              
              <div className="aspect-video bg-neutral-50 overflow-hidden mb-8">
                <img 
                  src={selectedProduct.processImages[0]} 
                  alt="Stage 1"
                  className="w-full h-full object-cover"
                />
              </div>
              
              {(() => {
                const lines = selectedProduct.process.split('\n');
                const stage1Index = lines.findIndex(line => line.toUpperCase().includes('STAGE 1'));
                if (stage1Index === -1) return null;
                
                const stage2Index = lines.slice(stage1Index + 1).findIndex(line => line.toUpperCase().includes('STAGE 2'));
                const endIndex = stage2Index === -1 ? lines.length : stage1Index + 1 + stage2Index;
                
                const stage1Text = lines.slice(stage1Index + 1, endIndex).join('\n').trim();
                
                return stage1Text && stage1Text.length > 0 ? (
                  <p className="text-sm leading-relaxed font-light text-neutral-600 max-w-2xl whitespace-pre-line">
                    {stage1Text}
                  </p>
                ) : null;
              })()}
            </div>

          </div>
        </section>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white overflow-hidden" style={{ fontFamily: "'Inter', sans-serif" }}>
      {/* Show homepage with category selection */}
      {selectedCategory === 'all' ? (
        <>
          {/* Minimal Navigation - Homepage */}
          <nav className="fixed top-0 w-full bg-white/80 backdrop-blur-md z-50">
            <div className="max-w-screen-2xl mx-auto px-8 md:px-16 py-6 flex items-center justify-center">
              <div className="text-sm tracking-[0.3em] font-light">TJ</div>
            </div>
          </nav>

          {/* Centered Category Menu */}
          <main className="h-screen flex items-center justify-center px-8 overflow-hidden">
            <div className="flex flex-col items-center justify-center space-y-6 md:space-y-8">
              {categories.filter(c => c.id !== 'all').map(cat => (
                <button
                  key={cat.id}
                  onClick={() => setSelectedCategory(cat.id)}
                  className="text-sm md:text-lg tracking-[0.15em] font-light hover:opacity-50 transition-opacity"
                >
                  {cat.name}
                </button>
              ))}
              
              {/* Divider */}
              <div className="w-px h-6 md:h-8 bg-neutral-200"></div>
              
              {/* About and Inquire buttons */}
              <button
                onClick={() => setShowAbout(true)}
                className="text-sm md:text-lg tracking-[0.15em] font-light hover:opacity-50 transition-opacity"
              >
                ABOUT
              </button>
              <button
                onClick={() => setShowInquire(true)}
                className="text-sm md:text-lg tracking-[0.15em] font-light hover:opacity-50 transition-opacity"
              >
                INQUIRE
              </button>
            </div>
          </main>

          {/* Minimal Footer */}
          <footer className="fixed bottom-0 w-full border-t border-black/5 py-8 px-8 md:px-16 bg-white/80 backdrop-blur-md">
            <div className="max-w-screen-2xl mx-auto flex flex-col md:flex-row justify-between items-center gap-4">
              <p className="text-xs tracking-[0.2em] font-light text-neutral-400">
                TJ © 2026
              </p>
              <div className="flex gap-8">
                <button 
                  onClick={() => setShowInquire(true)}
                  className="text-xs tracking-[0.2em] font-light text-neutral-400 hover:text-black transition-colors"
                >
                  INQUIRE
                </button>
              </div>
            </div>
          </footer>
        </>
      ) : (
        <>
          {/* Category Page Navigation */}
          <nav className="fixed top-0 w-full bg-white/80 backdrop-blur-md z-50">
            <div className="max-w-screen-2xl mx-auto px-8 md:px-16 py-6 flex items-center justify-between">
              <button
                onClick={() => setSelectedCategory('all')}
                className="flex items-center gap-2 text-xs tracking-[0.2em] font-light hover:opacity-50 transition-opacity"
              >
                <ArrowLeft size={16} strokeWidth={1} />
                HOME
              </button>
              
              <div className="text-sm tracking-[0.3em] font-light">TJ</div>

              <div className="w-16"></div>
            </div>
          </nav>

          {/* Category Header */}
          <div className="pt-32 pb-12 px-8 md:px-16 text-center">
            <h1 className="text-3xl tracking-[0.15em] font-light">
              {categories.find(c => c.id === selectedCategory)?.name}
            </h1>
          </div>

          {/* Gallery Grid */}
          <main className="pb-24 px-8 md:px-16">
            <div className="max-w-screen-2xl mx-auto">
              {filteredProducts.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12 md:gap-16">
                  {filteredProducts.map(product => (
                    <div 
                      key={product.id} 
                      className="group cursor-pointer"
                      onClick={() => setSelectedProduct(product)}
                    >
                      <div className="aspect-square bg-neutral-50 overflow-hidden mb-4 relative">
                        <img 
                          src={product.image} 
                          alt={product.name}
                          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                        />
                        {/* Desktop hover overlay with name and year */}
                        <div className="hidden md:flex absolute inset-0 bg-white/90 backdrop-blur-sm opacity-0 group-hover:opacity-100 transition-opacity duration-300 items-center justify-center">
                          <div className="text-center">
                            <h3 className="text-lg tracking-[0.1em] font-light mb-1">{product.name}</h3>
                            <p className="text-xs tracking-[0.2em] text-neutral-500">{product.year}</p>
                          </div>
                        </div>
                      </div>
                      
                      <p className="text-xs tracking-[0.15em] font-light text-neutral-600">
                        {product.description}, {product.year}
                      </p>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="min-h-[50vh] flex items-center justify-center">
                  <p className="text-sm tracking-[0.2em] font-light text-neutral-400">
                    Coming soon…
                  </p>
                </div>
              )}
            </div>
          </main>

          {/* Minimal Footer */}
          <footer className="border-t border-black/5 py-8 px-8 md:px-16">
            <div className="max-w-screen-2xl mx-auto flex flex-col md:flex-row justify-between items-center gap-4">
              <p className="text-xs tracking-[0.2em] font-light text-neutral-400">
                TJ © 2026
              </p>
              <div className="flex gap-8">
                <button 
                  onClick={() => setShowInquire(true)}
                  className="text-xs tracking-[0.2em] font-light text-neutral-400 hover:text-black transition-colors"
                >
                  INQUIRE
                </button>
              </div>
            </div>
          </footer>
        </>
      )}
    </div>
  );
}
