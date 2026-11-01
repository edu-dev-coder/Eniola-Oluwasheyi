import { toPng } from 'html-to-image';
import jsPDF from 'jspdf';

export interface PDFResult {
  blob: Blob;
  file: File;
  dataUrl: string;
}

/**
 * Generates a high-resolution PDF from a DOM element (the VIP Pass card)
 */
export async function generatePassPDF(
  element: HTMLElement,
  passCode: string,
  guestName: string
): Promise<PDFResult> {
  let imgData: string;
  try {
    imgData = await toPng(element, {
      quality: 0.98,
      pixelRatio: 2,
      backgroundColor: '#240408',
      skipFonts: true, // Prevents cross-origin Google Fonts CSS parsing exceptions
      cacheBust: true,
    });
  } catch (err) {
    console.warn('Initial toPng failed, retrying with minimal options', err);
    imgData = await toPng(element, {
      quality: 0.9,
      pixelRatio: 1.5,
      backgroundColor: '#240408',
      skipFonts: true,
    });
  }

  // Calculate dimensions from image
  const img = new Image();
  img.src = imgData;
  await new Promise<void>((resolve, reject) => {
    if (img.complete) {
      resolve();
    } else {
      img.onload = () => resolve();
      img.onerror = () => reject(new Error('Failed to load captured pass image'));
    }
  });

  const naturalWidth = img.naturalWidth || img.width || 800;
  const naturalHeight = img.naturalHeight || img.height || 1000;

  // Standard A5 width in mm (148mm)
  const imgWidth = 148;
  const imgHeight = (naturalHeight * imgWidth) / naturalWidth;

  const pdf = new jsPDF({
    orientation: imgHeight > imgWidth ? 'portrait' : 'landscape',
    unit: 'mm',
    format: [imgWidth, imgHeight],
  });

  pdf.setProperties({
    title: `DesignersMeet VIP Entry Pass - ${guestName || passCode}`,
    subject: 'Official Wedding Admission & Gate Protocol Pass',
    author: 'Eniola & Oluwaseyi (#DesignersMeet)',
  });

  pdf.addImage(imgData, 'PNG', 0, 0, imgWidth, imgHeight, undefined, 'FAST');

  const pdfBlob = pdf.output('blob');
  const filename = `DesignersMeet-VIP-Pass-${passCode}.pdf`;
  const pdfFile = new File([pdfBlob], filename, { type: 'application/pdf' });
  const dataUrl = URL.createObjectURL(pdfBlob);

  return {
    blob: pdfBlob,
    file: pdfFile,
    dataUrl,
  };
}

/**
 * Triggers direct download of a generated PDF
 */
export function downloadBlobAsFile(blob: Blob, filename: string): void {
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  setTimeout(() => URL.revokeObjectURL(url), 1000);
}

/**
 * Handles sending PDF to WhatsApp via Web Share API or download + WhatsApp launch
 */
export async function sharePDFToWhatsApp({
  element,
  passCode,
  guestName,
  partySize,
  attending,
}: {
  element: HTMLElement;
  passCode: string;
  guestName: string;
  partySize: number;
  attending: string;
}): Promise<{ sharedViaNative: boolean }> {
  const { blob, file } = await generatePassPDF(element, passCode, guestName);
  const filename = `DesignersMeet-VIP-Pass-${passCode}.pdf`;

  const shareText = `*#DesignersMeet 2026 • OFFICIAL VIP ENTRY PASS*\n` +
    `Bride & Groom: Eniola & Oluwaseyi\n` +
    `Guest Name: ${guestName}\n` +
    `VIP Pass Code: ${passCode}\n` +
    `Admittance: ${partySize === 2 ? 'Me & My Spouse (2 Persons)' : 'Just Me (1 Person)'}\n` +
    `Ceremony: ${attending === 'both' ? 'Engagement Ceremony & Reception' : attending}\n` +
    `Date: Saturday, November 7, 2026 (11:00 AM Prompt)\n` +
    `Venue: JJ & Jaz Event Center, Taoheed Road, Basin, Ilorin, Kwara State\n\n` +
    `Here is my confirmed digital VIP Pass PDF with security gate QR code!`;

  // Check if browser supports sharing files natively (common on Android Chrome, iOS Safari)
  if (navigator.canShare && navigator.canShare({ files: [file] })) {
    try {
      await navigator.share({
        files: [file],
        title: `DesignersMeet VIP Pass - ${guestName}`,
        text: shareText,
      });
      return { sharedViaNative: true };
    } catch (err: unknown) {
      if (err instanceof Error && err.name === 'AbortError') {
        return { sharedViaNative: true }; // User cancelled the share dialog
      }
    }
  }

  // Fallback for desktop or non-file-sharing browsers:
  // 1. Download the PDF directly
  downloadBlobAsFile(blob, filename);

  // 2. Open WhatsApp with pre-filled message and instructions
  const waUrl = `https://wa.me/?text=${encodeURIComponent(
    shareText + `\n\n(Note: My VIP Pass PDF has been downloaded to my device. Attaching it now!)`
  )}`;
  window.open(waUrl, '_blank');

  return { sharedViaNative: false };
}
