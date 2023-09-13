import React from 'react';
import '../styles/components/Button.scss';

const Button = ({ text, onClick, isDisabled }) => {
    return(
        <button className='Button' onClick={onClick} disabled={isDisabled} >
            {text}
        </button>
    );
};

export default Button;