import { useNavigate } from 'react-router-dom';
import type { RestaurantType } from '../Type/interface';

export function useRecently(): (value: RestaurantType) => void {
  const navigate = useNavigate();

  function handleClick(value: RestaurantType) {
    const previousData = localStorage.getItem('cardData');
    const dataArray = previousData ? JSON.parse(previousData) : [];
    if (!dataArray.some((item: RestaurantType) => item.id === value.id)) {
      const newData = [...dataArray, value];
      localStorage.setItem('cardData', JSON.stringify(newData));
    }

    navigate(`/list/${value.id}`);
  }

  return handleClick;
}
