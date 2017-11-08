import React, { Component } from 'react';
import { Text, View, } from "react-native";
import Navigation from '../Navigation/Navigation';
// import MessageEntry from "../components/MessageEntry";
// import MessageList from "../components/MessageList";

class Chat extends Component {
  render() {
    return (
      <View style={{flex:1}}>
        <Navigation screenProps={{chatEngine: this.props.chatEngine}}/>
      </View>
    );
  }
}

export default Chat;
