import { shallowEqual, useSelector } from 'react-redux';
import { RootState } from '../store/index';

export default <TR>(selector: (state: RootState) => TR) => useSelector(selector, shallowEqual);
