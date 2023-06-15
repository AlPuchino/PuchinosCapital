'use client';
import React, { useEffect } from 'react';
import {
    ConnectionProvider,
    WalletProvider,
    useWallet,
} from '@solana/wallet-adapter-react';
import { WalletModalProvider } from '@solana/wallet-adapter-react-ui';
import { SolflareWalletAdapter } from '@solana/wallet-adapter-solflare';
import { SolongWalletAdapter } from '@solana/wallet-adapter-solong';
import { TrustWalletAdapter } from '@solana/wallet-adapter-trust';
import { LedgerWalletAdapter } from '@solana/wallet-adapter-ledger';
import { SolletWalletAdapter } from '@solana/wallet-adapter-sollet';
import { BackpackWalletAdapter } from '@solana/wallet-adapter-backpack';


interface WalletAuthWrapperProps {
    children: React.ReactNode;
}

const useWalletEffect = () => {
    const { publicKey, wallet } = useWallet();
    useEffect(() => {
        if (publicKey) {
            // console.log(`using wallet ${publicKey.toBase58()}`);
        } else {
            console.log('no wallet');
        }
    }, [publicKey, wallet]);
}

const WalletAuthWrapper: React.FC<WalletAuthWrapperProps> = ({ children }) => {
    const endpoint = 'https://maximum-wild-cloud.solana-mainnet.discover.quiknode.pro/23e472715f752adf4c286795dc3f1c299ecd284d/';
    const wallets = [
        new BackpackWalletAdapter(),
        new SolflareWalletAdapter(),
        new SolletWalletAdapter(),
        new SolongWalletAdapter(),
        new TrustWalletAdapter(),
        new LedgerWalletAdapter(),
    ];

    return (
        <WalletProvider wallets={wallets} autoConnect>
            <ConnectionProvider endpoint={endpoint}>
                <WalletModalProvider>
                    {children}
                </WalletModalProvider>
            </ConnectionProvider>
        </WalletProvider>
    );
};

export { WalletAuthWrapper, useWalletEffect };