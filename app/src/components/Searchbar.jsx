import React from 'react';
import '../styles/components/Searchbar.scss';

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
            >
                &#x1F50E;&#xFE0E;
            </button>
        </div>
    );
};

export default Searchbar;