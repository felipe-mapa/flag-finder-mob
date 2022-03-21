import React from "react";
import {
    ScrollView,
    FlatList,
    View,
    TouchableOpacity,
    StyleSheet,
} from "react-native";

import SingleCountry from "../containers/SingleCountry";
import CustomActivityIndicator from "./CustomActivityIndicator";

const CustomFlatList = (props) => {
    return (
        <View style={styles.screen}>
            {props.length > 0 ? (
                <FlatList
                    //onEndReached={loadCountries} // LOAD AS IT GOES
                    keyExtractor={(item) => item.slug}
                    data={props.data}
                    numColumns={3}
                    removeClippedSubviews={true}
                    columnWrapperStyle={styles.container}
                    renderItem={(itemData) => {
                        return (
                            <TouchableOpacity
                                style={styles.item}
                                onPress={() => props.onPress(itemData)}
                            >
                                <SingleCountry
                                    name={itemData.item.name}
                                    flag={itemData.item.imageUrl}
                                    conNum={props.data.length}
                                />
                            </TouchableOpacity>
                        );
                    }}
                />
            ) : (
                <CustomActivityIndicator />
            )}
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
});

export default CustomFlatList;
