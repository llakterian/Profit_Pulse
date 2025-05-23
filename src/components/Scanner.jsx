import { useAnvil } from '../contexts/AnvilContext';
export default function Scanner() {
    const { provider } = useAnvil();
    const { opportunities, isLoading, executeTrade } = useArbitrage(provider);

    return (
        <div className="cyber-panel">
            <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl">ARBITRAGE SCANNER</h2>
                <span className={`pill ${isLoading ? 'animate-pulse' : ''}`}>
                    {isLoading ? 'SCANNING...' : 'LIVE'}
                </span>
            </div>

            <div className="space-y-3">
                {opportunities.map((opp, i) => (
                    <div key={i} className="cyber-border p-3">
                        <div className="flex justify-between">
                            <span className="font-bold">{opp.pair}</span>
                            <span className="text-cyber-green">
                                +{ethers.utils.formatEther(opp.profit)} ETH
                            </span>
                        </div>
                        <button
                            onClick={() => executeTrade(opp)}
                            className="cyber-button mt-2 w-full py-1"
                        >
                            EXECUTE TRADE
                        </button>
                    </div>
                ))}
            </div>
        </div>
    );
}