import { useEffect, useRef, useState } from 'react';
import { useAsync } from 'react-async';
import axios from 'axios';

function useNearRestaurangList() {
  const [nearRestaurangList, SetNearRestaurangList]: any = useState();
  useEffect(() => {
    (async () => {
      const posts = await axios.get('http://127.0.0.1:8000/Restaurant/');
      SetNearRestaurangList(posts.data);
    })();
  }, []);

  return nearRestaurangList;
}

export default useNearRestaurangList;
