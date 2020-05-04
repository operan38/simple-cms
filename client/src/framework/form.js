export function createControl(config, validation) {
	return {
		...config,
		validation,
		valid:
			validation.required === false || validation.defaultValid === true
				? true
				: !validation,
		touched: false,
		value: '',
	};
}

export function validateControl(value, validation = null) {
	if (!validation) {
		return true;
	}

	let isValid = true;

	if (validation.required) {
		isValid = value.trim() !== '' && isValid;
	}

	return isValid;
}

export function validateForm(formControls) {
	let isFormValid = true;

	for (let control in formControls) {
		if (formControls.hasOwnProperty(control)) {
			isFormValid = formControls[control].valid && isFormValid;
		}

		console.log(control + ' ' + formControls[control].valid);
	}

	return isFormValid;
}

export function clearControlsValue(formControls) {
	Object.keys(formControls).map((controlName, index) => {
		formControls[controlName].value = '';
		return formControls;
	});

	return formControls;
}
