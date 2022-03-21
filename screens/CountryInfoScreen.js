import React, { useEffect } from "react";
import { StyleSheet, View, Image, ScrollView, Dimensions } from "react-native";
import { HeaderButtons, Item } from "react-navigation-header-buttons";
import { useSelector, useDispatch } from "react-redux";
import MapView, { Marker } from "react-native-maps";
import { Tooltip, Text } from "react-native-elements";

import TextDefault from "../components/layout/TextDefault";
import SubHeading from "../components/layout/SubHeading";
import HeaderButton from "../components/layout/CustomHeaderButton";
import customMap from "../helpers/customMapStyle";
import Banner from "../components/Banner";
import * as countriesActions from "../store/actions/countriesAction";
import Colors from "../components/layout/Colors";

const CountryInfoScreen = (props) => {
    // COUNTRY
    const country = props.navigation.state.params.item;

    // SELECTORS
    const allTags = useSelector((state) => state.countries.loadedTags);
    const allContinents = useSelector(
        (state) => state.countries.loadedContinents
    );
    const fav = useSelector((state) => state.countries.favoriteCountries);
    const dispatch = useDispatch();

    // GET TAGS
    const countryTags = allTags
        .map((tag) => {
            if (country.tags.find((t) => t === tag.slug)) {
                return tag.name;
            } else {
                return null;
            }
        })
        .filter((el) => el != null);
    const outputTags = countryTags.join(", ");

    // GET CONTINENT
    const continent = allContinents
        .map((conty) => {
            if (country.continents.find((c) => c === conty.slug)) {
                return conty.name;
            } else {
                return null;
            }
        })
        .filter((el) => el != null);

    // GET MAP
    const mapRegion = {
        latitude: country.latitude,
        longitude: country.longitude,
        latitudeDelta: 80,
        longitudeDelta: 80,
    };

    // TOGGLE FAVORITES
    const toggleFavHandler = () => {
        if (fav.some((c) => c === country.slug)) {
            dispatch(countriesActions.delFavorite(country.slug));
        } else {
            dispatch(countriesActions.addFavorite(country.slug));
        }
    };
    useEffect(() => {
        props.navigation.setParams({ toggleFav: toggleFavHandler });
    }, [country, fav]);

    useEffect(() => {
        props.navigation.setParams({
            isFav: fav.some((c) => c === country.slug),
        });
    }, [fav]);

    return (
        <ScrollView style={styles.screen}>
            <View>
                <View style={styles.block}>
                    <View style={styles.imageContainer}>
                        <Image
                            style={styles.image}
                            source={{ uri: country.imageUrl }}
                        />
                    </View>

                    {country.year > 0 && (
                        <TextDefault>
                            <TextDefault style={styles.bold}>
                                Effective since:{" "}
                            </TextDefault>
                            {country.year}
                        </TextDefault>
                    )}

                    {country.capital !== "" && (
                        <TextDefault>
                            <TextDefault style={styles.bold}>
                                Capital:{" "}
                            </TextDefault>
                            {country.capital}
                        </TextDefault>
                    )}

                    {country.continent !== "" && (
                        <TextDefault>
                            <TextDefault style={styles.bold}>
                                Continent:{" "}
                            </TextDefault>
                            {continent}
                        </TextDefault>
                    )}

                    {country.population !== "" && (
                        <TextDefault>
                            <TextDefault style={styles.bold}>
                                Population:{" "}
                            </TextDefault>
                            {country.population}
                        </TextDefault>
                    )}

                    {country.hdi !== "" && (
                        <View
                            style={{
                                display: "flex",
                                flexDirection: "row",
                                bottom: 0,
                            }}
                        >
                            <Tooltip
                                withOverlay={false}
                                height={60}
                                width={Dimensions.get("window").width * 0.9}
                                backgroundColor={Colors.primaryColor}
                                popover={
                                    <Text
                                        style={{
                                            color: "#fff",
                                            textAlign: "justify",
                                        }}
                                    >
                                        The Human Development Index is a
                                        statistic composite index of life
                                        expectancy, education, and per capita
                                        income indicators.
                                    </Text>
                                }
                            >
                                <TextDefault
                                    style={{
                                        textDecorationLine: "underline",
                                        fontWeight: "bold",
                                        fontSize: 16,
                                    }}
                                >
                                    HDI:
                                </TextDefault>
                            </Tooltip>
                            <TextDefault> {country.hdi}</TextDefault>
                        </View>
                    )}

                    <View style={styles.padding}>
                        {country.description !== "" && (
                            <View>
                                <SubHeading>Meaning</SubHeading>
                                <TextDefault>{country.description}</TextDefault>
                            </View>
                        )}
                    </View>
                </View>
                <Banner />
                <View style={styles.block}>
                    {isNaN(country.latitude) ||
                    isNaN(country.longitude) ? null : (
                        <View>
                            <SubHeading>Where it is in the world</SubHeading>
                            <MapView
                                style={styles.map}
                                region={mapRegion}
                                customMapStyle={customMap}
                            >
                                <Marker
                                    title={country.name}
                                    coordinate={{
                                        latitude: country.latitude,
                                        longitude: country.longitude,
                                    }}
                                />
                            </MapView>
                        </View>
                    )}
                    {allTags.length > 0 && (
                        <View style={styles.padding}>
                            <SubHeading>Tags</SubHeading>
                            <TextDefault>{outputTags}</TextDefault>
                        </View>
                    )}
                </View>
                <Banner />
            </View>
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    screen: {
        flex: 1,
        height: "100%",
        backgroundColor: "rgb(219, 219, 219)",
    },
    block: {
        paddingHorizontal: "7%",
    },
    padding: {
        paddingBottom: 20,
    },
    imageContainer: {
        flex: 1,
        width: Dimensions.get("window").width * 0.86,
        height: Dimensions.get("window").width * 0.5,
        marginTop: 10,
    },
    image: {
        flex: 1,
        width: "100%",
        height: "100%",
        resizeMode: "stretch",
    },
    map: {
        width: "100%",
        height: 300,
        borderStyle: "solid",
        borderColor: "#000",
    },
    bold: {
        fontWeight: "bold",
    },
});

CountryInfoScreen.navigationOptions = (navData) => {
    const toggleFavorite = navData.navigation.getParam("toggleFav");
    const isFavorite = navData.navigation.getParam("isFav");

    const country = navData.navigation.state.params.item;

    return {
        headerTitle: country.name,
        headerTintColor: "white",
        headerRight: (
            <HeaderButtons HeaderButtonComponent={HeaderButton}>
                <Item
                    title='Favorite'
                    iconName={isFavorite ? "ios-heart" : "ios-heart-empty"}
                    onPress={toggleFavorite}
                />
            </HeaderButtons>
        ),
        headerStyle: {
            backgroundColor: country.mainColor === "" ? Colors.primaryColorDark :country.mainColor,
            headerTitleStyle: {
                fontWeight: "bold",
                fontFamily: "comfortaa-bold",
            },
        },
    };
};

export default CountryInfoScreen;
