import { 
  Zap, 
  Type, 
  ScanLine, 
  Layers, 
  PenTool, 
  Share2 
} from 'lucide-react';
import type { Feature, UseCase } from '@/types';

export const features: Feature[] = [
  {
    icon: 'Zap',
    title: 'AI‑Enhanced Scanning',
    description: 'Automatically removes shadows, corrects perspective, and sharpens text for HD results.',
  },
  {
    icon: 'Type',
    title: 'Instant OCR',
    description: 'Convert scans into searchable and selectable text. Copy, edit, and reuse content instantly.',
  },
  {
    icon: 'ScanLine',
    title: 'Smart Edge Detection',
    description: 'No manual cropping. Document corners are detected in milliseconds with precision.',
  },
  {
    icon: 'Layers',
    title: 'Batch Mode',
    description: 'Scan 50+ pages in seconds and export as a single, organized PDF document.',
  },
  {
    icon: 'PenTool',
    title: 'E‑Sign & Annotate',
    description: 'Sign contracts, highlight text, and add notes directly inside the app.',
  },
  {
    icon: 'Share2',
    title: 'Ecosystem Integration',
    description: 'Send scans directly to SendFaxPro, or export to Google Drive, Dropbox, and email.',
  },
];

export const useCases: UseCase[] = [
  {
    icon: 'Briefcase',
    title: 'Business & Freelancers',
    description: 'Contracts, invoices, signatures, and client documents. Stay organized and professional on the go.',
  },
  {
    icon: 'BookOpen',
    title: 'Students & Educators',
    description: 'Lecture notes, assignments, textbooks, and handouts. Digitize your learning materials effortlessly.',
  },
  {
    icon: 'Home',
    title: 'Everyday Use',
    description: 'Receipts, IDs, certificates, and official forms. Keep your important documents always accessible.',
  },
];

export const iconMap = {
  Zap,
  Type,
  ScanLine,
  Layers,
  PenTool,
  Share2,
};
