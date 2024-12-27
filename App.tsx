/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React, { useEffect } from 'react';
import { SafeAreaView, StyleSheet, Text, TouchableOpacity } from 'react-native';
import NativeLocalStorage from './specs/NativeLocalStorage';

function App(): React.JSX.Element {

  useEffect(()=>{
    NativeLocalStorage.setLanguage('ja-JP')
  },[])

  // const sampleText = `just because you like my voice doesn't mean you can use it to say something i don't mean`
  const sampleText = `こんにちは`

  return (
    <SafeAreaView style={{flex: 1, flexDirection: 'row', justifyContent: 'center', alignItems: 'center'}}>
      <TouchableOpacity 
        style={[styles.button, {backgroundColor: 'lightblue', marginRight: 16}]}
        onPress={()=>NativeLocalStorage.speak(sampleText)}>
        <Text style={{fontSize: 18}}>Speak</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  button: {
    width: 120,
    alignItems: 'center',
    paddingVertical: 24, 
    borderRadius: 16
  }
});

export default App;
