import { View, Text, StyleSheet, Pressable } from 'react-native'
import React from 'react'

type IconButtonProps = {
  icon: JSX.Element
  onPress: () => void
};

const IconButton: React.FC<IconButtonProps> = ({icon, onPress}) => {

  return (
    <Pressable onPress={onPress}>
      {icon}
    </Pressable>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'pink',
  },
  languageField: {
    backgroundColor: "lightyellow",
    padding: 16,
  }
})

export default IconButton
