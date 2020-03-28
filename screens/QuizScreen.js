import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux'
import { StyleSheet, View, Dimensions, Text } from 'react-native';
import { Button, Overlay } from 'react-native-elements'

import Colors from '../components/layout/Colors'
import Banner from '../components/banner'
import TextDefault from '../components/layout/textDefault';
import * as quizActions from '../store/actions/quizAction'

const quizScreen = (props) => {
    const [isOverlayVisible, setIsOverlayVisible] = useState(false)
    const topScoresData = useSelector(state => state.quiz.topScores)
    const dispatch = useDispatch()

    // SCORES
    useEffect(() => {
        dispatch(quizActions.loadScores());
    }, [dispatch]);

    const startGameHandler = (selected) => {
        setIsOverlayVisible(false)
        props.navigation.navigate('Game', { numberOfQuestions: selected })
    }

    return (
        <View style={styles.screen}>
            <Overlay
                isVisible={isOverlayVisible}
                onBackdropPress={() => setIsOverlayVisible(false)}
                windowBackgroundColor="rgba(0, 0, 0, .5)"
                overlayBackgroundColor="white"
                width={Dimensions.get('window').width * .85}
                height={Dimensions.get('window').height * .4}
            >
                <View style={styles.overlay}>
                    <TextDefault>Please select the number of questions you would like to have:</TextDefault>
                    <View style={styles.overlayButton}>
                        <Button
                            type="solid"
                            title="10"
                            onPress={() => startGameHandler(10)}
                            buttonStyle={{
                                backgroundColor: Colors.primaryColor,
                            }}
                            titleStyle={{ fontSize: 18 }}
                        />
                        <Button
                            type="solid"
                            title="20"
                            onPress={() => startGameHandler(20)}
                            buttonStyle={{
                                backgroundColor: Colors.primaryColor,
                            }}
                            titleStyle={{ fontSize: 18 }}
                        />
                        <Button
                            type="solid"
                            title="30"
                            onPress={() => startGameHandler(30)}
                            buttonStyle={{
                                backgroundColor: Colors.primaryColor,
                            }}
                            titleStyle={{ fontSize: 18 }}
                        />
                    </View>
                </View>
            </Overlay>
            <Banner />
            <TextDefault style={styles.desc}>
                Want to test your flag knowledge? Choose how many questions you want to play,
                either 10, 20 or 30. You will be given a flag and choose one of 4 multi-choice
                answers. Keep in mind - your score and time taken are recorded!
            </TextDefault>
            <View style={styles.buttonContainer}>
                <Button
                    type="solid"
                    title="Play Quiz"
                    onPress={() => setIsOverlayVisible(true)}
                    buttonStyle={{
                        backgroundColor: Colors.primaryColor,
                        marginBottom: 30,
                        width: Dimensions.get("window").width / 2.5,
                    }}
                    titleStyle={{ fontSize: 22 }}
                />
                {topScoresData <= 0 ? null :
                    <Button
                        type="solid"
                        title="Top Scores"
                        onPress={() => props.navigation.navigate('Scores')}
                        buttonStyle={{
                            backgroundColor: Colors.primaryColor,
                            marginTop: 30,
                            width: Dimensions.get("window").width / 2.5,
                        }}
                        titleStyle={{ fontSize: 22 }}
                    />
                }
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    screen: {
        flex: 1,
        height: '100%',
        backgroundColor: Colors.greyLight,
    },
    overlay: {
        flex: 1,
        height: '100%',
    },
    overlayButton: {
        display: 'flex',
        justifyContent: 'space-around',
        flex: 1
    },
    desc: {
        paddingHorizontal: '7%',
        marginBottom: 30,
        marginTop: 30
    },
    buttonContainer: {
        alignItems: 'center',
        height: "100%",
    }
})

quizScreen.navigationOptions = () => {
    return {
        headerTitle: 'Flag Quiz',
        headerTintColor: 'white',
        headerStyle: {
            backgroundColor: Colors.primaryColorDark,
            headerTitleStyle: {
                fontWeight: 'bold',
                fontFamily: 'comfortaa-bold',
                textAlign: "center",
                flex: 1
            },
        },
        headerTitleStyle: {
            textAlign: "center",
            flex: 1
        },
    }
}

export default quizScreen