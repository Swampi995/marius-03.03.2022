import renderer from 'react-test-renderer';

import Spread from '../../../screens/book/Spread';

describe('<Spread />', () => {
    it('renders correctly', () => {
        const tree = renderer.create(<Spread maxBid={5000} minAsk={5005} />).toJSON();
        expect(tree).toMatchSnapshot();
    });
});
