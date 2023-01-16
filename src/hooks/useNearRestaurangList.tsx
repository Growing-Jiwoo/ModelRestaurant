import { useEffect, useRef, useState } from 'react';
import { useAsync } from 'react-async';
import axios from 'axios';

type Information = { name: string; description: string };

function useNearRestaurangList() {
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
