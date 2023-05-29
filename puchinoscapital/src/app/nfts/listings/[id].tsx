import React from "react";
import { useRouter } from "next/router";

const ListingDetailsPage = () => {
  const router = useRouter();
  const { id } = router.query;

  // Ejemplo de datos de listado
  const listing = {
    id: "y00ts",
    available: 289,
    liquidity: 240.12,
    apy: 240
    // Otros datos del listado...
  };

  return (
    <div className="listing-details-container">
      <h1>Listing Details: {id}</h1>

      {/* Mostrar los detalles del listado */}
      <div className="listing-details">
        <p>Listado: {listing.id}</p>
        <p>Disponible: {listing.available}</p>
        <p>Liquidez: {listing.liquidity}</p>
        <p>APY: {listing.apy}%</p>
        {/* Otros detalles del listado... */}
      </div>
    </div>
  );
};

export default ListingDetailsPage;

// Path: puchinoscapital\src\app\nfts\listings\[id].tsx