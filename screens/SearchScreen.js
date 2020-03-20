import React, { useEffect, useState, useCallback } from 'react';
import { SafeAreaView, StyleSheet, View } from 'react-native';

import CountriesDisplay from '../components/countriesDisplay';
import SearchContainer from '../components/searchContainer';
import Colors from '../components/layout/Colors'
import { useDispatch } from 'react-redux';
import Banner from '../components/banner';

import * as countriesActions from '../store/actions/countriesAction';

const SearchScreen = (props) => {
    const selectItemHandler = (id, slug, title, mainColor) => {
        props.navigation.navigate('Country', { id: id, slug: slug, title: title, mainColor: mainColor === '' ? Colors.primaryColorDark : mainColor })
    }

    const [countriesAreLoaded, setCountriesAreLoaded] = useState(false)
    const dispatch = useDispatch();

    // LOAD FAVORITES
    // FAVORITE
    useEffect(() => {
        dispatch(countriesActions.loadFavs());
    }, [dispatch]);

    // LOAD COUNTRIES
    useEffect(() => {
        loadCountries()
    }, [])

    // LOAD ALL COUNTRIES TOGETHER
    const loadCountries = useCallback(async () => {
        try {
            await dispatch(countriesActions.fetchCountries());
        } catch (err) {
            throw err
        }
        setCountriesAreLoaded(true)
    }, []);

    return (
        <SafeAreaView style={styles.screen}>
            <SearchContainer navigation={props.navigation} countriesAreLoaded={countriesAreLoaded} />
            <CountriesDisplay navigation={props.navigation} countriesAreLoaded={countriesAreLoaded} onPressing={(id, slug, title, mainColor) => selectItemHandler(id, slug, title, mainColor)} />
            <Banner />
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    screen: {
        flex: 1,
        backgroundColor: Colors.greyLight
    }
})

export default SearchScreen;