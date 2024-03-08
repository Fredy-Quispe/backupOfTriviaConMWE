import './App.css';
import logo from './logo.svg';
import React, { useState, useEffect } from 'react';
import authenticateAndLoadSheet from './googleSheetsAuth';
import enviarTextoAGoogleSheets from './googleSheetsAPI';

function App() {
  const [isVisible, setIsVisible] = useState(false);
  const [textoIngresado, setTextoIngresado] = useState('');

  useEffect(() => {
    const authenticate = async () => {
      try {
        const doc = await authenticateAndLoadSheet();
        // Puedes hacer más cosas con el documento si es necesario
      } catch (error) {
        // Manejar errores de autenticación y carga
        console.error('Error en la autenticación:', error);
      }
    };

    authenticate();
  }, []);

  const handleInputChange = (e) => {
    setTextoIngresado(e.target.value);
  };

  const ManejarEnvioFormulario = async (event) => {
    event.preventDefault();

    // Llama a la función para enviar el texto a Google Sheets
    await enviarTextoAGoogleSheets(textoIngresado);

    // Realiza cualquier otra lógica después de enviar a Google Sheets si es necesario

    // Puedes también actualizar la interfaz, si es necesario
    setIsVisible(!isVisible);
  };

  return (
    <div className="App">
      <header className="app-header">
        <img src={logo} className="app-logo" alt="React Logo" />
        <h1 className="app-title">TRIVIA con MWE</h1>
      </header>

      <h1>Trivia de Capitales y Países</h1>
      <form>
        <label>
          <input type="text" placeholder='Lima es a Perú como Atheneas es a ____?' value={textoIngresado} onChange={(e) => setTextoIngresado(e.target.value)} />
        </label>

        {isVisible && (
          <div className="result-box">Lima es a Perú como Atheneas es a Grecia</div>
        )}

        <button type="submit" onClick={ManejarEnvioFormulario}>Descubrir</button>
      </form>
    </div>
  );
}

export default App;
