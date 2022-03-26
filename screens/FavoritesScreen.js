import React, { useEffect } from 'react';
import { View, StyleSheet, StatusBar } from 'react-native';
import Colors from '../components/layout/Colors'
import { useSelector, useDispatch } from 'react-redux'

import CustomFlatList from '../components/CustomFlatList'
import EmptyPage from '../components/EmpyPage'
import Banner from '../components/Banner'
import * as actions from '../store/actions/countriesAction'

const FavoriteScreen = (props) => {
  const favoriteInData = useSelector(state => state.countries.favoriteCountries)
  const favoriteCountries = useSelector(state => state.countries.loadedCountries.map(c => {
    if (favoriteInData.find(d => d === c.slug)) {
      return c
    }
  }).filter(el => el != null))
  const dispatch = useDispatch();

  // FAVORITE
  useEffect(() => {
    dispatch(actions.loadFavs());
  }, [dispatch]);

  const selectItemHandler = (countrySelected) => {
    props.navigation.navigate('Country', countrySelected)
  }

  return (
    <View style={styles.screen}>
      <StatusBar backgroundColor={Colors.primaryColor} />
      <Banner />
      <View style={styles.content}>
        {favoriteInData.length > 0 ?
          <CustomFlatList
          data={favoriteCountries}
          length={favoriteCountries.length}
          onPress={selectItemHandler}
          />
          :
          <EmptyPage navigation={props.navigation} page="Search" title="SEARCH A FLAG">
            You still don't have any flag added to Favorites. Start adding now.
          </EmptyPage>
        }
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    height: '100%',
    backgroundColor: Colors.greyLight
  },
  content: {
    paddingTop: 20,
    flex: 1,
  }
})

FavoriteScreen.navigationOptions = () => {
  return {
    headerTitle: 'Favorite Countries',
    headerTintColor: 'white',
    headerStyle: {
      backgroundColor: Colors.primaryColor,
      headerTitleStyle: {
        fontWeight: 'bold',
        fontFamily: 'comfortaa-bold',
        textAlign: "center",
        flex: 1
      },
    },
    headerTitleStyle: {
      textAlign: "center",
      flex: 1
    },
  }
}

export default FavoriteScreen