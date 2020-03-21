import React from 'react';
import { StyleSheet, View, Linking, Text } from 'react-native';

import Colors from '../components/layout/Colors'
import TextDefault from '../components/layout/textDefault'
import Banner from '../components/banner';

const infoScreen = () => {
  return (
    <View>
      <Banner />
      <View style={styles.screen}>
        <TextDefault>Version: 1.1.1 </TextDefault>
        <TextDefault>
          Development: <TextDefault style={styles.clickable} onPress={() => Linking.openURL('https://pavanela.com')}>pavanela.com</TextDefault>
        </TextDefault>
        <TextDefault style={styles.clickable} onPress={() => Linking.openURL('https://play.google.com/store/apps/developer?id=Felipe+Pavanela')}>
          See more
      </TextDefault>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  screen: {
    paddingHorizontal: '7%',
    paddingTop: 5,
    flex: 1
  },
  clickable: {
    color: Colors.primaryColorLight,
    textDecorationLine: "underline",
    fontSize: 18,
  },
  padding: {
    paddingBottom: 40
  },
})

export default infoScreen