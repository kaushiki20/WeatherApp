/** @format */

import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import ForecastDay from "./ForecastDay";
import {
	faCloud,
	faBolt,
	faCloudRain,
	faCloudShowersHeavy,
	faSnowflake,
	faSun,
	faSmog,
} from "@fortawesome/free-solid-svg-icons";
import "./Result.css";
import ForecastHour from "./ForecastHour";
const Result = ({ weather, grouped }) => {
	var curday = function (sp) {
		let today = new Date();
		var dd = today.getDate();
		var mm = today.getMonth() + 1; //As January is 0.
		var yyyy = today.getFullYear();

		if (dd < 10) dd = "0" + dd;
		if (mm < 10) mm = "0" + mm;
		return yyyy + sp + mm + sp + dd;
	};
	const dates = curday("-");

	const [newForecast, setnewForeCaset] = useState(
		grouped[dates]
	);
	const {
		city,
		country,
		date,
		description,
		main,
		temp,
		sunset,
		sunrise,
		humidity,
		wind,
		highestTemp,
		lowestTemp,
		forecast,
		pressure,
	} = weather;

	const handleChange = item => {
		setnewForeCaset(item);
	};

	let weatherIcon = null;

	if (main === "Thunderstorm") {
		weatherIcon = (
			<FontAwesomeIcon icon={faBolt} />
		);
	} else if (main === "Drizzle") {
		weatherIcon = (
			<FontAwesomeIcon icon={faCloudRain} />
		);
	} else if (main === "Rain") {
		weatherIcon = (
			<FontAwesomeIcon
				icon={faCloudShowersHeavy}
			/>
		);
	} else if (main === "Snow") {
		weatherIcon = (
			<FontAwesomeIcon icon={faSnowflake} />
		);
	} else if (main === "Clear") {
		weatherIcon = (
			<FontAwesomeIcon icon={faSun} />
		);
	} else if (main === "Clouds") {
		weatherIcon = (
			<FontAwesomeIcon icon={faCloud} />
		);
	} else {
		weatherIcon = (
			<FontAwesomeIcon icon={faSmog} />
		);
	}

	return (
		<div className='Results'>
			<div style={{ marginBottom: "3vh" }}>
				<ForecastDay
					grouped={grouped}
					change={handleChange}
				/>
			</div>
			<div className='Wrapper'>
				<div className='Wrapper2'>
					<div className='LocationWrapper'>
						<div className='TemperatureWrapper'>
							<h2
								style={{
									fontSize: "50px",
								}}>
								{Math.floor(temp)}&#176;
							</h2>
							<div className='WeatherIcon'>
								{" "}
								{weatherIcon}
							</div>
						</div>
					</div>

					<div className='WeatherDetailsWrapper '>
						<div className='WeatherDetail'>
							<span
								align='center'
								style={{ marginTop: "3vh" }}
								weight='400'>
								Pressure
							</span>
							<h4 align='center'>
								{pressure}hpa
							</h4>
						</div>
						<div className='WeatherDetail'>
							<span align='center'>Sunrise</span>
							<h4 align='center' weight='400'>
								{sunrise}AM
							</h4>
						</div>

						<div className='WeatherDetail'>
							<span align='center'>Humidity</span>
							<h4 align='center' weight='400'>
								{humidity}%
							</h4>
						</div>
						<div className='WeatherDetail'>
							<span align='center'>Sunset</span>
							<h4 align='center' weight='400'>
								{sunset}PM
							</h4>
						</div>
					</div>
				</div>
				<div className='ForecastWrapper'>
					<h3 weight='400'>Forecast</h3>
					<div className='Forecast'>
						<ForecastHour
							forecast={newForecast}
						/>
					</div>
				</div>
			</div>
		</div>
	);
};
export default Result;
