import React, { useEffect, useState } from 'react';
import { StyleSheet, View, Image, FlatList, Dimensions, ScrollView } from 'react-native';
import { useSelector } from 'react-redux';
import { Button } from 'react-native-elements'

import Colors from '../components/layout/Colors'
import CustomActivityIndicator from '../components/customActivityIndicator'
import Banner from './banner';

const CountryInfoScreen = props => {
    // SELECTORS
    const countries = useSelector(state => state.countries.loadedCountries)

    const selectedCountry = countries.find(c => c.id === props.country)
    const [countryOptions, setCountryOptions] = useState([])
    const [countryPressed, setCountryPressed] = useState('')

    // SET OPTIONS
    useEffect(() => {
        let canBeOptions = countries.filter(c => selectedCountry.id !== c.id).map(c => c.name)
        let newCountriesOptions = [selectedCountry.name]

        for (x = 0; x < 3; x++) {
            newCountriesOptions = newCountriesOptions.concat(canBeOptions[Math.floor(Math.random() * canBeOptions.length)])
            canBeOptions = canBeOptions.filter(val => !newCountriesOptions.includes(val))
        }

        // SHUFFLE ARRAY
        for (var i = newCountriesOptions.length - 1; i > 0; i--) {
            var j = Math.floor(Math.random() * (i + 1));
            var temp = newCountriesOptions[i];
            newCountriesOptions[i] = newCountriesOptions[j];
            newCountriesOptions[j] = temp;
        }
        setCountryOptions(newCountriesOptions)
    }, [selectedCountry])

    const submitAnswerHandler = () => {
        props.submitAnswer(countryPressed, selectedCountry)

        setCountryPressed('')
    }

    return (
        <ScrollView style={styles.container}>
            <View style={styles.block}>
                <View style={styles.imageContainer}>
                    <Image style={styles.image} source={{ uri: selectedCountry.flag }} />
                </View>
                {countryOptions.length > 0 ? (
                    <View style={styles.buttonGroupContainer}>
                        <FlatList
                            keyExtractor={item => item}
                            data={countryOptions}
                            extraData={countryPressed}
                            renderItem={itemData => {
                                return (
                                    <Button
                                        type="solid"
                                        title={itemData.item}
                                        onPress={() => setCountryPressed(itemData.item)}
                                        buttonStyle={{
                                            backgroundColor: countryPressed === itemData.item ? Colors.primaryColorDark : Colors.primaryColorLight,
                                            marginVertical: 10
                                        }}
                                        titleStyle={{
                                            fontSize: 18,
                                            color: countryPressed === itemData.item ? '#fff' : Colors.primaryColorDark
                                        }}
                                    />
                                )
                            }
                            }
                        />
                    </View>
                ) : (
                        <CustomActivityIndicator />
                    )}
                <View style={styles.buttonContainer}>
                    <Button
                        type="solid"
                        title="Submit Answer"
                        onPress={() => submitAnswerHandler()}
                        buttonStyle={{
                            backgroundColor: Colors.primaryColor,
                            marginBottom: 20
                        }}
                        disabled={countryPressed === '' ? true : false}
                        titleStyle={{ fontSize: 18 }}
                    />
                    <Banner />
                </View>
            </View>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    block: {
        paddingHorizontal: '7%',
    },
    container: {
        height: '100%',
        display: 'flex'
    },
    imageContainer: {
        flex: 1,
        width: Dimensions.get("window").width * 0.86,
        height: Dimensions.get("window").width * 0.5,
        marginTop: 10
    },
    image: {
        flex: 1,
        width: "100%",
        height: "100%",
        resizeMode: 'stretch'
    },
    buttonGroupContainer: {
        marginVertical: 20,
    },
    buttonContainer: {
        alignItems: 'center',
        height: "100%",
    }
})

export default CountryInfoScreen