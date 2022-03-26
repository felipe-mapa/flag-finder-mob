import React, { useEffect, useState, useCallback } from 'react';
import { ScrollView, Dimensions, View, Image, StyleSheet, Keyboard } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { showMessage } from "react-native-flash-message";
import { LinearGradient } from 'expo-linear-gradient';

import InputTag from '../components/InputTag'
import TagList from '../components/TagList'
import * as countriesActions from '../store/actions/countriesAction';
import Colors from '../components/layout/Colors'
import SearchHeading from '../components/layout/MainHeading'

const SearchContainer = (props) => {
    const [tagsList, setTagsList] = useState([])
    const [newTag, setNewTag] = useState('')
    const [filteredCountries, setFilteredCountries] = useState([])

    const countries = useSelector(state => state.countries.loadedCountries);
    const dataTags = useSelector(state => state.countries.loadedTags);
    const tags = useSelector(state => state.countries.tagsFilter);
    const dispatch = useDispatch();

    // REMOVE TAG
    const removeTag = slug => {
        delTagHandler(slug)
        setTagsList(currentTags => {
            return currentTags.filter(tag => tag.slug !== slug)
        })
    }

    // ADD TAG
    const addTagHandler = useCallback((slug) => {
        dispatch(countriesActions.addTag(slug))
    }, [dispatch])

    // DELETE TAG
    const delTagHandler = useCallback((slug) => {
        dispatch(countriesActions.delTag(slug))
    }, [dispatch])

    // CHANGE TAG NAME
    const changeHandler = enteredText => {
        setNewTag(enteredText)
    }

    // LOAD TAGS
    useEffect(() => {
        loadTags()
    }, [])
    const loadTags = useCallback(async () => {
        try {
            await dispatch(countriesActions.fetchTags());
        } catch (err) {
            throw err
        }
    }, [dispatch]);

    // LOAD CONTINENTS
    useEffect(() => {
        loadContinents()
    }, [])
    const loadContinents = useCallback(async () => {
        try {
            await dispatch(countriesActions.fetchContinents());
        } catch (err) {
            throw err
        }
    }, [dispatch]);

    // TEXT VALIDATION
    const onSubmitHandler = () => {
        if (newTag.length === 0) {
            onSubmit('', true)
            return
        }

        // Check if it's only letters and numbers
        if (!newTag.match("^[a-zA-Z0-9- ]+$")) {
            onSubmit('Must be letters and/or numbers', false)
            return
        } 

        // Check if it's longer than (2)
        if (newTag.length < 3) {
            onSubmit('Must be more than 2 letters', false)
            return
        } 

        const trimmedTag = newTag.toLowerCase().trim()

        // Check if already added
        if (tagsList.find(t => t.name.toLowerCase() === trimmedTag)) {
            onSubmit('Characteristic already added', false)
            return
        }

        if (!dataTags.find(t => t.name.toLowerCase() === trimmedTag)) {
            onSubmit('Characteristic not found on our database', false)
            return
        } 

        onSubmit('', true)
    }

    const errorMessageHandler = () => {
        props.navigation.navigate('Contact')
    }

    // ADD TAG TO ARRAY
    const onSubmit = (errorMessage, isValid) => {
        if (newTag.length === 0) {
            Keyboard.dismiss()
            return
        }

        if (isValid) {
            // Add to Array 
            const trimmedTag = newTag.toLowerCase().trim();
            const tagFound = dataTags.find(t => t.name.toLowerCase() === trimmedTag);

            if(tagFound) {
                setTagsList(prevState=>[...prevState, tagFound])
                addTagHandler(tagFound.slug)
            }

            setNewTag('')
            return
        }


        if (errorMessage.length > 0) {
            if(errorMessage === 'Characteristic not found on our database') {
                showMessage({
                    message: errorMessage,
                    type: "danger",
                    description: 'Click here to suggest a tag',
                    duration: 6850,
                    onPress: errorMessageHandler
                    // autoHide: false
                });
                return 
            } 

            showMessage({
                message: errorMessage,
                type: "danger",
            });

            return
        }
    }

    // FILTER COUNTRIES
    useEffect(() => {
        if (tags.length > 0) {
            setFilteredCountries(
                countries.map(country => {
                    if (tags.every(tag => country.tags.indexOf(tag) > -1)) {
                        return country
                    } else {
                        null
                    }
                }).filter(el => el != null)
            )
        } else {
            setFilteredCountries(countries)
        }
    }, [countries, tags])

    // HEADER
    const [heading, setHeading] = useState("Loading")

    useEffect(() => {
        if(!props.countriesAreLoaded){
            setHeading("Loading Flags")
        } else {
            if (filteredCountries.length === 1) {
                setHeading("Flag Found")
            } else {
                if (tags.length < 1) {
                    setHeading("All Flags")
                } else {
                    if (filteredCountries.length === 0) {
                        setHeading("Not Found")
                    } else {
                        setHeading("Filtered Flags - "+filteredCountries.length)
                    }
                }
            }
        }
    }, [tags, filteredCountries, props.countriesAreLoaded])

    return (
        <View>
            <LinearGradient
                colors={[Colors.secondaryColor, Colors.secondaryColor, Colors.greyLight]}
                style={styles.screen}
                start={{ x: 1, y: 0 }}
                end={{ x: 1, y: 1 }}
            >
                <View style={styles.screen}>
                    <View style={styles.imgContainer}>
                        <Image source={require('../assets/flagFinder.png')} style={styles.titleImage} resizeMode='contain' />
                    </View>
                    <View style={styles.container}>
                            <InputTag
                            change={changeHandler.bind(this)}
                            value={newTag}
                            submitted={onSubmitHandler}
                            dataTags={dataTags}
                            loaded={props.countriesAreLoaded }
                        />

                        <ScrollView style={styles.listContainer}>
                            <ScrollView
                                horizontal={true}
                                contentContainerStyle={styles.list}
                            >
                                {tagsList.map(tag => (
                                    <TagList
                                        key={tag.slug}
                                        removeTag={removeTag.bind(this, tag.slug)}
                                    >
                                        {tag.name}
                                    </TagList>
                                ))}
                            </ScrollView>
                        </ScrollView>
                        <SearchHeading>{heading}</SearchHeading>
                    </View>
                </View>
            </LinearGradient>
        </View>
    );
}

const containerHeight = Dimensions.get("window").height * 0.37

const styles = StyleSheet.create({
    screen: {
        width: '100%',
        height: containerHeight
    },
    container: {
        flex: 1,
        paddingHorizontal: 20,
    },
    listContainer: {
        minHeight: containerHeight * .15,
        maxHeight: containerHeight * .3,
    },
    list: {
        flex: 1,
        flexWrap: "wrap",
        flexDirection: "row"
    },
    imgContainer: {
        flex: 1,
        width: Dimensions.get("window").width * .9,
        maxHeight: containerHeight * .3,
        paddingTop: 35,
        flexDirection: 'column',
        alignItems: 'center',
        alignSelf: 'center'
    },
    titleImage: {
        width: "100%",
        height: '100%',
        alignSelf: 'center'
    }
})

export default SearchContainer;