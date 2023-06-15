/* eslint-disable react/no-unescaped-entities */
"use client";
import React, { useEffect, useState } from "react";
import WalletButton from '../contexts/WalletButton';
import Image from "next/image";
import "../styles/navbar.css";
import fetch from 'node-fetch';

import logo from "../public/logo.svg";
import bank from "../public/bank.svg";
import piggy from "../public/piggy.svg";
import listings from "../public/listings.svg";
import valuation from "../public/valuation.svg";
import ME from "../public/ME.svg";
import apply from "../public/apply.svg";
import offer from "../public/offer.svg";
import lightning from "../public/lightning.svg";
import hamburger from "../public/hamburger.svg";
import { useWallet } from "@solana/wallet-adapter-react";

export default function Navbar() {
  const wallet = useWallet();
  const [isMobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isWalletConnected, setIsWalletConnected] = useState(false);
  const [isDropdownVisible, setIsDropdownVisible] = useState(false);

  useEffect(() => {
    if (wallet.connected) {
      console.log("wallet connected and its value is: ", wallet.publicKey?.toString());
      // fetch('http://localhost:3000/api/nfts', {
      //   method: 'POST',
      //   headers: {
      //     'Content-Type': 'application/json',
      //   },
      //   body: JSON.stringify({ publicKey: wallet.publicKey?.toString() }),
      // })
      //   .then(response => response.json())
      //   .then(data => {
      //     console.log('Success:', data.assets[0].collectionAddress);
      //   })
      //   .catch((error) => {
      //     console.error('Error:', error);
      //   });
      setIsWalletConnected(true);
      setIsDropdownVisible(true);
    } else {
      setIsWalletConnected(false);
      setIsDropdownVisible(false);
    }
  }, [wallet.connected, wallet.publicKey]);


  const toggleMobileMenu = () => {
    setMobileMenuOpen(!isMobileMenuOpen);
  };

  const [isHovering, setIsHovering] = useState({
    Dashboard: false,
    HowItWorks: false,
    NFTs: false,
    Services: false,
    Information: false,
  });

  const handleMouseEnter = (linkName: string) => {
    setIsHovering({ ...isHovering, [linkName]: true });
  };

  const handleMouseLeave = (linkName: string) => {
    setIsHovering({ ...isHovering, [linkName]: false });
  };

  return (
    <nav>
      <div className="logo">
        <Image src={logo} alt="Puchinos Capital" width={40} height={40} />
      </div>
      <div className="links">
        <div
          className={`link ${isHovering.Dashboard ? "active" : ""}`}
          onMouseEnter={() => handleMouseEnter("Dashboard")}
          onMouseLeave={() => handleMouseLeave("Dashboard")}
        >
          <h2
            style={{ cursor: "pointer" }}
            onClick={() => (window.location.href = "/dashboard")}
          >
            Dashboard
          </h2>
        </div>
        <div
          className={`link ${isHovering.HowItWorks ? "active" : ""}`}
          onMouseEnter={() => handleMouseEnter("HowItWorks")}
          onMouseLeave={() => handleMouseLeave("HowItWorks")}
        >
          <h2>How it Works?</h2>
          {isHovering.HowItWorks && (
            <div className="dropdown-menu">
              <a href="/info/borrowers">
                <div className="dropdown-icon">
                  <Image
                    src={bank}
                    alt="Puchinos Capital"
                    width={24}
                    height={24}
                  />
                </div>

                <div className="dropdown-info">
                  <h3>For Borrowers</h3>
                  <p>Secure loans using your NFT's as collateral.</p>
                </div>
              </a>

              <a href="/info/lenders">
                <div className="dropdown-icon">
                  <Image
                    src={piggy}
                    alt="Puchinos Capital"
                    width={24}
                    height={24}
                  />
                </div>

                <div className="dropdown-info">
                  <h3>For Lenders</h3>
                  <p>Lend money securely backed by NFT's.</p>
                </div>
              </a>
            </div>
          )}
        </div>
        <div
          className={`link ${isHovering.NFTs ? "active" : ""}`}
          onMouseEnter={() => handleMouseEnter("NFTs")}
          onMouseLeave={() => handleMouseLeave("NFTs")}
        >
          <h2>NFTs</h2>
          {isHovering.NFTs && (
            <div className="dropdown-menu">
              <a href="/nfts/listings">
                <div className="dropdown-icon">
                  <Image
                    src={listings}
                    alt="Puchinos Capital"
                    width={24}
                    height={24}
                  />
                </div>

                <div className="dropdown-info">
                  <h3>Listings</h3>
                  <p>Browse NFT's available for loan collateral.</p>
                </div>
              </a>

              <a href="/nfts/valuation">
                <div className="dropdown-icon">
                  <Image
                    src={valuation}
                    alt="Puchinos Capital"
                    width={24}
                    height={24}
                  />
                </div>

                <div className="dropdown-info">
                  <h3>How an NFT is valued</h3>
                  <p>Understand how we evaluate NFT's worth.</p>
                </div>
              </a>

              <a href="/nfts/getpuchinos">
                <div className="dropdown-icon">
                  <Image
                    src={ME}
                    alt="Puchinos Capital"
                    width={24}
                    height={24}
                  />
                </div>

                <div className="dropdown-info">
                  <h3>Get a Puchino</h3>
                  <p>Get a Puchino from our collection at Magic Eden.</p>
                </div>
              </a>
            </div>
          )}
        </div>
        <div
          className={`link ${isHovering.Services ? "active" : ""}`}
          onMouseEnter={() => handleMouseEnter("Services")}
          onMouseLeave={() => handleMouseLeave("Services")}
        >
          <h2>Services</h2>
          {isHovering.Services && (
            <div className="dropdown-menu">
              <a href="/services/apply">
                <div className="dropdown-icon">
                  <Image
                    src={apply}
                    alt="Puchinos Capital"
                    width={24}
                    height={24}
                  />
                </div>

                <div className="dropdown-info">
                  <h3>Apply for a Loan</h3>
                  <p>Get an easy, secure, NFT-backed loan.</p>
                </div>
              </a>

              <a href="/services/offer">
                <div className="dropdown-icon">
                  <Image
                    src={offer}
                    alt="Puchinos Capital"
                    width={24}
                    height={24}
                  />
                </div>

                <div className="dropdown-info">
                  <h3>Offer a Loan</h3>
                  <p>Lend safely with NFT's as guarantees.</p>
                </div>
              </a>

              <a href="/services/instant">
                <div className="dropdown-icon">
                  <Image
                    src={lightning}
                    alt="Puchinos Capital"
                    width={24}
                    height={24}
                  />
                </div>

                <div className="dropdown-info">
                  <h3>Instant Loans</h3>
                  <p>
                    Secure a loan of up to 50% of your NFT's value instantly.
                  </p>
                </div>
              </a>
            </div>
          )}
        </div>
        <div
          className={`link ${isHovering.Information ? "active" : ""}`}
          onMouseEnter={() => handleMouseEnter("Information")}
          onMouseLeave={() => handleMouseLeave("Information")}
        >
          <h2>Information</h2>
          {isHovering.Information && (
            <div className="dropdown-menu">
              <a href="/information/faqs">
                <div className="dropdown-icon">
                  <Image
                    src={apply}
                    alt="Puchinos Capital"
                    width={24}
                    height={24}
                  />
                </div>

                <div className="dropdown-info">
                  <h3>FAQ's</h3>
                  <p>Get answers to common queries.</p>
                </div>
              </a>

              <a href="/information/aboutus">
                <div className="dropdown-icon">
                  <Image
                    src={offer}
                    alt="Puchinos Capital"
                    width={24}
                    height={24}
                  />
                </div>

                <div className="dropdown-info">
                  <h3>About Us</h3>
                  <p>Learn about our mission and team.</p>
                </div>
              </a>

              <a href="/information/contact">
                <div className="dropdown-icon">
                  <Image
                    src={lightning}
                    alt="Puchinos Capital"
                    width={24}
                    height={24}
                  />
                </div>

                <div className="dropdown-info">
                  <h3>Contact Us</h3>
                  <p>
                    Reach out for assistance.
                  </p>
                </div>
              </a>
            </div>
          )}
        </div>
      </div>
      <div className={`wallet-dropdown ${isWalletConnected ? "connected" : ""}`}>
  {isDropdownVisible && (
    <div className="dropdown-container">
      <div className="user-icon" >
          <h3>{wallet.publicKey?.toString() ? wallet.publicKey?.toString().substring(0, 4) + "..." + wallet.publicKey?.toString().substring(wallet.publicKey?.toString().length - 4) : "Connect Wallet"}</h3>
      </div>
      <div className="dropdown-content">
        <a href={`/profile/${wallet.publicKey?.toString()}`}>Profile</a>
        <a href="/settings">Settings</a>
        <button onClick={() => wallet.disconnect()}>Disconnect Wallet</button>
      </div>
    </div>
  )}
  {!isDropdownVisible && <WalletButton />}
      </div>
      <div className="mobile-menu" onClick={toggleMobileMenu}>
        <Image src={hamburger} alt="Puchinos Capital" width={40} height={40} />
      </div>
    </nav>
  );
}
