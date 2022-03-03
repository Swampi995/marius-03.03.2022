import { FC } from 'react';
import { StyleSheet } from 'react-native';
import { Text, View, useThemeColor, Dropdown } from '../../components';
import { provideMarketData, MARKET, OrdersData } from '../../services/ordersData';

interface HeaderProps {
    group: number;
    market: MARKET;
    changeGroup: (value: number) => void;
}

const Header: FC<HeaderProps> = ({ market, group, changeGroup }) => {

    const grey = useThemeColor('lightGrey');

    const changeValue = (value: string) => {
        changeGroup(parseFloat(value));
    };

    const options = market === 'PI_XBTUSD' ? [
        { label: '0.5', value: '0.5' },
        { label: '1', value: '1' },
        { label: '2.5', value: '2.5' }
    ] : [
        { label: '0.05', value: '0.05' },
        { label: '0.1', value: '0.1' },
        { label: '0.25', value: '0.25' }
    ];

    return (
        <View style={styles.container}>
            <View style={styles.top}>
                <Text style={styles.title}>Order Book</Text>
                <Dropdown label={`Group ${group}`} setValue={changeValue} value={group.toString()} options={options} />
            </View>
            <View style={[styles.bottom, { borderTopColor: grey, borderBottomColor: grey }]}>
                <Text style={[styles.text, { flex: 3, color: grey }]}>Price</Text>
                <Text style={[styles.text, { color: grey }]}>Size</Text>
                <Text style={[styles.text, { color: grey }]}>Total</Text>
            </View>
        </View>
    );
}

export default Header;

const styles = StyleSheet.create({
    container: {
        flex: 2,
    },
    top: {
        flex: 2,
        paddingHorizontal: 16,
        flexDirection: 'row',
        alignItems: 'flex-start',
        justifyContent: 'space-between',
    },
    bottom: {
        flex: 1,
        paddingTop: 6,
        borderTopWidth: 0.5,
        borderBottomWidth: 0.5,
        flexDirection: 'row',
    },
    title: {
        fontSize: 20,
        fontWeight: 'bold',
    },
    text: {
        flex: 2,
        textAlign: 'center',
        fontSize: 16,
    },
    picker: {
        marginVertical: 30,
        width: 300,
        padding: 10,
        borderWidth: 1,
        borderColor: "#666",
    }
});
