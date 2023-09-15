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
    const [metadata, setMetadata] = useState({});
    const [selectedOptions, setSelectedOptions] = useState({});
    const [collectible, setCollectible] = useState('f');
    const [statsRange, setStatsRange] = useState({
        manaCost: [0, 30, 0, 30],
        attack: [0, 20, 0, 20],
        health: [1, 20, 1, 20],
    });
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
                    textFilter: searchValue,
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

    const openModal = async () => {
        if (Object.keys(metadata).length === 0) {
            const res = await axios.get('/bnet/metadata', {
                params: {
                    region: 'us',
                    locale: 'en_US'
                }
            });
            setMetadata(res.data);
        }
        setModalIsOpen(true);
    };
    const closeModal = () => {
        setModalIsOpen(false);
    };

    const handleSelectOption = (param, values) => {
        const val = values.map((value) => {
            return value.slug;
        });
        setSelectedOptions({
            ...selectedOptions,
            [param]: val
        });
    };
    const handleStats = (param) => {
        const stat = param.slice(0, -3);
        const isMinimum = (param.slice(-3) == 'Min' ? true : false);
        const arr = statsRange[stat];

        let min, max;

        if (isMinimum) {
            min = document.getElementById(param).value;
            max = document.getElementById(`${stat}Max`).value;
        } else {
            min = document.getElementById(`${stat}Min`).value;
            max = document.getElementById(param).value;
        }
        
        min = parseInt(min);
        max = parseInt(max);

        if (min < statsRange[stat][2]) {
            arr[0] = arr[2];
            return;
        } else if (statsRange[stat][3] < max) {
            arr[1] = arr[3];
            return;
        } else {
            if (max < min) {
                if (isMinimum) {
                    arr[0] = arr[1];
                } else {
                    arr[1] = arr[0];
                }
            } else {
                arr[0] = min;
                arr[1] = max;
            }
    
            setStatsRange({
                ...statsRange,
                [stat]: arr
            });
        }
    };

    const handleCollectible = (value) => {
        setCollectible(value);
    };

    const handleFilterReset = () => {
        setFilterParams({});
        setModalIsOpen(false);
    };
    const handleFilterApply = () => {

        setModalIsOpen(false);
    };

    return(
        <div className='cardList'>

            <Modal
                isOpen={modalIsOpen}
                className='classModal'
                ariaHideApp={false}
            >
                <h4>Advanced Filters</h4>
                <div className='advancedFilter'>
                    <div className='selectWrapper'>
                        <label htmlFor='setSelect'>Set:</label>
                        <Select
                            options={metadata.sets?.map((set) => {
                                return {
                                    ...set,
                                    label: set.name,
                                    value: set.slug
                                };
                            })}
                            onChange={(e) => {handleSelectOption('set', e)}}
                            isMulti
                            className='select'
                            id='setSelect'
                        />
                    </div>
                    <div className='selectWrapper'>
                        <label htmlFor='classSelect'>Class:</label>
                        <Select
                            options={metadata.classes?.map((cardClass) => {
                                return {
                                    ...cardClass,
                                    label: cardClass.name,
                                    value: cardClass.slug
                                };
                            })}
                            onChange={(e) => {handleSelectOption('class', e)}}
                            isMulti
                            className='select'
                            id='classSelect'
                        />
                    </div>
                    <div className='statsWrapper'>
                        <div className='manaCost'>
                            <input
                                type='number'
                                id='manaCostMin'
                                value={statsRange.manaCost[0]}
                                onChange={() => handleStats('manaCostMin')}
                            />
                            <p> &le; MANACOST &le; </p>
                            <input
                                type='number'
                                id='manaCostMax'
                                value={statsRange.manaCost[1]}
                                onChange={() => handleStats('manaCostMax')}
                            />
                        </div>
                        <div className='attack'>
                            <input
                                type='number'
                                id='attackMin'
                                value={statsRange.attack[0]}
                                onChange={() => handleStats('attackMin')}
                            />
                            <p> &le;&emsp; ATTACK &emsp;&le; </p>
                            <input
                                type='number'
                                id='attackMax'
                                value={statsRange.attack[1]}
                                onChange={() => handleStats('attackMax')}
                            />
                        </div>
                        <div className='health'>
                            <input
                                type='number'
                                id='healthMin'
                                value={statsRange.health[0]}
                                onChange={() => handleStats('healthMin')}
                            />
                            <p> &le;&emsp; HEALTH &emsp;&le; </p>
                            <input
                                type='number'
                                id='healthMax'
                                value={statsRange.health[1]}
                                onChange={() => handleStats('healthMax')}
                            />
                        </div>
                    </div>
                    <div className='collectible'>
                        <p> Show Non-Collectible Cards: </p>
                        <input
                            type='radio'
                            id='collectibleTrue'
                            checked={collectible === 't'}
                            onChange={() => handleCollectible('t')}
                        />
                        <label htmlFor='collectibleTrue'>True</label>
                        <input
                            type='radio'
                            id='collectibleFalse'
                            checked={collectible === 'f'}
                            onChange={() => handleCollectible('f')}
                        />
                        <label htmlFor='collectibleFalse' >False</label>
                        <input
                            type='radio'
                            id='collectibleOnly'
                            checked={collectible === 'o'}
                            onChange={() => handleCollectible('o')}
                        />
                        <label htmlFor='collectibleOnly'>Only Non-Collectible</label>
                    </div>
                    <div className='selectWrapper'>
                        <label htmlFor='raritySelect'>Rarity:</label>
                        <Select
                            options={metadata.rarities?.map((rarity) => {
                                return {
                                    ...rarity,
                                    label: rarity.name,
                                    value: rarity.slug
                                };
                            })}
                            onChange={(e) => {handleSelectOption('rarity', e)}}
                            isMulti
                            className='select'
                            id='raritySelect'
                        />
                    </div>
                    <div className='selectWrapper'>
                        <label htmlFor='typeSelect'>Type:</label>
                        <Select
                            options={metadata.types?.map((type) => {
                                return {
                                    ...type,
                                    label: type.name,
                                    value: type.slug
                                };
                            })}
                            onChange={(e) => {handleSelectOption('type', e)}}
                            isMulti
                            className='select'
                            id='typeSelect'
                        />
                    </div>
                    <div className='selectWrapper'>
                        <label htmlFor='minionTypeSelect'>Minion Type:</label>
                        <Select
                            options={metadata.minionTypes?.map((minionType) => {
                                return {
                                    ...minionType,
                                    label: minionType.name,
                                    value: minionType.slug
                                };
                            })}
                            onChange={(e) => {handleSelectOption('minionType', e)}}
                            isMulti
                            className='select'
                            id='minionTypeSelect'
                        />
                    </div>
                    <div className='selectWrapper'>
                        <label htmlFor='keywordSelect'>Keyword:</label>
                        <Select
                            options={metadata.keywords?.map((keyword) => {
                                return {
                                    ...keyword,
                                    label: keyword.name,
                                    value: keyword.slug
                                };
                            })}
                            onChange={(e) => {handleSelectOption('keyword', e)}}
                            isMulti
                            className='select'
                            id='keywordSelect'
                        />
                    </div>
                </div>
                <div className='buttons'>
                    <Button text='Cancel' onClick={closeModal} />
                    <Button text='Reset' onClick={handleFilterReset} />
                    <Button text='Apply' onClick={handleFilterApply} />
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