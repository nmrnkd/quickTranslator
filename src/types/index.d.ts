// types.ts
export type IOType = "Input" | "Output";
export type InputType = "Text" | "Voice";
export type ActionType = "tts" | "copy" | "bookmark"
export type ActionButtonsIconName = "volume-high" | "copy" | "bookmark";
export type LanguageEntry = {
  label: string;   // 언어 이름
  value: string;   // iOS용 language-region 코드
  deepl: string;   // DeepL용 language 코드
};
