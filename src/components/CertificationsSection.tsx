import React, { useMemo, useState } from 'react';
import { motion } from 'motion/react';
import {
  Award,
  BadgeCheck,
  Download,
  ExternalLink,
  FolderOpen,
  Loader2,
  Maximize2,
} from 'lucide-react';
import {
  CertificationCategory,
  CertificationItem,
  PORTFOLIO_DATA,
} from '../data/portfolioData';
import { PdfPageCanvas } from './PdfPageCanvas';
import { TiltCard } from './TiltCard';

interface CertificationsSectionProps {
  onPreviewCertificate: (cert: CertificationItem) => void;
}

const CERT_FILTERS: { id: CertificationCategory; label: string }[] = [
  { id: 'all', label: 'All Certifications' },
  { id: 'SolidWorks', label: 'SolidWorks' },
  { id: 'Others', label: 'Others' },
];

export const CertificationsSection: React.FC<CertificationsSectionProps> = ({
  onPreviewCertificate,
}) => {
  const [selectedFilter, setSelectedFilter] =
    useState<CertificationCategory>('all');
  const [downloadingId, setDownloadingId] = useState<string | null>(null);

  const filteredCerts = useMemo(() => {
    if (selectedFilter === 'all') return PORTFOLIO_DATA.certifications;
    return PORTFOLIO_DATA.certifications.filter(
      (c) => c.category === selectedFilter
    );
  }, [selectedFilter]);

  const handleDownloadCert = async (cert: CertificationItem) => {
    setDownloadingId(cert.id);
    try {
      const response = await fetch(cert.pdfUrl);
      if (!response.ok) throw new Error('Download failed');
      const blob = await response.blob();
      const blobUrl = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = blobUrl;
      link.download = cert.downloadFileName;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      setTimeout(() => URL.revokeObjectURL(blobUrl), 2000);
    } catch {
      const fallback = document.createElement('a');
      fallback.href = cert.pdfUrl;
      fallback.download = cert.downloadFileName;
      fallback.click();
    } finally {
      setDownloadingId(null);
    }
  };

  return (
    <section
      id="certifications"
      className="relative z-10 border-t border-white/5 bg-[#131416]/85 py-24"
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
            <BadgeCheck className="h-4 w-4" />
            <span>Verified Credentials</span>
          </p>
          <h2 className="font-display animated-gradient-text mb-4 text-[clamp(2.5rem,5vw,4rem)] leading-[1.05] text-balance uppercase">
            CERTIFICATIONS & <span className="text-[#f26522]">LICENSES</span>
          </h2>
          <p className="mx-auto max-w-2xl text-base leading-relaxed text-[#d0d1d6] sm:text-lg">
            Official Dassault Systèmes SOLIDWORKS certifications ordered by
            credential tier, with direct preview, PDF download, and Google Drive
            access.
          </p>
        </motion.div>

        {/* Category Filter Tabs (SolidWorks + Others) */}
        <div
          role="tablist"
          aria-label="Certification categories"
          className="mb-12 flex flex-wrap justify-center gap-2.5"
        >
          {CERT_FILTERS.map((cat) => {
            const active = selectedFilter === cat.id;
            return (
              <button
                key={cat.id}
                type="button"
                role="tab"
                aria-selected={active}
                onClick={() => setSelectedFilter(cat.id)}
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

        {filteredCerts.length === 0 ? (
          <div className="glass-panel mx-auto max-w-2xl rounded-2xl p-10 text-center">
            <Award className="mx-auto mb-3 h-10 w-10 text-[#f26522]" />
            <h3 className="font-heading mb-2 text-xl font-bold text-white">
              Other Certifications Slot
            </h3>
            <p className="mb-6 text-sm leading-relaxed text-[#d0d1d6]">
              Additional engineering, CAM, ANSYS, or AI certifications can be
              added here at any time alongside your verified SolidWorks
              credentials.
            </p>
            <a
              href={PORTFOLIO_DATA.contact.masterDriveFolder}
              target="_blank"
              rel="noopener noreferrer"
              className="font-heading inline-flex items-center gap-2 rounded-xl border border-white/15 bg-white/5 px-5 py-2.5 text-sm font-semibold text-white transition-colors hover:border-[#f26522] hover:bg-[#f26522]/15"
            >
              <FolderOpen className="h-4 w-4 text-[#f26522]" />
              <span>Open Google Drive Certificates Folder</span>
            </a>
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-7 md:grid-cols-2 lg:grid-cols-3">
            {filteredCerts.map((cert, idx) => {
              const isDownloading = downloadingId === cert.id;
              return (
                <motion.div
                  key={cert.id}
                  initial={{ opacity: 0, y: 26 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.12 }}
                  transition={{
                    duration: 0.5,
                    delay: Math.min(idx * 0.07, 0.25),
                    ease: [0.16, 1, 0.3, 1],
                  }}
                >
                  <TiltCard
                    intensity={18}
                    className="glass-panel group flex h-full flex-col overflow-hidden rounded-[20px]"
                  >
                    {/* Crisp Visible Certificate Image Preview */}
                    <div
                      role="button"
                      tabIndex={0}
                      onClick={() => onPreviewCertificate(cert)}
                      onKeyDown={(e) => {
                        if (e.key === 'Enter' || e.key === ' ') {
                          e.preventDefault();
                          onPreviewCertificate(cert);
                        }
                      }}
                      aria-label={`View full ${cert.title} certificate`}
                      className="relative aspect-[1.414/1] w-full cursor-pointer overflow-hidden border-b border-[#f26522]/30 bg-white focus-visible:outline-2 focus-visible:outline-[#f26522]"
                    >
                      <PdfPageCanvas
                        url={cert.pdfUrl}
                        scale={1.45}
                        alt={cert.title}
                        className="h-full w-full transition-transform duration-500 ease-out group-hover:scale-[1.03]"
                      />
                      <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/35 via-transparent to-transparent opacity-0 transition-opacity duration-200 group-hover:opacity-100" />
                      <div className="absolute right-3 bottom-3 flex items-center gap-1.5 rounded-lg border border-white/20 bg-[#131416]/90 px-3 py-1.5 text-xs font-medium text-white opacity-0 shadow-lg backdrop-blur-md transition-opacity duration-200 group-hover:opacity-100">
                        <Maximize2 className="h-3.5 w-3.5 text-[#f26522]" />
                        <span>View Certificate</span>
                      </div>
                    </div>

                    {/* Certificate Metadata & Actions */}
                    <div className="flex flex-1 flex-col p-6">
                      <p className="mb-1.5 font-heading text-xs font-semibold tracking-wide text-[#f26522]">
                        <span className="font-mono-num">{cert.order}</span>{' '}
                        <span aria-hidden="true">·</span> {cert.shortCode}{' '}
                        <span aria-hidden="true">·</span> {cert.issuedDate}
                      </p>

                      <h3 className="mb-1.5 font-heading text-lg font-bold text-white transition-colors group-hover:text-[#ff8a4c] sm:text-xl">
                        {cert.title}
                      </h3>

                      <p className="mb-4 flex-1 text-xs leading-relaxed text-[#8c8f9a] sm:text-sm">
                        {cert.issuer} <span aria-hidden="true">·</span>{' '}
                        <span className="font-mono-num text-[#d0d1d6]">
                          ID: {cert.verificationCode}
                        </span>
                      </p>

                      <div className="flex flex-wrap items-center gap-2.5">
                        <a
                          href={cert.driveUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="font-heading inline-flex flex-1 items-center justify-center gap-2 rounded-xl border border-white/20 bg-gradient-to-br from-[#800606] to-[#a80909] px-3.5 py-2.5 text-xs font-semibold whitespace-nowrap text-white shadow-[0_8px_20px_rgba(128,6,6,0.35)] transition-all duration-200 hover:-translate-y-0.5 hover:border-[#f26522] hover:from-[#990707] hover:to-[#f26522] sm:text-sm"
                        >
                          <ExternalLink className="h-3.5 w-3.5 shrink-0" />
                          <span>Google Drive</span>
                        </a>

                        <button
                          type="button"
                          onClick={() => handleDownloadCert(cert)}
                          disabled={isDownloading}
                          className="font-heading inline-flex shrink-0 cursor-pointer items-center justify-center gap-1.5 rounded-xl border border-white/15 bg-white/5 px-3.5 py-2.5 text-xs font-semibold whitespace-nowrap text-white transition-colors hover:border-[#f26522] hover:bg-[#f26522]/15 disabled:opacity-60 sm:text-sm"
                        >
                          {isDownloading ? (
                            <Loader2 className="h-3.5 w-3.5 animate-spin text-[#f26522]" />
                          ) : (
                            <Download className="h-3.5 w-3.5 text-[#f26522]" />
                          )}
                          <span>PDF</span>
                        </button>
                      </div>
                    </div>
                  </TiltCard>
                </motion.div>
              );
            })}
          </div>
        )}
      </div>
    </section>
  );
};
