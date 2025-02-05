import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import ThemeToggle from './ThemeToggle';

const Navbar = () => {
    const navigate = useNavigate();

    const handleTitleClick = () => {
        // Navigate to home and refresh the page to reset all states
        navigate('/');
        window.location.reload();
    };

    return (
        <nav>
            <div className="nav-content">
                <Link to="/" className="nav-title" onClick={handleTitleClick}>
                    <h1>
                        F<span className="apple">🍎</span>
                        <span className="apple">🍎</span>d Savy
                    </h1>
                </Link>
                <ThemeToggle />
            </div>
        </nav>
    );
};

export default Navbar;
