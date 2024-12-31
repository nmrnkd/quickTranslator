import { StyleSheet, View } from 'react-native'
import React from 'react'
import Icon from '@react-native-vector-icons/ionicons'
import { ActionButtonsIconName, IOType } from '../types';
import { palette } from '../lib/styles/colorPalette';


type ActionButtonsProps = {
  mode: IOType // text | voice
};

const ActionButtons: React.FC<ActionButtonsProps> = ({mode}) => {
  
  const MAX_LENGTH = mode == "Input" ? 2 : 3

  const buttons: { iconName: ActionButtonsIconName, onPress: () => void }[] = [
    { iconName: "volume-high", onPress: ()=>{}},
    { iconName: "copy", onPress: ()=>{}},
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
              size={24}
              onPress={()=>{console.log('onPress')}}
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
