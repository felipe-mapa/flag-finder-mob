import {
    ADD_SCORE
} from '../actions/quizAction';

const initialState = {
    topScores: [],
};

export default (state = initialState, action) => {
    switch (action.type) {
        case ADD_SCORE:
            return {
                ...state,
                topScores: state.topScores.concat(action.score)
            }
        default:
            return state
    }
}

