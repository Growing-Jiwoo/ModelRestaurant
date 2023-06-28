import { useParams } from 'react-router-dom';
import useNearRestaurangList from '../hook/useNearRestaurangList';
import { useEffect } from 'react';
import LodingUi from '../components/commons/Loding';
import { recentRestaurant } from '../util/recentRestaurant';
import { SelectRestaurantlocation } from '../components/detailInfomation/SelectRestaurantlocation';
import { DetailRestaurantInfo } from '../components/detailInfomation/DetailRestaurantInfo';

interface Params extends Record<string, string> {
  id: string;
}

function DetailInfo(): JSX.Element {
  const recentRestaurantView = recentRestaurant();
  const params = useParams<Params>();
  const nearRestaurant: any = useNearRestaurangList(params.id);

  useEffect(() => {
    if (nearRestaurant.length !== 0) {
      recentRestaurantView(nearRestaurant);
    }
  }, [nearRestaurant]);

  if (nearRestaurant.length !== 0) {
    const restaurantInfo = Array.isArray(nearRestaurant)
      ? nearRestaurant[0]
      : nearRestaurant;
    const restaurantLocation = {
      lat: restaurantInfo.lat,
      lon: restaurantInfo.lon,
    };

    return (
      <div>
        <DetailRestaurantInfo
          imgNum={params.id}
          restaurantInfo={restaurantInfo}
        />
        <SelectRestaurantlocation location={restaurantLocation} />
      </div>
    );
  } else {
    return (
      <div>
        <LodingUi></LodingUi>
      </div>
    );
  }
}
export default DetailInfo;
