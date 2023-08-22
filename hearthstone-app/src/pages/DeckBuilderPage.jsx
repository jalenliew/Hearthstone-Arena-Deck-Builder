import React, { useState } from 'react';
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

import '../styles/DeckBuilderPage.scss';

const DeckBuilderPage = () => {
    const [modalIsOpen, setModalIsOpen] = useState(false);
    const [selectedClass, setSelectedClass] = useState(null);
    
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
    };

    const changeSelectedClass = (selection) => {
        setSelectedClass(selection);
    };

    return(
        <div className="deckBuilder">
            <h4>Decks:</h4>
            <Button text='Create New Deck' onClick={openModal} />
            <Modal
                isOpen={modalIsOpen}
                className="classModal"
            >
                <h4>Pick a Class</h4>
                <div className='classes'>
                    {hsClasses.map((hsClass) => {
                        return (
                            <div
                                className={selectedClass === hsClass.id ? 'selectedClass' : 'class'}
                                id={hsClass.id}
                                onClick={() => {
                                    changeSelectedClass(hsClass.id);
                                }}
                            >
                                <img src={hsClass.img} />
                                <p>{hsClass.name}</p>
                            </div>
                        );
                    })}
                </div>
                <div class='buttons'>
                    <Button text='Cancel' onClick={closeModal} />
                    <Button text='Confirm' onClick={closeModal} />
                </div>
            </Modal>
        </div>
    );
};

export default DeckBuilderPage;