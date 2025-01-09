//
//  RCTTTSModule.m
//  quickTranslator
//
//  Created by Mikasa on 12/24/24.
//

#import "RCTNativeTTSModule.h"
#import <AVFoundation/AVFoundation.h>
#import <React/RCTLog.h>

@interface RCTNativeTTSModule ()
@property (nonatomic, strong) AVSpeechSynthesizer *speechSynthesizer;
@property (nonatomic, copy) NSString *currentLanguage;
@end

@implementation RCTNativeTTSModule

RCT_EXPORT_MODULE(NativeTTSModule);

- (instancetype)init {
  if (self = [super init]) {
    _speechSynthesizer = [[AVSpeechSynthesizer alloc] init];
  }
  return self;
}

- (std::shared_ptr<facebook::react::TurboModule>)getTurboModule:(const facebook::react::ObjCTurboModule::InitParams &)params {
  return std::make_shared<facebook::react::NativeTTSModuleSpecJSI>(params);
}

- (void)speak:(NSString *)language text:(NSString *)text{
  if (text.length > 0) {
    AVSpeechUtterance *utterance = [[AVSpeechUtterance alloc] initWithString:text];
    utterance.voice = [AVSpeechSynthesisVoice voiceWithLanguage:language];
    utterance.rate = AVSpeechUtteranceDefaultSpeechRate;
    utterance.pitchMultiplier = 1.0;
    
    if (_speechSynthesizer.isSpeaking) {
      [_speechSynthesizer stopSpeakingAtBoundary:AVSpeechBoundaryImmediate];
    }
    
    [_speechSynthesizer speakUtterance:utterance];
  }
}

@end
