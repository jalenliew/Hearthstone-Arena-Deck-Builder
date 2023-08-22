import React from 'react';
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Navbar from './components/Navbar';
import HomePage from './pages/HomePage';
import ArenaBuilderPage from './pages/ArenaBuilderPage';
import DeckBuilderPage from './pages/DeckBuilderPage';
import CardListPage from './pages/CardListPage';
import NoPage from './pages/NoPage';

const AppRouter = () => {

    return (
        <BrowserRouter>
            <Navbar />
            <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/arena" element={<ArenaBuilderPage />} />
                <Route path="/deck" element={<DeckBuilderPage />} />
                <Route path="/cards" element={<CardListPage />} />
                <Route path="*" element={<NoPage />} />
            </Routes>
        </BrowserRouter>
    );
};

export default AppRouter;