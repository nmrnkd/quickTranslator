import { StyleSheet, View } from 'react-native'
import React from 'react'
import Icon from '@react-native-vector-icons/ionicons'
import { ActionButtonsIconName, IOType } from '../types';
import { palette } from '../lib/styles/colorPalette';


type ActionButtonsProps = {
  type: IOType // text | voice
  onAction(actionType: string, type: IOType): void
};

const ActionButtons: React.FC<ActionButtonsProps> = ({type, onAction}) => {
  
  const MAX_LENGTH = type == "Input" ? 2 : 3

  const buttons: { iconName: ActionButtonsIconName, onPress: () => void }[] = [
    { iconName: "volume-high", onPress: ()=>{onAction("tts", type)}},
    { iconName: "copy", onPress: ()=>{onAction("copy", type)}},
    { iconName: "bookmark", onPress: ()=>{}}
  ]

  return (
    <View style={styles.container}>
    {
      buttons.map((item, index)=>{
        return(
          index < MAX_LENGTH &&
            <Icon 
              key={index}
              name={item.iconName} 
              size={20}
              onPress={item.onPress}
              style={{padding: 8, paddingHorizontal: 16}} 
              color={palette.main} />
        )
      })
    }
  </View>
  )
}
const styles = StyleSheet.create({
  container: {
    flex: 1, 
    flexDirection: 'row',
  }
})

export default ActionButtons
