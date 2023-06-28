import { useEffect, useState } from 'react';
import useAxiosWithAuth from './useAxiosWithAuth';
import type { RestaurantListType } from '../@types/interface';

function useNearRestaurangList(
  id: string | null | undefined
): RestaurantListType {
  const [data, setData] = useState<RestaurantListType>([]);

  const axiosInstance = useAxiosWithAuth();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const url = id
          ? `http://127.0.0.1:8000/Restaurant/${id}/`
          : 'http://127.0.0.1:8000/Restaurant/';
        const response = await axiosInstance.get<RestaurantListType>(url);
        setData(response.data);
      } catch (error) {
        console.error(error);
      }
    };
    fetchData();
  }, [id]);

  return data;
}

export default useNearRestaurangList;
