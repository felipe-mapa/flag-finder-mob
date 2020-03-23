import { Alert, BackHandler } from 'react-native';
import Score from '../../models/score'

export const ADD_SCORE = 'ADD_SCORE'
export const SET_ID = 'SET_ID'

export const setId = () => {
    return async dispatch => {
        try {
            dispatch({ type: SET_ID })
        } catch (err) {
            throw err
        }
    }
}

export const addScore = (id, userName, rightNum, totalNum, time, date) => {
    const score = [];

    score.push(
        new Score(
            id,
            userName,
            rightNum,
            totalNum,
            time,
            date
        )
    );
    return async dispatch => {
        try {
            dispatch({ type: ADD_SCORE, score: score })
        } catch (err) {
            throw err
        }
    }

}