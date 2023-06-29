import React from "react";
import Image from "next/image";

import "../../../styles/listings.css";
import solana from "../../../public/solana.webp";
import ethereum from "../../../public/ethereum.webp";

import ListingsFetch from "./Listings";

export default function Listings() {

    return (
        <div className="listings-container">

            <div className="title">
                <h1>Listings</h1>

                <div className="description">
                    <p>Discover the best NFTs to invest in.</p>
                </div>

            </div>

            <ListingsFetch />

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