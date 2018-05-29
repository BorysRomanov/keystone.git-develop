import {
	STATISTIC_LOADING,
	STATISTIC_LOADING_ERROR,
	STATISTIC_SUCCESSFULLY_LOADED
} from './constants';
import assign from 'object-assign';

const initialState = {
	rows: {},
	total: null,
	isLoading: false,
	errors: null
};

function statistic (state = initialState, action) {
	switch (action.type) {
		case STATISTIC_LOADING:
			return assign({}, state, {
				isLoading: true,
			});
		case STATISTIC_SUCCESSFULLY_LOADED:
			return assign({}, state, {
				isLoading: false,
				rows: action.payload.rows,
				total: action.payload.total,
			});
		case STATISTIC_LOADING_ERROR:
			return assign({}, state, {
				loading: false,
				error: action.err,
			});
		default:
			return state;
	}
}

export default statistic;
