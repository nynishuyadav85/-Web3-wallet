import "./EthWallet.css";
import { useState } from "react";
import { ethers } from "ethers";

export function EthWallet() {
    const [addresses, setAddresses] = useState([]);
    const [copiedIndex, setCopiedIndex] = useState(null);

    const generateWallet = () => {
        const wallet = ethers.Wallet.createRandom();
        setAddresses((prev) => [...prev, wallet.address]);
    };

    const handleCopy = (addr, i) => {
        navigator.clipboard.writeText(addr);
        setCopiedIndex(i);
        setTimeout(() => setCopiedIndex(null), 1500);
    };

    return (
        <div className="eth-wallet-ui">
            <h1 className="eth-title">🦊 Ethereum Wallets</h1>

            <button className="eth-generate-btn" onClick={generateWallet}>
                ➕ Generate Wallet
            </button>

            {addresses.length === 0 ? (
                <div className="eth-empty">No wallets yet. Click above to create one!</div>
            ) : (
                <div className="eth-wallet-grid">
                    {addresses.map((addr, i) => (
                        <div className="eth-wallet-card" key={i}>
                            <div className="eth-wallet-top">
                                <span className="eth-label">Wallet #{i + 1}</span>
                                <button className="eth-copy-btn" onClick={() => handleCopy(addr, i)}>
                                    {copiedIndex === i ? "✅ Copied" : "📋 Copy"}
                                </button>
                            </div>
                            <div className="eth-wallet-address">
                                <code>{addr}</code>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}