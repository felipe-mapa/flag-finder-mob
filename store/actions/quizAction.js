import { Alert, BackHandler } from 'react-native';
import Score from '../../models/score'

export const ADD_SCORE = 'ADD_SCORE'
export const DEL_SCORE = 'DEL_SCORE'
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

export const addScore = (id, userName, totalScore, totalNum, time, date) => {
    const score = [];

    score.push(
        new Score(
            id,
            userName,
            totalScore,
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

export const delScore = (id) => {
    return async dispatch => {
        try {
            dispatch({ type: DEL_SCORE, id: id })
        } catch (err) {
            throw err
        }
    }

}