import React, { useState, useEffect } from 'react';
import { ethers } from 'ethers';
import Terminal from './Terminal';
import Onboarding from './Onboarding';

export default function Dashboard() {
    const [provider, setProvider] = useState(null);
    const [account, setAccount] = useState('');
    const [chainId, setChainId] = useState('');
    const [balance, setBalance] = useState('0');
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState('');

    // Check if MetaMask is installed
    const isMetaMaskInstalled = () => {
        return typeof window.ethereum !== 'undefined' && window.ethereum.isMetaMask;
    };

    // Connect to MetaMask
    const connectWallet = async () => {
        try {
            if (!isMetaMaskInstalled()) {
                throw new Error('MetaMask not detected. Please install MetaMask first.');
            }

            setIsLoading(true);
            setError('');

            // Request account access
            const accounts = await window.ethereum.request({
                method: 'eth_requestAccounts'
            });

            // Create Web3Provider
            const web3Provider = new ethers.providers.Web3Provider(window.ethereum);
            setProvider(web3Provider);

            // Get network and balance
            const network = await web3Provider.getNetwork();
            const balance = await web3Provider.getBalance(accounts[0]);

            setAccount(accounts[0]);
            setChainId(network.chainId.toString());
            setBalance(ethers.utils.formatEther(balance));
        } catch (err) {
            console.error('Wallet connection error:', err);
            setError(err.message);
        } finally {
            setIsLoading(false);
        }
    };

    // Handle chain/account changes
    useEffect(() => {
        if (!isMetaMaskInstalled() || !provider) return;

        const handleAccountsChanged = (accounts) => {
            if (accounts.length === 0) {
                // MetaMask is locked or user disconnected all accounts
                setAccount('');
            } else {
                setAccount(accounts[0]);
            }
        };

        const handleChainChanged = (chainId) => {
            setChainId(parseInt(chainId, 16).toString());
            window.location.reload();
        };

        window.ethereum.on('accountsChanged', handleAccountsChanged);
        window.ethereum.on('chainChanged', handleChainChanged);

        return () => {
            window.ethereum.removeListener('accountsChanged', handleAccountsChanged);
            window.ethereum.removeListener('chainChanged', handleChainChanged);
        };
    }, [provider]);

    // Check initial connection status
    useEffect(() => {
        const checkConnection = async () => {
            if (isMetaMaskInstalled() && window.ethereum.selectedAddress) {
                await connectWallet();
            } else {
                setIsLoading(false);
            }
        };

        checkConnection();
    }, []);

    if (isLoading) {
        return (
            <div className="flex items-center justify-center h-screen">
                <div className="text-center">
                    <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-cyber-blue mx-auto mb-4"></div>
                    <p>Connecting to MetaMask...</p>
                </div>
            </div>
        );
    }

    if (!account) {
        return <Onboarding connectWallet={connectWallet} error={error} />;
    }

    return (
        <div className="cyber-terminal">
            <Terminal
                provider={provider}
                account={account}
                chainId={chainId}
                balance={balance}
            />
        </div>
    );
}