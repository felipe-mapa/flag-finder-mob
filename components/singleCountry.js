import React, { useEffect, useState } from 'react';
import { StyleSheet, View, Text, Dimensions, Image } from 'react-native';

import TextDefault from '../components/layout/textDefault'
import EmptyPage from '../components/empyPage'

const singleCountry = props => {
    const [display, setDisplay] = useState(
        <View style={styles.flagContainer}>
            <View style={styles.imageContainer}>
                <Image style={styles.image} source={{ uri: props.flag }} />
            </View>
            <TextDefault style={styles.text}>{props.name}</TextDefault>
        </View>
    )

    useEffect(() => {
        if (props.conNum > 1) {
            setDisplay(
                <View style={styles.flagContainer}>
                    <View style={styles.imageContainer}>
                        <Image style={styles.image} source={{ uri: props.flag }} />
                    </View>
                    <TextDefault style={styles.text}>{props.name}</TextDefault>
                </View>
            )
        } else {
            if (props.conNum === 1) {
                setDisplay(
                    <View style={styles.flagContainerSingle}>
                        <View style={styles.imageContainer}>
                            <Image style={styles.image} source={{ uri: props.flag }} />
                        </View>
                        <TextDefault style={styles.textSingle}>{props.name}</TextDefault>
                    </View>
                )
            } else {
                setDisplay(
                    <EmptyPage page="Contact" title="FLAG AN ERROR">
                        We are sorry to say the characteristics you added cannot match any flag on our database.
                        If you think there's any characteristic or flag missing please flag as the problem.
                    </EmptyPage>
                )
            }
        }
    }, [props.conNum])


    return display;
}

const styles = StyleSheet.create({
    flagContainer: {
        width: Dimensions.get("window").width * 0.25,
        height: Dimensions.get("window").width * 0.15,
        marginBottom: 35
    },
    imageContainer: {
        width: '100%',
        height: '100%',
    },
    image: {
        width: '100%',
        height: '100%',
        resizeMode: "stretch"
    },
    text: {
        fontSize: 14,
        flexWrap: 'wrap',
        textAlign: 'center',
    },
    flagContainerSingle: {
        width: Dimensions.get("window").width * 0.8,
        height: Dimensions.get("window").width * 0.45,
        marginBottom: 35,
    },
    textSingle: {
        fontSize: 25,
        flexWrap: 'wrap',
        width: '100%',
        textAlign: 'center',
        fontFamily: 'comfortaa-bold'
    }

})

export default singleCountry