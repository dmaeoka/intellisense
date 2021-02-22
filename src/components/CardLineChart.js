import React from "react";
import PropTypes from "prop-types";
import Chart from "chart.js";

function CardLineChart({ title, data }) {
	React.useEffect(() => {
		if (data.length === 0)
			return;

		const colours = [
			"#4c51bf",
			"#e41a1c",
			"#377eb8",
			"#999999",
			"#4daf4a",
			"#984ea3",
			"#ffff33",
			"#a65628",
			"#f781bf",
			"#ff7f00",
		];

		let datasets = [];
		// datasets
		data.forEach((item, i) => {
			datasets.push({
				label: item[0],
				backgroundColor: colours[i],
				borderColor: colours[i],
				data: item[1].values,
				fill: false,
			});
		});

		const config = {
			type: "line",
			data: {
				labels: data[0][1].times,
				datasets,
			},
			options: {
				maintainAspectRatio: false,
				responsive: true,
				title: {
					display: false,
					text: "Charts",
					fontColor: "white",
				},
				legend: {
					labels: {
						fontColor: "white",
					},
					align: "end",
					position: "bottom",
				},
				tooltips: {
					mode: "index",
					intersect: false,
				},
				hover: {
					mode: "nearest",
					intersect: true,
				},
				scales: {
					xAxes: [
						{
							ticks: {
								fontColor: "rgba(255,255,255,.7)",
							},
							display: true,
							scaleLabel: {
								display: true,
								labelString: "Times",
								fontColor: "white",
							},
							gridLines: {
								display: true,
								borderDash: [2],
								borderDashOffset: [2],
								color: "rgba(33, 37, 41, 0.3)",
								zeroLineColor: "rgba(0, 0, 0, 0)",
								zeroLineBorderDash: [2],
								zeroLineBorderDashOffset: [2],
							},
						},
					],
					yAxes: [
						{
							ticks: {
								fontColor: "rgba(255,255,255,.7)",
							},
							display: true,
							scaleLabel: {
								display: true,
								labelString: "Value",
								fontColor: "white",
							},
							gridLines: {
								borderDash: [3],
								borderDashOffset: [3],
								drawBorder: false,
								color: "rgba(255, 255, 255, 0.15)",
								zeroLineColor: "rgba(33, 37, 41, 0)",
								zeroLineBorderDash: [2],
								zeroLineBorderDashOffset: [2],
							},
						},
					],
				},
			},
		};
		const ctx = document.getElementById("line-chart-2").getContext("2d");
		window.myLine = new Chart(ctx, config);
	}, [data]);
	return (
		<>
			<div className="relative flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded bg-gray-800">
				<div className="rounded-t mb-0 px-4 py-3 bg-transparent">
					<div className="flex flex-wrap items-center">
						<div className="relative w-full max-w-full flex-grow flex-1">
							<h6 className="uppercase text-gray-200 mb-1 text-xs font-semibold">
								Overview
							</h6>
							<h2 className="text-white text-xl font-semibold">
								{ title }
							</h2>
						</div>
					</div>
				</div>
				<div className="p-4 flex-auto">
					{/* Chart */}
					<div className="relative h-350-px">
						<canvas id="line-chart-2"></canvas>
					</div>
				</div>
			</div>
		</>
	);
}

CardLineChart.defaultProps = {
	title: "",
	data: [],
};

CardLineChart.propTypes = {
	title: PropTypes.string,
	data: PropTypes.array.isRequired,
};

export default CardLineChart;
