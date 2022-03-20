import React from 'react';
import { StyleSheet, View, Text } from 'react-native';

import Colors from './layout/Colors'
import TextDefault from './layout/TextDefault'

const TagList = props => {
  return (
    <View style={styles.block}>
        <TextDefault style={styles.text}>{props.children}</TextDefault>
        <Text style={styles.button} onPress={props.removeTag}>X</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  block: {
    backgroundColor: Colors.primaryColorDark,
    justifyContent: 'center',
    alignItems: 'center',
    paddingBottom: 2,
    paddingHorizontal: 7,
    borderRadius: 6,
    margin: 2,
    marginTop: 5,
    maxHeight: 25,
    flexDirection: 'row',
    elevation: 3
  },
  button: {
    justifyContent: 'center',
    color: "#fff",
    textAlign: "center",
    backgroundColor: Colors.primaryColorLight,
    height: 20,
    width: 20,
    borderRadius: 40,
    marginLeft: 5,
    marginTop: 3
  },
  text: {
    color: '#fff'
  }
})

export default TagList