import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Link } from 'react-router-dom';
import Button from '../components/Button';
import '../styles/pages/CreateNewDeckPage.scss';
import axios from '../api/axios';

const CreateNewDeckPage = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const [deck, setDeck] = useState([]);

    const handleCancel = async () => {
        navigate(-1);
    };

    const handleCreate = () => {

    };

    return(
        <div>
            { location.state?.img ? (
                <div className='createNewDeck'>
                    <div className='currentDeck'>
                        <img src={location.state.img} />
                        <h3>{location.state.name}</h3>
                        <label htmlFor='deckName'>Deck Name:</label>
                        <input className='deckName' type='text'></input>
                    </div>
                    <div className='cards'>
                    </div>
                    <div className='buttons'>
                        <Button text='Cancel' onClick={handleCancel} />
                        <Button text='Create' onClick={handleCreate} isDisabled={deck.length < 30} />
                    </div>
                </div>
            ) : (
                <div>
                    <p>Invalid Data</p>
                    <Link to='..'>Click here to go back</Link>
                </div>
            )}
        </div>
    );
};

export default CreateNewDeckPage;