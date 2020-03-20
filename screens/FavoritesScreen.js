import React, { useEffect } from 'react';
import { View, StyleSheet, Text } from 'react-native';
import Colors from '../components/layout/Colors'
import { useSelector, useDispatch } from 'react-redux'

import CustomFlatList from '../components/customFlatList'
import EmptyPage from '../components/empyPage'
import Banner from '../components/banner'
import * as actions from '../store/actions/countriesAction'

const FavoriteScreen = (props) => {
  const favoriteInData = useSelector(state => state.countries.favoriteCountries)
  const favoriteCountries = useSelector(state => state.countries.loadedCountries.map(c => {
    if (favoriteInData.find(d => d === c.id)) {
      return c
    }
  }).filter(el => el != null))
  const dispatch = useDispatch();

  // FAVORITE
  useEffect(() => {
    dispatch(actions.loadFavs());
  }, [dispatch]);

  const selectItemHandler = (id, title, mainColor) => {
    props.navigation.navigate('Country', { id: id, title: title, mainColor: mainColor === '' ? Colors.primaryColorDark : mainColor })
  }

  return (
    <View style={styles.screen}>
      <Banner />
      {favoriteInData.length > 0 ?
        <CustomFlatList
          data={favoriteCountries}
          length={favoriteCountries.length}
          onPress={(id, title, mainColor) => selectItemHandler(id, title, mainColor)}
        />
        :
        <EmptyPage navigation={props.navigation} page="Search" title="SEARCH A FLAG">
          You still don't have any flag added to Favorites. Start adding now.
    </EmptyPage>
      }
    </View>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    height: '100%',
    backgroundColor: Colors.greyLight
  }
})

FavoriteScreen.navigationOptions = () => {
  return {
    headerTitle: 'Favorite Countries',
    headerTintColor: 'white',
    headerStyle: {
      backgroundColor: Colors.primaryColorDark,
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