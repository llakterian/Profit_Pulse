import { useAnvil } from '../contexts/AnvilContext';

export default function Terminal() {
    const { account, blockNumber } = useAnvil();

    return (
        <div className="cyber-terminal scanlines">
            {/* ... */}
            <footer className="cyber-hud">
                <div className="hud-item">
                    <span className="hud-label">ACCOUNT</span>
                    <span className="hud-value font-mono">
                        {account ? `${account.slice(0, 6)}...${account.slice(-4)}` : 'DISCONNECTED'}
                    </span>
                </div>
                <div className="hud-item">
                    <span className="hud-label">BLOCK</span>
                    <span className="hud-value">{blockNumber}</span>
                </div>
            </footer>
        </div>
    );
}