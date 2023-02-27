import { useParams } from 'react-router-dom';
import useNearRestaurangList from '../../Utils/useNearRestaurangList';
import ListGroup from 'react-bootstrap/ListGroup';
import { ImgStyle, RestaurantInfoStyle } from './styled';
import type { RestaurantType } from '../../Type/interface';

interface Params extends Record<string, string> {
  id: string;
}

interface DetailRestaurantProps {
  imgNum: string | undefined;
  restaurantInfo: RestaurantType;
}

function DetailRestaurant(props: DetailRestaurantProps): JSX.Element {
  const { imgNum, restaurantInfo } = props;
  return (
    <div>
      <ImgStyle>
        <div id="restaurantContainer">
          <img
            id="restaurantImg"
            src={process.env.PUBLIC_URL + `/img/img_${imgNum}.jpg`}
          />
        </div>
      </ImgStyle>

      <RestaurantInfoStyle>
        <div>
          <ListGroup className="listContainer">
            <ListGroup.Item id="listHeader" className="listItem">
              {restaurantInfo.bsnsnm}
            </ListGroup.Item>
            <ListGroup.Item className="listItem">
              Address: {restaurantInfo.addrjibun} {restaurantInfo.addrroad}
            </ListGroup.Item>
            <ListGroup.Item className="listItem">
              Menu: {restaurantInfo.menu}
            </ListGroup.Item>
            <ListGroup.Item className="listItem">
              Tel: {restaurantInfo.tel}
            </ListGroup.Item>
          </ListGroup>
        </div>
      </RestaurantInfoStyle>
    </div>
  );
}

function DetailRestaurantInfo() {
  const params = useParams<Params>();
  const nearRestaurant = useNearRestaurangList(params.id);
  console.log('params : ', params);

  if (nearRestaurant.length !== 0) {
    console.log(nearRestaurant);
    const restaurantInfo = Array.isArray(nearRestaurant)
      ? nearRestaurant[0]
      : nearRestaurant;
    return (
      <DetailRestaurant imgNum={params.id} restaurantInfo={restaurantInfo} />
    );
  } else {
    console.log('데이터 없음');
    return <div>Loading...</div>;
  }
}
export default DetailRestaurantInfo;
