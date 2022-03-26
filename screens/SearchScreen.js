import React, { useEffect, useState, useCallback } from 'react';
import { SafeAreaView, StatusBar, StyleSheet } from 'react-native';

import CountriesDisplay from '../containers/CountriesDisplay';
import SearchContainer from '../containers/SearchContainer';
import Colors from '../components/layout/Colors'
import { useDispatch } from 'react-redux';
import Banner from '../components/Banner';

import * as countriesActions from '../store/actions/countriesAction';

const SearchScreen = (props) => {
    // SEND PROPS ON NAVIGATION
    const selectItemHandler = (countrySelected) => {
        props.navigation.navigate('Country', countrySelected)
    }

    const [countriesAreLoaded, setCountriesAreLoaded] = useState(false)
    const dispatch = useDispatch();

    const loadCountries = useCallback(async () => {
        try {
            await dispatch(countriesActions.fetchCountries());
        } catch (err) {
            throw err
        }
        setCountriesAreLoaded(true)
    }, []);

    // LOAD FAVORITES
    useEffect(() => {
        dispatch(countriesActions.loadFavs());
    }, [dispatch]);

    // LOAD COUNTRIES
    useEffect(() => {
        loadCountries()
    }, [])

    return (
        <SafeAreaView style={styles.screen}>
            <StatusBar backgroundColor={Colors.secondaryColor} />
            <SearchContainer navigation={props.navigation} countriesAreLoaded={countriesAreLoaded} />
            <CountriesDisplay navigation={props.navigation} countriesAreLoaded={countriesAreLoaded} onPress={selectItemHandler} />
            <Banner />
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    screen: {
        flex: 1,
        backgroundColor: Colors.greyLight,
    }
})

export default SearchScreen;