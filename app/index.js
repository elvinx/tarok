'use strict';

import React, { Component } from 'react';
import { View } from 'react-native';

import { Router, Scene, Reducer } from 'react-native-router-flux';

import Home from './components/Home'
import NewGame from './components/NewGame'

import { connect } from 'react-redux';
import { getGame } from './actions'

//Reducer for Router - See react-native-router-flux package README for more info
const reducerCreate = params => {
    const defaultReducer = new Reducer(params);
    return (state, action) => {
        return defaultReducer(state, action);
    };
};

class Main extends Component {
    render() {
        return (
            <View style={{flex:1}}>
                <Router createReducer={reducerCreate}>
                    <Scene key="root">
                        <Scene key="Home" component={Home} title="Home" initial/>
                        <Scene key="NewGame" component={NewGame} title="New Game"/>
                    </Scene>
                </Router>
            </View>
        );
    }
}

function mapStateToProps(state, props) {
    return {}
}

//Connect everything
export default connect(mapStateToProps, {getGame})(Main);
