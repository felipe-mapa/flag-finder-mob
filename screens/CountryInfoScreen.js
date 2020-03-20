import React, { useCallback, useEffect, useState } from 'react';
import { StyleSheet, View, Image, ScrollView, Dimensions } from 'react-native';
import { HeaderButtons, Item } from 'react-navigation-header-buttons'
import { useSelector, useDispatch } from 'react-redux';
import MapView, { Marker } from 'react-native-maps'

import TextDefault from '../components/layout/textDefault'
import Header from '../components/layout/header'
import HeaderButton from '../components/layout/HeaderButton'
import customMap from '../helpers/customMapStyle'
import Banner from '../components/banner';
import * as actions from '../store/actions/countriesAction'

const CountryInfoScreen = props => {
  // COUNTRY
  const countryId = props.navigation.getParam('id')

  // SELECTORS
  const selectedCountry = useSelector(state => state.countries.loadedCountries.find(c => c.id === countryId))
  const allTags = useSelector(state => state.countries.loadedTags)
  const allContinents = useSelector(state => state.countries.loadedContinents)
  const fav = useSelector(state => state.countries.favoriteCountries)
  const dispatch = useDispatch()

  // TAG
  const countryTags = allTags.map(tag => {
    if (selectedCountry.tags.find(t => t === tag.id)) {
      return tag.name
    } else {
      return null
    }
  }).filter(el => el != null)
  const outputTags = countryTags.join(", ")

  // CONTINENT
  const continent = allContinents.map(conty => {
    if (selectedCountry.continent.find(c => c === conty.id)) {
      return conty.name
    } else {
      return null
    }
  }).filter(el => el != null)

  // FAVORITES
  const toggleFavHandler = () => { 
    if(fav.some(c => c === countryId)) {
      dispatch(actions.delFavorite(countryId))
    } else {
      dispatch(actions.addFavorite(countryId))
    }
  }

  useEffect(() => {
    props.navigation.setParams({ toggleFav: toggleFavHandler })
  }, [selectedCountry, fav])

  useEffect(() => {
    props.navigation.setParams({ isFav: fav.some(c => c === countryId) })
  }, [fav])

  // COUNTRY REGION
  const mapRegion = {
    latitude: selectedCountry.latitude,
    longitude: selectedCountry.longitude,
    latitudeDelta: 80,
    longitudeDelta: 80
  }

  return (
    <ScrollView style={styles.screen}>
      <View style={styles.block}>
        <View style={styles.imageContainer}>
          <Image style={styles.image} source={{ uri: selectedCountry.flag }} />
        </View>
        {selectedCountry.year < 1 ? null : <TextDefault>Effective since: {selectedCountry.year}</TextDefault>}
        {selectedCountry.capital === '' ? null : <TextDefault>Capital: {selectedCountry.capital}</TextDefault>}
        {selectedCountry.continent === '' ? null : <TextDefault>Continent: {continent}</TextDefault>}
        {selectedCountry.population === '' ? null : <TextDefault>Population: {selectedCountry.population}</TextDefault>}
        <View style={styles.padding}>
          {selectedCountry.meaning === '' ? null : (
            <View>
              <Header>Meaning</Header>
              <TextDefault>{selectedCountry.meaning}</TextDefault>
            </View>
          )}
        </View>
      </View>
      <Banner />
      <View style={styles.block}>
        {isNaN(selectedCountry.latitude) || isNaN(selectedCountry.longitude) ? null : (
          <View>
            <Header>Where it is in the world</Header>
            <MapView
              style={styles.map}
              region={mapRegion}
              customMapStyle={customMap}
            >
              <Marker title={selectedCountry.name} coordinate={{
                latitude: selectedCountry.latitude,
                longitude: selectedCountry.longitude,
              }} />
            </MapView>
          </View>
        )}
        {allTags < 0 ? null : (
          <View style={styles.padding}>
            <Header>Tags</Header>
            <TextDefault>{outputTags}</TextDefault>
          </View>
        )}
      </View>
      <Banner />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: 'rgb(219, 219, 219)',
  },
  block: {
    paddingHorizontal: '7%',
  },
  padding: {
    paddingBottom: 20
  },
  imageContainer: {
    flex: 1,
    width: Dimensions.get("window").width * 0.86,
    height: Dimensions.get("window").width * 0.5,
    marginTop: 10
  },
  image: {
    flex: 1,
    width: "100%",
    height: "100%",
    resizeMode: 'stretch'
  },
  map: {
    width: '100%',
    height: 300,
    borderStyle: "solid",
    borderColor: '#000',

  }
})

CountryInfoScreen.navigationOptions = navData => {
  const toggleFavorite = navData.navigation.getParam('toggleFav')
  const isFavorite = navData.navigation.getParam('isFav')

  return {
    headerTitle: navData.navigation.getParam('title'),
    headerTintColor: 'white',
    headerRight: (
      <HeaderButtons HeaderButtonComponent={HeaderButton}>
        <Item title='Favorite' iconName={isFavorite ? 'ios-heart' : 'ios-heart-empty'} onPress={toggleFavorite} />
      </HeaderButtons>
    ),
    headerStyle: {
      backgroundColor: navData.navigation.getParam('mainColor'),
      headerTitleStyle: {
        fontWeight: 'bold',
        fontFamily: 'comfortaa-bold'
      },
    }
  };
};

export default CountryInfoScreen