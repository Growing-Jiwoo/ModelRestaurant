import { useEffect, useState } from 'react';
import useNearRestaurangList from '../hook/useNearRestaurangList';
import LodingUi from '../components/commons/Loding';
import RestaurantListTable from '../components/list/RestaurantListTable';
import SelectBox from '../components/list/ListSelectBox';
import type { SelectBoxOption } from '../@types/interface';

function RestaurantList(): JSX.Element {
  const [menuOptions, setMenuOptions] = useState<SelectBoxOption[]>([]);
  const [locationOptions, setLocationOptions] = useState<SelectBoxOption[]>([]);
  const [selectedMenuOption, setSelectedMenuOption] =
    useState<SelectBoxOption | null>(null);
  const [selectedLocationOption, setSelectedLocationOption] =
    useState<SelectBoxOption | null>(null);
  const nearRestaurangList = useNearRestaurangList(null) ?? [];

  useEffect(() => {
    const menus = Array.from(
      new Set(
        nearRestaurangList.map((value: { bsnscond: string }) => value.bsnscond)
      )
    );
    const locations = Array.from(
      new Set(nearRestaurangList.map((value: { gugun: string }) => value.gugun))
    );

    const menuOptions: SelectBoxOption[] = menus.map((menu) => ({
      value: menu,
      label: menu,
    }));

    const locationOptions: SelectBoxOption[] = locations.map((location) => ({
      value: location,
      label: location,
    }));

    setMenuOptions(menuOptions);
    setLocationOptions(locationOptions);
  }, [nearRestaurangList]);

  const handleMenuChange = (option: SelectBoxOption | null) =>
    setSelectedMenuOption(option);
  const handleLocationChange = (option: SelectBoxOption | null) =>
    setSelectedLocationOption(option);

  const filteredRestaurants = nearRestaurangList.filter(
    (value: { bsnscond: string; gugun: string }) =>
      (!selectedMenuOption || value.bsnscond === selectedMenuOption.value) &&
      (!selectedLocationOption || value.gugun === selectedLocationOption.value)
  );
  if (filteredRestaurants.length !== 0) {
    return (
      <>
        <SelectBox
          options={menuOptions}
          selectedOption={selectedMenuOption}
          onChange={handleMenuChange}
        />
        <SelectBox
          options={locationOptions}
          selectedOption={selectedLocationOption}
          onChange={handleLocationChange}
        />
        <RestaurantListTable NearRestaurangList={filteredRestaurants} />
      </>
    );
  } else {
    return <LodingUi />;
  }
}

export default RestaurantList;
