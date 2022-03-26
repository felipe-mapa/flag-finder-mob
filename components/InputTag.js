import React from 'react';
import { StyleSheet, View, TextInput } from 'react-native';
import { Ionicons } from '@expo/vector-icons'

import Colors from './layout/Colors'

const InputTag = props => {

  return (
    <View style={props.loaded ? styles.container : styles.containerTrans}>
      <TextInput
        placeholder="Eg. Star, Red, Bolivia, Asia, Union Jack"
        placeholderTextColor={props.loaded ? "rgba(255,255,255,0.8)" : "rgba(255,255,255,0.4)"}
        onChangeText={props.change}
        value={props.value}
        style={styles.input}
        autoCapitalize="words"
        maxLength={20}
        onSubmitEditing={props.submitted}
        returnKeyType='search'
        blurOnSubmit={false}
        editable={props.loaded ? true : false}
      />
      <Ionicons style={styles.icon} onPress={props.submitted} name="md-search" size={24} color={props.loaded ? "rgba(255,255,255,1)" : "rgba(255,255,255,0.3)"}/>
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
  containerTrans: {
    flexDirection: 'row',
    marginTop: 10,
    backgroundColor: Colors.secondaryColor,
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