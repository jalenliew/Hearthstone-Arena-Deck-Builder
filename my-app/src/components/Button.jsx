import React from 'react';
import '../styles/Button.scss';

const Button = ({ text, onClick }) => {
    return(
        <button className='Button' onClick={onClick}>
            {text}
        </button>
    );
}

export default Button;