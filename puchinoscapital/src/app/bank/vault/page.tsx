import React from "react";

import "../../../styles/vault.css";

import ListingsFetch from "./Listings";

export default function Listings() {

    return (
        <div className="listings-container">

            <div className="title">
                <h1>Vault</h1>

                <div className="description">
                    <p>Discover the NFTs available for acquire</p>
                </div>

            </div>

            <ListingsFetch />

        </div>
    );
};