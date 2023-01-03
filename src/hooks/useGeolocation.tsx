import { useState, useEffect } from 'react';
import axios from 'axios';
import { useLocation } from 'react-router-dom';

interface locationType {
  loaded: boolean;
  coordinates?: {
    lat: number;
    lng: number;
    road_address: string;
    address: string;
  };
  error?: { code: number; message: string };
}

async function mapAPI(latitude: unknown, longitude: unknown) {
  const [userlocation, setUserLocation] = useState<string | any>('123');

  try {
    const response = await axios
      .get(
        `https://dapi.kakao.com/v2/local/geo/coord2address.json?input_coord=WGS84&x=${latitude}&y=${longitude}`,
        {
          headers: {
            Authorization: 'KakaoAK 488de47883695ba1806e3203af90422a',
          },
        }
      )
      .then((response: { data: { documents: unknown[] } }) => {
        const location: any = response.data.documents[0];
        const userAddress: string =
          location.address.region_1depth_name +
          ' ' +
          location.address.region_2depth_name;
        console.log(location);
        // const userRoadAddress: string
        // const si = location.address.region_1depth_name;
        // const gu = location.address.region_2depth_name;
        // const dong = location.address.region_3depth_name;

        setUserLocation(userAddress);
      });
  } catch (error: any) {
    console.log(error.message);
  }
}

const useGeolocation = () => {
  const [userlocation, setUserLocation] = useState<string | any>('');
  const [location, setLocation] = useState<locationType>({
    loaded: false,
    coordinates: { lat: 0, lng: 0, road_address: '', address: '' },
  });
  const response = axios
    .get(
      `https://dapi.kakao.com/v2/local/geo/coord2address.json?input_coord=WGS84&x=129.1231357&y=35.1678779`,
      {
        headers: {
          Authorization: 'KakaoAK 488de47883695ba1806e3203af90422a',
        },
      }
    )
    .then((response: { data: { documents: unknown[] } }) => {
      const userLocationInfo: any = response.data.documents[0];
      const si = userLocationInfo.address.region_1depth_name;
      const gu = userLocationInfo.address.region_2depth_name;
      //   const dong = location.address.region_3depth_name;
      setUserLocation(`${si} ${gu}`);
      console.log(userLocationInfo);
    })
    .then(() => {
      console.log(location);
    });
  // 두 번째 .then에서 setLocation을 통해 정보들을 변경할 수 있도록 하고 성공 실패 로직 수정 필요

  // 성공에 대한 로직
  const onSuccess = (location: {
    coords: { latitude: number; longitude: number };
  }) => {
    setLocation({
      loaded: true,
      coordinates: {
        lat: location.coords.latitude,
        lng: location.coords.longitude,
        road_address: 'hi',
        address: 'bye',
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

  //   mapAPI(location.coordinates?.lng, location.coordinates?.lat);
  return location;
};

export default useGeolocation;
