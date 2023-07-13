import React from "react";

import "../../../styles/listings.css";

import ListingsFetch from "./Listings";

export default function Listings() {

    return (
        <div className="content-container">

            <div className="title">
                <h1>Listings</h1>

                <div className="description">
                    <p>Discover the best NFTs to invest in.</p>
                </div>

            </div>

            <ListingsFetch />

        </div>
    );
};