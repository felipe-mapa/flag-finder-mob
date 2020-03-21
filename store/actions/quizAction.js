import { Alert, BackHandler } from 'react-native';
import Score from '../../models/score'

export const ADD_COUNTRY = 'SET_COUNTRY'
export const UNSET_COUNTRIES = 'UNSET_COUNTRIES'
export const ADD_SCORE = 'ADD_SCORE'

export const addCountry = (id) => {
    dispatch({ type: ADD_COUNTRY, countryId: id })
}

export const unsetCountries = () => {
    dispatch({ type: UNSET_COUNTRIES })
}

export const addScore = (id, userName, rightNum, totalNum, time) => {
    const score = [];

    score = (
        new Score(
            id,
            userName,
            rightNum,
            totalNum,
            time
        )
    );
    dispatch({ type: ADD_SCORE, score: score })

}