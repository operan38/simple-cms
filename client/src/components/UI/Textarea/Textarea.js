import React from 'react';

function isInvalid({ valid, touched }) {
	return !valid && touched;
}

const Textarea = (props) => {
	const cls = props.className ? props.className : '';
	const htmlFor = `${Math.random()}`;

	return (
		<div className={props.parrentDivClassName}>
			{props.label ? <label htmlFor={htmlFor}>{props.label}</label> : ''}
			<textarea
				className={'form-control ' + cls}
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

export default Textarea;
