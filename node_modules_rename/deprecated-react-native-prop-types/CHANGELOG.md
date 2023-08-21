# Next

# 4.1.0 / 2023-04-19

- Added logical inset properties: `inset`, `insetBlock`, `insetBlockEnd`, `insetBlockStart`, `insetInline`, `insetInlineEnd`, `insetInlineStart` (https://github.com/facebook/react-native-deprecated-modules/pull/12)
- Added logical border properties: `borderEndEndRadius`, `borderEndStartRadius`, `borderStartEndRadius`, `borderStartStartRadius` (https://github.com/facebook/react-native-deprecated-modules/pull/14)
- Fixed `aria-live` declaration. (https://github.com/facebook/react-native-deprecated-modules/pull/20)

# 4.0.0 / 2022-12-13

- Compatible with React Native 0.72
- Updated dependency from `@react-native/normalize-color` to 
  `@react-native/normalize-colors` due to upstream renaming of such dependency, 
  needed for compatibility with 0.72
- This major bump is needed as `react-native@0.71` will still use 
  `@react-native/normalize-color` and we want users of 0.71 to continue depending 
  on 3.0.1.

# 3.0.1 / 2022-12-02

- Compatible with React Native 0.71
- Improvements to `ImagePropTypes`
  - Merged Android and default definitions.
  - Included all of `ViewPropTypes`.
  - Improved types for `defaultSource` and `source`.
  - Added `alt`, `crossOrigin`, `height`, `referrerPolicy`, `src`, `srcSet`, `tintColor`, and `width`.
  - Added `objectFit` to `style`.
- Improvements to `LayoutPropTypes`
  - Changed `aspectRatio` so it can be a string ratio.
  - Added `{margin,padding}{Block,Inline}{,End,Start}`.
  - Added `columnGap`, `gap`, and `rowGap`.
- Improvements to `TextInputPropTypes`
  - Renamed `autoCompleteType` to `autoComplete`.
  - Added many new valid values for `autoComplete`.
  - Added `cursorColor`, `enterKeyHint`, `inputMode`, `lineBreakStrategyIOS`, `readOnly`, `rows`, and `submitBehavior`.
- Improvements to `ViewAccessibility`
  - Added many new valid values for `accessibilityRole`.
  - Changed `accessibilityActions` to consist of objects, not strings.
- Improvements to `TextPropTypes`
  - Added `accessibilityActions`, `accessibilityHint`, `accessibilityLabel`, `accessibilityLanguage`, `accessibilityRole`, `accessibilityState`, `aria-busy`, `aria-checked`, `aria-disabled`, `aria-expanded`, `aria-label`, `aria-labelledby`, `aria-selected`, `dynamicTypeRamp`, `id`, `lineBreakStrategyIOS`, `onAccessibilityAction`, and `role`.
  - Added `onPressIn`, `onPressOut`, `onResponderGrant`, `onResponderMove`, `onResponderRelease`, `onResponderTerminate`, `onResponderTerminationRequest`, `onStartShouldSetResponder`, `onMoveShouldSetResponder`, and `onTextLayout`.
  - Added numeric and named values for `fontWeight` in `style`.
  - Added string and stylistic values for `fontVariant` in `style`.
  - Added `userSelect` and `verticalAlign` in `style`.
- Improvements to `TransformPropTypes`
  - Removed deprecated props: `decomposedMatrix`, `rotation`, `scaleX`, `scaleY`, `transformMatrix`, `translateX`, `translateY`
- Improvements to `ViewPropTypes`
  - Changed `hitSlop` to accept a number.
  - Added `accessibilityLabelledBy`, `accessibilityLanguage`, `aria-busy`, `aria-checked`, `aria-disabled`, `aria-expanded`, `aria-hidden`, `aria-label`, `aria-labelledby`, `aria-live`, `aria-modal`, `aria-selected`, `aria-valuemax`, `aria-valuemin`, `aria-valuenow`, `aria-valuetext`, `focusable`, `id`, `nativeBackgroundAndroid`, `nativeForegroundAndroid`, `onAccessibilityEscape`, `onClick`, `role`, and `tabIndex.`
  - Added mouse, pointer, focus, and touch event props.
  - Added `borderCurve` and `pointerEvents` to `style`.
