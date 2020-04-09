import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux'
import { StyleSheet, View, Text } from 'react-native'
import { ButtonGroup } from 'react-native-elements';

import Colors from '../components/layout/Colors'
import Banner from '../components/Banner'
import TextDefault from '../components/layout/TextDefault';
import { FlatList, ScrollView } from 'react-native-gesture-handler';

const ScoresScreen = (props) => {
  const scores = useSelector(state => state.quiz.topScores)

  const [selectedGroup, setSelectedGroup] = useState()
  const [selectedIndex, setSelectedIndex] = useState(0)
  const [buttons, setButtons] = useState([])
  const [flatListData, setFlatListData] = useState()

  const tenQuestionsGroup = scores.map(s => s.totalNum === 10 ? s : null).filter(el => el !== null)
  const twentyQuestionsGroup = scores.map(s => s.totalNum === 20 ? s : null).filter(el => el !== null)
  const thirtyQuestionsGroup = scores.map(s => s.totalNum === 30 ? s : null).filter(el => el !== null)

  // CHECK QUESTION GROUPS
  useEffect(() => {
    let buttonsAvailable = []
    if (tenQuestionsGroup.length > 0) {
      buttonsAvailable.push(10)
    }
    if (twentyQuestionsGroup.length > 0) {
      buttonsAvailable.push(20)
    }
    if (thirtyQuestionsGroup.length > 0) {
      buttonsAvailable.push(30)
    }
    setButtons(buttonsAvailable)
  }, [])

  // SET SELECTED GROUP
  useEffect(() => {
    setSelectedGroup(buttons[selectedIndex])
  })

  // SET SCORES SHOWN
  useEffect(() => {
    let dataSelected = []
    if (selectedGroup === 10) {
      dataSelected = tenQuestionsGroup
    } else {
      if (selectedGroup === 20) {
        dataSelected = twentyQuestionsGroup
      } else {
        if (selectedGroup === 30) {
          dataSelected = thirtyQuestionsGroup
        }
      }
    }
    dataSelected = dataSelected.sort((a, b) => a.time - b.time).sort((a, b) => b.totalScore - a.totalScore)

    setFlatListData(dataSelected)
  }, [selectedGroup])

  return (
    <ScrollView style={styles.screen}>
      <Banner />

      <ButtonGroup
        onPress={(selectedIndex) => setSelectedIndex(selectedIndex)}
        selectedIndex={selectedIndex}
        buttons={buttons}
        ontainerBorderRadius={8}
        containerStyle={{ height: 50 }}
        textStyle={{
          fontSize: 16
        }}
        selectedButtonStyle={{
          backgroundColor: Colors.primaryColorDark
        }}
        selectedTextStyle={{
          fontSize: 20
        }}
      />

      <FlatList
        data={flatListData}
        keyExtractor={item => item.playerId}
        numColumns={1}
        ListHeaderComponent={
          <View style={styles.header}>
            <View style={styles.header_blank}></View>
            <View style={styles.header_name}>
              <TextDefault>Name</TextDefault>
            </View>
            <View style={styles.header_score}>
              <TextDefault style={styles.alignText}>Score</TextDefault>
            </View>
            <View style={styles.header_time}>
              <TextDefault style={styles.alignText}>Time</TextDefault>
            </View>
            <View style={styles.header_date}>
              <TextDefault style={styles.alignText}>Date</TextDefault>
            </View>
          </View>
        }
        renderItem={itemData => {
          return (
            <View style={styles.row}>
              <View style={styles.row_blank}>
                <TextDefault style={styles.alignText}>#{itemData.index + 1}</TextDefault>
              </View>
              <View style={styles.row_name}>
                <TextDefault>{itemData.item.userName}</TextDefault>
              </View>
              <View style={styles.row_score}>
                <TextDefault style={styles.alignText}>{itemData.item.totalScore}/{itemData.item.totalNum}</TextDefault>
              </View>
              <View style={styles.row_time}>
                <TextDefault style={styles.alignText}>{itemData.item.time}s</TextDefault>
              </View>
              <View style={styles.row_date}>
                <TextDefault style={styles.alignText}>{itemData.item.date}</TextDefault>
              </View>
            </View>
          )
        }}
      />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    height: '100%',
    backgroundColor: Colors.greyLight
  },
  alignText: {
    textAlign: 'center'
  },
  header: {
    width: "100%",
    display: "flex",
    flexDirection: "row",
    borderBottomColor: "#000",
    borderBottomWidth: 1,
    paddingHorizontal: 5
  },
  header_blank: {
    width: "10%"
  },
  header_name: {
    width: "30%",
  },
  header_score: {
    width: "15%",
  },
  header_time: {
    width: "20%",
  },
  header_date: {
    width: "25%",
  },
  row: {
    width: "100%",
    display: "flex",
    flexDirection: "row",
    textAlign: "center",
    borderBottomColor: "#ccc",
    borderBottomWidth: 1,
    paddingHorizontal: 5,
    paddingVertical: 10
  },
  row_blank: {
    width: "10%",
    textAlignVertical: "center",
    fontWeight: "bold"
  },
  row_name: {
    width: "30%",
  },
  row_score: {
    width: "15%",
  },
  row_time: {
    width: "20%",
  },
  row_date: {
    width: "25%",
  }
})

ScoresScreen.navigationOptions = () => {
  return {
    headerTitle: 'Top Scores',
    headerTintColor: 'white',
    headerStyle: {
      backgroundColor: Colors.primaryColorDark,
      headerTitleStyle: {
        fontWeight: 'bold',
        fontFamily: 'comfortaa-bold',
        flex: 1
      },
    },
    headerTitleStyle: {
      flex: 1
    },
  }
}

export default ScoresScreen