import {
    SET_SCORES,
    ADD_SCORE,
    DEL_SCORE,
    SET_ID
} from '../actions/quizAction';

const initialState = {
    topScores: [],
    timesPlayed: 0,
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
                topScores: state.topScores.filter(item => item.id !== action.id)
            }
        case SET_ID:
            return {
                ...state,
                timesPlayed: state.timesPlayed + 1
            }
        default:
            return state
    }
}


        // {
        //     date: "19/03/20",
        //     id: 70,
        //     totalScore: 10,
        //     time: 2730,
        //     totalNum: 10,
        //     userName: "Name 1",
        // },
        // {
        //     date: "23/03/20",
        //     id: 71,
        //     totalScore: 9,
        //     time: 2750,
        //     totalNum: 10,
        //     userName: "Name 2",
        // },
        // {
        //     date: "23/03/20",
        //     id: 72,
        //     totalScore: 6,
        //     time: 2725,
        //     totalNum: 10,
        //     userName: "Name 3",
        // },
        // {
        //     date: "23/03/20",
        //     id: 73,
        //     totalScore: 4,
        //     time: 2710,
        //     totalNum: 10,
        //     userName: "Name 4",
        // },
        // {
        //     date: "23/03/20",
        //     id: 74,
        //     totalScore: 7,
        //     time: 2730,
        //     totalNum: 10,
        //     userName: "Name 5",
        // },
        // {
        //     date: "23/03/20",
        //     id: 75,
        //     totalScore: 3,
        //     time: 2790,
        //     totalNum: 10,
        //     userName: "Name 6",
        // },
        // {
        //     date: "23/03/20",
        //     id: 76,
        //     totalScore: 5,
        //     time: 2730,
        //     totalNum: 10,
        //     userName: "Name 7",
        // },
        // {
        //     date: "23/03/20",
        //     id: 77,
        //     totalScore: 7,
        //     time: 2730,
        //     totalNum: 10,
        //     userName: "Name 8",
        // },
        // {
        //     date: "23/03/20",
        //     id: 78,
        //     totalScore: 1,
        //     time: 271,
        //     totalNum: 10,
        //     userName: "Name 9",
        // },
        // {
        //     date: "23/03/20",
        //     id: 79,
        //     totalScore: 1,
        //     time: 2740,
        //     totalNum: 10,
        //     userName: "Name 10",
        // },
        // {
        //     date: "19/03/20",
        //     id: 80,
        //     totalScore: 10,
        //     time: 2730,
        //     totalNum: 20,
        //     userName: "Name 1",
        // },
        // {
        //     date: "23/03/20",
        //     id: 81,
        //     totalScore: 9,
        //     time: 2750,
        //     totalNum: 20,
        //     userName: "Name 2",
        // },
        // {
        //     date: "23/03/20",
        //     id: 82,
        //     totalScore: 6,
        //     time: 2725,
        //     totalNum: 20,
        //     userName: "Name 3",
        // },
        // {
        //     date: "23/03/20",
        //     id: 83,
        //     totalScore: 4,
        //     time: 20,
        //     totalNum: 20,
        //     userName: "Name 4",
        // },
        // {
        //     date: "23/03/20",
        //     id: 84,
        //     totalScore: 7,
        //     time: 30,
        //     totalNum: 20,
        //     userName: "Name 5",
        // },
        // {
        //     date: "23/03/20",
        //     id: 85,
        //     totalScore: 3,
        //     time: 90,
        //     totalNum: 20,
        //     userName: "Name 6",
        // },
        // {
        //     date: "23/03/20",
        //     id: 86,
        //     totalScore: 5,
        //     time: 30,
        //     totalNum: 20,
        //     userName: "Name 7",
        // },
        // {
        //     date: "23/03/20",
        //     id: 87,
        //     totalScore: 7,
        //     time: 30,
        //     totalNum: 20,
        //     userName: "Name 8",
        // },
        // {
        //     date: "23/03/20",
        //     id: 88,
        //     totalScore: 1,
        //     time: 1,
        //     totalNum: 20,
        //     userName: "Name 9",
        // },
        // {
        //     date: "23/03/20",
        //     id: 89,
        //     totalScore: 1,
        //     time: 40,
        //     totalNum: 20,
        //     userName: "Name 10",
        // },
        // {
        //     date: "19/03/20",
        //     id: 90,
        //     totalScore: 10,
        //     time: 30,
        //     totalNum: 30,
        //     userName: "Name 1",
        // },
        // {
        //     date: "23/03/20",
        //     id: 91,
        //     totalScore: 9,
        //     time: 50,
        //     totalNum: 30,
        //     userName: "Name 2",
        // },
        // {
        //     date: "23/03/20",
        //     id: 92,
        //     totalScore: 6,
        //     time: 25,
        //     totalNum: 30,
        //     userName: "Name 3",
        // },
        // {
        //     date: "23/03/20",
        //     id: 93,
        //     totalScore: 4,
        //     time: 20,
        //     totalNum: 30,
        //     userName: "Name 4",
        // },
        // {
        //     date: "23/03/20",
        //     id: 94,
        //     totalScore: 7,
        //     time: 30,
        //     totalNum: 30,
        //     userName: "Name 5",
        // },
        // {
        //     date: "23/03/20",
        //     id: 95,
        //     totalScore: 3,
        //     time: 90,
        //     totalNum: 30,
        //     userName: "Name 6",
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