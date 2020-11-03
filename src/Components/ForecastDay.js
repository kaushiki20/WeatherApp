/** @format */

import React from "react";
import "./ForecastDay.css";
import cloud from "../001-cloudy.png";
import cloudy from "../001-cloudy.png";
import sun from "../002-sun.png";
import rain from "../003-rain.png";
import snow from "../004-snowing.png";
import thunderstorm from "../005-thunderstorm.png";
import fog from "../006-fog.png";
const ForecastDay = props => {
	// Returns week of the day
	const _getDayInfo = data => {
		const daysOfWeek = [
			"Sun",
			"Mon",
			"Tue",
			"Wed",
			"Thur",
			"Fri",
			"Sat",
		];

		return daysOfWeek[
			new Date(data[0].dt * 1000 + 1).getDay()
		];
	};

	// Fetches the icon using the icon code available in the forecast data.
	const _getIcon = data => {
		let weatherIcon = "";

		if (
			data[0].weather[0].main === "Thunderstorm"
		) {
			weatherIcon = thunderstorm;
		} else if (
			data[0].weather[0].main === "Drizzle"
		) {
			weatherIcon = cloudy;
		} else if (
			data[0].weather[0].main === "Rain"
		) {
			weatherIcon = rain;
		} else if (
			data[0].weather[0].main === "Snow"
		) {
			weatherIcon = snow;
		} else if (
			data[0].weather[0].main === "Clear"
		) {
			weatherIcon = sun;
		} else if (
			data[0].weather[0].main === "Clouds"
		) {
			weatherIcon = cloud;
		} else {
			weatherIcon = fog;
		}
		return weatherIcon;
	};

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

		const weather = _getIcon(data);

		return (
			<div>
				<div className='min-max'>
					<strong>{`${minMax.max}°`}</strong>{" "}
					{`${minMax.min}°`}
				</div>

				<img
					className='WeatherPhotos'
					src={weather}
				/>
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
						className={
							props.show === i
								? "selectedweather-info"
								: "weather-info"
						}
						key={i}
						onClick={() => props.change(item, i)}>
						<div className='PrimaryInfo'>
							<div className='icon'>
								{_getDayInfo(item)}
							</div>

							{_getInfo(item)}
						</div>
						<div
							className='detailed-info'
							key={i}>
							{item[0].weather[0].main}
						</div>
					</div>
				))}
			</div>
		</div>
	);
};
export default ForecastDay;
