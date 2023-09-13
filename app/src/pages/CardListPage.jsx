import React, { useState, useEffect } from 'react';
import axios from '../api/axios';

import '../styles/CardListPage.scss';

const CardListPage = () => {
    const [pageNumber, setPageNumber] = useState(1);
    const [cardPage, setCardPage] = useState([]);
    useEffect(() => {
        const fetchPage = async () => {
            const res = await axios.get('/bnet/cards/page', {
                params: {
                    region: 'us',
                    page: pageNumber
                }
            });
            
            setCardPage(res.data.cards);
        }

        fetchPage();
    }, [pageNumber])
    return(
        <div className='cardList'>
            {cardPage.map((card) => {
                console.log(card);
                return (
                    <div
                        className='cards'
                        id={card.id}
                        key={card.id}
                    >
                        <img src={card.image.en_US} className='cardImage' />
                    </div>
                );
            })}
        </div>
    );
};

export default CardListPage;