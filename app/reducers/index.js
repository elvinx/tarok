import { combineReducers } from 'redux';

import { GAME_AVAILABLE, CREATE_GAME } from "../constants/action-types"

let dataState = { game: {}, loading: true };

const dataReducer = (state = dataState, action) => {
    switch (action.type) {
        case CREATE_GAME:
            return Object.assign({}, state, { game: action.game });
        case GAME_AVAILABLE:
            return Object.assign({}, state, { game: action.game, loading: false });
        default:
            return state;
    }
};

// Combine all the reducers
const rootReducer = combineReducers({
    dataReducer
});

export default rootReducer;
