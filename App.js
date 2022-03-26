import React, { useState, useEffect } from 'react';
import AppLoading from 'expo-app-loading';
import * as Font from 'expo-font'
import ReduxThunk from 'redux-thunk';
import { createStore, combineReducers, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import { initializeApp } from 'firebase/app';
import FlashMessage from "react-native-flash-message";

import countriesReducer from './store/reducers/countriesReducer';
import quizReducer from './store/reducers/quizReducer';
import Navigator from './navigation/Navigator'
import { initFav, initScore } from './store/database/db'
import firebaseConfig from './config/firebaseConfig';

// FIREBASE
initializeApp(firebaseConfig);

// LOAD DATABASE
initFav()
initScore()

//LOAD STORE
const rootReducer = combineReducers({
  countries: countriesReducer,
  quiz: quizReducer
});

const store = createStore(rootReducer, applyMiddleware(ReduxThunk));

const App = () => {
  //LOAD FONT
  const [fontLoaded, setFontLoaded] = useState(false)
  
  useEffect(() => {
    let mounted = true;
    //FETCH FONT
    (async() =>{
      try{
        await Font.loadAsync({
          'comfortaa': require('./assets/fonts/Comfortaa-Regular.ttf'),
          'comfortaa-bold': require('./assets/fonts/Comfortaa-Bold.ttf'),
          'comfortaa-light': require('./assets/fonts/Comfortaa-Light.ttf')
        })

        if (mounted) {
          setFontLoaded(true)
        }
      } catch(err) {
        console.log(err)
        if (mounted) {
          setFontLoaded(true)
        }
      }
    })()

    return () => mounted =false
  }, [])

  if (!fontLoaded) {
    return <AppLoading />
  }


  return (
    <Provider store={store}>
      <Navigator />
      <FlashMessage position="top" />
    </Provider>
  );
}

export default App