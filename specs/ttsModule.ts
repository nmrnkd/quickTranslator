import type { TurboModule } from "react-native";
import { TurboModuleRegistry } from "react-native";

export interface Spec extends TurboModule { 
  // 텍스트를 음성으로 출력
  speak(text: string): void;

  // 음성 출력 중지
  stop(): void;

  // TTS 엔진 상태 설정
  setLanguage(language: string): void;
}

export default TurboModuleRegistry.getEnforcing<Spec>('TextToSpeech')