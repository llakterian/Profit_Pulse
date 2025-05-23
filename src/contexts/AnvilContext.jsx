import React, { createContext, useContext, useState, useEffect } from 'react';
import { ethers } from 'ethers';

const AnvilContext = createContext();

export function AnvilProvider({ children }) {
    const [anvilProvider, setAnvilProvider] = useState(null);
    const [account, setAccount] = useState('');
    const [chainId, setChainId] = useState('');
    const [balance, setBalance] = useState('0');
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState('');

    useEffect(() => {
        const initAnvil = async () => {
            try {
                const provider = new ethers.providers.JsonRpcProvider(
                    "http://localhost:8545"
                );

                // Get network and first account
                const network = await provider.getNetwork();
                const accounts = await provider.listAccounts();

                if (accounts.length > 0) {
                    const balance = await provider.getBalance(accounts[0]);

                    setAnvilProvider(provider);
                    setAccount(accounts[0]);
                    setChainId(network.chainId.toString());
                    setBalance(ethers.utils.formatEther(balance));

                    // Set up block listener
                    const handleNewBlock = (blockNumber) => {
                        console.log("New block:", blockNumber);
                    };
                    provider.on("block", handleNewBlock);

                    // Return cleanup function
                    return () => {
                        provider.off("block", handleNewBlock);
                    };
                }
            } catch (err) {
                setError(`Anvil connection failed: ${err.message}`);
                console.error("Anvil init error:", err);
            } finally {
                setIsLoading(false);
            }
        };

        initAnvil();
    }, []);

    const value = {
        anvilProvider,
        account,
        chainId,
        balance,
        isLoading,
        error
    };

    return (
        <AnvilContext.Provider value={value}>
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