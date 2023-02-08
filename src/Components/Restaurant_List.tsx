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
  value: string;
  label: string;
}

function SelectBox(props: any): any {
  return (
    <>
      <Select
        name="name"
        className="basic-single"
        isDisabled={false}
        isClearable={true}
        isRtl={true}
        isSearchable={true}
        defaultValue={props.option[0]} // default option
        options={props.option} // options
      />
    </>
  );
}

function CreateSelectBoxOption(list: any, array: any) {
  list.map((value: string) => {
    array.push({ value: value, label: value });
  });
}

function RestaurantList() {
  const menuSetList = new Set();
  const locationSetList = new Set();

  const getNearRestaurangList: any = useNearRestaurangList(); // 음식점 전체 리스트
  const menuArray: { value: string; label: string }[] = [];
  const locationArray: { value: string; label: string }[] = [];

  useEffect(() => {
    if (getNearRestaurangList) {
      getNearRestaurangList.map((value: RestaurantType) => {
        menuSetList.add(value.bsnscond);
        locationSetList.add(value.gugun);
      });
    }
    if (menuSetList.size !== 0) {
      const menuList = Array.from(menuSetList);
      const locationList = Array.from(locationSetList);

      CreateSelectBoxOption(menuList, menuArray);
      CreateSelectBoxOption(locationList, locationArray);
    }
  }, [getNearRestaurangList]);

  return (
    <>
      <SelectBox option={menuArray} />
      <SelectBox option={locationArray} />
    </>
  );
}

export default RestaurantList;
