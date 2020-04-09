import { Alert, BackHandler } from 'react-native';
import Score from '../../models/score'

import { insertScore, deleteScore, fetchScores } from '../database/db'

export const SET_SCORES = 'SET_SCORES'
export const ADD_SCORE = 'ADD_SCORE'
export const DEL_SCORE = 'DEL_SCORE'

export const loadScores = () => {
    return async dispatch => {
        try {
            const dbScoresResult = await fetchScores();
            dispatch({ type: SET_SCORES, scores: dbScoresResult.rows._array });
        } catch (err) {
            throw err;
        }
    };
};

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
            await insertScore(id, userName, totalScore, totalNum, time, date)
            dispatch({ type: ADD_SCORE, score: score })
        } catch (err) {
            throw err
        }
    }

}

export const delScore = (playerId) => {
    return async dispatch => {
        try {
            await deleteScore(playerId)
            dispatch({ type: DEL_SCORE, playerId: playerId })
        } catch (err) {
            throw err
        }
    }

}
