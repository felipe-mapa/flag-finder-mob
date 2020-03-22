import { Alert, BackHandler } from 'react-native';
import Score from '../../models/score'

export const ADD_SCORE = 'ADD_SCORE'

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
    return async dispatch => {
        try {
            dispatch({ type: ADD_SCORE, score: score })
        } catch (err) {
            throw err
        }
    }

}