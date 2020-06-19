import React from 'react'

export default function RequiredLabel(props) {
    return (
        <label htmlFor={props.htmlFor}>
            {props.label}
            <span className="text-danger"> *</span>:
        </label>
    );
}