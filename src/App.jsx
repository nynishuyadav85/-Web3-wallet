import { useState } from 'react';
import './App.css';
import { generateMnemonic } from 'bip39';
import { SolanaWallet } from './components/SolanaWallet';
import { EthWallet } from './components/EthWallet';
import FetchBalance from './components/FetchBalance';

function App() {
  const [mnemonic, setMnemonic] = useState("");

  async function handleGenerateMnemonic() {
    const mn = await generateMnemonic();
    setMnemonic(mn);
  }

  return (
    <div className="container">
      <h1 className="title">🪙 Solana & ETH</h1>

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
      <FetchBalance />
      <div className="wallets-section">
        <div className="wallet-box">
          <SolanaWallet mnemonic={mnemonic} />
        </div>
        <div className="wallet-box">
          <EthWallet mnemonic={mnemonic} />
        </div>
      </div>
    </div>
  );
}

export default App;
