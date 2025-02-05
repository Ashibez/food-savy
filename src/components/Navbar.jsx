import React from 'react';
import { Link } from 'react-router-dom';
import ThemeToggle from './ThemeToggle';

const Navbar = () => {
    return (
        <nav>
            <div className="nav-content">
                <Link to="/" className="nav-title">
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
