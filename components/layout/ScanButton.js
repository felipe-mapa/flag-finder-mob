import React from 'react';
import { View, Image, StyleSheet } from 'react-native'

const flagIcon = require("../../assets/flag-icon.png")

const ScanButton = () => {
    return (
        <View style={styles.container}>
            <View style={styles.imageContainer}>
                <Image style={styles.image} source={flagIcon} />
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        height: 100,
        width: '100%',
        backgroundColor: 'red',
        borderTopRightRadius: 35,
        borderTopLeftRadius: 35,
        alignItems: 'center',
        textAlignVertical: 'center'
    },
    imageContainer: {
        width: 57.9,
        height: 40,
    },
    image: {
        width: '100%',
        height: '100%',
        marginTop: 15
    }
})

export default ScanButton;