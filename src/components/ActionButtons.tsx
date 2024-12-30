import { View } from 'react-native'
import React from 'react'
import Icon from '@react-native-vector-icons/ionicons'
import { ActionButtonsIconName, IOType } from '../types';
import IconButton from './IconButton';


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
    <View style={{ flexDirection: 'row', backgroundColor: 'blue', flex: 1, alignItems: 'flex-end', margin: 16}}>
    {
      buttons.map((item, index)=>{
        return(
          index < MAX_LENGTH &&
            <IconButton 
              key={index}
              icon={<Icon name={item.iconName} size={24} style={{padding: 8, paddingHorizontal: 12}} color={'#FFF'}/>}
              onPress={()=>{}} />
        )
      })
    }
  </View>
  )
}

export default ActionButtons
