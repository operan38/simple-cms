import React from 'react';

const Select = props => {
    const cls = props.className;
    const htmlFor = `${props.label}-${Math.random()}`;

    let keyOptions = {value: 'value', text: 'text'}; // key value по умолчанию
    if (props.keyOptions) {
        keyOptions = props.keyOptions;
    }
    
    return (
        <div>
            {props.label ? <label htmlFor={htmlFor}>{props.label}</label> : ''}
            <select
                className={'form-control ' + cls}
                id={htmlFor}
                value={props.value}
                onChange={props.onChange}
            >
                <option></option>
                {props.options ? props.options.map((option, index) => {
                    return (
                        <option
                            key={option[keyOptions['value']] + index}
                            value={option[keyOptions['value']]}
                        >
                            {option[keyOptions['text']]}
                        </option>
                    )
                }) : ''}
            </select>
        </div>
    )
}

export default Select;