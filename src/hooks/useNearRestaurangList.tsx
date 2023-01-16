import { useEffect, useRef, useState } from 'react';
import { useAsync } from 'react-async';
import axios from 'axios';

type NearRestaurangListType = {
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
};

function useNearRestaurangList() {
  const [nearRestaurangList, SetNearRestaurangList] =
    useState<NearRestaurangListType>();
  useEffect(() => {
    (async () => {
      const posts = await axios.get('http://127.0.0.1:8000/Restaurant/');
      SetNearRestaurangList(posts.data);
    })();
  }, []);
  return nearRestaurangList;
}

export default useNearRestaurangList;
