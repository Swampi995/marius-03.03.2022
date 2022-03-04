import renderer from 'react-test-renderer';

import Bids from '../../../screens/book/Bids';
import { Orders } from '../../../screens/MainScreen';

describe('<Bids />', () => {
    const mockOrders: Orders = {
        10: {
            price: 10,
            size: 100,
            total: 100,
        },
        150: {
            price: 150,
            size: 300,
            total: 400,
        },
        500: {
            price: 500,
            size: 500,
            total: 1000,
        },
    };

    it('renders correctly', () => {
        const tree = renderer.create(<Bids maxTotal={1000} bids={mockOrders} />).toJSON();
        expect(tree).toMatchSnapshot();
    });
});