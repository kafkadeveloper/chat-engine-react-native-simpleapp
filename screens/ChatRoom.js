import React from "react";
import { StyleSheet, Text, View, Image, KeyboardAvoidingView, ActivityIndicator} from "react-native";

import typingIndicator from "chat-engine-typing-indicator";
import ChatEngineMarkdown from "chat-engine-markdown";

import MessageEntry from "../components/MessageEntry";
import MessageList from "../components/MessageList";

export default class ChatRoom extends React.Component {
  static navigationOptions = ({ navigation, screenProps }) => ({
    drawerLabel: "ChatRoom",
    title: navigation.state.params.title
  });

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
    const chatEngine = this.props.screenProps.chatEngine;
    let chat = new chatEngine.Chat("General Chat", false);
    chat.plugin(typingIndicator({ timeout: 5000 }));

    chat.plugin(ChatEngineMarkdown({}));


    this.setState({
      chat: chat,
      renderChat: true,
      me: chatEngine.me,
      globalChat: chatEngine.global
    });
  }

  componentWillUpdate(newProps){
    let {title} = newProps.navigation.state.params;
    if(this.props.navigation.state.params.title !== title){
      const chatEngine = this.props.screenProps.chatEngine;
      let chat = new chatEngine.Chat(title, false);
      chat.plugin(typingIndicator({ timeout: 5000 }));
      chat.plugin(ChatEngineMarkdown({}));

      this.setState({
        chat: chat,
        renderChat: true,
        me: chatEngine.me,
        globalChat: chatEngine.global
      });
    }
  }

  render() {
    return (
      <View style={styles.container}>
        {this.state.renderChat ? (
          <View style={{flex:1,width:"100%"}}>
            <MessageList chat={this.state.chat}/>
            <MessageEntry chat={this.state.chat} typingIndicator keyboardVerticalOffset={80}/>
          </View>
        ) : (
        <View style={{flex:1, justifyContent:"center", alignItems:"center"}}>
            <ActivityIndicator size="large"/>
        </View>
        )}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center"
  }
});
