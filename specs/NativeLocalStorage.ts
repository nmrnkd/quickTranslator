import type {TurboModule} from 'react-native';
import {TurboModuleRegistry} from 'react-native';

export interface Spec extends TurboModule { 
  setLanguage(language: string): void;// TTS 엔진 상태 설정
  speak(text: string): void; // 텍스트를 음성으로 출력
  // stop(): void; // 음성 출력 중지
  // stop 버튼을 따로 구현할지, 버튼 1개로 native단에서 현재 상태에 따라 출력과 정지를 결정할지는 일단 보류
}

export default TurboModuleRegistry.getEnforcing<Spec>(
  'NativeLocalStorage',
);