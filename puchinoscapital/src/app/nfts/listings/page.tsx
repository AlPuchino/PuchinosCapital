'use client'
import React, { useEffect, useState } from "react";
import { useRouter } from 'next/navigation';
import Image from "next/image";
// import Link from "next/link";

import "../../../styles/listings.css";
import solana from "../../../public/solana.webp";

interface Listing {
  id: any;
  name: string;
  image: string;
  available: number;
  liquidity: number;
  apy: number;
}

const Page = () => {
  const router = useRouter();
  const [listings, setListings] = useState<Listing[]>([]);

  useEffect(() => {
    loadListings();
  }, []);

  const loadListings = async () => {
    try {
      const response = await fetch("/api/listings");
      if (response.ok) {
        const data = await response.json();
        console.log("Listados cargados:", data);
        setListings(data);
      } else {
        throw new Error("Error al cargar los listados");
      }
    } catch (error) {
      console.error("Error al cargar los listados:", error);
    }
  };

  return (
    <div className="listings-container">
      <div className="title">
        <h1>Listings</h1>
      </div>

      <div className="listings">
        {listings.map((listing) => (
          <div className="listing" key={listing.name}>
            <div className="listing-module">
              <div className="listing-first-row">
                <div className="listing-image">
                  <Image src={listing.image} alt="listing" width={64} height={64} />
                </div>

                <div className="listing-info">
                  <p>{listing.id}</p>
                  <span>
                    <strong>{listing.available}</strong> Available
                  </span>
                </div>
              </div>

              <div className="listing-second-row">
                <div className="listing-liquidity">
                  <p>Pool</p>
                  <div className="listing-liquidity-amount">
                    <Image src={solana} alt="logo" />
                    <span>{listing.liquidity}</span>
                  </div>
                </div>

                <div className="listing-apy">
                  <p>APY</p>
                  <span>{listing.apy}%</span>
                </div>
              </div>
            </div>

            <button type="button" onClick={() => router.push(`/nfts/listings/${listing.name}`)}>
              <a className="button">View All</a>
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Page;



// Path: puchinoscapital\src\app\nfts\listings\page.tsx