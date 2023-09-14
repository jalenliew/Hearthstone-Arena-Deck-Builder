import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Modal from 'react-modal';
import Button from '../components/Button';
import DeathKnight from '../img/Death_Knight_icon.png';
import DemonHunter from '../img/Demon_Hunter_icon.png';
import Druid from '../img/Druid_icon.png';
import Hunter from '../img/Hunter_icon.png';
import Mage from '../img/Mage_icon.png';
import Paladin from '../img/Paladin_icon.png';
import Priest from '../img/Priest_icon.png';
import Shaman from '../img/Shaman_icon.png';
import Warlock from '../img/Warlock_icon.png';
import Warrior from '../img/Warrior_icon.png';

import '../styles/pages/DeckBuilderPage.scss';

const DeckBuilderPage = () => {
    const [modalIsOpen, setModalIsOpen] = useState(false);
    const [selectedClass, setSelectedClass] = useState(null);
    const navigate = useNavigate();
    
    const hsClasses = [
        { id: 'deathKnight', name: 'Death Knight', img: DeathKnight},
        { id: 'demonHunter', name: 'Demon Hunter', img: DemonHunter},
        { id: 'druid', name: 'Druid', img: Druid},
        { id: 'hunter', name: 'Hunter', img: Hunter},
        { id: 'mage', name: 'Mage', img: Mage},
        { id: 'paladin', name: 'Paladin', img: Paladin},
        { id: 'priest', name: 'Priest', img: Priest},
        { id: 'shaman', name: 'Shaman', img: Shaman},
        { id: 'warlock', name: 'Warlock', img: Warlock},
        { id: 'warrior', name: 'Warrior', img: Warrior},        
    ];

    const openModal = () => {
        setModalIsOpen(true);
    };
    const closeModal = () => {
        setModalIsOpen(false);
        setSelectedClass(null);
    };
    const changeSelectedClass = (selection) => {
        setSelectedClass(selection);
    };

    const handleCreateConfirm = () => {
        setModalIsOpen(false);
        navigate('new', { state: selectedClass });
    };

    return(
        <div className="deckBuilder">
            <h4>Decks:</h4>
            <Button text='Create New Deck' onClick={openModal} />
            <Modal
                isOpen={modalIsOpen}
                className='classModal'
                ariaHideApp={false}
            >
                <h4>Pick a Class</h4>
                <div className='classes'>
                    {hsClasses.map((hsClass) => {
                        return (
                            <div
                                className={selectedClass?.id === hsClass.id ? 'selectedClass' : 'class'}
                                id={hsClass.id}
                                key={hsClass.id}
                                onClick={() => {
                                    changeSelectedClass(hsClass);
                                }}
                            >
                                <img src={hsClass.img} />
                                <p>{hsClass.name}</p>
                            </div>
                        );
                    })}
                </div>
                <div className='buttons'>
                    <Button text='Cancel' onClick={closeModal} />
                    <Button text='Confirm' onClick={handleCreateConfirm} isDisabled={selectedClass === null} />
                </div>
            </Modal>
        </div>
    );
};

export default DeckBuilderPage;