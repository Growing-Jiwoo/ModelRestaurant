import Select from 'react-select';
import useNearRestaurangList from '../utils/useNearRestaurangList';

function RestaurantList() {
  const getNearRestaurangList: any = useNearRestaurangList(); // 음식점 전체 리스트
  const options = [
    { value: 'ar', label: 'arabic' },
    { value: 'en', label: 'english' },
    { value: 'fr', label: 'french' },
  ];

  return (
    <>
      <Select
        name="name"
        className="basic-single"
        classNamePrefix="select"
        isDisabled={false}
        isClearable={true}
        isRtl={true}
        isSearchable={true}
        defaultValue={options[0]} // default option
        options={options} // options
      />
    </>
  );
}

export default RestaurantList;
