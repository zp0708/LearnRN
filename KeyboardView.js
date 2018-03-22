/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
  StyleSheet, Text, View, Image, TextInput, Dimensions, Keyboard
} from 'react-native';

let nativeImageSource = require('nativeImageSource');
let totalHeight = Dimensions.get('window').height;

export default class KeyboardView extends Component {

  constructor(props) {
    super(props);
    this.keyboardDidShowListener = null;
    this.keyboardDidHideListener = null;
    this.state = {KeyboardShown : false };
    this.onDissmissKeyboard = this.onDissmissKeyboard.bind(this);
  }

  keyboardDidShowHandler(event) {
    this.setState({KeyboardShown: true});
  }

  keyboardDidHideHandler(event) {
    this.setState({KeyboardShown: false});
  }

  componentWillMount() {
    this.keyboardDidShowListener = Keyboard.addListener('keyboardDidShow', this.keyboardDidShowHandler.bind(this));
    this.keyboardDidHideListener = Keyboard.addListener('keyboardDidHide', this.keyboardDidHideHandler.bind(this));
  }

  componentWillUnmount() {
    if(this.keyboardDidShowListener !== null) {
      this.keyboardDidShowListener.remove();
    }
    if(this.keyboardDidHideListener !== null) {
      this.keyboardDidHideListener.remove();
    }
  }

  onDissmissKeyboard() {
    Keyboard.dismiss();
    console.log('is it get focus?' + this.refs.bottomInput.isFocused() );
  }

  render() {
    return (
      <View style={[styles.container, this.state.KeyboardShown && styles.bumpedContainer]}>
          <Text style={styles.buttonStyple}
            onPress={this.onDissmissKeyboard}> 
            Dismiss Keyboard
          </Text>
          <TextInput style={styles.textInputStyles} ref='bottomInput' 
            onFocus={() => this.setState({bumpedUp : 1})}
            onEndEditing={()=> this.setState({bumpedUp: 0})}>

          </TextInput>
      </View>
    );
  }
}

var styles = StyleSheet.create({
  container: {
    flex: 1,
  },

  bumpedContainer : {
    marginBottom: 210,
    marginTop: -210,
  },

  buttonStyple : {
    top : 250,
    fontSize : 30,
    backgroundColor: 'grey',
  },

  textInputStyles : {
    position: 'absolute',
    top: totalHeight - 80,
    left: 20,
    width: 200,
    height: 30,
    fontSize: 20,
    backgroundColor: 'grey',
  }
});
