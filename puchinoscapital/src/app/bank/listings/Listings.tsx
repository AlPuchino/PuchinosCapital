'use client'
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import socket from "socket.io-client";

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

export default function ListingsFetch() {
  const router = useRouter();
  const [listings, setListings] = useState(null);

  useEffect(() => {
    const io = socket("http://localhost:4000/listings");

    io.on("listings", (data) => {
      console.log(data);
      setListings(data);
    });

    return () => {
      io.disconnect(); // Desconectar el socket cuando se desmonte el componente
    };
  }, []);

  if (!listings) return <div>Loading...</div>;

  return (
    <div className="listings">
      {listings.map((listing) => (
        <div className="listing" key={listing.id} onClick={() => router.push(`/bank/listings/${listing.id}`)}>
          <div className="listing-module">
            <div className="listing-first-row">
              <div className="listing-image">
                {/* <Image
                  src={listing.image}
                  alt="listing"
                  width={64}
                  height={64}
                /> */}
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
                  <span>
                    {listing.liquidity
                      .toLocaleString("en-US", {
                        style: "currency",
                        currency: "USD",
                      })
                      .replace(/[$]/g, "")}
                  </span>
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
    </div>
    );
}
