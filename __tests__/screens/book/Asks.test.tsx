import renderer from 'react-test-renderer';

import Asks from '../../../screens/book/Asks';
import { Orders } from '../../../screens/MainScreen';

describe('<Asks />', () => {
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
        const tree = renderer.create(<Asks maxTotal={1000} asks={mockOrders} />).toJSON();
        expect(tree).toMatchSnapshot();
    });
});