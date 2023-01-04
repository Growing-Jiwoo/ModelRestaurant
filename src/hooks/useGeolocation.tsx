import { useState, useEffect } from 'react';
import axios from 'axios';

interface locationType {
  loaded: boolean;
  coordinates?: {
    lat: number;
    lng: number;
    address: string | unknown;
  };
  error?: { code: number; message: string };
}

async function mapAPI(latitude: unknown, longitude: unknown) {
  try {
    return new Promise(function (resolve) {
      const response = axios
        .get(
          `https://dapi.kakao.com/v2/local/geo/coord2address.json?input_coord=WGS84&x=${latitude}&y=${longitude}`,
          {
            headers: {
              Authorization: 'KakaoAK 488de47883695ba1806e3203af90422a',
            },
          }
        )
        .then(async (response: { data: { documents: unknown[] } }) => {
          const location: any = response.data.documents[0];
          const si = location.address.region_1depth_name;
          const gu = location.address.region_2depth_name;
          const userAddress = `${si} ${gu}`;
          resolve(userAddress);
        });
    });
  } catch (error: any) {
    console.log(error.message);
  }
}

const useGeolocation = () => {
  const [location, setLocation] = useState<locationType>({
    loaded: false,
    coordinates: { lat: 0, lng: 0, address: '' },
  });
  // 성공에 대한 로직
  const onSuccess = async (location: {
    coords: { latitude: number; longitude: number };
  }) => {
    const address = await mapAPI(129.1231357, 35.1678779);
    setLocation({
      loaded: true,
      coordinates: {
        lat: location.coords.latitude,
        lng: location.coords.longitude,
        address: address,
      },
    });
  };

  // 에러에 대한 로직
  const onError = (error: { code: number; message: string }) => {
    setLocation({
      loaded: true,
      error,
    });
  };

  useEffect(() => {
    // navigator 객체 안에 geolocation이 없다면
    // 위치 정보가 없는 것.
    if (!('geolocation' in navigator)) {
      onError({
        code: 0,
        message: 'Geolocation not supported',
      });
    }
    navigator.geolocation.getCurrentPosition(onSuccess, onError);
  }, []);

  return location;
};

export default useGeolocation;
