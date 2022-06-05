import React from "react";
import { SafeAreaView } from "react-navigation";
import { View, StyleSheet, Linking, TouchableOpacity } from "react-native";
import { Foundation } from "@expo/vector-icons";

import Colors from "../components/layout/Colors";
import TextDefault from "../components/layout/TextDefault";

import { expo } from "../app.json";
import { DrawerActions } from "react-navigation-drawer";

const DrawerScreen = (props) => {
    const onBackdropPress = () => {
        props.navigation.dispatch(DrawerActions.toggleDrawer())
    }

    return (
        <SafeAreaView style={styles.screen}>
            <TouchableOpacity style={styles.backdrop} onPress={onBackdropPress} />
            <View style={styles.container}>
                <View style={styles.content}>
                    <TextDefault
                        style={styles.text}
                        onPress={() => props.navigation.navigate("Search")}
                    >
                        Search
                    </TextDefault>
                    <TextDefault
                        style={styles.text}
                        onPress={() => props.navigation.navigate("Favorites")}
                    >
                        Favorites
                    </TextDefault>
                    <TextDefault
                        style={styles.text}
                        onPress={() => props.navigation.navigate("Quiz")}
                    >
                        Quiz
                    </TextDefault>
                    <TextDefault
                        style={styles.text}
                        onPress={() => props.navigation.navigate("Contact")}
                    >
                        Contact
                    </TextDefault>
                </View>
                <View style={styles.content}>
                    <TextDefault style={styles.containerBottom}>
                        Developed with{" "}
                        <Foundation
                            name='heart'
                            size={18}
                            color={Colors.secondaryColor}
                        />{" "}
                        by{" "}
                        <TextDefault
                            style={styles.clickable}
                            onPress={() =>
                                Linking.openURL("https://pavanela.com")
                            }
                        >
                            pavanela.com
                        </TextDefault>
                    </TextDefault>
                    <TextDefault style={styles.textBottom}>
                        <TextDefault style={styles.textBottomWhite}>
                            Version:{" "}
                        </TextDefault>
                        {expo.version}
                    </TextDefault>
                </View>
            </View>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    screen: {
        flex: 1,
        display: "flex",
        flexDirection: 'row'
    },
    container: {
        flex: 1,
        flexGrow: 1,
        justifyContent: 'space-between',
        backgroundColor: Colors.primaryColor,
    },
    backdrop: {
        flex: 1,
        flexGrow: 1,
    },
    content: {
        paddingLeft: "7%",
        paddingBottom: "7%",
    },
    text: {
        color: "#fff",
        fontSize: 20,
        borderBottomWidth: 3,
        borderColor: Colors.secondaryColor,
        margin: 5,
    },
    containerBottom: {
        color: "#fff",
        textAlign: "left",
        marginBottom: 10,
    },
    textBottom: {
        color: Colors.secondaryColor,
    },
    textBottomWhite: {
        color: "#fff",
    },
    clickable: {
        color: Colors.secondaryColor,
        borderBottomWidth: 2,
        textDecorationLine: "underline",
        textDecorationStyle: "solid",
        textDecorationColor: Colors.secondaryColor,
        fontSize: 18,
    },
});

export default DrawerScreen;
