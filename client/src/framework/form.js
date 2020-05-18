export function createControl(config, validation) {
	return {
		...config,
		validation,
		valid: validation.required === false ? true : !validation,
		touched: false,
		value: config.value ? config.value : '',
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
		formControls[controlName].valid = false;
		formControls[controlName].touched = false;
		return formControls;
	});

	return formControls;
}
