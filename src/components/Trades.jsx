import React from 'react';

export default function Trades() {
    const mockTrades = [
        { pair: 'ETH/USDC', amount: '1.2', profit: '0.15' },
        { pair: 'ETH/DAI', amount: '0.8', profit: '0.08' }
    ];

    return (
        <div className="trades">
            <h2>RECENT TRADES</h2>
            <table>
                <thead>
                    <tr>
                        <th>Pair</th>
                        <th>Amount</th>
                        <th>Profit</th>
                    </tr>
                </thead>
                <tbody>
                    {mockTrades.map((trade, i) => (
                        <tr key={i}>
                            <td>{trade.pair}</td>
                            <td>{trade.amount} ETH</td>
                            <td>+{trade.profit} ETH</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}