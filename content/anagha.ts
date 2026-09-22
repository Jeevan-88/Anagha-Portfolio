export interface BrandItem {
  id: string;
  name: string;
  mark: string;
  role: string;
  url: string;
  description: string;
}

export interface CaseStudy {
  id: string;
  title: string;
  client: string;
  role: string;
  period: string;
  scope: string[];
  description: string;
  secondaryDescription?: string;
  primaryUrl: string;
  urlLabel: string;
  reels?: {
    id: string;
    title: string;
    url: string;
    thumbnail: string;
    caption: string;
  }[];
  subsections?: {
    title: string;
    role: string;
    description: string;
    url: string;
  }[];
  deliverables: string[];
  visualAssets: {
    src: string;
    alt: string;
    caption: string;
  }[];
}

export interface SocialReel {
  id: string;
  index: string;
  client: string;
  category: string;
  title: string;
  subtitle: string;
  thumbnail: string;
  video: string;
  url: string;
}

export interface StrategyItem {
  id: string;
  title: string;
  subtitle: string;
  client: string;
  quote: string;
  points: string[];
  examples: {
    id: string;
    title: string;
    url: string;
    thumbnail: string;
  }[];
}

export interface VideoProject {
  id: string;
  title: string;
  client: string;
  format: string;
  context: string;
  url: string;
  thumbnail: string;
  video?: string;
  isShort?: boolean;
}

export interface ServiceTier {
  category: string;
  title: string;
  subtitle: string;
  description: string;
  deliverables: string[];
  fit: string;
}

export interface AnaghaContent {
  meta: {
    name: string;
    title: string;
    location: string;
    tagline: string;
    status: string;
    experienceYears: string;
  };
  hero: {
    heading: string;
    role: string;
    statement: string;
    portrait: string;
  };
  about: {
    currentRoleQuote: string;
    extendedBio: string;
    portrait: string;
    disciplines: string[];
    values: {
      title: string;
      description: string;
    }[];
  };
  brands: BrandItem[];
  caseStudies: CaseStudy[];
  reels: SocialReel[];
  contentStrategy: StrategyItem[];
  videoEditing: VideoProject[];
  webDesign: {
    title: string;
    client: string;
    role: string;
    url: string;
    videoSrc: string;
    description: string;
    sectionsShown: string[];
  };
  capabilities: {
    number: string;
    title: string;
    description: string;
    outcome: string;
  }[];
  tools: {
    name: string;
    category: string;
    role: string;
    icon: string;
  }[];
  services: ServiceTier[];
  experience: {
    period: string;
    role: string;
    company: string;
    location: string;
    isCurrent: boolean;
    responsibilities: string[];
  }[];
  education: {
    degree: string;
    institution: string;
    period: string;
    field: string;
    focus: string;
  }[];
  contact: {
    statement: string;
    email: string;
    linkedin: string;
    instagram: string;
    availability: string;
  };
}

export const anaghaContent: AnaghaContent = {
  meta: {
    name: "Anagha Mhaiskar",
    title: "Social Media Manager & Creative Strategist",
    location: "Pune, India",
    tagline: "Social Media Management, Content Strategy, and Video Creation",
    status: "Available for select retainers and creative collaborations",
    experienceYears: "3+ Years",
  },

  hero: {
    heading: "ANAGHA MHAISKAR",
    role: "SOCIAL MEDIA MANAGER / CREATIVE STRATEGIST",
    statement: "I build social media strategies, direct content, and edit short and long form video for architecture firms, consumer brands, and creators.",
    portrait: "/assets/anagha/anagha1.jpg",
  },

  about: {
    currentRoleQuote: "For ANA Architects, I build content strategies that bring the firm's work, people and architectural perspective to life. I focus on employee-centred content while also presenting their portfolio, projects and culture in a way that feels relevant and engaging. From content ideation and planning to execution, I shape their social presence to communicate the firm beyond just its projects.",
    extendedBio: "Across every brand I work with, my goal is to bridge strategy with hands-on creative execution. Whether that means structuring hour-long podcast conversations into crisp 60-second Reels, designing responsive e-commerce web experiences, or planning monthly production calendars, I ensure the content is grounded, authentic, and purposeful.",
    portrait: "/assets/anagha/anagha2.jpg",
    disciplines: [
      "Social Media Management",
      "Content Strategy & Calendars",
      "Short & Long Form Video Editing",
      "Website Design & Development",
      "Podcast Coordination & YouTube Flow",
      "Packaging & Visual Identity",
    ],
    values: [
      {
        title: "Content with Intent",
        description: "Every piece of content must have a clear reason to exist, answering audience curiosity rather than filling calendar slots.",
      },
      {
        title: "Platform-Specific Curation",
        description: "Tailoring framing, pacing, and hooks to how audiences actually consume content on Instagram, YouTube, and the web.",
      },
      {
        title: "End-to-End Ownership",
        description: "From concept and script direction to shoot production, editing, publishing, and community engagement.",
      },
    ],
  },

  brands: [
    {
      id: "ana-architects",
      name: "ANA Architects",
      mark: "ANA",
      role: "Social Media Management + Content Strategy",
      url: "https://www.instagram.com/teamanapune?stkn=MWdhOWN2eHJ2emlhcg==",
      description: "Architecture & Design Practice: Employee-centred content, project perspective, and social presence.",
    },
    {
      id: "neil-momo",
      name: "Neil & Momo",
      mark: "N&M",
      role: "Social Media Management + Strategy + Website + Campaigns",
      url: "https://www.instagram.com/neilandmomo?stkn=MXgxaG8yMWZ4bTl6Mw==",
      description: "Botanical Skincare: Content strategy, shoot production, e-commerce web design, and workshop campaigns.",
    },
    {
      id: "nemo-essentials",
      name: "NeMo Essentials",
      mark: "NEMO",
      role: "Social Media / Content Work",
      url: "https://www.instagram.com/nemo.essentials?stkn=MXNteXJram96a21xeA==",
      description: "Wellness & Daily Rituals: Product storytelling, content calendars, and social asset curation.",
    },
    {
      id: "root-cause-podcast",
      name: "Root Cause Podcast",
      mark: "RCP",
      role: "Podcast Coordination + YouTube Management + Content Repurposing",
      url: "https://www.instagram.com/root.cause.podcast?stkn=MXU4dGZndzY3ODY4bw==",
      description: "Health & Integrative Medicine: Repurposing long-form episodes into high-retention short clips.",
    },
    {
      id: "neil-momo-youtube",
      name: "Neil & Momo YouTube",
      mark: "YT",
      role: "YouTube Management + Long Form Curation",
      url: "https://youtube.com/@neilandmomo?si=wWNbK3ed3mw0-dfy",
      description: "Video Ecosystem: Content management, thumbnail direction, and episode publishing.",
    },
    {
      id: "dravyas",
      name: "Dravyas",
      mark: "DRV",
      role: "Social Media / Content Management",
      url: "https://www.instagram.com/dravyas.in?stkn=cDY5cmdwMmQxOXF2",
      description: "Ayurvedic & Natural Wellness: Social presence, brand education, and formulation storytelling.",
    },
    {
      id: "neil-momo-web",
      name: "Neil & Momo Website",
      mark: "WEB",
      role: "Website Design & Development",
      url: "https://www.neilandmomo.com/",
      description: "E-Commerce Experience: Responsive store architecture, skin-type navigation, and ingredient storytelling.",
    },
  ],

  caseStudies: [
    {
      id: "ana-architects",
      title: "ANA Architects",
      client: "ANA Architects, Pune",
      role: "Social Media Management & Content Strategy",
      period: "2024 · Current Role",
      scope: [
        "Content strategy",
        "Employee-centred content",
        "Architecture and project communication",
        "Content ideation",
        "Planning & scheduling",
        "Execution & reel curation",
        "Social presence",
      ],
      description: "For ANA Architects, I build content strategies that bring the firm's work, people and architectural perspective to life. I focus on employee-centred content while also presenting their portfolio, projects and culture in a way that feels relevant and engaging. From content ideation and planning to execution, I shape their social presence to communicate the firm beyond just its projects.",
      secondaryDescription: "For ANA Architects, these reels were created from their annual function, where I captured the event and identified the strongest moments from the speeches. I then curated these into crisp short-form reels, focusing on the most engaging points and key takeaways. The reels performed well in terms of engagement and helped the content reach a wider audience.",
      primaryUrl: "https://www.instagram.com/teamanapune?stkn=MWdhOWN2eHJ2emlhcg==",
      urlLabel: "Visit ANA Instagram Profile",
      reels: [
        {
          id: "ana-reel-1",
          title: "Annual Function: Keynote Highlights",
          url: "https://www.instagram.com/reel/DaVKQIkR0aL/?stkn=MWZoeWxoNm52cTczcw==",
          thumbnail: "/assets/projects/ana_reel_1.jpg",
          caption: "Event capture and speech curation highlighting cultural milestones and vision.",
        },
        {
          id: "ana-reel-2",
          title: "Team Perspective & Studio Culture",
          url: "https://www.instagram.com/reel/DartbBVM6kW/?stkn=OGM3bjdpdjlwZ2h2",
          thumbnail: "/assets/projects/ana_reel_2.jpg",
          caption: "Employee-centred storytelling focusing on the architects behind the structures.",
        },
      ],
      deliverables: [
        "Monthly editorial calendars balancing culture and completed projects",
        "Event video capture, speech curation, and short-form editing",
        "Visual aesthetic refinement aligned with contemporary architectural values",
      ],
      visualAssets: [
        {
          src: "/assets/projects/ana_reel_1.jpg",
          alt: "ANA Architects Reel 01",
          caption: "Annual function speech curation reel",
        },
        {
          src: "/assets/projects/ana_reel_2.jpg",
          alt: "ANA Architects Reel 02",
          caption: "Team culture and employee-centred storytelling",
        },
      ],
    },
    {
      id: "neil-momo-ecosystem",
      title: "Neil & Momo Ecosystem",
      client: "Neil & Momo, NeMo Essentials, Root Cause",
      role: "Social Media Manager & Strategist",
      period: "2023 · 2024",
      scope: [
        "Three distinct brand IPs",
        "Content strategy & monthly calendars",
        "Photoshoots & video production",
        "Multi-channel publishing (IG, FB, YT)",
        "Podcast coordination & YouTube flow",
        "Website design & development (neilandmomo.com)",
        "End-to-end workshop campaign management",
      ],
      description: "As a Social Media Manager & Strategist for Neil & Momo, I worked across three key IPs, Neil & Momo, Neil & Momo Essentials and Root Cause Podcast. I built content strategies and calendars, planned content, handled shoots, and managed scheduling and publishing across Instagram, Facebook and YouTube. For Root Cause, I worked as the Podcast Coordinator and YouTube Manager, managing the content flow from long-form podcast episodes to highlights and short-form Reels, identifying key conversations and adapting them for each platform. I also designed and developed the Neil & Momo website and managed workshop campaigns end-to-end, from lead generation and follow-ups to registrations and communication.",
      primaryUrl: "https://www.neilandmomo.com/",
      urlLabel: "Explore Neil & Momo Website",
      subsections: [
        {
          title: "Neil & Momo Skincare",
          role: "Social Media Management, Packaging & Strategy",
          description: "Curated content around audience curiosities, planned photoshoots, designed packaging graphics, and published across Instagram and Facebook.",
          url: "https://www.instagram.com/neilandmomo?stkn=MXgxaG8yMWZ4bTl6Mw==",
        },
        {
          title: "NeMo Essentials",
          role: "Social Media / Content Work",
          description: "Structured content calendars and visual assets focused on daily skincare essentials, product benefits, and ingredient honesty.",
          url: "https://www.instagram.com/nemo.essentials?stkn=MXNteXJram96a21xeA==",
        },
        {
          title: "Root Cause Podcast",
          role: "Podcast Coordinator & YouTube Manager",
          description: "Managed content flow from full-length podcast recordings to YouTube episodes and short-form Reels, capturing the strongest discussions under 60 seconds.",
          url: "https://www.instagram.com/root.cause.podcast?stkn=MXU4dGZndzY3ODY4bw==",
        },
      ],
      deliverables: [
        "Complete responsive e-commerce website designed and developed",
        "100+ short-form Reels and video assets planned, shot, and edited",
        "End-to-end workshop marketing campaigns with lead capture and attendee communications",
      ],
      visualAssets: [
        {
          src: "/assets/projects/neil-momo-01.webp",
          alt: "Neil & Momo Persian Rose Packaging",
          caption: "Botanical soap wrap packaging and visual identity",
        },
        {
          src: "/assets/projects/neil-momo-02.webp",
          alt: "Honey Multani Mitti Packaging",
          caption: "Natural formulation identity and packaging design",
        },
        {
          src: "/assets/projects/walkthrough_frame_1.jpg",
          alt: "Neil & Momo Website Walkthrough",
          caption: "E-commerce storefront homepage and navigation",
        },
        {
          src: "/assets/projects/walkthrough_frame_20.jpg",
          alt: "Neil & Momo Product Catalog",
          caption: "Product categories and skin-type pathways",
        },
      ],
    },
  ],

  reels: [
    {
      id: "ana-reel-01",
      index: "01 / 12",
      client: "ANA ARCHITECTS",
      category: "ANNUAL FUNCTION",
      title: "Keynote & Speech Highlights",
      subtitle: "Curating Milestone Moments & Vision",
      thumbnail: "/assets/projects/ana_reel_1.jpg",
      video: "/assets/projects/ana_reel_01.mp4",
      url: "https://www.instagram.com/reel/DaVKQIkR0aL/?stkn=MWZoeWxoNm52cTczcw==",
    },
    {
      id: "ana-reel-02",
      index: "02 / 12",
      client: "ANA ARCHITECTS",
      category: "STUDIO CULTURE",
      title: "Team Perspective & Studio Culture",
      subtitle: "Employee-Centred Architectural Storytelling",
      thumbnail: "/assets/projects/ana_reel_2.jpg",
      video: "/assets/projects/ana_reel_02.mp4",
      url: "https://www.instagram.com/reel/DartbBVM6kW/?stkn=OGM3bjdpdjlwZ2h2",
    },
    {
      id: "neil-momo-reel-01",
      index: "03 / 12",
      client: "NEIL & MOMO",
      category: "SKINCARE FORMULATION",
      title: "Botanical Formulations & Process",
      subtitle: "Cold-Process Artisanal Skincare Story",
      thumbnail: "/assets/projects/nm_strat_1.jpg",
      video: "/assets/projects/neil_momo_reel_01.mp4",
      url: "https://www.instagram.com/reel/DaXvmAgNZ_d/?stkn=MXhpMTlnd3A0a2NvOQ==",
    },
    {
      id: "neil-momo-reel-02",
      index: "04 / 12",
      client: "NEIL & MOMO",
      category: "AUDIENCE CURIOSITIES",
      title: "Addressing Skin Doubts with Swapnil",
      subtitle: "Educational Q&A Short-Form Series",
      thumbnail: "/assets/projects/nm_strat_2.jpg",
      video: "/assets/projects/neil_momo_reel_02.mp4",
      url: "https://www.instagram.com/reel/DHI9Ax1NNDZ/?stkn=cHM2ODUwNHVneGp3",
    },
    {
      id: "root-cause-reel-01",
      index: "05 / 12",
      client: "ROOT CAUSE PODCAST",
      category: "PODCAST REPURPOSING",
      title: "Root Factors & Integrative Health",
      subtitle: "High-Retention Clip Under 60 Seconds",
      thumbnail: "/assets/projects/rc_reel_1.jpg",
      video: "/assets/projects/root_cause_reel_01.mp4",
      url: "https://www.instagram.com/reel/DbnkDyuIRg9/?stkn=bmo3ZWkyM2M1cHE0OQ==",
    },
    {
      id: "root-cause-reel-02",
      index: "06 / 12",
      client: "ROOT CAUSE PODCAST",
      category: "PODCAST REPURPOSING",
      title: "First 3-Second Attention Hook",
      subtitle: "Distilling Hour-Long Insight into Crisp Reel",
      thumbnail: "/assets/projects/rc_reel_2.jpg",
      video: "/assets/projects/root_cause_reel_02.mp4",
      url: "https://www.instagram.com/reel/DU8J2Q2iNEm/?stkn=MXhiZmtwaW43eThubA==",
    },
    {
      id: "root-cause-reel-03",
      index: "07 / 12",
      client: "ROOT CAUSE PODCAST",
      category: "PODCAST REPURPOSING",
      title: "Episodic Health Takeaways",
      subtitle: "Audience Retention & Discussion Clip",
      thumbnail: "/assets/projects/rc_reel_3.jpg",
      video: "/assets/projects/root_cause_reel_03.mp4",
      url: "https://www.instagram.com/reel/DUx7xVIiFcy/?stkn=MTQ0MTlodGtzc21y",
    },
    {
      id: "reel-general-01",
      index: "08 / 12",
      client: "NEIL & MOMO",
      category: "SKINCARE RITUAL",
      title: "Botanical Formulations",
      subtitle: "Persian Rose & Honey Multani Mitti Ritual",
      thumbnail: "/assets/projects/reel_1.jpg",
      video: "/assets/projects/reel_general_01.mp4",
      url: "https://www.instagram.com/reel/DdTwWyDRV2w/?stkn=MTdtN3JiZTUwNWExZw==",
    },
    {
      id: "reel-general-02",
      index: "09 / 12",
      client: "ROOT CAUSE PODCAST",
      category: "PODCAST CLIP",
      title: "Health & Root Factors",
      subtitle: "Episodic Highlight: 3-Second Hook to Key Insight",
      thumbnail: "/assets/projects/reel_2.jpg",
      video: "/assets/projects/reel_general_02.mp4",
      url: "https://www.instagram.com/reel/DZhw25nN4hQ/?stkn=Z2xhbTMxMDdvcjQy",
    },
    {
      id: "reel-general-03",
      index: "10 / 12",
      client: "CREATIVE CAMPAIGN",
      category: "CRAFT & MOTION",
      title: "Campaign Visual Story",
      subtitle: "Dynamic Pacing & Visual Narrative",
      thumbnail: "/assets/projects/reel_3.jpg",
      video: "/assets/projects/reel_general_03.mp4",
      url: "https://www.instagram.com/reel/DcF2AixtitB/?stkn=ZmxzYXZma2Y3MGdo",
    },
    {
      id: "reel-general-04",
      index: "11 / 12",
      client: "NEIL & MOMO",
      category: "BRAND PERSPECTIVE",
      title: "Curated Question & Answer",
      subtitle: "Addressing Core Audience Curiosities",
      thumbnail: "/assets/projects/reel_4.jpg",
      video: "/assets/projects/reel_general_04.mp4",
      url: "https://www.instagram.com/reel/Dap3idQTkou/?stkn=",
    },
    {
      id: "reel-general-05",
      index: "12 / 12",
      client: "COMMUNITY & EVENT",
      category: "EVENT MOTION",
      title: "Movement & Moments",
      subtitle: "Short-Form Edit with Strong Engagement",
      thumbnail: "/assets/projects/reel_5.jpg",
      video: "/assets/projects/reel_general_05.mp4",
      url: "https://www.instagram.com/reel/C-kh-Soobid/?stkn=bW5lMTh0N3RlcjZm",
    },
  ],

  contentStrategy: [
    {
      id: "root-cause-strategy",
      title: "Podcast to Short-Form Repurposing",
      subtitle: "Transforming 60-minute conversations into <60s high-retention clips",
      client: "Root Cause Podcast",
      quote: "Sharing a few examples from Root Cause Podcast, where I have repurposed long-form podcast episodes into short-form Instagram content. The idea is to pick out the strongest points and conversations from the long episode and turn them into crisp, engaging clips that deliver the key takeaway in under 60 seconds. I also make sure the first 3 seconds have a strong hook to grab attention and encourage viewers to stay till the end.",
      points: [
        "First 3-second hook formulation to immediately halt the feed scroll",
        "Extracting one distinct, self-contained realization per short-form clip",
        "Dynamic pacing, typographic subtitle emphasis, and key takeaway delivery",
      ],
      examples: [
        {
          id: "rc-ex-1",
          title: "Conversational Insight 01",
          url: "https://www.instagram.com/reel/DbnkDyuIRg9/?stkn=bmo3ZWkyM2M1cHE0OQ==",
          thumbnail: "/assets/projects/rc_reel_1.jpg",
        },
        {
          id: "rc-ex-2",
          title: "Conversational Insight 02",
          url: "https://www.instagram.com/reel/DU8J2Q2iNEm/?stkn=MXhiZmtwaW43eThubA==",
          thumbnail: "/assets/projects/rc_reel_2.jpg",
        },
        {
          id: "rc-ex-3",
          title: "Conversational Insight 03",
          url: "https://www.instagram.com/reel/DUx7xVIiFcy/?stkn=MTQ0MTlodGtzc21y",
          thumbnail: "/assets/projects/rc_reel_3.jpg",
        },
      ],
    },
    {
      id: "neil-momo-strategy",
      title: "Curiosity-Driven Editorial Curation",
      subtitle: "Mapping genuine audience questions into scripted creative direction",
      client: "Neil & Momo",
      quote: "For Neil & Momo, I curated content around questions and topics the audience is genuinely curious about. I shared the key points and direction for each video, around which Swapnil created and finalized the full scripts. The final content was then developed from these inputs, keeping it engaging and aligned with the brand.",
      points: [
        "Audience query aggregation: identifying what customers genuinely ask about skincare",
        "Setting the creative direction and core informational points for each topic",
        "Collaborative script finalization with founder Swapnil before shoot production",
      ],
      examples: [
        {
          id: "nm-ex-1",
          title: "Curiosity Topic 01",
          url: "https://www.instagram.com/reel/DaXvmAgNZ_d/?stkn=MXhpMTlnd3A0a2NvOQ==",
          thumbnail: "/assets/projects/nm_strat_1.jpg",
        },
        {
          id: "nm-ex-2",
          title: "Curiosity Topic 02",
          url: "https://www.instagram.com/reel/DHI9Ax1NNDZ/?stkn=cHM2ODUwNHVneGp3",
          thumbnail: "/assets/projects/nm_strat_2.jpg",
        },
      ],
    },
    {
      id: "dravyas-strategy",
      title: "Natural Formulations & Ingredient Transparency",
      subtitle: "Educating through authentic visual stories",
      client: "Dravyas",
      quote: "For Dravyas, I handled social media and content management, creating an educational visual narrative that showcases natural wellness formulations, ingredient integrity, and honest daily rituals.",
      points: [
        "Clean, earthy visual aesthetic aligned with Ayurvedic principles",
        "Ingredient-focused educational carousels and reels",
        "Consistent brand messaging across organic channels",
      ],
      examples: [
        {
          id: "dravyas-page",
          title: "Dravyas Official Social Archive",
          url: "https://www.instagram.com/dravyas.in?stkn=cDY5cmdwMmQxOXF2",
          thumbnail: "/assets/projects/campaign-posts-01.webp",
        },
      ],
    },
  ],

  videoEditing: [
    {
      id: "muwci-main",
      title: "MUWCI: Student Campus Life & Global Diversity",
      client: "Mahindra United World College of India",
      format: "Long-Form YouTube Video",
      context: "An experiential edit highlighting campus life, student voices from over 60 countries, and experiential learning in the Western Ghats.",
      url: "https://youtu.be/ox9tHmJMVgk?si=QbKM9KpgDG_amUwu",
      thumbnail: "/assets/projects/muwci.jpg",
    },
    {
      id: "muwci-shorts",
      title: "MUWCI: Moments & Campus Energy",
      client: "Mahindra United World College of India",
      format: "YouTube Shorts / Micro-Story",
      context: "Quick-paced visual rhythm showcasing student community and campus traditions in a vertical short format.",
      url: "https://youtube.com/shorts/pb2blYD0-Fg?si=LyVN-ewP6TXshR35",
      thumbnail: "/assets/projects/muwci_shorts.jpg",
      isShort: true,
    },
    {
      id: "bharat-forge",
      title: "Bharat Forge CSR: Community & Sustainability",
      client: "Bharat Forge Limited",
      format: "Corporate Social Responsibility Documentary",
      context: "In-depth documentary showcasing village water harvesting initiatives, soil conservation, and rural community empowerment.",
      url: "https://youtu.be/TRaFX8nfcHI?si=k0h6lh8qHZtp58-V",
      thumbnail: "/assets/projects/bharat_forge.jpg",
    },
    {
      id: "root-cause-compilation",
      title: "Root Cause Podcast: Season 1 Complete Compilation",
      client: "Root Cause Podcast",
      format: "Full Season Compilation Edit",
      context: "Comprehensive long-form compilation curating the most impactful dialogues on root-cause healing, nutrition, and wellness.",
      url: "https://youtu.be/0u2vR_mI4Fo?si=bR0N7bdFCN4JvMz0",
      thumbnail: "/assets/projects/root_cause_s1.jpg",
    },
  ],

  webDesign: {
    title: "Neil & Momo Official E-Commerce Store",
    client: "Neil & Momo",
    role: "Website Design & Development",
    url: "https://www.neilandmomo.com/",
    videoSrc: "/assets/video/nmwebsite.mp4",
    description: "I designed and developed the official Neil & Momo website (neilandmomo.com), establishing an intuitive e-commerce architecture. The site features category-based product navigation, skin-type recommendation pathways, clean ingredient transparency, and seamless checkout.",
    sectionsShown: [
      "Brand Hero & Botanical Storytelling",
      "Skin-Type Navigation Pathway (Oily, Dry, Sensitive)",
      "Curated Shop Catalog & Product Detail Architecture",
      "Ingredient Purity & Formulation Highlights",
      "Mobile-Optimized Cart & Checkout Flow",
    ],
  },

  capabilities: [
    {
      number: "01",
      title: "Finding the Content Angle",
      description: "Looking at a project, brand, or speech to identify the single insight that will resonate most with the audience.",
      outcome: "High audience retention and relevance.",
    },
    {
      number: "02",
      title: "Building an Actionable Content Plan",
      description: "Developing consistent editorial calendars, shoot schedules, and platform-specific briefs that teams can actually execute.",
      outcome: "Reliable, stress-free publishing rhythms.",
    },
    {
      number: "03",
      title: "Navigating Creative Execution",
      description: "Directing shoots, curating footage, designing typography, and editing with precision across Premiere Pro, After Effects, and Figma.",
      outcome: "Polished visual standards across every asset.",
    },
    {
      number: "04",
      title: "Transforming Complex Ideas into Clear Content",
      description: "Distilling hour-long architectural philosophies or medical podcast discussions into crisp, engaging content pieces under 60 seconds.",
      outcome: "Complex concepts made accessible and shareable.",
    },
    {
      number: "05",
      title: "Knowing When to Change Course",
      description: "Reviewing audience reception honestly, measuring authentic engagement, and refining future content directions based on real feedback.",
      outcome: "Continuous improvement without vanity metrics.",
    },
  ],

  tools: [
    {
      name: "Adobe Premiere Pro",
      category: "Video Editing",
      role: "Long-form editing, pacing, sound synchronization, and colour correction.",
      icon: "/assets/tools/tool-ae.svg",
    },
    {
      name: "Adobe After Effects",
      category: "Motion Design",
      role: "Kinetic typography, animated titles, graphic overlays, and visual effects.",
      icon: "/assets/tools/tool-ae.svg",
    },
    {
      name: "Adobe Illustrator",
      category: "Vector Design",
      role: "Brand identities, vector marks, packaging wraps, and print layouts.",
      icon: "/assets/tools/tool-ai.svg",
    },
    {
      name: "Adobe Photoshop",
      category: "Image Direction",
      role: "High-end photo retouching, color grading, and promotional key visuals.",
      icon: "/assets/tools/tool-ps.svg",
    },
    {
      name: "Figma",
      category: "Interface Design",
      role: "Responsive website layouts, user journeys, and component systems.",
      icon: "/assets/tools/tool-figma.svg",
    },
    {
      name: "Meta Business Suite & WordPress",
      category: "Publishing & Web",
      role: "Content scheduling, analytics review, CMS management, and store operations.",
      icon: "/assets/tools/tool-wordpress.svg",
    },
  ],

  services: [
    {
      category: "Monthly Retainers",
      title: "Social Media & Content Direction",
      subtitle: "Dedicated monthly creative partnership",
      description: "Comprehensive management for brands seeking consistent, high-standard social presence and strategic growth.",
      deliverables: [
        "Monthly editorial strategy & content calendar planning",
        "Shoot coordination, creative direction & script briefs",
        "Short-form Reel editing & post graphic design",
        "Multi-platform scheduling, caption writing & publishing",
        "Monthly performance review and strategic iteration",
      ],
      fit: "Ideal for growing brands, architecture studios, and creators needing dependable, hands-on content leadership.",
    },
    {
      category: "Singles",
      title: "Project-Based Engagements",
      subtitle: "Focused individual deliverables",
      description: "Targeted creative solutions delivered as self-contained projects with clear scopes and milestones.",
      deliverables: [
        "Brand Identity & Visual Guidelines",
        "Packaging Design & Label Suites",
        "Responsive Website UI Design & Development",
        "High-Impact Short-Form Reel Batch Editing (5 to 10 Reels)",
        "Corporate or Event Video Production & Editing",
      ],
      fit: "Ideal for product launches, brand revamps, and standalone campaign requirements.",
    },
    {
      category: "Custom Scope",
      title: "Tailored Collaborations",
      subtitle: "Flexible multi-disciplinary scope",
      description: "Every brand has unique needs. If your requirements combine design, video, web, and marketing, we structure a custom scope.",
      deliverables: [
        "Podcast coordination and multi-channel content flow setup",
        "Hybrid brand identity plus launch website plus social campaign",
        "Consultation on content repurposing workflows and team setup",
      ],
      fit: "Ideal for unique organizations, multi-IP creators, and collaborative studio teams.",
    },
  ],

  experience: [
    {
      period: "2024 · Present",
      role: "Social Media Manager & Content Strategist",
      company: "ANA Architects",
      location: "Pune, India",
      isCurrent: true,
      responsibilities: [
        "Build content strategies bringing the firm's architectural perspective, projects, and people to life",
        "Direct employee-centred storytelling and studio culture documentation",
        "Capture key corporate events and curate speech moments into high-retention Reels",
        "Lead content planning, execution, and overall social presence across digital channels",
      ],
    },
    {
      period: "2023 · 2024",
      role: "Social Media Manager & Strategist",
      company: "Neil & Momo, NeMo Essentials, Root Cause Podcast",
      location: "Pune, India",
      isCurrent: false,
      responsibilities: [
        "Managed content strategies and monthly calendars across three distinct brand IPs",
        "Planned and directed production shoots, scheduling and publishing across IG, FB, and YouTube",
        "Served as Podcast Coordinator & YouTube Manager for Root Cause, repurposing long-form episodes into Reels",
        "Designed and developed the official Neil & Momo e-commerce website (neilandmomo.com)",
        "Managed workshop lead generation campaigns end-to-end through registration and communication",
      ],
    },
    {
      period: "2022 · 2023",
      role: "Brand & Content Designer",
      company: "Dnnovate Technologies",
      location: "Nagpur, India",
      isCurrent: false,
      responsibilities: [
        "Created brand identities, visual communication systems, and marketing assets",
        "Designed promotional campaign collateral and digital product presentation graphics",
        "Collaborated with cross-functional teams to align design execution with client goals",
      ],
    },
  ],

  education: [
    {
      degree: "Bachelor of Technology (B.Tech)",
      institution: "St. Vincent Pallotti College of Engineering & Technology (SVPCET)",
      period: "2019 · 2023",
      field: "Information Technology",
      focus: "Web technologies, systems architecture, human-computer interaction, and digital media.",
    },
    {
      degree: "Diploma in Engineering",
      institution: "Nagpur Institute of Technology (NIT)",
      period: "2016 · 2019",
      field: "Mechanical Engineering",
      focus: "Structural precision, geometric principles, and technical drafting.",
    },
  ],

  contact: {
    statement: "Whether you are looking for ongoing social media management, strategic content direction, or a dedicated project collaboration, let us talk.",
    email: "anagha.mhaiskar8@gmail.com",
    linkedin: "https://www.linkedin.com/in/anagha-mhaiskar",
    instagram: "https://www.instagram.com/teamanapune?stkn=MWdhOWN2eHJ2emlhcg==",
    availability: "Currently accepting select retainers and creative projects.",
  },
};
