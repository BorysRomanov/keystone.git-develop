import {
	BACKGROUNDS_LOADING,
	BACKGROUNDS_SETUP,
} from './constants';
import assign from 'object-assign';

const initialState = {
	list: [],
	total: 0,
	loaded: false,
	errors: null
};

function backgrounds (state = initialState, action) {
	switch (action.type) {
		case BACKGROUNDS_LOADING:
			return assign({}, state, {
				loaded: action.payload.loaded || false,
			});
		case BACKGROUNDS_SETUP: {
			return assign({}, state, {
				list: action.payload.list || [],
				loaded: true,
			})
		}
		default:
			return state;
	}
}

export default backgrounds;
