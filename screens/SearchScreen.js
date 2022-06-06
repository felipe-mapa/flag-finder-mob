import React, { useEffect } from 'react';
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

    const dispatch = useDispatch();

    // LOAD FAVORITES
    useEffect(() => {
        dispatch(countriesActions.loadFavs());
    }, [dispatch]);

    return (
        <>
            <StatusBar backgroundColor={Colors.secondaryColor} />
            <SafeAreaView style={styles.screen}>
                <SearchContainer navigation={props.navigation} />
                <CountriesDisplay navigation={props.navigation} onPress={selectItemHandler} />
                <Banner />
            </SafeAreaView>
        </>
    );
};

const styles = StyleSheet.create({
    screen: {
        flex: 1,
        backgroundColor: Colors.greyLight,
    }
})

export default SearchScreen;