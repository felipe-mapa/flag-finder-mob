import React, { useEffect, useState, useCallback } from 'react';
import { ScrollView, Dimensions, View, Image, StatusBar, StyleSheet } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { showMessage } from "react-native-flash-message";
import { LinearGradient } from 'expo-linear-gradient';

import InputTag from '../components/inputTag'
import TagList from '../components/tagList'
import * as countriesActions from '../store/actions/countriesAction';
import Colors from '../components/layout/Colors'
import Heading from '../components/layout/topHeader'

const SearchContainer = (props) => {
    const [tagsList, setTagsList] = useState([])
    const [newTag, setNewTag] = useState('')
    const [isSubmitted, setIsSubmitted] = useState(false)
    const [filteredCountries, setFilteredCountries] = useState([])

    const countries = useSelector(state => state.countries.loadedCountries);
    const dataTags = useSelector(state => state.countries.loadedTags);
    const tags = useSelector(state => state.countries.tagsFilter);
    const dataCountriesName = useSelector(state => state.countries.loadedCountries).map(c => c.name)
    const dataContinentsName = useSelector(state => state.countries.loadedContinents).map(c => c.name)
    const dispatch = useDispatch();

    // REMOVE TAG
    const removeTag = id => {
        delTagHandler(id)
        setTagsList(currentTags => {
            return currentTags.filter(tag => tag.id !== id)
        })
    }

    // ADD TAG
    const addTagHandler = useCallback((id) => {
        dispatch(countriesActions.addTag(id))
    }, [dispatch])

    // DELETE TAG
    const delTagHandler = useCallback((id) => {
        dispatch(countriesActions.delTag(id))
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
    useEffect(() => {
        if (isSubmitted) {
            let errorMessage = ''
            let isValid = true
            if (newTag.length > 0) {
                // Check if contains signs
                if (!newTag.match("^[a-zA-Z0-9- ]+$")) {
                    isValid = false
                    errorMessage = 'Must be letters and/or numbers'
                } else {
                    // Check if it's longer than (2)
                    if (newTag.length < 3) {
                        isValid = false
                        errorMessage = 'Must be more than 2 letters'
                    } else {
                        // Capitalize input
                        let capitalizedTag = capitalize(newTag).trim()

                        // Check if already added
                        if (tagsList.find(t => t.tag === capitalizedTag)) {
                            isValid = false
                            errorMessage = 'Characteristic already added'
                        } else {
                            // Check if is in database
                            if (!dataTags.find(t => t.name === capitalizedTag)) {
                                // Check if is continent name
                                if (dataContinentsName.find(t => t === capitalizedTag)) {
                                    isValid = true
                                    errorMessage = ''
                                } else {
                                    // Check if is country name
                                    if (dataCountriesName.find(t => t === capitalizedTag)) {
                                        isValid = true
                                        errorMessage = ''
                                        //console.log(dataCountriesName.find(t => t === capitalizedTag));
                                    } else {
                                        isValid = false
                                        errorMessage = 'Characteristic not found on our database'
                                    }
                                }
                            }
                        }
                    }
                }
                submitHandler(errorMessage, isValid)
                setIsSubmitted(false)
            } else {
                isValid = true
                errorMessage = ''
            }
        }
    }, [newTag, isSubmitted])

    const errorMessageHandler = () => {
        props.navigation.navigate('Contact')
    }

    // ADD TAG TO ARRAY
    const submitHandler = (errorMessage, isValid) => {
        if (!isValid && errorMessage.length > 0) {
            if(errorMessage === 'Characteristic not found on our database') {
                showMessage({
                    message: errorMessage,
                    type: "danger",
                    description: 'Click here to suggest a tag',
                    duration: 6850,
                    onPress: errorMessageHandler
                    // autoHide: false
                });
            } else {
                showMessage({
                    message: errorMessage,
                    type: "danger",
                });
            }
            
        } else {
            if (isValid && newTag.length > 0) {
                // Add to Array 
                let capitalizedTag = capitalize(newTag).trim()
                let tagId = dataTags.filter(t => t.name === capitalizedTag)
                let mainId = dataTags.find(t => t.name === capitalizedTag) ? tagId[0].id : capitalizedTag

                setTagsList([...tagsList, { tag: capitalizedTag, id: mainId }])
                addTagHandler(mainId)
                setNewTag('')
            }
        }
    }

    capitalize = (str) => {
        var splitStr = str.toLowerCase().split(' ');
        for (var i = 0; i < splitStr.length; i++) {
            splitStr[i] = splitStr[i].charAt(0).toUpperCase() + splitStr[i].substring(1);
        }
        // Directly return the joined string
        return splitStr.join(' ');
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
        //console.log(countries);
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
                        setHeading("Filtered Flags")
                    }
                }
            }
        }
    }, [tags, filteredCountries, props.countriesAreLoaded])

    return (
        <View>
            <StatusBar backgroundColor="blue" barStyle="light-content" />
            <LinearGradient
                colors={[Colors.primaryColorLight, Colors.primaryColorLight, Colors.greyLight]}
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
                            submitted={() => setIsSubmitted(true)}
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
                                        key={tag.id}
                                        removeTag={removeTag.bind(this, tag.id)}
                                    >
                                        {tag.tag}
                                    </TagList>
                                ))}
                            </ScrollView>
                        </ScrollView>
                        <Heading>{heading}</Heading>
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