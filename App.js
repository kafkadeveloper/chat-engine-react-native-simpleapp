import React from "react";
import { StyleSheet, Text, View, Platform, StatusBar } from "react-native";
import { DrawerNavigator, StackNavigator } from "react-navigation";

import ChatEngineCore from "chat-engine";
import ChatEngineGravatar from "chat-engine-gravatar";

import MessageEntry from "./components/MessageEntry";
import MessageList from "./components/MessageList";
import UserList from "./components/UserList";
import ChatList from "./components/ChatList";

import LoginScreen from "./screens/Login";
import Chat from "./screens/Chat";

// import {MessageEntry} from "chat-engine-react-native";
// import {MessageList} from "chat-engine-react-native";
// import {UserList} from "chat-engine-react-native";

// const ChatEngine = ChatEngineCore.create({
//   publishKey: "pub-c-0fb6e2c9-c3fa-4dbc-9c8d-86a3813c73c8",
//   subscribeKey: "sub-c-e3f6d3fe-934e-11e7-a7b2-42d877d8495e"
// }, {
//   endpoint: 'http://eea61ff4.ngrok.io/insecure',
//   globalChannel: 'chat-engine-global-channel',
// });

const ChatEngine = ChatEngineCore.create(
  {
    publishKey: "pub-c-c6303bb2-8bf8-4417-aac7-e83b52237ea6",
    subscribeKey: "sub-c-67db0e7a-50be-11e7-bf50-02ee2ddab7fe"
  },
  {
    endpoint: "https://adamb-react-native-chat-engine.herokuapp.com/insecure",
    globalChannel: "ajb-global-test-channel-345346685234356"
  }
);

export default class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      chat: null,
      renderChat: false,
      me: null,
      globalChat: null
    };
  }

  componentDidMount() {
    //chatengine throws some warning about timing that is a part of the library itself
    // console.disableYellowBox = true;
    console.ignoredYellowBox = ["Setting a timer"];
  }

  loginWithName = (username) => {
    const now = new Date().getTime();

    if(username === ""){
      return; //do nothing on empty username
    }
    
    ChatEngine.connect(
      username,
      {
        name: username,
        signedOnTime: now
      },
      "auth-key"
    );

    ChatEngine.on("$.ready", data => {
      const me = data.me;

      this.setState({
        renderChat: true,
        me: data.me,
        globalChat: ChatEngine.global
      });

    });
  }

  render() {
    return (
      <View style={styles.container}>
        {Platform.OS === "ios" && <StatusBar barStyle="default" />}
        {Platform.OS === "android" && <View style={styles.statusBarUnderlay} />}

        {!this.state.renderChat ? (
          <LoginScreen loginWithName={this.loginWithName} />
        ) : (
          <View style={{ flex: 1 }}>
            <Chat chatEngine={ChatEngine}/>
          </View>
        )}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff"
  },
  statusBarUnderlay: {
    height: 24,
    backgroundColor: "rgba(0,0,0,0.2)"
  }
});
