/** @format */

import React, {
	useEffect,
	useState,
} from "react";
import "./App.css";
import SearchCity from "./Components/SearchCity";
import Result from "./Components/Result";
import NotFound from "./Components/NotFound";
function App() {
	const [value, setValue] = useState("delhi");
	const [
		weatherInformation,
		setWeatherInformation,
	] = useState(null);
	const [error, setError] = useState(false);
	const [grouped, setGrouped] = useState(null);

	useEffect(() => {
		let lat;
		let lang;
		navigator.geolocation.getCurrentPosition(
			function (position) {
				lat = position.coords.latitude;
				lang = position.coords.longitude;

				var requestOptions = {
					method: "GET",
					redirect: "follow",
				};

				fetch(
					`https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lang}&APPID=cd774c430f48939b5b66c7e79686ac07&units=metric`,
					requestOptions
				)
					.then(response => response.text())
					.then(result =>
						setValue(JSON.parse(result).city.name)
					)
					.catch(error =>
						console.log("error", error)
					);
			}
		);
	}, []);

	const handleSearchCity = e => {
		e.preventDefault();
		const weather = `https://api.openweathermap.org/data/2.5/weather?q=${value}&APPID=cd774c430f48939b5b66c7e79686ac07&units=metric`;
		const forecast = `https://api.openweathermap.org/data/2.5/forecast?q=${value}&APPID=cd774c430f48939b5b66c7e79686ac07&units=metric`;

		Promise.all([fetch(weather), fetch(forecast)])
			.then(([res1, res2]) => {
				if (res1.ok && res2.ok) {
					return Promise.all([
						res1.json(),
						res2.json(),
					]);
				}
				throw Error(
					res1.statusText,
					res2.statusText
				);
			})
			.then(([data1, data2]) => {
				const months = [
					"January",
					"February",
					"March",
					"April",
					"May",
					"June",
					"July",
					"August",
					"September",
					"October",
					"November",
					"December",
				];
				const days = [
					"Sunday",
					"Monday",
					"Tuesday",
					"Wednesday",
					"Thursday",
					"Friday",
					"Saturday",
				];
				const currentDate = new Date();
				const date = `${
					days[currentDate.getDay()]
				} ${currentDate.getDate()} ${
					months[currentDate.getMonth()]
				}`;
				const sunset = new Date(
					data1.sys.sunset * 1000
				)
					.toLocaleTimeString()
					.slice(0, 5);
				const sunrise = new Date(
					data1.sys.sunrise * 1000
				)
					.toLocaleTimeString()
					.slice(0, 5);

				const weatherInfo = {
					city: data1.name,
					country: data1.sys.country,
					date,
					description:
						data1.weather[0].description,
					main: data1.weather[0].main,
					pressure: data1.main.pressure,
					temp: data1.main.temp,
					highestTemp: data1.main.temp_max,
					lowestTemp: data1.main.temp_min,
					sunrise,
					sunset,
					clouds: data1.clouds.all,
					humidity: data1.main.humidity,
					wind: data1.wind.speed,
					forecast: data2.list,
				};

				const groupedData = weatherInfo.forecast.reduce(
					(days, row) => {
						const date = row.dt_txt.split(" ")[0];
						days[date] = [
							...(days[date] ? days[date] : []),
							row,
						];

						return days;
					},
					{}
				);
				console.log(weatherInfo);
				setGrouped(groupedData);
				setWeatherInformation(weatherInfo);
				setError(false);
			})
			.catch(error => {
				console.log(error);
				setGrouped(null);
				setWeatherInformation(null);
				setError(true);
			});
	};

	const handleInputChange = e => {
		setValue(e.target.value);
	};

	return (
		<div className='App'>
			<p className='AppTitle'>Weather App</p>
			<div className='weatherWrapper'>
				<SearchCity
					value={value}
					showResult={
						(weatherInformation || error) && true
					}
					change={handleInputChange}
					submit={handleSearchCity}
				/>
				{weatherInformation && (
					<Result
						weather={weatherInformation}
						grouped={grouped}
					/>
				)}
				{error && <NotFound error={error} />}
			</div>
		</div>
	);
}

export default App;
