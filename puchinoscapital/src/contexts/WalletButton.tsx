'use client';
import { WalletMultiButton } from '@solana/wallet-adapter-react-ui';
import { useWallet } from '@solana/wallet-adapter-react';
import '@solana/wallet-adapter-react-ui/styles.css';
import { useEffect, useState } from 'react';

const WalletButton: React.FC = () => {
    const { connected, disconnect, publicKey, connect } = useWallet();
    const [isMounted, setIsMounted] = useState(false);

    useEffect(() => {
        setIsMounted(true);
    }, []);

    const handleClick = async () => {
        if (!connected) {
            try {
                await connect();
                console.log(`using wallet ${publicKey?.toBase58()}`);
            } catch (err) {
                console.log('Error connecting wallet:', err);
            }
        } else {
            try {
                await disconnect();
            } catch (err) {
                console.log('Error disconnecting wallet:', err);
            }
        }
    };

    if (!isMounted) {
        return null;
    }

    return (
        <WalletMultiButton onClick={handleClick} >
            {connected ? `${publicKey?.toBase58()?.slice(0, 4)}...${publicKey?.toBase58()?.slice(-4)}` : 'Connect Wallet'}
        </WalletMultiButton>
    );
};

export default WalletButton;