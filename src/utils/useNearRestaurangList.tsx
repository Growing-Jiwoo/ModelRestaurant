import { useEffect, useState } from 'react';
import axios from 'axios';
import type { RestaurantType } from '../Type/interface';

export type RestaurantListType = RestaurantType[];

function useNearRestaurangList(): RestaurantListType {
  const [data, setData] = useState<RestaurantListType>([]);

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
