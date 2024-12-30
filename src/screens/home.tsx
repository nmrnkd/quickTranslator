/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React, { useEffect, useState } from 'react';
import { SafeAreaView, StyleSheet, Text, TextInput, View } from 'react-native';
import NativeLocalStorage from '../../specs/NativeLocalStorage';
import SwitchSelector from 'react-native-switch-selector'
import Icon from '@react-native-vector-icons/ionicons';
import textStyles from '../lib/styles/textStyles';
import IconButton from '../components/IconButton';
import TranslationLayout from '../components/TranslationLayout';
import TextIconButton from '../components/ContainedButton';
import { InputType, ActionButtonsIconName } from '../types';
import ActionButtons from '../components/ActionButtons';
import viewStyles from '../lib/styles/viewStyles';
import { palette } from '../lib/styles/colorPalette';

const Home: React.FC = () => {

  const [inputType, setInputType] = useState<InputType>("Text") // 0: Text, 1: Voice
  const [inputText, setInputText] = useState<string>("")
  const [translatedText, setTranslatedText] = useState<string>("")

  const inputTypeOptions: { value: InputType, label: string, customIcon: JSX.Element}[] = [
    { value: "Text", label: "", customIcon: <Icon name='text' size={20} color={inputType == "Text" ? palette.wh : palette.bl }/> },
    { value: "Voice", label: "", customIcon: <Icon name='mic' size={20} color={inputType == "Voice" ? palette.wh : palette.bl }/> },
  ];

  useEffect(()=>{
    // 기본 언어 설정
    // NativeLocalStorage.setLanguage('ja-JP')
  },[])

  const translate = (): void => {
    // 번역 api 호출

    // 번역 결과 setState 
    setTranslatedText("번역 결과")
  }

  const handleOnFocus = (): void => {
    setInputText("")
    setTranslatedText("")
  }

  const Buttons: { iconName: ActionButtonsIconName, onPress: () => void }[] = [
    { iconName: "volume-high", onPress: ()=>{}},
    { iconName: "copy", onPress: ()=>{}},
    { iconName: "bookmark", onPress: ()=>{}}
  ]

  return (
    <SafeAreaView style={styles.container}>

      {/* InputType 선택 */}
      <View style={styles.selectorBox}>
        <SwitchSelector 
          options={inputTypeOptions} 
          onPress={(value: InputType)=>{setInputType(value)}} 
          initial={0}
          selectedColor={palette.wh}
          textColor={palette.main}
          buttonColor={palette.main}
          borderColor={palette.main}
          hasPadding
          style={{width: 120}}
          />
      </View>

      {/* 입/출력 창 */}
      <View style={styles.translationBox}>
        
        {/* 입력창 */}
        <TranslationLayout>
          {/* 입력 - 입력 필드 */}
          <View style={styles.textInputArea}> 
            <TextInput 
              value={inputText}
              onChangeText={(text: string)=>setInputText(text)} 
              placeholder="텍스트를 입력하세요"
              placeholderTextColor={"#b1b1b1"}
              style={textStyles.Title3}
              onFocus={handleOnFocus}
              />
          </View>

          {/* 입력 - 하단 버튼 영역 */}
          <View style={viewStyles.flexView}>  
            <ActionButtons mode={"Input"}/>
            <TextIconButton 
                icon={<Icon name="arrow-forward" size={16} color={"#FFF"} style={{marginLeft: 4}}/>}
                buttonStyle={{backgroundColor: palette.main, margin: 16}}
                text={"번역하기"}
                textStyle={textStyles.body}
                onPress={()=>{}}/>
          </View>
        </TranslationLayout>
            
        {/* 공백 */}
        <View style={styles.swapButtonBox} />       

       {/* 출력 */}
       <TranslationLayout>
          <View style={styles.textInputArea}> 
            <Text style={textStyles.body}>{translatedText}</Text>
          </View>
          {/* input: 음성 듣기, 복사 등 기능 + 번역 버튼 */}
          <View style={viewStyles.flexView}>  
            <ActionButtons mode={"Output"}/>
          </View>
       </TranslationLayout>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // backgroundColor: '#98d7ae'
    // backgroundColor: '#98a7ae'
    // backgroundColor: '#91adad'
    // backgroundColor: '#444444'
    backgroundColor: '#333333'
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
  languageField: {
    backgroundColor: "lightyellow",
    padding: 16,
  },
  textInputArea: {
    padding: 16,
    flex: 1
  },

});

export default Home;
