import { FC } from 'react';
import { StyleSheet } from 'react-native';
import { Text, View, useThemeColor } from '../../components';
import { Orders } from '../MainScreen';

interface BidsProps {
    maxTotal: number;
    bids: Orders;
}

const Bids: FC<BidsProps> = ({ maxTotal, bids }) => {
    const bidColor = useThemeColor('bid');
    const greenColor = useThemeColor('green');
    const whiteColor = useThemeColor('white');
    const limitedKeys = Object.keys(bids).sort((a, b) => parseFloat(a) - parseFloat(b)).slice(-12);

    return (
        <View style={[styles.container]}>
            {limitedKeys.map((key) => {
                const bid = bids[parseFloat(key)];
                const width = (bid.total * 100) / maxTotal;
                return <View key={bid.price} style={[styles.item]}>
                    <View style={[styles.bid, { backgroundColor: bidColor, width: `${width}%` }]}></View>
                    <Text style={[styles.text, { flex: 3, color: greenColor }]}>{bid.price.toLocaleString("en-US")}</Text>
                    <Text style={[styles.text, { color: whiteColor }]}>{bid.size.toLocaleString("en-US")}</Text>
                    <Text style={[styles.text, { color: whiteColor }]}>{bid.total.toLocaleString("en-US")}</Text>
                </View>
            })}
        </View>
    );
}

export default Bids;

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
    bid: {
        height: '100%',
        position: 'absolute',
    }
});
