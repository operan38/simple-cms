export function createControl(config, validation) {
	return {
		...config,
		validation,
		valid: !validation,
		touched: false,
		value: '',
		errorMessage: '',
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

	Object.keys(formControls).forEach((name) => {
		isFormValid = formControls[name].valid && isFormValid;
	});

	console.log(isFormValid);

	return isFormValid;
}
