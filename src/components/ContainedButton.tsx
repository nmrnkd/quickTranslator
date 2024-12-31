import { Text, StyleSheet, ViewStyle, TextStyle, TouchableOpacity } from 'react-native'
import React from 'react'


type ContainedButtonProps = {
  text: string,
  textStyle: TextStyle | null,
  icon: JSX.Element;
  buttonStyle: ViewStyle | null,
  onPress: () => void;
};

const ContainedButton: React.FC<ContainedButtonProps> = ({icon, text, textStyle, buttonStyle, onPress}) => {

  return (
    <TouchableOpacity 
      activeOpacity={0.5}
      style={[styles.defaultButtonStyle, buttonStyle]}
      onPress={onPress}>
        <Text style={[textStyle, {marginRight: 4}]}>{text}</Text>
        { icon }
    </TouchableOpacity>
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
