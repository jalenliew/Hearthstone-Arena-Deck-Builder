import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from '../api/axios';
import Select from 'react-select';
import Button from '../components/Button';
import Modal from 'react-modal';
import Searchbar from '../components/Searchbar';

import '../styles/pages/CardListPage.scss';

// To do:
// Supply a set based to prevent duplicates - https://hearthstone.fandom.com/wiki/Card_set#List
// Create Sidenav to change the card set
// Update backend call to reflect this

const CardListPage = () => {
    const [pageNumber, setPageNumber] = useState(1);
    const [cardPage, setCardPage] = useState([]);
    const [maxPages, setMaxPages] = useState(0);
    const [sortOption, setSortOption] = useState('name');
    const [isAscending, setIsAscending] = useState(true);
    const [searchValue, setSearchValue] = useState('');
    const [modalIsOpen, setModalIsOpen] = useState(false);
    const [filterParams, setFilterParams] = useState({});
    const sortOptions = [
        { value: 'name', label: 'NAME' },
        { value: 'manaCost', label: 'MANACOST' },
        { value: 'attack', label: 'ATTACK' },
        { value: 'health', label: 'HEALTH' },
        { value: 'class', label: 'CLASS' },
    ];
    const navigate = useNavigate();

    useEffect(() => {
        const fetchPage = async () => {
            const sortValue = isAscending ? `${sortOption}:asc` : `${sortOption}:desc`;

            const res = await axios.get('/bnet/cards/page', {
                params: {
                    region: 'us',
                    page: pageNumber,
                    pageSize: 16,
                    sort: sortValue,
                    locale: 'en_US',
                    textFilter: searchValue
                }
            });
            
            setMaxPages(res.data.pageCount);
            setCardPage(res.data.cards);
        }

        fetchPage();
    }, [pageNumber, isAscending, sortOption, searchValue]);

    const handlePrev = () => {
        setPageNumber(pageNumber - 1);
    };
    const handleNext = () => {
        setPageNumber(pageNumber + 1);
    };
    const handlePageChange = () => {
        const page = document.getElementById('currentPage').value;
        if (page < 1) {
            setPageNumber(1);
        } else if (page > maxPages) {
            setPageNumber(maxPages);
        } else {
            setPageNumber(page);
        }
    };

    const handleSort = (value) => {
        if (typeof value == 'boolean') {
            setIsAscending(value);
        } else {
            setSortOption(value);
        }
    };
    const handleSearch = (value) => {
        setSearchValue(value);
    };

    const handleCardDetails = (card) => {
        navigate('details', { state: card });
    };

    const openModal = () => {
        setModalIsOpen(true);
    };
    const closeModal = () => {
        setModalIsOpen(false);
    };

    const handleFilter = () => {

    };

    return(
        <div className='cardList'>

            <Modal
                isOpen={modalIsOpen}
                className='classModal'
                ariaHideApp={false}
            >
                <div className='advancedFilter'>
                    <h4>Advanced Filters</h4>
                    <input />
                </div>
                <div className='buttons'>
                    <Button text='Cancel' onClick={closeModal} />
                    <Button text='Apply' onClick={handleFilter} />
                </div>
            </Modal>

            <div className='cardListSortSearch' >
                <div className='cardListSort'>
                    <label htmlFor='sortSelect'> Sort by: </label>
                    <Select
                        options={sortOptions}
                        className='select'
                        onChange={(e) => handleSort(e.value)}
                        id='sortSelect'
                    />
                    <input
                        type='radio'
                        id='asc'
                        checked={isAscending}
                        onChange={() => handleSort(true)}
                    />
                    <label htmlFor='asc'> Ascending </label>
                    <input
                        type='radio'
                        id='desc'
                        checked={!isAscending}
                        onChange={() => handleSort(false)}
                    />
                    <label htmlFor='desc'> Descending </label>
                </div>

                <Searchbar
                    onClick={handleSearch}
                />
                <Button text='Advanced' onClick={openModal} />
            </div>

            <div className='cards' >
                {cardPage.map((card) => {
                    return (
                        <div
                            className='card'
                            id={card.id}
                            key={card.id}
                        >
                            <img
                                src={card.image}
                                className='cardImage'
                                onClick={() => handleCardDetails(card)}
                            />
                        </div>
                    );
                })}
            </div>

            <div className='cardListButtons'>
                <Button text='Prev' onClick={handlePrev} isDisabled={pageNumber === 1} />
                <div className='cardListCurrentPage'>
                    Page:
                    <input
                        type='text'
                        value={pageNumber}
                        id='currentPage'
                        onChange={() => handlePageChange()}
                    />
                    of {maxPages}
                </div>
                <Button text='Next' onClick={handleNext} isDisabled={pageNumber === maxPages} />
            </div>
        </div>
    );
};

export default CardListPage;