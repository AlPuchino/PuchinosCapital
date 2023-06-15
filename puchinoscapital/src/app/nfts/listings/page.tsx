'use client'
import React, { useEffect, useState } from "react";
import { useRouter } from 'next/navigation';
import Image from "next/image";
import Pusher from "pusher-js";
// import Link from "next/link";

import "../../../styles/listings.css";
import solana from "../../../public/solana.webp";
import ethereum from "../../../public/ethereum.webp";

interface Listing {
  id: any;
  name: string;
  image: string;
  available: number;
  liquidity: number;
  apy: number;
  interest: number;
  blockchain: string;
}

const Page = () => {
  const router = useRouter();
  const [listings, setListings] = useState<Listing[]>([]);

  useEffect(() => {
    const pusher = new Pusher('6737a76f2d851a4100bf', {
      cluster: 'us3',
  });

  const channel = pusher.subscribe("my-channel");
  channel.bind("listings-updated", function (data: any) {
    console.log(data);
    setListings(data);
  });

  fetch("/api/listings")

  }, []);

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
                  <p>{listing.name}</p>
                  <span>
                    <strong>{listing.available}</strong> Available
                  </span>
                </div>
              </div>

              <div className="listing-second-row">
                <div className="listing-liquidity">
                  <p>Pool</p>
                  <div className="listing-liquidity-amount">
                    <Image src={listing.blockchain === "solana" ? solana : ethereum} alt="listing" style={{ backgroundColor: solana ? "#9945FF" : "#537FEF" }}/>
                    <span>{listing.liquidity.toLocaleString("en-US", { style: "currency", currency: "USD" }).replace(/[$]/g, "")}</span>
                  </div>
                </div>

                <div className="listing-apy">
                  <p>APY</p>
                  <span>{listing.interest}%</span>
                </div>
              </div>
            </div>

            <button className="button" onClick={() => router.push(`/nfts/listings/${listing.name}`)}>
              <a>View All</a>
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Page;



// Path: puchinoscapital\src\app\nfts\listings\page.tsx