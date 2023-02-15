import { useEffect, useRef, useState } from 'react';
import { useAsync } from 'react-async';
import axios from 'axios';

interface RestaurantType {
  addrjibun: string;
  addrroad: string;
  bsnscond: string;
  bsnsnm: never;
  gugun: string;
  id: number;
  lat: string | number;
  lon: string | number;
  menu: string;
  tel: string;
}

type Information = {
  map(arg0: (value: RestaurantType) => void): void;
};

function useNearRestaurangList(): Information | undefined | null {
  const [nearRestaurangList, SetNearRestaurangList] =
    useState<Information | null>();
  useEffect(() => {
    (async () => {
      const posts = await axios.get('http://127.0.0.1:8000/Restaurant/');
      SetNearRestaurangList(posts.data);
    })();
  }, []);
  return nearRestaurangList;
}

export default useNearRestaurangList;
