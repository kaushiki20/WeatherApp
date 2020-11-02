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
				//backgroundColor: "rgba(75,192,192,0.4)",
				borderColor: "rgba(75,192,192,1)",
				borderCapStyle: "butt",
				borderDash: [],
				borderDashOffset: 0.0,
				borderJoinStyle: "miter",
				pointBorderColor: "rgba(75,192,192,1)",
				pointBackgroundColor: "#fff",
				pointBorderWidth: 1,
				pointHoverRadius: 5,
				pointHoverBackgroundColor:
					"rgba(75,192,192,1)",
				pointHoverBorderColor:
					"rgba(220,220,220,1)",
				pointHoverBorderWidth: 2,
				pointRadius: 1,
				pointHitRadius: 10,
				data: temp.slice(0, 6),
			},
		],
	};

	return (
		<div className='ForecastWrapper'>
			<Line
				data={data}
				options={{
					title: {
						display: false,
						text:
							"Average temperature every hour",
						fontSize: 20,
					},
					legend: {
						display: true,
						position: "right",
					},
					scales: {
						xAxes: [
							{
								gridLines: {
									display: false,
								},
							},
						],
						yAxes: [
							{
								gridLines: {
									display: false,
								},
							},
						],
					},
				}}
			/>
		</div>
	);
};
export default ForecastHour;
