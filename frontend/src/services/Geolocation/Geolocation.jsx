import { useEffect, useContext } from "react";
import { GeolocationContext } from "../../context/index";

export function Geolocation() {
  const { setGeolocation } = useContext(GeolocationContext);

  useEffect(() => {
    navigator.geolocation.getCurrentPosition((position) => {
      setGeolocation(position.coords);
    });
  }, [setGeolocation]);
}
