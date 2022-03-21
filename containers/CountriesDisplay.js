import React, { useEffect, useState } from "react";
import { View, StyleSheet } from "react-native";
import { useSelector } from "react-redux";

import CustomFlatList from "../components/CustomFlatList";
import EmptyPage from "../components/EmpyPage";

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

    if (filteredCountries.length < 1 && tags.length > 0) {
        return (
            <EmptyPage
                navigation={props.navigation}
                page='Contact'
                title='FLAG AN ERROR'
            >
                We are sorry to say the characteristics you added cannot match
                any flag on our database. If you think there's any
                characteristic or flag missing please flag as the problem.
            </EmptyPage>
        );
    }

    return (
        <CustomFlatList
            data={filteredCountries}
            length={countries.length}
            onPress={props.onPressing}
        />
    );
};

export default CountriesDisplay;
