import React from 'react';
import { StyleSheet, View, TextInput } from 'react-native';
import { Ionicons } from '@expo/vector-icons'

import Colors from './layout/Colors'

const InputTag = props => {

  return (
    <View style={styles.container}>
      <TextInput
        placeholder="Eg. Star, Red, Bolivia, Asia, Union Jack"
        placeholderTextColor={"rgba(255,255,255,0.8)"}
        onChangeText={props.change}
        value={props.value}
        style={styles.input}
        autoCapitalize="words"
        maxLength={20}
        onSubmitEditing={props.submitted}
        returnKeyType='search'
        blurOnSubmit={false}
      />
      <Ionicons style={styles.icon} onPress={props.submitted} name="md-search" size={24} color={"white"}/>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    marginTop: 10,
    backgroundColor: Colors.primaryColor,
    borderRadius: 8,
    paddingHorizontal: 8,
    paddingBottom: 4,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 20
  },
  input: {
    flex: 1,
    fontFamily: 'comfortaa',
    color: 'white',
  },
  icon: {
  }
})

export default InputTag