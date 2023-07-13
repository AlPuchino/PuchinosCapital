'use client'
import React, { useEffect, useState } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import Link from 'next/link';
import socket from "socket.io-client";
import Image from 'next/image';
import { Tooltip } from 'antd';
import { toast } from 'react-toastify';

import close from "@/public/hexagon-close.svg";
import solana from "@/public/solanawhite.svg";
import user from "@/public/user.svg";
import expand from "@/public/expand.svg";

interface Listing {
  id: any;
  name: string;
  image: string;
  available: number;
  liquidity: number;
  apy: number;
  interest: number;
  blockchain: string;
  lenders: any[];
}

export default function Login() {
  const router = useRouter();
  const [modalVisible, setModalVisible] = React.useState(false);
  const link = usePathname();
  const [listing, setListing] = useState<Listing>();
  const [lenders, setLenders] = useState<any[]>([]);

  const id = link.replace('/bank/collection/', '');

  useEffect(() => {
    const io = socket("http://localhost:4000/modalListing");

    io.emit("listingId", id);

    io.on("listingData", (data: any) => {
      console.log(data);
      setListing(data[0]);
      setLenders(data[0].lenders);
    });

    return () => {
      io.disconnect();
    };
  }, [id]);

  const handlePromise = () => {
    toast.promise(
      new Promise<void>((resolve, reject) => {
        setTimeout(() => {
          resolve();
        }, 3000);
      }),
      {
        pending: `Accepting offer from ${lenders[0].name}`,
        success: `Offer accepted, you got ${lenders[0].amount.toLocaleString('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 2 }).replace('$', '')}!`,
        error: 'Error accepting offer',
      }
    );
  };

  return (

    <div className='listing-modal-container'>

      <div className='modal-overlay'>

        <div className='modal-title'>
          <h1>Preview</h1>
          <div className='modal-close' onClick={() => router.back()}>
            <Image src={close} alt='close' width={24} height={24} />
          </div>
        </div>

        <div className='modal-content'>

          <div className='modal-content-up'>

            <div className='collection-image'>
              <Image src={listing?.image} alt='solana' width={68} height={68} />
            </div>

            <div className='collection-info'>

              <div className='collection-name'>

                <h1>{listing?.name}</h1>

                <span> <strong>{listing?.available}</strong> Listings </span>

              </div>

              <div className='collection-liquidity'>

                <h2>Liquidity</h2>

                <div className='collection-liquidity-info'>
                  <Image src={solana} alt='solana' width={24} height={24} />
                  <span> <strong> {listing?.liquidity.toLocaleString('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 }).replace('$', '')} </strong> </span>
                </div>

              </div>

            </div>

          </div>

          <div className='modal-content-down'>

            <div className="table">

              <div className="table-pool" >
                <span className="title">POOL</span>
              </div>

              <div className="table-amount">
                <span className="title">AMOUNT</span>
              </div>

              <div className="table-interest">
                <span className="title">INTEREST</span>
              </div>

              <div className="table-duration">
                <span className="title">TIME</span>
              </div>

              <div className="table-accept">
                <span className="title">ACTION</span>
              </div>

            </div>

            <div className="lenders" >
              {lenders?.map((lender, index) => (
                <div className="lender" key={index}>

                  <div className="lender-pool" >
                    <Tooltip title={lender.name} placement="left" color="#E8E8E8" >
                      <Image src={user} alt="solana" width={48} height={48} />
                    </Tooltip>
                  </div>

                  <div className="lender-amount">
                    <div className="value">
                      <Image src={solana} alt="solana" width={20} height={20} />
                      <span>
                        {lender.amount.toLocaleString('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 2 }).replace('$', '')}
                      </span>
                    </div>
                  </div>

                  <div className="lender-interest">
                    <div className="value">
                      <Image src={solana} alt="solana" width={20} height={20} />
                      <span>
                        {lender.interest.toLocaleString('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 2 }).replace('$', '')}
                      </span>
                    </div>
                  </div>

                  <div className="lender-duration">
                    <span className="value"> {lender.time}D</span>
                  </div>

                  <div className="lender-accept">
                    <button onClick={handlePromise}>
                      Accept
                    </button>
                  </div>

                </div>
              ))}

            </div>

            <div className='see-more' style={{ marginTop: '16px' }} onClick={() => location.reload()}>
                <Image src={expand} alt='expand' width={16} height={16} />
                <span>See more</span>
            </div>

          </div>

        </div>

      </div>

    </div>

  );

}
