// Path: puchinoscapital/src/app/nfts/listings/[id].tsx
'use client'
import React, { useEffect, useState } from "react";

function ListingDetails({ params }: any) {
  const [listingData, setListingData] = useState<any>(null);

  useEffect(() => {
    // Función asincrónica para realizar la petición a la API
    async function fetchListingData() {
      try {
        const response = await fetch('/api/listingDetails', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            },
            body: JSON.stringify({ id: params.id }),
            })
            if (!response.ok) {
              throw new Error('Error fetching listing data');
            } else {
              console.log('Listing data fetched');
            }
        const data = await response.json();
        setListingData(data);
        console.log("Listing data fetched:", data.lenders);
      } catch (error) {
        console.error("Error fetching listing data:", error);
      }
    }

    fetchListingData();
  }, [params.id]);

  if (!listingData) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h1 style={{ color: "white" }}>Listing ID: {params.id}</h1>
      <p>Listing Title: {listingData.title}</p>
      {/* Resto del contenido de la página */}
    </div>
  );
}

export default ListingDetails;
