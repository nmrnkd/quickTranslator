//
//  RCTNativeLocalStorage.m
//  quickTranslator
//
//  Created by Mikasa on 12/24/24.
//

#import "RCTNativeLocalStorage.h"
#import <AVFoundation/AVFoundation.h>
#import <React/RCTLog.h>

@interface RCTNativeLocalStorage ()
@property (nonatomic, strong) AVSpeechSynthesizer *speechSynthesizer;
@property (nonatomic, copy) NSString *currentLanguage;
@end

@implementation RCTNativeLocalStorage

RCT_EXPORT_MODULE(NativeLocalStorage)

- (instancetype)init {
  if (self = [super init]) {
    _speechSynthesizer = [[AVSpeechSynthesizer alloc] init];
    _currentLanguage = [[NSLocale preferredLanguages] firstObject];
    RCTLogInfo(@"Default language set to %@", _currentLanguage);
  }
  return self;
}

- (void)setLanguage:(NSString *)language {
  if (language.length > 0) {
    _currentLanguage = language;
    RCTLogInfo(@"Language updated to %@", _currentLanguage);
  } else {
    RCTLogError(@"Language parameter is empty.");
  }
}

- (void)speak:(NSString *)text {
  if (text.length > 0) {
    AVSpeechUtterance *utterance = [[AVSpeechUtterance alloc] initWithString:text];
    utterance.voice = [AVSpeechSynthesisVoice voiceWithLanguage:_currentLanguage];
    utterance.rate = AVSpeechUtteranceDefaultSpeechRate;
    utterance.pitchMultiplier = 1.0;

    if (_speechSynthesizer.isSpeaking) {
      [_speechSynthesizer stopSpeakingAtBoundary:AVSpeechBoundaryImmediate];
    }
    [_speechSynthesizer speakUtterance:utterance];
  } else {
    RCTLogError(@"Text parameter is empty.");
  }
}

//- (void)stop {
//  if (_speechSynthesizer.isSpeaking) {
//    [_speechSynthesizer stopSpeakingAtBoundary:AVSpeechBoundaryImmediate];
//    RCTLogInfo(@"Speech stopped.");
//  } else {
//    RCTLogInfo(@"Speech synthesizer is not speaking.");
//  }
//}

- (std::shared_ptr<facebook::react::TurboModule>)getTurboModule:(const facebook::react::ObjCTurboModule::InitParams &)params {
      return std::make_shared<facebook::react::NativeLocalStorageSpecJSI>(params);
    }

@end
