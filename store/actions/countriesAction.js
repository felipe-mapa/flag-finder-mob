import { Alert, BackHandler } from "react-native";

import { insertFav, deleteFav, fetchFavs } from "../database/db";
import { apiEndpoint } from "../../config/env";

export const SET_INITIAL_DATA = "SET_INITIAL_DATA";
export const ADD_TAG = "ADD_TAG";
export const DEL_TAG = "DEL_TAG";
export const FILTER_COUNTRIES = "FILTER_COUNTRIES";
export const ADD_FAV = "ADD_FAV";
export const DEL_FAV = "DEL_FAV";
export const SET_FAV = "SET_FAV";

const serverError = () =>
    Alert.alert(
        "Network request failed",
        "Sorry, we couldn't reach out to the server. Please make sure your internet is turned on.",
        [{ text: "Exit", onPress: () => BackHandler.exitApp() }],
        { cancelable: false }
    );

export const fetchAppData = (numberOfFetches = 0) => {
    return async (dispatch) => {
        try {
            const response = await fetch(apiEndpoint + "flagFinder/app");

            const data = await response.json();

            dispatch({ type: SET_INITIAL_DATA, ...data });
        } catch (error) {
            console.log('error', error.message)

            if (numberOfFetches < 3) {
                return fetchAppData(numberOfFetches + 1)()
            }

            throw err;
        }
    }
}

export const addTag = (tag) => {
    return {
        type: ADD_TAG,
        tag: tag,
    };
};

export const delTag = (slug) => {
    return {
        type: DEL_TAG,
        tagSlug: slug,
    };
};

export const addFavorite = (slug) => {
    return async (dispatch) => {
        try {
            await insertFav(slug);
            dispatch({ type: ADD_FAV, countrySlug: slug });
        } catch (err) {
            throw err;
        }
    };
};

export const delFavorite = (slug) => {
    return async (dispatch) => {
        try {
            await deleteFav(slug);
            dispatch({ type: DEL_FAV, countrySlug: slug });
        } catch (err) {
            throw err;
        }
    };
};

export const loadFavs = () => {
    return async (dispatch) => {
        try {
            const dbFavsResult = await fetchFavs();
            dispatch({ type: SET_FAV, favorites: dbFavsResult.rows._array });
        } catch (err) {
            throw err;
        }
    };
};
