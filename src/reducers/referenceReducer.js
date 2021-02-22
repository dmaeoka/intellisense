import { FETCH_REFERENCES } from "../actions/types";

const initialState = {
	items: [],
};

export default function (state = initialState, action) {
	switch (action.type) {
		case FETCH_REFERENCES:
			return {
				...state,
				items: action.payload,
			};
		default:
			return state;
	}
}
