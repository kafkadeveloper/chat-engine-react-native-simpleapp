import React from 'react'
import { StyleSheet, Text, View, Image } from 'react-native'

export default class Screen2 extends React.Component {
  static navigationOptions = {
    drawerLabel: 'Screen1',
  };

  render() {
    return (
      <View style={styles.container}>
        <Text>Screen 2</Text>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
})