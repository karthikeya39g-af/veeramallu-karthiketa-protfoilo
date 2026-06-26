import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  Volume2,
  Truck,
  Activity,
  MessageSquare,
  Sparkles,
  BookOpen,
  Github,
  ChevronLeft,
  ChevronRight,
  Info
} from 'lucide-react';

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

interface ProjectCarouselProps {
  filteredProjects: Project[];
  setSelectedProject: (project: Project) => void;
  activeTheme: {
    id: string;
    name: string;
    icon: string;
    colors: {
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
    };
  };
  
  // Voice Clarity AI
  isListeningVoice: boolean;
  setIsListeningVoice: (val: boolean) => void;
  voiceTranscript: string;
  setVoiceTranscript: (val: string) => void;
  
  // StudyGenie
  isExtractingStudy: boolean;
  setIsExtractingStudy: (val: boolean) => void;
  studyKeywords: string[];
  setStudyKeywords: (val: string[]) => void;
  
  // FuelReach
  fuelDeliveryStep: number;
  setFuelDeliveryStep: React.Dispatch<React.SetStateAction<number>>;
  fuelComplianceStatus: string;
  setFuelComplianceStatus: (val: string) => void;
  
  // eHRS Medical Camp
  campPatientsCount: number;
  setCampPatientsCount: React.Dispatch<React.SetStateAction<number>>;
  medicalCampFamilyGroup: string[];
  setMedicalCampFamilyGroup: React.Dispatch<React.SetStateAction<string[]>>;
  newFamilyMember: string;
  setNewFamilyMember: (val: string) => void;
  
  // Saarthi AI
  saarthiInput: string;
  setSaarthiInput: (val: string) => void;
  saarthiOutput: string;
  setSaarthiOutput: (val: string) => void;
  isSaarthiThinking: boolean;
  setIsSaarthiThinking: (val: boolean) => void;
  
  // AI Website Builder
  whatsappMsg: string;
  setWhatsappMsg: (val: string) => void;
  isGeneratingWeb: boolean;
  setIsGeneratingWeb: (val: boolean) => void;
  generatedWebSchema: string;
  setGeneratedWebSchema: (val: string) => void;
}

export function ProjectCarousel({
  filteredProjects,
  setSelectedProject,
  activeTheme,
  isListeningVoice,
  setIsListeningVoice,
  voiceTranscript,
  setVoiceTranscript,
  isExtractingStudy,
  setIsExtractingStudy,
  studyKeywords,
  setStudyKeywords,
  fuelDeliveryStep,
  setFuelDeliveryStep,
  fuelComplianceStatus,
  setFuelComplianceStatus,
  campPatientsCount,
  setCampPatientsCount,
  medicalCampFamilyGroup,
  setMedicalCampFamilyGroup,
  newFamilyMember,
  setNewFamilyMember,
  saarthiInput,
  setSaarthiInput,
  saarthiOutput,
  setSaarthiOutput,
  isSaarthiThinking,
  setIsSaarthiThinking,
  whatsappMsg,
  setWhatsappMsg,
  isGeneratingWeb,
  setIsGeneratingWeb,
  generatedWebSchema,
  setGeneratedWebSchema
}: ProjectCarouselProps) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [windowWidth, setWindowWidth] = useState(typeof window !== 'undefined' ? window.innerWidth : 1024);
  const lastScrollTime = useRef(0);

  // Monitor screen size for spacing adjustments
  useEffect(() => {
    const handleResize = () => setWindowWidth(window.innerWidth);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Sync index when filter or search changes the visible array size
  useEffect(() => {
    if (activeIndex >= filteredProjects.length && filteredProjects.length > 0) {
      setActiveIndex(0);
    }
  }, [filteredProjects, activeIndex]);

  const handlePrev = () => {
    setActiveIndex((prev) => (prev - 1 + filteredProjects.length) % filteredProjects.length);
  };

  const handleNext = () => {
    setActiveIndex((prev) => (prev + 1) % filteredProjects.length);
  };

  // Keyboard controls
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (filteredProjects.length <= 1) return;
      if (e.key === 'ArrowLeft') handlePrev();
      if (e.key === 'ArrowRight') handleNext();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [filteredProjects.length]);

  // Mouse wheel scroll wheel handler
  const handleWheel = (e: React.WheelEvent) => {
    if (filteredProjects.length <= 1) return;
    const now = Date.now();
    if (now - lastScrollTime.current > 450) {
      if (Math.abs(e.deltaX) > 30 || Math.abs(e.deltaY) > 30) {
        if (e.deltaX > 0 || e.deltaY > 0) {
          handleNext();
        } else {
          handlePrev();
        }
        lastScrollTime.current = now;
      }
    }
  };

  if (filteredProjects.length === 0) {
    return (
      <div className="text-center py-16 custom-bg-card border custom-border rounded-2xl">
        <Info className="w-10 h-10 text-slate-500 mx-auto mb-3" />
        <p className="text-slate-400 text-sm">No projects matching your filters. Try clearing your search parameters!</p>
      </div>
    );
  }

  // Responsive values for 3D layout
  const isMobile = windowWidth < 768;
  const isTablet = windowWidth >= 768 && windowWidth < 1024;
  const cardSpacing = isMobile ? 180 : isTablet ? 260 : 340;
  const perspectiveDist = isMobile ? '800px' : '1200px';

  return (
    <div className="flex flex-col items-center select-none">
      
      {/* 3D Carousel Stage */}
      <div 
        onWheel={handleWheel}
        className="relative w-full h-[620px] md:h-[650px] flex items-center justify-center overflow-visible py-8"
        style={{ perspective: perspectiveDist }}
      >
        <div className="absolute inset-x-0 top-1/2 -translate-y-1/2 flex justify-between z-40 pointer-events-none px-4 md:px-8">
          <button
            onClick={handlePrev}
            className="w-12 h-12 rounded-xl border custom-border custom-bg-card flex items-center justify-center hover:scale-105 active:scale-95 transition-all cursor-pointer pointer-events-auto shadow-lg backdrop-blur-md hover:border-indigo-500/40"
            style={{ boxShadow: `0 8px 30px var(--accent-glow)` }}
          >
            <ChevronLeft className="w-5 h-5 custom-accent-text" />
          </button>
          
          <button
            onClick={handleNext}
            className="w-12 h-12 rounded-xl border custom-border custom-bg-card flex items-center justify-center hover:scale-105 active:scale-95 transition-all cursor-pointer pointer-events-auto shadow-lg backdrop-blur-md hover:border-indigo-500/40"
            style={{ boxShadow: `0 8px 30px var(--accent-glow)` }}
          >
            <ChevronRight className="w-5 h-5 custom-accent-text" />
          </button>
        </div>

        {/* Carousel Cards Container */}
        <div className="relative w-full h-full flex items-center justify-center" style={{ transformStyle: 'preserve-3d' }}>
          <AnimatePresence initial={false} mode="popLayout">
            {filteredProjects.map((project, index) => {
              // Calculate offset relative to activeIndex
              let offset = index - activeIndex;
              const N = filteredProjects.length;

              // Infinite endless looping circular offset mapping
              if (N > 1) {
                if (offset < -Math.floor(N / 2)) {
                  offset += N;
                } else if (offset > Math.floor((N - 1) / 2)) {
                  offset -= N;
                }
              }

              const isCenter = offset === 0;
              const isVisible = Math.abs(offset) <= (isMobile ? 1 : 2); // Limit visible cards to optimize performance

              if (!isVisible) return null;

              // 3D positioning properties
              const rotateYVal = offset * -28; // Rotate out to face the center/user
              const translateZVal = -Math.abs(offset) * 160; // Push inactive cards further away
              const xTranslation = offset * cardSpacing; // Spacing along X axis
              const scaleVal = isCenter ? 1 : 0.84 - Math.abs(offset) * 0.04;
              const opacityVal = isCenter ? 1 : 0.65 - Math.abs(offset) * 0.22;

              return (
                <motion.div
                  key={`${project.id}-${index}`}
                  initial={{
                    opacity: 0,
                    scale: 0.7,
                    x: xTranslation,
                    z: -300,
                    rotateY: rotateYVal,
                  }}
                  animate={{
                    opacity: opacityVal,
                    scale: scaleVal,
                    x: xTranslation,
                    z: translateZVal,
                    rotateY: rotateYVal,
                  }}
                  exit={{
                    opacity: 0,
                    scale: 0.7,
                    z: -300,
                    transition: { duration: 0.2 }
                  }}
                  transition={{
                    type: 'spring',
                    stiffness: 300,
                    damping: 28,
                    mass: 0.9,
                  }}
                  style={{
                    zIndex: 100 - Math.abs(offset),
                    transformStyle: 'preserve-3d',
                    position: 'absolute',
                  }}
                  onClick={() => {
                    if (!isCenter) {
                      setActiveIndex(index);
                    }
                  }}
                  className={`w-[290px] md:w-[440px] h-[520px] md:h-[550px] p-6 rounded-2xl border custom-border custom-bg-card flex flex-col justify-between shadow-2xl transition-shadow duration-300 relative overflow-hidden ${
                    isCenter 
                      ? 'cursor-default ring-2 ring-indigo-500/20' 
                      : 'cursor-pointer hover:border-slate-500/30'
                  }`}
                >
                  {/* Glowing 3D ambient aura inside active card */}
                  {isCenter && (
                    <div 
                      className="absolute -top-16 -right-16 w-36 h-36 rounded-full blur-3xl opacity-20 pointer-events-none"
                      style={{ background: `linear-gradient(135deg, var(--gradient-from), var(--gradient-to))` }}
                    />
                  )}

                  {/* Main Content (Scrollable for widgets / spacing safety) */}
                  <div className="flex-1 flex flex-col justify-between overflow-y-auto no-scrollbar pr-0.5">
                    
                    {/* Top Row */}
                    <div>
                      <div className="flex justify-between items-start mb-4">
                        <div 
                          className="p-3 rounded-xl border transition-all"
                          style={{ 
                            backgroundColor: 'var(--bg-accent-light)', 
                            borderColor: 'var(--border-color)',
                            boxShadow: isCenter ? '0 0 12px var(--accent-glow)' : 'none'
                          }}
                        >
                          {project.icon}
                        </div>
                        <span 
                          className="text-[10px] px-2.5 py-1 font-mono uppercase rounded-full border"
                          style={{
                            color: 'var(--accent-primary)',
                            borderColor: 'var(--border-color)',
                            backgroundColor: 'var(--bg-accent-light)'
                          }}
                        >
                          {project.category === 'ai-ml' ? 'AI / ML' : 'Full Stack'}
                        </span>
                      </div>

                      <h3 className="text-lg font-extrabold custom-text-primary mb-2 tracking-tight">
                        {project.name}
                      </h3>
                      
                      <p className="text-xs custom-text-secondary leading-relaxed mb-4">
                        {project.description}
                      </p>
                    </div>

                    {/* Interactive Bento Sub-Widgets (Only interactive on center card) */}
                    <div className={isCenter ? 'pointer-events-auto opacity-100 transition-opacity' : 'pointer-events-none opacity-55 scale-[0.98] blur-[0.5px]'}>
                      
                      {/* Voice Clarity AI widget */}
                      {project.id === 'voice-clarity-ai' && (
                        <div className="mb-4 p-4 rounded-xl custom-bg-secondary/40 border custom-border space-y-3">
                          <div className="flex justify-between items-center border-b border-slate-800/60 pb-2">
                            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Voice DSP Filter</span>
                            <span className="text-[9px] font-mono text-indigo-400">Low-Latency STT</span>
                          </div>
                          <div className="flex items-center gap-3">
                            <button
                              onClick={(e) => {
                                e.stopPropagation();
                                if (isListeningVoice) return;
                                setIsListeningVoice(true);
                                setVoiceTranscript("Listening...");
                                setTimeout(() => {
                                  setVoiceTranscript("Elderly: 'Aaa... I want to... uh... call my son...'");
                                  setTimeout(() => {
                                    setVoiceTranscript("AI Filtered: 'Call my son.' ✅");
                                    setIsListeningVoice(false);
                                  }, 1500);
                                }, 1200);
                              }}
                              disabled={isListeningVoice}
                              className={`p-3 rounded-xl flex items-center justify-center border transition-all cursor-pointer shrink-0 ${
                                isListeningVoice
                                  ? 'bg-indigo-500/20 border-indigo-500 text-indigo-400 animate-pulse'
                                  : 'bg-slate-900 border-slate-800 text-slate-400 hover:text-slate-200'
                              }`}
                            >
                              <Volume2 className="w-4 h-4" />
                            </button>
                            <div className="flex-1 bg-slate-900/40 p-2 border border-slate-800/80 rounded-lg min-h-[48px] flex items-center">
                              <p className="text-[9px] text-slate-300 font-mono italic leading-normal">
                                {voiceTranscript || "Click speaker to filter hesitation."}
                              </p>
                            </div>
                          </div>
                        </div>
                      )}

                      {/* FuelReach widget */}
                      {project.id === 'fuel-reach' && (
                        <div className="mb-4 p-4 rounded-xl custom-bg-secondary/40 border custom-border space-y-3">
                          <div className="flex justify-between items-center border-b border-slate-800/60 pb-2">
                            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">FuelReach Logistics & Tracker</span>
                            <span className="text-[9px] font-mono text-purple-400">Live Status API</span>
                          </div>
                          
                          <div className="grid grid-cols-4 gap-2 text-center">
                            {[
                              { label: "Ordered", step: 1 },
                              { label: "Dispatched", step: 2 },
                              { label: "En Route", step: 3 },
                              { label: "Delivered", step: 4 }
                            ].map((s) => (
                              <div
                                key={s.step}
                                className={`p-1.5 rounded-lg border text-[8px] transition-all ${
                                  fuelDeliveryStep >= s.step
                                    ? 'bg-purple-950/40 border-purple-500 text-purple-300 font-bold'
                                    : 'bg-slate-900 border-slate-800/60 text-slate-500'
                                }`}
                              >
                                {s.label}
                              </div>
                            ))}
                          </div>

                          <div className="flex items-center justify-between gap-3 pt-1">
                            <button
                              onClick={(e) => {
                                e.stopPropagation();
                                setFuelComplianceStatus("Analyzing environmental risk...");
                                setFuelDeliveryStep((prev) => (prev % 4) + 1);
                                setTimeout(() => {
                                  setFuelComplianceStatus("Certified! Temp: 19°C | Vent: Active ✅");
                                }, 800);
                              }}
                              className="bg-purple-500 hover:bg-purple-400 text-slate-950 text-[9px] font-bold px-3 py-1.5 rounded-lg transition-colors cursor-pointer"
                            >
                              Advance Logistic Phase
                            </button>
                            <div className="text-[8px] font-mono text-slate-400 bg-slate-900 p-1.5 rounded border border-slate-800/80 flex-1 text-right">
                              {fuelComplianceStatus}
                            </div>
                          </div>
                        </div>
                      )}

                      {/* eHRS Medical Camp widget */}
                      {project.id === 'medical-camp' && (
                        <div className="mb-4 p-4 rounded-xl custom-bg-secondary/40 border custom-border space-y-3">
                          <div className="flex justify-between items-center border-b border-slate-800/60 pb-2">
                            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Clinical Cohort & Family Grouping</span>
                            <span className="text-[9px] font-mono text-blue-400">Patients: {campPatientsCount}</span>
                          </div>
                          
                          <div className="space-y-1.5">
                            <span className="text-[8px] text-slate-400 font-mono block">Current Outpatient Household:</span>
                            <div className="flex flex-wrap gap-1.5">
                              {medicalCampFamilyGroup.map((member, i) => (
                                <span key={i} className="text-[8px] font-mono bg-blue-950/30 text-blue-400 border border-blue-900/30 px-2 py-0.5 rounded">
                                  {member}
                                </span>
                              ))}
                            </div>
                          </div>

                          <div className="flex gap-2">
                            <input
                              type="text"
                              value={newFamilyMember}
                              onClick={(e) => e.stopPropagation()}
                              onChange={(e) => setNewFamilyMember(e.target.value)}
                              placeholder="New member name..."
                              className="bg-slate-900 border border-slate-800 text-[9px] text-white px-2.5 py-1 rounded focus:outline-none focus:border-blue-500 flex-1"
                            />
                            <button
                              onClick={(e) => {
                                e.stopPropagation();
                                if (!newFamilyMember.trim()) return;
                                setMedicalCampFamilyGroup(prev => [...prev, `${newFamilyMember.trim()} (Dependent)`]);
                                setCampPatientsCount(prev => prev + 1);
                                setNewFamilyMember("");
                              }}
                              className="bg-blue-500 hover:bg-blue-400 text-slate-950 text-[9px] font-bold px-3 py-1 rounded transition-colors cursor-pointer"
                            >
                              Add To Group
                            </button>
                          </div>
                        </div>
                      )}

                      {/* Saarthi AI widget */}
                      {project.id === 'saarthi-ai' && (
                        <div className="mb-4 p-4 rounded-xl custom-bg-secondary/40 border custom-border space-y-3">
                          <div className="flex justify-between items-center border-b border-slate-800/60 pb-2">
                            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Saarthi Advisory Sandbox</span>
                            <span className="text-[9px] font-mono text-fuchsia-400">Gemini Pro 1.5</span>
                          </div>
                          
                          <div className="flex gap-1.5 overflow-x-auto pb-1 no-scrollbar">
                            {["Labor Code Guide", "Medical Intake"].map((pPrompt) => (
                              <button
                                key={pPrompt}
                                onClick={(e) => {
                                  e.stopPropagation();
                                  setSaarthiInput(pPrompt);
                                  setIsSaarthiThinking(true);
                                  setSaarthiOutput("Synthesizing context parameters...");
                                  setTimeout(() => {
                                    if (pPrompt === "Labor Code Guide") {
                                      setSaarthiOutput("According to Clause 4(A): Outreach workers qualify for travel allowances if camp shifts exceed 8 hours. ✅");
                                    } else {
                                      setSaarthiOutput("Patient is categorized under high genetic cardiovascular risk based on parental timeline metadata. ✅");
                                    }
                                    setIsSaarthiThinking(false);
                                  }, 1000);
                                }}
                                className="text-[8px] bg-slate-900 border border-slate-800 text-slate-300 px-2 py-0.5 rounded hover:border-fuchsia-500/40 cursor-pointer whitespace-nowrap"
                              >
                                {pPrompt}
                              </button>
                            ))}
                          </div>

                          <div className="bg-slate-900/40 p-2 border border-slate-800/80 rounded text-[9px] font-mono text-slate-300 min-h-[44px]">
                            {saarthiOutput || "Select advisor topics above."}
                          </div>
                        </div>
                      )}

                      {/* AI Website Builder widget */}
                      {project.id === 'ai-website-builder' && (
                        <div className="mb-4 p-4 rounded-xl custom-bg-secondary/40 border custom-border space-y-3">
                          <div className="flex justify-between items-center border-b border-slate-800/60 pb-2">
                            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">WhatsApp Code Generation</span>
                            <span className="text-[9px] font-mono text-violet-400">Zero-Code markup</span>
                          </div>
                          
                          <div className="flex items-center gap-2">
                            <div className="bg-slate-900 p-1.5 border border-slate-800 rounded text-[8px] font-mono text-slate-400 flex-1">
                              💬 "{whatsappMsg}"
                            </div>
                            <button
                              onClick={(e) => {
                                e.stopPropagation();
                                if (isGeneratingWeb) return;
                                setIsGeneratingWeb(true);
                                setGeneratedWebSchema("Reading prompt string...");
                                const options = [
                                  "Generated Restaurant Page: 🍔 Burger Haven with high-contrast Orange CTA!",
                                  "Generated Portfolio Page: 🎨 Designer Slate portfolio with micro-interactions!",
                                  "Generated Clinic Page: 🏥 Serene Medical landing card with responsive schedule form!"
                                ];
                                setTimeout(() => {
                                  setGeneratedWebSchema(options[Math.floor(Math.random() * options.length)]);
                                  setIsGeneratingWeb(false);
                                }, 1200);
                              }}
                              className="bg-violet-500 hover:bg-violet-400 text-slate-950 text-[9px] font-bold px-2.5 py-1.5 rounded cursor-pointer transition-colors shrink-0"
                            >
                              Trigger Build
                            </button>
                          </div>

                          {generatedWebSchema && (
                            <div className="p-2 bg-violet-950/20 border border-violet-900/20 rounded text-[8px] font-mono text-violet-300">
                              {generatedWebSchema}
                            </div>
                          )}
                        </div>
                      )}

                      {/* StudyGenie widget */}
                      {project.id === 'study-genie' && (
                        <div className="mb-4 p-4 rounded-xl custom-bg-secondary/40 border custom-border space-y-3">
                          <div className="flex justify-between items-center border-b border-slate-800/60 pb-2">
                            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Semantic Text Density</span>
                            <span className="text-[9px] font-mono text-pink-400">Lexical Index</span>
                          </div>
                          <div className="space-y-2">
                            <button
                              onClick={(e) => {
                                e.stopPropagation();
                                if (isExtractingStudy) return;
                                setIsExtractingStudy(true);
                                setStudyKeywords([]);
                                setTimeout(() => {
                                  setStudyKeywords(['TF-IDF Score: 0.84', 'Tokens: 4.2k/min', 'Summarized: 70%']);
                                  setIsExtractingStudy(false);
                                }, 1200);
                              }}
                              disabled={isExtractingStudy}
                              className="w-full bg-slate-900 hover:bg-slate-850 text-[9px] text-slate-300 border border-slate-800 hover:border-slate-750 font-bold py-1.5 px-3 rounded-lg flex items-center justify-center gap-1.5 cursor-pointer transition-colors"
                            >
                              {isExtractingStudy ? (
                                <span className="flex items-center gap-1.5">
                                  <span className="w-2 h-2 bg-pink-400 rounded-full animate-ping" />
                                  <span>Scanning academic document...</span>
                                </span>
                              ) : (
                                <span>Extract Thematic Concepts</span>
                              )}
                            </button>
                            
                            <div className="bg-slate-900/40 p-2 border border-slate-800/80 rounded-lg min-h-[48px] flex flex-wrap gap-1.5 items-center justify-center">
                              {studyKeywords.length > 0 ? (
                                studyKeywords.map((kw, i) => (
                                  <span key={i} className="text-[8px] font-mono bg-pink-950/30 text-pink-400 border border-pink-900/30 px-1.5 py-0.5 rounded">
                                    {kw}
                                  </span>
                                ))
                              ) : (
                                <span className="text-[8px] text-slate-500 italic">Click scanner above to analyze.</span>
                              )}
                            </div>
                          </div>
                        </div>
                      )}
                    </div>

                    {/* Tags List */}
                    <div className="flex flex-wrap gap-1.5 mt-3">
                      {project.tags.map((tag, i) => (
                        <span 
                          key={i} 
                          className="px-2 py-0.5 rounded-full text-[9px] border"
                          style={{
                            color: 'var(--text-secondary)',
                            borderColor: 'var(--border-color)',
                            backgroundColor: 'var(--bg-accent-light)'
                          }}
                        >
                          {tag}
                        </span>
                      ))}
                    </div>

                  </div>

                  {/* Actions Bar */}
                  <div className="flex gap-3 mt-5 border-t custom-border pt-4 z-10">
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        if (isCenter) setSelectedProject(project);
                      }}
                      disabled={!isCenter}
                      className="flex-1 bg-slate-850 hover:bg-slate-800 disabled:opacity-50 text-slate-200 font-semibold py-2 rounded-lg transition-colors text-xs flex items-center justify-center gap-1.5 cursor-pointer"
                    >
                      <BookOpen className="w-3.5 h-3.5 text-indigo-400 animate-pulse" />
                      <span>Case Study</span>
                    </button>
                    
                    <a
                      href={project.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={(e) => {
                        if (!isCenter) e.preventDefault();
                      }}
                      className="px-3 bg-slate-850 hover:bg-slate-800 text-slate-200 rounded-lg transition-colors flex items-center justify-center cursor-pointer"
                    >
                      <Github className="w-4 h-4" />
                    </a>
                  </div>

                </motion.div>
              );
            })}
          </AnimatePresence>
        </div>
      </div>

      {/* Pagination dots & indicators */}
      <div className="flex items-center gap-2 mt-4">
        {filteredProjects.map((_, idx) => (
          <button
            key={idx}
            onClick={() => setActiveIndex(idx)}
            className="group relative flex items-center justify-center p-1.5 cursor-pointer"
          >
            <span 
              className={`h-2 rounded-full transition-all duration-300 ${
                activeIndex === idx 
                  ? 'w-6 bg-indigo-500 shadow-[0_0_8px_var(--accent-primary)]' 
                  : 'w-2 bg-slate-700 group-hover:bg-slate-500'
              }`}
              style={{
                backgroundColor: activeIndex === idx ? 'var(--accent-primary)' : ''
              }}
            />
          </button>
        ))}
      </div>
      
      {/* Scroll instruction indicator */}
      {filteredProjects.length > 1 && (
        <p className="text-[10px] mt-2 font-mono" style={{ color: 'var(--text-muted)' }}>
          Swipe / Drag cards, scroll wheel, or use <kbd className="bg-slate-900 border custom-border px-1 py-0.5 rounded text-[8px] text-slate-400">←</kbd> <kbd className="bg-slate-900 border custom-border px-1 py-0.5 rounded text-[8px] text-slate-400">→</kbd> to rotate the carousel
        </p>
      )}
    </div>
  );
}
