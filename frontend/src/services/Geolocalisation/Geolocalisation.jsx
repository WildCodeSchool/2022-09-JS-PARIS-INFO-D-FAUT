import { useEffect, useContext } from "react";
import { LatitudeContext } from "../../context/LatitudeContext";
import { LongitudeContext } from "../../context/LongitudeContext";

export function Geolocalisation() {
  const { setLatitude } = useContext(LatitudeContext);
  const { setLongitude } = useContext(LongitudeContext);

  useEffect(() => {
    navigator.geolocation.getCurrentPosition((position) => {
      setLatitude(position.coords.latitude);
      setLongitude(position.coords.longitude);
    });
  }, [setLatitude, setLongitude]);
}
