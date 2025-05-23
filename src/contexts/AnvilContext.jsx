import { createContext, useContext, useState, useEffect } from 'react';
import { ethers } from 'ethers';

const AnvilContext = createContext();

export function AnvilProvider({ children }) {
    const [provider, setProvider] = useState(null);
    const [account, setAccount] = useState("");
    const [blockNumber, setBlockNumber] = useState(0);

    useEffect(() => {
        const initAnvil = async () => {
            try {
                const anvilProvider = new ethers.providers.JsonRpcProvider(
                    "http://localhost:8545"
                );

                // Get first account (Anvil default)
                const accounts = await anvilProvider.listAccounts();
                setProvider(anvilProvider);
                setAccount(accounts[0]);

                // Monitor new blocks
                anvilProvider.on("block", (blockNum) => {
                    setBlockNumber(blockNum);
                });
            } catch (error) {
                console.error("Failed to connect to Anvil:", error);
            }
        };

        initAnvil();

        return () => {
            if (provider) {
                provider.off("block");
            }
        };
    }, []);

    return (
        <AnvilContext.Provider value={{ provider, account, blockNumber }}>
            {children}
        </AnvilContext.Provider>
    );
}

export function useAnvil() {
    const context = useContext(AnvilContext);
    if (!context) {
        throw new Error('useAnvil must be used within an AnvilProvider');
    }
    return context;
}