import React from "react";
import PropTypes from "prop-types";
import { v4 as uuidv4 } from "uuid";

function CardTable({ title, data, pending, error }) {

	const rowItem = () => {
		if (pending) {
			return (
				<tr key={uuidv4()}>
					<th colSpan="2" className="border-0 p-4 align-middle text-xs whitespace-no-wrap text-center flex items-center">
						Loading...
					</th>
				</tr>
			);
		}

		return data.map((item) => {
			const lastValue = item[1].values[item[1].values.length - 1];
			return (
				<tr key={uuidv4()}>
					<th className="border-0 p-4 align-middle text-xs whitespace-no-wrap text-left flex items-center">
						{item[0]}
					</th>
					<td className="border-0 p-4 align-middle text-xs whitespace-no-wrap">
						{lastValue}
					</td>
				</tr>
			);
		});
	};

	return (
		<>
			<div className="relative flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded bg-blue-900 text-white">
				<div className="rounded-t mb-0 px-4 py-3 border-0">
					<div className="flex flex-wrap items-center">
						<div className="relative w-full px-4 max-w-full flex-grow flex-1">
							<h3 className="font-semibold text-lg text-white">{ title }</h3>
						</div>
					</div>
				</div>
				<div className="block w-full overflow-x-auto">
					{/* Projects table */}
					<table className="items-center w-full bg-transparent border-collapse">
						<thead>
							<tr>
								<th className="p-4 align-middle border border-solid border-l-0 border-r-0 text-xs uppercase whitespace-no-wrap font-semibold text-left bg-blue-800 text-blue-300 border-blue-700" width="40%">
									Metric
								</th>
								<th className="p-4 align-middle border border-solid border-l-0 border-r-0 text-xs uppercase whitespace-no-wrap font-semibold text-left bg-blue-800 text-blue-300 border-blue-700">
									Value
								</th>
							</tr>
						</thead>
						<tbody>
							{ rowItem() }
						</tbody>
					</table>
				</div>
			</div>
		</>
	);
}

CardTable.defaultProps = {
	title: "",
	data: [],
	pending: true,
	error: null
};

CardTable.propTypes = {
	title: PropTypes.string,
	data: PropTypes.array.isRequired,
	pending: PropTypes.bool.isRequired,
	error: PropTypes.any
};

export default CardTable;
