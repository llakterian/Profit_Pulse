import React from 'react';

export default function Onboarding({ connectWallet, error }) {
    return (
        <div className="flex items-center justify-center min-h-screen bg-cyber-dark p-4">
            <div className="cyber-border max-w-md w-full p-8 text-center">
                <h1 className="neon-text text-4xl mb-6">PROFITMAX PRO</h1>

                <div className="mb-8">
                    <h2 className="text-2xl mb-4">Welcome to ProfitMax Pro</h2>
                    <p className="mb-6">Connect your MetaMask wallet to access the trading terminal</p>

                    <button
                        onClick={connectWallet}
                        className="cyber-button px-8 py-3 text-lg font-bold mx-auto"
                    >
                        CONNECT METAMASK
                    </button>
                </div>

                {error && (
                    <div className="text-cyber-pink bg-black bg-opacity-50 p-3 mb-4">
                        {error}
                    </div>
                )}

                <div className="text-sm text-cyber-blue">
                    <p className="mb-2">Don't have MetaMask?</p>
                    <a
                        href="https://metamask.io/download.html"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="underline hover:text-cyber-green"
                    >
                        Install MetaMask Extension
                    </a>
                </div>
            </div>
        </div>
    );
}