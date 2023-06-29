'use client'
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import socket from "socket.io-client";
import Filters, { FiltersProps } from "./Filters";
import { AutoComplete } from 'antd';

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

export default function ListingsFetch() {
  const router = useRouter();
  const [listings, setListings] = useState<Listing[]>([]);
  const [selectedChain, setSelectedChain] = useState("everything");
  const [options, setOptions] = useState<any[]>([]);
  const [listingsDup, setListingsDup] = useState<Listing[]>([]); // duplicate of listings [
  const [search, setSearch] = useState("");

  useEffect(() => {
    const io = socket("http://localhost:4000/listings");

    io.on("listings", (data: Listing[]) => {
      console.log(data);
      setOptions(data.map((listing) => ({ value: listing.name, label: listing.name })));
      setListings(data);
      setListingsDup(data);
    });

    return () => {
      io.disconnect();
    };
  }, []);

  const handleSelectedChain = (value: string) => {
    setSelectedChain(value);
  };

  const handleSearch = (value: string) => {
    if (value) {
      const filteredListings = listings.filter((listing) =>
        listing.name.toLowerCase().includes(value.toLowerCase())
      );
      setListings(filteredListings);
      console.log(`search value: ${value}`);
    } else {
      setListings(listingsDup);
      console.log(listingsDup);
      console.log(`search value: ${value}`);
    }
  };
  

  return (
    <div className="listings">
      <div className="filters">
        <AutoComplete
          style={{ width: 200, backgroundColor: "#1a1a1a" }}
          options={options}
          placeholder="Search Collection"
          filterOption={(inputValue, option) =>
            option?.label.toLowerCase().indexOf(inputValue.toLowerCase()) !== -1
          }
          onChange={(value) => handleSearch(value)}
        />
        <Filters onSelectChain={handleSelectedChain} />
      </div>
      {listings.map((listing) => {
        if (selectedChain === "everything" || listing.blockchain === selectedChain) {
          return (
            <div className="listing" key={listing.id} onClick={() => router.push(`/bank/collection/${listing.id}`)}>
              <div className="listing-module">
                <div className="listing-first-row">
                  <div className="listing-image">
                    <Image src={listing.image} alt="listing" width={64} height={64} />
                    <div className="chain-icon">
                      {listing.blockchain === "solana" ? (
                        <Image src={solana} alt="solana" width={16} height={16} style={{ backgroundColor: "#9945FF" }} />
                      ) : (
                        <Image src={ethereum} alt="ethereum" width={16} height={16} style={{ backgroundColor: "#537FEF" }} />
                      )}
                    </div>
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
          );
        } else {
          return null;
        }
      })}
    </div>
  );
}
