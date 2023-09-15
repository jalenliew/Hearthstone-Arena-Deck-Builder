import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Link } from 'react-router-dom';
import axios from '../api/axios';
import Button from '../components/Button';

import '../styles/pages/CardDetailsPage.scss';

const CardDetailsPage = () => {
    const [keywordData, setKeywordData] = useState([]);
    const location = useLocation();
    const navigate = useNavigate();

    useEffect(() => {
        const fetchKeywords = async () => {
            const res = await axios.get('/bnet/metadata/keywords', {
                params: {
                    region: 'us'
                }
            });

            setKeywordData(
                res.data.filter((keyword) => {
                    return location.state.keywordIds.includes(keyword.id);
            }));
        }
        
        if (location.state?.keywordIds?.length > 0) {
            fetchKeywords();
        }
    }, [location]);

    const handleBack = () => {
        navigate(-1);
    }

    return (
        <div className='cardDetailsPage' >
            <Button text='Go Back' onClick={handleBack} />
            { location.state?.id ? (
                <div className='cardDetails'>
                    <img src={location.state.image} alt={location.state.name}/>
                    <div className='keywordWrapper' >
                        {keywordData?.map((keyword, index) => {
                            return (
                                <div key={keyword.name.en_US} className='keyword' >
                                    <b>{keyword.name.en_US}</b>
                                    <p>{keyword.refText.en_US}</p>
                                </div>
                            );
                        })}
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

export default CardDetailsPage;