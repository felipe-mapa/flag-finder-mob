import React, { useState } from 'react';
import { StyleSheet, View, Dimensions } from 'react-native';
import { Button, Input, Overlay } from 'react-native-elements'
import { Entypo } from '@expo/vector-icons';

import Colors from '../components/layout/Colors'

const GameOverlay = props => {
    const [playerName, setPlayerName] = useState('')

    const textChangeHandler = (name) => {
        setPlayerName(name)
    }

    return (
        <View style={styles.screen}>
            <Overlay
                isVisible={props.isVisible}
                windowBackgroundColor="rgba(0, 0, 0, .5)"
                overlayBackgroundColor="white"
                width={props.isLastOverlay ? Dimensions.get('window').width * .7 : Dimensions.get('window').width * .6}
                height={props.isLastOverlay ? Dimensions.get('window').height * .4 : Dimensions.get('window').height * .2}
            >
                <View style={styles.overlay}>
                    <View>
                        {props.overlayMessage}
                        {props.isLastOverlay ?
                            <Input
                                placeholder=' Your name'
                                onChangeText={textChangeHandler.bind(this)}
                                leftIcon={
                                    <Entypo
                                        name='emoji-happy'
                                        size={24}
                                        color={Colors.primaryColorDark}
                                    />
                                }
                            />
                            : null
                        }
                        <Button
                            title={props.isLastOverlay ? "Submit Score" : props.title}
                            type="clear"
                            onPress={props.isLastOverlay ? () => props.submitScore(playerName) : () => props.submitHandler()}
                            buttonStyle={{
                            }}
                            titleStyle={{
                                fontSize: 20,
                                color: Colors.primaryColorDark,
                                textAlign: 'right'
                            }}
                        />
                    </View>
                </View>
            </Overlay>
        </View>
    )
}

const styles = StyleSheet.create({
    overlay: {
        flex: 1,
        height: '100%',
        display: 'flex',
        justifyContent: "space-between",
        padding: 10
    },
})

export default GameOverlay