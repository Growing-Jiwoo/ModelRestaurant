import { useEffect } from 'react';
import Select from 'react-select';
import useNearRestaurangList from '../utils/useNearRestaurangList';

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

interface MenuListType {
  value: string | any;
  label: string | any;
}

function RestaurantList() {
  const menuSetList = new Set();
  const getNearRestaurangList: any = useNearRestaurangList(); // 음식점 전체 리스트
  const menuArray: { value: string; label: string }[] = [];

  useEffect(() => {
    if (getNearRestaurangList) {
      getNearRestaurangList.map((value: RestaurantType) => {
        menuSetList.add(value.bsnscond);
      });
    }
    if (menuSetList.size !== 0) {
      const menuList = Array.from(menuSetList);
      menuList.map((value: any) => {
        console.log(typeof value);
        menuArray.push({ value: value, label: value });
      });
    }
  }, [getNearRestaurangList]);

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
        defaultValue={menuArray[0]} // default option
        options={menuArray} // options
      />
    </>
  );
}

export default RestaurantList;
