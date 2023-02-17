import { useState, useEffect } from 'react';
import axios from 'axios';

interface Coordinates {
  lat: number;
  lng: number;
  address: string;
}

interface Location {
  loaded: boolean;
  coordinates?: Coordinates;
  error?: {
    code: number;
    message: string;
  };
}

interface ResponseData {
  documents: {
    address: {
      region_1depth_name: string;
      region_2depth_name: string;
    };
  }[];
}

const mapAPI = async (latitude: number, longitude: number) => {
  try {
    const response = await axios.get<ResponseData>(
      `https://dapi.kakao.com/v2/local/geo/coord2address.json?input_coord=WGS84&x=${latitude}&y=${longitude}`,
      {
        headers: {
          Authorization: 'KakaoAK 488de47883695ba1806e3203af90422a',
        },
      }
    );
    const location = response.data.documents[0];
    const { region_1depth_name: si, region_2depth_name: gu } = location.address;
    return `${si} ${gu}`;
  } catch (error: any) {
    console.log(error.message);
    return '';
  }
};

const useGeolocation = (): Location => {
  const [location, setLocation] = useState<Location>({
    loaded: false,
    coordinates: {
      lat: 0,
      lng: 0,
      address: 'Suyeong-gu, Busan',
    },
  });

  useEffect(() => {
    const onSuccess = async (position: GeolocationPosition) => {
      const { latitude, longitude } = position.coords;
      // const address = await mapAPI(latitude, longitude);
      const address = await mapAPI(129.1284061294, 35.1740102455);
      setLocation({
        loaded: true,
        coordinates: {
          lat: latitude,
          lng: longitude,
          address,
        },
      });
    };

    const onError = (error: GeolocationPositionError) => {
      setLocation({
        loaded: true,
        error: {
          code: error.code,
          message: error.message,
        },
      });
    };

    if (!navigator.geolocation) {
      onError({
        code: 0,
        message: 'Geolocation not supported',
        PERMISSION_DENIED: 0,
        POSITION_UNAVAILABLE: 0,
        TIMEOUT: 0,
      });
    } else {
      navigator.geolocation.getCurrentPosition(onSuccess, onError);
    }
  }, []);

  return location;
};

export default useGeolocation;
