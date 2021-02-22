import { FETCH_REFERENCES_PENDING, FETCH_REFERENCES_SUCCESS, FETCH_REFERENCES_ERROR } from "actions/types";

const initialState = {
	pending: true,
	items: [],
	error: null
};

export default function (state = initialState, action) {
	switch (action.type) {
		case FETCH_REFERENCES_PENDING:
			return {
				...state,
				pending: true
			};
		case FETCH_REFERENCES_SUCCESS:
			return {
				...state,
				pending: false,
				items: action.payload,
			};
		case FETCH_REFERENCES_ERROR:
			return {
				...state,
				pending: false,
				error: action.error,
			};
		default:
			return state;
	}
}
