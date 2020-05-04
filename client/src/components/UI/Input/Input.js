import React from 'react';

function isInvalid({ valid, touched }) {
	return !valid && touched;
}

const Input = (props) => {
	const inputType = props.type || 'text';
	const cls = props.className ? props.className : '';
	const htmlFor = `${inputType}-${Math.random()}`;

	return (
		<div className={props.parrentDivClassName}>
			{props.label ? <label htmlFor={htmlFor}>{props.label}</label> : ''}
			<input
				className={'form-control ' + cls}
				type={inputType}
				id={htmlFor}
				placeholder={props.placeholder}
				value={props.value}
				onChange={props.onChange}
			/>

			{isInvalid(props) ? (
				<span className='text-danger'>{props.errorMessage}</span>
			) : (
				''
			)}
			{console.log(props.errorMessage, isInvalid(props))}
		</div>
	);
};

export default Input;
