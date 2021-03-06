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
				style={
					isInvalid(props)
						? { boxShadow: '0 0 4px rgba(255,0,0,0.6)', border: 'none' }
						: {}
				}
			/>

			{isInvalid(props) ? (
				<span className='text-danger'>{props.errorMessage}</span>
			) : (
				''
			)}
		</div>
	);
};

export default Input;
