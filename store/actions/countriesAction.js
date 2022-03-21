import Country from "../../models/country";
import Tag from "../../models/tag";
import Continent from "../../models/continent";
import { Alert, BackHandler } from "react-native";
import { getFirestore, collection, getDocs } from "firebase/firestore";

import { insertFav, deleteFav, fetchFavs } from "../database/db";

export const SET_COUNTRIES = "SET_COUNTRIES";
export const SET_TAGS = "SET_TAGS";
export const SET_CONTINENTS = "SET_CONTINENTS";
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

export const fetchCountries = () => {
    const firestore = getFirestore();
    const countriesRef = collection(firestore, "countries");

    return async (dispatch) => {
        try {
            const countries = await getDocs(countriesRef);

            const loadedCountries = [];

            countries.forEach(async (doc) => {
                const data = doc.data();
                const countryTags = [
                    ...data.tags,
                    ...data.continents,
                ];
                if(data.slug === 'brazil') {
                    console.log('data.continents', data.continents)
                }

                loadedCountries.push(
                    new Country(
                        data.name,
                        data.imageUrl,
                        data.capital,
                        data.continents,
                        data.population,
                        data.hdi,
                        data.year,
                        data.description,
                        data.mainColor,
                        parseFloat(data.latitude),
                        parseFloat(data.longitude),
                        countryTags,
                        data.slug
                    )
                );
            });

            dispatch({ type: SET_COUNTRIES, countries: loadedCountries });
        } catch (err) {
            console.log("Network request failed on fetchCountries");
            {
                serverError;
            }
            throw err;
        }
    };
};

export const fetchTags = () => {
    return async (dispatch) => {
        try {
            const firestore = getFirestore();
            const tagsRef = collection(firestore, "tags");
            const tags = await getDocs(tagsRef);

            const loadedTags = [];

            tags.forEach((doc) => {
                const data = doc.data();
                loadedTags.push(new Tag(data.name, data.slug));
            });

            dispatch({ type: SET_TAGS, tags: loadedTags });
        } catch (err) {
            console.log("Network request failed on fetchTags");
            {
                serverError;
            }
            throw err;
        }
    };
};

export const fetchContinents = () => {
    return async (dispatch) => {
        try {
            const firestore = getFirestore();
            const countriesRef = collection(firestore, "continents");
            const countries = await getDocs(countriesRef);

            const loadedContinents = [];

            countries.forEach((doc) => {
                const data = doc.data();

                loadedContinents.push(new Continent(data.name, data.slug));
            });

            dispatch({ type: SET_CONTINENTS, continents: loadedContinents });
        } catch (err) {
            console.log("Network request failed on fetchContinents");
            {
                serverError;
            }
            throw err;
        }
    };
};

export const addTag = (slug) => {
    return {
        type: ADD_TAG,
        tagSlug: slug,
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
