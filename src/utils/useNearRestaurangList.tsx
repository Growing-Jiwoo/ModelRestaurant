import { useEffect, useState } from 'react';
import axios from 'axios';

interface RestaurantType {
  addrjibun: string;
  addrroad: string;
  bsnscond: string;
  bsnsnm: string;
  gugun: string;
  id: number;
  lat: string | number;
  lon: string | number;
  menu: string;
  tel: string;
}

export type RestaurantList = RestaurantType[];

function useNearRestaurangList(): RestaurantList {
  const [data, setData] = useState<RestaurantList>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get<RestaurantType[]>(
          'http://127.0.0.1:8000/Restaurant/'
        );
        setData(response.data);
      } catch (error) {
        console.error(error);
      }
    };
    fetchData();
  }, []);

  return data;
}

export default useNearRestaurangList;
