// // Path: puchinoscapital/src/app/nfts/listings/[id].tsx
// 'use client'
// import React, { useEffect, useState } from "react";
// import '../../../../styles/[id].css';
// import Image from "next/image";
// import { toast } from "react-toastify";

// import sol from '../../../../public/solana.webp';
// import user from '../../../../public/user.svg';

// function ListingDetails({ params }: any) {
//     const [publicKey, setPublicKey] = useState<string>("");
//     const [listingData, setListingData] = useState<any>(null);
//     const [activeFilter, setActiveFilter] = useState<string>("");
//     const [sortDirection, setSortDirection] = useState<string>("asc");

//     if (!listingData) {
//         return (
//             <div className="collection-details-container">
//                 <div className="collection-details">
//                     <h1>Loading...</h1>
//                 </div>
//             </div>
//         )
//     }

//     const handleFilter = (filter: string) => {
//         if (activeFilter === filter) {
//             setSortDirection(sortDirection === "asc" ? "desc" : "asc");
//         } else {
//             setActiveFilter(filter);
//             setSortDirection("asc");
//         }
//     };

//     const sortLenders = (lenders: any[]) => {
//         const sortedLenders = [...lenders];
//         switch (activeFilter) {
//             case "amount":
//                 sortedLenders.sort((a, b) => (sortDirection === "asc" ? a.amount - b.amount : b.amount - a.amount));
//                 break;
//             case "interest":
//                 sortedLenders.sort((a, b) => (sortDirection === "asc" ? a.interest - b.interest : b.interest - a.interest));
//                 break;
//             case "duration":
//                 sortedLenders.sort((a, b) => (sortDirection === "asc" ? a.time - b.time : b.time - a.time));
//                 break;
//             default:
//                 break;
//         }
//         return sortedLenders;
//     };

//     const filteredLenders = sortLenders(listingData.lenders);

//     const acceptLoan = async (loanId: string, userId: string, listingCollection: string) => {
//         try {
//             console.log("Accepting loan...");
//             const response = await fetch('/api/acceptLoan', {
//                 method: 'POST',
//                 headers: {
//                     'Content-Type': 'application/json',
//                 },
//                 body: JSON.stringify({ loanId, userId, listingCollection }),
//             });
//             console.log("loanId:", loanId);
//             console.log("userId:", userId);
//             console.log("listingCollection:", listingCollection);
//             if (!response.ok) {
//                 throw new Error('Error accepting loan');
//             } else {
//                 console.log('Loan accepted');
//             }
//             const data = await response.json();
//             console.log("Loan accepted:", data);
//         } catch (error) {
//             console.error("Error accepting loan:", error);
//         }
//     };

//     const createListing = async () => {
//         toast.promise(
//             async () => {
//                 try {
//                     console.log("Creating listing...");
//                     const response = await fetch('/api/createListing', {
//                         method: 'POST',
//                         headers: {
//                             'Content-Type': 'application/json',
//                         },
//                         body: JSON.stringify({ listingData }),
//                     });
//                     if (!response.ok) {
//                         throw new Error('Error creating listing');
//                     } else {
//                         console.log('Listing created');
//                     }
//                     const data = await response.json();
//                     console.log("Listing created:", data);
//                 } catch (error) {
//                     console.error("Error creating listing:", error);
//                 }
//             },
//             {
//                 pending: 'Creating listing...',
//                 success: 'Listing created!',
//                 error: 'Error creating listing',
//             }
//         );
//     };

//     return (
//         <div className="collection-details-container">

//             <div className="collection-details">

//                 <div className="collection-id">

//                     <div className="left-side">
//                         <Image src={listingData.image} alt="Collection Image" width={108} height={108} style={{ borderRadius: '2px' }} />
//                     </div>

//                     <div className="right-side">

//                         <div className="collection-name">
//                             <h1>{listingData.name}</h1>
//                             <span><strong>{listingData.available}</strong> available</span>
//                         </div>

//                         <div className="collection-details">

//                             <div className="collection-details-item">
//                                 <span className="title">Liquidity:</span>
//                                 <Image src={sol} alt="Solana" />
//                                 <span className="value">{listingData.liquidity.toLocaleString("en-US", { style: "currency", currency: "USD" }).replace(/[$]/g, "")}</span>
//                             </div>

//                             <div className="collection-details-item">
//                                 <span className="title">Interest:</span>
//                                 <Image src={sol} alt="Solana" />
//                                 <span className="value">{listingData.interest}%</span>
//                             </div>

//                         </div>

//                     </div>

//                 </div>

//                 <div className="collection-volume">

//                     <h1>TOTAL VOLUME</h1>

//                     <div className="collection-volume-item">
//                         <Image src={sol} alt="Solana" />
//                         <span className="value">
//                             {listingData.volume.toLocaleString("en-US", { style: "currency", currency: "USD" }).replace(/[$]/g, "")}
//                         </span>
//                     </div>

//                     <span className="usd-conversion">{(listingData.volume * 20.19).toLocaleString("en-US", { style: "currency", currency: "USD" })}</span>

//                 </div>

//                 <div className="collection-data">

//                     <div className="collection-data-item">
//                         <span className="title">Given</span>
//                         <span className="value">{listingData.loansGiven}</span>
//                     </div>

//                     <div className="collection-data-item">
//                         <span className="title">Repaid</span>
//                         <span className="value">{listingData.loansRepaid}</span>
//                     </div>

//                     <div className="collection-data-item">
//                         <span className="title">Defaulted</span>
//                         <span className="value">{listingData.loansDefaulted}</span>
//                     </div>

//                 </div>

//             </div>

//             <div className="collection-lenders">

//                 <div className="table">

//                     <div className="table-pool" >
//                         <span className="title">POOL</span>
//                     </div>

//                     <div className="table-amount" onClick={() => handleFilter("amount")}>
//                         <span className="title">AMOUNT</span>
//                         {activeFilter === "amount" && <span className="table-arrow">{sortDirection === "asc" ? "▼" : "▲"}</span>}
//                     </div>

//                     <div className="table-interest" onClick={() => handleFilter("interest")}>
//                         <span className="title">INTEREST</span>
//                         {activeFilter === "interest" && <span className="table-arrow">{sortDirection === "asc" ? "▼" : "▲"}</span>}
//                     </div>

//                     <div className="table-duration" onClick={() => handleFilter("duration")}>
//                         <span className="title">DURATION</span>
//                         {activeFilter === "duration" && <span className="table-arrow">{sortDirection === "asc" ? "▼" : "▲"}</span>}
//                     </div>

//                     <div className="table-accept">
//                         <span className="title">ACTION</span>
//                     </div>

//                 </div>

//                 <div className="table-separator"></div>

//                 <button className="create-listing-button" onClick={createListing}>Create Listing</button>

//                 {filteredLenders.map((lender: any) => (
//                     <div className={`collection-lender ${lender.available ? 'available' : 'unavailable'}`} key={lender.from}>

//                         <div className="collection-lender-item">
//                             <Image src={lender.image ? lender.image : user} alt="user" />
//                             <span className="title">{lender.from}</span>
//                         </div>

//                         <div className="collection-lender-item">
//                             <div className="collection-lender-item-value">
//                                 <Image src={sol} alt="Solana" />
//                                 <span className="value">{lender.amount} SOL</span>
//                             </div>
//                             <p className="usd-conversion">{(lender.amount * 20.19).toLocaleString("en-US", { style: "currency", currency: "USD" })} USD</p>
//                         </div>

//                         <div className="collection-lender-item">

//                             <div className="collection-lender-item-value">
//                                 <Image src={sol} alt="Solana" />
//                                 <span className="value">{lender.interest} SOL</span>
//                             </div>

//                             <p className="usd-conversion">{(20.19 * lender.interest).toLocaleString("en-US", { style: "currency", currency: "USD" })} USD</p>

//                         </div>

//                         <div className="collection-lender-item">
//                             <span className="value">{lender.time} Days</span>
//                         </div>

//                         <div className="collection-lender-item">
//                             <button
//                                 className="accept"
//                                 onClick={() => acceptLoan(lender.from, publicKey?.toString(), listingData.name)}
//                                 disabled={!lender.available}
//                             >
//                                 Accept
//                             </button>
//                         </div>

//                     </div>
//                 ))}
//             </div>

//         </div>
//     );
// }

// export default ListingDetails;




'use client'
import React from "react";

export default function ListingModal({ params }) {
    const { id } = params;
    return (
        <div>
            <h1>Listing {id}</h1>
        </div>
    )
}