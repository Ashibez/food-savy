import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import RecipeDetails from './pages/RecipeDetails';
import ScrollToTop from './components/ScrollToTop';
import './App.css';

function App() {
    return (
        <Router>
            <ScrollToTop />
            <div className="App">
                <Navbar />
                <main>
                    <Routes>
                        <Route path="/" element={<Home />} />
                        <Route path="/recipe/:id" element={<RecipeDetails />} />
                    </Routes>
                </main>
            </div>
        </Router>
    );
}

export default App;
