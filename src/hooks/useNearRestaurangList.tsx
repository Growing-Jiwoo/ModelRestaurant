import { useEffect, useRef, useState } from 'react';
import axios from 'axios';

async function ready() {
  return new Promise(function (resolve) {
    const restaurantList: any = useRef([]);
    const response = axios
      .get(`http://127.0.0.1:8000/Restaurant/`)
      .then(async (response: any) => {
        restaurantList.current.push(response.data);
        resolve(response);
      });
  });
}

interface locationType {
  coordinates?: {
    NearRestaurangList: any;
  };
}

const useNearRestaurangList = () => {
  const [location, setLocation] = useState<locationType>({
    coordinates: { NearRestaurangList: [] },
  });

  const onSuccess = async () => {
    const NearRestaurangList = await ready();
    console.log(NearRestaurangList);
    setLocation({
      coordinates: {
        NearRestaurangList: NearRestaurangList,
      },
    });
  };

  useEffect(() => {
    onSuccess();
  }, []);

  return location;
};
export default useNearRestaurangList;
