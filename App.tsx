/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React from 'react';
import { SafeAreaView, StyleSheet, Text, TouchableOpacity } from 'react-native';

function App(): React.JSX.Element {

  return (
    <SafeAreaView style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
      <TouchableOpacity style={{backgroundColor: 'lightgray', paddingVertical: 24, paddingHorizontal: 36, borderRadius: 16}}>
        <Text style={{fontSize: 18}}>Text to Speech</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  
});

export default App;
