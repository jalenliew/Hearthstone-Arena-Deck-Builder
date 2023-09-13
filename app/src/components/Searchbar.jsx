import React from 'react';
import '../styles/Searchbar.scss';

const Searchbar = ({ onClick }) => {
    const handleSearch = () => {
        const text = document?.getElementById('searchbox')?.value;
        onClick(text);
    }
    return(
        <div className='searchbox'>
            <input
                id='searchbox'
                type='text'
                placeholder='Search...'
            />
            {/* Replace below text with search icon */}
            <button
                onClick={() => handleSearch()}
            />
        </div>
    );
};

export default Searchbar;