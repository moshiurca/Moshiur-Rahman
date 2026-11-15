import React, { useEffect, useRef, useState } from 'react';
import * as pdfjsLib from 'pdfjs-dist';
import { FileText, Loader2 } from 'lucide-react';

pdfjsLib.GlobalWorkerOptions.workerSrc = new URL(
  'pdfjs-dist/build/pdf.worker.min.mjs',
  import.meta.url
).toString();

interface PdfPageCanvasProps {
  url: string;
  pageNumber?: number;
  scale?: number;
  className?: string;
  alt?: string;
}

export const PdfPageCanvas: React.FC<PdfPageCanvasProps> = ({
  url,
  pageNumber = 1,
  scale = 1.6,
  className = '',
  alt = 'PDF Certificate Preview',
}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [status, setStatus] = useState<'loading' | 'ready' | 'error'>(
    'loading'
  );

  useEffect(() => {
    let cancelled = false;
    let renderTask: pdfjsLib.RenderTask | null = null;

    const renderPdf = async () => {
      setStatus('loading');
      try {
        const loadingTask = pdfjsLib.getDocument({
          url,
          standardFontDataUrl: '/pdfjs/standard_fonts/',
          disableFontFace: false,
        });

        const pdf = await loadingTask.promise;
        if (cancelled) return;

        const page = await pdf.getPage(pageNumber);
        if (cancelled) return;

        const canvas = canvasRef.current;
        if (!canvas) return;

        const dpr = Math.min(window.devicePixelRatio || 1, 2);
        const viewport = page.getViewport({ scale });

        canvas.width = Math.floor(viewport.width * dpr);
        canvas.height = Math.floor(viewport.height * dpr);

        const context = canvas.getContext('2d');
        if (!context) return;

        context.setTransform(dpr, 0, 0, dpr, 0, 0);
        context.fillStyle = '#ffffff';
        context.fillRect(0, 0, viewport.width, viewport.height);

        renderTask = page.render({
          canvasContext: context,
          viewport,
          canvas,
        });

        await renderTask.promise;
        if (!cancelled) {
          setStatus('ready');
        }
      } catch {
        if (!cancelled) {
          setStatus('error');
        }
      }
    };

    renderPdf();

    return () => {
      cancelled = true;
      if (renderTask) {
        renderTask.cancel();
      }
    };
  }, [url, pageNumber, scale]);

  return (
    <div className={`relative w-full overflow-hidden bg-white ${className}`}>
      {status === 'loading' && (
        <div className="absolute inset-0 flex flex-col items-center justify-center gap-2 bg-slate-100 text-slate-500">
          <Loader2 className="h-6 w-6 animate-spin text-[#f26522]" />
          <span className="text-xs font-medium">Loading Certificate...</span>
        </div>
      )}
      {status === 'error' && (
        <div className="absolute inset-0 flex flex-col items-center justify-center gap-2 bg-slate-100 p-4 text-center text-slate-600">
          <FileText className="h-8 w-8 text-[#f26522]" />
          <span className="text-xs font-semibold">{alt}</span>
        </div>
      )}
      <canvas
        ref={canvasRef}
        aria-label={alt}
        className="block h-auto w-full"
      />
    </div>
  );
};
