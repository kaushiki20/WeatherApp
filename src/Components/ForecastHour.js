/** @format */

import React from "react";
import "./ForcastHour.css";
import { Line } from "react-chartjs-2";
const ForecastHour = props => {
	const temp = props.forecast.map(i => {
		return Math.floor(i.main.temp);
	});
	const hour = props.forecast.map(i => {
		return i.dt_txt.slice(11, 13) * 1 > 12
			? i.dt_txt.slice(11, 13) * 1 + "PM"
			: i.dt_txt.slice(11, 13) * 1 + "AM";
	});

	const data = {
		labels: hour.slice(0, 6),
		datasets: [
			{
				label: "temperature",
				fill: false,
				lineTension: 0.1,

				borderColor: "#01c5c4",
				borderWidth: 2,
				pointBackgroundColor: "transparent",
				pointBorderColor: "#01c5c4",
				pointBorderWidth: 3,
				pointHoverBorderColor: "#01c5c4",
				pointHoverBorderWidth: 10,
				lineTension: 0,
				data: temp.slice(0, 6),
			},
		],
	};

	return (
		<div class='card'>
			<div class='about'></div>
			<div id='canvas'>
				<Line
					data={data}
					options={{
						responsive: true,
						title: {
							display: false,
							text:
								"Average temperature every hour",
							fontSize: 20,
						},
						elements: {
							point: {
								radius: 6,
								hitRadius: 6,
								hoverRadius: 6,
							},
						},
						legend: {
							display: true,
							position: "right",
						},
						tooltips: {
							backgroundColor: "black",
							displayColors: false,

							bodyFontSize: 14,
							callbacks: {
								label: function (
									tooltipItems,
									data
								) {
									return (
										tooltipItems.yLabel + "°C"
									);
								},
							},
						},
						scales: {
							xAxes: [
								{
									display: false,
								},
							],
							yAxes: [
								{
									display: false,
									ticks: {
										beginAtZero: true,
									},
								},
							],
						},
					}}
				/>
			</div>
			<div class='axis'>
				{props.forecast.slice(0, 6).map(i => {
					return (
						<div class='tick'>
							<span class='day-number'>
								{Math.floor(i.main.temp)}
							</span>
							<span class='day-name'>
								{i.dt_txt.slice(11, 13) * 1 > 12
									? i.dt_txt.slice(11, 13) * 1 +
									  "PM"
									: i.dt_txt.slice(11, 13) * 1 +
									  "AM"}
							</span>
							<span class='value value--this'>
								{i.main.temp}°C
							</span>
						</div>
					);
				})}
			</div>
		</div>
	);
};
export default ForecastHour;
