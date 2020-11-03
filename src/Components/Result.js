/** @format */

import React, {
	useEffect,
	useState,
} from "react";
import ForecastDay from "./ForecastDay";
import "./Result.css";
import ForecastHour from "./ForecastHour";
import { faStethoscope } from "@fortawesome/free-solid-svg-icons";
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
	const [show, setShow] = useState(0);
	useEffect(() => {
		if (grouped) {
			setnewForeCaset(grouped[dates]);
			setShow(0);
		}
	}, [grouped]);
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

	const handleChange = (item, index) => {
		setnewForeCaset(item);

		setShow(index);
	};

	let weatherIcon = null;

	if (
		newForecast[0].weather[0].main ===
		"Thunderstorm"
	) {
		weatherIcon = (
			<img
				className='WeatherPhoto'
				src={require("./png/005-thunderstorm.png")}
			/>
		);
	} else if (
		newForecast[0].weather[0].main === "Drizzle"
	) {
		weatherIcon = (
			<img
				className='WeatherPhoto'
				src={require("./png/003-rain.png")}
			/>
		);
	} else if (
		newForecast[0].weather[0].main === "Rain"
	) {
		weatherIcon = (
			<img
				className='WeatherPhoto'
				src={require("./png/003-rain.png")}
			/>
		);
	} else if (
		newForecast[0].weather[0].main === "Snow"
	) {
		weatherIcon = (
			<img
				className='WeatherPhoto'
				src={require("./png/004-snowing.png")}
			/>
		);
	} else if (
		newForecast[0].weather[0].main === "Clear"
	) {
		weatherIcon = (
			<img
				className='WeatherPhoto'
				src={require("./png/002-sun.png")}
			/>
		);
	} else if (
		newForecast[0].weather[0].main === "Clouds"
	) {
		weatherIcon = (
			<img
				className='WeatherPhoto'
				src={require("./png/007-cloud.png")}
			/>
		);
	} else {
		weatherIcon = (
			<img
				className='WeatherPhoto'
				src={require("./png/006-fog.png")}
			/>
		);
	}

	return (
		<div className='Results'>
			<div style={{ marginBottom: "3vh" }}>
				<ForecastDay
					grouped={grouped}
					show={show}
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
								{Math.floor(
									newForecast[0].main.temp
								)}
								°C
							</h2>
							<div className='WeatherIcon'>
								{" "}
								{weatherIcon}
							</div>
						</div>
					</div>
				</div>
				<div className='ForecastWrapper'>
					<div className='Forecast'>
						<ForecastHour
							forecast={newForecast}
						/>
					</div>
				</div>
				<div className='WeatherDetailsWrapper '>
					<div className='WeatherDetail'>
						<span align='center'>Sunset</span>
						<h4 align='center' weight='400'>
							{sunset}PM
						</h4>
					</div>
					<div className='WeatherDetail'>
						<span align='center'>Sunrise</span>
						<h4 align='center' weight='400'>
							{sunrise}AM
						</h4>
					</div>
				</div>
				<div className='WeatherDetailsWrapper2 '>
					<div className='WeatherDetail'>
						<span
							align='center'
							style={{ marginTop: "3vh" }}
							weight='400'>
							Pressure
						</span>
						<h4 align='center'>{pressure}hpa</h4>
					</div>

					<div className='WeatherDetail'>
						<span align='center'>Humidity</span>
						<h4 align='center' weight='400'>
							{humidity}%
						</h4>
					</div>
				</div>
			</div>
		</div>
	);
};
export default Result;
