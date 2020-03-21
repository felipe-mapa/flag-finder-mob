import React from 'react';
import { useSelector, useDispatch } from 'react-redux'
import { StyleSheet, View, Text } from 'react-native'

import Colors from '../components/layout/Colors'
import Banner from '../components/banner'

const ScoresScreen = (props) => {

    return (
        <View style={styles.screen}>
            <Text>Hi Score</Text>
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

ScoresScreen.navigationOptions = () => {
    return {
      headerTitle: 'Top Scores',
      headerTintColor: 'white',
      headerStyle: {
        backgroundColor: Colors.primaryColorDark,
        headerTitleStyle: {
          fontWeight: 'bold',
          fontFamily: 'comfortaa-bold',
          flex: 1
        },
      },
      headerTitleStyle: {
        flex: 1
      },
    }
  }

export default ScoresScreen