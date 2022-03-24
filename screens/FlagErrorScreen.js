import React, { useState } from 'react';
import { StyleSheet, ScrollView, View } from 'react-native';
import { Input, Button } from 'react-native-elements'
import Emoji from 'react-native-emoji';
import { showMessage } from "react-native-flash-message";
import * as MailComposer from 'expo-mail-composer';

import Colors from '../components/layout/Colors'
import TextDefault from '../components/layout/TextDefault'
import ImageSelector from '../components/ImageSelector'
import Banner from '../components/Banner';

const FlagErrorScreen = () => {
  const [messageToSend, setMessage] = useState('')
  const [image, setImage] = useState([])

  const textChangeHandler = (messageToSend) => {
    setMessage(messageToSend)
  }

  const onImageTakeHandler = (uri) => {
    setImage([uri])
  }

  const onImageDelHandler = (uri) => {
    setImage([])
  }

  const submitHandler = () => {
    MailComposer.composeAsync({
      recipients: ['contact@flagfinderapp.com'],
      subject: 'New message from Flag Finder Mobile App',
      body: messageToSend,
      isHtml: false,
      attachments: image
    }).then(s => {
      if (s.status === 'sent') {
        showMessage({
          message: "Redirected successfully.",
          type: "success",
        });
        setMessage('')
        setImage([])
      } else {
        showMessage({
          message: "Sorry, something went wrong.",
          type: "danger",
        });
      }
    })
  }

  return (
    <ScrollView>
      <Banner />
      <View style={styles.screen}>
        <ScrollView>
          <View style={styles.padding}>
            <TextDefault styles={styles.text}>
              Have you found any error, do you have any flag suggestion or
              request, couldn't you find the flag you were looking for? Just
            send us a message <Emoji name="blush" style={{ fontSize: 16 }} />
            </TextDefault>
            <TextDefault style={styles.label}>Your message below</TextDefault>
            <Input
              multiline={true}
              value={messageToSend}
              onChangeText={textChangeHandler.bind(this)}
              onSubmitEditing={submitHandler.bind(this)}
            />
            <TextDefault style={styles.label}>Attach an image if you wish</TextDefault>
            <ImageSelector onImageTake={onImageTakeHandler} onImageDel={onImageDelHandler} />
            <Button
              type="solid"
              title="SEND AS AN EMAIL"
              disabled={messageToSend.length < 5}
              onPress={submitHandler.bind(this)}
              buttonStyle={{ backgroundColor: Colors.primaryColor }}
              disabledStyle={{ backgroundColor: Colors.primaryColorLight, paddingHorizontal: 10 }}
            />
          </View>
        </ScrollView>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  screen: {
    paddingHorizontal: '7%',
    paddingTop: 5
  },
  text: {
    height: '100%',
    marginBottom: 20,
  },
  label: {
    fontFamily: 'comfortaa-bold',
    fontSize: 14,
    color: Colors.greyDark,
    marginBottom: 10,
    marginTop: 15
  },
  padding: {
    paddingBottom: 40
  },
})

FlagErrorScreen.navigationOptions = () => {
  return {
    headerTitle: 'Flag an Error',
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
  }
}

export default FlagErrorScreen