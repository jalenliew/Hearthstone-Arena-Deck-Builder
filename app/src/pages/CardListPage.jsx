import React, { useState, useEffect } from 'react';
import axios from '../api/axios';
import Dropdown from 'react-dropdown';
import Button from '../components/Button';
import Searchbar from '../components/Searchbar';

import '../styles/CardListPage.scss';
import 'react-dropdown/style.css';

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
    const sortOptions = [
        { value: 'name', label: 'NAME' },
        { value: 'manaCost', label: 'MANACOST' },
        { value: 'attack', label: 'ATTACK' },
        { value: 'health', label: 'HEALTH' },
        { value: 'class', label: 'CLASS' },
    ];

    useEffect(() => {
        const fetchPage = async () => {
            const sortValue = `${sortOption}:${isAscending ? 'asc' : 'desc'}`;
            const res = await axios.get('/bnet/cards/page', {
                params: {
                    region: 'us',
                    page: pageNumber,
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

    const handleSort = (value) => {
        if (typeof value == 'boolean') {
            setIsAscending(value);
        } else {
            setSortOption(value);
        }
    };

    const handleSearch = (value) => {
        setSearchValue(value);
    }

    return(
        <div className='cardList'>

            <div className='cardListSortSearch' >
                <div className='cardListSort'>
                    <Dropdown
                        options={sortOptions}
                        className='dropdown'
                        onChange={(e) => handleSort(e.value)}
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
            </div>

            <div className='cards' >
                {cardPage.map((card) => {
                    return (
                        <div
                            className='card'
                            id={card.id}
                            key={card.id}
                        >
                            <img src={card.image.en_US} className='cardImage' />
                        </div>
                    );
                })}
            </div>

            <div className='cardListButtons'>
                <Button text='Prev' onClick={handlePrev} isDisabled={cardPage < 2} />
                <Button text='Next' onClick={handleNext} isDisabled={cardPage == maxPages} />
            </div>
        </div>
    );
};

export default CardListPage;