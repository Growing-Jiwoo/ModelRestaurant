import { useEffect, useState } from 'react';
import useNearRestaurangList from '../hook/useNearRestaurangList';
import type { RestaurantType } from '../@types/interface';
import { MapContainer } from '../components/map/styled';
import LodingUi from '../components/commons/Loding';

function Map() {
  const getNearRestaurangList = useNearRestaurangList(null);
  const [myLocation, setMyLocation] = useState<
    { latitude: number; longitude: number } | string
  >('');
  const naver = window.naver;
  const markers: naver.maps.Marker[] = [];
  const infowindows: naver.maps.InfoWindow[] = [];
  let currentMarker: naver.maps.Marker;
  const clickMarkerInfowindow: naver.maps.InfoWindow[] = [];

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        setMyLocation({
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
        });
      });
      console.log(`현재 위치 GET 완료1`);
    } else {
      window.alert('현재 위치를 알 수 없습니다.');
    }
  }, []);

  useEffect(() => {
    if (typeof myLocation !== 'string' && getNearRestaurangList) {
      const currentPosition = [myLocation.latitude, myLocation.longitude];

      const map = new naver.maps.Map('map', {
        center: new naver.maps.LatLng(currentPosition[0], currentPosition[1]),
        zoom: 17,
        zoomControl: true,
        minZoom: 14,
        zoomControlOptions: {
          position: naver.maps.Position.RIGHT_BOTTOM,
        },
      });

      getNearRestaurangList.map((value: RestaurantType) => {
        const contentTags = `'<div class="naver-container"><p class="ptag">${value.bsnsnm} 여깁니다</p><span class="spantag">맞아요</span></div>'`;
        currentMarker = new naver.maps.Marker({
          position: new naver.maps.LatLng(Number(value.lat), Number(value.lon)),
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

      naver.maps.Event.addListener(map, 'idle', () => {
        updateMarkers(map, markers);
      });

      const updateMarkers = (
        map: naver.maps.Map,
        markers: naver.maps.Marker[]
      ) => {
        const mapBounds: any = map.getBounds();

        markers.forEach((marker) => {
          const position = marker.getPosition();

          mapBounds.hasLatLng(position)
            ? showMarker(marker)
            : hideMarker(marker);
        });
      };

      const showMarker = (marker: naver.maps.Marker) => {
        marker.setMap(map);
      };

      const hideMarker = (marker: naver.maps.Marker) => {
        marker.setMap(null);
      };

      const getClickHandler = (seq: number) => {
        return () => {
          const marker = markers[seq];
          const infoWindow = infowindows[seq];
          naver.maps.Event.addListener(map, 'idle', () => {
            if (infoWindow.getMap()) {
              infoWindow.close();
            }
          });
          if (infoWindow.getMap()) {
            infoWindow.close();
          } else {
            infoWindow.open(map, marker);
            clickMarkerInfowindow.push(infoWindow);
          }
        };
      };

      for (let i = 0; i < markers.length; i += 1) {
        naver.maps.Event.addListener(markers[i], 'click', getClickHandler(i));
      }
    }
  }, [getNearRestaurangList]);

  if (getNearRestaurangList.length !== 0) {
    return <MapContainer id="map" />;
  } else {
    return (
      <div>
        <LodingUi></LodingUi>
      </div>
    );
  }
}

export default Map;
