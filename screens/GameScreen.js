import React, { useState, useEffect, useMemo } from 'react';
import { useSelector, useDispatch } from 'react-redux'
import { StyleSheet, View, Alert, StatusBar } from 'react-native'
import { AntDesign } from '@expo/vector-icons';
import { useStopwatch } from 'react-timer-hook';

import Colors from '../components/layout/Colors'
import TextDefault from '../components/layout/TextDefault';
import CustomActivityIndicator from '../components/CustomActivityIndicator'
import * as quizActions from '../store/actions/quizAction'
import GameDisplay from '../containers/GameDisplay'
import GameOverlay from '../components/GameOverlay';
import { Image } from 'react-native';

  const getRandomId = () => {
    var S4 = function () {
      return (((1 + Math.random()) * 0x10000) | 0).toString(16).substring(1);
    };
    return S4() + S4() + "-" + S4() + "-" + S4() + "-" + S4() + "-" + S4() + S4() + S4();
  }

const GameScreen = (props) => {
  const [questionNumber, setQuestionNumber] = useState(0)
  const [numberOfCorrectAnswers, setNumberOfCorrectAnswers] = useState(0)
  const [isLastOverlay, setIsLastOverlay] = useState(false)
  const [isOverlayVisible, setIsOverlayVisible] = useState(false)
  const [overlayMessage, setOverlayMessage] = useState()
  const [isHighScore, setIsHighScore] = useState(false)
  const [gameId, setGameId] = useState('')

  const numberOfQuestions = props.navigation.state.params.numberOfQuestions

  const {start, pause, reset, seconds, minutes, hours} = useStopwatch({autostart: false})

  const secondsPassed = useMemo(()=> {
    return seconds + minutes * 60 + hours * 60
  },[seconds, minutes, hours])

  // useSelector
  const countries = useSelector(state => state.countries.loadedCountries)
  const scores = useSelector(state => state.quiz.topScores)
  const dispatch = useDispatch();

  const date = useMemo(() => {
    var today = new Date();
    var dd = today.getDate();
    var mm = today.getMonth() + 1;

    var yy = today.getYear();
    if (dd < 10) {
      dd = '0' + dd;
    }
    if (mm < 10) {
      mm = '0' + mm;
    }
    if (yy > 100) {
      yy = yy - 100
    }
    var today = dd + '/' + mm + '/' + yy;

    return today;
  }, [])

  const randomisedCountries = useMemo(() => {
    if (countries.length === 0) {
      return []
    }

    if (gameId === '') {
      return [];
    }

    let countryList = []
    let canBeOptions = countries

    for (x = 0; x < numberOfQuestions; x++) {
      const randomCountry = Math.floor(Math.random() * canBeOptions.length);
      const newCountry = canBeOptions[randomCountry]

      // needs a callback to see the effect :/
      Image.prefetch(newCountry.imageUrl, () => {
        countryList = [...countryList, newCountry.slug]
        canBeOptions = canBeOptions.filter(val => val.slug !== newCountry.slug)
      })
    }

    return countryList;
  }, [countries, gameId])

  useEffect(() => {
    if (randomisedCountries === 0) {
      return;
    }
    if (gameId !== '') {
      return;
    }
    start()
    setGameId(getRandomId())
  }, [gameId, randomisedCountries])

  // EXIT
  const exitHandler = () => {
    if (isLastOverlay) {
      //props.navigation.goBack()
    } else {
      pause()
      Alert.alert(
        'Are you sure you want to leave?',
        'The game will not be saved',
        [
          { text: 'Stay', onPress: start, style: 'cancel' },
          { text: 'Leave', onPress: () => props.navigation.goBack() },
        ],
        { onDismiss: start }
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
    pause()
    setIsOverlayVisible(true)
  }

  //SUBMIT ANSWER
  const submitAnswerHandler = () => {
    setIsOverlayVisible(false)
    start()
    setQuestionNumber(questionNumber + 1)
  }

  // CHECK IF SCORE IS TOP 10
  const checkIfTopTen = () => {
    const topScores = scores.map(c => c.totalNum === numberOfQuestions ? c : null).filter(el => el != null)
    var isTopTen
    // CHECK IF SCORE IS 0
    if (numberOfCorrectAnswers < 1) {
      isTopTen = false
    } else {
      // CHECK IF THERE IS 10 POSITIONS TAKEN
      if (topScores.length < 10) {
        isTopTen = true
      } else {
        isTopTen = topScores.find(c => {
          // check if number is higher
          if (numberOfCorrectAnswers > c.totalScore) {
            return true
          } else {
            // Check for time
            if (numberOfCorrectAnswers === c.totalScore && secondsPassed < c.time) {
              return true
            } else {
              return false
            }
          }
        })
        if (isTopTen) {
          const topScoresNumberScore = topScores.map(s => s.totalScore)
          const lowestScore = Math.min(...topScoresNumberScore)
          const lowestScoresPlayers = topScores.map(s => s.totalScore === lowestScore ? s : null).filter(el => el != null)
          let playerIdToDelete
          if (lowestScoresPlayers.length === 1) {
            playerIdToDelete = lowestScoresPlayers[0].playerId
          } else {
            const topScoresNumberSeconds = lowestScoresPlayers.map(s => s.time)
            const highestTime = Math.max(...topScoresNumberSeconds)
            const highestTimePlayers = lowestScoresPlayers.map(s => s.time === highestTime ? s : null).filter(el => el != null)
            playerIdToDelete = highestTimePlayers[0].playerId
          }
          dispatch(quizActions.delScore(playerIdToDelete))
        }

      }
    }


    submitGameHandler(isTopTen)
  }

  // SUBMIT GAME
  const submitGameHandler = (isTopTen) => {
    setIsLastOverlay(true)
    // Check if score is top 10 from their number of questions (10/20/30)
    if (isTopTen) {
      setOverlayMessage(
        <View>
          <TextDefault>
            Number of correct answers: {numberOfCorrectAnswers}/{numberOfQuestions} in {secondsPassed} seconds!
          </TextDefault>
          <TextDefault>
            Well done, you are top 10 in the scoreboard. Please write your name below:
          </TextDefault>
        </View>
      )
      setIsHighScore(true)
    } else {
      setOverlayMessage(
        <View>
          <TextDefault>
            Number of right answers: {numberOfCorrectAnswers}/{numberOfQuestions} in {secondsPassed} seconds!
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
    //id, userName, totalScore, totalNum, time, date
    dispatch(quizActions.addScore(getRandomId(), playerName, numberOfCorrectAnswers, numberOfQuestions, secondsPassed, date))
    setIsOverlayVisible(false)
    goToMenu()
  }

  // PLAY AGAIN
  const playAgainHandler = () => {
    reset()
    setIsLastOverlay(false)
    setNumberOfCorrectAnswers(0)
    setIsOverlayVisible(false)
    setQuestionNumber(0)
    setGameId('')
    setIsHighScore(false)
  }

  // GO TO MENU
  const goToMenu = () => {
    props.navigation.navigate('Quiz')
  }

  return (
    <View style={styles.screen}>
      <StatusBar backgroundColor={Colors.primaryColor} />
      <GameOverlay
        isVisible={isOverlayVisible}
        overlayMessage={overlayMessage}
        isLastOverlay={isLastOverlay}
        title={(questionNumber + 1) === numberOfQuestions ? "See Score" : "Next Question"}
        submitHandler={(questionNumber + 1) === numberOfQuestions ? () => checkIfTopTen() : () => submitAnswerHandler()}
        submitScore={(playerName) => submitScore(playerName)}
        isHighScore={isHighScore}
        playAgain={playAgainHandler}
        goToMenu={goToMenu}
      />
      <View style={styles.topBar}>
        <AntDesign name="arrowleft" size={30} color="#fff" onPress={exitHandler} />
        <TextDefault style={styles.title}>
          Question {questionNumber + 1} / {numberOfQuestions}
        </TextDefault>
        <TextDefault style={styles.timer}>
          {Math.floor(secondsPassed)} seconds
        </TextDefault>
      </View>
      {randomisedCountries.length === 0
        ? <CustomActivityIndicator />
        :
        <GameDisplay
          onLoadStart={pause}
          onLoadEnd={start}
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
    padding: 10,
    flexDirection: 'row',
    backgroundColor: Colors.primaryColor,
    alignItems: "center"
  },
  title: {
    color: '#fff',
    fontSize: 18,
    marginLeft: 10
  },
  timer: {
    flex: 1, 
    color: '#fff',
    fontSize: 18,
    textAlign: 'right'
  }
})

GameScreen.navigationOptions = () => {
  return {
    headerTitle: 'Flag Quiz',
    headerTintColor: 'white',
    headerStyle: {
      backgroundColor: Colors.primaryColor,
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