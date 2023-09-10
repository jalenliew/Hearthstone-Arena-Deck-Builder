import React from 'react';
import { Link } from 'react-router-dom';

const NoPage = () => {
    return (
        <div>
            <h3>Error 404: Page Not Found</h3>
            <Link to='..'>Click here to go back</Link>
        </div>
    );
};

export default NoPage;