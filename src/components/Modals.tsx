import React, { useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import { Download, ExternalLink, FileText, Loader2, X } from 'lucide-react';
import {
  CertificationItem,
  PORTFOLIO_DATA,
  ProjectItem,
} from '../data/portfolioData';
import { PdfPageCanvas } from './PdfPageCanvas';

interface ResumeModalProps {
  open: boolean;
  onClose: () => void;
}

const CV_PAGES = [
  { src: '/assets/cv-page-1.png', label: 'Page 1 of 2' },
  { src: '/assets/cv-page-2.png', label: 'Page 2 of 2' },
];

export const ResumeModal: React.FC<ResumeModalProps> = ({ open, onClose }) => {
  const [downloading, setDownloading] = useState(false);

  useEffect(() => {
    if (!open) return;
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [open, onClose]);

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
      const fallbackLink = document.createElement('a');
      fallbackLink.href = PORTFOLIO_DATA.contact.resumeDriveUrl;
      fallbackLink.download = 'MD_MOSHIUR_RAHMAN_CV.pdf';
      fallbackLink.click();
    } finally {
      setDownloading(false);
    }
  };

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          onClick={onClose}
          className="fixed inset-0 z-50 flex items-center justify-center bg-[#0a0a0c]/88 p-4 backdrop-blur-md"
          role="dialog"
          aria-modal="true"
          aria-label="Md Moshiur Rahman Official Resume"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.96, y: 12 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.96, y: 12 }}
            transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
            onClick={(e) => e.stopPropagation()}
            className="flex max-h-[92vh] w-full max-w-4xl flex-col overflow-hidden rounded-2xl border border-[#f26522]/35 bg-[#1a1c20] shadow-[0_30px_60px_rgba(0,0,0,0.85)]"
          >
            <div className="flex flex-wrap items-center justify-between gap-3 border-b border-white/10 px-5 py-4 sm:px-6">
              <div className="flex items-center gap-3">
                <FileText className="h-5 w-5 shrink-0 text-[#f26522]" />
                <div>
                  <h3 className="font-heading text-base font-bold text-white sm:text-lg">
                    Md Moshiur Rahman — Official CV / Resume
                  </h3>
                  <p className="text-xs text-[#8c8f9a]">
                    2 Pages <span aria-hidden="true">·</span> PDF Document
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-2.5">
                <button
                  type="button"
                  onClick={handleDownloadPdf}
                  disabled={downloading}
                  className="inline-flex cursor-pointer items-center gap-2 whitespace-nowrap rounded-lg border border-[#f26522]/50 bg-gradient-to-br from-[#800606] to-[#a80909] px-3.5 py-2 font-heading text-xs font-semibold text-white transition-all hover:border-[#f26522] hover:from-[#990707] hover:to-[#f26522] disabled:opacity-60"
                >
                  {downloading ? (
                    <Loader2 className="h-3.5 w-3.5 animate-spin" />
                  ) : (
                    <Download className="h-3.5 w-3.5" />
                  )}
                  <span>{downloading ? 'Downloading...' : 'Download PDF'}</span>
                </button>
                <a
                  href={PORTFOLIO_DATA.contact.resumeDriveUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 whitespace-nowrap rounded-lg border border-white/15 bg-white/5 px-3.5 py-2 font-heading text-xs font-semibold text-white transition-colors hover:border-[#f26522] hover:bg-[#f26522]/15"
                >
                  <ExternalLink className="h-3.5 w-3.5 text-[#f26522]" />
                  <span className="hidden sm:inline">Open Raw PDF</span>
                </a>
                <button
                  type="button"
                  onClick={onClose}
                  aria-label="Close resume preview"
                  className="flex h-9 w-9 cursor-pointer items-center justify-center rounded-lg border border-white/10 text-[#d0d1d6] transition-colors hover:border-[#f26522] hover:text-[#f26522]"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>
            </div>

            <div className="flex-1 overflow-y-auto bg-[#101114] p-4 sm:p-6">
              <div className="mx-auto flex max-w-3xl flex-col gap-6">
                {CV_PAGES.map((page) => (
                  <div
                    key={page.src}
                    className="overflow-hidden rounded-xl border border-white/10 bg-white shadow-2xl"
                  >
                    <div className="flex items-center justify-between border-b border-slate-200 bg-slate-100 px-4 py-2 text-xs font-medium text-slate-600">
                      <span>MD MOSHIUR RAHMAN — CV</span>
                      <span>{page.label}</span>
                    </div>
                    <img
                      src={page.src}
                      alt={`Md Moshiur Rahman CV ${page.label}`}
                      className="block h-auto w-full"
                    />
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

interface ProjectLightboxProps {
  project: ProjectItem | null;
  onClose: () => void;
}

export const ProjectLightboxModal: React.FC<ProjectLightboxProps> = ({
  project,
  onClose,
}) => {
  useEffect(() => {
    if (!project) return;
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [project, onClose]);

  return (
    <AnimatePresence>
      {project && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          onClick={onClose}
          className="fixed inset-0 z-50 flex items-center justify-center bg-[#0a0a0c]/88 p-4 backdrop-blur-md"
          role="dialog"
          aria-modal="true"
          aria-label={project.title}
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.96, y: 12 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.96, y: 12 }}
            transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
            onClick={(e) => e.stopPropagation()}
            className="flex max-h-[90vh] w-full max-w-4xl flex-col overflow-hidden rounded-2xl border border-[#f26522]/35 bg-[#1a1c20] shadow-[0_30px_70px_rgba(0,0,0,0.88)]"
          >
            <div className="flex items-center justify-between gap-4 border-b border-white/10 px-6 py-4">
              <div>
                <p className="font-heading text-xs font-semibold tracking-wider text-[#f26522] uppercase">
                  {project.category} · {project.type}
                </p>
                <h3 className="font-heading text-xl font-bold text-white">
                  {project.title}
                </h3>
              </div>
              <button
                type="button"
                onClick={onClose}
                aria-label="Close project preview"
                className="flex h-10 w-10 items-center justify-center rounded-lg border border-white/10 text-[#d0d1d6] transition-colors hover:border-[#f26522] hover:text-[#f26522]"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            <div className="overflow-y-auto p-6">
              <div className="mb-5 overflow-hidden rounded-xl border border-white/10 bg-[#131416]">
                <img
                  src={project.image}
                  alt={project.title}
                  referrerPolicy="no-referrer"
                  className="max-h-[52vh] w-full object-contain"
                />
              </div>

              <p className="mb-4 text-base leading-relaxed text-[#d0d1d6]">
                {project.description}
              </p>

              <div className="mb-6 flex flex-wrap items-center gap-2 text-xs text-[#8c8f9a]">
                {project.tags.map((tag, idx) => (
                  <React.Fragment key={tag}>
                    {idx > 0 && <span aria-hidden="true">·</span>}
                    <span>{tag}</span>
                  </React.Fragment>
                ))}
              </div>

              <div className="flex flex-wrap items-center justify-end gap-3 border-t border-white/10 pt-5">
                <button
                  type="button"
                  onClick={onClose}
                  className="whitespace-nowrap rounded-xl border border-white/15 bg-white/5 px-5 py-2.5 font-heading text-sm font-semibold text-white transition-colors hover:border-white/30"
                >
                  Close
                </button>
                <a
                  href={project.driveUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 whitespace-nowrap rounded-xl bg-gradient-to-r from-[#800606] to-[#f26522] px-6 py-2.5 font-heading text-sm font-semibold text-white shadow-[0_8px_24px_rgba(242,101,34,0.3)] transition-transform hover:-translate-y-0.5"
                >
                  <ExternalLink className="h-4 w-4" />
                  Open {project.type}
                </a>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

interface CertificateLightboxProps {
  certificate: CertificationItem | null;
  onClose: () => void;
}

export const CertificateLightboxModal: React.FC<CertificateLightboxProps> = ({
  certificate,
  onClose,
}) => {
  const [downloading, setDownloading] = useState(false);

  useEffect(() => {
    if (!certificate) return;
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [certificate, onClose]);

  const handleDownload = async () => {
    if (!certificate) return;
    setDownloading(true);
    try {
      const response = await fetch(certificate.pdfUrl);
      if (!response.ok) throw new Error('Download failed');
      const blob = await response.blob();
      const blobUrl = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = blobUrl;
      link.download = certificate.downloadFileName;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      setTimeout(() => URL.revokeObjectURL(blobUrl), 2000);
    } catch {
      const fallback = document.createElement('a');
      fallback.href = certificate.pdfUrl;
      fallback.download = certificate.downloadFileName;
      fallback.click();
    } finally {
      setDownloading(false);
    }
  };

  return (
    <AnimatePresence>
      {certificate && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          onClick={onClose}
          className="fixed inset-0 z-50 flex items-center justify-center bg-[#0a0a0c]/88 p-4 backdrop-blur-md"
          role="dialog"
          aria-modal="true"
          aria-label={certificate.title}
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.96, y: 12 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.96, y: 12 }}
            transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
            onClick={(e) => e.stopPropagation()}
            className="flex max-h-[92vh] w-full max-w-4xl flex-col overflow-hidden rounded-2xl border border-[#f26522]/35 bg-[#1a1c20] shadow-[0_30px_70px_rgba(0,0,0,0.88)]"
          >
            <div className="flex flex-wrap items-center justify-between gap-4 border-b border-white/10 px-6 py-4">
              <div>
                <p className="font-heading text-xs font-semibold tracking-wider text-[#f26522] uppercase">
                  {certificate.order} · {certificate.shortCode} ·{' '}
                  {certificate.issuedDate}
                </p>
                <h3 className="font-heading text-lg font-bold text-white sm:text-xl">
                  {certificate.title}
                </h3>
              </div>
              <button
                type="button"
                onClick={onClose}
                aria-label="Close certificate preview"
                className="flex h-10 w-10 cursor-pointer items-center justify-center rounded-lg border border-white/10 text-[#d0d1d6] transition-colors hover:border-[#f26522] hover:text-[#f26522]"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            <div className="overflow-y-auto bg-[#101114] p-5 sm:p-6">
              <div className="mb-5 overflow-hidden rounded-xl border border-white/10 bg-white shadow-2xl">
                <PdfPageCanvas
                  url={certificate.pdfUrl}
                  scale={2.2}
                  alt={certificate.title}
                />
              </div>

              <div className="flex flex-wrap items-center justify-between gap-4 border-t border-white/10 pt-5">
                <div className="text-xs text-[#8c8f9a] sm:text-sm">
                  {certificate.issuer} <span aria-hidden="true">·</span>{' '}
                  <span className="font-mono-num text-[#d0d1d6]">
                    Verification Code: {certificate.verificationCode}
                  </span>
                </div>

                <div className="flex flex-wrap items-center gap-3">
                  <button
                    type="button"
                    onClick={handleDownload}
                    disabled={downloading}
                    className="inline-flex cursor-pointer items-center gap-2 whitespace-nowrap rounded-xl border border-white/15 bg-white/5 px-5 py-2.5 font-heading text-sm font-semibold text-white transition-colors hover:border-[#f26522] hover:bg-[#f26522]/15 disabled:opacity-60"
                  >
                    {downloading ? (
                      <Loader2 className="h-4 w-4 animate-spin text-[#f26522]" />
                    ) : (
                      <Download className="h-4 w-4 text-[#f26522]" />
                    )}
                    <span>{downloading ? 'Downloading...' : 'Download PDF'}</span>
                  </button>

                  <a
                    href={certificate.driveUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 whitespace-nowrap rounded-xl bg-gradient-to-r from-[#800606] to-[#f26522] px-6 py-2.5 font-heading text-sm font-semibold text-white shadow-[0_8px_24px_rgba(242,101,34,0.3)] transition-transform hover:-translate-y-0.5"
                  >
                    <ExternalLink className="h-4 w-4" />
                    <span>Open Google Drive</span>
                  </a>
                </div>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
