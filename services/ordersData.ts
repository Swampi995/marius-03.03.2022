import { useState } from 'react';
import useWebSockets from '../hooks/useWebSockets';

export interface OrdersData {
    asks: [price: number, size: number][];
    bids: [price: number, size: number][];
    feed: string;
    product_id: string;
}

export type MARKET = 'PI_XBTUSD' | 'PI_ETHUSD';

const URL = 'wss://www.cryptofacilities.com/ws/v1';
const SUBSCRIBE = (market: MARKET) => `{ "event": "subscribe", "feed": "book_ui_1", "product_ids": ["${market}"] }`;
const UNSUBSCRIBE = (market: MARKET) => `{"event":"unsubscribe","feed":"book_ui_1","product_ids":["${market}"]}`;

export function provideMarketData(market: MARKET) {
    const [internalMarket, setInternalMarket] = useState<MARKET>('PI_XBTUSD');
    const websocket = useWebSockets<OrdersData>(URL, SUBSCRIBE(market), UNSUBSCRIBE(market));

    const subscribe = (market: MARKET) => {
        setInternalMarket(market);
        websocket.subscribeWebSocket(SUBSCRIBE(market), UNSUBSCRIBE(internalMarket));
    }

    const setStop = (value: boolean) => () => {
        websocket.stopSocket(value);
    }

    return { data: websocket.data, subscribe, stop: setStop(false), start: setStop(true) };
}