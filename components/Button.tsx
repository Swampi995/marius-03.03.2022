import { StyleSheet, TouchableOpacity } from 'react-native';
import { useThemeColor, ThemeProps } from './Themed';
import { Text } from './Text';

type ButtonProps = ThemeProps & TouchableOpacity['props'] & { title: string, type?: 'primary' | 'secondary' };

export function Button(props: ButtonProps) {
    const { title, style, type = 'primary', lightColor, darkColor, ...otherProps } = props;
    const color = useThemeColor(type, { light: lightColor, dark: darkColor });

    return <TouchableOpacity style={[styles.container, { backgroundColor: color, minWidth: 150 }, style]} {...otherProps}>
        <Text style={styles.text}>{title}</Text>
    </TouchableOpacity>;
}

const styles = StyleSheet.create({
    container: {
        paddingVertical: 10,
        paddingHorizontal: 16,
        borderRadius: 5,
        alignItems: 'center',
    },
    text: {
        fontWeight: '600',
        fontSize: 16,
        color: 'white',
    }
});