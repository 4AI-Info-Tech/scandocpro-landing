import { PDFDocument } from 'pdf-lib';

export async function mergePdf(files: File[]): Promise<Blob> {
  if (files.length < 2) {
    throw new Error('Select at least two PDF files to merge.');
  }

  const merged = await PDFDocument.create();

  for (const file of files) {
    const bytes = await file.arrayBuffer();
    const doc = await PDFDocument.load(bytes, { ignoreEncryption: true });
    const pages = await merged.copyPages(doc, doc.getPageIndices());
    pages.forEach((page) => merged.addPage(page));
  }

  const output = await merged.save();
  return new Blob([output], { type: 'application/pdf' });
}
