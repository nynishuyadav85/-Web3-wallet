import axios from "axios";
import { useState } from "react";

const FetchBalance = () => {
    const [balance, setBalance] = useState(null);
    const [loading, setLoading] = useState(false);

    const publicKey = "0x093C651ea5B02A564b18Efaa39775595eB76df0d"; // Replace with dynamic value if needed

    const fetchBalance = async () => {
        setLoading(true);
        try {
            const response = await axios.post(
                "https://solana-mainnet.g.alchemy.com/v2/YOGg5RV2dtrnvzQuYNSRwwYb8AiOnBUv",
                {
                    jsonrpc: "2.0",
                    id: 1,
                    method: "getBalance",
                    params: [publicKey],
                },
                {
                    headers: {
                        "Content-Type": "application/json",
                    },
                }
            );

            const lamports = response.data.result?.value;
            const sol = lamports / 1e9;
            setBalance(sol);
        } catch (error) {
            console.error("Error fetching balance:", error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div style={{ padding: "20px", color: "#fff" }}>
            <button onClick={fetchBalance} disabled={loading}>
                {loading ? "Fetching..." : "Fetch Balance"}
            </button>
            {balance !== null && (
                <p>
                    🔢 Balance for <code>{publicKey}</code>: <strong>{balance} SOL</strong>
                </p>
            )}
        </div>
    );
};

export default FetchBalance;