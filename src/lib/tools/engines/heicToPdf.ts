import heic2any from 'heic2any';
import { blobsToPdf } from './imagesToPdf';

export async function heicToPdf(files: File[]): Promise<Blob> {
  if (files.length === 0) {
    throw new Error('Select at least one HEIC file.');
  }

  const converted: { blob: Blob; name: string }[] = [];

  for (const file of files) {
    const result = await heic2any({ blob: file, toType: 'image/jpeg', quality: 0.92 });
    const jpegBlob = Array.isArray(result) ? result[0] : result;
    converted.push({ blob: jpegBlob, name: file.name });
  }

  return blobsToPdf(converted);
}
