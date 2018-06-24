import { AsyncStorage } from 'react-native';
import * as ACTION_TYPES from '../../app/constants/action-types';

// Add Game - CREATE (C)
export function createGame(game){
    return (dispatch) => {
        AsyncStorage.getItem('data', (err, gameStorage) => {
            if (gameStorage !== null){
                gameStorage = JSON.parse(gameStorage);
                gameStorage.game = game;
                AsyncStorage.setItem('data', JSON.stringify(gameStorage), () => {
                    dispatch({ type: ACTION_TYPES.CREATE_GAME, game: game });
                });
            }
        });
    };
}

// Get Data - READ (R)
export function getGame(){
    return (dispatch) => {
        AsyncStorage.getItem('data', (err, gameData) => {
            if (gameData !== null) {
                gameData = JSON.parse(gameData);
                dispatch({ type: ACTION_TYPES.GAME_AVAILABLE, game: gameData.game });
            }
        });
    };
}
