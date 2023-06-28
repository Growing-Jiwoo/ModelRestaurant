import { useEffect, useState } from 'react';
import type { RankDataType } from '../@types/interface';
import useAxiosWithAuth from '../hook/useAxiosWithAuth';

export function useRankData() {
  const axiosInstance = useAxiosWithAuth();
  const [rankData, setRankData] = useState<RankDataType[]>([]);

  useEffect(() => {
    async function getRankData() {
      try {
        const url = `http://127.0.0.1:8000/rankData`;
        const response = await axiosInstance.get<RankDataType[]>(url);
        setRankData(response.data);
      } catch (error: unknown) {
        console.log(error);
        throw error;
      }
    }
    getRankData();
  }, []);

  return rankData;
}
