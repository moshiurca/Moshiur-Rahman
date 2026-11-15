import React, { useState } from 'react';
import { motion } from 'motion/react';
import {
  Award,
  BadgeCheck,
  Briefcase,
  Download,
  ExternalLink,
  FileText,
  GraduationCap,
  Languages,
  Loader2,
  MapPin,
  Maximize2,
  Phone,
  Mail,
  Users,
  Wrench,
} from 'lucide-react';
import { PORTFOLIO_DATA } from '../data/portfolioData';

interface ResumeSectionProps {
  onOpenFullscreen: () => void;
}

export const ResumeSection: React.FC<ResumeSectionProps> = ({
  onOpenFullscreen,
}) => {
  const [viewMode, setViewMode] = useState<'structured' | 'pages'>('structured');
  const [downloading, setDownloading] = useState(false);

  const cv = PORTFOLIO_DATA.resumeDetails;

  const handleDownloadPdf = async () => {
    setDownloading(true);
    try {
      const response = await fetch(PORTFOLIO_DATA.contact.resumeDriveUrl);
      if (!response.ok) throw new Error('Failed to fetch PDF');
      const blob = await response.blob();
      const blobUrl = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = blobUrl;
      link.download = 'MD_MOSHIUR_RAHMAN_CV.pdf';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      setTimeout(() => URL.revokeObjectURL(blobUrl), 2000);
    } catch {
      const fallback = document.createElement('a');
      fallback.href = PORTFOLIO_DATA.contact.resumeDriveUrl;
      fallback.download = 'MD_MOSHIUR_RAHMAN_CV.pdf';
      fallback.click();
    } finally {
      setDownloading(false);
    }
  };

  return (
    <section
      id="resume"
      className="relative z-10 border-t border-white/5 bg-[#1a1c20]/30 py-24"
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
            <FileText className="h-4 w-4" />
            <span>Curriculum Vitae</span>
          </p>
          <h2 className="font-display animated-gradient-text mb-4 text-[clamp(2.5rem,5vw,4rem)] leading-[1.05] text-balance uppercase">
            OFFICIAL <span className="text-[#f26522]">RESUME</span>
          </h2>
          <p className="mx-auto max-w-2xl text-base leading-relaxed text-[#d0d1d6] sm:text-lg">
            Education, industrial experience, SolidWorks professional
            certifications, and technical qualifications.
          </p>
        </motion.div>

        {/* Action & View Toggle Bar */}
        <div className="mb-8 flex flex-wrap items-center justify-between gap-4 rounded-2xl border border-white/10 bg-[#1a1c20]/80 p-4 backdrop-blur-md">
          <div
            role="tablist"
            aria-label="Resume view mode"
            className="flex items-center gap-1 rounded-xl border border-white/10 bg-[#131416] p-1"
          >
            <button
              type="button"
              role="tab"
              aria-selected={viewMode === 'structured'}
              onClick={() => setViewMode('structured')}
              className={`font-heading shrink-0 cursor-pointer rounded-lg px-4 py-2 text-xs font-semibold whitespace-nowrap transition-colors sm:text-sm ${
                viewMode === 'structured'
                  ? 'bg-[#800606] text-white shadow-sm'
                  : 'text-[#d0d1d6] hover:text-white'
              }`}
            >
              Interactive Resume
            </button>
            <button
              type="button"
              role="tab"
              aria-selected={viewMode === 'pages'}
              onClick={() => setViewMode('pages')}
              className={`font-heading shrink-0 cursor-pointer rounded-lg px-4 py-2 text-xs font-semibold whitespace-nowrap transition-colors sm:text-sm ${
                viewMode === 'pages'
                  ? 'bg-[#800606] text-white shadow-sm'
                  : 'text-[#d0d1d6] hover:text-white'
              }`}
            >
              Original PDF Pages (2)
            </button>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <button
              type="button"
              onClick={onOpenFullscreen}
              className="font-heading inline-flex shrink-0 cursor-pointer items-center gap-2 rounded-xl border border-white/15 bg-white/5 px-4 py-2 text-xs font-semibold whitespace-nowrap text-white transition-colors hover:border-[#f26522] hover:bg-[#f26522]/15 sm:text-sm"
            >
              <Maximize2 className="h-4 w-4 text-[#f26522]" />
              <span>Fullscreen Viewer</span>
            </button>

            <button
              type="button"
              onClick={handleDownloadPdf}
              disabled={downloading}
              className="font-heading inline-flex shrink-0 cursor-pointer items-center gap-2 rounded-xl border border-[#f26522]/50 bg-gradient-to-br from-[#800606] to-[#a80909] px-5 py-2 text-xs font-semibold whitespace-nowrap text-white shadow-[0_8px_22px_rgba(128,6,6,0.4)] transition-all hover:border-[#f26522] hover:from-[#990707] hover:to-[#f26522] disabled:opacity-60 sm:text-sm"
            >
              {downloading ? (
                <Loader2 className="h-4 w-4 animate-spin" />
              ) : (
                <Download className="h-4 w-4" />
              )}
              <span>{downloading ? 'Downloading...' : 'Download CV PDF'}</span>
            </button>
          </div>
        </div>

        {viewMode === 'pages' ? (
          <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">
            {[
              { src: '/assets/cv-page-1.png', label: 'Page 1 of 2' },
              { src: '/assets/cv-page-2.png', label: 'Page 2 of 2' },
            ].map((page) => (
              <div
                key={page.src}
                className="overflow-hidden rounded-2xl border border-white/10 bg-white shadow-2xl"
              >
                <div className="flex items-center justify-between border-b border-slate-200 bg-slate-100 px-5 py-2.5 text-xs font-semibold text-slate-700">
                  <span>MD MOSHIUR RAHMAN — CV</span>
                  <span className="font-mono-num">{page.label}</span>
                </div>
                <img
                  src={page.src}
                  alt={`Md Moshiur Rahman CV ${page.label}`}
                  className="block h-auto w-full"
                />
              </div>
            ))}
          </div>
        ) : (
          <div className="space-y-8">
            {/* CV Top Header + Career Objective */}
            <div className="glass-panel rounded-2xl p-6 sm:p-8">
              <div className="flex flex-col justify-between gap-6 border-b border-white/10 pb-6 md:flex-row md:items-center">
                <div>
                  <h3 className="font-display text-3xl tracking-wide text-white sm:text-4xl">
                    {cv.header.name}
                  </h3>
                  <p className="font-heading mt-1 text-base font-semibold text-[#f26522]">
                    {cv.header.role}
                  </p>
                  <div className="mt-3 flex flex-wrap items-center gap-x-5 gap-y-2 text-sm text-[#d0d1d6]">
                    <span className="font-mono-num inline-flex items-center gap-1.5">
                      <Phone className="h-4 w-4 text-[#f26522]" />
                      {cv.header.phone}
                    </span>
                    <a
                      href={`mailto:${cv.header.email}`}
                      className="inline-flex items-center gap-1.5 transition-colors hover:text-[#f26522]"
                    >
                      <Mail className="h-4 w-4 text-[#f26522]" />
                      {cv.header.email}
                    </a>
                    <span className="inline-flex items-center gap-1.5">
                      <MapPin className="h-4 w-4 text-[#f26522]" />
                      {cv.header.location}
                    </span>
                  </div>
                </div>

                <div className="flex flex-wrap items-center gap-3">
                  <a
                    href={cv.header.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="font-heading inline-flex items-center gap-2 rounded-xl border border-white/15 bg-white/5 px-4 py-2 text-xs font-semibold whitespace-nowrap text-white transition-colors hover:border-[#f26522] hover:text-[#f26522]"
                  >
                    <ExternalLink className="h-3.5 w-3.5" />
                    LinkedIn
                  </a>
                  <a
                    href={cv.header.grabcad}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="font-heading inline-flex items-center gap-2 rounded-xl border border-white/15 bg-white/5 px-4 py-2 text-xs font-semibold whitespace-nowrap text-white transition-colors hover:border-[#f26522] hover:text-[#f26522]"
                  >
                    <ExternalLink className="h-3.5 w-3.5" />
                    GrabCAD Portfolio
                  </a>
                </div>
              </div>

              <div className="pt-6">
                <h4 className="font-heading mb-2 text-xs font-bold tracking-[0.16em] text-[#f26522] uppercase">
                  Career Objective
                </h4>
                <p className="text-sm leading-relaxed text-[#d0d1d6] sm:text-base">
                  {cv.objective}
                </p>
              </div>
            </div>

            {/* Experience & Education 2-Column Split */}
            <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">
              {/* Experience */}
              <div className="glass-panel rounded-2xl p-6 sm:p-8">
                <h4 className="font-heading mb-6 flex items-center gap-2.5 text-xl font-bold text-white">
                  <Briefcase className="h-5 w-5 text-[#f26522]" />
                  <span>Experience</span>
                </h4>
                <div className="space-y-6">
                  {cv.experience.map((exp) => (
                    <div
                      key={exp.company}
                      className="rounded-xl border border-white/8 bg-white/[0.02] p-5"
                    >
                      <div className="mb-2 flex flex-wrap items-baseline justify-between gap-2">
                        <h5 className="font-heading text-lg font-bold text-white">
                          {exp.company}
                        </h5>
                        <span className="font-mono-num text-xs text-[#f26522]">
                          {exp.period}
                        </span>
                      </div>
                      <p className="font-heading mb-3 text-sm font-semibold text-[#d0d1d6]">
                        {exp.role}
                      </p>
                      <ul className="space-y-1.5 text-sm text-[#8c8f9a]">
                        {exp.points.map((pt) => (
                          <li key={pt} className="flex items-start gap-2">
                            <span
                              aria-hidden="true"
                              className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-[#f26522]"
                            />
                            <span>{pt}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>
              </div>

              {/* Education */}
              <div className="glass-panel rounded-2xl p-6 sm:p-8">
                <h4 className="font-heading mb-6 flex items-center gap-2.5 text-xl font-bold text-white">
                  <GraduationCap className="h-5 w-5 text-[#f26522]" />
                  <span>Education</span>
                </h4>
                <div className="space-y-4">
                  {cv.education.map((edu) => (
                    <div
                      key={edu.degree}
                      className="rounded-xl border border-white/8 bg-white/[0.02] p-5"
                    >
                      <div className="mb-1 flex flex-wrap items-baseline justify-between gap-2">
                        <h5 className="font-heading text-base font-bold text-white sm:text-lg">
                          {edu.degree}
                        </h5>
                        <span className="font-mono-num text-xs font-semibold text-[#f26522]">
                          {edu.grade}
                        </span>
                      </div>
                      <p className="mb-1 text-sm text-[#d0d1d6]">
                        {edu.institution}
                      </p>
                      <p className="font-mono-num text-xs text-[#8c8f9a]">
                        {edu.period}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Certifications & Software / Core Skills */}
            <div className="grid grid-cols-1 gap-8 lg:grid-cols-12">
              {/* Certifications */}
              <div className="glass-panel rounded-2xl p-6 sm:p-8 lg:col-span-6">
                <h4 className="font-heading mb-6 flex items-center gap-2.5 text-xl font-bold text-white">
                  <BadgeCheck className="h-5 w-5 text-[#f26522]" />
                  <span>SolidWorks Certifications</span>
                </h4>
                <div className="space-y-3">
                  {cv.certifications.map((cert) => (
                    <div
                      key={cert.code}
                      className="flex flex-wrap items-center justify-between gap-2 rounded-xl border border-white/8 bg-white/[0.02] px-4 py-3"
                    >
                      <span className="font-heading text-sm font-semibold text-white">
                        {cert.title}
                      </span>
                      <span className="font-mono-num text-xs text-[#f26522]">
                        ID: {cert.code}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Software & Core Skills */}
              <div className="glass-panel rounded-2xl p-6 sm:p-8 lg:col-span-6">
                <h4 className="font-heading mb-5 flex items-center gap-2.5 text-xl font-bold text-white">
                  <Wrench className="h-5 w-5 text-[#f26522]" />
                  <span>Software & Technical Competencies</span>
                </h4>

                <div className="mb-6">
                  <p className="font-heading mb-2 text-xs font-bold tracking-wider text-[#f26522] uppercase">
                    Software Proficiency
                  </p>
                  <p className="text-sm leading-relaxed text-[#d0d1d6]">
                    {cv.softwareSkills.join(' · ')}
                  </p>
                </div>

                <div className="border-t border-white/10 pt-5">
                  <p className="font-heading mb-3 text-xs font-bold tracking-wider text-[#f26522] uppercase">
                    Core Engineering Skills
                  </p>
                  <div className="grid grid-cols-1 gap-2 text-sm text-[#d0d1d6] sm:grid-cols-2">
                    {cv.coreSkills.map((skill) => (
                      <div key={skill} className="flex items-start gap-2">
                        <span
                          aria-hidden="true"
                          className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-[#f26522]"
                        />
                        <span>{skill}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Awards, Extracurricular & Languages */}
            <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
              <div className="glass-panel rounded-2xl p-6">
                <h4 className="font-heading mb-4 flex items-center gap-2 text-lg font-bold text-white">
                  <Award className="h-5 w-5 text-[#f26522]" />
                  <span>Awards & Achievements</span>
                </h4>
                <ul className="space-y-2.5 text-sm leading-relaxed text-[#d0d1d6]">
                  {cv.awards.map((award) => (
                    <li key={award} className="flex items-start gap-2">
                      <span
                        aria-hidden="true"
                        className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-[#f26522]"
                      />
                      <span>{award}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="glass-panel rounded-2xl p-6">
                <h4 className="font-heading mb-4 flex items-center gap-2 text-lg font-bold text-white">
                  <Users className="h-5 w-5 text-[#f26522]" />
                  <span>Extracurricular Activities</span>
                </h4>
                <ul className="space-y-2.5 text-sm leading-relaxed text-[#d0d1d6]">
                  {cv.extracurricular.map((item) => (
                    <li key={item} className="flex items-start gap-2">
                      <span
                        aria-hidden="true"
                        className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-[#f26522]"
                      />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="glass-panel rounded-2xl p-6">
                <h4 className="font-heading mb-4 flex items-center gap-2 text-lg font-bold text-white">
                  <Languages className="h-5 w-5 text-[#f26522]" />
                  <span>Languages</span>
                </h4>
                <div className="space-y-3">
                  {cv.languages.map((lang) => (
                    <div
                      key={lang.name}
                      className="flex items-center justify-between border-b border-white/8 pb-2.5 text-sm last:border-b-0 last:pb-0"
                    >
                      <span className="font-heading font-semibold text-white">
                        {lang.name}
                      </span>
                      <span className="text-[#8c8f9a]">{lang.level}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};
