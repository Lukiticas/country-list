import {
  NavBody,
  NavSearch,
  NavSelect,
  NavInput,
  NavSelectWrapper,
} from "./SearchNav.styles";
import { MagnifyingGlass, CaretUp, CaretDown } from "phosphor-react";
import { useState, useEffect } from "react";
import { useContext } from "react";
import { ThemeContext } from "styled-components";

const SearchNav = ({ list, setChangedList }) => {
  const [regionSelected, setRegionSelected] = useState("");
  const [countrySelected, setCountrySelected] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const { colors } = useContext(ThemeContext);

  const handleSelected = (evt) => {
    setRegionSelected(evt.target.value);
  };

  const changeBasedOnRegion = (list, region) => {
    const newList = list.filter((el) => el.region === region);
    setChangedList(regionSelected === "none" ? [] : newList);
  };

  const changeBaseOnSearch = (list, words) => {
    const newList = list.filter((el) => {
      const treated = Object.entries(el.translations);
      return treated.some((el) => el[1].includes(words));
    });
    setChangedList(newList);
  };

  useEffect(() => {
    changeBasedOnRegion(list, regionSelected);
  }, [regionSelected]);

  useEffect(() => {
    changeBaseOnSearch(list, countrySelected);
  }, [countrySelected]);

  return (
    <NavBody>
      <NavSearch>
        <MagnifyingGlass size={24} color={colors.wordPrimary} />
        <NavInput
          value={countrySelected}
          onChange={(evt) => setCountrySelected(evt.target.value)}
          placeholder="Search for a country..."
          autoComplete="off"
        />
      </NavSearch>

      <NavSelectWrapper>
        <NavSelect
          defaultValue={regionSelected}
          onClick={() => setIsOpen((ol) => !ol)}
          onBlur={() => setIsOpen((ol) => !ol)}
          onChange={handleSelected}
        >
          <option disabled hidden value="">
            Filter by Region
          </option>
          <option value="Africa">África</option>
          <option value="Americas">America</option>
          <option value="Asia">Ásia</option>
          <option value="Europe">Europe</option>
          <option value="Oceania">Oceania</option>
          <option value="none">Show All</option>
        </NavSelect>
        {isOpen ? (
          <CaretDown color={colors.wordPrimary} size={16} weight="bold" />
        ) : (
          <CaretUp color={colors.wordPrimary} size={16} weight="bold" />
        )}
      </NavSelectWrapper>
    </NavBody>
  );
};

export default SearchNav;
