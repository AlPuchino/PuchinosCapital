'use client'
import React, { useEffect, useState } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import Link from 'next/link';
import socket from "socket.io-client";
import Image from 'next/image';
import { Tooltip } from 'antd';
import { toast } from 'react-toastify';
import { useDynamicContext } from "@dynamic-labs/sdk-react";


import {
  Connection,
  Keypair,
  SystemProgram,
  LAMPORTS_PER_SOL,
  Transaction,
  sendAndConfirmTransaction,
  PublicKey,
  sendAndConfirmRawTransaction,
} from "@solana/web3.js";


import close from "@/public/hexagon-close.svg";
import solana from "@/public/solanawhite.svg";
import user from "@/public/user.svg";
import expand from "@/public/expand.svg";
import tag from "@/public/tag.svg";

interface Listing {
  id: any;
  name: string;
  image: string;
  available: number;
  liquidity: number;
  apy: number;
  interest: number;
  blockchain: string;
  lenders: any[];
}

interface NFT {
  auctionHouse: string;
  expiry: number;
  extra: {
    img: string;
  };
  pdaAddress: string;
  price: number;
  rarity: {
    howrare: any;
    moonrank: any;
  };
  seller: string;
  sellerReferral: string;
  tokenAddress: string;
  tokenMint: string;
  tokenSize: number;
}


export default function Login() {
  const { primaryWallet } = useDynamicContext();
  const router = useRouter();
  const [modalVisible, setModalVisible] = React.useState(false);
  const link = usePathname();
  const [listing, setListing] = useState<Listing>();
  const [nfts, setNfts] = useState<NFT[]>([]);
  const [cart, setCart] = useState<NFT[]>([]);
  const [balance, setBalance] = useState(0);

  const id = link.replace('/bank/nfts/', '');

  useEffect(() => {
    const io = socket("http://localhost:4000/modalListing");

    io.emit("listingId", id);

    io.on("listingData", (data: any) => {
      setListing(data[0]);
    });

    fetch(`/api/nftDetails?id=${id}`)
      .then((res) => res.json())
      .then((data) => {
        setNfts(data);
      });

    return () => {
      io.disconnect();
    };
  }, [id]);

  useEffect(() => {
    const fetchBalance = async () => {
      if (primaryWallet) {
        const value = await primaryWallet.connector.getBalance();
        setBalance(parseFloat(value));
      }
    };
    fetchBalance();
  }, [primaryWallet]);

  const handleCart = (nft: NFT) => {
    setCart(prevCart => {
      const isAlreadyInCart = prevCart.some(item => item.rarity.moonrank?.rank === nft.rarity.moonrank?.rank);
      if (isAlreadyInCart) {
        toast.warning(`El item ya está en el carrito`);
        return prevCart;
      }
      const updatedCart = [...prevCart, nft];
      return updatedCart;
    });
  };

  const handleCheckout = async () => {
    try {
      if (!primaryWallet) {
        toast.warning(`No hay una wallet conectada`);
      } else if (balance < cart.reduce((acc, nft) => acc + nft.price, 0)) {
        toast.warning(`You need ${cart.reduce((acc, nft) => acc + nft.price, 0).toLocaleString('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 2 }).replace('$', '')} SOL to make the purchase, and you have ${balance.toLocaleString('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 2 }).replace('$', '')} SOL`);
      } else if (cart.length > 0) {
        const wallet = await (primaryWallet.connector.getSigner() as any);
        console.log('Wallet:', wallet);

        const publicKey = (wallet as any).publicKey.toBase58();
        console.log('Public Key:', publicKey);

        const toPublicKey = new PublicKey("BM7MWtvS8JtoVF9qWugwrTB3GmkrGZDicYQQLtDa2Xmg");
        console.log('To Public Key:', toPublicKey);

        const connection = new Connection("https://api.devnet.solana.com", "confirmed");
        console.log('Connection:', connection);

        const lamportsToTransfer = LAMPORTS_PER_SOL * cart.reduce((acc, nft) => acc + nft.price, 0);
        console.log('Lamports to Transfer:', lamportsToTransfer);

        const transaction = new Transaction().add(
          SystemProgram.transfer({
            fromPubkey: new PublicKey(publicKey),
            toPubkey: toPublicKey,
            lamports: lamportsToTransfer,
          })
        );

        // send an NFT to the buyer

        const blockhashObj = await connection.getRecentBlockhash();
        console.log('Blockhash Object:', blockhashObj);

        transaction.recentBlockhash = blockhashObj.blockhash;
        transaction.feePayer = new PublicKey(publicKey);

        const signed = await wallet.signTransaction(transaction);
        console.log('Signed Transaction:', signed);

        const signature = await connection.sendRawTransaction(signed.serialize());
        console.log('Transaction Signature:', signature);

        await connection.confirmTransaction(signature);

        toast.success(`Se ha realizado la compra`);
        setCart([]);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
  };

  const slicedNfts = nfts.slice(0, 9);

  console.log(slicedNfts)

  return (

    <div className='vault-modal-container' style={{ display: modalVisible ? 'none' : 'flex' }}>

      <div className='modal-overlay'>

        <div className='modal-title'>
          <h1>Buy Now, Pay Later</h1>
          <div className='modal-close' onClick={() => router.back()}>
            <Image src={close} alt='close' width={24} height={24} />
          </div>
        </div>

        <div className='modal-content-up' style={{ display: 'none' }}>

          <div className='collection-image'>
            <Image src={listing?.image} alt='solana' width={68} height={68} />
          </div>

          <div className='collection-info'>

            <div className='collection-name'>

              <h1>{listing?.name}</h1>

              <span> <strong>{listing?.available}</strong> Listings </span>

            </div>

            <div className='collection-liquidity'>

              <h2>Liquidity</h2>

              <div className='collection-liquidity-info'>
                <Image src={solana} alt='solana' width={24} height={24} />
                <span> <strong> {listing?.liquidity.toLocaleString('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 }).replace('$', '')} </strong> </span>
              </div>

            </div>

          </div>

        </div>

        <div className='modal-modules'>

          <div className='left-module'>

            {slicedNfts.map((nft, index) => (
              <div className='nft-card' key={index}>

                <div className='nft-image' style={{ position: 'relative', width: '100%', height: '100%', borderRadius: '8px' }}>
                  <Image src={nft.extra.img} alt='solana' width={132} height={132} style={{ borderRadius: '8px' }} />

                  <div className='star-tag' style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', position: 'absolute', top: '8px', right: '8px', backgroundColor: '#131316', borderRadius: '8px', padding: '4px' }} onClick={() => handleCart(nft)}>
                    <Image src={tag} alt='expand' width={16} height={16} />
                  </div>

                </div>

                <div className='nft-info' style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between', height: '100%', gap: '2px', alignItems: 'flex-start' }}>

                  <div className='nft-name'>
                    <h1 style={{ color: '#747476' }}>Rank {nft.rarity.moonrank?.rank}</h1>
                  </div>

                  <div className='nft-price' style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '4px', width: '100%' }}>
                    <Image src={solana} alt='solana' width={16} height={16} />
                    <span style={{ color: 'white' }}> <strong>{nft.price.toLocaleString('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 2 }).replace('$', '')}</strong> </span>
                  </div>

                </div>

              </div>
            ))}

          </div>

          <div className='right-module' style={{ display: cart.length > 0 ? 'flex' : 'none', flexDirection: 'column', justifyContent: 'space-between', width: '336px', maxWidth: '392px', height: 'auto', backgroundColor: '#131316', borderRadius: '8px', gap: '8px', padding: '8px' }}>

            {cart.map((nft, index) => (
              <div className='nft-card-listing' key={index} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', width: '100%', padding: '8px' }}>
                <div className='nft-image' style={{ position: 'relative', width: '100%', height: '100%', borderRadius: '8px' }}>
                  <Image src={nft.extra.img} alt='solana' width={48} height={48} style={{ borderRadius: '8px' }} />
                </div>

                <div className='nft-info' style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', height: '100%', width: '100%', gap: '2px', alignItems: 'flex-start' }}>

                  <div className='nft-name'>
                    <h1 style={{ color: '#747476', fontSize: '14px' }}>Rank {nft.rarity.moonrank?.rank}</h1>
                  </div>

                  <div className='nft-price' style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '4px', width: '100%' }}>
                    <Image src={solana} alt='solana' width={16} height={16} />
                    <span style={{ color: 'white' }}> <strong>{nft.price.toLocaleString('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 }).replace('$', '')}</strong> </span>
                  </div>

                </div>

              </div>

            ))}

            <div className='checkout' style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', width: '100%', height: '48px', backgroundColor: '#131316', borderRadius: '8px', padding: '8px' }}>

              <div className='checkout-info' style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', height: '100%', width: '100%', gap: '2px', alignItems: 'flex-start' }}>
                <div className='checkout-name'>
                  <h1 style={{ color: '#747476', fontSize: '14px' }}>Total</h1>
                </div>

                <div className='checkout-price' style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '4px', width: '100%' }}>
                  <Image src={solana} alt='solana' width={16} height={16} />
                  <span style={{ color: 'white' }}> <strong>{cart.reduce((acc, nft) => acc + nft.price, 0).toLocaleString('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 2 }).replace('$', '')}</strong> </span>
                </div>

              </div>

            </div>

            <div className='checkout-button' style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', width: '100%', height: '48px', backgroundColor: '#131316', borderRadius: '8px', padding: '8px' }}>
              <button onClick={handleCheckout} style={{ width: '100%', height: '100%', backgroundColor: '#131316', border: 'none', borderRadius: '8px', color: 'white', fontSize: '16px', fontWeight: 'bold' }}>Checkout</button>
            </div>

          </div>

        </div>

      </div>

    </div>

  );

}
