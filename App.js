import React, { useState } from 'react';
import { AppLoading } from 'expo'
import * as Font from 'expo-font'
import ReduxThunk from 'redux-thunk';
import { createStore, combineReducers, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import FlashMessage from "react-native-flash-message";

import countriesReducer from './store/reducers/countriesReducer';
import Navigator from './navigation/Navigator'
import { init } from './helpers/db'

// LOAD DATABASE
init()

//LOAD STORE
const rootReducer = combineReducers({
  countries: countriesReducer
});

const store = createStore(rootReducer, applyMiddleware(ReduxThunk));

const fetchFonts = () => {
  return Font.loadAsync({
    'comfortaa': require('./assets/fonts/Comfortaa-Regular.ttf'),
    'comfortaa-bold': require('./assets/fonts/Comfortaa-Bold.ttf'),
    'comfortaa-light': require('./assets/fonts/Comfortaa-Light.ttf')
  })
}

const App = () => {
  //LOAD FONT
  const [fontLoaded, setFontLoaded] = useState(false)
  if (!fontLoaded) {
    return (
      <AppLoading
        startAsync={fetchFonts}
        onFinish={() => setFontLoaded(true)}
      />
    )
  }

  return (
    <Provider store={store}>
      <Navigator />
      <FlashMessage position="top" />
    </Provider>
  );
}

export default App