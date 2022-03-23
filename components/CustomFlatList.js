import React from "react";
import {
    FlatList,
    View,
    TouchableOpacity,
    StyleSheet,
    Dimensions,
    Image,
} from "react-native";

import EmptyPage from "./EmpyPage";
import TextDefault from "./layout/TextDefault";
import CustomActivityIndicator from "./CustomActivityIndicator";

const CustomFlatList = (props) => {
    if (!props.isLoading && props.data.length === 0) {
        return (
            <View style={styles.screen}>
                <EmptyPage page='Contact' title='FLAG NOT FOUND'>
                    We are sorry to say the characteristics you added cannot
                    match any flag on our database. If you think there's any
                    characteristic or flag missing please flag as the problem.
                </EmptyPage>
            </View>
        );
    }

    if (props.data.length === 1) {
        const countryFound = props.data[0];
        return (
            <TouchableOpacity
                style={styles.screen}
                onPress={() => props.onPress(countryFound)}
            >
                <View style={styles.flagContainerSingle}>
                    <View style={styles.imageContainer}>
                        <Image
                            style={styles.image}
                            source={{ uri: countryFound.imageUrl }}
                        />
                    </View>
                    <TextDefault style={styles.textSingle}>
                        {countryFound.name}
                    </TextDefault>
                </View>
            </TouchableOpacity>
        );
    }

    return (
        <View style={styles.screen}>
            <FlatList
                keyExtractor={(item) => item.slug}
                data={props.data}
                numColumns={3}
                columnWrapperStyle={styles.container}
                ListEmptyComponent={<CustomActivityIndicator />}
                renderItem={({ item }) => {
                    return (
                        <TouchableOpacity
                            style={styles.item}
                            onPress={() => props.onPress(item)}
                        >
                            <View style={styles.flagContainer}>
                                <View style={styles.imageContainer}>
                                    <Image
                                        style={styles.image}
                                        source={{ uri: item.imageUrl }}
                                    />
                                </View>
                                <TextDefault style={styles.text}>
                                    {item.name}
                                </TextDefault>
                            </View>
                        </TouchableOpacity>
                    );
                }}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    screen: {
        flex: 1,
        height: "100%",
    },
    container: {
        padding: 10,
        flex: 1,
        width: "100%",
        height: "100%",
    },
    item: {
        width: "33%",
        alignItems: "center",
    },
    flagContainer: {
        width: Dimensions.get("window").width * 0.25,
        height: Dimensions.get("window").width * 0.15,
        marginBottom: 35,
    },
    imageContainer: {
        width: "100%",
        height: "100%",
    },
    image: {
        width: "100%",
        height: "100%",
        resizeMode: "stretch",
    },
    text: {
        fontSize: 14,
        flexWrap: "wrap",
        textAlign: "center",
    },
    flagContainerSingle: {
        width: Dimensions.get("window").width * 0.8,
        height: Dimensions.get("window").width * 0.45,
        marginBottom: 35,
        alignSelf: "center",
    },
    textSingle: {
        fontSize: 25,
        flexWrap: "wrap",
        width: "100%",
        textAlign: "center",
        fontFamily: "comfortaa-bold",
    },
});

export default CustomFlatList;
