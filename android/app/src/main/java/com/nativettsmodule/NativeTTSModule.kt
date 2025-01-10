package com.nativettsmodule

import android.speech.tts.TextToSpeech
import com.facebook.react.bridge.ReactApplicationContext
import com.facebook.react.bridge.ReactMethod
import com.nativettsmodule.NativeTTSModuleSpec
import java.util.Locale

class NativeTTSModule(reactContext: ReactApplicationContext) : NativeTTSModuleSpec(reactContext) {

  private var tts: TextToSpeech? = null

  init {
    tts = TextToSpeech(reactContext) { status -> }
  }

  override fun getName() = NAME

  @ReactMethod
  override fun speak(language: String, text: String) {
    val locale = Locale(language)
    tts?.setLanguage(locale)
    tts?.speak(text, TextToSpeech.QUEUE_FLUSH, null, "TTS_ID")
  }

  override fun invalidate() {
    tts?.shutdown()
  }

  companion object {
    const val NAME = "NativeTTSModule"
  }
}
