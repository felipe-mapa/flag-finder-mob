import {
    ADD_COUNTRY,
    UNSET_COUNTRIES,
    ADD_SCORE
} from '../actions/quizAction';

const initialState = {
    countriesUsed: [],
    topScores: [],
};

export default (state = initialState, action) => {
    switch (action.type) {
        case ADD_COUNTRY:
            return {
                ...state,
                countriesUsed: state.countriesUsed.concat(action.countryId)
            }
        case UNSET_COUNTRIES:
            return {
                ...state,
                countriesUsed: []
            }
        case ADD_SCORE:
            return {
                ...state,
                topScores: state.topScores.concat(action.score)
            }
        default:
            return state
    }
}

