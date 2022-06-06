import React from "react";
import AppLoading from "expo-app-loading";
import ReduxThunk from "redux-thunk";
import { createStore, combineReducers, applyMiddleware } from "redux";
import { Provider } from "react-redux";
import { initializeApp } from "firebase/app";
import FlashMessage from "react-native-flash-message";

import countriesReducer from "./store/reducers/countriesReducer";
import quizReducer from "./store/reducers/quizReducer";
import Navigator from "./navigation/Navigator";
import { initFav, initScore } from "./store/database/db";
import firebaseConfig from "./config/firebaseConfig";
import NotLoaded from "./components/NotLoaded";

import useLoadFont from "./hooks/useLoadFont";
import useFetchAppData from "./hooks/useFetchAppData";

// FIREBASE
initializeApp(firebaseConfig);

// LOAD DATABASE
initFav();
initScore();

//LOAD STORE
const rootReducer = combineReducers({
    countries: countriesReducer,
    quiz: quizReducer,
});

const store = createStore(rootReducer, applyMiddleware(ReduxThunk));

const AppWithProvider = () => {
    return (
        <Provider store={store}>
            <App />
        </Provider>
    );
};

const App = () => {
    const { isFontLoaded } = useLoadFont();
    const { status, refetch } = useFetchAppData();

    if (!isFontLoaded || status === "loading") {
        return <AppLoading />;
    }

    if (status === "error") {
        return <NotLoaded onPress={refetch} />;
    }

    return (
        <>
            <Navigator />
            <FlashMessage position='top' />
        </>
    );
};

export default AppWithProvider;
