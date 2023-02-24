import { useParams } from 'react-router-dom';
import useNearRestaurangList from '../../Utils/useNearRestaurangList';

interface Params extends Record<string, string> {
  id: string;
}

function DetailRestaurantInfo(): JSX.Element {
  const params = useParams<Params>();
  const getNearRestaurangList = useNearRestaurangList(params.id);
  console.log(typeof params);
  console.log('params : ', params);
  console.log(getNearRestaurangList);
  return <div>DetailRestaurantInfo</div>;
}

export default DetailRestaurantInfo;
