import Country from '../../models/country'
import BasicCountry from '../../models/basicCountry'
import Tag from '../../models/tag'
import Continent from '../../models/continent'
import { Alert, BackHandler } from 'react-native';

import { insertFav, deleteFav, fetchFavs } from '../../helpers/db'

export const SET_COUNTRIES = 'SET_COUNTRIES'
export const SET_COUNTRY = 'SET_COUNTRY'
export const SET_TAGS = 'SET_TAGS'
export const SET_CONTINENTS = 'SET_CONTINENTS'
export const ADD_TAG = 'ADD_TAG'
export const DEL_TAG = 'DEL_TAG'
export const FILTER_COUNTRIES = 'FILTER_COUNTRIES'
export const ADD_FAV = 'ADD_FAV'
export const DEL_FAV = 'DEL_FAV'
export const SET_FAV = 'SET_FAV'

const serverError = () => (
    Alert.alert(
        'Network request failed',
        "Sorry, we couldn't reach out to the server. Please make sure your internet is turned on.",
        [
            { text: 'Exit', onPress: () => BackHandler.exitApp() },
        ],
        { cancelable: false }
    )
)

export const fetchCountries = () => {
    return async dispatch => {
        try {
            // Load continets for countries
            const route = `http://felipepavanela78601.ipage.com/test/wp-json/wp/v2/continents/`;
            const response = await fetch(route)

            const resData = await response.json();
            const continents = [];

            if (response.ok) {
                for (const key in resData) {
                    continents.push(
                        new Continent(
                            resData[key].id,
                            resData[key].name
                        )
                    );
                }
            }

            // Load countries
            const route1 = `http://felipepavanela78601.ipage.com/test/wp-json/wp/v2/country/?per_page=100&page=1&order=asc&orderby=title`;
            const route2 = `http://felipepavanela78601.ipage.com/test/wp-json/wp/v2/country/?per_page=100&page=2&order=asc&orderby=title`;
            const route3 = `http://felipepavanela78601.ipage.com/test/wp-json/wp/v2/country/?per_page=100&page=3&order=asc&orderby=title`;
            const response1 = await fetch(route1)
            const response2 = await fetch(route2)
            const response3 = await fetch(route3)

            const resData1 = await response1.json();
            const resData2 = await response2.json();
            const resData3 = await response3.json();
            const loadedCountries = [];

            if (response1.ok) {
                for (const key in resData1) {
                    const conty = continents.filter(c => resData1[key].continents.includes(c.id))
                    const countryTags = resData1[key].countrytags.concat(resData1[key].title.rendered, conty[0].name)
                    loadedCountries.push(
                        new BasicCountry(
                            resData1[key].id,
                            resData1[key].title.rendered,
                            resData1[key].flag.guid,
                            resData1[key].continents,
                            resData1[key].maincolor,
                            countryTags,
                            resData1[key].slug
                        )
                    );
                }
            } else {
                console.log('error on response');
                { serverError }
            }
            if (response2.ok) {
                for (const key in resData2) {
                    const conty = continents.filter(c => resData2[key].continents.includes(c.id))
                    const countryTags = resData2[key].countrytags.concat(resData2[key].title.rendered, conty[0].name)
                    loadedCountries.push(
                        new BasicCountry(
                            resData2[key].id,
                            resData2[key].title.rendered,
                            resData2[key].flag.guid,
                            resData2[key].continents,
                            resData2[key].maincolor,
                            countryTags,
                            resData2[key].slug
                        )
                    );
                }
            } else {
                console.log('error on response');
                { serverError }
            }
            if (response3.ok) {
                for (const key in resData3) {
                    const conty = continents.filter(c => resData3[key].continents.includes(c.id))
                    const countryTags = resData3[key].countrytags.concat(resData3[key].title.rendered, conty[0].name)
                    loadedCountries.push(
                        new BasicCountry(
                            resData3[key].id,
                            resData3[key].title.rendered,
                            resData3[key].flag.guid,
                            resData3[key].continents,
                            resData3[key].maincolor,
                            countryTags,
                            resData3[key].slug
                        )
                        
                    );
                }
            } else {
                console.log('error on response');
                { serverError }
            }
            dispatch({ type: SET_COUNTRIES, countries: loadedCountries });
        } catch (err) {
            console.log('Network request failed on fetchCountries');
            { serverError }
            throw err
        }
    }
}

export const fetchCountry = (countryName) => {
    return async dispatch => {
        try {
            // Load continents for countries
            const contiRoute = `http://felipepavanela78601.ipage.com/test/wp-json/wp/v2/continents/`;
            const contiResponse = await fetch(contiRoute)

            const contiResData = await contiResponse.json();
            const continents = [];

            if (contiResponse.ok) {
                for (const key in contiResData) {
                    continents.push(
                        new Continent(
                            contiResData[key].id,
                            contiResData[key].name
                        )
                    );
                }
            }

            // Load country
            const route = `http://felipepavanela78601.ipage.com/test/wp-json/wp/v2/country/?slug=` + countryName;
            const response = await fetch(route)

            const resData = await response.json();
            const loadedFullCountry = [];

            if (response.ok) {
                for (const key in resData) {
                    const conty = continents.filter(c => resData[key].continents.includes(c.id))
                    const countryTags = resData[key].countrytags.concat(resData[key].title.rendered, conty[0].name)
                    loadedFullCountry.push(
                        new Country(
                            resData[key].id,
                            resData[key].title.rendered,
                            resData[key].flag.guid,
                            resData[key].capital,
                            resData[key].continents,
                            resData[key].population,
                            resData[key].hdi,
                            resData[key].year,
                            resData[key].meaning,
                            resData[key].mainColor,
                            parseFloat(resData[key].latitude),
                            parseFloat(resData[key].longitude),
                            countryTags,
                            resData[key].slug
                        )
                    );
                }
            } else {
                console.log('error on response');
            }
            dispatch({ type: SET_COUNTRY, country: loadedFullCountry });
        } catch (err) {
            console.log('Network request failed on fetchCountry');
            throw err
        }
    }
}

export const fetchTags = () => {
    return async dispatch => {
        try {
            const route1 = `http://felipepavanela78601.ipage.com/test/wp-json/wp/v2/countryTags/?per_page=100&page=1`;
            const route2 = `http://felipepavanela78601.ipage.com/test/wp-json/wp/v2/countryTags/?per_page=100&page=2`;
            const response1 = await fetch(route1)
            const response2 = await fetch(route2)

            const resData1 = await response1.json();
            const resData2 = await response2.json();
            const loadedTags = [];

            if (response1.ok) {
                for (const key in resData1) {
                    loadedTags.push(
                        new Tag(
                            resData1[key].id,
                            resData1[key].name,
                            resData1[key].slug
                        )
                    );
                }
            }else {
                console.log('error on response');
                { serverError }
            }
            if (response2.ok) {
                for (const key in resData2) {
                    loadedTags.push(
                        new Tag(
                            resData2[key].id,
                            resData2[key].name,
                            resData2[key].slug
                        )
                    );
                }
            }else {
                console.log('error on response');
                { serverError }
            }

            dispatch({ type: SET_TAGS, tags: loadedTags });

        } catch (err) {
            console.log('Network request failed on fetchTags');
            { serverError }
            throw err
        }
    }
}

export const fetchContinents = () => {
    return async dispatch => {
        try {
            const route = `http://felipepavanela78601.ipage.com/test/wp-json/wp/v2/continents/`;
            const response = await fetch(route)

            const resData = await response.json();
            const loadedContinents = [];

            if (response.ok) {
                for (const key in resData) {
                    loadedContinents.push(
                        new Continent(
                            resData[key].id,
                            resData[key].name
                        )
                    );
                }
            }

            dispatch({ type: SET_CONTINENTS, continents: loadedContinents });

        } catch (err) {
            console.log('Network request failed on fetchContinents');
            { serverError }
            throw err
        }
    }
}

export const addTag = (id) => {
    return {
        type: ADD_TAG,
        tagId: id
    }
}

export const delTag = (id) => {
    return {
        type: DEL_TAG,
        tagId: id
    }
}

export const addFavorite = (id) => {
    return async dispatch => {
        try {
            await insertFav(id)
            dispatch({ type: ADD_FAV, countryId: id })
        } catch (err) {
            throw err
        }
    }
}

export const delFavorite = (id) => {
    return async dispatch => {
        try {
            await deleteFav(id)
            dispatch({ type: DEL_FAV, countryId: id })
        } catch (err) {
            throw err
        }
    }
}

export const loadFavs = () => {
    return async dispatch => {
        try {
            const dbResult = await fetchFavs();
            dispatch({ type: SET_FAV, favorites: dbResult.rows._array });
        } catch (err) {
            throw err;
        }
    };
};