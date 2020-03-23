import React, { useState, useEffect, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux'
import { StyleSheet, View, Alert, Platform, StatusBar } from 'react-native'
import { AntDesign } from '@expo/vector-icons';

import Colors from '../components/layout/Colors'
import TextDefault from '../components/layout/textDefault';
import CustomActivityIndicator from '../components/customActivityIndicator'
import * as quizActions from '../store/actions/quizAction'
import GameDisplay from '../components/gameDisplay'
import GameOverlay from '../components/gameOverlay';

const GameScreen = (props) => {
  const [questionNumber, setQuestionNumber] = useState(0)
  const [isGameOn, setIsGameOn] = useState(false)
  const [seconds, setSeconds] = useState(0);
  const [numberOfCorrectAnswers, setNumberOfCorrectAnswers] = useState(0)
  const [isLastOverlay, setIsLastOverlay] = useState(false)
  const [isOverlayVisible, setIsOverlayVisible] = useState(false)
  const [overlayMessage, setOverlayMessage] = useState()
  const [randomisedCountries, setRandomisedCountries] = useState([])
  const [date, setDate] = useState("Someone")

  const numberOfQuestions = props.navigation.state.params.numberOfQuestions

  // useSelector
  const countries = useSelector(state => state.countries.loadedCountries)
  const playerId = useSelector(state => state.quiz.timesPlayed)
  const scores = useSelector(state => state.quiz.topScores)
  const dispatch = useDispatch();

  useEffect(() => {
    if (countries.length > 1) {

      let countryList = []
      let canBeOptions = countries.map(c => c.id)

      for (x = 0; x < numberOfQuestions; x++) {
        countryList = countryList.concat(canBeOptions[Math.floor(Math.random() * canBeOptions.length)])
        canBeOptions = canBeOptions.filter(val => !countryList.includes(val))
      }
      setDateHandler()
      setRandomisedCountries(countryList)
      setIsGameOn(true)
      dispatch(quizActions.setId())
    }
  }, [countries])

  // SET DATE
  const setDateHandler = () => {
    var today = new Date();
    var dd = today.getDate();
    var mm = today.getMonth() + 1;

    var yyyy = today.getFullYear();
    if (dd < 10) {
      dd = '0' + dd;
    }
    if (mm < 10) {
      mm = '0' + mm;
    }
    var today = dd + '/' + mm + '/' + yyyy;
    setDate(today)
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
    if(isLastOverlay){
      //props.navigation.goBack()
    } else {
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
  }

  // CHECK ANSWER
  const checkAnswerHandler = (selectedCountry, rightAnswer) => {
    let numberOfCorrects = numberOfCorrectAnswers
    if (rightAnswer.name === selectedCountry) {
      numberOfCorrects = numberOfCorrects + 1
      setOverlayMessage(
        <TextDefault>
          Well Done! Your answer is <TextDefault style={{ color: '#8CDA00' }}>CORRECT!</TextDefault>
        </TextDefault>
      )
    } else {
      setOverlayMessage(
        <TextDefault>
          Sorry! The correct answer is <TextDefault style={{ color: '#EB1100' }}>{rightAnswer.name}.</TextDefault>
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

  // SUBMIT GAME
  const submitGameHandler = () => {
    setIsLastOverlay(true)
    // Check if score is top 10 from their number of questions (10/20/30)
    if (true) {
      setOverlayMessage(
        <View>
          <TextDefault>
            Number of correct answers: {numberOfCorrectAnswers}/{numberOfQuestions} in {seconds} seconds!
          </TextDefault>
          <TextDefault>
            Well done, you are top 10 in the scoreboard. Please write your name below:
          </TextDefault>
        </View>
      )
    } else {
      setOverlayMessage(
        <View>
        <TextDefault>
          Number of correct answers: {numberOfCorrectAnswers}/{numberOfQuestions} in {seconds} seconds!
        </TextDefault>
        <TextDefault>
          Sorry, you couldn't make into the top 10. Try again.
      </TextDefault>
        </View>
      )

    }
  }

  // SUBMIT SCORE
  const submitScore = (playerName) => {
    // console.log(playerId, playerName, numberOfCorrectAnswers, numberOfQuestions, seconds, date);
    //id, userName, rightNum, totalNum, time, date
    dispatch(quizActions.addScore(playerId, playerName, numberOfCorrectAnswers, numberOfQuestions, seconds, date))
    setIsOverlayVisible(false)
    props.navigation.navigate('Quiz')
  }
  useEffect(() => {
    console.log(scores);
  }, [scores])

  // PLAY AGAIN
  const playAgainHandler = () => {
    setIsLastOverlay(false)
    setRandomisedCountries(0)
    setNumberOfCorrectAnswers(0)
    setSeconds(0)
    setIsOverlayVisible(false)
    setQuestionNumber(0)
    setIsGameOn(true)
  }
  
  return (
    <View style={styles.screen}>
      <GameOverlay
        isVisible={isOverlayVisible}
        overlayMessage={overlayMessage}
        isLastOverlay={isLastOverlay}
        // isLastOverlay={true}
        title={(questionNumber + 1) === numberOfQuestions ? "See Score" : "Next Question"}
        submitHandler={(questionNumber + 1) === numberOfQuestions ? () => submitGameHandler() : () => submitAnswerHandler()}
        submitScore={(playerName) => submitScore(playerName)}
      />
      <View style={styles.topBar}>
        <AntDesign name="arrowleft" size={30} color="#fff" onPress={() => exitHandler()} />
        <TextDefault style={styles.text}>
          Question {questionNumber + 1} / {numberOfQuestions}
        </TextDefault>
        <TextDefault style={styles.text}>
          {seconds} seconds
        </TextDefault>
      </View>
      { randomisedCountries < 1
        ? <CustomActivityIndicator />
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
    justifyContent: 'space-between',
    backgroundColor: Colors.primaryColorDark,
    alignItems: "center"
  },
  text: {
    color: '#fff',
    fontSize: 18
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