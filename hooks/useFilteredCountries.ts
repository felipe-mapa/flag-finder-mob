import { useEffect, useState } from "react";
import { useSelector } from "react-redux";

const useFilteredCountries = () => {
    const countries = useSelector((state) => state.countries.loadedCountries);
    const tags = useSelector((state) => state.countries.tagsFilter);

    const [filteredCountries, setFilteredCountries] = useState([]);

    useEffect(() => {
        if (tags.length === 0) {
            setFilteredCountries(countries);
            return;
        }

        const newCountriesList = countries
            .map((country) => {
                const isAllCountryTagInList = (tag) =>
                    country.tags.find((t) => t.slug === tag.slug);

                const hasCountryAllTags = tags.every(isAllCountryTagInList);

                if (hasCountryAllTags) {
                    return country;
                }

                return null;
            })
            .filter((el) => el != null);

        setFilteredCountries(newCountriesList);
    }, [countries, tags]);

    return {
        filteredCountries,
    };
};

export default useFilteredCountries;
