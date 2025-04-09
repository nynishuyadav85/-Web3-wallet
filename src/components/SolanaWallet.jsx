import { mnemonicToSeed } from "bip39";
import { useState } from "react";
import { derivePath } from "ed25519-hd-key";
import nacl from "tweetnacl";
import { Keypair } from "@solana/web3.js";
import "./SolanaWallet.css";

export function SolanaWallet({ mnemonic }) {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [publicKeys, setPublicKeys] = useState([]);
    const [copiedIndex, setCopiedIndex] = useState(null);

    async function addWallet() {
        const seed = await mnemonicToSeed(mnemonic);
        const path = `m/44'/501'/${currentIndex}'/0'`;
        const derivedSeed = derivePath(path, seed.toString("hex")).key;
        const secret = nacl.sign.keyPair.fromSeed(derivedSeed).secretKey;
        const keyPair = Keypair.fromSecretKey(secret);
        setCurrentIndex(currentIndex + 1);
        setPublicKeys([...publicKeys, keyPair.publicKey]);
    }

    function handleCopy(publicKey, index) {
        navigator.clipboard.writeText(publicKey.toBase58());
        setCopiedIndex(index);
        setTimeout(() => setCopiedIndex(null), 1500);
    }

    return (
        <div className="wallet-ui">
            <div className="wallet-header">
                <h1>🚀 Solana Wallet Generator</h1>
                <button className="add-btn" onClick={addWallet}>
                    ➕ Generate New Wallet
                </button>
            </div>

            <div className="wallet-grid">
                {publicKeys.map((p, i) => (
                    <div key={i} className="wallet-card">
                        <div className="wallet-top">
                            <span className="wallet-id">Wallet #{i + 1}</span>
                            <button onClick={() => handleCopy(p, i)} className="copy-btn">
                                {copiedIndex === i ? "✅ Copied" : "📋 Copy"}
                            </button>
                        </div>
                        <div className="wallet-key">
                            {p.toBase58()}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}