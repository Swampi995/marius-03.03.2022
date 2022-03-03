import { FC } from 'react';
import { StyleSheet } from 'react-native';
import { Text, View, useThemeColor } from '../../components';
import { Orders } from '../MainScreen';

interface AsksProps {
    maxTotal: number;
    asks: Orders;
}

const Asks: FC<AsksProps> = ({ maxTotal, asks }) => {
    const askColor = useThemeColor('ask');
    const redColor = useThemeColor('red');
    const whiteColor = useThemeColor('white');
    const limitedKeys = Object.keys(asks).sort((a, b) => parseFloat(b) - parseFloat(a)).slice(0, 12);

    return (
        <View style={[styles.container]}>
            {limitedKeys.map((key) => {
                const ask = asks[parseFloat(key)];
                const width = (ask.total * 100) / maxTotal;
                return <View key={ask.price} style={[styles.item]}>
                    <View style={[styles.ask, { backgroundColor: askColor, width: `${width}%` }]}></View>
                    <Text style={[styles.text, { flex: 3, color: redColor }]}>{ask.price.toLocaleString("en-US")}</Text>
                    <Text style={[styles.text, { color: whiteColor }]}>{ask.size.toLocaleString("en-US")}</Text>
                    <Text style={[styles.text, { color: whiteColor }]}>{ask.total.toLocaleString("en-US")}</Text>
                </View>
            })}
        </View>
    );
}

export default Asks;

const styles = StyleSheet.create({
    container: {
        flex: 8,
        overflow: 'hidden',
    },
    text: {
        paddingVertical: 4,
        flex: 2,
        textAlign: 'center'
    },
    item: {
        flexDirection: 'row',
    },
    ask: {
        height: '100%',
        position: 'absolute',
    }
});
