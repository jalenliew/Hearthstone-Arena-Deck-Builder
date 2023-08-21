import React from 'react';
import { useNavigate } from 'react-router-dom';

const NoPage = () => {
    const navigate = useNavigate();
    const handleClick = () => {
        navigate(-1);
    }

    return (
        <div>
            <h3>Error 404: Page Not Found</h3>
            <a onClick={handleClick}>Click here to go back</a>
        </div>
    );
};

export default NoPage;