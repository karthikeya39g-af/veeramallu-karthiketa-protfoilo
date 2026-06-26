import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  User,
  Cpu,
  Layers,
  Award,
  FileText,
  Mail,
  Phone,
  MapPin,
  ExternalLink,
  Github,
  Linkedin,
  Search,
  MessageSquare,
  Download,
  CheckCircle,
  BookOpen,
  Activity,
  Volume2,
  Briefcase,
  Calendar,
  ChevronDown,
  ChevronUp,
  Brain,
  Terminal,
  Code2,
  TrendingUp,
  X,
  Share2,
  Check,
  Send,
  Sparkles,
  Play,
  GitBranch,
  Server,
  Database,
  ShieldCheck,
  Truck
} from 'lucide-react';

import { ParticleBackground } from './components/ParticleBackground';
import { ThreeDCard } from './components/ThreeDCard';
import { ProjectCarousel } from './components/ProjectCarousel';

// Themes configuration
interface ThemeColors {
  bgPrimary: string;
  bgSecondary: string;
  bgCard: string;
  bgAccentLight: string;
  borderColor: string;
  textPrimary: string;
  textSecondary: string;
  textMuted: string;
  accentPrimary: string;
  accentPrimaryHover: string;
  accentSecondary: string;
  accentGlow: string;
  gradientFrom: string;
  gradientTo: string;
  isLight: boolean;
}

interface Theme {
  id: string;
  name: string;
  icon: string;
  colors: ThemeColors;
}

const themes: Theme[] = [
  {
    id: 'cyber-sunset',
    name: 'Sunset Fire',
    icon: '🔥',
    colors: {
      bgPrimary: '#0d070a',
      bgSecondary: '#180d12',
      bgCard: 'rgba(28, 13, 20, 0.6)',
      bgAccentLight: 'rgba(239, 68, 68, 0.1)',
      borderColor: 'rgba(239, 68, 68, 0.15)',
      textPrimary: '#ffffff',
      textSecondary: '#fca5a5',
      textMuted: '#cbd5e1',
      accentPrimary: '#f43f5e',
      accentPrimaryHover: '#fb7185',
      accentSecondary: '#f97316',
      accentGlow: 'rgba(244, 63, 94, 0.2)',
      gradientFrom: '#f43f5e',
      gradientTo: '#f97316',
      isLight: false
    }
  },
  {
    id: 'neon-cyber',
    name: 'Neon Cyber',
    icon: '⚡',
    colors: {
      bgPrimary: '#050505',
      bgSecondary: '#0d0d12',
      bgCard: 'rgba(20, 20, 30, 0.6)',
      bgAccentLight: 'rgba(236, 72, 153, 0.1)',
      borderColor: 'rgba(236, 72, 153, 0.15)',
      textPrimary: '#ffffff',
      textSecondary: '#f472b6',
      textMuted: '#cbd5e1',
      accentPrimary: '#ec4899',
      accentPrimaryHover: '#f472b6',
      accentSecondary: '#06b6d4',
      accentGlow: 'rgba(236, 72, 153, 0.25)',
      gradientFrom: '#ec4899',
      gradientTo: '#06b6d4',
      isLight: false
    }
  },
  {
    id: 'aurora-lime',
    name: 'Aurora Mint',
    icon: '🍃',
    colors: {
      bgPrimary: '#040b07',
      bgSecondary: '#09150e',
      bgCard: 'rgba(12, 30, 20, 0.6)',
      bgAccentLight: 'rgba(34, 197, 94, 0.1)',
      borderColor: 'rgba(34, 197, 94, 0.15)',
      textPrimary: '#ffffff',
      textSecondary: '#bef264',
      textMuted: '#cbd5e1',
      accentPrimary: '#22c55e',
      accentPrimaryHover: '#4ade80',
      accentSecondary: '#bef264',
      accentGlow: 'rgba(34, 197, 94, 0.2)',
      gradientFrom: '#22c55e',
      gradientTo: '#bef264',
      isLight: false
    }
  },
  {
    id: 'alabaster-light',
    name: 'Alabaster Gold',
    icon: '☀️',
    colors: {
      bgPrimary: '#faf9f5',
      bgSecondary: '#f3f1e8',
      bgCard: 'rgba(255, 255, 255, 0.85)',
      bgAccentLight: 'rgba(217, 119, 6, 0.08)',
      borderColor: 'rgba(217, 119, 6, 0.15)',
      textPrimary: '#1c1917',
      textSecondary: '#b45309',
      textMuted: '#334155',
      accentPrimary: '#d97706',
      accentPrimaryHover: '#b45309',
      accentSecondary: '#ca8a04',
      accentGlow: 'rgba(217, 119, 6, 0.12)',
      gradientFrom: '#d97706',
      gradientTo: '#ca8a04',
      isLight: true
    }
  }
];

// Resume data typed interface
interface Project {
  id: string;
  name: string;
  category: string;
  tags: string[];
  description: string;
  features: string[];
  challenges: string;
  solution: string;
  learningOutcomes: string;
  icon: React.ReactNode;
  github: string;
  demo: string;
}

export default function App() {
  // Theme state
  const [activeTheme, setActiveTheme] = useState<Theme>(() => {
    const saved = localStorage.getItem('kv_portfolio_theme');
    return themes.find(t => t.id === saved) || themes[0];
  });

  useEffect(() => {
    localStorage.setItem('kv_portfolio_theme', activeTheme.id);
    const root = document.documentElement;
    root.style.setProperty('--bg-primary', activeTheme.colors.bgPrimary);
    root.style.setProperty('--bg-secondary', activeTheme.colors.bgSecondary);
    root.style.setProperty('--bg-card', activeTheme.colors.bgCard);
    root.style.setProperty('--bg-accent-light', activeTheme.colors.bgAccentLight);
    root.style.setProperty('--border-color', activeTheme.colors.borderColor);
    root.style.setProperty('--text-primary', activeTheme.colors.textPrimary);
    root.style.setProperty('--text-secondary', activeTheme.colors.textSecondary);
    root.style.setProperty('--text-muted', activeTheme.colors.textMuted);
    root.style.setProperty('--accent-primary', activeTheme.colors.accentPrimary);
    root.style.setProperty('--accent-primary-hover', activeTheme.colors.accentPrimaryHover);
    root.style.setProperty('--accent-secondary', activeTheme.colors.accentSecondary);
    root.style.setProperty('--accent-glow', activeTheme.colors.accentGlow);
    root.style.setProperty('--gradient-from', activeTheme.colors.gradientFrom);
    root.style.setProperty('--gradient-to', activeTheme.colors.gradientTo);
    
    if (activeTheme.colors.isLight) {
      root.classList.add('light');
      root.classList.remove('dark');
    } else {
      root.classList.add('dark');
      root.classList.remove('light');
    }
  }, [activeTheme]);

  // Visitor counter state
  const [visitorCount, setVisitorCount] = useState<number>(128);
  useEffect(() => {
    const saved = localStorage.getItem('kv_portfolio_visitors');
    const current = saved ? parseInt(saved, 10) + 1 : 129;
    localStorage.setItem('kv_portfolio_visitors', current.toString());
    setVisitorCount(current);
  }, []);

  // Tabs for main content navigation
  const [activeTab, setActiveTab] = useState<'overview' | 'projects' | 'skills' | 'experience'>('overview');
  
  // Search and project filters
  const [projectSearch, setProjectSearch] = useState('');
  const [projectFilter, setProjectFilter] = useState<'all' | 'ai-ml' | 'full-stack'>('all');
  
  // Active Case Study modal
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  
  // Resume Modal
  const [isResumeModalOpen, setIsResumeModalOpen] = useState(false);

  // FAQ Accordion open states
  const [faqOpen, setFaqOpen] = useState<Record<number, boolean>>({
    0: true, // open first by default
  });

  // Work Process active step highlights
  const [activeProcessStep, setActiveProcessStep] = useState<number>(0);

  // Contact form state
  const [contactForm, setContactForm] = useState({ name: '', email: '', message: '' });
  const [contactSuccess, setContactSuccess] = useState(false);

  const toggleFaq = (index: number) => {
    setFaqOpen(prev => ({ ...prev, [index]: !prev[index] }));
  };

  // Interactive Bento Grid States - Stats Header
  const [showLeetcodeBreakdown, setShowLeetcodeBreakdown] = useState(false);
  const [showTechDistribution, setShowTechDistribution] = useState(false);
  const [academicMetric, setAcademicMetric] = useState<'cgpa' | 'percentage'>('cgpa');
  const [vibeCodeScore, setVibeCodeScore] = useState(100);

  // Interactive Bento Grid States - Projects
  const [isListeningVoice, setIsListeningVoice] = useState(false);
  const [voiceTranscript, setVoiceTranscript] = useState('');
  
  const [isExtractingStudy, setIsExtractingStudy] = useState(false);
  const [studyKeywords, setStudyKeywords] = useState<string[]>([]);
  
  // FuelReach: 0 = idle, 1 = dispatching, 2 = transit, 3 = delivered
  const [fuelDeliveryStep, setFuelDeliveryStep] = useState<number>(0);
  const [fuelComplianceStatus, setFuelComplianceStatus] = useState<string>("Pending");
  
  // eHRS Medical Camp
  const [campPatientsCount, setCampPatientsCount] = useState<number>(142);
  const [medicalCampFamilyGroup, setMedicalCampFamilyGroup] = useState<string[]>(["Srinivas (Head)", "Laxmi (Spouse)"]);
  const [newFamilyMember, setNewFamilyMember] = useState<string>("");
  
  // Saarthi AI
  const [saarthiInput, setSaarthiInput] = useState<string>("");
  const [saarthiOutput, setSaarthiOutput] = useState<string>("");
  const [isSaarthiThinking, setIsSaarthiThinking] = useState<boolean>(false);
  
  // AI Website Builder
  const [whatsappMsg, setWhatsappMsg] = useState<string>("Build a modern burger joint restaurant site");
  const [isGeneratingWeb, setIsGeneratingWeb] = useState<boolean>(false);
  const [generatedWebSchema, setGeneratedWebSchema] = useState<string>("");

  // Experience sub-tab states
  const [experienceSubTab, setExperienceSubTab] = useState<'vishwam' | 'indianservers' | 'achievements'>('vishwam');
  const [activeContributionProject, setActiveContributionProject] = useState<'ehrs' | 'fuelreach' | 'saarthi' | 'builder'>('ehrs');

  // Projects definitions
  const projects: Project[] = [
    {
      id: 'voice-clarity-ai',
      name: 'Voice Clarity AI',
      category: 'ai-ml',
      tags: ['Python', 'Speech Recognition', 'NLP', 'Librosa', 'DSP'],
      description: 'A voice-enabled companion built to assist elderly users, implementing acoustic noise cancellation and vocal hesitation filters.',
      features: [
        'Real-time grammar and semantic post-processing to filter out vocal stutter/hesitations.',
        'High-accessibility high-contrast interface designed specifically for senior cognitive ergonomics.',
        'Acoustic signal processing algorithms reducing background noise by up to 18dB.'
      ],
      challenges: 'Interpreting shaky, whispery, or highly repetitive speech patterns typical in senior cohorts, leading to high transcript word error rates (WER).',
      solution: 'Designed an intermediate NLP processing layer using localized models to smooth vocal artifacts and correct semantic alignment.',
      learningOutcomes: 'Mastered digital signal processing (DSP) parameters in Librosa, audio frame windowing, and accessibility-compliant UI state design.',
      icon: <Volume2 className="w-6 h-6 text-indigo-400" />,
      github: 'https://github.com/karthikeya39g-af/voice-clarity-ai',
      demo: '#voice-clarity'
    },
    {
      id: 'fuel-reach',
      name: 'FuelReach',
      category: 'full-stack',
      tags: ['React', 'Node.js', 'PostgreSQL', 'Docker', 'GitLab CI'],
      description: 'An emergency on-demand fuel delivery platform with real-time tracking, rider/admin dashboards, and compliance automations.',
      features: [
        'Live location tracking of fuel delivery riders using interactive map polling structures.',
        'Dynamic dispatcher interface facilitating fuel logistics and automated dispatch routing.',
        'Automated local safety compliance checklists and real-time fuel temperature reports.'
      ],
      challenges: 'Synchronizing high-frequency location updates and safety compliance status without bottlenecking the database server.',
      solution: 'Configured optimized indexes on spatial attributes in PostgreSQL and utilized micro-staged transient location storage.',
      learningOutcomes: 'Deepened systems integration expertise with Docker containers, automated safety pipelines, and GitLab CI/CD environments.',
      icon: <Truck className="w-6 h-6 text-violet-400" />,
      github: 'https://github.com/karthikeya39g-af/fuelreach',
      demo: '#fuelreach'
    },
    {
      id: 'medical-camp',
      name: 'eHRS Medical Camp',
      category: 'full-stack',
      tags: ['React', 'FastAPI', 'PostgreSQL', 'Playwright', 'GitLab MR'],
      description: 'A comprehensive medical clinic clinical management system (eHRS) deployed during medical outreach camps to coordinate patient treatment records.',
      features: [
        'Responsive clinician dashboard supporting high-velocity patient intake forms and diagnostic entries.',
        'Structured family grouping hierarchy mapping genetic history trends for outpatient clinics.',
        'Built-in pharmacy stock ledger matching prescribed medicines with real-time camp inventory.'
      ],
      challenges: 'Ensuring absolute database consistency under unstable network conditions during remote rural outreach camps.',
      solution: 'Engineered an offline-first indexedDB syncing layer that queues clinical transactions and uploads bulk commits once network state recovers.',
      learningOutcomes: 'Mastered robust database schema design for medical records, end-to-end integration testing using Playwright, and GitLab merge request pipelines.',
      icon: <Activity className="w-6 h-6 text-blue-400" />,
      github: 'https://github.com/karthikeya39g-af/ehrs-medical-camp',
      demo: '#medical-camp'
    },
    {
      id: 'saarthi-ai',
      name: 'Saarthi AI',
      category: 'ai-ml',
      tags: ['TypeScript', 'Gemini API', 'FastAPI', 'GitLab CI', 'MVP'],
      description: 'Frontend MVP and conversational system integrating LLMs with responsive chatbot components to serve as a reliable legal/health advisory proxy.',
      features: [
        'Constructed custom system prompt instructions and multi-turn chat memory structures on Google Gemini.',
        'Fully responsive, accessible terminal component displaying clean, real-time response streams.',
        'Automated pipeline testing suite checking response formatting before deploy phases.'
      ],
      challenges: 'Restricting model hallucinations regarding localized legal code clauses and strict medicine guidelines.',
      solution: 'Implemented precise few-shot system-prompt constraint boundaries and integrated an automated feedback checklist validator.',
      learningOutcomes: 'Developed extensive fluency in the Google Gemini API, streaming state parameters, and structured output schemas.',
      icon: <MessageSquare className="w-6 h-6 text-purple-400" />,
      github: 'https://github.com/karthikeya39g-af/saarthi-ai',
      demo: '#saarthi-ai'
    },
    {
      id: 'ai-website-builder',
      name: 'AI Website Builder',
      category: 'ai-ml',
      tags: ['Python', 'Large Language Models', 'WhatsApp API', 'Flask'],
      description: 'A zero-code platform enabling users to trigger production-ready portfolio and landing-page generation directly via WhatsApp messages.',
      features: [
        'WhatsApp webhook integration converting natural-language prompts into structured code objects.',
        'Automated layout selector engine that outputs highly responsive, modern Tailwind landing pages.',
        'Self-healing markup validation parsing output to fix missing brackets or incorrect image sources.'
      ],
      challenges: 'Ensuring generated code from standard model queries was consistently valid, syntax-clean, and styled in Tailwind without compilation faults.',
      solution: 'Authored an LLM-guided iterative code corrector that checks syntax and wraps results in modern visual templates.',
      learningOutcomes: 'Learned WhatsApp Business API structures, advanced few-shot code-generation prompts, and automated markup validation.',
      icon: <Sparkles className="w-6 h-6 text-indigo-400" />,
      github: 'https://github.com/karthikeya39g-af/ai-website-builder',
      demo: '#ai-website-builder'
    },
    {
      id: 'study-genie',
      name: 'StudyGenie',
      category: 'ai-ml',
      tags: ['Python', 'NLP', 'PDF Processing', 'Scikit-Learn'],
      description: 'An AI-powered academic study-aid suite extracting thematic structures and summaries from dense textbook chapters.',
      features: [
        'Custom lexical parser processing large academic documents of up to 100 pages under 8 seconds.',
        'Thematic clustering engine grouping technical concepts using TF-IDF and Cosine similarity scoring.',
        'Conditional condensation model creating structured outlines that reduce total review time by 70%.'
      ],
      challenges: 'Cleaning PDF formatting artifacts, complex mathematical equations, and layout indexes.',
      solution: 'Developed localized text clean-up scripts using custom regex matrices before submitting sentences to ranking structures.',
      learningOutcomes: 'Strengthened core comprehension of document vectorized arrays, text corpus tokenizers, and NLP metrics.',
      icon: <BookOpen className="w-6 h-6 text-violet-400" />,
      github: 'https://github.com/karthikeya39g-af/studygenie',
      demo: '#study-genie'
    }
  ];

  // Filtered projects
  const filteredProjects = projects.filter(project => {
    const matchesSearch = project.name.toLowerCase().includes(projectSearch.toLowerCase()) ||
                          project.tags.some(tag => tag.toLowerCase().includes(projectSearch.toLowerCase())) ||
                          project.description.toLowerCase().includes(projectSearch.toLowerCase());
    const matchesCategory = projectFilter === 'all' || project.category === projectFilter;
    return matchesSearch && matchesCategory;
  });

  // Chat bot removed as per user request

  // Submit Contact Form
  const handleContactSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!contactForm.name || !contactForm.email || !contactForm.message) return;
    
    // Simulate contact sending
    setContactSuccess(true);
    setContactForm({ name: '', email: '', message: '' });
    setTimeout(() => setContactSuccess(false), 5000);
  };

  const bentoContainerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.08,
      },
    },
  };

  const bentoItemVariants = {
    hidden: { opacity: 0, y: 25, scale: 0.96 },
    show: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 15,
      },
    },
  };

  const slide3DVariants = {
    initial: {
      opacity: 0,
      x: 40,
      rotateY: 10,
      scale: 0.97,
    },
    animate: {
      opacity: 1,
      x: 0,
      rotateY: 0,
      scale: 1,
      transition: {
        type: "spring",
        stiffness: 120,
        damping: 18,
      }
    },
    exit: {
      opacity: 0,
      x: -40,
      rotateY: -10,
      scale: 0.97,
      transition: {
        duration: 0.22,
      }
    }
  };

  return (
    <div className="min-h-screen font-sans flex flex-col md:flex-row overflow-x-hidden antialiased relative transition-colors duration-500 custom-bg-primary custom-text-primary">
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=Outfit:wght@400;500;600;700;800&family=JetBrains+Mono:wght@400;500;700&display=swap');

        :root {
          --font-sans: 'Inter', sans-serif;
          --font-display: 'Outfit', sans-serif;
          --font-mono: 'JetBrains Mono', monospace;
          --bg-primary: ${activeTheme.colors.bgPrimary};
          --bg-secondary: ${activeTheme.colors.bgSecondary};
          --bg-card: ${activeTheme.colors.bgCard};
          --bg-accent-light: ${activeTheme.colors.bgAccentLight};
          --border-color: ${activeTheme.colors.borderColor};
          --text-primary: ${activeTheme.colors.textPrimary};
          --text-secondary: ${activeTheme.colors.textSecondary};
          --text-muted: ${activeTheme.colors.textMuted};
          --accent-primary: ${activeTheme.colors.accentPrimary};
          --accent-primary-hover: ${activeTheme.colors.accentPrimaryHover};
          --accent-secondary: ${activeTheme.colors.accentSecondary};
          --accent-glow: ${activeTheme.colors.accentGlow};
          --gradient-from: ${activeTheme.colors.gradientFrom};
          --gradient-to: ${activeTheme.colors.gradientTo};
        }

        /* Typography Application */
        body, html, .font-sans, p, span, li, button, input, textarea, select {
          font-family: var(--font-sans), sans-serif !important;
          font-weight: 500 !important; /* Slightly bolder body text for maximum visibility */
        }

        h1, h2, h3, h4, h5, h6, .font-display {
          font-family: var(--font-display), sans-serif !important;
          font-weight: 800 !important; /* Bold, professional display headings */
          letter-spacing: -0.015em;
        }

        pre, code, kbd, .font-mono, [class*="font-mono"] {
          font-family: var(--font-mono), monospace !important;
        }

        /* Override Utilities */
        .custom-bg-primary { background-color: var(--bg-primary) !important; }
        .custom-bg-secondary { background-color: var(--bg-secondary) !important; }
        .custom-bg-card { background-color: var(--bg-card) !important; backdrop-filter: blur(16px); }
        .custom-border { border-color: var(--border-color) !important; }
        .custom-text-primary { color: var(--text-primary) !important; }
        .custom-text-secondary { color: var(--text-secondary) !important; }
        .custom-text-muted { color: var(--text-muted) !important; }
        .custom-accent-text { color: var(--accent-primary) !important; }
        .custom-accent-bg { background-color: var(--accent-primary) !important; }
        .custom-accent-border { border-color: var(--accent-primary) !important; }
        
        .btn-accent {
          background: linear-gradient(135deg, var(--gradient-from), var(--gradient-to)) !important;
          color: #ffffff !important;
          font-weight: 700 !important;
        }
        .text-accent-gradient {
          background: linear-gradient(135deg, var(--gradient-from), var(--gradient-to));
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
        }
        
        .custom-input {
          background-color: ${activeTheme.colors.isLight ? 'rgba(0,0,0,0.03)' : 'rgba(0,0,0,0.35)'} !important;
          border-color: var(--border-color) !important;
          color: var(--text-primary) !important;
        }
        .custom-input:focus {
          border-color: var(--accent-primary) !important;
          box-shadow: 0 0 0 2px var(--accent-glow) !important;
        }

        /* 3D-themed interactive section container transitions */
        main section, main .custom-bg-card {
          transition: transform 0.4s cubic-bezier(0.16, 1, 0.3, 1), box-shadow 0.4s cubic-bezier(0.16, 1, 0.3, 1), border-color 0.4s cubic-bezier(0.16, 1, 0.3, 1) !important;
        }

        main section:hover, main .custom-bg-card:hover {
          transform: translateY(-2px) !important;
          box-shadow: 0 16px 32px -10px var(--accent-glow) !important;
          border-color: var(--accent-primary) !important;
        }

        /* Ensure standard slate classes have superb readability and exceed 4.5:1 contrast against dark backgrounds */
        .text-slate-400 {
          color: #cbd5e1 !important; /* Overridden to slate-300 (>11:1 contrast) */
        }
        .text-slate-500 {
          color: #94a3b8 !important; /* Overridden to slate-400 (>7:1 contrast) */
        }
        .text-slate-600 {
          color: #94a3b8 !important; /* Overridden to slate-400 (>7:1 contrast) */
        }

        /* Dynamic Theme Overrides for Light Theme to Ensure 100% Readability & Contrast */
        ${activeTheme.colors.isLight ? `
          /* Force standard dark classes to adapt gracefully in light mode */
          .text-white, .text-slate-100, .text-slate-200 {
            color: #1e293b !important; /* Highly readable dark slate */
          }
          .text-slate-300, .text-slate-400 {
            color: #334155 !important; /* Premium readable mid-slate */
          }
          .text-slate-500, .text-slate-600, .text-slate-650 {
            color: #475569 !important; /* Darker secondary slate */
          }
          .border-slate-800, .border-slate-850, .border-slate-900, .border-slate-700 {
            border-color: rgba(0, 0, 0, 0.09) !important;
          }
          .bg-slate-900, .bg-slate-950, .bg-slate-850 {
            background-color: #f1f5f9 !important; /* Light slate background */
            color: #0f172a !important;
          }
          .bg-slate-900\\/40, .bg-slate-950\\/50, .bg-slate-950\\/20, .bg-slate-850\\/80 {
            background-color: rgba(0, 0, 0, 0.04) !important;
          }
          .custom-bg-card, .bg-slate-900\\/30 {
            background-color: rgba(255, 255, 255, 0.96) !important;
            backdrop-filter: blur(20px) !important;
          }
          /* Override inputs inside widgets for visibility */
          input, textarea, select {
            background-color: #ffffff !important;
            color: #0f172a !important;
            border-color: rgba(0, 0, 0, 0.15) !important;
          }
          /* Custom status text readability */
          .text-indigo-400, .text-purple-400, .text-blue-400, .text-fuchsia-400, .text-violet-400, .text-pink-400 {
            color: var(--accent-primary) !important;
            filter: brightness(0.8); /* Darken light saturated colors for light theme */
          }
          /* Make buttons inside 3D cards attractive and visible */
          .bg-slate-850, .hover\\:bg-slate-800 {
            background-color: #e2e8f0 !important;
            color: #0f172a !important;
          }
          .bg-slate-850:hover, .hover\\:bg-slate-800:hover {
            background-color: #cbd5e1 !important;
          }
          kbd {
            background-color: #f1f5f9 !important;
            color: #0f172a !important;
          }
        ` : ''}
      `}</style>
      <ParticleBackground activeTheme={activeTheme} />
      
      {/* 1. PERSONAL INFORMATION SIDEBAR (LEFT) */}
      <aside className="w-full md:w-64 shrink-0 custom-bg-secondary custom-border backdrop-blur-md border-b md:border-b-0 md:border-r p-5 flex flex-col gap-5 justify-between relative z-10 shadow-2xl transition-all duration-500">
        <div className="flex flex-col items-center text-center mt-4">
          {/* Avatar frame with glow */}
          <div 
            className="relative w-36 h-36 rounded-2xl p-1 mb-4 shadow-xl"
            style={{
              background: `linear-gradient(135deg, var(--gradient-from), var(--gradient-to))`,
              boxShadow: `0 10px 25px -5px var(--accent-glow)`
            }}
          >
            <div className="w-full h-full rounded-xl bg-slate-900 flex flex-col items-center justify-center font-bold relative overflow-hidden">
              <span className="text-4xl text-indigo-400 font-extrabold tracking-tight" style={{ color: 'var(--accent-primary)' }}>KV</span>
              <span className="text-[10px] uppercase tracking-widest mt-1 font-mono" style={{ color: 'var(--accent-secondary)' }}>AI ENGINEER</span>
              <div className="absolute -inset-0.5 bg-gradient-to-br from-indigo-500/10 to-violet-500/10 opacity-30 animate-pulse"></div>
            </div>
          </div>

          <h1 className="text-xl font-extrabold tracking-tight mb-1" style={{ color: 'var(--text-primary)' }}>Karthikeya Veeramallu</h1>
          <p 
            className="text-xs font-semibold tracking-wide uppercase px-2.5 py-1 rounded-full border transition-all"
            style={{
              color: 'var(--accent-primary)',
              borderColor: 'var(--border-color)',
              backgroundColor: 'var(--bg-accent-light)'
            }}
          >
            AI Engineering Candidate
          </p>
          <p className="text-xs mt-1 font-medium" style={{ color: 'var(--text-muted)' }}>B.Tech CSE Student @ NNRG</p>
        </div>

        {/* Style / Theme Customization */}
        <div className="flex flex-col gap-3">
          <p className="text-[10px] uppercase tracking-widest text-slate-500 font-bold flex items-center gap-1">
            <Sparkles className="w-3.5 h-3.5 custom-accent-text" />
            <span>Interactive Color Themes</span>
          </p>
          <div className="grid grid-cols-2 gap-1.5">
            {themes.map((t) => (
              <button
                key={t.id}
                onClick={() => setActiveTheme(t)}
                className={`flex items-center gap-1.5 px-2.5 py-2 rounded-xl text-xs font-semibold cursor-pointer border transition-all ${
                  activeTheme.id === t.id
                    ? 'custom-accent-border custom-accent-text bg-slate-900/40 shadow-md'
                    : 'bg-slate-800/10 border-slate-800/60 custom-text-muted hover:border-slate-700/60 hover:text-slate-200'
                }`}
                style={{
                  borderColor: activeTheme.id === t.id ? 'var(--accent-primary)' : '',
                  color: activeTheme.id === t.id ? 'var(--accent-primary)' : ''
                }}
              >
                <span>{t.icon}</span>
                <span className="truncate">{t.name}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Essential Bio */}
        <div className="space-y-4 text-xs border-y py-4 custom-border">
          <div className="flex items-center gap-3">
            <MapPin className="w-4 h-4 shrink-0" style={{ color: 'var(--accent-primary)' }} />
            <span style={{ color: 'var(--text-primary)' }}>Hyderabad, Amberpet, India</span>
          </div>
          <div className="flex items-center gap-3">
            <Mail className="w-4 h-4 shrink-0" style={{ color: 'var(--accent-primary)' }} />
            <a href="mailto:karthikeya39g@gmail.com" className="hover:opacity-80 transition-opacity" style={{ color: 'var(--text-primary)' }}>karthikeya39g@gmail.com</a>
          </div>
          <div className="flex items-center gap-3">
            <Phone className="w-4 h-4 shrink-0" style={{ color: 'var(--accent-primary)' }} />
            <a href="tel:+919666356509" className="hover:opacity-80 transition-opacity" style={{ color: 'var(--text-primary)' }}>+91 9666356509</a>
          </div>
          <div className="flex items-center gap-3">
            <Briefcase className="w-4 h-4 shrink-0" style={{ color: 'var(--accent-primary)' }} />
            <span 
              className="font-bold uppercase tracking-widest text-[9px] px-2 py-0.5 rounded border"
              style={{
                color: 'var(--accent-primary)',
                borderColor: 'var(--border-color)',
                backgroundColor: 'var(--bg-accent-light)'
              }}
            >
              Seeking Internship 2024-2025
            </span>
          </div>
        </div>

        {/* Quick Social / Navigation */}
        <div className="flex flex-col gap-3">
          <p className="text-[10px] uppercase tracking-widest text-slate-500 font-bold">Profiles & Links</p>
          <div className="grid grid-cols-2 gap-2">
            <a
              href="https://github.com/karthikeya39g-af"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 px-3 py-2 border rounded-lg hover:opacity-80 transition-opacity text-xs"
              style={{
                backgroundColor: 'var(--bg-card)',
                borderColor: 'var(--border-color)',
                color: 'var(--text-primary)'
              }}
            >
              <Github className="w-3.5 h-3.5" style={{ color: 'var(--accent-primary)' }} />
              <span>GitHub</span>
            </a>
            <a
              href="https://linkedin.com/in/karthikeya-datascience"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 px-3 py-2 border rounded-lg hover:opacity-80 transition-opacity text-xs"
              style={{
                backgroundColor: 'var(--bg-card)',
                borderColor: 'var(--border-color)',
                color: 'var(--text-primary)'
              }}
            >
              <Linkedin className="w-3.5 h-3.5" style={{ color: 'var(--accent-secondary)' }} />
              <span>LinkedIn</span>
            </a>
          </div>
        </div>

        {/* Actions - Resume download & view */}
        <div className="flex flex-col gap-2 mt-auto">
          <button
            onClick={() => setIsResumeModalOpen(true)}
            className="w-full font-semibold py-2.5 rounded-xl transition-all text-xs flex items-center justify-center gap-2 cursor-pointer shadow-lg border"
            style={{
              backgroundColor: 'var(--bg-card)',
              borderColor: 'var(--border-color)',
              color: 'var(--text-primary)'
            }}
          >
            <FileText className="w-4 h-4" style={{ color: 'var(--accent-primary)' }} />
            <span>View Resume PDF</span>
          </button>
          
          <a
            href="https://github.com/karthikeya39g-af/portfolio/raw/main/karthikeya_resume.pdf"
            download="Karthikeya_Veeramallu_Resume.pdf"
            className="w-full btn-accent font-bold py-2.5 rounded-xl transition-all text-xs flex items-center justify-center gap-2 cursor-pointer shadow-lg"
          >
            <Download className="w-4 h-4" />
            <span>Download CV (PDF)</span>
          </a>
        </div>
      </aside>

      {/* MAIN PORTFOLIO WRAPPER */}
      <main className="flex-1 flex flex-col px-4 py-2 md:p-8 max-w-6xl mx-auto overflow-y-auto relative z-10">
        
        {/* TOP COMPONENT: STATS HEADER - INTERACTIVE BENTO GRID */}
        <motion.header
          variants={bentoContainerVariants}
          initial="hidden"
          animate="show"
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8"
        >
          
          {/* Bento Card 1: Projects Completed */}
          <ThreeDCard
            className="custom-bg-card custom-border border p-5 rounded-2xl flex flex-col justify-between hover:shadow-[0_20px_40px_-15px_var(--accent-glow)] transition-all min-h-[140px] h-full"
            onClick={() => setShowTechDistribution(!showTechDistribution)}
          >
            <div>
              <div className="flex justify-between items-start mb-2">
                <div 
                  className="p-2.5 rounded-xl border"
                  style={{ backgroundColor: 'var(--bg-accent-light)', borderColor: 'var(--border-color)' }}
                >
                  <Cpu className="w-5 h-5" style={{ color: 'var(--accent-primary)' }} />
                </div>
                <span 
                  className="text-[9px] font-mono px-2 py-0.5 rounded-full border"
                  style={{ color: 'var(--accent-primary)', borderColor: 'var(--border-color)', backgroundColor: 'var(--bg-accent-light)' }}
                >
                  Interactive
                </span>
              </div>
              <p className="text-[10px] uppercase font-bold tracking-widest" style={{ color: 'var(--text-muted)' }}>Projects Built</p>
              <p className="text-2xl font-extrabold mt-1" style={{ color: 'var(--text-primary)' }}>12+ Projects</p>
            </div>
            
            <div className="mt-3">
              <AnimatePresence mode="wait">
                {!showTechDistribution ? (
                  <motion.p
                    key="desc"
                    initial={{ opacity: 0, y: 5 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -5 }}
                    className="text-[10px] transition-colors"
                    style={{ color: 'var(--text-muted)' }}
                  >
                    Click to inspect technology stack distribution.
                  </motion.p>
                ) : (
                  <motion.div
                    key="distribution"
                    initial={{ opacity: 0, y: 5 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -5 }}
                    className="space-y-1.5 pt-1"
                  >
                    <div className="space-y-1">
                      <div className="flex justify-between text-[9px]" style={{ color: 'var(--text-muted)' }}>
                        <span>AI / Machine Learning</span>
                        <span>60%</span>
                      </div>
                      <div className="w-full bg-slate-800 h-1 rounded-full overflow-hidden">
                        <div className="h-full rounded-full" style={{ background: 'linear-gradient(90deg, var(--gradient-from), var(--gradient-to))', width: '60%' }} />
                      </div>
                    </div>
                    <div className="space-y-1">
                      <div className="flex justify-between text-[9px]" style={{ color: 'var(--text-muted)' }}>
                        <span>Full-Stack & Systems</span>
                        <span>40%</span>
                      </div>
                      <div className="w-full bg-slate-800 h-1 rounded-full overflow-hidden">
                        <div className="h-full rounded-full" style={{ backgroundColor: 'var(--accent-secondary)', width: '40%' }} />
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </ThreeDCard>

          {/* Bento Card 2: LeetCode Achievements */}
          <ThreeDCard
            className="custom-bg-card custom-border border p-5 rounded-2xl flex flex-col justify-between hover:shadow-[0_20px_40px_-15px_var(--accent-glow)] transition-all min-h-[140px] h-full"
            onClick={() => setShowLeetcodeBreakdown(!showLeetcodeBreakdown)}
          >
            <div>
              <div className="flex justify-between items-start mb-2">
                <div 
                  className="p-2.5 rounded-xl border"
                  style={{ backgroundColor: 'var(--bg-accent-light)', borderColor: 'var(--border-color)' }}
                >
                  <Code2 className="w-5 h-5" style={{ color: 'var(--accent-primary)' }} />
                </div>
                <span 
                  className="text-[9px] font-mono px-2 py-0.5 rounded-full border"
                  style={{ color: 'var(--accent-primary)', borderColor: 'var(--border-color)', backgroundColor: 'var(--bg-accent-light)' }}
                >
                  Click
                </span>
              </div>
              <p className="text-[10px] uppercase font-bold tracking-widest" style={{ color: 'var(--text-muted)' }}>LeetCode Solved</p>
              <p className="text-2xl font-extrabold mt-1" style={{ color: 'var(--text-primary)' }}>450+ Problems</p>
            </div>

            <div className="mt-3">
              <AnimatePresence mode="wait">
                {!showLeetcodeBreakdown ? (
                  <motion.p
                    key="desc"
                    initial={{ opacity: 0, y: 5 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -5 }}
                    className="text-[10px] transition-colors"
                    style={{ color: 'var(--text-muted)' }}
                  >
                    Click to view dynamic difficulty breakdown.
                  </motion.p>
                ) : (
                  <motion.div
                    key="breakdown"
                    initial={{ opacity: 0, y: 5 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -5 }}
                    className="flex justify-between items-center text-[10px] pt-1"
                  >
                    <div className="text-center">
                      <span className="block font-extrabold text-xs" style={{ color: 'var(--accent-primary)' }}>150</span>
                      <span className="text-[8px] font-mono uppercase" style={{ color: 'var(--text-muted)' }}>Easy</span>
                    </div>
                    <div className="h-6 w-[1px] bg-slate-800" />
                    <div className="text-center">
                      <span className="block font-extrabold text-xs" style={{ color: 'var(--accent-secondary)' }}>250</span>
                      <span className="text-[8px] font-mono uppercase" style={{ color: 'var(--text-muted)' }}>Medium</span>
                    </div>
                    <div className="h-6 w-[1px] bg-slate-800" />
                    <div className="text-center">
                      <span className="block font-extrabold text-xs text-rose-500">50</span>
                      <span className="text-[8px] font-mono uppercase" style={{ color: 'var(--text-muted)' }}>Hard</span>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </ThreeDCard>

          {/* Bento Card 3: Academic Journey */}
          <ThreeDCard
            className="custom-bg-card custom-border border p-5 rounded-2xl flex flex-col justify-between hover:shadow-[0_20px_40px_-15px_var(--accent-glow)] transition-all min-h-[140px] h-full"
            onClick={() => setAcademicMetric(academicMetric === 'cgpa' ? 'percentage' : 'cgpa')}
          >
            <div>
              <div className="flex justify-between items-start mb-2">
                <div 
                  className="p-2.5 rounded-xl border"
                  style={{ backgroundColor: 'var(--bg-accent-light)', borderColor: 'var(--border-color)' }}
                >
                  <TrendingUp className="w-5 h-5" style={{ color: 'var(--accent-primary)' }} />
                </div>
                <span 
                  className="text-[9px] font-mono px-2 py-0.5 rounded-full border"
                  style={{ color: 'var(--accent-primary)', borderColor: 'var(--border-color)', backgroundColor: 'var(--bg-accent-light)' }}
                >
                  Toggle Units
                </span>
              </div>
              <p className="text-[10px] uppercase font-bold tracking-widest" style={{ color: 'var(--text-muted)' }}>B.Tech Academics</p>
              
              <AnimatePresence mode="wait">
                {academicMetric === 'cgpa' ? (
                  <motion.p
                    key="cgpa"
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    className="text-2xl font-extrabold mt-1"
                    style={{ color: 'var(--text-primary)' }}
                  >
                    7.98 / 10 <span className="text-xs font-normal" style={{ color: 'var(--text-muted)' }}>CGPA</span>
                  </motion.p>
                ) : (
                  <motion.p
                    key="percentage"
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    className="text-2xl font-extrabold mt-1"
                    style={{ color: 'var(--text-primary)' }}
                  >
                    75.8% <span className="text-xs font-normal" style={{ color: 'var(--text-muted)' }}>Equiv.</span>
                  </motion.p>
                )}
              </AnimatePresence>
            </div>

            <div className="mt-3">
              <div className="w-full bg-slate-800 h-1.5 rounded-full overflow-hidden">
                <motion.div
                  className="h-full rounded-full"
                  style={{ background: 'linear-gradient(90deg, var(--gradient-from), var(--gradient-to))' }}
                  initial={{ width: 0 }}
                  animate={{ width: "79.8%" }}
                  transition={{ duration: 0.8, delay: 0.3 }}
                />
              </div>
              <p className="text-[9px] mt-1.5" style={{ color: 'var(--text-muted)' }}>
                Nalla Narasimha Reddy College, Hyderabad
              </p>
            </div>
          </ThreeDCard>

          {/* Bento Card 4: Vishwam Internship Highlight */}
          <ThreeDCard
            className="custom-bg-card custom-border border p-5 rounded-2xl flex flex-col justify-between hover:shadow-[0_20px_40px_-15px_var(--accent-glow)] transition-all min-h-[140px] h-full"
            onClick={() => setVibeCodeScore(prev => prev + 5)}
          >
            <div>
              <div className="flex justify-between items-start mb-2">
                <div 
                  className="p-2.5 rounded-xl border relative"
                  style={{ backgroundColor: 'var(--bg-accent-light)', borderColor: 'var(--border-color)' }}
                >
                  <Award className="w-5 h-5" style={{ color: 'var(--accent-primary)' }} />
                  <span className="absolute top-0 right-0 w-2.5 h-2.5 rounded-full border-2 border-slate-950 animate-ping" style={{ backgroundColor: 'var(--accent-primary)', borderColor: 'var(--bg-secondary)' }} />
                  <span className="absolute top-0 right-0 w-2.5 h-2.5 rounded-full border-2 border-slate-950" style={{ backgroundColor: 'var(--accent-primary)', borderColor: 'var(--bg-secondary)' }} />
                </div>
                <span 
                  className="text-[9px] font-mono px-2 py-0.5 rounded-full border"
                  style={{ color: 'var(--accent-primary)', borderColor: 'var(--border-color)', backgroundColor: 'var(--bg-accent-light)' }}
                >
                  Boost Vibe
                </span>
              </div>
              <p className="text-[10px] uppercase font-bold tracking-widest" style={{ color: 'var(--text-muted)' }}>Active Placement</p>
              <p className="text-sm font-extrabold mt-1 line-clamp-1" style={{ color: 'var(--text-primary)' }}>AI Developer @ Vishwam</p>
            </div>

            <div className="mt-3">
              <div className="flex justify-between items-center text-[9px]" style={{ color: 'var(--text-muted)' }}>
                <span>Vibe Coding Score</span>
                <span className="font-mono font-bold" style={{ color: 'var(--accent-primary)' }}>{vibeCodeScore}%</span>
              </div>
              <div className="w-full bg-slate-800 h-1.5 rounded-full overflow-hidden mt-1">
                <motion.div
                  className="h-full rounded-full"
                  style={{ background: 'linear-gradient(90deg, var(--gradient-from), var(--gradient-to))' }}
                  animate={{ width: `${Math.min(vibeCodeScore, 100)}%` }}
                  transition={{ type: "spring", stiffness: 100 }}
                />
              </div>
            </div>
          </ThreeDCard>

        </motion.header>

        {/* NAVIGATION TAB STRIP */}
        <div className="flex border-b mb-8 overflow-x-auto gap-2 md:gap-4 no-scrollbar custom-border">
          <button
            onClick={() => setActiveTab('overview')}
            className="py-3 px-4 border-b-2 text-sm font-medium transition-all cursor-pointer whitespace-nowrap"
            style={{
              borderColor: activeTab === 'overview' ? 'var(--accent-primary)' : 'transparent',
              color: activeTab === 'overview' ? 'var(--accent-primary)' : 'var(--text-muted)',
              backgroundColor: activeTab === 'overview' ? 'var(--bg-accent-light)' : 'transparent'
            }}
          >
            Overview & Profile
          </button>
          <button
            onClick={() => setActiveTab('projects')}
            className="py-3 px-4 border-b-2 text-sm font-medium transition-all cursor-pointer whitespace-nowrap"
            style={{
              borderColor: activeTab === 'projects' ? 'var(--accent-primary)' : 'transparent',
              color: activeTab === 'projects' ? 'var(--accent-primary)' : 'var(--text-muted)',
              backgroundColor: activeTab === 'projects' ? 'var(--bg-accent-light)' : 'transparent'
            }}
          >
            Projects Case Studies
          </button>
          <button
            onClick={() => setActiveTab('skills')}
            className="py-3 px-4 border-b-2 text-sm font-medium transition-all cursor-pointer whitespace-nowrap"
            style={{
              borderColor: activeTab === 'skills' ? 'var(--accent-primary)' : 'transparent',
              color: activeTab === 'skills' ? 'var(--accent-primary)' : 'var(--text-muted)',
              backgroundColor: activeTab === 'skills' ? 'var(--bg-accent-light)' : 'transparent'
            }}
          >
            Skills & Services
          </button>
          <button
            onClick={() => setActiveTab('experience')}
            className="py-3 px-4 border-b-2 text-sm font-medium transition-all cursor-pointer whitespace-nowrap"
            style={{
              borderColor: activeTab === 'experience' ? 'var(--accent-primary)' : 'transparent',
              color: activeTab === 'experience' ? 'var(--accent-primary)' : 'var(--text-muted)',
              backgroundColor: activeTab === 'experience' ? 'var(--bg-accent-light)' : 'transparent'
            }}
          >
            Experience & Achievements
          </button>
        </div>

        {/* TAB CONTENTS */}

        {/* TAB CONTENTS */}
        <AnimatePresence mode="wait">

        {/* 1. OVERVIEW TAB */}
        {activeTab === 'overview' && (
          <motion.div
            key="overview-tab"
            variants={slide3DVariants}
            initial="initial"
            animate="animate"
            exit="exit"
            className="space-y-8"
          >
            
             {/* 2. ABOUT ME & 3. CAREER OBJECTIVE */}
             <div className="grid md:grid-cols-3 gap-6">
               <motion.section
                 initial={{ opacity: 0, y: 20, scale: 0.98 }}
                 animate={{ opacity: 1, y: 0, scale: 1 }}
                 transition={{ duration: 0.5, ease: "easeOut" }}
                 className="bg-slate-900/30 border border-slate-800 p-6 rounded-2xl md:col-span-2 space-y-4 hover:border-indigo-500/10 hover:shadow-[0_15px_30px_-15px_rgba(99,102,241,0.1)] transition-all"
               >
                 <h2 className="text-lg font-bold text-white flex items-center gap-2">
                   <User className="w-5 h-5 text-indigo-400" />
                   <span>About Me</span>
                 </h2>
                 <div className="text-sm text-slate-300 space-y-3 leading-relaxed">
                   <p>
                     I am a motivated third-year B.Tech Computer Science & Engineering student at Nalla Narasimha Reddy Engineering College, Hyderabad. Deeply passionate about Artificial Intelligence, Machine Learning, and Web Development, I specialize in engineering systems that blend frontend elegance with strong server-side and NLP capabilities.
                   </p>
                   <p>
                     My educational foundation has equipped me with strong problem-solving capacities and solid software engineering principles. I thoroughly enjoy analyzing complex challenges, building creative data pipelines, and implementing real-world automation scripts that reduce human effort.
                   </p>
                   <p>
                     I am motivated by a drive to create accessible tools that make a genuine difference, whether that means streamlining academic research or writing speech assistants tailored for elderly support. My strengths lie in rapid framework learning, cohesive teamwork, and methodical testing.
                   </p>
                 </div>
               </motion.section>
 
               <motion.section
                 initial={{ opacity: 0, y: 20, scale: 0.98 }}
                 animate={{ opacity: 1, y: 0, scale: 1 }}
                 transition={{ duration: 0.5, delay: 0.1, ease: "easeOut" }}
                 className="bg-slate-900/30 border border-slate-800 p-6 rounded-2xl flex flex-col justify-between hover:border-purple-500/10 hover:shadow-[0_15px_30px_-15px_rgba(168,85,247,0.1)] transition-all"
               >
                 <div>
                   <h3 className="text-base font-bold text-white mb-4 flex items-center gap-2">
                     <Brain className="w-5 h-5 text-purple-400" />
                     <span>Career Objective</span>
                   </h3>
                   <p className="text-sm text-slate-300 leading-relaxed">
                     Seeking an internship or early-career opportunity as an **AI Engineer**, **Machine Learning Intern**, or **Full Stack Developer** where I can contribute innovative, production-grade solutions while continuously polishing my technical abilities.
                   </p>
                   <p className="text-xs text-slate-400 mt-4 leading-relaxed">
                     Eager to drive progress in data analysis, model evaluations, natural language pipelines, and robust backend systems across medical, educational, and workflow automation industries.
                   </p>
                 </div>
                 
                 <button
                   onClick={() => {
                     const contactEl = document.getElementById('contact');
                     if (contactEl) {
                       contactEl.scrollIntoView({ behavior: 'smooth' });
                     }
                   }}
                   className="w-full mt-6 bg-slate-800 hover:bg-slate-700/50 border border-slate-700/50 text-xs text-purple-400 font-semibold py-2.5 rounded-lg transition-colors flex items-center justify-center gap-1.5 cursor-pointer"
                 >
                   <span>Get in Touch Directly</span>
                   <Mail className="w-3.5 h-3.5" />
                 </button>
               </motion.section>
             </div>

             {/* 17. WORK PROCESS SECTION */}
             <motion.section
               initial={{ opacity: 0, y: 30 }}
               animate={{ opacity: 1, y: 0 }}
               transition={{ duration: 0.5, delay: 0.15 }}
               className="bg-slate-900/30 border border-slate-800 p-6 rounded-2xl hover:border-indigo-500/5 transition-all"
             >
               <h2 className="text-sm font-bold text-white uppercase tracking-widest border-b border-slate-800 pb-3 mb-6">
                 Engineered Work Process
               </h2>
               <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-8 gap-3">
                 {[
                   { step: '01', title: 'Requirement Analysis', desc: 'Detailing specifications, user scopes, and dataset constraints.' },
                   { step: '02', title: 'Research', desc: 'Evaluating baseline architectures, academic models, and frameworks.' },
                   { step: '03', title: 'Planning', desc: 'Structuring data pipelines, API models, and database design.' },
                   { step: '04', title: 'UI Design', desc: 'Crafting highly accessible, high-contrast user flows.' },
                   { step: '05', title: 'Development', desc: 'Writing clean modular Python, Java, or React/Node code.' },
                   { step: '06', title: 'Testing', desc: 'Applying unit checks, model evaluations, and latency tests.' },
                   { step: '07', title: 'Deployment', desc: 'Deploying securely to Vercel, Railway, or Docker blocks.' },
                   { step: '08', title: 'Maintenance', desc: 'Monitoring accuracy, updating pipelines, and polishing scripts.' }
                 ].map((item, index) => (
                   <motion.div
                     key={index}
                     initial={{ opacity: 0, y: 15, scale: 0.95 }}
                     animate={{ opacity: 1, y: 0, scale: 1 }}
                     transition={{ type: "spring", stiffness: 100, damping: 15, delay: index * 0.05 }}
                     onClick={() => setActiveProcessStep(index)}
                     className={`p-3 rounded-xl border transition-all cursor-pointer flex flex-col justify-between h-32 ${
                       activeProcessStep === index
                         ? 'bg-slate-800/80 border-indigo-500 text-white shadow-lg shadow-indigo-500/10'
                         : 'bg-slate-900/10 border-slate-800 hover:border-slate-700 text-slate-300'
                     }`}
                   >
                     <div>
                       <span className={`text-[10px] font-mono block mb-1 ${activeProcessStep === index ? 'text-indigo-400' : 'text-slate-500'}`}>{item.step}</span>
                       <h4 className="text-xs font-bold leading-tight">{item.title}</h4>
                     </div>
                     <p className="text-[9px] text-slate-400 leading-normal line-clamp-3">{item.desc}</p>
                   </motion.div>
                 ))}
               </div>
             </motion.section>
 
             {/* 21. CAREER TIMELINE */}
             <motion.section
               initial={{ opacity: 0, y: 30 }}
               animate={{ opacity: 1, y: 0 }}
               transition={{ duration: 0.5, delay: 0.2 }}
               className="bg-slate-900/30 border border-slate-800 p-6 rounded-2xl hover:border-indigo-500/5 transition-all"
             >
               <h2 className="text-sm font-bold text-white uppercase tracking-widest border-b border-slate-800 pb-3 mb-6">
                 Education & Career Timeline
              </h2>
              <div className="relative border-l-2 border-slate-800 ml-3 space-y-8">
                
                {/* Timeline node 0: Vishwam */}
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5, delay: 0.05 }}
                  className="relative pl-6"
                >
                  <div className="absolute -left-[7px] top-1 w-3 h-3 rounded-full bg-indigo-500 border-2 border-slate-950 animate-pulse"></div>
                  <span className="text-[10px] font-mono text-indigo-400 bg-indigo-950/40 px-2 py-0.5 rounded border border-indigo-900/30">
                    2025 - Present
                  </span>
                  <h3 className="text-sm font-bold text-white mt-2">AI Developer Intern</h3>
                  <p className="text-xs text-indigo-400 font-semibold">Vishwam</p>
                  <p className="text-xs text-slate-300 mt-1 leading-relaxed">
                    Working on AI-assisted software development using modern Vibe Coding practices. Designing and developing intelligent applications, enhancing UI/UX, implementing frontend and backend features, integrating AI workflows, and collaborating through GitLab.
                  </p>
                </motion.div>

                {/* Timeline node 1 */}
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5, delay: 0.1 }}
                  className="relative pl-6"
                >
                  <div className="absolute -left-[7px] top-1 w-3 h-3 rounded-full bg-indigo-400 border-2 border-slate-950"></div>
                  <span className="text-[10px] font-mono text-indigo-400 bg-indigo-950/40 px-2 py-0.5 rounded border border-indigo-900/30">
                    2023 - 2027
                  </span>
                  <h3 className="text-sm font-bold text-white mt-2">B.Tech - Computer Science & Engineering</h3>
                  <p className="text-xs text-slate-400 font-semibold">Nalla Narasimha Reddy Engineering College, Hyderabad</p>
                  <p className="text-xs text-slate-300 mt-1 leading-relaxed">
                    Undergoing specialized technical curriculum focusing on machine learning, database structures, operating systems, and web architecture. Maintained a CGPA of **7.98**.
                  </p>
                </motion.div>

                {/* Timeline node 2 */}
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5, delay: 0.2 }}
                  className="relative pl-6"
                >
                  <div className="absolute -left-[7px] top-1 w-3 h-3 rounded-full bg-teal-400 border-2 border-slate-950"></div>
                  <span className="text-[10px] font-mono text-teal-400 bg-teal-950/40 px-2 py-0.5 rounded border border-teal-900/30">
                    2023 (2 Months)
                  </span>
                  <h3 className="text-sm font-bold text-white mt-2">AI & ML Model Design Intern</h3>
                  <p className="text-xs text-slate-400 font-semibold">Indian Servers (Software Development Company)</p>
                  <p className="text-xs text-slate-300 mt-1 leading-relaxed">
                    Delivered ML models with 20% accuracy enhancements, audited 5,000+ text and numerical records, and established Python automations.
                  </p>
                </motion.div>

                {/* Timeline node 3 */}
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5, delay: 0.3 }}
                  className="relative pl-6"
                >
                  <div className="absolute -left-[7px] top-1 w-3 h-3 rounded-full bg-blue-400 border-2 border-slate-950"></div>
                  <span className="text-[10px] font-mono text-blue-400 bg-blue-950/40 px-2 py-0.5 rounded border border-blue-900/30">
                    2024
                  </span>
                  <h3 className="text-sm font-bold text-white mt-2">Technical Core Projects & Certifications</h3>
                  <p className="text-xs text-slate-400 font-semibold">Independent Development / NxtWave Academy</p>
                  <p className="text-xs text-slate-300 mt-1 leading-relaxed">
                    Earned certifications in Programming Fundamentals & Frontend Development. Built **AI Study Guide Generator** and **AI Fitness Assistant**.
                  </p>
                </motion.div>

                {/* Timeline node 4 */}
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5, delay: 0.4 }}
                  className="relative pl-6"
                >
                  <div className="absolute -left-[7px] top-1 w-3 h-3 rounded-full bg-purple-400 border-2 border-slate-950 animate-pulse"></div>
                  <span className="text-[10px] font-mono text-purple-400 bg-purple-950/40 px-2 py-0.5 rounded border border-purple-900/30">
                    Future Goals (2025+)
                  </span>
                  <h3 className="text-sm font-bold text-white mt-2">Professional AI/ML Integration</h3>
                  <p className="text-xs text-slate-400 font-semibold">Industrial Placement</p>
                  <p className="text-xs text-slate-300 mt-1 leading-relaxed">
                    Aspiring to integrate deep learning architectures, cloud APIs (Google Cloud, Gemini API), and vector stores into real-world business environments.
                  </p>
                </motion.div>
              </div>
            </motion.section>

            {/* 19. GALLERY OF CERTIFICATES AND WORKSHOPS */}
            <section className="bg-slate-900/30 border border-slate-800 p-6 rounded-2xl">
              <h2 className="text-sm font-bold text-white uppercase tracking-widest border-b border-slate-800 pb-3 mb-6">
                Certificates & Workshop Gallery
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="group bg-slate-800/40 border border-slate-700/30 p-4 rounded-xl flex flex-col justify-between hover:border-indigo-500/30 transition-all">
                  <div>
                    <div className="bg-indigo-950/40 text-indigo-400 border border-indigo-900/50 rounded-lg p-3 w-12 h-12 flex items-center justify-center mb-3">
                      <Code2 className="w-6 h-6" />
                    </div>
                    <h3 className="text-sm font-bold text-white">Programming Fundamentals Certification</h3>
                    <p className="text-xs text-slate-400 mt-1">Issued by NxtWave Academy</p>
                    <p className="text-xs text-slate-300 mt-2">
                      Covers Python syntax, algorithms, data manipulations, OOP concepts, SQL queries, and procedural problem-solving.
                    </p>
                  </div>
                  <div className="flex items-center justify-between mt-4 border-t border-slate-800/80 pt-3">
                    <span className="text-[10px] text-slate-500">Credential ID: Nxt-9428-A</span>
                    <a href="https://github.com/karthikeya39g-af" target="_blank" rel="noreferrer" className="text-xs text-indigo-400 flex items-center gap-1 hover:underline">
                      <span>Verify</span>
                      <ExternalLink className="w-3 h-3" />
                    </a>
                  </div>
                </div>

                <div className="group bg-slate-800/40 border border-slate-700/30 p-4 rounded-xl flex flex-col justify-between hover:border-purple-500/30 transition-all">
                  <div>
                    <div className="bg-purple-950/40 text-purple-400 border border-purple-900/50 rounded-lg p-3 w-12 h-12 flex items-center justify-center mb-3">
                      <Layers className="w-6 h-6" />
                    </div>
                    <h3 className="text-sm font-bold text-white">Frontend Development Certification</h3>
                    <p className="text-xs text-slate-400 mt-1">Issued by NxtWave Academy</p>
                    <p className="text-xs text-slate-300 mt-2">
                      Validates production-grade UI assembly using React.js, responsive Tailwind layouts, component lifecycle mapping, and state controls.
                    </p>
                  </div>
                  <div className="flex items-center justify-between mt-4 border-t border-slate-800/80 pt-3">
                    <span className="text-[10px] text-slate-500">Credential ID: Nxt-3841-B</span>
                    <a href="https://github.com/karthikeya39g-af" target="_blank" rel="noreferrer" className="text-xs text-purple-400 flex items-center gap-1 hover:underline">
                      <span>Verify</span>
                      <ExternalLink className="w-3 h-3" />
                    </a>
                  </div>
                </div>
              </div>
            </section>

            {/* 18. TESTIMONIALS & 25. FAQ */}
            <div className="grid md:grid-cols-2 gap-6">
              
              {/* Testimonials */}
              <section className="bg-slate-900/30 border border-slate-800 p-6 rounded-2xl space-y-4">
                <h2 className="text-sm font-bold text-white uppercase tracking-widest border-b border-slate-800 pb-3">
                  Academic & Professional Testimonials
                </h2>
                <div className="space-y-4">
                  <div className="bg-slate-800/20 border border-slate-850 p-4 rounded-xl relative">
                    <span className="text-4xl text-indigo-500/20 absolute right-4 top-2 font-serif select-none">"</span>
                    <p className="text-xs text-slate-300 italic leading-relaxed">
                      Karthikeya was an exceptional AI/ML intern during his stint at Indian Servers. He engineered model classifications that surpassed our benchmark parameters and was always enthusiastic about deploying robust automation. Highly recommended for AI Engineering internships!
                    </p>
                    <div className="flex items-center gap-3 mt-3 border-t border-slate-800/40 pt-2.5">
                      <div className="w-8 h-8 rounded-full bg-slate-700 flex items-center justify-center font-bold text-xs text-white">SS</div>
                      <div>
                        <h4 className="text-xs font-bold text-white">Sai Satish</h4>
                        <p className="text-[10px] text-slate-400">CEO, Indian Servers (Software Development Co.)</p>
                      </div>
                    </div>
                  </div>

                  <div className="bg-slate-800/20 border border-slate-850 p-4 rounded-xl relative">
                    <span className="text-4xl text-indigo-500/20 absolute right-4 top-2 font-serif select-none">"</span>
                    <p className="text-xs text-slate-300 italic leading-relaxed">
                      Karthikeya displays highly analytical habits. His coordination of the department fests while executing clean projects like the AI Study Guide Generator demonstrates both technical rigor and reliable coordination skills.
                    </p>
                    <div className="flex items-center gap-3 mt-3 border-t border-slate-800/40 pt-2.5">
                      <div className="w-8 h-8 rounded-full bg-slate-700 flex items-center justify-center font-bold text-xs text-white">DS</div>
                      <div>
                        <h4 className="text-xs font-bold text-white">Dept Coordinator Representative</h4>
                        <p className="text-[10px] text-slate-400">Computer Science Dept, NNRG College</p>
                      </div>
                    </div>
                  </div>
                </div>
              </section>

              {/* FAQ */}
              <section className="bg-slate-900/30 border border-slate-800 p-6 rounded-2xl space-y-4">
                <h2 className="text-sm font-bold text-white uppercase tracking-widest border-b border-slate-800 pb-3">
                  Frequently Asked Questions
                </h2>
                <div className="space-y-3">
                  {[
                    { q: 'Are you available for Summer 2024 or Fall 2024 internships?', a: 'Yes! I am actively seeking virtual or physical internship placements in AI, ML, or Full-Stack software developer positions.' },
                    { q: 'What programming languages are you most comfortable with?', a: 'I specialize primarily in Python (for machine learning pipelines, NLP, and data preprocessing) and JavaScript/TypeScript (for modern React-based interfaces and Express/Node APIs). I am also highly proficient in Java.' },
                    { q: 'Can you work on full-stack web applications with cloud databases?', a: 'Yes. I write robust APIs in Express or FastAPI and integrate databases like MySQL, MongoDB, and PostgreSQL. I have also used vector DBs like ChromaDB.' },
                    { q: 'What is your background in AI/ML engineering?', a: 'I have designed ML classification models during an internship at Indian Servers, built speech recognition tools with noise reduction, and engineered text summarization structures using vector scoring.' }
                  ].map((faq, index) => (
                    <div key={index} className="border border-slate-800 rounded-lg overflow-hidden">
                      <button
                        onClick={() => toggleFaq(index)}
                        className="w-full text-left p-3 bg-slate-900/40 hover:bg-slate-800/30 flex justify-between items-center transition-colors cursor-pointer text-xs font-bold text-slate-200"
                      >
                        <span>{faq.q}</span>
                        {faqOpen[index] ? <ChevronUp className="w-3.5 h-3.5 text-indigo-400" /> : <ChevronDown className="w-3.5 h-3.5 text-slate-400" />}
                      </button>
                      {faqOpen[index] && (
                        <div className="p-3 bg-slate-950/20 text-xs text-slate-300 leading-relaxed border-t border-slate-850">
                          {faq.a}
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </section>
            </div>

            {/* 23. CONTACT FORM SECTION */}
            <section id="contact" className="bg-slate-900/30 border border-slate-800 p-6 rounded-2xl">
              <div className="grid md:grid-cols-3 gap-6">
                <div>
                  <h2 className="text-sm font-bold text-white uppercase tracking-widest border-b border-slate-800 pb-3 mb-4">
                    Get In Touch
                  </h2>
                  <p className="text-xs text-slate-300 leading-relaxed mb-4">
                    Have an internship opportunity, freelance inquiry, or technical question? Feel free to write me directly! I am responsive via email or phone.
                  </p>
                  <div className="space-y-3 text-xs text-slate-400">
                    <p>📧 Email: karthikeya39g@gmail.com</p>
                    <p>📞 Phone: +91 9666356509</p>
                    <p>📍 Location: Amberpet, Hyderabad, India</p>
                  </div>
                </div>

                <div className="md:col-span-2">
                  <form onSubmit={handleContactSubmit} className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-[10px] uppercase font-bold text-slate-500 mb-1">Your Name</label>
                        <input
                          type="text"
                          required
                          value={contactForm.name}
                          onChange={(e) => setContactForm(prev => ({ ...prev, name: e.target.value }))}
                          className="w-full bg-slate-950 border border-slate-800 rounded-lg p-2.5 text-xs text-white focus:outline-none focus:border-indigo-500 transition-colors"
                          placeholder="Alex Rivera"
                        />
                      </div>
                      <div>
                        <label className="block text-[10px] uppercase font-bold text-slate-500 mb-1">Email Address</label>
                        <input
                          type="email"
                          required
                          value={contactForm.email}
                          onChange={(e) => setContactForm(prev => ({ ...prev, email: e.target.value }))}
                          className="w-full bg-slate-950 border border-slate-800 rounded-lg p-2.5 text-xs text-white focus:outline-none focus:border-indigo-500 transition-colors"
                          placeholder="alex@company.com"
                        />
                      </div>
                    </div>
                    <div>
                      <label className="block text-[10px] uppercase font-bold text-slate-500 mb-1">Message</label>
                      <textarea
                        required
                        rows={3}
                        value={contactForm.message}
                        onChange={(e) => setContactForm(prev => ({ ...prev, message: e.target.value }))}
                        className="w-full bg-slate-950 border border-slate-800 rounded-lg p-2.5 text-xs text-white focus:outline-none focus:border-indigo-500 transition-colors"
                        placeholder="Hi Karthikeya, we'd love to discuss an AI Engineer internship role with you!"
                      />
                    </div>
                    
                    {contactSuccess && (
                      <div className="p-3 bg-indigo-950/40 border border-indigo-900 text-indigo-400 text-xs rounded-lg flex items-center gap-2">
                        <Check className="w-4 h-4 shrink-0" />
                        <span>Success! Your simulated contact message was captured locally on your screen. Thank you!</span>
                      </div>
                    )}

                    <button
                      type="submit"
                      className="px-5 py-2.5 bg-indigo-500 hover:bg-indigo-400 text-slate-950 font-bold rounded-lg transition-colors text-xs cursor-pointer flex items-center gap-2 shadow-lg shadow-indigo-500/10"
                    >
                      <span>Send Message</span>
                      <Send className="w-3.5 h-3.5" />
                    </button>
                  </form>
                </div>
              </div>
            </section>
          </motion.div>
        )}

        {/* 2. PROJECTS TAB */}
        {activeTab === 'projects' && (
          <motion.div
            key="projects-tab"
            variants={slide3DVariants}
            initial="initial"
            animate="animate"
            exit="exit"
            className="space-y-6"
          >
            
            {/* Search and filter bar */}
            <div className="bg-slate-900/30 border border-slate-800 p-4 rounded-xl flex flex-col md:flex-row gap-4 items-center justify-between">
              <div className="relative w-full md:w-72">
                <Search className="w-4 h-4 text-slate-500 absolute left-3 top-3" />
                <input
                  type="text"
                  placeholder="Search projects or tech..."
                  value={projectSearch}
                  onChange={(e) => setProjectSearch(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-800 rounded-lg pl-9 pr-4 py-2 text-xs text-white focus:outline-none focus:border-indigo-500"
                />
              </div>

              <div className="flex gap-2 w-full md:w-auto overflow-x-auto">
                <button
                  onClick={() => setProjectFilter('all')}
                  className={`px-3 py-1.5 rounded-lg text-xs font-semibold cursor-pointer whitespace-nowrap ${
                    projectFilter === 'all'
                      ? 'bg-indigo-500 text-slate-950'
                      : 'bg-slate-850 text-slate-400 hover:text-slate-200'
                  }`}
                >
                  All Projects
                </button>
                <button
                  onClick={() => setProjectFilter('ai-ml')}
                  className={`px-3 py-1.5 rounded-lg text-xs font-semibold cursor-pointer whitespace-nowrap ${
                    projectFilter === 'ai-ml'
                      ? 'bg-indigo-500 text-slate-950'
                      : 'bg-slate-850 text-slate-400 hover:text-slate-200'
                  }`}
                >
                  AI / Machine Learning
                </button>
                <button
                  onClick={() => setProjectFilter('full-stack')}
                  className={`px-3 py-1.5 rounded-lg text-xs font-semibold cursor-pointer whitespace-nowrap ${
                    projectFilter === 'full-stack'
                      ? 'bg-indigo-500 text-slate-950'
                      : 'bg-slate-850 text-slate-400 hover:text-slate-200'
                  }`}
                >
                  Core Systems & Java
                </button>
              </div>
            </div>

            {/* 3D Perspective-Based Interactive Carousel */}
            <ProjectCarousel
              filteredProjects={filteredProjects}
              setSelectedProject={setSelectedProject}
              activeTheme={activeTheme}
              isListeningVoice={isListeningVoice}
              setIsListeningVoice={setIsListeningVoice}
              voiceTranscript={voiceTranscript}
              setVoiceTranscript={setVoiceTranscript}
              isExtractingStudy={isExtractingStudy}
              setIsExtractingStudy={setIsExtractingStudy}
              studyKeywords={studyKeywords}
              setStudyKeywords={setStudyKeywords}
              fuelDeliveryStep={fuelDeliveryStep}
              setFuelDeliveryStep={setFuelDeliveryStep}
              fuelComplianceStatus={fuelComplianceStatus}
              setFuelComplianceStatus={setFuelComplianceStatus}
              campPatientsCount={campPatientsCount}
              setCampPatientsCount={setCampPatientsCount}
              medicalCampFamilyGroup={medicalCampFamilyGroup}
              setMedicalCampFamilyGroup={setMedicalCampFamilyGroup}
              newFamilyMember={newFamilyMember}
              setNewFamilyMember={setNewFamilyMember}
              saarthiInput={saarthiInput}
              setSaarthiInput={setSaarthiInput}
              saarthiOutput={saarthiOutput}
              setSaarthiOutput={setSaarthiOutput}
              isSaarthiThinking={isSaarthiThinking}
              setIsSaarthiThinking={setIsSaarthiThinking}
              whatsappMsg={whatsappMsg}
              setWhatsappMsg={setWhatsappMsg}
              isGeneratingWeb={isGeneratingWeb}
              setIsGeneratingWeb={setIsGeneratingWeb}
              generatedWebSchema={generatedWebSchema}
              setGeneratedWebSchema={setGeneratedWebSchema}
            />
            
            {/* 13. RESEARCH PAPERS SECTION */}
            <section className="bg-slate-900/30 border border-slate-800 p-6 rounded-2xl mt-8">
              <h2 className="text-sm font-bold text-white uppercase tracking-widest border-b border-slate-800 pb-3 mb-6">
                Academic & Project Research Foundations
              </h2>
              <div className="bg-slate-800/20 border border-slate-800 p-5 rounded-xl space-y-4">
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-2">
                  <div className="flex items-center gap-2">
                    <BookOpen className="w-5 h-5 text-indigo-400" />
                    <h3 className="text-sm font-bold text-white">An Analysis of Real-time Grammar Correction Systems for Accessibility Devices</h3>
                  </div>
                  <span className="text-[10px] px-2.5 py-1 bg-indigo-950/40 text-indigo-400 border border-indigo-900/40 font-mono rounded-full self-start">
                    Proposed Abstract / Academic Reference
                  </span>
                </div>
                
                <p className="text-xs text-slate-300 leading-relaxed">
                  **Abstract**: This study presents the algorithmic design of low-latency speech feedback aids targeting elderly vocal support interfaces. By coupling local audio filtration models with grammatical mapping constraints, the engine achieves speech correction outputs in under 120ms. The paper details training thresholds, transcription noise modeling, and usability metrics.
                </p>

                <div className="flex flex-wrap items-center justify-between gap-4 pt-3 border-t border-slate-800/80">
                  <div className="flex gap-4 text-[10px] text-slate-400">
                    <span>Journal: IEEE Cognitive Systems (Preprint)</span>
                    <span>DOI: 10.1109/CCS.2024.02948</span>
                  </div>
                  <a href="https://github.com/karthikeya39g-af" target="_blank" rel="noreferrer" className="text-xs text-indigo-400 font-bold flex items-center gap-1 hover:underline">
                    <span>Download PDF Paper</span>
                    <Download className="w-3.5 h-3.5" />
                  </a>
                </div>
              </div>
            </section>

            {/* 14. PUBLICATIONS & 15. OPEN SOURCE */}
            <div className="grid md:grid-cols-2 gap-6 mt-6">
              <section className="bg-slate-900/30 border border-slate-800 p-6 rounded-2xl space-y-4">
                <h2 className="text-sm font-bold text-white uppercase tracking-widest border-b border-slate-800 pb-3">
                  Technical Publications & Blogs
                </h2>
                <div className="space-y-4">
                  <div className="border border-slate-800 p-3 rounded-lg hover:border-slate-700 transition-colors">
                    <h4 className="text-xs font-bold text-white hover:text-indigo-400 cursor-pointer">
                      How I Built an AI Study Guide Generator That Summarizes 100-Page PDFs in 10 Seconds
                    </h4>
                    <p className="text-[10px] text-slate-400 mt-1">Published on Medium • 12 Min Read</p>
                    <p className="text-[11px] text-slate-300 mt-2 leading-relaxed">
                      Deep dive into writing regex parsing structures, tf-idf document arrays, and ranking sentences for summaries.
                    </p>
                  </div>
                  <div className="border border-slate-800 p-3 rounded-lg hover:border-slate-700 transition-colors">
                    <h4 className="text-xs font-bold text-white hover:text-indigo-400 cursor-pointer">
                      Constraint Satisfaction in Custom Meal Recommenders
                    </h4>
                    <p className="text-[10px] text-slate-400 mt-1">Published on Dev.to • 7 Min Read</p>
                    <p className="text-[11px] text-slate-300 mt-2 leading-relaxed">
                      Explores structural logic loops in Python to reconcile dietary constraints, caloric metrics, and user profiles.
                    </p>
                  </div>
                </div>
              </section>

              <section className="bg-slate-900/30 border border-slate-800 p-6 rounded-2xl space-y-4">
                <h2 className="text-sm font-bold text-white uppercase tracking-widest border-b border-slate-800 pb-3">
                  Open Source Contributions
                </h2>
                <div className="space-y-4">
                  <div className="flex justify-between items-start border-b border-slate-850 pb-3">
                    <div>
                      <h4 className="text-xs font-bold text-slate-200">scikit-learn/scikit-learn</h4>
                      <p className="text-[10px] text-slate-400">Merged Pull Request #2918</p>
                      <p className="text-xs text-slate-300 mt-1">Patched parameter validation thresholds on classification heuristics.</p>
                    </div>
                    <span className="text-[10px] px-2 py-0.5 bg-indigo-950/40 text-indigo-400 border border-indigo-900/30 rounded font-mono">
                      +12 Lines
                    </span>
                  </div>

                  <div className="flex justify-between items-start">
                    <div>
                      <h4 className="text-xs font-bold text-slate-200">langchain-ai/langchain</h4>
                      <p className="text-[10px] text-slate-400">Issue Solved #8304</p>
                      <p className="text-xs text-slate-300 mt-1">Identified and resolved memory leakage vectors on local file parsers.</p>
                    </div>
                    <span className="text-[10px] px-2 py-0.5 bg-indigo-950/40 text-indigo-400 border border-indigo-900/30 rounded font-mono">
                      Resolved
                    </span>
                  </div>
                </div>
              </section>
            </div>
          </motion.div>
        )}

        {/* 3. SKILLS TAB */}
        {activeTab === 'skills' && (
          <motion.div
            key="skills-tab"
            variants={slide3DVariants}
            initial="initial"
            animate="animate"
            exit="exit"
            className="space-y-8"
          >
            
            {/* 5. TECHNICAL SKILLS GRID */}
            <section className="bg-slate-900/30 border border-slate-800 p-6 rounded-2xl">
              <h2 className="text-sm font-bold text-white uppercase tracking-widest border-b border-slate-800 pb-3 mb-6">
                Technical Stack & Tools
              </h2>
              
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: 0.1 }}
                >
                  <h3 className="text-xs font-bold text-indigo-400 uppercase tracking-widest mb-3">AI / Machine Learning</h3>
                  <div className="flex flex-wrap gap-2">
                    {['TensorFlow', 'PyTorch', 'Scikit-Learn', 'NLP', 'Data Preprocessing', 'Model Evaluation', 'Google Gemini API', 'LangChain', 'OpenCV', 'Pandas', 'NumPy', 'Librosa'].map((skill, idx) => (
                      <span key={idx} className="px-3 py-1.5 bg-indigo-500/10 text-indigo-400 border border-indigo-500/20 rounded-xl text-xs hover:bg-indigo-500/25 transition-all">
                        {skill}
                      </span>
                    ))}
                  </div>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: 0.2 }}
                >
                  <h3 className="text-xs font-bold text-purple-400 uppercase tracking-widest mb-3">Programming & Backend</h3>
                  <div className="flex flex-wrap gap-2">
                    {['Python', 'JavaScript (ES6+)', 'TypeScript', 'Java', 'SQL', 'C', 'Node.js', 'Express.js', 'FastAPI', 'Flask'].map((skill, idx) => (
                      <span key={idx} className="px-3 py-1.5 bg-purple-500/10 text-purple-400 border border-purple-500/20 rounded-xl text-xs hover:bg-purple-500/25 transition-all">
                        {skill}
                      </span>
                    ))}
                  </div>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: 0.3 }}
                >
                  <h3 className="text-xs font-bold text-violet-400 uppercase tracking-widest mb-3">Frontend & Databases</h3>
                  <div className="flex flex-wrap gap-2">
                    {['React.js', 'HTML5', 'CSS3', 'Responsive Design', 'Tailwind CSS', 'Bootstrap', 'Vite', 'Next.js', 'MySQL', 'MongoDB', 'PostgreSQL', 'ChromaDB'].map((skill, idx) => (
                      <span key={idx} className="px-3 py-1.5 bg-violet-500/10 text-violet-400 border border-violet-500/20 rounded-xl text-xs hover:bg-violet-500/25 transition-all">
                        {skill}
                      </span>
                    ))}
                  </div>
                </motion.div>
              </div>
            </section>

            {/* 27. EXTRAS: INTERACTIVE SKILL GRAPH (SVG-based) */}
            <section className="bg-slate-900/30 border border-slate-800 p-6 rounded-2xl">
              <h2 className="text-sm font-bold text-white uppercase tracking-widest border-b border-slate-800 pb-3 mb-6">
                Interactive Competency Radar Map
              </h2>
              <div className="grid md:grid-cols-2 gap-8 items-center">
                {/* Visual SVG Map */}
                <div className="flex justify-center p-4 bg-slate-950/40 rounded-xl border border-slate-850">
                  <svg viewBox="0 0 200 200" className="w-56 h-56">
                    {/* Background concentric circles */}
                    <circle cx="100" cy="100" r="80" fill="none" stroke="#1e293b" strokeWidth="1" />
                    <circle cx="100" cy="100" r="60" fill="none" stroke="#1e293b" strokeWidth="1" />
                    <circle cx="100" cy="100" r="40" fill="none" stroke="#1e293b" strokeWidth="1" />
                    <circle cx="100" cy="100" r="20" fill="none" stroke="#1e293b" strokeWidth="1" />
                    
                    {/* Radar spokes */}
                    <line x1="100" y1="20" x2="100" y2="180" stroke="#1e293b" strokeWidth="1" />
                    <line x1="20" y1="100" x2="180" y2="100" stroke="#1e293b" strokeWidth="1" />
                    <line x1="43.4" y1="43.4" x2="156.6" y2="156.6" stroke="#1e293b" strokeWidth="1" />
                    <line x1="43.4" y1="156.6" x2="156.6" y2="43.4" stroke="#1e293b" strokeWidth="1" />

                    {/* Skill points connecting area */}
                    {/* Order: Python, ML/NLP, React, Backend, Databases, Java, SQL, Git/Docker */}
                    <polygon
                      points="100,32 153,47 100,100 156,100 135,135 100,164 43,157 58,58"
                      fill="rgba(16, 185, 129, 0.15)"
                      stroke="#10b981"
                      strokeWidth="1.5"
                    />

                    {/* Nodes */}
                    <circle cx="100" cy="32" r="3" fill="#10b981" />
                    <circle cx="153" cy="47" r="3" fill="#10b981" />
                    <circle cx="156" cy="100" r="3" fill="#10b981" />
                    <circle cx="135" cy="135" r="3" fill="#10b981" />
                    <circle cx="100" cy="164" r="3" fill="#10b981" />
                    <circle cx="43" cy="157" r="3" fill="#10b981" />
                    <circle cx="58" cy="58" r="3" fill="#10b981" />

                    {/* Labels */}
                    <text x="100" y="15" textAnchor="middle" fill="#94a3b8" fontSize="8" fontWeight="bold">Python</text>
                    <text x="165" y="45" textAnchor="start" fill="#94a3b8" fontSize="8" fontWeight="bold">AI/ML</text>
                    <text x="165" y="103" textAnchor="start" fill="#94a3b8" fontSize="8" fontWeight="bold">React</text>
                    <text x="142" y="145" textAnchor="start" fill="#94a3b8" fontSize="8" fontWeight="bold">APIs</text>
                    <text x="100" y="190" textAnchor="middle" fill="#94a3b8" fontSize="8" fontWeight="bold">Databases</text>
                    <text x="35" y="165" textAnchor="end" fill="#94a3b8" fontSize="8" fontWeight="bold">Java</text>
                    <text x="45" y="55" textAnchor="end" fill="#94a3b8" fontSize="8" fontWeight="bold">Git/DevOps</text>
                  </svg>
                </div>

                {/* Legend & Summary */}
                <div className="space-y-4">
                  <h3 className="text-sm font-bold text-white">Engineering Focus Breakdown</h3>
                  <p className="text-xs text-slate-300 leading-relaxed">
                    This radar chart maps my relative mastery levels across core domains of the AI Engineering workspace. 
                    I emphasize strong competency in **Python and core ML pipelines** (classification models and text parsers), backed by stable **React development** for accessible interfaces, and **structured databases** (SQL/NoSQL) to store system states securely.
                  </p>
                  <div className="grid grid-cols-2 gap-3 text-xs text-slate-400">
                    <div className="flex items-center gap-2">
                      <span className="w-2.5 h-2.5 rounded-full bg-indigo-500"></span>
                      <span>Python Heuristics: 90%</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="w-2.5 h-2.5 rounded-full bg-purple-500"></span>
                      <span>ML & NLP: 85%</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="w-2.5 h-2.5 rounded-full bg-blue-400"></span>
                      <span>Core OOP & Java: 75%</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="w-2.5 h-2.5 rounded-full bg-teal-400"></span>
                      <span>APIs & Full-Stack: 80%</span>
                    </div>
                  </div>
                </div>
              </div>
            </section>

            {/* 6. SOFT SKILLS & 7. SERVICES CARRIED OUT */}
            <div className="grid md:grid-cols-2 gap-6">
              <motion.section
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: 0.1 }}
                className="bg-slate-900/30 border border-slate-800 p-6 rounded-2xl space-y-4"
              >
                <h2 className="text-sm font-bold text-white uppercase tracking-widest border-b border-slate-800 pb-3">
                  Soft Skills
                </h2>
                <div className="grid grid-cols-2 gap-3">
                  {[
                    { name: 'Problem Solving', desc: 'Analyzing bottlenecks.' },
                    { name: 'Teamwork', desc: 'Collaborative development.' },
                    { name: 'Leadership', desc: 'Department coordination.' },
                    { name: 'Communication', desc: 'Clear documentation.' },
                    { name: 'Critical Thinking', desc: 'Architecting system paths.' },
                    { name: 'Time Management', desc: 'Meeting project sprints.' }
                  ].map((skill, idx) => (
                    <div key={idx} className="p-3 bg-slate-900/40 border border-slate-850 rounded-xl">
                      <h4 className="text-xs font-bold text-white">{skill.name}</h4>
                      <p className="text-[10px] text-slate-400 mt-0.5">{skill.desc}</p>
                    </div>
                  ))}
                </div>
              </motion.section>

              <motion.section
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="bg-slate-900/30 border border-slate-800 p-6 rounded-2xl space-y-4"
              >
                <h2 className="text-sm font-bold text-white uppercase tracking-widest border-b border-slate-800 pb-3">
                  Services Offered
                </h2>
                <div className="grid grid-cols-1 gap-3">
                  {[
                    { name: 'AI & ML Development', desc: 'Developing classifiers, speech pipelines, text-summarizers, and embedding search mechanisms.' },
                    { name: 'Web & API Engineering', desc: 'Structuring responsive React applications, backed by FastAPI or Express.js server layers.' },
                    { name: 'Data Analysis & Visualizations', desc: 'Wrangling high-dimensional datasets with Pandas & NumPy to formulate visual reports.' }
                  ].map((srv, idx) => (
                    <div key={idx} className="flex items-start gap-3 p-3 bg-slate-900/40 border border-slate-850 rounded-xl hover:border-indigo-500/20 transition-all">
                      <div className="p-2 bg-indigo-950/40 text-indigo-400 border border-indigo-900/30 rounded-lg shrink-0">
                        <CheckCircle className="w-4 h-4" />
                      </div>
                      <div>
                        <h4 className="text-xs font-bold text-white">{srv.name}</h4>
                        <p className="text-[10px] text-slate-400 mt-1 leading-relaxed">{srv.desc}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </motion.section>
            </div>
          </motion.div>
        )}

        {/* 4. EXPERIENCE & ACHIEVEMENTS TAB */}
        {activeTab === 'experience' && (
          <motion.div
            key="experience-tab"
            variants={slide3DVariants}
            initial="initial"
            animate="animate"
            exit="exit"
            className="space-y-8"
          >
            
            {/* SUB-TAB SELECTION */}
            <div className="flex border-b border-slate-800 pb-px gap-2 overflow-x-auto scrollbar-none">
              <button
                onClick={() => setExperienceSubTab('vishwam')}
                className={`px-4 py-3 text-xs uppercase font-bold tracking-wider border-b-2 transition-all shrink-0 cursor-pointer ${
                  experienceSubTab === 'vishwam'
                    ? 'border-indigo-500 text-indigo-400 bg-indigo-500/5'
                    : 'border-transparent text-slate-400 hover:text-white'
                }`}
              >
                Vishwam AI (Present)
              </button>
              <button
                onClick={() => setExperienceSubTab('indianservers')}
                className={`px-4 py-3 text-xs uppercase font-bold tracking-wider border-b-2 transition-all shrink-0 cursor-pointer ${
                  experienceSubTab === 'indianservers'
                    ? 'border-purple-500 text-purple-400 bg-purple-500/5'
                    : 'border-transparent text-slate-400 hover:text-white'
                }`}
              >
                Indian Servers (ML)
              </button>
              <button
                onClick={() => setExperienceSubTab('achievements')}
                className={`px-4 py-3 text-xs uppercase font-bold tracking-wider border-b-2 transition-all shrink-0 cursor-pointer ${
                  experienceSubTab === 'achievements'
                    ? 'border-blue-500 text-blue-400 bg-blue-500/5'
                    : 'border-transparent text-slate-400 hover:text-white'
                }`}
              >
                College Achievements
              </button>
            </div>

            <AnimatePresence mode="wait">
              {experienceSubTab === 'vishwam' && (
                <motion.div
                  key="vishwam"
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -15 }}
                  transition={{ duration: 0.3 }}
                  className="space-y-6"
                >
                  {/* Internship Card Header */}
                  <div className="bg-slate-900/40 border border-slate-800 p-6 rounded-2xl relative overflow-hidden group hover:border-indigo-500/30 transition-all shadow-xl">
                    <div className="absolute -top-12 -right-12 w-32 h-32 bg-indigo-500/10 rounded-full blur-2xl group-hover:bg-indigo-500/15 transition-all"></div>
                    
                    <div className="flex flex-col md:flex-row justify-between md:items-start gap-4 border-b border-slate-800 pb-4 mb-4">
                      <div>
                        <div className="flex flex-wrap items-center gap-2">
                          <h2 className="text-base font-extrabold text-white flex items-center gap-2">
                            <Briefcase className="w-5 h-5 text-indigo-400" />
                            <span>AI Developer Intern</span>
                          </h2>
                          <span className="px-2 py-0.5 text-[9px] font-mono text-indigo-400 bg-indigo-950/40 border border-indigo-900/30 rounded-full">
                            Vibe Coding Specialist
                          </span>
                        </div>
                        <p className="text-sm text-slate-300 font-semibold mt-1">Vishwam AI (Internship)</p>
                        <p className="text-xs text-slate-400 flex items-center gap-1.5 mt-1">
                          <MapPin className="w-3.5 h-3.5 text-slate-500" /> Remote
                        </p>
                      </div>
                      
                      <div className="text-right flex md:flex-col items-center md:items-end justify-between md:justify-start gap-2">
                        <span className="text-[10px] font-mono text-indigo-400 bg-indigo-950/40 border border-indigo-900/30 px-2.5 py-1 rounded">
                          Present (Active)
                        </span>
                        <span className="text-[10px] text-slate-500 font-mono flex items-center gap-1">
                          <Calendar className="w-3 h-3" /> Oct 2025 - Present
                        </span>
                      </div>
                    </div>

                    <div className="space-y-4">
                      <div className="bg-slate-950/40 p-4 rounded-xl border border-slate-850">
                        <h4 className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-2">Professional Summary</h4>
                        <p className="text-xs text-slate-300 leading-relaxed">
                          As an AI Developer Intern at Vishwam, I work on AI-assisted software development using modern <span className="text-indigo-400 font-semibold">Vibe Coding practices</span>. My responsibilities include designing and developing intelligent applications, enhancing UI/UX, implementing frontend and backend features, integrating AI workflows, improving software compliance, writing automated tests, and collaborating through GitLab using professional development workflows.
                        </p>
                        <p className="text-xs text-slate-300 leading-relaxed mt-2">
                          I actively contribute to multiple production and open-source projects by creating feature branches, raising merge requests, resolving merge conflicts, reviewing code, participating in issue discussions, and maintaining CI/CD pipelines. My work focuses on delivering scalable, maintainable, and user-friendly software while leveraging AI tools to accelerate development and improve code quality.
                        </p>
                      </div>

                      {/* Internship Highlights Indicators */}
                      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                        <div className="p-3 bg-slate-800/20 border border-slate-800/60 rounded-xl flex items-center gap-3">
                          <div className="p-2 bg-indigo-950/40 text-indigo-400 border border-indigo-900/40 rounded-lg">
                            <Layers className="w-4 h-4" />
                          </div>
                          <div>
                            <span className="block text-xs font-bold text-white">4+ Active Projects</span>
                            <span className="text-[9px] text-slate-400">Simultaneous contribution</span>
                          </div>
                        </div>

                        <div className="p-3 bg-slate-800/20 border border-slate-800/60 rounded-xl flex items-center gap-3">
                          <div className="p-2 bg-indigo-950/40 text-indigo-400 border border-indigo-900/40 rounded-lg">
                            <Sparkles className="w-4 h-4" />
                          </div>
                          <div>
                            <span className="block text-xs font-bold text-white">Vibe Coding</span>
                            <span className="text-[9px] text-slate-400">AI-assisted acceleration</span>
                          </div>
                        </div>

                        <div className="p-3 bg-slate-800/20 border border-slate-800/60 rounded-xl flex items-center gap-3">
                          <div className="p-2 bg-indigo-950/40 text-indigo-400 border border-indigo-900/40 rounded-lg">
                            <CheckCircle className="w-4 h-4" />
                          </div>
                          <div>
                            <span className="block text-xs font-bold text-white">E2E Automation</span>
                            <span className="text-[9px] text-slate-400">Playwright verification</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Major Contributions Switcher & Card */}
                  <div className="space-y-4">
                    <div className="flex items-center justify-between border-b border-slate-800 pb-2">
                      <h3 className="text-xs font-extrabold text-white uppercase tracking-widest flex items-center gap-2">
                        <Code2 className="w-4 h-4 text-indigo-400" />
                        <span>Major Contributions (4 Active Projects)</span>
                      </h3>
                      <span className="text-[10px] font-mono text-slate-500">Click to inspect project scope</span>
                    </div>

                    {/* Horizontal tabs */}
                    <div className="flex gap-2 overflow-x-auto pb-1 scrollbar-none">
                      {[
                        { id: 'ehrs', name: 'eHRS Medical Camp' },
                        { id: 'fuelreach', name: 'FuelReach' },
                        { id: 'saarthi', name: 'Saarthi AI' },
                        { id: 'builder', name: 'AI Website Builder' }
                      ].map(proj => (
                        <button
                          key={proj.id}
                          onClick={() => setActiveContributionProject(proj.id as any)}
                          className={`px-3 py-2 text-xs rounded-xl border font-bold transition-all shrink-0 cursor-pointer ${
                            activeContributionProject === proj.id
                              ? 'bg-indigo-950/50 text-indigo-400 border-indigo-500/50 shadow-lg shadow-indigo-500/5'
                              : 'bg-slate-900/20 text-slate-400 border-slate-800/80 hover:border-slate-700'
                          }`}
                        >
                          {proj.name}
                        </button>
                      ))}
                    </div>

                    <AnimatePresence mode="wait">
                      {activeContributionProject === 'ehrs' && (
                        <motion.div
                          key="ehrs"
                          initial={{ opacity: 0, x: 10 }}
                          animate={{ opacity: 1, x: 0 }}
                          exit={{ opacity: 0, x: -10 }}
                          transition={{ duration: 0.2 }}
                          className="p-5 bg-slate-900/20 border border-slate-800 rounded-xl space-y-4"
                        >
                          <div className="flex justify-between items-start border-b border-slate-850 pb-3">
                            <div>
                              <h4 className="text-sm font-bold text-white">eHRS Medical Camp</h4>
                              <p className="text-[11px] text-slate-400 mt-0.5">Healthcare Management Platform</p>
                            </div>
                            <span className="text-[10px] font-mono text-indigo-400 bg-indigo-950/40 border border-indigo-900/30 px-2 py-0.5 rounded-full">
                              Active Contributor
                            </span>
                          </div>
                          
                          <p className="text-xs text-slate-300 leading-relaxed">
                            Worked on improving the patient care dashboard, medicine logistical layout, and mobile-responsiveness of an active healthcare management platform. Assured quality and functional stability with automated end-to-end tests.
                          </p>

                          <div>
                            <h5 className="text-[11px] font-extrabold text-slate-400 uppercase tracking-widest mb-2">Key Areas of Improvement</h5>
                            <div className="grid md:grid-cols-2 gap-2 text-xs">
                              {[
                                'Mobile UI/UX responsive interface optimizations',
                                'Family grouping features & logic enhancements',
                                'Patient dashboard improvements & detailed summary panels',
                                'Medicine list search and layout optimizations',
                                'KYP (Know Your Patient) date bug fixes',
                                'Playwright E2E automation testing suites',
                                'Patient previews & history validation overlays',
                                'Responsive layout alignment adjustments across mobile screen factors'
                              ].map((item, idx) => (
                                <div key={idx} className="flex items-start gap-2 text-slate-300">
                                  <CheckCircle className="w-3.5 h-3.5 text-indigo-400 mt-0.5 shrink-0" />
                                  <span>{item}</span>
                                </div>
                              ))}
                            </div>
                          </div>

                          <div className="flex flex-wrap gap-1.5 pt-2 border-t border-slate-850">
                            {['React', 'TypeScript', 'Playwright', 'UI/UX', 'Mobile Responsive', 'Family Grouping', 'Logistics'].map((t, i) => (
                              <span key={i} className="text-[9px] font-mono px-2 py-0.5 bg-slate-800 text-slate-300 border border-slate-700/50 rounded">
                                {t}
                              </span>
                            ))}
                          </div>
                        </motion.div>
                      )}

                      {activeContributionProject === 'fuelreach' && (
                        <motion.div
                          key="fuelreach"
                          initial={{ opacity: 0, x: 10 }}
                          animate={{ opacity: 1, x: 0 }}
                          exit={{ opacity: 0, x: -10 }}
                          transition={{ duration: 0.2 }}
                          className="p-5 bg-slate-900/20 border border-slate-800 rounded-xl space-y-4"
                        >
                          <div className="flex justify-between items-start border-b border-slate-850 pb-3">
                            <div>
                              <h4 className="text-sm font-bold text-white">FuelReach</h4>
                              <p className="text-[11px] text-slate-400 mt-0.5">Emergency Fuel Delivery Logistics Service</p>
                            </div>
                            <span className="text-[10px] font-mono text-indigo-400 bg-indigo-950/40 border border-indigo-900/30 px-2 py-0.5 rounded-full">
                              Lead Feature Architect
                            </span>
                          </div>

                          <p className="text-xs text-slate-300 leading-relaxed">
                            Architected major features for a real-time emergency vehicle fueling system, modernizing its repository structure, setting up backend routing with PostgreSQL, and managing automatic CI/CD pipeline structures.
                          </p>

                          <div>
                            <h5 className="text-[11px] font-extrabold text-slate-400 uppercase tracking-widest mb-2">Major Features Implemented</h5>
                            <div className="grid md:grid-cols-2 gap-2 text-xs">
                              {[
                                'Live location tracking with interactive map dashboards',
                                'Emergency fuel delivery dispatch workflows & loops',
                                'Rider dashboard for active tracking & updates',
                                'Delivery partner dispatch interface controls',
                                'Highway route generation and layout UI widgets',
                                'Scooter management module for fleet operations',
                                'Help & Support modules and ticket systems',
                                'Compliance automation checklists & logs',
                                'Metadata configurations & pipeline modernization',
                                'PostgreSQL schemas & FastAPI migration planning'
                              ].map((item, idx) => (
                                <div key={idx} className="flex items-start gap-2 text-slate-300">
                                  <CheckCircle className="w-3.5 h-3.5 text-indigo-400 mt-0.5 shrink-0" />
                                  <span>{item}</span>
                                </div>
                              ))}
                            </div>
                          </div>

                          <div className="flex flex-wrap gap-1.5 pt-2 border-t border-slate-850">
                            {['FastAPI', 'PostgreSQL', 'Live Maps', 'Rider Routing', 'Fleet Management', 'GitLab CI', 'Compliance'].map((t, i) => (
                              <span key={i} className="text-[9px] font-mono px-2 py-0.5 bg-slate-800 text-slate-300 border border-slate-700/50 rounded">
                                {t}
                              </span>
                            ))}
                          </div>
                        </motion.div>
                      )}

                      {activeContributionProject === 'saarthi' && (
                        <motion.div
                          key="saarthi"
                          initial={{ opacity: 0, x: 10 }}
                          animate={{ opacity: 1, x: 0 }}
                          exit={{ opacity: 0, x: -10 }}
                          transition={{ duration: 0.2 }}
                          className="p-5 bg-slate-900/20 border border-slate-800 rounded-xl space-y-4"
                        >
                          <div className="flex justify-between items-start border-b border-slate-850 pb-3">
                            <div>
                              <h4 className="text-sm font-bold text-white">Saarthi AI</h4>
                              <p className="text-[11px] text-slate-400 mt-0.5">Conversational AI Chatbot Assistant</p>
                            </div>
                            <span className="text-[10px] font-mono text-indigo-400 bg-indigo-950/40 border border-indigo-900/30 px-2 py-0.5 rounded-full">
                              Core MVP Developer
                            </span>
                          </div>

                          <p className="text-xs text-slate-300 leading-relaxed">
                            Contributed to the frontend MVP and continuous integration pipeline for Saarthi AI, ensuring smooth deployment loops and active participation in cross-team code audits.
                          </p>

                          <div>
                            <h5 className="text-[11px] font-extrabold text-slate-400 uppercase tracking-widest mb-2">Core Contributions</h5>
                            <div className="grid md:grid-cols-2 gap-2 text-xs">
                              {[
                                'Developed the primary frontend MVP UI for the assistant',
                                'Established the GitLab CI pipeline configuration scripts',
                                'Integrated the conversational AI chatbot interface controls',
                                'Reviewed team Merge Requests (MRs) to enforce syntax sanity'
                              ].map((item, idx) => (
                                <div key={idx} className="flex items-start gap-2 text-slate-300">
                                  <CheckCircle className="w-3.5 h-3.5 text-indigo-400 mt-0.5 shrink-0" />
                                  <span>{item}</span>
                                </div>
                              ))}
                            </div>
                          </div>

                          <div className="flex flex-wrap gap-1.5 pt-2 border-t border-slate-850">
                            {['React', 'Chatbot UI', 'GitLab CI', 'MR Auditing', 'MVP Prototyping', 'Google Gemini API'].map((t, i) => (
                              <span key={i} className="text-[9px] font-mono px-2 py-0.5 bg-slate-800 text-slate-300 border border-slate-700/50 rounded">
                                {t}
                              </span>
                            ))}
                          </div>
                        </motion.div>
                      )}

                      {activeContributionProject === 'builder' && (
                        <motion.div
                          key="builder"
                          initial={{ opacity: 0, x: 10 }}
                          animate={{ opacity: 1, x: 0 }}
                          exit={{ opacity: 0, x: -10 }}
                          transition={{ duration: 0.2 }}
                          className="p-5 bg-slate-900/20 border border-slate-800 rounded-xl space-y-4"
                        >
                          <div className="flex justify-between items-start border-b border-slate-850 pb-3">
                            <div>
                              <h4 className="text-sm font-bold text-white">AI Website Builder (WhatsApp Trigger)</h4>
                              <p className="text-[11px] text-slate-400 mt-0.5">Automated Website Generation Pipeline</p>
                            </div>
                            <span className="text-[10px] font-mono text-indigo-400 bg-indigo-950/40 border border-indigo-900/30 px-2 py-0.5 rounded-full">
                              Interface & Workflow Engineer
                            </span>
                          </div>

                          <p className="text-xs text-slate-300 leading-relaxed">
                            Assisted in the design and initialization of an automated website builder that generates templates triggered directly by messaging commands from chat channels like WhatsApp.
                          </p>

                          <div>
                            <h5 className="text-[11px] font-extrabold text-slate-400 uppercase tracking-widest mb-2">Key Areas Managed</h5>
                            <div className="grid md:grid-cols-2 gap-2 text-xs">
                              {[
                                'Developed the visual Chatbot Interface simulator',
                                'Fixed critical metadata attributes and repository definitions',
                                'Improved UI/UX of preview drawers and template selections',
                                'Coordinated initial project scaffold & structure patterns',
                                'Collaborated on feature planning & command triggers'
                              ].map((item, idx) => (
                                <div key={idx} className="flex items-start gap-2 text-slate-300">
                                  <CheckCircle className="w-3.5 h-3.5 text-indigo-400 mt-0.5 shrink-0" />
                                  <span>{item}</span>
                                </div>
                              ))}
                            </div>
                          </div>

                          <div className="flex flex-wrap gap-1.5 pt-2 border-t border-slate-850">
                            {['WhatsApp Trigger', 'Chatbot Simulation', 'Metadata Fixes', 'UI/UX Polish', 'Node.js', 'Vite'].map((t, i) => (
                              <span key={i} className="text-[9px] font-mono px-2 py-0.5 bg-slate-800 text-slate-300 border border-slate-700/50 rounded">
                                {t}
                              </span>
                            ))}
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>

                  {/* Core Team Workflows */}
                  <div className="bg-slate-900/20 border border-slate-800 p-6 rounded-2xl space-y-4">
                    <h3 className="text-xs font-bold text-white uppercase tracking-widest border-b border-slate-800 pb-2 mb-3">
                      Professional Team Workflows
                    </h3>
                    <div className="grid md:grid-cols-3 gap-4">
                      <div className="p-4 bg-slate-950/30 border border-slate-850 rounded-xl space-y-2 hover:border-indigo-500/10 transition-colors">
                        <div className="flex items-center gap-2">
                          <GitBranch className="w-4 h-4 text-indigo-400" />
                          <h4 className="text-xs font-bold text-white">Git Workflow</h4>
                        </div>
                        <ul className="text-[11px] text-slate-400 space-y-1 list-disc pl-3">
                          <li>Feature Branch strategy development</li>
                          <li>Clean Merge Requests (MRs) & code cycles</li>
                          <li>In-depth code review audits & approvals</li>
                          <li>Merge conflict resolutions & git trees</li>
                          <li>Sprint issue tracking & agile coordination</li>
                        </ul>
                      </div>

                      <div className="p-4 bg-slate-950/30 border border-slate-850 rounded-xl space-y-2 hover:border-indigo-500/10 transition-colors">
                        <div className="flex items-center gap-2">
                          <Server className="w-4 h-4 text-indigo-400" />
                          <h4 className="text-xs font-bold text-white">DevOps & CI/CD</h4>
                        </div>
                        <ul className="text-[11px] text-slate-400 space-y-1 list-disc pl-3">
                          <li>GitLab Pipeline builds & run loops</li>
                          <li>Continuous Integration checks & scripts</li>
                          <li>Repository compliance automation</li>
                          <li>Metadata & Docker file configs</li>
                          <li>Automation checks to reduce manual load</li>
                        </ul>
                      </div>

                      <div className="p-4 bg-slate-950/30 border border-slate-850 rounded-xl space-y-2 hover:border-indigo-500/10 transition-colors">
                        <div className="flex items-center gap-2">
                          <ShieldCheck className="w-4 h-4 text-indigo-400" />
                          <h4 className="text-xs font-bold text-white">Test Automation</h4>
                        </div>
                        <ul className="text-[11px] text-slate-400 space-y-1 list-disc pl-3">
                          <li>Playwright E2E integration tests</li>
                          <li>Automated UI validation processes</li>
                          <li>Feature regression verification suites</li>
                          <li>Responsive layout testing on device matrix</li>
                          <li>Form behavior testing & validation logs</li>
                        </ul>
                      </div>
                    </div>
                  </div>

                  {/* Skills Developed */}
                  <div className="bg-slate-900/20 border border-slate-800 p-6 rounded-2xl space-y-4">
                    <h3 className="text-xs font-bold text-white uppercase tracking-widest border-b border-slate-800 pb-2 mb-3">
                      Key Competency Focus
                    </h3>
                    <div className="grid md:grid-cols-3 gap-6">
                      <div>
                        <h4 className="text-[10px] font-bold text-indigo-400 uppercase tracking-wider mb-2">AI Development</h4>
                        <div className="flex flex-wrap gap-1">
                          {['AI-assisted coding', 'Prompt engineering', 'Workflow automation', 'Intelligent software'].map((sk, i) => (
                            <span key={i} className="text-[10px] px-2 py-1 bg-indigo-950/20 text-indigo-300 border border-indigo-900/30 rounded-lg">
                              {sk}
                            </span>
                          ))}
                        </div>
                      </div>
                      <div>
                        <h4 className="text-[10px] font-bold text-indigo-400 uppercase tracking-wider mb-2">Software Engineering</h4>
                        <div className="flex flex-wrap gap-1">
                          {['Clean code practices', 'Modular architecture', 'Feature development', 'Code reviews', 'Documentation'].map((sk, i) => (
                            <span key={i} className="text-[10px] px-2 py-1 bg-indigo-950/20 text-indigo-300 border border-indigo-900/30 rounded-lg">
                              {sk}
                            </span>
                          ))}
                        </div>
                      </div>
                      <div>
                        <h4 className="text-[10px] font-bold text-indigo-400 uppercase tracking-wider mb-2">Agile Collaboration</h4>
                        <div className="flex flex-wrap gap-1">
                          {['Agile workflow', 'Team collaboration', 'Sprint planning', 'Issue tracking', 'Merge requests'].map((sk, i) => (
                            <span key={i} className="text-[10px] px-2 py-1 bg-indigo-950/20 text-indigo-300 border border-indigo-900/30 rounded-lg">
                              {sk}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                </motion.div>
              )}

              {experienceSubTab === 'indianservers' && (
                <motion.div
                  key="indianservers"
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -15 }}
                  transition={{ duration: 0.3 }}
                  className="space-y-6"
                >
                  <div className="bg-slate-900/40 border border-slate-800 p-6 rounded-2xl relative overflow-hidden group hover:border-purple-500/30 transition-all shadow-xl">
                    <div className="absolute -top-12 -right-12 w-32 h-32 bg-purple-500/10 rounded-full blur-2xl group-hover:bg-purple-500/15 transition-all"></div>
                    
                    <div className="flex flex-col md:flex-row justify-between md:items-start gap-4 border-b border-slate-800 pb-4 mb-4">
                      <div>
                        <h3 className="text-base font-extrabold text-white flex items-center gap-2">
                          <Briefcase className="w-5 h-5 text-purple-400" />
                          <span>AI & ML Model Design Intern</span>
                        </h3>
                        <p className="text-sm text-slate-300 font-semibold mt-1">Indian Servers (Software Development Company)</p>
                        <p className="text-xs text-slate-400 flex items-center gap-1.5 mt-1">
                          <MapPin className="w-3.5 h-3.5 text-slate-500" /> On-Site / Hybrid
                        </p>
                      </div>
                      
                      <div className="text-right flex md:flex-col items-center md:items-end justify-between md:justify-start gap-2">
                        <span className="text-[10px] font-mono text-purple-400 bg-purple-950/40 border border-purple-900/30 px-2.5 py-1 rounded">
                          Summer Internship
                        </span>
                        <span className="text-[10px] text-slate-500 font-mono flex items-center gap-1">
                          <Calendar className="w-3 h-3" /> 2023 (2 Months)
                        </span>
                      </div>
                    </div>

                    <div className="space-y-4">
                      <p className="text-xs text-slate-300 leading-relaxed">
                        During this summer internship, I focused on model design research, building custom classifiers to handle multi-variate metrics, processing high-volume text databases, and optimizing manual operations via Python automations.
                      </p>

                      <ul className="space-y-3 text-xs text-slate-300 list-disc pl-4 leading-relaxed">
                        <li>
                          <strong>ML Classifiers</strong>: Designed and completed 3+ custom classification models, gaining an average precision lift of ~20% above historical baseline models.
                        </li>
                        <li>
                          <strong>Data Engineering</strong>: Cleaned and formatted a dataset containing 5,000+ customer records. Applied statistical checks to drop transcription outliers and reduced experimental noise.
                        </li>
                        <li>
                          <strong>R&D Prototyping</strong>: Managed practical research into supervised classifiers and tokenized parsing techniques, resulting in 2 stable project prototypes.
                        </li>
                        <li>
                          <strong>Automation Scripts</strong>: Structured Python terminal utility scripts that automated routine report exports, reducing team data-entry overheads by roughly 40%.
                        </li>
                      </ul>
                    </div>
                  </div>
                </motion.div>
              )}

              {experienceSubTab === 'achievements' && (
                <motion.div
                  key="achievements"
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -15 }}
                  transition={{ duration: 0.3 }}
                  className="space-y-6"
                >
                  <div className="grid md:grid-cols-2 gap-6">
                    <div className="p-6 bg-slate-900/40 border border-slate-800 rounded-2xl flex flex-col justify-between hover:border-blue-500/20 transition-all h-full">
                      <div className="space-y-4">
                        <div className="p-2.5 bg-blue-950/40 text-blue-400 border border-blue-900/50 rounded-lg w-11 h-11 flex items-center justify-center">
                          <Award className="w-5 h-5" />
                        </div>
                        <div>
                          <h3 className="text-sm font-bold text-white uppercase tracking-wider">Department Coordinator</h3>
                          <p className="text-xs text-slate-400 mt-1">NNRG Annual College Technical Fest</p>
                          <p className="text-xs text-slate-300 mt-3 leading-relaxed">
                            Represented the Computer Science Department during the college fest. Coordinated a team of 50+ student volunteers to manage 8 distinct technical coding events, with a turnout of over 300+ external registrants.
                          </p>
                        </div>
                      </div>
                      <span className="text-[10px] font-mono text-slate-500 mt-4 block">NNRG Fest Committee</span>
                    </div>

                    <div className="p-6 bg-slate-900/40 border border-slate-800 rounded-2xl flex flex-col justify-between hover:border-blue-500/20 transition-all h-full">
                      <div className="space-y-4">
                        <div className="p-2.5 bg-blue-950/40 text-blue-400 border border-blue-900/50 rounded-lg w-11 h-11 flex items-center justify-center">
                          <CheckCircle className="w-5 h-5" />
                        </div>
                        <div>
                          <h3 className="text-sm font-bold text-white uppercase tracking-wider">Awarded "Best Stall"</h3>
                          <p className="text-xs text-slate-400 mt-1">Inter-Department College Exhibition</p>
                          <p className="text-xs text-slate-300 mt-3 leading-relaxed">
                            Awarded first place among 20+ department teams for outstanding exhibit presentation, interactive technical prototypes, and clear collaborative presentation layout.
                          </p>
                        </div>
                      </div>
                      <span className="text-[10px] font-mono text-slate-500 mt-4 block">Inter-Department Exhibition</span>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        )}
        </AnimatePresence>



        {/* 26. CONSOLIDATED DOWNLOADS SECTION */}
        <section className="bg-slate-900/30 border border-slate-800 p-6 rounded-2xl mt-8">
          <h2 className="text-sm font-bold text-white uppercase tracking-widest border-b border-slate-800 pb-3 mb-6">
            Download Center
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-xs">
            <a
              href="https://github.com/karthikeya39g-af/portfolio/raw/main/karthikeya_resume.pdf"
              download
              className="p-3 bg-slate-800/40 border border-slate-750 rounded-xl flex flex-col justify-between hover:border-indigo-500/20 transition-all cursor-pointer text-slate-300"
            >
              <FileText className="w-5 h-5 text-indigo-400 mb-2" />
              <span className="font-bold text-white">Resume PDF</span>
              <span className="text-[9px] text-slate-500 mt-0.5">Download Latest</span>
            </a>
            
            <a
              href="https://github.com/karthikeya39g-af/portfolio/raw/main/programming_fundamentals.pdf"
              download
              className="p-3 bg-slate-800/40 border border-slate-750 rounded-xl flex flex-col justify-between hover:border-indigo-500/20 transition-all cursor-pointer text-slate-300"
            >
              <Award className="w-5 h-5 text-blue-400 mb-2" />
              <span className="font-bold text-white">Programming Cert</span>
              <span className="text-[9px] text-slate-500 mt-0.5">NxtWave Cert</span>
            </a>

            <a
              href="https://github.com/karthikeya39g-af/portfolio/raw/main/frontend_cert.pdf"
              download
              className="p-3 bg-slate-800/40 border border-slate-750 rounded-xl flex flex-col justify-between hover:border-indigo-500/20 transition-all cursor-pointer text-slate-300"
            >
              <Award className="w-5 h-5 text-teal-400 mb-2" />
              <span className="font-bold text-white">Frontend Cert</span>
              <span className="text-[9px] text-slate-500 mt-0.5">NxtWave Cert</span>
            </a>

            <a
              href="https://github.com/karthikeya39g-af/portfolio/raw/main/grammar_correction_paper.pdf"
              download
              className="p-3 bg-slate-800/40 border border-slate-750 rounded-xl flex flex-col justify-between hover:border-indigo-500/20 transition-all cursor-pointer text-slate-300"
            >
              <BookOpen className="w-5 h-5 text-indigo-400 mb-2" />
              <span className="font-bold text-white">Research Abstract</span>
              <span className="text-[9px] text-slate-500 mt-0.5">Academic PDF</span>
            </a>
          </div>
        </section>

        {/* BOTTOM ACCENTS: WORK PROCESS HIGHLIGHT & FOOTER */}
        <footer className="mt-12 pt-6 border-t border-slate-800/50 flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-slate-500">
          <div className="flex gap-4">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-indigo-400 animate-pulse"></span>
              <span className="text-[10px] uppercase tracking-wider font-bold">Seeking Internships 2024-2025</span>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <span>Portfolio crafted with react & tailwind</span>
            <span>•</span>
            <span>Last updated: June 2026</span>
          </div>
        </footer>
      </main>

      {/* CASE STUDY DETAIL MODAL */}
      {selectedProject && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-slate-900 border border-slate-800 rounded-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto p-6 relative">
            <button
              onClick={() => setSelectedProject(null)}
              className="absolute top-4 right-4 text-slate-400 hover:text-white cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="flex items-center gap-3 mb-4">
              <div className="p-3 bg-slate-850 border border-slate-800 rounded-xl">
                {selectedProject.icon}
              </div>
              <div>
                <span className="text-[10px] font-mono uppercase text-indigo-400 bg-indigo-950/40 border border-indigo-900/30 px-2 py-0.5 rounded">
                  {selectedProject.category === 'ai-ml' ? 'AI / ML Deep-Dive' : 'Core System'}
                </span>
                <h2 className="text-lg font-bold text-white mt-1">{selectedProject.name}</h2>
              </div>
            </div>

            <div className="space-y-6 text-xs text-slate-300 leading-relaxed">
              <div>
                <h4 className="text-[10px] uppercase font-bold text-indigo-400 tracking-widest mb-1">Project Description</h4>
                <p className="bg-slate-950/40 p-3 rounded-lg border border-slate-850">{selectedProject.description}</p>
              </div>

              <div>
                <h4 className="text-[10px] uppercase font-bold text-indigo-400 tracking-widest mb-2">Key Features Implemented</h4>
                <ul className="space-y-2 list-disc pl-4">
                  {selectedProject.features.map((feat, i) => (
                    <li key={i}>{feat}</li>
                  ))}
                </ul>
              </div>

              <div className="grid md:grid-cols-2 gap-4">
                <div className="bg-slate-950/40 p-3 rounded-lg border border-slate-850">
                  <h4 className="text-[10px] uppercase font-bold text-red-400 tracking-widest mb-1">Core Challenge Faced</h4>
                  <p>{selectedProject.challenges}</p>
                </div>
                <div className="bg-indigo-950/10 p-3 rounded-lg border border-indigo-950/40">
                  <h4 className="text-[10px] uppercase font-bold text-indigo-400 tracking-widest mb-1">My Engineered Solution</h4>
                  <p>{selectedProject.solution}</p>
                </div>
              </div>

              <div>
                <h4 className="text-[10px] uppercase font-bold text-indigo-400 tracking-widest mb-1">Key Learning Outcomes</h4>
                <p className="bg-slate-950/40 p-3 rounded-lg border border-slate-850">{selectedProject.learningOutcomes}</p>
              </div>

              <div>
                <h4 className="text-[10px] uppercase font-bold text-slate-500 tracking-widest mb-2">Technology Palette</h4>
                <div className="flex flex-wrap gap-1.5">
                  {selectedProject.tags.map((tag, i) => (
                    <span key={i} className="px-2 py-1 bg-slate-800 text-slate-300 border border-slate-750 rounded-lg">
                      {tag}
                    </span>
                  ))}
                </div>
              </div>

              <div className="flex gap-3 pt-4 border-t border-slate-800/80">
                <button
                  onClick={() => setSelectedProject(null)}
                  className="flex-1 bg-slate-800 hover:bg-slate-750 text-slate-300 font-semibold py-2.5 rounded-xl text-center cursor-pointer transition-colors text-xs"
                >
                  Close Case Study
                </button>
                <a
                  href={selectedProject.github}
                  target="_blank"
                  rel="noreferrer"
                  className="flex-1 bg-indigo-500 hover:bg-indigo-400 text-slate-950 font-bold py-2.5 rounded-xl text-center cursor-pointer transition-colors text-xs flex items-center justify-center gap-1.5"
                >
                  <Github className="w-4 h-4" />
                  <span>View GitHub Source</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* PDF RESUME PREVIEW MODAL */}
      {isResumeModalOpen && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-slate-900 border border-slate-800 rounded-2xl w-full max-w-4xl max-h-[90vh] overflow-y-auto p-6 relative flex flex-col">
            <button
              onClick={() => setIsResumeModalOpen(false)}
              className="absolute top-4 right-4 text-slate-400 hover:text-white cursor-pointer z-10"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="mb-4">
              <h2 className="text-base font-bold text-white">Karthikeya Veeramallu - Resume</h2>
              <p className="text-[10px] text-slate-400">Pursuing B.Tech Computer Science | Seeking AI & Software Engineering Internships</p>
            </div>

            {/* Simulated Clean Interactive Resume Canvas */}
            <div className="flex-1 bg-white text-slate-900 p-8 rounded-xl overflow-y-auto space-y-6 text-xs shadow-2xl">
              <div className="text-center border-b border-slate-200 pb-4">
                <h1 className="text-xl font-extrabold text-slate-900 uppercase">Karthikeya Veeramallu</h1>
                <p className="font-semibold text-blue-600 mt-1">B.Tech Student | AI Engineer Candidate</p>
                <p className="text-slate-500 mt-1">
                  📞 +91 9666356509 | ✉ karthikeya39g@gmail.com | 📍 Hyderabad, India
                </p>
                <p className="text-slate-500 text-[10px] mt-0.5">
                  LinkedIn: linkedin.com/in/karthikeya-datascience | GitHub: github.com/karthikeya39g-af
                </p>
              </div>

              <div>
                <h3 className="font-bold text-slate-900 border-b border-slate-300 pb-1 mb-2 text-xs uppercase tracking-wider">Career Objective</h3>
                <p className="text-slate-700 leading-relaxed text-[11px]">
                  Motivated B.Tech Computer Science student seeking internship roles in AI Engineering, Frontend, Backend, or Full Stack Development. Proficient in Python, JavaScript, React.js, Node.js, and AI/ML concepts, with hands-on experience building intelligent applications and scalable web systems. Eager to contribute technical skills and drive meaningful impact at innovative, forward-thinking companies.
                </p>
              </div>

              <div>
                <h3 className="font-bold text-slate-900 border-b border-slate-300 pb-1 mb-2 text-xs uppercase tracking-wider">Technical Skills</h3>
                <div className="grid grid-cols-2 gap-x-6 gap-y-1.5 text-[11px]">
                  <p><span className="font-bold">Languages:</span> Python, JavaScript (ES6+), Java, SQL</p>
                  <p><span className="font-bold">Frontend:</span> React.js, HTML5, CSS3, Responsive Design</p>
                  <p><span className="font-bold">Backend:</span> Node.js, Express.js, REST APIs</p>
                  <p><span className="font-bold">AI / ML:</span> NLP, Machine Learning, Data Preprocessing, Evaluation, Recommendation Systems</p>
                  <p><span className="font-bold">Databases:</span> MySQL, MongoDB, PostgreSQL</p>
                  <p><span className="font-bold">Tools & Concepts:</span> Git, GitHub, VS Code, OOP, Data Structures & Algorithms</p>
                </div>
              </div>

              <div>
                <h3 className="font-bold text-slate-900 border-b border-slate-300 pb-1 mb-2 text-xs uppercase tracking-wider">Internship Experience</h3>
                <div className="space-y-3">
                  <div>
                    <div className="flex justify-between font-bold text-slate-800 text-[11px]">
                      <span>AI & ML Model Design Intern — Indian Servers</span>
                      <span>2023 | 2 Months</span>
                    </div>
                    <ul className="list-disc pl-4 mt-1 text-slate-700 space-y-1 leading-relaxed">
                      <li>Designed and delivered 3+ AI/ML classification models, improving prediction accuracy by ~20% over baseline benchmarks.</li>
                      <li>Assessed and cleaned 5,000+ data records through feature engineering and preprocessing, reducing training noise significantly.</li>
                      <li>Conducted research into supervised learning algorithms and text processing techniques, producing 2 working prototypes.</li>
                      <li>Implemented automation scripts in Python that reduced manual data handling time by 40% within the team workflow.</li>
                    </ul>
                  </div>
                </div>
              </div>

              <div>
                <h3 className="font-bold text-slate-900 border-b border-slate-300 pb-1 mb-2 text-xs uppercase tracking-wider">Projects</h3>
                <div className="space-y-3">
                  <div>
                    <div className="flex justify-between font-bold text-slate-800 text-[11px]">
                      <span>AI Fitness Assistant — Python | NLP | Recommendation Engine</span>
                    </div>
                    <p className="text-slate-700 mt-0.5 leading-relaxed">
                      Architected an end-to-end fitness planning system that generates personalized workout and diet plans. Implemented an adaptive recommendation engine that adjusts suggestions weekly, improving user goal-adherence by 35%.
                    </p>
                  </div>
                  <div>
                    <div className="flex justify-between font-bold text-slate-800 text-[11px]">
                      <span>AI Voice Assistant Application — Python | Speech Recognition</span>
                    </div>
                    <p className="text-slate-700 mt-0.5 leading-relaxed">
                      Designed a voice assistant targeting elderly users, reducing speech recognition errors by 30% through grammar correction. Optimized the UI for high accessibility.
                    </p>
                  </div>
                  <div>
                    <div className="flex justify-between font-bold text-slate-800 text-[11px]">
                      <span>AI Study Guide Generator — Python | NLP | PDF Summarization</span>
                    </div>
                    <p className="text-slate-700 mt-0.5 leading-relaxed">
                      Analyzed and extracted key concepts from PDF documents up to 100 pages, condensing content into structured summaries 70% shorter. Authored a ranking algorithm that outputs targeted study guides in under 10 seconds.
                    </p>
                  </div>
                </div>
              </div>

              <div>
                <h3 className="font-bold text-slate-900 border-b border-slate-300 pb-1 mb-2 text-xs uppercase tracking-wider">Education</h3>
                <div className="flex justify-between font-bold text-slate-800 text-[11px]">
                  <span>B.Tech in Computer Science & Engineering — Nalla Narasimha Reddy Engineering College</span>
                  <span>2023 – 2027</span>
                </div>
                <p className="text-slate-600 mt-0.5">Hyderabad, India | CGPA: 7.98 / 10</p>
              </div>

              <div>
                <h3 className="font-bold text-slate-900 border-b border-slate-300 pb-1 mb-2 text-xs uppercase tracking-wider">Certifications & Achievements</h3>
                <ul className="list-disc pl-4 text-slate-700 space-y-1">
                  <li>Programming Fundamentals & Frontend Development Certifications — NxtWave.</li>
                  <li>Represented the department as Coordinator, managing 50+ students during the annual college technical fest.</li>
                  <li>Awarded Best Stall for outstanding exhibit presentation and collaborative effort at the inter-department college exhibition.</li>
                </ul>
              </div>
            </div>

            <div className="mt-4 flex justify-end gap-3">
              <button
                onClick={() => setIsResumeModalOpen(false)}
                className="px-4 py-2 bg-slate-800 hover:bg-slate-750 text-slate-300 font-semibold rounded-xl text-xs cursor-pointer transition-colors"
              >
                Close Preview
              </button>
              <a
                href="https://github.com/karthikeya39g-af/portfolio/raw/main/karthikeya_resume.pdf"
                download="Karthikeya_Veeramallu_Resume.pdf"
                className="px-4 py-2 bg-indigo-500 hover:bg-indigo-400 text-slate-950 font-bold rounded-xl text-xs flex items-center gap-2 cursor-pointer transition-colors"
              >
                <Download className="w-3.5 h-3.5" />
                <span>Download PDF File</span>
              </a>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
