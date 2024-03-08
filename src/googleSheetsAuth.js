import { GoogleSpreadsheet } from 'google-spreadsheet';
import axios from 'axios';
import credentials from './triviamwe-62452b0b6a06.json';

const authenticateAndLoadSheet = async () => {
  try {
    // Obtener el token de autenticación
    const { data } = await axios.post(
      'https://www.googleapis.com/oauth2/v4/token',
      {
        client_id: credentials.client_id,
        client_secret: credentials.client_secret,
        refresh_token: credentials.refresh_token,
        grant_type: 'refresh_token',
      }
    );

    const accessToken = data.access_token;

    // Configurar la instancia de GoogleSpreadsheet con el token de acceso
    const doc = new GoogleSpreadsheet('1EeqaVdg4Zzm96Fpy48xaVutOGzEuva5tCPO3xj58MCc');
    await doc.useRawAccessToken(accessToken);

    // Cargar información del documento
    await doc.loadInfo();

    return doc;
  } catch (error) {
    console.error('Error autenticando y cargando la hoja de cálculo:', error);
    throw error;
  }
};

export default authenticateAndLoadSheet;
