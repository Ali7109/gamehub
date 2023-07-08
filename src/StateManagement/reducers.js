// reducers.js
const initialState = {
	data: {},
	publishers: {},
};

const rootReducer = (state = initialState, action) => {
	switch (action.type) {
		case "SET_DATA":
			return {
				...state,
				data: action.data,
			};
		case "SET_PUBLISHERS":
			return {
				...state,
				publishers: action.data,
			};
		default:
			return state;
	}
};

export default rootReducer;
