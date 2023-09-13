import React from 'react';
import '../styles/pages/HomePage.scss';

const HomePage = () => {
    return(
        <div className="home">
            <h3 className="headers">
                About
            </h3>
            <p className="text">
                This app is meant to help build Hearthstone decks.  The arena builder takes data from the top decks and suggests options to best match the top decks for that class
            </p>
            <h3 className="headers">
                Purpose
            </h3>
            <p className="text">
                This app is made for demonstration and learning purposes of my skills and abilities in web development and related ideas.  I have no claim on Hearthstone.
            </p>
        </div>
    );
};

export default HomePage;