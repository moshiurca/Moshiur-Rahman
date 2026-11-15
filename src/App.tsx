import React, { useEffect, useMemo, useState } from 'react';
import { motion } from 'motion/react';
import {
  Award,
  Box,
  CheckCircle2,
  CloudDownload,
  ExternalLink,
  FileText,
  FolderOpen,
  Globe,
  Layers,
  Linkedin,
  Loader2,
  Mail,
  Menu,
  MessageCircle,
  Search,
  Send,
  Settings,
  User,
  Workflow,
  X,
} from 'lucide-react';
import {
  CertificationItem,
  PORTFOLIO_DATA,
  ProjectCategory,
  ProjectItem,
} from './data/portfolioData';
import { MechanicalCanvas } from './components/MechanicalCanvas';
import { CustomCursor } from './components/CustomCursor';
import { TiltCard } from './components/TiltCard';
import { AnimatedCounter } from './components/AnimatedCounter';
import { PortfolioIcon } from './components/IconMapper';
import { ProjectCard } from './components/ProjectCard';
import {
  CertificateLightboxModal,
  ProjectLightboxModal,
  ResumeModal,
} from './components/Modals';
import { ResumeSection } from './components/ResumeSection';
import { CertificationsSection } from './components/CertificationsSection';

const NAV_ITEMS = [
  { id: 'home', label: 'Home' },
  { id: 'about', label: 'About' },
  { id: 'certifications', label: 'Certifications' },
  { id: 'workflow', label: 'Workflow' },
  { id: 'projects', label: 'Projects' },
  { id: 'resources', label: 'Drive Hub' },
  { id: 'resume', label: 'Resume' },
  { id: 'contact', label: 'Contact' },
];

const PROJECT_FILTERS: { id: ProjectCategory; label: string }[] = [
  { id: 'all', label: 'All Projects' },
  { id: 'Consumer Products', label: 'Consumer Products' },
  { id: 'Mechanical Parts', label: 'Mechanical Parts' },
  { id: 'Architecture', label: 'Architecture & Structural' },
];

export default function App() {
  const [scrollProgress, setScrollProgress] = useState(0);
  const [activeSection, setActiveSection] = useState('home');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const [selectedCategory, setSelectedCategory] =
    useState<ProjectCategory>('all');
  const [resourceSearch, setResourceSearch] = useState('');

  const [resumeModalOpen, setResumeModalOpen] = useState(false);
  const [previewProject, setPreviewProject] = useState<ProjectItem | null>(
    null
  );
  const [previewCertificate, setPreviewCertificate] =
    useState<CertificationItem | null>(null);
  const [portraitError, setPortraitError] = useState(false);

  const [formState, setFormState] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });
  const [isSending, setIsSending] = useState(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  useEffect(() => {
    const handleScroll = () => {
      const docHeight =
        document.documentElement.scrollHeight -
        document.documentElement.clientHeight;
      const pct = docHeight > 0 ? (window.scrollY / docHeight) * 100 : 0;
      setScrollProgress(Math.min(100, Math.max(0, pct)));

      let current = 'home';
      for (const item of NAV_ITEMS) {
        const el = document.getElementById(item.id);
        if (el && window.scrollY >= el.offsetTop - 180) {
          current = item.id;
        }
      }
      setActiveSection(current);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const filteredProjects = useMemo(() => {
    if (selectedCategory === 'all') return PORTFOLIO_DATA.projects;
    return PORTFOLIO_DATA.projects.filter(
      (p) => p.category.toLowerCase() === selectedCategory.toLowerCase()
    );
  }, [selectedCategory]);

  const filteredResources = useMemo(() => {
    const term = resourceSearch.trim().toLowerCase();
    if (!term) return PORTFOLIO_DATA.embeddedResources;
    return PORTFOLIO_DATA.embeddedResources.filter(
      (r) =>
        r.name.toLowerCase().includes(term) ||
        r.type.toLowerCase().includes(term)
    );
  }, [resourceSearch]);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage((prev) => (prev === msg ? null : prev));
    }, 5000);
  };

  const handleContactSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSending(true);

    try {
      const formData = new FormData();
      formData.append('name', formState.name);
      formData.append('email', formState.email);
      formData.append('subject', formState.subject || 'Portfolio Inquiry');
      formData.append('message', formState.message);
      formData.append('_captcha', 'false');
      formData.append('_template', 'table');
      formData.append(
        '_subject',
        'New Portfolio Contact Message - Moshiur Rahman'
      );

      const res = await fetch(
        'https://formsubmit.co/ajax/moshiurca12@gmail.com',
        {
          method: 'POST',
          headers: { Accept: 'application/json' },
          body: formData,
        }
      );

      if (res.ok) {
        showToast('Message sent successfully to moshiurca12@gmail.com!');
        setFormState({ name: '', email: '', subject: '', message: '' });
      } else {
        window.location.href = `mailto:moshiurca12@gmail.com?subject=${encodeURIComponent(
          formState.subject || 'Portfolio Inquiry'
        )}&body=${encodeURIComponent(
          `Name: ${formState.name}\nEmail: ${formState.email}\n\n${formState.message}`
        )}`;
        showToast('Opening your email client to send message to Moshiur...');
      }
    } catch {
      window.location.href = `mailto:moshiurca12@gmail.com?subject=${encodeURIComponent(
        formState.subject || 'Portfolio Inquiry'
      )}&body=${encodeURIComponent(
        `Name: ${formState.name}\nEmail: ${formState.email}\n\n${formState.message}`
      )}`;
      showToast('Prepared message for moshiurca12@gmail.com.');
    } finally {
      setIsSending(false);
    }
  };

  const skillCategories = [
    {
      title: 'Core CAD & 3D Modeling',
      iconName: 'box',
      items: PORTFOLIO_DATA.skills.cadModeling,
    },
    {
      title: 'Simulation & Graphics',
      iconName: 'sparkles',
      items: PORTFOLIO_DATA.skills.simulationGraphics,
    },
    {
      title: 'Manufacturing & AI Tech',
      iconName: 'printer',
      items: PORTFOLIO_DATA.skills.manufacturingTech,
    },
  ];

  return (
    <div className="relative min-h-screen bg-[#131416] text-white">
      {/* Top Scroll Progress Indicator */}
      <div
        aria-hidden="true"
        style={{ width: `${scrollProgress}%` }}
        className="fixed top-0 left-0 z-[10000] h-[3px] bg-gradient-to-r from-[#800606] via-[#f26522] to-[#ff9d00] shadow-[0_0_12px_#f26522] transition-[width] duration-100 ease-linear"
      />

      {/* Custom Mechanical Target Cursor */}
      <CustomCursor />

      {/* Blueprint Grid & Ambient Crimson/Orange Glows */}
      <div
        aria-hidden="true"
        className="bg-grid-overlay pointer-events-none fixed inset-0 z-0 opacity-80"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none fixed -top-[10%] -right-[10%] z-0 h-[560px] w-[560px] rounded-full bg-[radial-gradient(circle,rgba(128,6,6,0.25)_0%,transparent_70%)] blur-[80px]"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none fixed -bottom-[10%] -left-[10%] z-0 h-[640px] w-[640px] rounded-full bg-[radial-gradient(circle,rgba(242,101,34,0.14)_0%,transparent_70%)] blur-[100px]"
      />

      {/* 3-Zone Top Navigation Bar */}
      <header className="fixed top-4 left-1/2 z-40 w-[min(1280px,92%)] -translate-x-1/2">
        <div className="flex items-center justify-between gap-8 rounded-[20px] border border-white/10 bg-[#131416]/85 px-5 py-3 shadow-[0_10px_30px_rgba(0,0,0,0.6)] backdrop-blur-xl sm:px-7">
          {/* Zone 1: Brand Mark */}
          <a
            href="#home"
            className="flex shrink-0 items-center gap-3 whitespace-nowrap"
          >
            <span className="font-display flex h-10 w-10 items-center justify-center rounded-[10px] bg-gradient-to-br from-[#800606] to-[#f26522] text-xl text-white shadow-[0_0_15px_rgba(242,101,34,0.4)]">
              M
            </span>
            <span className="font-heading text-lg font-bold tracking-wide text-white">
              MOSHIUR <span className="text-[#f26522]">RAHMAN</span>
            </span>
          </a>

          {/* Zone 2: Single-line Navigation Links */}
          <nav
            aria-label="Primary navigation"
            className="hidden items-center gap-5 lg:flex xl:gap-6"
          >
            {NAV_ITEMS.map((item) => {
              const isActive = activeSection === item.id;
              return (
                <a
                  key={item.id}
                  href={`#${item.id}`}
                  className={`font-heading relative shrink-0 py-1 text-sm font-medium whitespace-nowrap transition-colors ${
                    isActive
                      ? 'text-white'
                      : 'text-[#d0d1d6] hover:text-white'
                  }`}
                >
                  {item.label}
                  <span
                    className={`absolute bottom-0 left-0 h-[2px] rounded-full bg-[#f26522] transition-all duration-300 ${
                      isActive ? 'w-full' : 'w-0'
                    }`}
                  />
                </a>
              );
            })}
          </nav>

          {/* Zone 3: Primary Action + Mobile Menu Trigger */}
          <div className="flex shrink-0 items-center gap-3">
            <button
              type="button"
              onClick={() => setResumeModalOpen(true)}
              className="font-heading inline-flex shrink-0 cursor-pointer items-center gap-2 rounded-xl border border-white/15 bg-white/5 px-4 py-2 text-xs font-semibold whitespace-nowrap text-white shadow-md backdrop-blur-md transition-all duration-200 hover:-translate-y-0.5 hover:border-[#f26522] hover:bg-[#f26522]/15 hover:shadow-[0_6px_20px_rgba(242,101,34,0.28)] sm:text-sm"
            >
              <FileText className="h-4 w-4 text-[#f26522]" />
              <span>Resume PDF</span>
            </button>

            <button
              type="button"
              onClick={() => setMobileMenuOpen((v) => !v)}
              aria-label={mobileMenuOpen ? 'Close menu' : 'Open menu'}
              className="flex h-10 w-10 items-center justify-center rounded-xl border border-white/10 text-white transition-colors hover:border-[#f26522] lg:hidden"
            >
              {mobileMenuOpen ? (
                <X className="h-5 w-5" />
              ) : (
                <Menu className="h-5 w-5" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Drawer */}
        {mobileMenuOpen && (
          <nav
            aria-label="Mobile navigation"
            className="mt-2 flex flex-col gap-1 rounded-2xl border border-white/10 bg-[#131416]/95 p-4 shadow-2xl backdrop-blur-xl lg:hidden"
          >
            {NAV_ITEMS.map((item) => (
              <a
                key={item.id}
                href={`#${item.id}`}
                onClick={() => setMobileMenuOpen(false)}
                className={`font-heading rounded-xl px-4 py-3 text-sm font-medium transition-colors ${
                  activeSection === item.id
                    ? 'bg-[#800606]/35 text-[#f26522]'
                    : 'text-[#d0d1d6] hover:bg-white/5 hover:text-white'
                }`}
              >
                {item.label}
              </a>
            ))}
          </nav>
        )}
      </header>

      <main>
        {/* HERO SECTION */}
        <section
          id="home"
          className="relative flex min-h-screen items-center overflow-hidden pt-32 pb-20"
        >
          <MechanicalCanvas />

          <div className="relative z-10 mx-auto w-full max-w-[1320px] px-6">
            <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-12">
              {/* Left Column: Editorial Mechanical Typographic Hierarchy */}
              <motion.div
                initial={{ opacity: 0, x: -32 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
                className="lg:col-span-6"
              >
                <p className="font-display mb-2 text-2xl tracking-[0.18em] text-[#f26522] sm:text-3xl">
                  {PORTFOLIO_DATA.personalInfo.subtitle}
                </p>

                <h1 className="font-display mb-5 text-[clamp(3.4rem,6.4vw,5.75rem)] leading-[0.95] text-balance text-white uppercase drop-shadow-[0_10px_30px_rgba(0,0,0,0.75)]">
                  {PORTFOLIO_DATA.personalInfo.firstName}
                  <br />
                  {PORTFOLIO_DATA.personalInfo.lastName}
                </h1>

                <div className="mb-6 inline-flex items-center gap-2.5 rounded-lg border border-[#800606] bg-[#800606]/40 px-4 py-2 font-heading text-base font-bold tracking-wider text-white sm:text-lg">
                  <Settings className="h-5 w-5 text-[#f26522]" />
                  <span>{PORTFOLIO_DATA.personalInfo.title}</span>
                </div>

                <p className="mb-8 max-w-xl text-base leading-relaxed text-[#d0d1d6] sm:text-lg">
                  {PORTFOLIO_DATA.personalInfo.heroBio}
                </p>

                <div className="flex flex-wrap items-center gap-4">
                  <a
                    href="#projects"
                    className="font-heading inline-flex shrink-0 items-center gap-2.5 rounded-xl border border-white/20 bg-gradient-to-br from-[#800606] to-[#a80909] px-6 py-3.5 text-sm font-semibold whitespace-nowrap text-white shadow-[0_10px_28px_rgba(128,6,6,0.45)] transition-all duration-200 hover:-translate-y-0.5 hover:border-[#f26522] hover:from-[#990707] hover:to-[#f26522] hover:shadow-[0_0_26px_rgba(242,101,34,0.35)] sm:text-base"
                  >
                    <Box className="h-5 w-5" />
                    <span>Explore 3D Projects</span>
                  </a>

                  <a
                    href="#resume"
                    className="font-heading inline-flex shrink-0 items-center gap-2.5 rounded-xl border border-white/15 bg-white/5 px-6 py-3.5 text-sm font-semibold whitespace-nowrap text-white shadow-lg backdrop-blur-md transition-all duration-200 hover:-translate-y-0.5 hover:border-[#f26522] hover:bg-[#f26522]/15 hover:shadow-[0_8px_24px_rgba(242,101,34,0.28)] sm:text-base"
                  >
                    <CloudDownload className="h-5 w-5 text-[#f26522]" />
                    <span>View Resume / CV</span>
                  </a>
                </div>
              </motion.div>

              {/* Right Column: 3D Parallax Tilt Portrait Card */}
              <motion.div
                initial={{ opacity: 0, x: 32 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.75, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
                className="lg:col-span-6"
              >
                <TiltCard
                  intensity={16}
                  className="group relative h-[420px] w-full overflow-hidden rounded-[24px] border-[1.5px] border-[#f26522]/40 bg-[radial-gradient(circle_at_center,rgba(128,6,6,0.28)_0%,rgba(19,20,22,0.95)_82%)] shadow-[0_25px_55px_rgba(0,0,0,0.82),0_0_35px_rgba(242,101,34,0.22)] transition-[border-color,box-shadow] duration-300 hover:border-[#f26522] hover:shadow-[0_30px_65px_rgba(0,0,0,0.9),0_0_50px_rgba(242,101,34,0.38)] sm:h-[520px]"
                >
                  <div
                    aria-hidden="true"
                    className="pointer-events-none absolute -inset-5 z-10 bg-[radial-gradient(circle_at_50%_30%,rgba(242,101,34,0.22)_0%,rgba(128,6,6,0.14)_50%,transparent_80%)] mix-blend-screen"
                  />

                  {!portraitError ? (
                    <img
                      src="/assets/moshiur-portrait.jpg"
                      alt="MD Moshiur Rahman - Mechanical Designer"
                      referrerPolicy="no-referrer"
                      onError={() => setPortraitError(true)}
                      className="h-full w-full object-cover object-top transition-transform duration-700 ease-out group-hover:scale-105"
                    />
                  ) : (
                    <div className="flex h-full w-full flex-col items-center justify-center gap-3 bg-[#1a1c20] p-8 text-center">
                      <User className="h-16 w-16 text-[#f26522]" />
                      <p className="font-display text-3xl tracking-wide text-white">
                        MD MOSHIUR RAHMAN
                      </p>
                      <p className="font-heading text-sm text-[#d0d1d6]">
                        Mechanical Designer & 3D Modeling Specialist
                      </p>
                    </div>
                  )}

                  <div className="pointer-events-none absolute bottom-5 left-5 z-20 flex items-center gap-2.5 rounded-xl border border-white/15 bg-[#131416]/85 px-4 py-2.5 backdrop-blur-md">
                    <Settings className="h-4 w-4 text-[#f26522]" />
                    <span className="font-heading text-xs font-medium text-[#d0d1d6] sm:text-sm">
                      MD MOSHIUR RAHMAN <span aria-hidden="true">·</span> Mechanical Designer
                    </span>
                  </div>
                </TiltCard>
              </motion.div>
            </div>

            {/* GrabCAD Live Metrics Counter Strip */}
            <div className="mt-10 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
              {PORTFOLIO_DATA.grabcadStats.map((stat, idx) => (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.25 }}
                  transition={{
                    duration: 0.5,
                    delay: idx * 0.08,
                    ease: [0.16, 1, 0.3, 1],
                  }}
                  className="glass-panel relative overflow-hidden rounded-2xl p-6 text-center"
                >
                  <div
                    aria-hidden="true"
                    className="absolute top-0 left-0 h-[3px] w-full bg-gradient-to-r from-[#800606] to-[#f26522]"
                  />
                  <AnimatedCounter target={stat.value} prefix={stat.prefix} />
                  <p className="font-heading mt-1.5 text-xs font-semibold tracking-wider text-[#8c8f9a] uppercase sm:text-sm">
                    {stat.label}
                  </p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* ABOUT ME & TECHNICAL SKILLS */}
        <section id="about" className="relative z-10 py-24">
          <div className="mx-auto max-w-[1320px] px-6">
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
              className="mb-14 text-center"
            >
              <p className="font-heading mb-3 inline-flex items-center gap-2 text-xs font-bold tracking-[0.2em] text-[#f26522] uppercase">
                <User className="h-4 w-4" />
                <span>About Moshiur</span>
              </p>
              <h2 className="font-display animated-gradient-text mb-4 text-[clamp(2.5rem,5vw,4rem)] leading-[1.05] text-balance uppercase">
                ENGINEERING <span className="text-[#f26522]">PROFILE</span>
              </h2>
              <p className="mx-auto max-w-2xl text-base leading-relaxed text-[#d0d1d6] sm:text-lg">
                Combining solid-body modeling, mechanical design principles, and
                AI-assisted workflows to turn complex concepts into functional
                manufacturing models.
              </p>
            </motion.div>

            <div className="grid grid-cols-1 items-start gap-10 lg:grid-cols-12">
              {/* Left Narrative Card */}
              <motion.div
                initial={{ opacity: 0, x: -28 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, amount: 0.15 }}
                transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                className="glass-panel rounded-2xl p-7 sm:p-10 lg:col-span-7"
              >
                <p className="mb-6 text-base leading-relaxed text-[#d0d1d6] sm:text-[1.05rem]">
                  {PORTFOLIO_DATA.personalInfo.aboutParagraph1}
                </p>

                <div className="mb-6 rounded-xl border border-[#f26522]/30 bg-[#800606]/20 p-5 sm:p-6">
                  <div className="mb-2 flex items-center gap-2.5">
                    <Award className="h-5 w-5 shrink-0 text-[#f26522]" />
                    <h3 className="font-heading text-lg font-bold text-white">
                      {PORTFOLIO_DATA.personalInfo.aboutHighlightTitle}
                    </h3>
                  </div>
                  <p className="text-sm leading-relaxed text-[#d0d1d6] sm:text-base">
                    {PORTFOLIO_DATA.personalInfo.aboutHighlightBody}
                  </p>
                </div>

                <p className="mb-8 text-base leading-relaxed text-[#d0d1d6] sm:text-[1.05rem]">
                  {PORTFOLIO_DATA.personalInfo.aboutParagraph2}
                </p>

                <div className="flex flex-wrap items-center gap-4">
                  <a
                    href={PORTFOLIO_DATA.contact.grabcadUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="font-heading inline-flex shrink-0 items-center gap-2 rounded-xl border border-white/20 bg-gradient-to-br from-[#800606] to-[#a80909] px-6 py-3 text-sm font-semibold whitespace-nowrap text-white shadow-[0_10px_25px_rgba(128,6,6,0.4)] transition-all duration-200 hover:-translate-y-0.5 hover:border-[#f26522] hover:from-[#990707] hover:to-[#f26522]"
                  >
                    <Globe className="h-4 w-4" />
                    <span>Visit GrabCAD Profile</span>
                  </a>
                  <a
                    href={PORTFOLIO_DATA.contact.whatsappUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="font-heading inline-flex shrink-0 items-center gap-2 rounded-xl border border-white/15 bg-white/5 px-6 py-3 text-sm font-semibold whitespace-nowrap text-white transition-all duration-200 hover:-translate-y-0.5 hover:border-[#f26522] hover:bg-[#f26522]/15"
                  >
                    <MessageCircle className="h-4 w-4 text-[#f26522]" />
                    <span>WhatsApp Direct</span>
                  </a>
                </div>
              </motion.div>

              {/* Right Technical Skills Categories */}
              <div className="flex flex-col gap-5 lg:col-span-5">
                {skillCategories.map((cat, idx) => (
                  <motion.div
                    key={cat.title}
                    initial={{ opacity: 0, x: 28 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true, amount: 0.15 }}
                    transition={{
                      duration: 0.55,
                      delay: idx * 0.1,
                      ease: [0.16, 1, 0.3, 1],
                    }}
                    className="glass-panel rounded-2xl p-6"
                  >
                    <h3 className="font-heading mb-4 flex items-center gap-2.5 text-lg font-bold text-white">
                      <PortfolioIcon
                        name={cat.iconName}
                        className="h-5 w-5 text-[#f26522]"
                      />
                      <span>{cat.title}</span>
                    </h3>
                    <div className="grid grid-cols-1 gap-2.5 sm:grid-cols-2">
                      {cat.items.map((skill) => (
                        <div
                          key={skill.name}
                          className="flex items-start gap-2.5 rounded-xl border border-white/8 bg-white/[0.03] px-3.5 py-2.5 transition-colors hover:border-[#f26522]/45 hover:bg-[#800606]/20"
                        >
                          <PortfolioIcon
                            name={skill.iconName}
                            className="mt-0.5 h-4 w-4 shrink-0 text-[#f26522]"
                          />
                          <div className="min-w-0">
                            <p className="font-heading text-sm font-semibold text-white">
                              {skill.name}
                            </p>
                            <p className="text-xs text-[#8c8f9a]">
                              {skill.level}
                            </p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* CERTIFICATIONS & LICENSES (RIGHT AFTER ABOUT ME) */}
        <CertificationsSection
          onPreviewCertificate={(cert) => setPreviewCertificate(cert)}
        />

        {/* 5-STAGE ENGINEERING WORKFLOW */}
        <section
          id="workflow"
          className="relative z-10 border-y border-white/5 bg-[#1a1c20]/40 py-24"
        >
          <div className="mx-auto max-w-[1320px] px-6">
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
              className="mb-14 text-center"
            >
              <p className="font-heading mb-3 inline-flex items-center gap-2 text-xs font-bold tracking-[0.2em] text-[#f26522] uppercase">
                <Workflow className="h-4 w-4" />
                <span>Design Methodology</span>
              </p>
              <h2 className="font-display animated-gradient-text mb-4 text-[clamp(2.5rem,5vw,4rem)] leading-[1.05] text-balance uppercase">
                COMPLETE DESIGN <span className="text-[#f26522]">WORKFLOW</span>
              </h2>
              <p className="mx-auto max-w-2xl text-base leading-relaxed text-[#d0d1d6] sm:text-lg">
                My work follows a systematic 5-stage mechanical engineering
                process—from initial freehand sketching to production CAD
                modeling and realistic graphic presentation.
              </p>
            </motion.div>

            <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-5">
              {PORTFOLIO_DATA.workflowStages.map((stage, idx) => (
                <motion.div
                  key={stage.step}
                  initial={{ opacity: 0, y: 26 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.15 }}
                  transition={{
                    duration: 0.5,
                    delay: idx * 0.08,
                    ease: [0.16, 1, 0.3, 1],
                  }}
                  className="glass-panel group relative flex flex-col items-center rounded-2xl p-6 text-center"
                >
                  <span className="font-display font-mono-num absolute top-4 right-5 text-2xl text-white/15">
                    {stage.step}
                  </span>

                  <div className="mb-5 flex h-16 w-16 items-center justify-center rounded-2xl border border-[#f26522]/35 bg-gradient-to-br from-[#800606]/40 to-[#f26522]/20 text-[#f26522] shadow-[0_8px_20px_rgba(0,0,0,0.4)] transition-all duration-300 group-hover:scale-110 group-hover:rotate-6 group-hover:from-[#800606] group-hover:to-[#f26522] group-hover:text-white group-hover:shadow-[0_0_24px_rgba(242,101,34,0.4)]">
                    <PortfolioIcon name={stage.iconName} className="h-7 w-7" />
                  </div>

                  <h3 className="font-heading mb-2.5 text-lg font-bold text-white">
                    {stage.title}
                  </h3>
                  <p className="text-sm leading-relaxed text-[#8c8f9a]">
                    {stage.description}
                  </p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* PROJECTS & CAD HUB */}
        <section id="projects" className="relative z-10 py-24">
          <div className="mx-auto max-w-[1320px] px-6">
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
              className="mb-10 text-center"
            >
              <p className="font-heading mb-3 inline-flex items-center gap-2 text-xs font-bold tracking-[0.2em] text-[#f26522] uppercase">
                <Layers className="h-4 w-4" />
                <span>Showcase</span>
              </p>
              <h2 className="font-display animated-gradient-text mb-4 text-[clamp(2.5rem,5vw,4rem)] leading-[1.05] text-balance uppercase">
                PROJECTS & <span className="text-[#f26522]">CAD HUB</span>
              </h2>
              <p className="mx-auto max-w-2xl text-base leading-relaxed text-[#d0d1d6] sm:text-lg">
                Explore my collection of CAD models, mechanical assemblies, and
                product design projects. Each card features direct links to my
                Google Drive files, folders, and resources.
              </p>
            </motion.div>

            {/* Category Filter Tabs */}
            <div
              role="tablist"
              aria-label="Project categories"
              className="mb-12 flex flex-wrap justify-center gap-2.5"
            >
              {PROJECT_FILTERS.map((cat) => {
                const active = selectedCategory === cat.id;
                return (
                  <button
                    key={cat.id}
                    type="button"
                    role="tab"
                    aria-selected={active}
                    onClick={() => setSelectedCategory(cat.id)}
                    className={`font-heading shrink-0 cursor-pointer rounded-xl border px-5 py-2.5 text-sm font-semibold whitespace-nowrap transition-all duration-200 ${
                      active
                        ? 'border-[#f26522] bg-[#800606] text-white shadow-[0_0_22px_rgba(242,101,34,0.3)]'
                        : 'border-white/10 bg-white/[0.04] text-[#d0d1d6] hover:border-[#f26522]/50 hover:text-white'
                    }`}
                  >
                    {cat.label}
                  </button>
                );
              })}
            </div>

            {/* 3D Tilt Projects Grid */}
            <div className="grid grid-cols-1 gap-7 md:grid-cols-2 lg:grid-cols-3">
              {filteredProjects.map((project, idx) => (
                <ProjectCard
                  key={project.id}
                  project={project}
                  index={idx}
                  onPreview={setPreviewProject}
                />
              ))}
            </div>
          </div>
        </section>

        {/* EMBEDDED GOOGLE DRIVE RESOURCES HUB */}
        <section
          id="resources"
          className="relative z-10 border-y border-white/5 bg-[#131416]/80 py-24"
        >
          <div className="mx-auto max-w-[1320px] px-6">
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
              className="mb-10 text-center"
            >
              <p className="font-heading mb-3 inline-flex items-center gap-2 text-xs font-bold tracking-[0.2em] text-[#f26522] uppercase">
                <FolderOpen className="h-4 w-4" />
                <span>Google Drive Library</span>
              </p>
              <h2 className="font-display animated-gradient-text mb-4 text-[clamp(2.5rem,5vw,4rem)] leading-[1.05] text-balance uppercase">
                EMBEDDED <span className="text-[#f26522]">RESOURCES</span>
              </h2>
              <p className="mx-auto max-w-2xl text-base leading-relaxed text-[#d0d1d6] sm:text-lg">
                Access and download my original Google Drive documents, 3D CAD
                files (.STEP / .SLDPRT / .PDF), STLs, and project documentation.
              </p>
            </motion.div>

            <div className="glass-panel rounded-2xl p-6 sm:p-10">
              <div className="mx-auto mb-8 max-w-xl">
                <div className="relative">
                  <Search className="pointer-events-none absolute top-1/2 left-4 h-5 w-5 -translate-y-1/2 text-[#8c8f9a]" />
                  <input
                    type="text"
                    value={resourceSearch}
                    onChange={(e) => setResourceSearch(e.target.value)}
                    placeholder="Search CAD files, PDF drawings, or project folders..."
                    aria-label="Search Google Drive resources"
                    className="w-full rounded-xl border border-white/10 bg-white/[0.04] py-3.5 pr-4 pl-12 text-sm text-white placeholder-[#8c8f9a] transition-all outline-none focus:border-[#f26522] focus:shadow-[0_0_16px_rgba(242,101,34,0.3)] sm:text-base"
                  />
                </div>
              </div>

              {filteredResources.length === 0 ? (
                <p className="py-10 text-center text-sm text-[#8c8f9a]">
                  No matching Drive resources found.
                </p>
              ) : (
                <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
                  {filteredResources.map((resource) => {
                    const isLocalResume =
                      resource.url === PORTFOLIO_DATA.contact.resumeDriveUrl;
                    return (
                      <a
                        key={resource.name}
                        href={resource.url}
                        target={isLocalResume ? undefined : '_blank'}
                        rel={isLocalResume ? undefined : 'noopener noreferrer'}
                        onClick={(e) => {
                          if (isLocalResume) {
                            e.preventDefault();
                            setResumeModalOpen(true);
                          }
                        }}
                        className="group flex items-center justify-between gap-4 rounded-xl border border-white/8 bg-white/[0.02] p-4 transition-all duration-200 hover:translate-x-1 hover:border-[#f26522] hover:bg-[#800606]/25"
                      >
                        <div className="flex min-w-0 items-center gap-3.5">
                          <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-[#f26522]/15 text-[#f26522]">
                            <PortfolioIcon
                              name={resource.iconName}
                              className="h-5 w-5"
                            />
                          </div>
                          <div className="min-w-0">
                            <p className="font-heading truncate text-sm font-semibold text-white">
                              {resource.name}
                            </p>
                            <p className="text-xs text-[#8c8f9a]">
                              {resource.type} <span aria-hidden="true">·</span>{' '}
                              {resource.size}
                            </p>
                          </div>
                        </div>
                        <ExternalLink className="h-4 w-4 shrink-0 text-[#f26522] transition-transform group-hover:scale-115 group-hover:text-white" />
                      </a>
                    );
                  })}
                </div>
              )}
            </div>
          </div>
        </section>

        {/* OFFICIAL RESUME / CV SECTION */}
        <ResumeSection onOpenFullscreen={() => setResumeModalOpen(true)} />

        {/* CONTACT & QUICK CONNECT SECTION */}
        <section id="contact" className="relative z-10 py-24">
          <div className="mx-auto max-w-[1320px] px-6">
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
              className="mb-14 text-center"
            >
              <p className="font-heading mb-3 inline-flex items-center gap-2 text-xs font-bold tracking-[0.2em] text-[#f26522] uppercase">
                <Mail className="h-4 w-4" />
                <span>Get In Touch</span>
              </p>
              <h2 className="font-display animated-gradient-text mb-4 text-[clamp(2.5rem,5vw,4rem)] leading-[1.05] text-balance uppercase">
                CONTACT <span className="text-[#f26522]">MOSHIUR</span>
              </h2>
              <p className="mx-auto max-w-2xl text-base leading-relaxed text-[#d0d1d6] sm:text-lg">
                Available for mechanical design consultations, paid 3D printing
                projects, and CAD modeling collaborations.
              </p>
            </motion.div>

            <div className="grid grid-cols-1 items-start gap-10 lg:grid-cols-12">
              {/* Contact Cards */}
              <div className="flex flex-col gap-4 lg:col-span-5">
                <a
                  href={`mailto:${PORTFOLIO_DATA.contact.email}`}
                  className="glass-panel flex items-center gap-4 rounded-2xl p-5 transition-transform hover:-translate-y-0.5"
                >
                  <div className="flex h-13 w-13 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-[#800606] to-[#f26522] text-white shadow-lg">
                    <Mail className="h-6 w-6" />
                  </div>
                  <div className="min-w-0">
                    <p className="font-heading text-xs font-bold tracking-wider text-[#8c8f9a] uppercase">
                      Email Address
                    </p>
                    <p className="font-heading truncate text-base font-semibold text-white sm:text-lg">
                      {PORTFOLIO_DATA.contact.email}
                    </p>
                  </div>
                </a>

                <a
                  href={PORTFOLIO_DATA.contact.whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="glass-panel flex items-center gap-4 rounded-2xl p-5 transition-transform hover:-translate-y-0.5"
                >
                  <div className="flex h-13 w-13 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-[#800606] to-[#f26522] text-white shadow-lg">
                    <MessageCircle className="h-6 w-6" />
                  </div>
                  <div className="min-w-0">
                    <p className="font-heading text-xs font-bold tracking-wider text-[#8c8f9a] uppercase">
                      Phone / WhatsApp
                    </p>
                    <p className="font-heading font-mono-num truncate text-base font-semibold text-white sm:text-lg">
                      {PORTFOLIO_DATA.contact.phone}
                    </p>
                  </div>
                </a>

                <a
                  href={PORTFOLIO_DATA.contact.linkedinUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="glass-panel flex items-center gap-4 rounded-2xl p-5 transition-transform hover:-translate-y-0.5"
                >
                  <div className="flex h-13 w-13 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-[#800606] to-[#f26522] text-white shadow-lg">
                    <Linkedin className="h-6 w-6" />
                  </div>
                  <div className="min-w-0">
                    <p className="font-heading text-xs font-bold tracking-wider text-[#8c8f9a] uppercase">
                      LinkedIn Profile
                    </p>
                    <p className="font-heading truncate text-base font-semibold text-white sm:text-lg">
                      {PORTFOLIO_DATA.contact.linkedinHandle}
                    </p>
                  </div>
                </a>

                <a
                  href={PORTFOLIO_DATA.contact.grabcadUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="glass-panel flex items-center gap-4 rounded-2xl p-5 transition-transform hover:-translate-y-0.5"
                >
                  <div className="flex h-13 w-13 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-[#800606] to-[#f26522] text-white shadow-lg">
                    <Globe className="h-6 w-6" />
                  </div>
                  <div className="min-w-0">
                    <p className="font-heading text-xs font-bold tracking-wider text-[#8c8f9a] uppercase">
                      GrabCAD Portfolio
                    </p>
                    <p className="font-heading truncate text-base font-semibold text-white sm:text-lg">
                      {PORTFOLIO_DATA.contact.grabcadHandle}
                    </p>
                  </div>
                </a>
              </div>

              {/* Contact Form */}
              <div className="glass-panel rounded-2xl p-7 sm:p-10 lg:col-span-7">
                <form onSubmit={handleContactSubmit} className="space-y-5">
                  <div>
                    <label
                      htmlFor="contact-name"
                      className="font-heading mb-2 block text-sm font-semibold text-[#d0d1d6]"
                    >
                      Your Full Name
                    </label>
                    <input
                      id="contact-name"
                      type="text"
                      required
                      value={formState.name}
                      onChange={(e) =>
                        setFormState((s) => ({ ...s, name: e.target.value }))
                      }
                      placeholder="John Doe"
                      className="w-full rounded-xl border border-white/10 bg-white/[0.04] px-4 py-3 text-sm text-white placeholder-[#8c8f9a] transition-colors outline-none focus:border-[#f26522] focus:bg-white/[0.08] sm:text-base"
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="contact-email"
                      className="font-heading mb-2 block text-sm font-semibold text-[#d0d1d6]"
                    >
                      Your Email Address
                    </label>
                    <input
                      id="contact-email"
                      type="email"
                      required
                      value={formState.email}
                      onChange={(e) =>
                        setFormState((s) => ({ ...s, email: e.target.value }))
                      }
                      placeholder="name@example.com"
                      className="w-full rounded-xl border border-white/10 bg-white/[0.04] px-4 py-3 text-sm text-white placeholder-[#8c8f9a] transition-colors outline-none focus:border-[#f26522] focus:bg-white/[0.08] sm:text-base"
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="contact-subject"
                      className="font-heading mb-2 block text-sm font-semibold text-[#d0d1d6]"
                    >
                      Project / Requirement Type
                    </label>
                    <input
                      id="contact-subject"
                      type="text"
                      value={formState.subject}
                      onChange={(e) =>
                        setFormState((s) => ({ ...s, subject: e.target.value }))
                      }
                      placeholder="e.g. 3D Printing, SolidWorks CAD Modeling, Product Design"
                      className="w-full rounded-xl border border-white/10 bg-white/[0.04] px-4 py-3 text-sm text-white placeholder-[#8c8f9a] transition-colors outline-none focus:border-[#f26522] focus:bg-white/[0.08] sm:text-base"
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="contact-message"
                      className="font-heading mb-2 block text-sm font-semibold text-[#d0d1d6]"
                    >
                      Message Details
                    </label>
                    <textarea
                      id="contact-message"
                      required
                      rows={4}
                      value={formState.message}
                      onChange={(e) =>
                        setFormState((s) => ({ ...s, message: e.target.value }))
                      }
                      placeholder="Describe your mechanical design or 3D modeling requirement..."
                      className="w-full resize-y rounded-xl border border-white/10 bg-white/[0.04] px-4 py-3 text-sm text-white placeholder-[#8c8f9a] transition-colors outline-none focus:border-[#f26522] focus:bg-white/[0.08] sm:text-base"
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={isSending}
                    className="font-heading inline-flex w-full cursor-pointer items-center justify-center gap-2.5 rounded-xl border border-white/20 bg-gradient-to-br from-[#800606] to-[#a80909] px-6 py-3.5 text-sm font-semibold text-white shadow-[0_10px_28px_rgba(128,6,6,0.45)] transition-all duration-200 hover:-translate-y-0.5 hover:border-[#f26522] hover:from-[#990707] hover:to-[#f26522] disabled:cursor-not-allowed disabled:opacity-60 sm:text-base"
                  >
                    {isSending ? (
                      <>
                        <Loader2 className="h-5 w-5 animate-spin" />
                        <span>Sending to moshiurca12@gmail.com...</span>
                      </>
                    ) : (
                      <>
                        <Send className="h-4 w-4" />
                        <span>Send Message to moshiurca12@gmail.com</span>
                      </>
                    )}
                  </button>
                </form>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="relative z-10 border-t border-white/10 py-10">
        <div className="mx-auto flex max-w-[1320px] flex-col items-center justify-between gap-4 px-6 text-center text-sm text-[#8c8f9a] sm:flex-row sm:text-left">
          <p>
            © 2026 Md Moshiur Rahman <span aria-hidden="true">·</span> Mechanical
            Designer & 3D Modeling Specialist. All Rights Reserved.
          </p>
          <div className="flex items-center gap-5">
            <a
              href={PORTFOLIO_DATA.contact.grabcadUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="transition-colors hover:text-[#f26522]"
            >
              GrabCAD
            </a>
            <a
              href={PORTFOLIO_DATA.contact.linkedinUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="transition-colors hover:text-[#f26522]"
            >
              LinkedIn
            </a>
            <a
              href={PORTFOLIO_DATA.contact.masterDriveFolder}
              target="_blank"
              rel="noopener noreferrer"
              className="transition-colors hover:text-[#f26522]"
            >
              Google Drive
            </a>
          </div>
        </div>
      </footer>

      {/* Toast Notification */}
      {toastMessage && (
        <div
          role="status"
          aria-live="polite"
          className="fixed right-6 bottom-6 z-50 flex items-center gap-3 rounded-xl border border-[#f26522] bg-[#1a1c20] px-5 py-3.5 text-sm font-semibold text-white shadow-[0_12px_32px_rgba(0,0,0,0.8)]"
        >
          <CheckCircle2 className="h-5 w-5 shrink-0 text-emerald-400" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Modals */}
      <ResumeModal
        open={resumeModalOpen}
        onClose={() => setResumeModalOpen(false)}
      />
      <ProjectLightboxModal
        project={previewProject}
        onClose={() => setPreviewProject(null)}
      />
      <CertificateLightboxModal
        certificate={previewCertificate}
        onClose={() => setPreviewCertificate(null)}
      />
    </div>
  );
}
