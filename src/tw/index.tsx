import { styled } from "nativewind";
import { 
  View as RNView, 
  Text as RNText, 
  ScrollView as RNScrollView, 
  TextInput as RNTextInput, 
  Pressable as RNPressable,
  TouchableHighlight as RNTouchableHighlight
} from "react-native";
import { Link as RouterLink } from "expo-router";

// Create styled versions of standard components for NativeWind v4
export const View = styled(RNView);
export const Text = styled(RNText);
export const ScrollView = styled(RNScrollView);
export const TextInput = styled(RNTextInput);
export const Pressable = styled(RNPressable);
export const TouchableHighlight = styled(RNTouchableHighlight);
export const Link = styled(RouterLink);

// Types for better DX
export type ViewProps = React.ComponentProps<typeof View>;
export type TextProps = React.ComponentProps<typeof Text>;
export type ScrollViewProps = React.ComponentProps<typeof ScrollView>;
export type TextInputProps = React.ComponentProps<typeof TextInput>;
export type PressableProps = React.ComponentProps<typeof Pressable>;
