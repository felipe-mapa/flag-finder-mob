import {
    SET_SCORES,
    ADD_SCORE,
    DEL_SCORE
} from '../actions/quizAction';

const initialState = {
    topScores: [],
};

export default (state = initialState, action) => {
    switch (action.type) {
        case SET_SCORES:
            return {
                ...state,
                topScores: action.scores.map(score => score)
            }
        case ADD_SCORE:
            return {
                ...state,
                topScores: state.topScores.concat(action.score)
            }
        case DEL_SCORE:
            return {
                ...state,
                topScores: state.topScores.filter(item => item.playerId !== action.playerId)
            }
        default:
            return state
    }
}


// {
//     date: "19/03/20",
//     id: 70,
//     totalScore: 2,
//     time: 65,
//     totalNum: 10,
//     userName: "Ruth",
// },
// {
//     date: "23/03/20",
//     id: 71,
//     totalScore: 7,
//     time: 76,
//     totalNum: 10,
//     userName: "Kaci",
// },
// {
//     date: "27/03/20",
//     id: 72,
//     totalScore: 4,
//     time: 54,
//     totalNum: 10,
//     userName: "Evie-Grace",
// },
// {
//     date: "23/03/20",
//     id: 73,
//     totalScore: 9,
//     time: 51,
//     totalNum: 10,
//     userName: "Alton",
// },
// {
//     date: "06/03/20",
//     id: 74,
//     totalScore: 8,
//     time: 24,
//     totalNum: 10,
//     userName: "Kohem",
// },
// {
//     date: "21/03/20",
//     id: 75,
//     totalScore: 1,
//     time: 15,
//     totalNum: 10,
//     userName: "Tashan",
// },
// {
//     date: "26/03/20",
//     id: 76,
//     totalScore: 9,
//     time: 39,
//     totalNum: 10,
//     userName: "Celia",
// },
// {
//     date: "19/03/20",
//     id: 77,
//     totalScore: 6,
//     time: 47,
//     totalNum: 10,
//     userName: "Brian",
// },
// {
//     date: "23/03/20",
//     id: 78,
//     totalScore: 5,
//     time: 25,
//     totalNum: 10,
//     userName: "Kimberley",
// },
// {
//     date: "23/03/20",
//     id: 79,
//     totalScore: 2,
//     time: 52,
//     totalNum: 10,
//     userName: "Zahra",
// },
// {
//     date: "19/03/20",
//     id: 80,
//     totalScore: 10,
//     time: 58,
//     totalNum: 20,
//     userName: "Luiz",
// },
// {
//     date: "23/03/20",
//     id: 81,
//     totalScore: 9,
//     time: 31,
//     totalNum: 20,
//     userName: "Samarah",
// },
// {
//     date: "23/03/20",
//     id: 82,
//     totalScore: 16,
//     time: 62,
//     totalNum: 20,
//     userName: "Mark",
// },
// {
//     date: "28/03/20",
//     id: 83,
//     totalScore: 12,
//     time: 58,
//     totalNum: 20,
//     userName: "Precilla",
// },
// {
//     date: "12/03/20",
//     id: 84,
//     totalScore: 13,
//     time: 33,
//     totalNum: 20,
//     userName: "Don",
// },
// {
//     date: "17/03/20",
//     id: 85,
//     totalScore: 7,
//     time: 53,
//     totalNum: 20,
//     userName: "Veer",
// },
// {
//     date: "23/03/20",
//     id: 86,
//     totalScore: 18,
//     time: 49,
//     totalNum: 20,
//     userName: "Lexi",
// },
// {
//     date: "22/03/20",
//     id: 87,
//     totalScore: 13,
//     time: 30,
//     totalNum: 20,
//     userName: "Logan",
// },
// {
//     date: "18/03/20",
//     id: 88,
//     totalScore: 6,
//     time: 86,
//     totalNum: 20,
//     userName: "Luisa",
// },
// {
//     date: "23/03/20",
//     id: 89,
//     totalScore: 17,
//     time: 48,
//     totalNum: 20,
//     userName: "Kieren",
// },
// {
//     date: "19/03/20",
//     id: 90,
//     totalScore: 22,
//     time: 50,
//     totalNum: 30,
//     userName: "Ewan",
// },
// {
//     date: "23/03/20",
//     id: 91,
//     totalScore: 17,
//     time: 119,
//     totalNum: 30,
//     userName: "Lawrence",
// },
// {
//     date: "13/03/20",
//     id: 92,
//     totalScore: 26,
//     time: 177,
//     totalNum: 30,
//     userName: "Kate",
// },
// {
//     date: "03/03/20",
//     id: 93,
//     totalScore: 22,
//     time: 151,
//     totalNum: 30,
//     userName: "Maria",
// },
// {
//     date: "19/03/20",
//     id: 94,
//     totalScore: 19,
//     time: 135,
//     totalNum: 30,
//     userName: "Norman",
// },
// {
//     date: "16/03/20",
//     id: 95,
//     totalScore: 17,
//     time: 195,
//     totalNum: 30,
//     userName: "Kennedy",
// },
// {
//     date: "23/03/20",
//     id: 96,
//     totalScore: 5,
//     time: 30,
//     totalNum: 30,
//     userName: "Name 7",
// },
// {
//     date: "23/03/20",
//     id: 97,
//     totalScore: 7,
//     time: 30,
//     totalNum: 30,
//     userName: "Name 8",
// },
// {
//     date: "23/03/20",
//     id: 98,
//     totalScore: 1,
//     time: 1,
//     totalNum: 30,
//     userName: "Name 9",
// },
// {
//     date: "23/03/20",
//     id: 99,
//     totalScore: 1,
//     time: 40,
//     totalNum: 30,
//     userName: "Name 10",
// },  