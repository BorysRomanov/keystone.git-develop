import xhr from 'xhr';
import {
	BACKGROUNDS_LOADING,
	BACKGROUNDS_SETUP,
} from './constants';


export function loadBackgrounds() {
	return async dispatch => {
		dispatch({
			type: BACKGROUNDS_LOADING,
			payload: {loaded: false},
		});
		try {
			const response = await new Promise((resolve, reject) => {
				xhr({
					method: 'get',
					url: `/api/backgrounds`,
					headers: {
						"Content-Type": "application/json"
					},
				}, (err, resp, body) => {
					if (err) reject(err);
					else resolve(JSON.parse(body));
				});
			});

			dispatch({
				type: BACKGROUNDS_SETUP,
				payload: {
					list: response.backgrounds,
				}
			});

		} catch (error) {
			console.error(error);
		}
	};
}
export function createBackgrounds(formData) {
	return async dispatch => {
		try {
			const response = await new Promise((resolve, reject) => {
				xhr({
					method: 'post',
					url: `/api/backgrounds`,
					body: formData,
				}, (err, resp, body) => {
					if (err) reject(err);
					else resolve(JSON.parse(body));
				});
			});

			dispatch({
				type: BACKGROUNDS_SETUP,
				payload: {
					list: response.backgrounds,
				}
			});

		} catch (error) {
			console.error(error);
		}
	};
}

export function deleteBackgrounds(id) {
	return async dispatch => {
		try {
			const response = await new Promise((resolve, reject) => {
				xhr({
					method: 'delete',
					url: `/api/backgrounds/${id}`,
					headers: {
						"Content-Type": "application/json"
					},
				}, (err, resp, body) => {
					if (err) reject(err);
					else resolve(JSON.parse(body));
				});
			});

			dispatch({
				type: BACKGROUNDS_SETUP,
				payload: {
					list: response.backgrounds,
				}
			});

		} catch (error) {
			console.error(error);
		}
	};
}
