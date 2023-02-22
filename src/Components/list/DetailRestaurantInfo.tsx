import React from 'react';
import { useParams } from 'react-router-dom';

function DetailRestaurantInfo(): JSX.Element {
  const params = useParams();
  console.log('params : ', params);
  return <div>DetailRestaurantInfo</div>;
}

export default DetailRestaurantInfo;
