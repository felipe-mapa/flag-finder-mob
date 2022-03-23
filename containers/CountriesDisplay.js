import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";

import CustomFlatList from "../components/CustomFlatList";

const CountriesDisplay = (props) => {
    const countries = useSelector((state) => state.countries.loadedCountries);
    const tags = useSelector((state) => state.countries.tagsFilter);

    const [filteredCountries, setFilteredCountries] = useState([]);

    // FILTER COUNTRIES
    useEffect(() => {
        if (!props.countriesAreLoaded) {
            return;
        }
        if (tags.length === 0) {
            setFilteredCountries(countries);
            return;
        }
        setFilteredCountries(
            countries
                .map((country) => {
                    if (tags.every((tag) => country.tags.indexOf(tag) > -1)) {
                        return country;
                    } else {
                        null;
                    }
                })
                .filter((el) => el != null)
        );
    }, [countries, tags, props.countriesAreLoaded]);

    return (
        <CustomFlatList
            data={filteredCountries}
            isLoading={countries.length === 0}
            onPress={props.onPress}
        />
    );
};

export default CountriesDisplay;
