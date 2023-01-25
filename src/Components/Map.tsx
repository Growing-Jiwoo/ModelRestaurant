import { useEffect, useRef, useState } from 'react';
import useNearRestaurangList from '../utils/useNearRestaurangList';

interface RestaurantType {
  addrjibun: string;
  addrroad: string;
  bsnscond: string;
  bsnsnm: never;
  gugun: string;
  id: number;
  lat: any;
  lon: any;
  menu: string;
  tel: string;
}

function Map() {
  const getNearRestaurangList: any = useNearRestaurangList();
  const [myLocation, setMyLocation] = useState<
    { latitude: number; longitude: number } | string
  >('');
  const { naver } = window;
  const markers: naver.maps.Marker[] = [];
  const infowindows: naver.maps.InfoWindow[] = [];
  const contentTags =
    '<div class="naver-container"><p class="ptag">여깁니다</p><span class="spantag">맞아요</span></div>';

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        setMyLocation({
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
        });
      });
      console.log(`현재 위치 GET 완료`);
    } else {
      window.alert('현재 위치를 알수 없습니다.');
    }
  }, []);

  useEffect(() => {
    if (typeof myLocation !== 'string' && getNearRestaurangList) {
      const currentPosition = [myLocation.latitude, myLocation.longitude];
      const map = new naver.maps.Map('map', {
        center: new naver.maps.LatLng(currentPosition[0], currentPosition[1]),
        zoom: 17,
      });

      getNearRestaurangList.map((value: RestaurantType, index: number) => {
        const currentMarker = new naver.maps.Marker({
          position: new naver.maps.LatLng(value.lat, value.lon),
          map,
        });
        const infowindow = new naver.maps.InfoWindow({
          content: contentTags,
          borderWidth: 1,
          anchorSize: new naver.maps.Size(10, 10),
          pixelOffset: new naver.maps.Point(10, -10),
        });

        markers.push(currentMarker);
        infowindows.push(infowindow);
      });

      const getClickHandler = (seq: number) => {
        return () => {
          const marker = markers[seq];
          const infoWindow = infowindows[seq];

          if (infoWindow.getMap()) {
            infoWindow.close();
          } else {
            infoWindow.open(map, marker);
          }
        };
      };

      for (let i = 0; i < markers.length; i += 1) {
        naver.maps.Event.addListener(markers[i], 'click', getClickHandler(i));
      }
    }
  }, [myLocation, getNearRestaurangList]);
  // useEffect(() => {
  //   if (getNearRestaurangList) {
  //     getNearRestaurangList.map((value: RestaurantType, index: number) => {
  //       console.log(value.lat, value.lon);
  //     });
  //   }
  // }, [getNearRestaurangList]);
  // const mapElement = useRef(null);
  // const getNearRestaurangList: any = useNearRestaurangList();

  // useEffect(() => {
  //   const { naver } = window;
  //   if (!mapElement.current || !naver) return;
  //   // 지도에 표시할 위치의 위도와 경도 좌표를 파라미터로 넣어줍니다.
  //   const location = new naver.maps.LatLng(37.5656, 126.9769);
  // const mapOptions: naver.maps.MapOptions = {
  //   center: location,
  //   zoom: 17,
  //   zoomControl: true,
  //   zoomControlOptions: {
  //     position: naver.maps.Position.TOP_RIGHT,
  //   },
  // };
  //   const map = new naver.maps.Map(mapElement.current, mapOptions);
  //   new naver.maps.Marker({
  //     position: location,
  //     map,
  //   });

  //   if (getNearRestaurangList) {
  //     getNearRestaurangList.map((value: RestaurantType, index: number) => {
  //       console.log(value);
  //     });
  //   }
  // }, [getNearRestaurangList]);

  // return <div ref={mapElement} style={{ minHeight: '873px' }} />;
  return <div id="map" style={{ width: '100%', height: '873px' }} />;
}

export default Map;
