import { FC } from 'react';
import { StyleSheet } from 'react-native';
import { Text, View } from '../../components';

interface SpreadProps {
    maxBid: number;
    minAsk: number;
}

const Spread: FC<SpreadProps> = ({ maxBid, minAsk }) => {
    const spread = (!minAsk || !maxBid) ? 0 : Math.round((minAsk - maxBid) * 10) / 10;
    const percentage = Math.round((spread * 100 / (maxBid || 1)) * 100) / 100;
    return (
        <View style={styles.container}>
            <Text style={styles.textLeft}>Spread: {spread.toFixed(1)}</Text>
            <Text style={styles.text}>({percentage.toFixed(2)}%)</Text>
        </View>
    );
}

export default Spread;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
    },
    textLeft: {
        marginRight: 6,
        fontSize: 14,
    },
    text: {
        fontSize: 14,
    },
});
