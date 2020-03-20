import React, { useEffect, useState } from 'react';
import {
    View,
    StyleSheet,
    ScrollView
} from 'react-native';
import { useSelector } from 'react-redux';

import CustomFlatList from '../components/customFlatList'
import EmptyPage from '../components/empyPage'


const SearchScreen = props => {
    const countries = useSelector(state => state.countries.loadedCountries);
    const tags = useSelector(state => state.countries.tagsFilter);

    const [filteredCountries, setFilteredCountries] = useState([])
    const [display, setDisplay] = useState(
        <CustomFlatList
            data={filteredCountries}
            length={countries.length}
            onPress={(id, title, mainColor) => props.onPressing(id, title, mainColor)}
        />
    )

    // FILTER COUNTRIES
    useEffect(() => {
        if (props.countriesAreLoaded) {
            if (tags.length > 0) {
                setFilteredCountries(
                    countries.map(country => {
                        if (tags.every(tag => country.tags.indexOf(tag) > -1)) {
                            return country
                        } else {
                            null
                        }
                    }).filter(el => el != null)
                )
            } else {
                setFilteredCountries(countries)
            }
        }
        //console.log(countries);
    }, [countries, tags, props.countriesAreLoaded])

    // LOAD DISPLAY
    useEffect(() => {
        if (props.countriesAreLoaded) {
            if (filteredCountries.length < 1 && tags.length > 0) {
                setDisplay(
                    <EmptyPage navigation={props.navigation} page="Contact" title="FLAG AN ERROR">
                        We are sorry to say the characteristics you added cannot match any flag on our database.
                        If you think there's any characteristic or flag missing please flag as the problem.
                    </EmptyPage>
                )
            } else {
                setDisplay(
                    <CustomFlatList
                        data={filteredCountries}
                        length={countries.length}
                        onPress={(id, title, mainColor) => props.onPressing(id, title, mainColor)}
                    />
                )
            }
        }
    }, [props.countriesAreLoaded, filteredCountries])

    return (
        <View style={styles.screen}>
            {display}
        </View>
    );
};

const styles = StyleSheet.create({
    screen: {
        flex: 1
    },
    container: {
        padding: 0,
        flex: 1,
        width: '100%',
        justifyContent: 'space-around',
        height: '100%'
    },
})

export default SearchScreen;