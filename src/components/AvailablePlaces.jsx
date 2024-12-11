import { useEffect, useState } from "react";
import Places from "./Places.jsx";

export default function AvailablePlaces({ onSelectPlace }) {
  const [isFetchingData, setIsFetchingData] = useState(false);
  const [availablePlaces, setAvailablePlaces] = useState([]);

  useEffect(() => {
    async function fetchPlaces() {
      setIsFetchingData(true);
      const response = await fetch("http://localhost:3000/places");
      const responseData = await response.json();
      setAvailablePlaces(responseData.places);
      setIsFetchingData(false);
    }
    fetchPlaces();
  }, []);

  return (
    <Places
      title="Available Places"
      places={availablePlaces}
      isLoading={isFetchingData}
      isLoadingText={"Fetching places..."}
      fallbackText="No places available."
      onSelectPlace={onSelectPlace}
    />
  );
}
