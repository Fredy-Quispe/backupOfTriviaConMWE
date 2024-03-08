import { GoogleSpreadsheet } from 'google-spreadsheet';
import authenticateAndLoadSheet from './googleSheetsAuth';

const enviarTextoAGoogleSheets = async (texto) => {
  try {
    const doc = await authenticateAndLoadSheet();
    const sheet = doc.sheetsByIndex[0];
    await sheet.addRow({ Texto: texto });
  } catch (error) {
    console.error('Error enviando texto a Google Sheets:', error);

    // Muestra información adicional sobre el error
    if (error.response) {
      console.error('Response data:', error.response.data);
      console.error('Response status:', error.response.status);
      console.error('Response headers:', error.response.headers);
    }

    throw error;
  }
};

export default enviarTextoAGoogleSheets;
