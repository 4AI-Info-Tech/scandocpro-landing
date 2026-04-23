import { useCallback, useEffect, useRef, useState } from 'react';
import { Download, File as FileIcon, FileUp, Loader2, X } from 'lucide-react';
import type { ProgrammaticToolEngine, ProgrammaticToolMeta } from '@/types';

type ConverterFn = (files: File[]) => Promise<Blob>;

const engineLoaders: Record<ProgrammaticToolEngine, () => Promise<ConverterFn>> = {
  'images-to-pdf': async () => (await import('@/lib/tools/engines/imagesToPdf')).imagesToPdf,
  'heic-to-pdf': async () => (await import('@/lib/tools/engines/heicToPdf')).heicToPdf,
  'merge-pdf': async () => (await import('@/lib/tools/engines/mergePdf')).mergePdf,
};

interface ToolRunnerProps {
  slug: string;
  tool: ProgrammaticToolMeta;
}

interface QueuedFile {
  id: string;
  file: File;
  previewUrl: string;
}

interface RunResult {
  blob: Blob;
  filename: string;
}

type RunStatus = 'idle' | 'working' | 'done' | 'error';

const ACCEPT_FALLBACK = 'image/jpeg,image/png,image/webp';

function formatMb(bytes: number): string {
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
}

function matchesAccept(file: File, accept: string): boolean {
  const parts = accept
    .split(',')
    .map((part) => part.trim().toLowerCase())
    .filter(Boolean);
  if (parts.length === 0) {
    return true;
  }

  const name = file.name.toLowerCase();
  const type = file.type.toLowerCase();

  return parts.some((part) => {
    if (part.startsWith('.')) {
      return name.endsWith(part);
    }
    if (part.endsWith('/*')) {
      return type.startsWith(part.slice(0, -1));
    }
    return type === part;
  });
}

export function ToolRunner({ slug, tool }: ToolRunnerProps) {
  const [mounted, setMounted] = useState(false);
  const [queue, setQueue] = useState<QueuedFile[]>([]);
  const [status, setStatus] = useState<RunStatus>('idle');
  const [message, setMessage] = useState<string | null>(null);
  const [result, setResult] = useState<RunResult | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const inputRef = useRef<HTMLInputElement | null>(null);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    return () => {
      queue.forEach((item) => URL.revokeObjectURL(item.previewUrl));
      if (result) {
        URL.revokeObjectURL(URL.createObjectURL(result.blob));
      }
    };
  }, [queue, result]);

  const acceptString = tool.inputAccept || ACCEPT_FALLBACK;
  const maxBytes = tool.maxFileMb * 1024 * 1024;

  const addFiles = useCallback(
    (files: FileList | File[]) => {
      const incoming = Array.from(files);
      if (incoming.length === 0) {
        return;
      }

      const accepted: QueuedFile[] = [];
      const errors: string[] = [];

      incoming.forEach((file) => {
        if (!matchesAccept(file, acceptString)) {
          errors.push(`${file.name}: unsupported type`);
          return;
        }

        if (file.size > maxBytes) {
          errors.push(`${file.name}: larger than ${tool.maxFileMb} MB`);
          return;
        }

        accepted.push({
          id: `${file.name}-${file.lastModified}-${file.size}`,
          file,
          previewUrl: URL.createObjectURL(file),
        });
      });

      setQueue((prev) => {
        if (!tool.multiple && accepted.length > 0) {
          prev.forEach((item) => URL.revokeObjectURL(item.previewUrl));
          return accepted.slice(0, 1);
        }

        const existingIds = new Set(prev.map((item) => item.id));
        const deduped = accepted.filter((item) => !existingIds.has(item.id));
        return [...prev, ...deduped];
      });

      setResult(null);
      setStatus('idle');
      setMessage(errors.length > 0 ? errors.join(' · ') : null);
    },
    [acceptString, maxBytes, tool.maxFileMb, tool.multiple],
  );

  const removeFile = useCallback((id: string) => {
    setQueue((prev) => {
      const match = prev.find((item) => item.id === id);
      if (match) {
        URL.revokeObjectURL(match.previewUrl);
      }
      return prev.filter((item) => item.id !== id);
    });
    setResult(null);
    setStatus('idle');
  }, []);

  const handleConvert = useCallback(async () => {
    if (queue.length === 0) {
      setMessage('Add at least one file to convert.');
      return;
    }

    setStatus('working');
    setMessage(null);
    setResult(null);

    try {
      const loader = engineLoaders[tool.engine];
      if (!loader) {
        throw new Error(`No engine registered for "${tool.engine}".`);
      }
      const convert = await loader();
      const blob = await convert(queue.map((item) => item.file));
      const filename = queue.length === 1
        ? `${queue[0].file.name.replace(/\.[^.]+$/, '')}.${tool.outputExtension}`
        : `${slug}.${tool.outputExtension}`;

      setResult({ blob, filename });
      setStatus('done');
    } catch (error) {
      console.error(error);
      setStatus('error');
      setMessage(error instanceof Error ? error.message : 'Something went wrong during conversion.');
    }
  }, [queue, slug, tool.engine, tool.outputExtension]);

  const handleDownload = useCallback(() => {
    if (!result) {
      return;
    }

    const url = URL.createObjectURL(result.blob);
    const anchor = document.createElement('a');
    anchor.href = url;
    anchor.download = result.filename;
    document.body.appendChild(anchor);
    anchor.click();
    document.body.removeChild(anchor);
    URL.revokeObjectURL(url);
  }, [result]);

  const handleDragOver = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => setIsDragging(false);

  const handleDrop = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    setIsDragging(false);
    if (event.dataTransfer.files.length > 0) {
      addFiles(event.dataTransfer.files);
    }
  };

  if (!mounted) {
    return (
      <div className="rounded-3xl bg-gray-900 p-8 text-white shadow-xl dark:bg-black">
        <h2 className="text-2xl font-bold">{tool.toolHeading}</h2>
        <p className="mt-3 text-gray-300">{tool.toolSubheading}</p>
        <div className="mt-6 rounded-2xl border border-dashed border-white/20 bg-white/5 p-8 text-center text-sm text-gray-400">
          Loading converter…
        </div>
      </div>
    );
  }

  return (
    <div className="rounded-3xl bg-gray-900 p-8 text-white shadow-xl dark:bg-black">
      <h2 className="text-2xl font-bold">{tool.toolHeading}</h2>
      <p className="mt-3 text-gray-300">{tool.toolSubheading}</p>

      <div
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        onClick={() => inputRef.current?.click()}
        className={`mt-6 cursor-pointer rounded-2xl border-2 border-dashed p-8 text-center transition-colors ${
          isDragging ? 'border-accent-400 bg-accent-400/10' : 'border-white/20 bg-white/5 hover:border-white/40'
        }`}
      >
        <FileUp className="mx-auto h-8 w-8 text-accent-400" />
        <p className="mt-3 font-medium">{tool.inputLabel}</p>
        <p className="mt-1 text-sm text-gray-400">
          Up to {tool.maxFileMb} MB per file · runs in your browser
        </p>
        <input
          ref={inputRef}
          type="file"
          accept={acceptString}
          multiple={tool.multiple}
          className="sr-only"
          onChange={(event) => {
            if (event.target.files) {
              addFiles(event.target.files);
              event.target.value = '';
            }
          }}
        />
      </div>

      {queue.length > 0 && (
        <ul className="mt-5 space-y-2">
          {queue.map((item) => (
            <li
              key={item.id}
              className="flex items-center justify-between gap-3 rounded-xl border border-white/10 bg-white/5 px-3 py-2 text-sm"
            >
              <div className="flex min-w-0 items-center gap-3">
                {/\.(jpe?g|png|webp|gif)$/i.test(item.file.name) ? (
                  <img src={item.previewUrl} alt="" className="h-10 w-10 rounded object-cover" />
                ) : (
                  <div className="flex h-10 w-10 items-center justify-center rounded bg-white/10 text-accent-300">
                    <FileIcon className="h-5 w-5" />
                  </div>
                )}
                <div className="min-w-0">
                  <div className="truncate font-medium">{item.file.name}</div>
                  <div className="text-xs text-gray-400">{formatMb(item.file.size)}</div>
                </div>
              </div>
              <button
                type="button"
                onClick={(event) => {
                  event.stopPropagation();
                  removeFile(item.id);
                }}
                className="rounded-full p-1 text-gray-400 transition-colors hover:bg-white/10 hover:text-white"
                aria-label={`Remove ${item.file.name}`}
              >
                <X className="h-4 w-4" />
              </button>
            </li>
          ))}
        </ul>
      )}

      {message && (
        <p className={`mt-4 text-sm ${status === 'error' ? 'text-red-300' : 'text-amber-200'}`}>{message}</p>
      )}

      <div className="mt-6 flex flex-col gap-3">
        <button
          type="button"
          onClick={handleConvert}
          disabled={status === 'working' || queue.length === 0}
          className="inline-flex items-center justify-center gap-2 rounded-xl bg-accent-500 px-6 py-3 font-semibold text-gray-950 transition-colors hover:bg-accent-400 disabled:cursor-not-allowed disabled:opacity-60"
        >
          {status === 'working' ? (
            <>
              <Loader2 className="h-4 w-4 animate-spin" />
              Converting…
            </>
          ) : (
            <>Convert to {tool.outputExtension.toUpperCase()}</>
          )}
        </button>

        {result && status === 'done' && (
          <button
            type="button"
            onClick={handleDownload}
            className="inline-flex items-center justify-center gap-2 rounded-xl border border-white/20 px-6 py-3 font-semibold text-white transition-colors hover:border-white/40 hover:bg-white/5"
          >
            <Download className="h-4 w-4" />
            Download {result.filename}
          </button>
        )}
      </div>

      <p className="mt-5 text-xs text-gray-400">
        Files are processed on your device. Nothing is uploaded.
      </p>
    </div>
  );
}
