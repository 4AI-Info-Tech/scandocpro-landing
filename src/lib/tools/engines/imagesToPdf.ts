import { jsPDF } from 'jspdf';

const PAGE_WIDTH_PT = 595.28;
const PAGE_HEIGHT_PT = 841.89;
const PAGE_MARGIN_PT = 24;

async function loadImage(source: Blob, name: string): Promise<HTMLImageElement> {
  return new Promise((resolve, reject) => {
    const url = URL.createObjectURL(source);
    const image = new Image();

    image.onload = () => {
      URL.revokeObjectURL(url);
      resolve(image);
    };
    image.onerror = () => {
      URL.revokeObjectURL(url);
      reject(new Error(`Could not decode ${name}`));
    };
    image.src = url;
  });
}

function drawToCanvas(image: HTMLImageElement): { dataUrl: string; width: number; height: number } {
  const canvas = document.createElement('canvas');
  canvas.width = image.naturalWidth;
  canvas.height = image.naturalHeight;

  const ctx = canvas.getContext('2d');
  if (!ctx) {
    throw new Error('Canvas 2D context unavailable.');
  }

  ctx.drawImage(image, 0, 0);
  return {
    dataUrl: canvas.toDataURL('image/jpeg', 0.92),
    width: image.naturalWidth,
    height: image.naturalHeight,
  };
}

interface NamedBlob {
  blob: Blob;
  name: string;
}

export async function blobsToPdf(sources: NamedBlob[]): Promise<Blob> {
  if (sources.length === 0) {
    throw new Error('Select at least one image.');
  }

  const pdf = new jsPDF({ unit: 'pt', format: 'a4', compress: true });
  const usableWidth = PAGE_WIDTH_PT - PAGE_MARGIN_PT * 2;
  const usableHeight = PAGE_HEIGHT_PT - PAGE_MARGIN_PT * 2;

  for (let i = 0; i < sources.length; i += 1) {
    const { blob, name } = sources[i];
    const image = await loadImage(blob, name);
    const { dataUrl, width, height } = drawToCanvas(image);

    const ratio = Math.min(usableWidth / width, usableHeight / height);
    const renderedWidth = width * ratio;
    const renderedHeight = height * ratio;
    const offsetX = (PAGE_WIDTH_PT - renderedWidth) / 2;
    const offsetY = (PAGE_HEIGHT_PT - renderedHeight) / 2;

    if (i > 0) {
      pdf.addPage();
    }

    pdf.addImage(dataUrl, 'JPEG', offsetX, offsetY, renderedWidth, renderedHeight, undefined, 'FAST');
  }

  return pdf.output('blob');
}

export async function imagesToPdf(files: File[]): Promise<Blob> {
  return blobsToPdf(files.map((file) => ({ blob: file, name: file.name })));
}
