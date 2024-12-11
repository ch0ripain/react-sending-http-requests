import { useEffect, useState } from "react";
import Places from "./Places.jsx";
import ErrorPage from "./ErrorPage.jsx";
import { sortPlacesByDistance } from "../loc.js";

export default function AvailablePlaces({ onSelectPlace }) {
  const [isFetchingData, setIsFetchingData] = useState(false);
  const [availablePlaces, setAvailablePlaces] = useState([]);
  const [error, setError] = useState();

  useEffect(() => {
    async function fetchPlaces() {
      try {
        setIsFetchingData(true);
        const response = await fetch("http://localhost:3000/places");
        const responseData = await response.json();
        if (!response.ok) {
          throw new Error("Fetching data error :(");
        }
        navigator.geolocation.getCurrentPosition((position) => {
          const sortedPlaces = sortPlacesByDistance(
            responseData.places,
            position.coords.latitude,
            position.coords.longitude
          );
          setAvailablePlaces(sortedPlaces);
          setIsFetchingData(false);
        });
      } catch (error) {
        setError({
          message:
            Error.message ||
            "Could not fetch the places data, please try again later",
        });
        setIsFetchingData(false);
      }
    }
    fetchPlaces();
  }, []);

  if (error) {
    return (
      <ErrorPage title={"Fetching places went wrong"} message={error.message} />
    );
  }

  return (
    <Places
      title="Available Places"
      places={availablePlaces}
      isLoading={isFetchingData}
      isLoadingText={"Fetching places data, please wait..."}
      fallbackText="No places available."
      onSelectPlace={onSelectPlace}
    />
  );
}
