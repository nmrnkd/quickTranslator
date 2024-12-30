import { View, Text, StyleSheet, Pressable, ViewProps, ViewStyle, TextStyle } from 'react-native'
import React from 'react'
import Icon from '@react-native-vector-icons/ionicons'


type ContainedButtonProps = {
  text: string,
  textStyle: TextStyle | null,
  icon: JSX.Element;
  buttonStyle: ViewStyle | null,
  onPress: () => void;
};

const ContainedButton: React.FC<ContainedButtonProps> = ({icon, text, textStyle, buttonStyle, onPress}) => {

  return (
    <Pressable 
      style={[styles.defaultButtonStyle, buttonStyle]}
      onPress={onPress}>
        <Text style={[textStyle]}>{text}</Text>
        { icon }
    </Pressable>
  )
}

const styles = StyleSheet.create({
  defaultButtonStyle: {
    backgroundColor: "#FFF",
    borderRadius: 30,
    flexDirection: 'row',
    padding: 12,
    alignItems: 'center'
  },
})

export default ContainedButton
