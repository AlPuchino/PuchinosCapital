'use client'
import React, { useEffect, useState } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import socket from "socket.io-client";
import Image from 'next/image';

import '@/styles/[id].css';

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

import sol from "@/public/solana.webp";
import eth from "@/public/ethereum.webp";

export default function Login() {
  const router = useRouter();
  const [modalVisible, setModalVisible] = React.useState(false);
  const link = usePathname();
  const [listing, setListing] = useState<Listing>();

  // remove the /bank/collection/ from the link to get the id
  const id = link.replace('/bank/collection/', '');

  useEffect(() => {
    const io = socket("http://localhost:4000/modalListing");

    io.emit("listingId", id);

    io.on("listingData", (data: any) => {
      console.log(data);
      setListing(data[0]);
    });

    return () => {
      io.disconnect();
    };
  }, [id]);

    return (
        <div className="collection-details-container">

            <div className="collection-details">

                <div className="collection-id">

                    <div className="left-side">
                        <Image src={listing?.image} alt="Collection Image" width={108} height={108} style={{ borderRadius: '2px' }} />
                    </div>

                    <div className="right-side">

                        <div className="collection-name">
                            <h1>{listing?.name}</h1>
                            <span><strong>{listing?.available}</strong> available</span>
                        </div>

                        <div className="collection-details">

                            <div className="collection-details-item">
                                <span className="title">Liquidity:</span>
                                <Image src={sol} alt="Solana" />
                                <span className="value">{listing?.liquidity.toLocaleString("en-US", { style: "currency", currency: "USD" }).replace(/[$]/g, "")}</span>
                            </div>

                            <div className="collection-details-item">
                                <span className="title">Interest:</span>
                                <Image src={sol} alt="Solana" />
                                <span className="value">{listing?.interest}%</span>
                            </div>

                        </div>

                    </div>

                </div>

                <div className="collection-volume">

                    <h1>TOTAL VOLUME</h1>

                    <div className="collection-volume-item">
                        <Image src={sol} alt="Solana" />
                        <span className="value">
                            {/* {listing.volume.toLocaleString("en-US", { style: "currency", currency: "USD" }).replace(/[$]/g, "")} */}
                        </span>
                    </div>

                    {/* <span className="usd-conversion">{(listing.volume * 20.19).toLocaleString("en-US", { style: "currency", currency: "USD" })}</span> */}

                </div>

                {/* <div className="collection-data">

                    <div className="collection-data-item">
                        <span className="title">Given</span>
                        <span className="value">{listing?.loansGiven}</span>
                    </div>

                    <div className="collection-data-item">
                        <span className="title">Repaid</span>
                        <span className="value">{listing?.loansRepaid}</span>
                    </div>

                    <div className="collection-data-item">
                        <span className="title">Defaulted</span>
                        <span className="value">{listing.loansDefaulted}</span>
                    </div>

                </div> */}

            </div>

            <div className="collection-lenders">

                {/* <div className="table">

                    <div className="table-pool" >
                        <span className="title">POOL</span>
                    </div>

                    <div className="table-amount" onClick={() => handleFilter("amount")}>
                        <span className="title">AMOUNT</span>
                        {activeFilter === "amount" && <span className="table-arrow">{sortDirection === "asc" ? "▼" : "▲"}</span>}
                    </div>

                    <div className="table-interest" onClick={() => handleFilter("interest")}>
                        <span className="title">INTEREST</span>
                        {activeFilter === "interest" && <span className="table-arrow">{sortDirection === "asc" ? "▼" : "▲"}</span>}
                    </div>

                    <div className="table-duration" onClick={() => handleFilter("duration")}>
                        <span className="title">DURATION</span>
                        {activeFilter === "duration" && <span className="table-arrow">{sortDirection === "asc" ? "▼" : "▲"}</span>}
                    </div>

                    <div className="table-accept">
                        <span className="title">ACTION</span>
                    </div>

                </div> */}

                <div className="table-separator"></div>

                {/* <button className="create-listing-button" onClick={createListing}>Create Listing</button> */}

                {/* {filteredLenders.map((lender: any) => (
                    <div className={`collection-lender ${lender?.available ? 'available' : 'unavailable'}`} key={lender?.from}>

                        <div className="collection-lender-item">
                            <Image src={lender?.image ? lender?.image : user} alt="user" />
                            <span className="title">{lender?.from}</span>
                        </div>

                        <div className="collection-lender-item">
                            <div className="collection-lender-item-value">
                                <Image src={sol} alt="Solana" />
                                <span className="value">{lender?.amount} SOL</span>
                            </div>
                            <p className="usd-conversion">{(lender?.amount * 20.19).toLocaleString("en-US", { style: "currency", currency: "USD" })} USD</p>
                        </div>

                        <div className="collection-lender-item">

                            <div className="collection-lender-item-value">
                                <Image src={sol} alt="Solana" />
                                <span className="value">{lender?.interest} SOL</span>
                            </div>

                            <p className="usd-conversion">{(20.19 * lender?.interest).toLocaleString("en-US", { style: "currency", currency: "USD" })} USD</p>

                        </div>

                        <div className="collection-lender-item">
                            <span className="value">{lender?.time} Days</span>
                        </div>

                        {/* <div className="collection-lender-item">
                            <button
                                className="accept"
                                onClick={() => acceptLoan(lender.from, publicKey?.toString(), listingData.name)}
                                disabled={!lender.available}
                            >
                                Accept
                            </button>
                        </div> */}

                    {/* </div>
                ))} } */}
            </div>

        </div>
    );
}