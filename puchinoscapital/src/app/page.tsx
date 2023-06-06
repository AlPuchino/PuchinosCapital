import React from "react";
import Image from "next/image";
import "../styles/landing.css";

import puchino from "../public/puchino.webp";
import logo from "../public/puchinobank.webp";
import nft from "../public/nft.webp";
import arrows from "../public/arrows.webp";

export default function Home() {
  return (
    <div className="App">

      <div className="landing-container">

        <div className="hero">

          <div className="left-side">
            <div className="title">
              <h1>A STEADFAST ALLY</h1>
            </div>

            <div className="intro">
              <p>
                Empowering your financial journey with exceptional loans and
                lenders
              </p>
            </div>

            <div className="description">
              <p>
                Growth and success go hand-in-hand. Focus on reaching your
                financial goals with our outstanding loan and lender services.
              </p>
            </div>
          </div>

          <div className="right-side">

            <div className="background-animation">
              <div className="circle main-circle"></div>
              <div className="circle small-circle small-circle1"></div>
              <div className="circle small-circle small-circle2"></div>
              <div className="circle small-circle small-circle3"></div>
              <div className="circle small-circle small-circle4"></div>
            </div>

            <div className="cards">

              <div className="main-card">
                <div className="image">
                  <Image src={puchino} alt="puchino" />
                </div>

                <div className="name">
                  <h1>Puchino #3,701</h1>
                </div>

                <div className="stats">
                  <div className="stat">
                    <p className="stat-name">Duration</p>

                    <span className="stat-value">7 Days</span>
                  </div>

                  <div className="stat">
                    <p className="stat-name">Total Funding</p>

                    <span className="stat-value">48 SOL</span>
                  </div>

                  <div className="stat">
                    <p className="stat-name">Interest</p>

                    <span className="stat-value">2 SOL</span>
                  </div>
                </div>
              </div>

              <div className="small-cards">

                <div className="small-card">

                  <div className="image">
                    <Image src={logo} alt="puchino" />
                  </div>

                  <div className="info">

                    <p className="name">Lender</p>

                    <span className="duration">Puchinos Capital</span>

                  </div>

                </div>

                <Image src={arrows} alt="puchino" className="arrows" />

                <div className="small-card2">

                  <div className="info">

                    <p className="name">Borrower</p>

                    <span className="duration">Bzwy....5P29</span>

                  </div>

                  <div className="image">
                    <Image src={nft} alt="puchino" />
                  </div>

                </div>

              </div>

            </div>

          </div>

        </div>

      </div>

    </div>
  );
}
