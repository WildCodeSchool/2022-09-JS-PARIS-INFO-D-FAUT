import { useEffect, useContext } from "react";
import { GeolocationContext } from "../../context/index";

export function Geolocalisation() {
  const { setGeolocation } = useContext(GeolocationContext);

  useEffect(() => {
    navigator.geolocation.getCurrentPosition((position) => {
      setGeolocation(position.coords);
    });
  }, [setGeolocation]);
}
