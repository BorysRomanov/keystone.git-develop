import xhr from 'xhr';
import {
	STATISTIC_LOADING,
	STATISTIC_LOADING_ERROR,
	STATISTIC_SUCCESSFULLY_LOADED,
} from './constants';
import { NETWORK_ERROR_RETRY_DELAY } from '../../../constants';

export function loadStatistic (date) {
	return (dispatch) => {
		dispatch({
			type: STATISTIC_LOADING,
		});
		xhr({
			method: 'post',
			body: JSON.stringify(date),
			url: `/api/statistic`,
			headers: {
				"Content-Type": "application/json"
			},
		}, (err, resp, body) => {
			if (err) {
				dispatch(statisticLoadingError(err));
				return;
			}
			try {
				const payload = JSON.parse(body);
				if (payload.rows) {
					//console.log(payload)
					dispatch(setStatistic(payload));
				}
			} catch (err) {
				console.log('Error parsing results json:', err, body);
				dispatch(statisticLoadingError(err));
				return;
			}
		});
	};
}

export function setStatistic (payload) {
	return {
		type: STATISTIC_SUCCESSFULLY_LOADED,
		payload,
	};
}

export function statisticLoadingError (payload) {
	return {
		type: STATISTIC_LOADING_ERROR,
		payload,
	};
}