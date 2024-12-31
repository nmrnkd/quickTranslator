// typography.ts
import { StyleSheet } from 'react-native';
import { palette } from './colorPalette';

const textStyles = StyleSheet.create({
  Headline: {
    fontSize: 24,
    fontWeight: 'bold',
    lineHeight: 32,
    color: palette.bl1,
  },
  Title1: {
    fontSize: 20,
    fontWeight: '600',
    lineHeight: 28,
    color: palette.bl1,
  },
  Title2: {
    fontSize: 18,
    fontWeight: '500',
    lineHeight: 26,
    color: palette.bl1,
  },
  Title3: {
    fontSize: 16,
    fontWeight: '400',
    lineHeight: 24,
    color: palette.bl1,
  },
  body: {
    fontSize: 14,
    fontWeight: '400',
    lineHeight: 20,
    color: palette.bl1,
  },
});

export default textStyles