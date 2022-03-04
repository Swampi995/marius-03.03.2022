import { processOrders } from '../../screens/MainScreen';
import { OrdersData } from '../../services/ordersData';

describe('processOrders', () => {
    it('mockGroup 0.5', () => {
        const mockGroup = 0.5;
        const mockServerData: OrdersData['asks'] = [[10, 15], [11, 5], [40, 3], [50, 100], [50.2, 49]];
        const expectedData = {
            items: {
                '10': { price: 10, size: 15, total: 15 },
                '11': { price: 11, size: 5, total: 20 },
                '40': { price: 40, size: 3, total: 23 },
                '50': { price: 50, size: 149, total: 172 }
            },
            maxTotal: 172,
            max: 50,
            min: 10
        };

        expect(processOrders(mockServerData, mockGroup)).toStrictEqual(expectedData);
    });

    it('mockGroup 1', () => {
        const mockGroup = 1;
        const mockServerData: OrdersData['asks'] = [[10, 15], [11, 5], [40, 3], [50, 100], [50.2, 49]];
        const expectedData = {
            items: {
                '10': { price: 10, size: 20, total: 20 },
                '40': { price: 40, size: 3, total: 23 },
                '50': { price: 50, size: 149, total: 172 }
            },
            maxTotal: 172,
            max: 50,
            min: 10
        };

        expect(processOrders(mockServerData, mockGroup)).toStrictEqual(expectedData);
    });
});
