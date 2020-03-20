import {
    SET_COUNTRIES,
    SET_COUNTRY,
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
    loadedFullCountry: [],
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
        case SET_COUNTRY:
            return {
                ...state,
                loadedFullCountry: state.loadedFullCountry.concat(action.country)
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
                tagsFilter: state.tagsFilter.concat(action.tagId)
            }
        case DEL_TAG:
            return {
                ...state,
                tagsFilter: state.tagsFilter.filter(item => item !== action.tagId)
            }
        case SET_FAV:
            return {
                ...state,
                favoriteCountries: action.favorites.map(fav => fav.countryId)
            }
        case ADD_FAV:
            return {
                ...state,
                favoriteCountries: state.favoriteCountries.concat(action.countryId)
            }
        case DEL_FAV:
            const updatedFavCountries = [...state.favoriteCountries]
            return {
                ...state,
                favoriteCountries: updatedFavCountries.filter(item => item !== action.countryId)
            }
        default:
            return state
    }
}

