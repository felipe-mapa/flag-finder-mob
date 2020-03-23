import {
    ADD_SCORE,
    SET_ID
} from '../actions/quizAction';

const initialState = {
    topScores: [],
    timesPlayed: 0,
};

export default (state = initialState, action) => {
    switch (action.type) {
        case ADD_SCORE:
            return {
                ...state,
                topScores: state.topScores.concat(action.score)
            }
        case SET_ID:
            return {
                ...state,
                timesPlayed: state.timesPlayed + 1
            }
        default:
            return state
    }
}

