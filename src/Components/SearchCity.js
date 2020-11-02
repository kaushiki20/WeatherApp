/** @format */

import React from "react";
import "./SearchCity.css";
const SearchCity = ({
	submit,
	value,
	change,
}) => {
	return (
		<div>
			<form
				className='SearchBar'
				onSubmit={submit}>
				<input
					className='SearchInput'
					type='text'
					value={value}
					placeholder='Enter city'
					onChange={change}
				/>

				<span className='SearchIcon'>
					<i class='fa fa-search' />
				</span>
			</form>
		</div>
	);
};
export default SearchCity;
