import React from 'react';

const Input = (props) => {
	const inputType = props.type || 'text';
	const cls = props.className;
	const htmlFor = `${inputType}-${Math.random()}`;

	return (
		<div>
			{props.label ? <label htmlFor={htmlFor}>{props.label}</label> : ''}
			<input
				className={'form-control ' + cls}
				type={inputType}
				id={htmlFor}
				placeholder={props.placeholder}
				value={props.value}
				onChange={props.onChange}
			/>
		</div>
	);
};

export default Input;
