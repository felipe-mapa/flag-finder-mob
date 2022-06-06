import React from "react";

import CustomFlatList from "../components/CustomFlatList";
import useFilteredCountries from "../hooks/useFilteredCountries";

const CountriesDisplay = (props) => {
    const { filteredCountries } = useFilteredCountries();

    return (
        <CustomFlatList
            data={filteredCountries}
            isLoading={false}
            navigation={props.navigation}
            onPress={props.onPress}
        />
    );
};

export default CountriesDisplay;
