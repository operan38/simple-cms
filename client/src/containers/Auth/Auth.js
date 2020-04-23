import React, { Component } from 'react';

import Input from '../../components/UI/Input/Input';


class Auth extends Component {

    state = {
        isFormValid: false,
        formControls: {
            login: {
                value: '',
                type: 'text',
                className: 'mb-2',
                placeholder: 'Логин',
                errorMessage: '',
                valid: false,
                touched: false,
                validation: {
                    required: true
                }
            },
            password: {
                value: '',
                type: 'password',
                className: 'mb-2',
                placeholder: 'Пароль',
                errorMessage: '',
                valid: false,
                touched: false,
                validation: {
                    required: true
                }
            }
        }
    }

    validateControl(value, validation) {
        if (!validation) {
            return true;
        }

        let isValid = true;

        if (validation.required) {
            isValid = value.trim() !== '' && isValid ? true : false;
        }

        return isValid;
    }

    onChangeHandler(e, controlName) {
        const formControls = {...this.state.formControls}; // Выносим объект из state

        const control = {...formControls[controlName]}; // Получаем из объекта control

        control.value = e.target.value;
        control.touched = true;
        control.valid = this.validateControl(control.value, control.validation);

        formControls[controlName] = control; // Сохраняем переменную в объект

        console.log(control);

        let isFormValid = true;
        Object.keys(formControls).forEach(name => {
            isFormValid = formControls[name].valid && isFormValid;
        })

        this.setState({ // Записываем в state
            formControls, isFormValid
        })
    }

    renderInputs() {
        return Object.keys(this.state.formControls).map((controlName, index) => {
            const control = this.state.formControls[controlName];
            return (
                <Input 
                    key={controlName + index}
                    type={control.type}
                    className={control.className}
                    placeholder={control.placeholder}
                    value={control.value}
                    valid={control.valid}
                    touched={control.touched}
                    errorMessage={control.errorMessage}
                    onChange={e => this.onChangeHandler(e, controlName)}
                />
            )
        })
    }

    loginHandler = () => {
        
    }

    render() {
        return (
            <div>
                <div className="d-flex flex-column align-items-center mt-5">
                    <div>
                        { this.renderInputs() }
                        <button className="btn btn-success mt-2 w-100" disabled={!this.state.isFormValid} onClick={this.loginHandler} type="button">Войти</button>
                    </div>
                </div>
            </div>
        )
    }
}

export default Auth