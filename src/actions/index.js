import * as d3 from "d3v4";
import { FETCH_REFERENCES_PENDING, FETCH_REFERENCES_SUCCESS, FETCH_REFERENCES_ERROR } from "./types";

export const fetchReferencia = () => (dispatch) => {

	// DISPATCH INITIAL STATUS
	dispatch({
		type: FETCH_REFERENCES_PENDING,
	});

	d3.json("https://reference.intellisense.io/thickenernn/v1/referencia",
		(dataFile) => {
			try {
				const TK1 = dataFile.current.data.TK1;
				const filtered = Object.filter(TK1, ([name, score]) => /^TK1_/gm.test(name));
				// IF SUCCESS REQUEST
				dispatch({
					type: FETCH_REFERENCES_SUCCESS,
					payload: Object.entries(filtered),
				});
			} catch (error) {
				// IF ANY ERROR DISPATCH AN ERROR
				dispatch({
					type: FETCH_REFERENCES_ERROR,
					error,
				});
				throw new Error(error);
			}
		}
	);
};
