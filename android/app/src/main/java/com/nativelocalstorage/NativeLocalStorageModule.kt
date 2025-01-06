package com.nativelocalstorage

import android.speech.tts.TextToSpeech
import com.facebook.react.bridge.Promise
import com.facebook.react.bridge.ReactApplicationContext
import com.facebook.react.bridge.ReactMethod
import com.nativelocalstorage.NativeLocalStorageSpec
import java.util.Locale

class NativeLocalStorageModule(reactContext: ReactApplicationContext) : NativeLocalStorageSpec(reactContext) {

  private var tts: TextToSpeech? = null

  init {
    tts = TextToSpeech(reactContext) { status -> }
  }

  override fun getName() = NAME

  @ReactMethod
  override fun setLanguage(language: String?) {
    val locale = Locale(language)
    val result = tts?.setLanguage(locale)
//    if (result == TextToSpeech.LANG_AVAILABLE || result == TextToSpeech.LANG_COUNTRY_AVAILABLE) {
//      promise.resolve("Language set to $language")
//    } else {
//      promise.reject("LANG_ERROR", "Language not supported: $language")
//    }
  }

  @ReactMethod
  override fun speak(text: String) {
    tts?.speak(text, TextToSpeech.QUEUE_FLUSH, null, "TTS_ID")
//    promise.resolve("Speaking: $text")
  }

  override fun invalidate() {
    tts?.shutdown()
  }

  companion object {
    const val NAME = "NativeLocalStorage"
  }
}
