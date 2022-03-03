import { useEffect, useState } from 'react';

export default function useWebSockets<T>(url: string, subscribe: string, unsubscribe: string) {
    const [data, setData] = useState<T>();
    const [stop, setStop] = useState<boolean>(false);
    const [socket, setSocket] = useState<{ subscribe: string, unsubscribe: string }>({ subscribe, unsubscribe });

    const dataSet = new Set<string>();
    const flush = () => {
        for (const value of dataSet) {
            setData(JSON.parse(value));
        }

        dataSet.clear();
    };

    let timer = setInterval(flush, 1000);

    useEffect(() => {
        if (!stop) {
            dataSet.clear();

            const websocket = new WebSocket(url);

            websocket.onopen = () => {
                websocket.send(socket.subscribe);
            }

            websocket.onmessage = (event) => {
                dataSet.add(event.data);
            }

            websocket.onerror = (error) => {
                console.error('Error', error);
            }

            return () => {
                websocket.send(socket.unsubscribe);
                websocket.close();

                clearInterval(timer);
                dataSet.clear();
            };
        } else {
            console.error('Websocket stopped');
        }
    }, [socket, stop]);


    const subscribeWebSocket = (subscribe: string, unsubscribe: string) => {
        setSocket({ subscribe, unsubscribe });
    }

    const stopSocket = (value: boolean) => {
        setStop(value);
    }

    return { data, subscribeWebSocket, stopSocket };
}
