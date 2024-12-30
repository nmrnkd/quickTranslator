import { View, Text, StyleSheet, Pressable, TextInput, TouchableOpacity } from 'react-native'
import React from 'react'
import Icon from '@react-native-vector-icons/ionicons'

type TranslationLayoutProps = {
  children: React.ReactNode;
};

const TranslationLayout: React.FC<TranslationLayoutProps> = ({children}) => {

  return (
     <View style={styles.container}>
      {/* 입력 - 언어 선택 */}
      <View style={styles.languageField}>
        <Text>selectBox(언어 선택)</Text>
      </View>
      { children }
    </View>
  )
}

export default TranslationLayout

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'pink',
  },
  languageField: {
    backgroundColor: "lightyellow",
    padding: 16,
  },
  textInputArea: {
    padding: 16
  },
  textInputStyle: {
    fontSize: 24
  },
  selectorBox: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'lightblue',
    paddingVertical: 8
  },
  translationBox: {
    flex: 1,
    backgroundColor: 'pink',
  },
  swapButtonBox: {
    paddingVertical: 16,
    backgroundColor: 'lightgreen',
    alignItems: 'center'
  },
})