import { Assets } from '..';
import { PDFDocument, rgba, TextAlignment } from '../../../cjs';

export default async (assets: Assets) => {
  const pdfDoc = await PDFDocument.load(assets.pdfs.dod_character);
  const form = pdfDoc.getForm();

  // Add new page with custom form fields to exercise options not used in test1
  const { width, height } = pdfDoc.getPage(0).getSize();
  const page2 = pdfDoc.addPage([width, height]);

  // Singleline, centered
  const singlelineCenteredTf = form.createTextField('singleline.centered.tf');
  singlelineCenteredTf.setAlignment(TextAlignment.Center);
  singlelineCenteredTf.setText('Tranparent Border');
  singlelineCenteredTf.addToPage(page2, {
    y: height - 50,
    width: 250,
    height: 25,
    borderWidth: 1,
    
  });

  // Multiline, centered
  const multilineCenteredTf = form.createTextField('multiline.centered.tf');
  multilineCenteredTf.enableMultiline();
  multilineCenteredTf.setAlignment(TextAlignment.Center);
  multilineCenteredTf.setText('Tranparent Border -- 2 ');
  multilineCenteredTf.addToPage(page2, {
    y: height - 50 - 150,
    width: 250,
    height: 100,
    borderWidth: 1,
    backgroundColor: rgba(0, 0, 0, 0),
    borderColor: rgba(0, 0, 0, 0),
  });

  // Singleline, right justified
  const singlelineRightTf = form.createTextField('singleline.right.tf');
  singlelineRightTf.setAlignment(TextAlignment.Center);
  singlelineRightTf.setText('Sum right justified text yo - with traansparent background and border');
  singlelineRightTf.addToPage(page2, {
    y: height - 50,
    x: 300,
    width: 250,
    height: 25,
    borderWidth: 1,
    backgroundColor: rgba(0, 0, 0, 0),
    borderColor: rgba(0, 0, 0, 0)
  });



  const pdfBytes = await pdfDoc.save();
  return pdfBytes;
};
