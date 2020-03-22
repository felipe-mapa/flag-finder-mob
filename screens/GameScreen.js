import React, { useState, useEffect, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux'
import { StyleSheet, View, Alert, Platform, StatusBar, ActivityIndicator, Dimensions } from 'react-native'
import { AntDesign } from '@expo/vector-icons';
import { Overlay } from 'react-native-elements'
import { Button } from 'react-native-elements'

import Colors from '../components/layout/Colors'
import TextDefault from '../components/layout/textDefault';
import * as quizActions from '../store/actions/quizAction'
import GameDisplay from '../components/gameDisplay'

const GameScreen = (props) => {
  const [questionNumber, setQuestionNumber] = useState(0)
  const [isGameOn, setIsGameOn] = useState(false)
  const [seconds, setSeconds] = useState(0);
  const [numberOfCorrectAnswers, setNumberOfCorrectAnswers] = useState(0)
  const [isOverlayVisible, setIsOverlayVisible] = useState(false)
  const [overlayMessage, setOverlayMessage] = useState()
  const [randomisedCountries, setRandomisedCountries] = useState([])

  const numberOfQuestions = props.navigation.state.params.numberOfQuestions

  const countries = useSelector(state => state.countries.loadedCountries)
  const dispatch = useDispatch();

  useEffect(() => {
    if (countries.length > 1) {

      let countryList = []
      let canBeOptions = countries.map(c => c.id)

      for (x = 0; x < numberOfQuestions; x++) {
        countryList = countryList.concat(canBeOptions[Math.floor(Math.random() * canBeOptions.length)])
        canBeOptions = canBeOptions.filter(val => !countryList.includes(val))
      }

      setRandomisedCountries(countryList)
      setIsGameOn(true)
    }
  }, [countries])

  const addCountry = (newCountryId) => {
    if (!newCountryId.isNaN) {
      dispatch(quizActions.addCountry(newCountryId))
    }
  }

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

  // CHECK ANSWER
  const checkAnswerHandler = (selectedCountry, rightAnswer) => {
    let numberOfCorrects = numberOfCorrectAnswers
    if (rightAnswer.name === selectedCountry) {
      numberOfCorrects = numberOfCorrects + 1
      setOverlayMessage(
        <TextDefault>
          Well Done! Your answer was <TextDefault style={{ color: '#8CDA00' }}>CORRECT!</TextDefault>
        </TextDefault>
      )
    } else {
      setOverlayMessage(
        <TextDefault>
          Sorry! The correct answer was <TextDefault style={{ color: '#EB1100' }}>{rightAnswer.name}.</TextDefault>
        </TextDefault>
      )
    }

    if ((questionNumber + 1) === numberOfQuestions) {
      setOverlayMessage(
        <TextDefault>
          Number of correct answers: {numberOfCorrects}/{numberOfQuestions} in {seconds} seconds!
        </TextDefault>
      )
    }
    setNumberOfCorrectAnswers(numberOfCorrects)
    setIsOverlayVisible(true)
    setIsGameOn(false)
    setIsOverlayVisible(true)
  }

  //SUBMIT ANSWER
  const submitAnswerHandler = () => {
    setIsOverlayVisible(false)
    setIsGameOn(true)
    setQuestionNumber(questionNumber + 1)
  }

  // SUBMIT SCORE
  const submitScore = () => {
    props.navigation.goBack()
  }

  return (
    <View style={styles.screen}>
      <Overlay
        isVisible={isOverlayVisible}
        windowBackgroundColor="rgba(0, 0, 0, .5)"
        overlayBackgroundColor="white"
        width={Dimensions.get('window').width * .7}
        height={Dimensions.get('window').height * .3}
      >
        <View style={styles.overlay}>
          {overlayMessage}
          <Button
            title={(questionNumber + 1) === numberOfQuestions ? "Submit Score" : "Next Question"}
            type="outline"
            onPress={(questionNumber + 1) === numberOfQuestions ? () => submitScore() : () => submitAnswerHandler()}
            // buttonStyle={{
            //     backgroundColor: countryPressed === itemData.item ? Colors.primaryColorDark : Colors.primaryColorLight,
            //     marginVertical: 10
            // }}
            titleStyle={{
              fontSize: 20,
              color: Colors.primaryColorDark
            }}
          />
        </View>
      </Overlay>
      <View style={styles.topBar}>
        <AntDesign name="arrowleft" size={30} color="#fff" onPress={() => exitHandler()} />
        <TextDefault style={styles.text}>
          Question {questionNumber + 1} / {numberOfQuestions}
        </TextDefault>
        <TextDefault style={styles.text}>
          {seconds} seconds
        </TextDefault>
      </View>
      {!isGameOn
        ? <ActivityIndicator size="large" color={Colors.primaryColorDark} />
        :
        <GameDisplay
          country={randomisedCountries[questionNumber]}
          submitAnswer={(selectedCountry, rightAnswer) => checkAnswerHandler(selectedCountry, rightAnswer)}
        />
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
  },
  overlay: {
    flex: 1,
    height: '100%',
    display: 'flex',
    justifyContent: "space-around"
  },
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