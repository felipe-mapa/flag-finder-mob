import React from 'react'
import {
  ActivityIndicator,
  StyleSheet,
  View,
} from 'react-native'

import Colors from '../components/layout/Colors'

const CustomActivityIndicator = () => {
    return (
      <View style={styles.container}>
        <ActivityIndicator size="large" color={Colors.primaryColorDark} />
      </View>
    )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    height: '100%',
    alignItems: 'center'
  }
})

export default CustomActivityIndicator