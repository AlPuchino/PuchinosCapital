'use client'
import React, { useEffect, useState } from "react";
import { useRouter } from 'next/navigation';
import Image from "next/image";

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

function loadListings() {
    fetch("/api/listings")
    .then((res) => res.json())
    .then((data) => {
        console.log(data);
        return data;
    }
    );
}

export default async function Listings() {
    const router = useRouter();
    const listings = await loadListings();

    console.log(listings);

    return (
        <div className="listings-container">

            <div className="title">
                <h1>Listings</h1>

                <div className="description">
                    <p>Earn passive income by lending your cryptocurrencies.</p>
                </div>

            </div>

            <div className="filters">
            </div>

            {/* <div className="listings">
                {listings?.map((listing) => (
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
                                        <span>{listing.liquidity.toLocaleString("en-US", { style: "currency", currency: "USD" }).replace(/[$]/g, "")}</span>
                                    </div>
                                </div>

                                <div className="listing-apy">
                                    <p>APY</p>
                                    <span>{listing.interest}%</span>
                                </div>
                            </div>
                        </div>

                    </div>
                ))}
            </div> */}

        </div>
    );
};