/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React, { useEffect, useRef, useState } from 'react';
import { Pressable, SafeAreaView, StyleSheet, Text, TextInput, View } from 'react-native';
import NativeTTSModule from '../../specs/NativeTTSModule';
import SwitchSelector from 'react-native-switch-selector'
import Icon from '@react-native-vector-icons/ionicons';
import textStyles from '../lib/styles/textStyles';
import ContainedButton from '../components/ContainedButton';
import { InputType, IOType, LanguageEntry } from '../types';
import ActionButtons from '../components/ActionButtons';
import { palette } from '../lib/styles/colorPalette';
import { Dropdown } from 'react-native-element-dropdown';
import { languages } from '../data/languageCode';


type LanguageSettings = {
  source: LanguageEntry;
  target: LanguageEntry;
};

const Home: React.FC = () => {

  const inputRef = useRef<TextInput | null>(null);

  const [inputType, setInputType] = useState<InputType>("Text") // 0: Text, 1: Voice
  const [inputText, setInputText] = useState<string>("")
  const [languageSettings, setLanguageSettings] = useState<LanguageSettings>({
    source: { deepl: "KO", value: "ko-KR", label: "한국어" }, // 초기값
    target: { deepl: "EN", value: "en-US", label: "영어" }, // 초기값
  });
  const [translatedText, setTranslatedText] = useState<string>("")

  const inputTypeOptions: { value: InputType, label: string, customIcon: JSX.Element}[] = [
    { value: "Text", label: "", customIcon: <Icon name='text' size={20} color={inputType == "Text" ? palette.bl3 : palette.wh }/> },
    { value: "Voice", label: "", customIcon: <Icon name='mic' size={20} color={inputType == "Voice" ? palette.bl3 : palette.wh }/> },
  ];
  
  const dropdownKey = [
    { initialValue: "ko-KR", type: "source"},
    { initialValue: "en-US", type: "target"}
  ]

  useEffect(()=>{
    // 기본 언어 설정
    // NativeTTSModule.setLanguage('ja-JP')
  },[])

  const translate = async(): Promise<void> => {
    inputRef.current?.blur()

    // 번역 api 호출    
    const data = {
      "text": [inputText],
      // "source_lang": languageSettings.source.deepl,
      "target_lang": languageSettings.target.deepl
    }

    try {
      const response = await fetch(`${process.env.DEEPL_URL}`, {
        method: 'POST',
        headers: {
          'Authorization': `DeepL-Auth-Key ${process.env.DEEPL_API_KEY}`, 
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const result = await response.json();
      setTranslatedText(result.translations[0].text);
    } catch (error) {
      setTranslatedText('Translation failed.');
    }
  }

  const handleOnFocus = (): void => {
    setInputText("")
    setTranslatedText("")
  }
  
  const handleOnPress = (mode: IOType) => {
    const target = 
      mode == "Input" ? {
        language: languageSettings.source.value,
        text: inputText 
      } : 
      {
        language: languageSettings.target.value,
        text: translatedText 
      }
    NativeTTSModule.speak(target.language, target.text)
  }

  const handleOnChange = (selected: LanguageEntry & { _index?: number }, key: string) => {
    // Dropdown의 onChange에서 _index를 포함하여 반환하는데 state에 저장할때는 _index 값 빼고
    const { _index, ...data } = selected
    setLanguageSettings((prev)=>({...prev, [key]: data}))
  };

  return (
    <Pressable 
      style={styles.container} 
      // 화면 여백 터치시 keyboard 내리기
      onPress={()=>{inputRef.current?.blur()}}> 
      <SafeAreaView style={{flex: 1}}>
        {/* InputType 선택 */}
        <View style={styles.selectorBox}>
          <SwitchSelector 
            initial={0}
            options={inputTypeOptions} 
            buttonColor={palette.main}
            backgroundColor={palette.bl5}
            style={{width: 110}}
            onPress={(value: InputType)=>{setInputType(value)}} 
            />
        </View>

        {/* 출/도착 언어 선택 */}
        <View style={styles.languageField}>
          {
            dropdownKey.map((item, index)=> 
              {
              return (
                <React.Fragment key={index}>
                  <Dropdown
                    data={languages}
                    value={item.initialValue}
                    labelField="label"
                    valueField="value"
                    // 출력 언어 선택시 input 유무 여부에 따라 번역 함수 호출해야함.
                    // 입력 언어 선택시 현재 선택된 언어와 같은지 비교 후 input 내용 없애야함 (?)
                    onChange={(value)=>handleOnChange(value, item.type)}
                    style={{width: 100}}
                    maxHeight={300}
                    placeholderStyle={styles.dropdownPlaceholderStyle}
                    selectedTextStyle={styles.dropdownSelectedTextStyle}
                    iconStyle={styles.dropdownIconStyle}
                    itemContainerStyle={styles.dropdownitemContainerStyle}
                    containerStyle={styles.dropdownContainerStyle}
                  />
                  {
                    !index && <Icon name="swap-horizontal" color={"#FFF"} size={18}/>
                  }
                </React.Fragment>
              )
            })
          }
        </View>
        <View style={styles.translationBox}>
          <Text style={styles.language}>{languageSettings.source.label}</Text>
          {/* 입력 - 입력 필드 */}
          <View style={styles.textInputArea}> 
            <TextInput
              multiline
              ref={inputRef}
              value={inputText}
              onChangeText={(text: string)=>setInputText(text)} 
              placeholder="번역할 텍스트를 입력하세요"
              placeholderTextColor={"#b1b1b1"}
              style={[textStyles.Title3, { color: palette.main}]}
              onFocus={handleOnFocus}
              // maxLength={} // 번역 글자수 제한 나중에 구현
              />
          </View>

          {/* 입력 - 하단 버튼 영역 */}
          <View style={styles.toolbar}>  
            <ActionButtons mode={"Input"} propFunc={handleOnPress}/>
            <ContainedButton 
                icon={<Icon name="arrow-forward" size={14} color={palette.bl0} />}
                buttonStyle={{backgroundColor: palette.main, paddingHorizontal: 12, paddingVertical: 4}}
                text={"번역하기"}
                textStyle={textStyles.body}
                onPress={translate}/>
          </View>
        </View>

        <View style={styles.translationBox}>
        <Text style={styles.language}>{languageSettings.target.label}</Text>
          <View style={styles.textInputArea}> 
            <Text style={[textStyles.body, {color: palette.main}]}>{translatedText}</Text>
          </View>
          {/* input: 음성 듣기, 복사 등 기능 + 번역 버튼 */}
          {/* 입/출력 별로 위치, 구성 조정하고 출력때는 번역 결과 있을때만 show */}
          <View style={styles.toolbar}>  
            <ActionButtons mode={"Output"} propFunc={handleOnPress}/>
          </View>
        </View>
      </SafeAreaView>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: palette.bl3
  },
  selectorBox: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 8,
  },
  languageField: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    marginTop: 16,
    marginBottom: 32,
    marginHorizontal: 16
  },
  translationBox: {
    backgroundColor: palette.bl5,
    height: 240,
    margin: 16,
    marginTop: 0,
    borderRadius: 8
  },
  language: {
    color: palette.wh,
    fontSize: 16,
    fontWeight: 500,
    marginLeft: 16,
    marginTop: 24,
  },
  textInputArea: {
    padding: 16,
    flex: 1
  },
  toolbar: {
    flexDirection: 'row',
    marginHorizontal: 16,
    paddingVertical: 16,
  },
  dropdownPlaceholderStyle: {color: 'white',},
  dropdownSelectedTextStyle: {color: 'white', textAlign: 'center',  fontSize: 18, fontWeight: '500'},
  dropdownIconStyle: {tintColor: '#FFF'},
  dropdownitemContainerStyle: {borderRadius: 8},
  dropdownContainerStyle: { width: 150, marginTop: 16, marginLeft: -16, borderRadius: 8}
});

export default Home;
