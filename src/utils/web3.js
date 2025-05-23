export const formatAddress = (address) => {
    return `${address.slice(0, 6)}...${address.slice(-4)}`;
};

export const switchNetwork = async (chainId) => {
    try {
        await window.ethereum.request({
            method: 'wallet_switchEthereumChain',
            params: [{ chainId: `0x${chainId.toString(16)}` }],
        });
        return true;
    } catch (error) {
        if (error.code === 4902) {
            // Chain not added to MetaMask
            return false;
        }
        throw error;
    }
};

export const addTokenToWallet = async (tokenAddress, symbol, decimals, image) => {
    try {
        await window.ethereum.request({
            method: 'wallet_watchAsset',
            params: {
                type: 'ERC20',
                options: {
                    address: tokenAddress,
                    symbol: symbol,
                    decimals: decimals,
                    image: image,
                },
            },
        });
        return true;
    } catch (error) {
        console.error('Error adding token:', error);
        return false;
    }
};