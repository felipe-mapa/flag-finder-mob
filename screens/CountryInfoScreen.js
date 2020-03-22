import React, { useCallback, useEffect, useState } from 'react';
import { StyleSheet, View, Image, ScrollView, Dimensions } from 'react-native';
import { HeaderButtons, Item } from 'react-navigation-header-buttons'
import { useSelector, useDispatch } from 'react-redux';
import MapView, { Marker } from 'react-native-maps'
import { Tooltip, Text } from 'react-native-elements';

import TextDefault from '../components/layout/textDefault'
import Header from '../components/layout/header'
import HeaderButton from '../components/layout/HeaderButton'
import customMap from '../helpers/customMapStyle'
import Banner from '../components/banner';
import * as countriesActions from '../store/actions/countriesAction'
import Colors from '../components/layout/Colors'
import CustomActivityIndicator from '../components/customActivityIndicator'

const CountryInfoScreen = props => {
  const [isLoading, setIsLoading] = useState(true)

  // COUNTRY
  const countryName = props.navigation.getParam('slug')
  const countryId = props.navigation.getParam('id')

  // SELECTORS
  const selectedCountry = useSelector(state => state.countries.loadedFullCountry.find(c => c.slug === countryName))
  const allTags = useSelector(state => state.countries.loadedTags)
  const allContinents = useSelector(state => state.countries.loadedContinents)
  const fav = useSelector(state => state.countries.favoriteCountries)
  const dispatch = useDispatch()

  // LOAD COUNTRY
  useEffect(() => {
    loadCountry()
  }, [])
  const loadCountry = useCallback(async () => {
    try {
      await dispatch(countriesActions.fetchCountry(countryName));
    } catch (err) {
      throw err
    }
    setIsLoading(false)
  }, []);

  let pageContent = (<CustomActivityIndicator />)
  if (!isLoading) {
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

    // COUNTRY REGION
    const mapRegion = {
      latitude: selectedCountry.latitude,
      longitude: selectedCountry.longitude,
      latitudeDelta: 80,
      longitudeDelta: 80
    }

    // SET CONTENT
    pageContent = (
      <View>
        <View style={styles.block}>
          <View style={styles.imageContainer}>
            <Image style={styles.image} source={{ uri: selectedCountry.flag }} />
          </View>

          {selectedCountry.year < 1 ? null :
            <TextDefault>
              <TextDefault style={styles.bold}>Effective since: </TextDefault>
              {selectedCountry.year}
            </TextDefault>}

          {selectedCountry.capital === '' ? null :
            <TextDefault>
              <TextDefault style={styles.bold}>Capital: </TextDefault>
              {selectedCountry.capital}
            </TextDefault>}

          {selectedCountry.continent === '' ? null :
            <TextDefault>
              <TextDefault style={styles.bold}>Continent: </TextDefault>
              {continent}
            </TextDefault>}

          {selectedCountry.population === '' ? null :
            <TextDefault>
              <TextDefault style={styles.bold}>Population: </TextDefault>
              {selectedCountry.population}
            </TextDefault>}

          {selectedCountry.hdi === '' ? null :
          <View style={{display: 'flex', flexDirection: 'row', bottom: 0}}>
            <Tooltip 
                withOverlay={false}
                height={60}
                width={ Dimensions.get("window").width * .9 }
                backgroundColor={Colors.primaryColor}
                popover={
                  <Text>
                    The Human Development Index is a statistic composite index of life expectancy, education, and per capita income indicators.
                  </Text>
                }>
              <TextDefault style={{textDecorationLine: "underline", fontWeight: 'bold', fontSize: 16}}>HDI:</TextDefault>
            </Tooltip>
            <TextDefault> {selectedCountry.hdi}</TextDefault>
          </View>}

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
      </View>
    )
  }

  // FAVORITES
  const toggleFavHandler = () => {
    if (fav.some(c => c === countryId)) {
      dispatch(countriesActions.delFavorite(countryId))
    } else {
      dispatch(countriesActions.addFavorite(countryId))
    }
  }

  useEffect(() => {
    props.navigation.setParams({ toggleFav: toggleFavHandler })
  }, [selectedCountry, fav])

  useEffect(() => {
    props.navigation.setParams({ isFav: fav.some(c => c === countryId) })
  }, [fav])

  return (
    <ScrollView style={styles.screen}>
      {pageContent}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    height: '100%',
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

  },
  bold: {
    fontWeight: 'bold',
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