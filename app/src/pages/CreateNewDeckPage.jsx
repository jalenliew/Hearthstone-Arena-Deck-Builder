import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Link } from 'react-router-dom';
import CardListPage from './CardListPage';
import CardDetailsPage from './CardDetailsPage';
import Button from '../components/Button';
import Modal from 'react-modal';
import axios from '../api/axios';

import '../styles/pages/CreateNewDeckPage.scss';

const CreateNewDeckPage = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const [deck, setDeck] = useState([]);
    const [modalIsOpen, setModalIsOpen] = useState(false);
    const [selectedCard, setSelectedCard] = useState({});

    const handleCardClick = (card) => {
        setSelectedCard(card);
        setModalIsOpen(true);
    };
    const handleCardClose = () => {
        setModalIsOpen(false);
    };

    const handleAdd = () => {
        let quantity = deck[selectedCard.name]?.quantity || 0;
        if ((quantity < 3) && ((selectedCard.rarityId != 5) || (quantity < 1))) {
            quantity++;
        }
        setDeck({
            ...deck,
            [selectedCard.name]: {
                ...selectedCard,
                quantity: quantity
            }
        });
    };
    const handleSub = () => {
        let quantity = deck[selectedCard.name]?.quantity;
        if (0 < quantity) {
            quantity--;
        }
        setDeck({
            ...deck,
            [selectedCard.name]: {
                ...selectedCard,
                quantity: quantity
            }
        });
    }

    const handleCancel = async () => {
        navigate(-1);
    };
    const handleCreate = () => {

    };

    return(
        <div className='createNewDeckPage'>
            { location.state?.img ? (
                <div className='createNewDeck'>
                    <div className='cardListPage' src='CardListPage'>
                        <CardListPage pageSize={12} onCardClick={handleCardClick} />
                    </div>
                    <div className='currentDeck'>
                        <img src={location.state.img} />
                        <h3>{location.state.name}</h3>
                        <label htmlFor='deckName'>Deck Name:</label>
                        <input className='deckName' type='text'></input>
                        <div className='currentDeckCards'>
                            {Object.keys(deck).map((card) => {
                                return (
                                    <p>
                                        {deck[card].quantity} x {card}
                                    </p>
                                );
                            })}
                        </div>
                    </div>
                    <div className='buttons'>
                        <Button text='Cancel' onClick={handleCancel} />
                        <Button text='Create' onClick={handleCreate} isDisabled={deck.length != 30} />
                    </div>
                    <Modal
                        isOpen={modalIsOpen}
                        className='cardDetailsModal'
                        ariaHideApp={false}
                    >
                        <CardDetailsPage card={selectedCard} onBackButton={handleCardClose} />
                        <div className='addCards'>
                            <Button text='-' onClick={handleSub}/>
                            <p>Quantity: {deck[selectedCard.name]?.quantity || '0'}</p>
                            <Button text='+'onClick={handleAdd} />
                        </div>
                    </Modal>
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