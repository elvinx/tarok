import React, { Component } from 'react';
import {StyleSheet, View, Platform, Dimensions, Text, LayoutAnimation, Keyboard, TextInput, TouchableOpacity} from 'react-native';

import { connect } from 'react-redux';
import { createGame } from '../actions'
import { Actions } from 'react-native-router-flux';

const NAVBAR_HEIGHT = (Platform.OS === 'ios') ? 64 : 54;

const { width: windowWidth, height: windowHeight } = Dimensions.get('window');
const HEIGHT = windowHeight - NAVBAR_HEIGHT;

class NewGame extends Component {

    constructor() {
        super();
        this.state = { players : "" }
    }

    componentWillMount() {
        Keyboard.addListener('keyboardWillShow', (e) => this._keyboardWillShow(e));
        Keyboard.addListener('keyboardWillHide', (e) => this._keyboardWillHide(e));
    }

    componentWillUnmount() {
        Keyboard.removeListener('keyboardWillShow', (e) => this._keyboardWillShow(e));
        Keyboard.removeListener('keyboardWillHide', (e) => this._keyboardWillHide(e));
    }

    render() {
        return (
            <View style={{flex: 1, backgroundColor: '#fff'}}>
                <View style={{flex:1, paddingLeft:10, paddingRight:10}}>
                    <TextInput
                        style={[{height: 100}]}
                        onChangeText={(text) => this.setState({ players: text })}
                        placeholder={"Enter Players"}
                        value={this.state.players}
                    />
                </View>
                <TouchableOpacity style={[styles.saveBtn]} disabled={(!(this.state.players.length > 0))} onPress={this.createGame.bind(this)}>
                    <Text style={[styles.navText,
                        {
                            fontWeight: "500",
                            color: (this.state.players.length > 0) ? "#FFF" : "rgba(255,255,255,.5)"
                        }]}>
                        Save
                    </Text>
                </TouchableOpacity>
            </View>
        );
    }

    createGame() {
        const game = { "players": this.state.players } ;
        this.props.createGame(game);
        Actions.pop();
    }

    _keyboardWillShow(e) {
        LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
        let newHeight = HEIGHT - e.endCoordinates.height;
        this.setState({height: newHeight})
    }

    _keyboardWillHide() {
        LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
        this.setState({height: HEIGHT})
    }
}

function mapStateToProps(state, props) {
    return {}
}

//Connect everything
export default connect(mapStateToProps, { createGame })(NewGame);

const styles = StyleSheet.create({
    saveBtn:{
        width: windowWidth,
        height: 44,
        justifyContent: "center",
        alignItems: 'center',
        backgroundColor:"#6B9EFA"
    },
    title: {
        fontWeight: "400",
        lineHeight: 22,
        fontSize: 16,
        height:25+32,
        padding: 16,
        paddingLeft:0
    },
});
