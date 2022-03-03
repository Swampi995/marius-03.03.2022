import { FC } from 'react';
import { StyleSheet } from 'react-native';
import { View, Button } from '../../components';
import { MARKET } from '../../services/ordersData';

interface ActionsProps {
    market: MARKET;
    setMarket: (market: MARKET) => void;
    killed: boolean;
    setKilled: (killed: boolean) => void;
}

const Actions: FC<ActionsProps> = ({ market, setMarket, killed, setKilled }) => {

    const toggleFeed = () => {
        setMarket(market === 'PI_XBTUSD' ? 'PI_ETHUSD' : 'PI_XBTUSD');
    }

    const killFeed = () => {
        setKilled(!killed);
    }

    return (
        <View style={styles.container}>
            <Button title={'Toggle Feed'} onPress={toggleFeed} />
            <Button type={'secondary'} title={'Kill Feed'} onPress={killFeed} />
        </View>
    );
}

export default Actions;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingTop: 16,
        paddingHorizontal: 30,
    },
});
