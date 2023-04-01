import { ResponsivePie } from '@nivo/pie';
import { useEffect, useState } from 'react';
import useAxiosWithAuth from '../../Hooks/useAxiosWithAuth';
import LodingUi from '../commons/LodingUi';

function useRankData() {
  const axiosInstance = useAxiosWithAuth();
  const [rankData, setRankData] = useState<RankDataType[]>([]);

  interface RankDataType {
    id: number;
    bsnsnm: string;
    viewcnt: number;
  }

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

function RestaurantChart() {
  const rankData = useRankData();
  const modifiedA = rankData.map(({ bsnsnm, viewcnt }) => ({
    id: bsnsnm,
    value: viewcnt,
  }));

  const handle = {
    padClick: (data: any) => {
      console.log(data);
    },

    legendClick: (data: any) => {
      console.log(data);
    },
  };
  if (rankData.length !== 0) {
    return (
      <div style={{ width: '800px', height: '500px', margin: '0 auto' }}>
        <ResponsivePie
          data={modifiedA}
          margin={{ top: 40, right: 80, bottom: 80, left: 80 }}
          innerRadius={0.5}
          padAngle={1.8}
          cornerRadius={8}
          colors={['olive', 'brown', 'orange']}
          borderWidth={0}
          enableArcLinkLabels={false}
          arcLinkLabelsSkipAngle={0}
          arcLinkLabelsTextColor="#000000"
          arcLinkLabelsThickness={2}
          arcLinkLabelsColor={{ from: 'color' }}
          arcLabel="id"
          arcLabelsTextColor="#ffffff"
          arcLabelsSkipAngle={10}
          onClick={handle.padClick}
          legends={[]}
        />
      </div>
    );
  } else {
    console.log('데이터 없음');
    return (
      <div>
        <LodingUi></LodingUi>
      </div>
    );
  }
}

export default RestaurantChart;
