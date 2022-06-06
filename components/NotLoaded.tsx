import React from "react";
import { View, Text, StyleSheet, Button, TouchableOpacity } from "react-native";
import Colors from "./layout/Colors";

const NotLoaded = ({ onPress }) => {
    return (
        <View style={styles.screen}>
            <Text style={styles.heading}>Sorry,</Text>
            <Text style={styles.heading}>something went wrong</Text>
            <Text style={styles.text}>
                Please check your internet connection
            </Text>

            <TouchableOpacity
                activeOpacity={0.8}
                style={styles.button}
                onPress={onPress}
            >
                <Text style={styles.buttonText}>TRY AGAIN</Text>
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    screen: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        padding: 20,
        backgroundColor: Colors.secondaryColor,
    },
    heading: {
        fontSize: 24,
        fontFamily: "comfortaa-bold",
        color: Colors.primaryColor,
        textAlign: "center",
        lineHeight: 28,
    },
    text: {
        fontSize: 14,
        fontFamily: "comfortaa-bold",
        color: Colors.primaryColor,
        textAlign: "center",
        marginTop: 5,
        marginBottom: 30,
    },

    button: {
        backgroundColor: Colors.primaryColor,
        borderRadius: 5,
    },
    buttonText: {
        color: "white",
        fontSize: 14,
        fontFamily: "comfortaa-bold",
        textAlign: "center",
        paddingVertical: 10,
        paddingHorizontal: 20,
    },
});

export default NotLoaded;
