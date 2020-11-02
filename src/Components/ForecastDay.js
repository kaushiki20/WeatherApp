/** @format */

import React from "react";
import "./ForecastDay.css";
const ForecastDay = props => {
	// Returns week of the day
	const _getDayInfo = data => {
		const daysOfWeek = [
			"sunday",
			"monday",
			"tuesday",
			"wednesday",
			"thursday",
			"friday",
			"saturday",
		];
		return daysOfWeek[
			new Date(data[0].dt * 1000).getDay()
		];
	};

	// Fetches the icon using the icon code available in the forecast data.
	const _getIcon = data =>
		`https://openweathermap.org/img/w/${data[0].weather[0].icon}.png`;

	// Gets the Minimum, Maximum and Avg Humidity temperatures of the day.
	const _getInfo = (
		data,
		min = [],
		max = [],
		humidity = []
	) => {
		data.map(item => {
			max.push(item.main.temp_max);
			min.push(item.main.temp_min);
			humidity.push(item.main.humidity);
		});

		const minMax = {
			min: Math.round(Math.min(...min)),
			max: Math.round(Math.max(...max)),
		};

		// // Gets the day's average humdity
		// const avgHumdity = Math.round(
		// 	humidity.reduce(
		// 		(curr, next) => curr + next
		// 	) / humidity.length
		// );

		return (
			<div>
				<div className='min-max'>
					<strong>{`${minMax.max}°C`}</strong> /{" "}
					{`${minMax.min}°C`}
				</div>
				<img src={_getIcon(data)} />
				{/* <div className='more-info'>
					{`Avg. Humidity: ${avgHumdity}%`}
				</div> */}
			</div>
		);
	};
	const tiles = Object.values(props.grouped);

	// Edge case:
	// When the webservice returns data for 6 calendar days during evenings as a result of offset,
	// this ensures that we are showing only 5-days of forecast.
	const forecastTiles =
		tiles.length > 5 ? tiles.slice(0, 5) : tiles;

	return (
		<div>
			<div className='ForecastTiles'>
				{forecastTiles.map((item, i) => (
					<div
						className='weather-info'
						key={i}
						onClick={() => props.change(item)}>
						<div className='PrimaryInfo'>
							<div className='icon'>
								{_getDayInfo(item)}
							</div>

							{_getInfo(item)}
						</div>
						<div
							className='detailed-info'
							key={i}>
							{item[0].weather[0].description}
						</div>
					</div>
				))}
			</div>
		</div>
	);
};
export default ForecastDay;
