import { useNavigate } from 'react-router-dom';
import type { RestaurantType } from '../Type/interface';

export function useRecently() {
  const navigate = useNavigate();

  function handleClick(value: RestaurantType) {
    const previousData = localStorage.getItem('cardData');
    const dataArray = previousData ? JSON.parse(previousData) : [];

    const dataExists = dataArray.some(
      (item: RestaurantType) => item.id === value.id
    );
    if (!dataExists) {
      if (dataArray.length === 3) {
        dataArray.shift();
      }
      const newData = [...dataArray, value];
      localStorage.setItem('cardData', JSON.stringify(newData));
    }

    navigate(`/list/${value.id}`);
  }

  return handleClick;
}
