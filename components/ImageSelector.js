import React, { useState } from 'react';
import { View, Text, StyleSheet, Image, Alert, TouchableHighlight } from 'react-native'
import { Input, Button } from 'react-native-elements'
import * as ImagePicker from 'expo-image-picker'
import * as Permissions from 'expo-permissions'
import Swipeable from 'react-native-swipeable-row';

import Colors from '../components/layout/Colors'
import { MaterialIcons } from '@expo/vector-icons';

const ImageSelector = props => {
    const [pickedImage, setpickedImage] = useState()
    const verifyCameraPermissions = async () => {
        const result = await Permissions.askAsync(Permissions.CAMERA, Permissions.CAMERA_ROLL)

        if (result.status !== 'granted') {
            Alert.alert(
                'Insufficient permission!',
                'You need to grant camera permissions to use this function.',
                [{ text: 'Okay' }]
            )
            return false
        }
        return true
    }

    const verifyGalleryPermissions = async () => {
        const result = await Permissions.askAsync(Permissions.CAMERA_ROLL)

        if (result.status !== 'granted') {
            Alert.alert(
                'Insufficient permission!',
                'You need to grant camera permissions to use this function.',
                [{ text: 'Okay' }]
            )
            return false
        }
        return true
    }

    const takeImageHandler = async () => {
        const hasPermission = await verifyCameraPermissions()
        if (!hasPermission) {
            return
        }
        let image = await ImagePicker.launchCameraAsync({
            allowsEditing: true
        })

        setpickedImage(image)
        props.onImageTake(image.uri)
    }

    const galleryImageHandler = async () => {
        const hasPermission = await verifyGalleryPermissions()
        if (!hasPermission) {
            return
        }
        let image = await ImagePicker.launchImageLibraryAsync({
            allowsEditing: true
        })

        setpickedImage(image)
        props.onImageTake(image.uri)
    }

    const imgDeleteHandler = () => {
        props.onImageDel(pickedImage.uri)
        setpickedImage()
    }

    const rightButtons = [
        <TouchableHighlight onPress={imgDeleteHandler} style={styles.deleteButton}>
            <MaterialIcons name='delete-forever' size={40} color='white'/>
        </TouchableHighlight>
    ];

    return (
        <View style={styles.container}>
            {pickedImage ?
                <Swipeable rightButtons={rightButtons} rightButtonWidt={50} rightActionActivationDistance={150} onRightActionRelease={imgDeleteHandler} bounceOnMount={true}>
                    <View style={styles.imagePreview}>
                        <Image style={styles.image} source={{ uri: pickedImage.uri }} />
                    </View>
                </Swipeable>
                : null}
            <View style={styles.buttons}>
                <Button
                    title="Take photo"
                    onPress={takeImageHandler}
                    buttonStyle={{ backgroundColor: Colors.primaryColorDark }}
                />
                <Button
                    title="Open gallery"
                    onPress={galleryImageHandler}
                    buttonStyle={{ backgroundColor: Colors.primaryColorDark }}
                />
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        alignItems: 'center',
    },
    imagePreview: {
        width: '100%',
        height: 200,
    },
    image: {
        width: '100%',
        height: '100%',
        borderColor: Colors.greyDark,
        borderWidth: 1,
    },
    buttons: {
        flexDirection: "row",
        justifyContent: 'space-around',
        width: '100%',
        marginBottom: 20,
        marginTop: 10
    },
    deleteButton: {
        height: 200,
        backgroundColor: 'red',
        justifyContent: 'center'
    }
})

export default ImageSelector