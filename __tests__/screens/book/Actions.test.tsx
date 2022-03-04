import renderer from 'react-test-renderer';

import Actions from '../../../screens/book/Actions';

describe('<Actions />', () => {
    it('renders correctly', () => {
        const tree = renderer.create(<Actions market='PI_XBTUSD' killed={false} setMarket={() => { }} setKilled={() => { }} />).toJSON();
        expect(tree).toMatchSnapshot();
    });
});
