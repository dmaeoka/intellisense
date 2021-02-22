import * as d3 from "d3v4";
import { FETCH_REFERENCES } from "./types";

export const fetchReferencia = () => (dispatch) => {
	d3.json("https://reference.intellisense.io/thickenernn/v1/referencia",
		(dataFile) => {
			try {
				const TK1 = dataFile.current.data.TK1;
				const filtered = Object.filter(TK1, ([name, score]) => /^TK1_/gm.test(name));
				dispatch({
					type: FETCH_REFERENCES,
					payload: Object.entries(filtered),
				});
			} catch (error) {
				throw new Error(error);
			}
		}
	);
};
