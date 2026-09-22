/**
 * Central Content Configuration for Anagha Mhaiskar's Creative Portfolio.
 * Adheres strictly to CONTENT_RULES.md.
 * Only verified information from primary records and supplied media is included.
 * First-person voice, genuine project documentation, zero em dashes.
 */

export interface BrandClient {
  id: string;
  name: string;
  sector: string;
  workType: string;
  tagline?: string;
}

export interface ProjectAsset {
  url: string;
  caption: string;
  aspect?: string;
}

export interface Project {
  id: string;
  title: string;
  client: string;
  role: string;
  category: string;
  timeline: string;
  introduction: string;
  whatIWorkedOn: string[];
  whatWasDone: string;
  outcome?: string;
  gallery: ProjectAsset[];
  tools: string[];
}

export interface ServiceGroup {
  name: string;
  description: string;
  items: string[];
}

export interface ServiceTier {
  category: 'SINGLES' | 'RETAINERS' | 'CUSTOM';
  title: string;
  subtitle: string;
  description: string;
  groups: ServiceGroup[];
  suitableFor: string;
}

export interface CapabilityPillar {
  id: string;
  number: string;
  title: string;
  thesis: string;
  description: string;
  points: string[];
}

export interface ToolItem {
  name: string;
  shortName: string;
  code: string;
  discipline: string;
  application: string;
  description: string;
}

export interface ExperienceItem {
  company: string;
  role: string;
  period: string;
  type: string;
  location: string;
  summary: string;
  responsibilities: string[];
}

export interface EducationItem {
  institution: string;
  degree: string;
  discipline: string;
  period: string;
  score: string;
}

export interface AnaghaContent {
  identity: {
    fullName: string;
    firstName: string;
    lastName: string;
    currentTitle: string;
    verifiedLocation: string;
    secondaryLocation: string;
    editorialSubtitle: string;
    statement: string;
    portraitImage: string;
    introCardImage: string;
    spheres: string[];
  };
  brands: BrandClient[];
  projects: Project[];
  capabilities: CapabilityPillar[];
  tools: ToolItem[];
  services: ServiceTier[];
  experience: ExperienceItem[];
  education: EducationItem[];
  contact: {
    heading: string;
    subheading: string;
    email: string;
    phonePlaceholder: string;
    locationNotice: string;
    socialLinks: {
      platform: string;
      handle: string;
      url: string;
    }[];
  };
}

export const anaghaContent: AnaghaContent = {
  identity: {
    fullName: "Anagha Mhaiskar",
    firstName: "Anagha",
    lastName: "Mhaiskar",
    currentTitle: "Social Media Manager & Creative Designer",
    verifiedLocation: "Pune District, Maharashtra, India",
    secondaryLocation: "Nagpur, Maharashtra, India",
    editorialSubtitle: "Social Media · Design · Content · Video · Web",
    statement: "I combine intentional visual systems, physical product packaging, and responsive social media execution with real craft.",
    portraitImage: "/assets/anagha/anagha-portrait.webp",
    introCardImage: "/assets/anagha/anagha-intro-card.webp",
    spheres: [
      "SOCIAL MEDIA",
      "GRAPHIC DESIGN",
      "CONTENT STRATEGY",
      "VIDEO EDITING",
      "WEB INTERFACES",
      "DIGITAL COMMUNICATION"
    ]
  },

  brands: [
    {
      id: "neil-momo",
      name: "Neil & Momo",
      sector: "Organic Skincare & Soaps",
      workType: "Packaging Design, Social Management, E-Commerce UI",
      tagline: "Cold-Processed Botanical Skincare"
    },
    {
      id: "dnnovate",
      name: "Dnnovate Technologies",
      sector: "Digital & Technology Services",
      workType: "Web Design, Brand Copywriting, Social Strategy",
      tagline: "Multi-Client Digital Solutions"
    },
    {
      id: "tripster-studio",
      name: "Tripster Studio",
      sector: "Lifestyle & Apparel",
      workType: "Promotional Brochure, Merchandise Mockups",
      tagline: "Contemporary Lifestyle Studio"
    },
    {
      id: "warrior-deck",
      name: "Warrior Deck",
      sector: "Athleisure & Fitness Wear",
      workType: "Short-Form Video Editing, Dynamic Reels",
      tagline: "High-Movement Activewear"
    },
    {
      id: "maac",
      name: "MAAC Institute",
      sector: "Visual Effects & 3D Animation",
      workType: "Promotional Video, Motion Graphics",
      tagline: "Creative Media & Animation Training"
    },
    {
      id: "choose-to-thinq",
      name: "Choose To Thinq",
      sector: "Organizational Culture & Learning",
      workType: "Thought Leadership Carousels, Editorial Infographics",
      tagline: "Workplace Adaptability & Insights"
    },
    {
      id: "athletots",
      name: "Athletots",
      sector: "Toddler Sports & Movement",
      workType: "Brand Identity, Logo Suite, Corporate Stationery",
      tagline: "Early Childhood Physical Development"
    },
    {
      id: "cri-space",
      name: "Cri Space",
      sector: "Creative Coworking & Community",
      workType: "Brand Mark, Monogram Design, Collateral",
      tagline: "Collaborative Maker Environment"
    },
    {
      id: "little-champ",
      name: "Little Champ!",
      sector: "Youth Athletic Academy",
      workType: "Logo Mark, Emblem Design",
      tagline: "Grassroots Athletics Coaching"
    },
    {
      id: "core-project",
      name: "Core Project",
      sector: "Engineering & Technology",
      workType: "Identity Mark, Business Collateral",
      tagline: "Global Technical Infrastructure"
    },
    {
      id: "healthbloom",
      name: "HealthBloom",
      sector: "Healthcare & Aesthetic Wellness",
      workType: "Visual Identity, Stationery System",
      tagline: "Integrative Wellness Practice"
    },
    {
      id: "svpcet-hvpm",
      name: "SVPCET & HVPM",
      sector: "Higher Education & Cultural Institutions",
      workType: "Admissions Creative, Festival Announcements",
      tagline: "Academic & Campus Community"
    }
  ],

  projects: [
    {
      id: "neil-momo",
      title: "Neil & Momo Organic Skincare",
      client: "Neil & Momo",
      role: "Social Media Manager & Visual Designer",
      category: "Packaging Design, E-Commerce UI, Social Media",
      timeline: "Sep 2024 to Present",
      introduction: "Neil & Momo is an organic artisan skincare brand focused on cold-processed botanical soaps and pure botanical formulations. I manage their digital presence while designing physical product packaging and Figma e-commerce interfaces, ensuring complete consistency from retail shelf to social feed.",
      whatIWorkedOn: [
        "Four bespoke packaging wraps for cold-processed artisan soap bars",
        "Harmonized color palettes and botanical geometric line motifs",
        "Responsive Figma e-commerce product showcase boards",
        "Monthly social media content calendars and static feed graphics",
        "Community communication and customer relationship management"
      ],
      whatWasDone: "I developed modular packaging wrappers that pair natural paperboard texture with ingredient-specific tones: rose pink and warm cocoa for Persian Rose, golden honey and warm turmeric for Honey Multani Mitti, deep aquamarine and sea mud for Rhassoul Clay Ocean, and ink slate with mint foliage for Charcoal Tea Tree Oil. I then built the digital presentation in Figma so customers see the exact physical product aesthetics reflected across web and social channels.",
      outcome: "Delivered a cohesive visual identity across physical packaging, web product showcases, and daily social media channels.",
      gallery: [
        {
          url: "/assets/projects/neil-momo-01.webp",
          caption: "Persian Rose Botanical Soap Packaging Wrap"
        },
        {
          url: "/assets/projects/neil-momo-02.webp",
          caption: "Honey Multani Mitti Cold-Processed Soap Packaging"
        },
        {
          url: "/assets/projects/neil-momo-03.webp",
          caption: "Rhassoul Clay Ocean Soap & Figma Product Board"
        },
        {
          url: "/assets/projects/neil-momo-04.webp",
          caption: "Charcoal Tea Tree Oil Purifying Soap Packaging"
        }
      ],
      tools: ["Figma", "Adobe Photoshop", "Adobe Illustrator"]
    },
    {
      id: "tripster-studio",
      title: "Tripster Studio Merchandise & Lookbook",
      client: "Tripster Studio",
      role: "Graphic & Merchandise Designer",
      category: "Merchandise Design, Print Collateral",
      timeline: "2024",
      introduction: "Tripster Studio is a contemporary lifestyle brand requiring a vibrant promotional brochure, apparel mockups, and merchandise visual assets. I translated their youth-oriented aesthetic into market-ready physical goods and print material.",
      whatIWorkedOn: [
        "Promotional print brochure layout and cover typography",
        "Apparel mockups for branded cotton t-shirts",
        "Embroidered baseball caps and drinkware merchandise applications",
        "High-contrast color styling pairing magenta and yellow accents"
      ],
      whatWasDone: "I established a unified lookbook combining crisp photography with bold geometric typographic accents. The catalog demonstrates the brand identity across diverse physical substrates, from soft cotton garments to matte-coated insulated drinkware flasks and stitched headwear.",
      outcome: "Produced a market-ready merchandise lookbook utilized for retail presentations and promotional launches.",
      gallery: [
        {
          url: "/assets/projects/tripster-01.webp",
          caption: "Merchandise Lookbook, Apparel, Caps, Drinkware & Print Brochure"
        }
      ],
      tools: ["Adobe Photoshop", "Adobe Illustrator"]
    },
    {
      id: "campaign-posts",
      title: "Strategic Communication & Thought Leadership",
      client: "Choose To Thinq & Regional Institutions",
      role: "Content Conceptualizer & Graphic Designer",
      category: "Editorial Carousels, Social Campaigns",
      timeline: "2023 to 2024",
      introduction: "I create strategic social campaigns that turn abstract organizational ideas and institutional milestones into clear, engaging visual pieces for leadership networks and academic communities.",
      whatIWorkedOn: [
        "Thought leadership carousels on organizational resilience and adaptable teams",
        "Academic admissions creative for Distance MBA programs",
        "Cultural posters for Women's Day and festive campus events",
        "Infographics balancing dense information with mobile readability"
      ],
      whatWasDone: "For Choose To Thinq, I translated organizational agility concepts into structured carousel slides with strong editorial headlines and scannable visual anchors. For educational institutions, I created focused single-image announcements that communicate deadlines and opportunities clearly.",
      outcome: "Maintained active engagement across corporate and educational social feeds with clear typographic messaging.",
      gallery: [
        {
          url: "/assets/projects/campaign-posts-01.webp",
          caption: "Choose To Thinq Organizational Agility & Cultural Creatives"
        },
        {
          url: "/assets/projects/campaign-posts-02.webp",
          caption: "Institutional Admissions & Cultural Event Announcements"
        }
      ],
      tools: ["Adobe Illustrator", "Adobe Photoshop", "Figma"]
    },
    {
      id: "brand-identity",
      title: "Visual Identity & Mark Archive",
      client: "Athletots, Cri Space, Little Champ!, Core Project, HealthBloom",
      role: "Brand Identity & Graphic Designer",
      category: "Logo Design, Stationery Systems",
      timeline: "2023 to 2024",
      introduction: "A curated collection of visual marks and stationery systems created for emerging ventures across early childhood sports, creative coworking spaces, athletic academies, technology, and primary healthcare.",
      whatIWorkedOn: [
        "Athletots: Playful shield mark and rounded business card layout",
        "Cri Space: Fluid monogram for a creative maker community",
        "Little Champ!: Multi-ring athletic silhouette emblem",
        "Core Project: Global meridian tech identity mark",
        "HealthBloom: Organic petal cross logo for wellness practice"
      ],
      whatWasDone: "Each mark was built from scratch in Adobe Illustrator, prioritizing scalable vector geometry that functions equally well at small favicon sizes, on physical visiting cards, or across large event banners. I developed paired color guides and typography standards for each client.",
      outcome: "Delivered distinct vector identities and production-ready business cards for five emerging organizations.",
      gallery: [
        {
          url: "/assets/projects/brand-identity-01.webp",
          caption: "Curated Brand Marks, Monograms & Business Stationery Suite"
        }
      ],
      tools: ["Adobe Illustrator", "Adobe Photoshop"]
    }
  ],

  capabilities: [
    {
      id: "content-angle",
      number: "01",
      title: "Finding the Content Angle",
      thesis: "Uncovering the stories worth sharing.",
      description: "Taking a brand, product or brief and figuring out the stories, conversations and ideas that are actually worth putting out there, rather than posting for the sake of activity.",
      points: [
        "Analyzing target audience interests and habits",
        "Extracting distinct brand perspective from raw founder ideas",
        "Differentiating between topical trends and long-term brand equity"
      ]
    },
    {
      id: "actionable-plan",
      number: "02",
      title: "Building an Actionable Content Plan",
      thesis: "Transforming raw narrative into structured feeds.",
      description: "Transforming broad goals into content pillars, formats, platform plans and calendars, so the feed has a clear direction rather than becoming a random collection of posts.",
      points: [
        "Establishing consistent weekly content pillars",
        "Structuring static, carousel, and reel ratios",
        "Building organized monthly publishing calendars"
      ]
    },
    {
      id: "creative-execution",
      number: "03",
      title: "Navigating Creative Execution",
      thesis: "Guiding ideas from brief to finished asset.",
      description: "Working through the entire process: briefs, concepts, copy, scripts, creative direction, graphic production and publishing while keeping the original strategy intact.",
      points: [
        "Writing sharp headlines and persuasive captions",
        "Designing polished graphics in Illustrator and Photoshop",
        "Editing rhythmic short-form video in After Effects"
      ]
    },
    {
      id: "complex-to-clear",
      number: "04",
      title: "Transforming Complex Ideas into Clear Content",
      thesis: "Making technical subjects readable and engaging.",
      description: "Converting technical, niche or information-heavy subjects into content that is clear, interesting and completely true to the subject.",
      points: [
        "Breaking down organizational models into multi-slide carousels",
        "Creating informative packaging copy and ingredient highlights",
        "Designing intuitive web layouts and structured cards"
      ]
    },
    {
      id: "iterative-direction",
      number: "05",
      title: "Knowing When to Change Course",
      thesis: "Reviewing what works and refining the approach.",
      description: "Looking at what the content is doing, understanding why something resonated (or did not), and using those observations to shape what comes next.",
      points: [
        "Tracking community comments and direct feedback",
        "Refining visual formats that drive genuine engagement",
        "Iterating creative hooks based on viewer retention"
      ]
    }
  ],

  tools: [
    {
      name: "Adobe Illustrator",
      shortName: "Illustrator",
      code: "Ai",
      discipline: "Vector & Packaging Systems",
      application: "Logo design, vector illustrations, packaging die-lines, and scalable brand marks.",
      description: "Primary environment for crafting pristine vectors, custom brand typography, and packaging geometry."
    },
    {
      name: "Adobe After Effects",
      shortName: "After Effects",
      code: "Ae",
      discipline: "Motion & Short-Form Video",
      application: "Motion graphics, kinetic cuts, reel timing, and promotional animations.",
      description: "Applied for dynamic typography animations, kinetic promotional edits, and rhythmic video cuts."
    },
    {
      name: "Adobe Photoshop",
      shortName: "Photoshop",
      code: "Ps",
      discipline: "Image & Creative Production",
      application: "Photo retouching, creative composites, social media banners, and realistic mockups.",
      description: "Essential for lighting correction, photo compositing, and raster banner production."
    },
    {
      name: "Figma",
      shortName: "Figma",
      code: "Figma",
      discipline: "Interface & Product Layouts",
      application: "Web design, design systems, UI wireframes, client presentation boards, and interactive mockups.",
      description: "Collaborative canvas for responsive web page layouts, component libraries, and packaging presentations."
    },
    {
      name: "WordPress",
      shortName: "WordPress",
      code: "Wp",
      discipline: "Web & CMS Management",
      application: "Content management, page building, website maintenance, and digital publishing.",
      description: "Deployed for client web setups, ongoing blog publishing, layout updates, and maintenance."
    }
  ],

  services: [
    {
      category: "SINGLES",
      title: "Project-Based Services",
      subtitle: "Singles",
      description: "Focused creative solutions built around a specific scope or launch date without ongoing monthly commitments.",
      groups: [
        {
          name: "Brand & Visual Identity",
          description: "Distinct marks, vector assets, and typography systems.",
          items: ["Brand Identity & Logo Suite", "Brand Guidelines & Color Palette", "Business Stationery & Cards", "Brand Collateral & Assets"]
        },
        {
          name: "Packaging & Merchandise",
          description: "Physical product packaging and apparel merchandise.",
          items: ["Soap & Cosmetic Packaging Wraps", "Label Die-Lines & Layouts", "Apparel & Merchandise Mockups", "Print Brochures & Lookbooks"]
        },
        {
          name: "Web & Digital Presence",
          description: "Clear interfaces and managed publishing platforms.",
          items: ["Figma Web UI Prototyping", "WordPress Website Setup", "Landing Page Layouts", "Asset Maintenance & Handover"]
        },
        {
          name: "Video & Single Campaigns",
          description: "High-retention short-form edits and campaign creatives.",
          items: ["Short-Form Reel Editing", "Promotional Motion Clips", "Thought Leadership Carousels", "Event & Admissions Creative"]
        }
      ],
      suitableFor: "Brands launching a new product, rebranding, or needing high-impact campaign assets on a defined timeline."
    },
    {
      category: "RETAINERS",
      title: "Ongoing Creative Support",
      subtitle: "Retainers",
      description: "Structured creative support for brands that need clear ideas, disciplined execution, and a reliable monthly workflow.",
      groups: [
        {
          name: "Social Media Retainer",
          description: "End-to-end planning and creation for monthly feeds.",
          items: [
            "Monthly Content Strategy & Calendar",
            "Weekly Static & Carousel Post Creation",
            "Reel Concepts, Scripts & Video Editing",
            "Captions, Copywriting & Hashtag Planning",
            "Direct Message & Community Support",
            "Monthly Performance Review & Optimization"
          ]
        },
        {
          name: "Content Creation Retainer",
          description: "Dedicated asset creation across social, web, and digital touchpoints.",
          items: [
            "Cross-Platform Graphic Collateral",
            "Short-Form Video Production & Edits",
            "Website Banner Updates & Visuals",
            "Blog & Editorial Article Content",
            "Emailer Visuals & Promotional Layouts"
          ]
        },
        {
          name: "Creative Partner Retainer",
          description: "Strategic creative guidance and agile execution for growing ventures.",
          items: [
            "Brand & Communication Strategy",
            "Campaign Conceptualization",
            "Feed Art Direction & Design Systems",
            "Weekly Creative Reviews & Iteration"
          ]
        }
      ],
      suitableFor: "Growing consumer brands, lifestyle ventures, and service businesses requiring disciplined monthly execution."
    },
    {
      category: "CUSTOM",
      title: "Custom Scope",
      subtitle: "Tailored Engagements",
      description: "Every brand has different requirements. If you do not see exactly what you need, let us build a scope around it.",
      groups: [
        {
          name: "Flexible Scopes",
          description: "Combining web management, packaging, video, and social execution.",
          items: [
            "Hybrid Web Design + Ongoing Social Media",
            "Podcast Audio/Video Post-Production",
            "Multi-Client Agency Production Support",
            "Specialized Campaign Art Direction"
          ]
        }
      ],
      suitableFor: "Agencies, creative studios, and founders needing a versatile cross-functional creative partner."
    }
  ],

  experience: [
    {
      company: "Neil & Momo",
      role: "Social Media Manager",
      period: "Dec 2024 to Present (Full-Time) | Sep 2024 to Nov 2024 (Intern)",
      type: "Full-Time",
      location: "Pune District, Maharashtra, India",
      summary: "Directing end-to-end social media management, physical packaging design, and e-commerce UI for an artisan organic skincare brand.",
      responsibilities: [
        "Planning monthly content calendars and creating weekly static and carousel creatives",
        "Designing sustainable packaging wrappers for cold-processed artisan soap bars",
        "Building Figma e-commerce product showcase layouts and website visual assets",
        "Handling customer communication, community interaction, and direct message support",
        "Writing informative product copy highlighting botanical ingredients and benefits"
      ]
    },
    {
      company: "Dnnovate Technologies",
      role: "Social Media Manager, Web & Graphic Designer",
      period: "2024",
      type: "Client Engagements",
      location: "Maharashtra, India",
      summary: "Supported multiple client verticals with web design, WordPress maintenance, social media roadmaps, and marketing copy.",
      responsibilities: [
        "Designing and maintaining WordPress websites and landing pages for regional businesses",
        "Structuring weekly social media roadmaps and producing branded graphics",
        "Writing website copy, service overviews, and client communication materials",
        "Ensuring visual consistency across diverse service-based client verticals"
      ]
    }
  ],

  education: [
    {
      institution: "St. Vincent Pallotti College of Engineering & Technology",
      degree: "Bachelor of Technology (B.Tech)",
      discipline: "Information Technology",
      period: "2021 to 2024",
      score: "GPA: 7.31 / 10"
    },
    {
      institution: "Nagpur Institute of Technology",
      degree: "Diploma",
      discipline: "Computer Engineering / Software Engineering",
      period: "2019 to 2021",
      score: "Grade: 88.29%"
    }
  ],

  contact: {
    heading: "Let us create work that resonates.",
    subheading: "Available for select freelance collaborations, monthly creative retainers, and forward-thinking full-time opportunities.",
    email: "anagha.mhaiskar@gmail.com",
    phonePlaceholder: "+91 ••••• ••••• (Available on verified request)",
    locationNotice: "Based in Pune & Nagpur, Maharashtra, India · Working globally",
    socialLinks: [
      {
        platform: "LinkedIn",
        handle: "linkedin.com/in/anagha-mhaiskar",
        url: "https://www.linkedin.com/in/anagha-mhaiskar"
      },
      {
        platform: "Instagram",
        handle: "@anagha.creates",
        url: "https://instagram.com"
      },
      {
        platform: "Showreel",
        handle: "Anagha Showreel 2024",
        url: "#reels"
      }
    ]
  }
};
