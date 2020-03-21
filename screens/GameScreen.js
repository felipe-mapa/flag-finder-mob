import React, { useState, useEffect, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux'
import { StyleSheet, View, Alert, Platform, StatusBar,  ActivityIndicator } from 'react-native'
import { AntDesign } from '@expo/vector-icons';

import Colors from '../components/layout/Colors'
import TextDefault from '../components/layout/textDefault';
import * as actions from '../store/actions/countriesAction'

const GameScreen = (props) => {
  const [questionNumber, setQuestionNumber] = useState(1)
  const [isGameOn, setIsGameOn] = useState(false)
  const [seconds, setSeconds] = useState(0);

  const countriesRandomisedList = useSelector(state => state.quiz.countriesUsed)
  const countries = useSelector(state => state.countries.loadedCountries.filter(c => countriesRandomisedList.indexOf(c) == -1))
  const dispatch = useDispatch();
  
  useEffect(() => {
    if (countries.length > 1) {
      setIsGameOn(true)
    }
  }, [countries])

  // TIMER
  useEffect(() => {
    let interval = null;
    if (isGameOn) {
      interval = setInterval(() => {
        setSeconds(seconds => seconds + 1);
      }, 1000);
    } else if (!isGameOn && seconds !== 0) {
      clearInterval(interval);
    }
    return () => clearInterval(interval);
  }, [isGameOn, seconds]);

  // EXIT
  const exitHandler = () => {
    setIsGameOn(false)
    Alert.alert(
      'Are you sure you want to leave?',
      'The game will not be saved',
      [
        { text: 'Stay', onPress: () => setIsGameOn(true), style: 'cancel' },
        { text: 'Leave', onPress: () => props.navigation.goBack() },
      ],
      { onDismiss: () => setIsGameOn(true) }
    )
  }

  return (
    <View style={styles.screen}>
      <View style={styles.topBar}>
        <AntDesign name="arrowleft" size={30} color="#fff" onPress={() => exitHandler()} />
        <TextDefault style={styles.text}>
          Question {questionNumber} / {props.navigation.state.params.numberOfQuestions}
        </TextDefault>
        <TextDefault style={styles.text}>
          {seconds} seconds
        </TextDefault>
      </View>
      {!isGameOn
      ? <ActivityIndicator size="large" color={Colors.primaryColorDark} />
      :  null
      }
    </View>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    height: '100%',
    backgroundColor: Colors.greyLight,
  },
  topBar: {
    paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
    height: StatusBar.currentHeight * 2.5,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-around',
    backgroundColor: Colors.primaryColorDark,
    alignItems: "center"
  },
  text: {
    color: '#fff',
    fontSize: 18
  }
})

GameScreen.navigationOptions = () => {
  return {
    headerTitle: 'Flag Quiz',
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
    header: null
  }
}

export default GameScreen