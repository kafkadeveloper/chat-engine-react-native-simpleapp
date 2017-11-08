import React, { Component } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TextInput,
} from "react-native";

import {LinearGradient} from 'expo';

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = { text: "" };
  }

  // onEnterUsername(value){
  //   if(this.state.text !== ""){
  //     this.props.loginWithName(this.state.text);
  //   } else{
  //     const now = new Date().getTime();
  //     const username = ["user", now].join("-");
  //     this.props.loginWithName(username);
  //   }
  // }

  render() {
    return (
      <LinearGradient
        colors={['#cb2d3e','#ef473a']}
        style={styles.login}
      >
        <Text style={styles.logo}> PubNub Chat-Engine </Text>
        <View style={styles.textInputContainer} > 
          <TextInput
            style={ styles.textInput }
            keyboardType={ 'web-search' }
            onSubmitEditing={ () => this.props.loginWithName(this.state.text)}
            editable={ true }
            maxLength={ 40 }
            placeholder="Login Name"
            onChangeText={text => this.setState({ text })}
            value={ this.state.text }
            underlineColorAndroid={"#FFCDD2"}
            placeholderTextColor={"#757575"}
            selectionColor={"#FFCDD2"}
          />
          
          <TouchableOpacity onPress={() => this.props.loginWithName(this.state.text) }>
            <LinearGradient
              colors={['#cb2d3e','#ef473a']}
              style={styles.button}
            >
                <Text style={{color:'white'}}> Login </Text>
            </LinearGradient>
          </TouchableOpacity>
        </View>
      </LinearGradient>
    );
  }
}

const styles = StyleSheet.create({
  login: {
    flex: 1,
    alignItems: "center",
    // justifyContent: "center",
    backgroundColor: "white",
    flexDirection: "column"
  },
  textInputContainer:{
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "white",
    flexDirection: "column",
    borderRadius: 8,
    padding: 20,
    elevation: 24,
    shadowOffset: { width: 10, height: 10 },
    shadowColor: 'black',
    shadowOpacity: 1,
    
  },
  textInput: {
    width: 200,
    height: 40,
    borderRadius:25,
    margin:10,
    padding: 10,
  },
  logo:{
    color:"#FFF",
    marginLeft: 20,
    marginRight: 20, 
    marginTop: 40,
    marginBottom: 50,
    fontSize: 32,
    fontWeight: 'bold',
  },
  button: {
    justifyContent:'center',
    alignItems: 'center',
    borderRadius: 5,
    height: 35,
    width: 200,
  }
});

export default Login;
