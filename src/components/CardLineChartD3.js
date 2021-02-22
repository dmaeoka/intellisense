import React from "react";
import PropTypes from "prop-types";
import * as d3 from "d3v4";

function CardLineChartD3({ title, data, pending, error }) {

	React.useEffect(() => {
		console.log(data, pending, error);
		if (pending || data.length === 0)
			return;

		let datasets = [];
		data.forEach((item) => {
			item[1].values.map((value, i) => {
				return datasets.push({
					name: item[0],
					times: item[1].times[i],
					value,
				});
			});
		});

		const margin = {
			top: 5,
			bottom: 20,
			left: 40,
			right: 0,
		};
		const width = 600 - margin.left - margin.right;
		const height = 300 - margin.top - margin.bottom;

		const svg = d3
			.select("#line-chart")
			.append("svg")
			.attr("viewBox", `0 0 600 300`)
			.append("g")
			.attr("transform", `translate(${margin.left},${margin.top})`);

		// group the data: I want to draw one line per group
		// nest function allows to group the calculation per level of a factor
		const sumstat = d3
			.nest()
			.key((d) => d.name)
			.entries(datasets);

		// Add X axis --> it is a date format
		const x = d3
			.scaleLinear()
			.domain(d3.extent(datasets, (d) => d.times))
			.range([0, width]);

		//
		svg.append("g")
			.attr("transform", `translate(0,${height})`)
			.attr("class", "axis")
			.call(d3.axisBottom(x).ticks(5));

		const y = d3
			.scaleLinear()
			.domain([
				0,
				d3.max(datasets, function (d) {
					return +d.value + 5;
				})
			])
			.range([height, 0]);

		svg.append("g").call(d3.axisLeft(y));

		// color palette
		const res = sumstat.map((d) => d.key);

		// list of group names
		const color = d3
			.scaleOrdinal()
			.domain(res)
			.range([
				"#e41a1c",
				"#377eb8",
				"#999999",
				"#4daf4a",
				"#984ea3",
				"#ffff33",
				"#a65628",
				"#f781bf",
				"#ff7f00",
			]);

		// Draw the line
		svg.selectAll(".line")
			.data(sumstat)
			.enter()
			.append("path")
			.attr("fill", "none")
			.attr("stroke", (d) => color(d.key))
			.attr("stroke-width", 1.5)
			.attr("d", (d) => {
				return d3
					.line()
					.x((d) => x(d.times))
					.y((d) => y(+d.value))
					(d.values);
			});
	}, [data, pending, error]);

	const loading = () => {
		if (!pending) {
			return (<div className="text-gray-800 text-xl font-semibold whitespace-no-wrap text-center">Loading data...</div>);
		}
	};

	return (
		<>
			<div className="relative flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded bg-white">
				<div className="rounded-t mb-0 px-4 py-3 bg-transparent">
					<div className="flex flex-wrap items-center">
						<div className="relative w-full max-w-full flex-grow flex-1">
							<h6 className="uppercase text-gray-600 mb-1 text-xs font-semibold">
								Overview
							</h6>
							<h2 className="text-gray-800 text-xl font-semibold">
								{title}
							</h2>
						</div>
					</div>
				</div>
				<div className="p-4 flex-auto">
					{ loading() }
					{/* Chart */}
					<div className="relative">
						<div id="line-chart"></div>
					</div>
				</div>
			</div>
		</>
	);
}

CardLineChartD3.defaultProps = {
	title: "",
	data: [],
	pending: true,
	error: null,
};

CardLineChartD3.propTypes = {
	title: PropTypes.string,
	data: PropTypes.array.isRequired,
	pending: PropTypes.bool.isRequired,
	error: PropTypes.any
};

export default CardLineChartD3;
