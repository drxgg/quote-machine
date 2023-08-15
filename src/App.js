// Importation des modules nécessaires
import React from "react"; // Importe le module React pour créer des composants.
import "./App.css"; // Importe le fichier CSS associé à ce composant.
import QuoteBox from "./components/QuoteBox"; // Importe le composant QuoteBox depuis le dossier 'components'.

// Définition du composant fonctionnel App
function App() {
  // Le rendu du composant
  return (
    <div className="App">
      <QuoteBox />
    </div>
  );
}

// Exporte le composant App pour qu'il puisse être utilisé dans d'autres fichiers/modules.
export default App;
