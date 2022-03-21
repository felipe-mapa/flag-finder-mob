import {
    SET_COUNTRIES,
    SET_TAGS,
    SET_CONTINENTS,
    ADD_TAG,
    DEL_TAG,
    ADD_FAV,
    DEL_FAV,
    SET_FAV
} from '../actions/countriesAction';

const initialState = {
    loadedCountries: [],
    loadedTags: [],
    loadedContinents: [],
    tagsFilter: [],
    favoriteCountries: []
};

export default (state = initialState, action) => {
    switch (action.type) {
        case SET_COUNTRIES:
            return {
                ...state,
                loadedCountries: state.loadedCountries.concat(action.countries)
            }
        case SET_TAGS:
            return {
                ...state,
                loadedTags: state.loadedTags.concat(action.tags)
            }
        case SET_CONTINENTS:
            return {
                ...state,
                loadedContinents: state.loadedContinents.concat(action.continents)
            }
        case ADD_TAG:
            return {
                ...state,
                tagsFilter: state.tagsFilter.concat(action.tagSlug)
            }
        case DEL_TAG:
            return {
                ...state,
                tagsFilter: state.tagsFilter.filter(item => item !== action.tagSlug)
            }
        case SET_FAV:
            return {
                ...state,
                favoriteCountries: action.favorites.map(fav => fav.countrySlug)
            }
        case ADD_FAV:
            return {
                ...state,
                favoriteCountries: state.favoriteCountries.concat(action.countrySlug)
            }
        case DEL_FAV:
            const updatedFavCountries = [...state.favoriteCountries]
            return {
                ...state,
                favoriteCountries: updatedFavCountries.filter(item => item !== action.countrySlug)
            }
        default:
            return state
    }
}

