import { useEffect, useState } from 'react';
import Select from 'react-select';
import useNearRestaurangList from '../utils/useNearRestaurangList';
import Restaurant_List_Table from '../Components/Restaurant_List_Table';

interface OptionType {
  value: string;
  label: string;
}

function SelectBox(props: {
  options: OptionType[];
  selectedOption: OptionType | null;
  onChange: (selectedOption: OptionType | null) => void;
}): JSX.Element {
  return (
    <Select
      className="basic-single"
      classNamePrefix="select"
      defaultValue={props.selectedOption}
      isClearable
      isSearchable
      name="color"
      options={props.options}
      onChange={props.onChange}
    />
  );
}

function RestaurantList(): JSX.Element {
  const [menuOptions, setMenuOptions] = useState<OptionType[]>([]);
  const [locationOptions, setLocationOptions] = useState<OptionType[]>([]);
  const [selectedMenuOption, setSelectedMenuOption] =
    useState<OptionType | null>(null);
  const [selectedLocationOption, setSelectedLocationOption] =
    useState<OptionType | null>(null);

  const nearRestaurangList: any = useNearRestaurangList() ?? [];

  useEffect(() => {
    const menus = Array.from(
      new Set(
        nearRestaurangList.map((value: { bsnscond: string }) => value.bsnscond)
      )
    );
    const locations = Array.from(
      new Set(nearRestaurangList.map((value: { gugun: string }) => value.gugun))
    );

    const menuOptions: any = menus.map((menu) => ({
      value: menu,
      label: menu,
    }));
    const locationOptions: any = locations.map((location) => ({
      value: location,
      label: location,
    }));

    setMenuOptions(menuOptions);
    setLocationOptions(locationOptions);
  }, [nearRestaurangList]);

  const handleMenuChange = (option: OptionType | null) =>
    setSelectedMenuOption(option);
  const handleLocationChange = (option: OptionType | null) =>
    setSelectedLocationOption(option);

  const filteredRestaurants = nearRestaurangList.filter(
    (value: { bsnscond: string; gugun: string }) =>
      (!selectedMenuOption || value.bsnscond === selectedMenuOption.value) &&
      (!selectedLocationOption || value.gugun === selectedLocationOption.value)
  );

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
      <Restaurant_List_Table NearRestaurangList={filteredRestaurants} />
    </>
  );
}

export default RestaurantList;
