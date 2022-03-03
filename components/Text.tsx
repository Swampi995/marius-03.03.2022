import { Text as DefaultText } from 'react-native';
import { useThemeColor, ThemeProps } from './Themed';

type TextProps = ThemeProps & DefaultText['props'] & { fontFamily?: 'space-mono' };

export function Text(props: TextProps) {
  const { fontFamily, style, lightColor, darkColor, ...otherProps } = props;
  const color = useThemeColor('text', { light: lightColor, dark: darkColor });

  return <DefaultText style={[{ color, fontFamily }, style]} {...otherProps} />;
}
