import { useState } from 'react';
import './App.css';
import { generateMnemonic } from 'bip39';

function App() {
  const [mnemonic, setMnemonic] = useState("");

  async function handleGenerateMnemonic() {
    const mn = await generateMnemonic();
    setMnemonic(mn);
  }

  return (
    <div className="container">
      <h1 className="title">🪙 Wallet Seed Generator</h1>

      <button className="generate-btn" onClick={handleGenerateMnemonic}>
        Generate Seed
      </button>

      <input
        className="mnemonic-input"
        type="text"
        value={mnemonic}
        readOnly
        placeholder="Your seed phrase will appear here..."
      />
    </div>
  );
}

export default App;