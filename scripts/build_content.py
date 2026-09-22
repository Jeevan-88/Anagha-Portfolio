import os

code = """/**
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
  tools: stringTY;
}

export interface ServiceGroup {
  name: string;
  description: string;
  items: stringTY;
}

export interface ServiceTier {
  category: 'SINGLES' | 'RETAINERS' | 'CUSTOM';
  title: string;
  subtitle: string;
  description: string;
  groups: ServiceGroup[];
  suitableFor: string;
}

export interface CapabilityPillar{
  id: string;
  number: string;
  title: string;
  thesis: string;
  description: string;
  points: stringTY;
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
  responsibilities: stringTY;
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
      "DIGITAL COMMUNICATION"    ]
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
"""
code += """
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
        "Sigh-contrast color styling pairing magenta and yellow accents"
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
"""
