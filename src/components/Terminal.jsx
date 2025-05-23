import React from 'react';
import { useAnvil } from '../contexts/AnvilContext';
import Scanner from './Scanner';
import Trades from './Trades';

export default function Terminal() {
    const { account, chainId, balance } = useAnvil();

    return (
        <div className="cyber-terminal">
            <header className="cyber-header">
                <h1 className="neon-text">PROFITMAX PRO</h1>
                {account && (
                    <div className="account-info">
                        <span>{`${account.slice(0, 6)}...${account.slice(-4)}`}</span>
                        <span>Chain: {chainId}</span>
                        <span>Balance: {parseFloat(balance).toFixed(4)} ETH</span>
                    </div>
                )}
            </header>

            <div className="main-grid">
                <div className="panel">
                    <Scanner />
                </div>
                <div className="panel">
                    <Trades />
                </div>
            </div>
        </div>
    );
}