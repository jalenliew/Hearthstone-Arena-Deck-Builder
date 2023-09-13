import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Link } from 'react-router-dom';
import axios from '../api/axios';
import Button from '../components/Button';

import '../styles/pages/CardDetailsPage.scss';

const CardDetailsPage = () => {
    const [keywordData, setKeywordData] = useState([]);
    const location = useLocation();

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

    return (
        <div>
            { location.state?.id ? (
                <div className='cardDetails'>
                    <img src={location.state.image} />
                    <div className='keywordWrapper' >
                        {keywordData?.map((keyword, index) => {
                            return (
                                <div key={keyword} className='keyword' >
                                    <b>{keyword.name.en_US}</b>
                                    {console.log(keyword)}
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