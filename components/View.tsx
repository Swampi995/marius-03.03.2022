import { View as DefaultView } from 'react-native';
import { useThemeColor, ThemeProps } from './Themed';

type ViewProps = ThemeProps & DefaultView['props'];

export function View(props: ViewProps) {
    const { style, lightColor, darkColor, ...otherProps } = props;
    const backgroundColor = useThemeColor('background', { light: lightColor, dark: darkColor });

    return <DefaultView style={[{ backgroundColor }, style]} {...otherProps} />;
}