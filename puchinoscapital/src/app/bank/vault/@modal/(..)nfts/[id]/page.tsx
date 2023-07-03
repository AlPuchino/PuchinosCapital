'use client'
import React, { useEffect, useState } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import Link from 'next/link';
import socket from "socket.io-client";
import Image from 'next/image';
import { Tooltip } from 'antd';
import { toast } from 'react-toastify';

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
  const router = useRouter();
  const [modalVisible, setModalVisible] = React.useState(false);
  const link = usePathname();
  const [listing, setListing] = useState<Listing>();
  const [nfts, setNfts] = useState<NFT[]>([]);
  const [cart, setCart] = useState<NFT[]>([]);

  const id = link.replace('/bank/nfts/', '');

  useEffect(() => {
    const io = socket("http://localhost:4000/modalListing");

    io.emit("listingId", id);

    io.on("listingData", (data: any) => {
      console.log(data);
      setListing(data[0]);
    });

    fetch(`/api/nftDetails?id=${id}`)
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        setNfts(data);
      });

    return () => {
      io.disconnect();
    };
  }, [id]);

  const handleCart = (nft: NFT) => {
    const updatedCart = [...cart, nft];
    setCart(updatedCart);
    console.log("Items en el carrito:", updatedCart);
    toast.success(`Se ha agregado ${nft.rarity.moonrank.rank} al carrito`);
  };
  

  const slicedNfts = nfts.slice(0, 9);

  return (

    <div className='vault-modal-container' style={{ display: modalVisible ? 'none' : 'flex' }}>

      <div className='modal-overlay'>

        <div className='modal-title'>
          <h1>Buy Now, Pay Later</h1>
          <div className='modal-close' onClick={() => router.back()}>
            <Image src={close} alt='close' width={24} height={24} />
          </div>
        </div>

        <div className='modal-content-up'>

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
                  <h1 style={{ color: '#747476'}}>Rank {nft.rarity.moonrank.rank}</h1>
                </div>

                <div className='nft-price' style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '4px', width: '100%' }}>
                  <Image src={solana} alt='solana' width={16} height={16} />
                  <span style={{ color: 'white'}}> <strong>{nft.price.toLocaleString('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 }).replace('$', '')}</strong> </span>
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
                      <h1 style={{ color: '#747476', fontSize: '14px'}}>Rank {nft.rarity.moonrank.rank}</h1>
                    </div>

                    <div className='nft-price' style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '4px', width: '100%' }}>
                      <Image src={solana} alt='solana' width={16} height={16} />
                      <span style={{ color: 'white'}}> <strong>{nft.price.toLocaleString('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 }).replace('$', '')}</strong> </span>
                    </div>

                  </div>

                </div>

              ))}


          </div>

        </div>

      </div>

    </div>

  );

}
