import { useParams } from 'react-router-dom';
import useNearRestaurangList from '../../Utils/useNearRestaurangList';
import { ListGroup } from 'react-bootstrap';
import { ImgStyle, RestaurantInfoStyle, RestaurantMapStyle } from './styled';
import type { RestaurantType } from '../../Type/interface';
import { useEffect } from 'react';
import LodingUi from '../commons/LodingUi';

interface Params extends Record<string, string> {
  id: string;
}

interface DetailRestaurantProps {
  imgNum: string | undefined;
  restaurantInfo: RestaurantType;
}

interface RestaurantMapProps {
  location: {
    lat: string | number;
    lon: string | number;
  };
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

const { naver } = window;
function RestaurantMap(props: RestaurantMapProps): JSX.Element {
  const { lat, lon } = props.location;
  useEffect(() => {
    const map = new naver.maps.Map('map', {
      center: new naver.maps.LatLng(Number(lat), Number(lon)),
      zoom: 17,
      zoomControl: true,
      minZoom: 14,
      zoomControlOptions: {
        position: naver.maps.Position.RIGHT_BOTTOM,
      },
    });

    const markerOptions = {
      position: new naver.maps.LatLng(Number(lat), Number(lon)),
      map: map,
    };

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const marker = new naver.maps.Marker(markerOptions);

    console.log('loading navermap');
  }, []);

  return (
    <div>
      <RestaurantMapStyle>
        <div id="map"></div>
      </RestaurantMapStyle>
    </div>
  );
}

function DetailRestaurantInfo(): JSX.Element {
  const params = useParams<Params>();
  const nearRestaurant = useNearRestaurangList(params.id);
  console.log('params : ', params);

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
        <DetailRestaurant imgNum={params.id} restaurantInfo={restaurantInfo} />
        <RestaurantMap location={restaurantLocation} />
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
export default DetailRestaurantInfo;
