import type {TurboModule} from 'react-native';
import {TurboModuleRegistry} from 'react-native';

export interface Spec extends TurboModule { 
  speak(language: string, text: string): void; // 텍스트를 음성으로 출력
}

export default TurboModuleRegistry.getEnforcing<Spec>(
  'NativeTTSModule',
);