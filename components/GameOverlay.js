import React, { useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { Button, Input, Overlay } from 'react-native-elements'
import { Entypo } from '@expo/vector-icons';

import Colors from './layout/Colors'

const GameOverlay = props => {
    const [playerName, setPlayerName] = useState('Someone')

    const textChangeHandler = (name) => {
        setPlayerName(name)
    }

    return (
        <View style={styles.screen}>
            <Overlay
                isVisible={props.isVisible}
                overlayBackgroundColor="white"
                borderRadius={8}
                width={280}
                height={props.isLastOverlay ? 210 : 125}
            >
                <View style={styles.overlay}>
                    <View>
                        {props.overlayMessage}
                        {!props.isLastOverlay ?
                            <Button
                                title={props.title}
                                type="clear"
                                onPress={() => props.submitHandler()}
                                titleStyle={{
                                    fontSize: 20,
                                    color: Colors.primaryColorDark,
                                    textAlign: 'right'
                                }}
                            />
                            : null
                        }

                        {props.isHighScore ?
                            <View>
                                <Input
                                    placeholder=' Your name (max 15)'
                                    onChangeText={textChangeHandler.bind(this)}
                                    maxLength={15}
                                    leftIcon={
                                        <Entypo
                                            name='emoji-happy'
                                            size={24}
                                            color={Colors.primaryColorDark}
                                        />
                                    }
                                />
                                <Button
                                    title="Submit Score"
                                    type="clear"
                                    onPress={() => props.submitScore(playerName)}
                                    titleStyle={{
                                        fontSize: 20,
                                        color: Colors.primaryColorDark,
                                        textAlign: 'right'
                                    }}
                                />
                            </View>
                            : null
                        }
                        {!props.isHighScore & props.isLastOverlay ?
                            <View>
                                <Button
                                    title="Play Again"
                                    type="clear"
                                    onPress={props.playAgain}
                                    buttonStyle={{
                                    }}
                                    titleStyle={{
                                        fontSize: 20,
                                        color: Colors.primaryColorDark,
                                        textAlign: 'right'
                                    }}
                                />
                                <Button
                                    title="Exit"
                                    type="clear"
                                    onPress={props.goToMenu}
                                    buttonStyle={{
                                    }}
                                    titleStyle={{
                                        fontSize: 20,
                                        color: Colors.primaryColorDark,
                                        textAlign: 'right'
                                    }}
                                />
                            </View>
                            : null
                        }
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
        padding: 10
    },
})

export default GameOverlay