import RestaurantChart from '../components/chart/RestaurantChart';
import { RankTable } from '../components/chart/RestaurantRankTable';
import LodingUi from '../components/commons/Loding';
import { useRankData } from '../hook/useRankData';

function RestaurantRankChart() {
  const rankData = useRankData();
  console.log(rankData);
  if (rankData.length !== 0) {
    return (
      <>
        <RestaurantChart props={rankData} />
        <RankTable data={rankData} />
      </>
    );
  } else {
    console.log('데이터 없음');
    return (
      <div>
        <LodingUi />
      </div>
    );
  }
}

export default RestaurantRankChart;
