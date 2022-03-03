import { useState } from 'react';
import { StyleSheet } from 'react-native';
import { View } from '../components';
import Header from './book/Header';
import Actions from './book/Actions';
import Spread from './book/Spread';
import Asks from './book/Asks';
import Bids from './book/Bids';
import { provideMarketData, MARKET, OrdersData } from '../services/ordersData';

export interface Orders {
  [key: number]: {
    price: number,
    size: number,
    total: number
  }
}

export default function MainScreen() {
  const [group, setGroup] = useState(0.5);
  const [killed, setKilled] = useState(false);
  const [market, setMarket] = useState<MARKET>('PI_XBTUSD');
  const marketHook = provideMarketData(market);

  const toggleMaket = (newMarket: MARKET) => {
    setMarket(newMarket);
    if (newMarket === 'PI_XBTUSD') {
      setGroup(0.5);
    } else {
      setGroup(0.05);
    }

    marketHook.subscribe(newMarket);
  }

  const toggleKilled = (newKilled: boolean) => {
    setKilled(newKilled);

    if (!newKilled) {
      marketHook.stop();
    } else {
      marketHook.start();
    }
  }

  const { items: asks, maxTotal: askMax, min: minAsk } = processOrders(marketHook.data?.asks, group);
  const { items: bids, maxTotal: bidMax, max: maxBid } = processOrders(marketHook.data?.bids, group);

  const maxTotal = Math.max(askMax, bidMax);

  return (
    <View style={styles.container}>
      <Header market={market} group={group} changeGroup={setGroup} />
      <Asks asks={asks} maxTotal={maxTotal} />
      <Spread maxBid={maxBid} minAsk={minAsk} />
      <Bids bids={bids} maxTotal={maxTotal} />
      <Actions market={market} setMarket={toggleMaket} killed={killed} setKilled={toggleKilled} />
    </View>
  );
}

export const processOrders = (orders: OrdersData['asks'] | OrdersData['bids'] | undefined, group: number) => {
  if (!orders?.length) {
    return { items: {}, maxTotal: 0, max: 0, min: 0 };
  }

  const items = orders.reduce((all: Orders, [price, size]) => {
    if (size !== 0) {
      const matchGroup = Object.keys(all).find((p) => Math.abs(parseFloat(p) - price) <= group);
      if (!matchGroup) {
        all[price] = {
          price,
          size,
          total: 0,
        }
      } else {
        all[parseFloat(matchGroup)].size += size;
      }
    }

    return all;
  }, {}) || {};

  let max = 0;
  let min = Number.MAX_SAFE_INTEGER;
  let maxTotal = 0;
  const sortedKeys = Object.keys(items).sort((a, b) => parseFloat(a) - parseFloat(b));
  sortedKeys.map((key, index) => {
    const lastKey = parseFloat(sortedKeys[index - 1]);
    items[parseFloat(key)].total = items[parseFloat(key)].size + (items[lastKey]?.total || 0);
    maxTotal = Math.max(items[parseFloat(key)].total, maxTotal);
    max = Math.max(items[parseFloat(key)].price, max);
    min = Math.min(items[parseFloat(key)].price, min);
  });

  return { items, maxTotal, max, min };
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
