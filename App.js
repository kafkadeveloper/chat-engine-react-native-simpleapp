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

// WARNING: PUBNUB KEYS REQUIRED FOR EXAMPLE TO FUNCTION
const PUBLISH_KEY = '';
const SUBSCRIBE_KEY = '';

// just making sure you're paying attention
if (PUBLISH_KEY === '' || SUBSCRIBE_KEY === '') {
    alert('You forgot to enter your keys');
}

const ChatEngine = ChatEngineCore.create(
  {
    publishKey: PUBLISH_KEY,
    subscribeKey: SUBSCRIBE_KEY
  },
  {
    globalChannel: "ajb-global-test-channel-345346685234356343"
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
