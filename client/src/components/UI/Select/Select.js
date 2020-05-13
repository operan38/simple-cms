import React from 'react';

function isInvalid({ valid, touched }) {
	return !valid && touched;
}

const Select = (props) => {
	const cls = props.className;
	const htmlFor = `${props.label}-${Math.random()}`;

	let keyOptions = { value: 'value', text: 'text' }; // key value по умолчанию
	if (props.keyOptions) {
		keyOptions = props.keyOptions;
	}

	return (
		<div className={props.parrentDivClassName}>
			{props.label ? <label htmlFor={htmlFor}>{props.label}</label> : ''}
			<select
				className={'form-control ' + cls}
				id={htmlFor}
				value={props.value}
				onChange={props.onChange}
				style={
					isInvalid(props)
						? { boxShadow: '0 0 4px rgba(255,0,0,0.6)', border: 'none' }
						: {}
				}
			>
				<option></option>
				{props.options
					? props.options.map((option, index) => {
							return (
								<option
									key={option[keyOptions['value']] + index}
									value={option[keyOptions['value']]}
								>
									{option[keyOptions['text']]}
								</option>
							);
					  })
					: ''}
			</select>
			{isInvalid(props) ? (
				<span className='text-danger'>{props.errorMessage}</span>
			) : (
				''
			)}
		</div>
	);
};

export default Select;
