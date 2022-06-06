import {
    SET_INITIAL_DATA,
    ADD_TAG,
    DEL_TAG,
    ADD_FAV,
    DEL_FAV,
    SET_FAV,
} from "../actions/countriesAction";

const initialState = {
    loadedCountries: [],
    loadedTags: [],
    loadedContinents: [],
    tagsFilter: [],
    favoriteCountries: [],
};

export default (state = initialState, action) => {
    switch (action.type) {
        case SET_INITIAL_DATA:
            return {
                ...state,
                loadedCountries: action.countries.map((country) => ({
                    ...country,
                    tags: [
                        ...country.tags,
                        ...country.continents.map((continent) => ({
                            name: continent.name,
                            slug: continent.slug,
                        })),
                        {
                            name: country.name,
                            slug: country.slug,
                        },
                    ],
                })),
                loadedContinents: action.continents,
                loadedTags: [
                    ...action.tags,
                    ...action.continents,
                    ...action.countries.map((country) => ({
                        name: country.name,
                        slug: country.slug,
                    })),
                ],
            };
        case ADD_TAG:
            return {
                ...state,
                tagsFilter: [...state.tagsFilter, action.tag],
            };
        case DEL_TAG:
            return {
                ...state,
                tagsFilter: state.tagsFilter.filter(
                    (item) => item.slug !== action.tagSlug
                ),
            };
        case SET_FAV:
            return {
                ...state,
                favoriteCountries: action.favorites.map(
                    (fav) => fav.countrySlug
                ),
            };
        case ADD_FAV:
            return {
                ...state,
                favoriteCountries: [
                    ...state.favoriteCountries,
                    action.countrySlug,
                ],
            };
        case DEL_FAV:
            const updatedFavCountries = [...state.favoriteCountries];
            return {
                ...state,
                favoriteCountries: updatedFavCountries.filter(
                    (item) => item !== action.countrySlug
                ),
            };
        default:
            return state;
    }
};
