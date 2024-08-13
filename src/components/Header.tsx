import React, { useState } from 'react';
import { FaSearch, FaBell, FaEnvelope, FaUserCircle, FaCog, FaSignOutAlt, FaMoon, FaExpand, FaGlobe } from 'react-icons/fa';
import './Header.scss';

const Header: React.FC = () => {
    const [isAdminMenuOpen, setIsAdminMenuOpen] = useState(false);

    const toggleAdminMenu = () => {
        setIsAdminMenuOpen(!isAdminMenuOpen);
    };

    return (
        <header className="header">
            <div className="header-left">
                <div className="search-bar">
                    <input type="text" placeholder="Recherchez ici..." />
                    <FaSearch className="search-icon" />
                </div>
            </div>
            <div className="header-right">
                <FaGlobe className="header-icon" />
                <FaMoon className="header-icon" />
                <FaBell className="header-icon notification" />
                <FaEnvelope className="header-icon notification" />
                <FaExpand className="header-icon" />
                <div className="admin" onClick={toggleAdminMenu}>
                    <FaUserCircle className="header-icon admin-icon" />
                    <span className="admin-name">Kristin Watson</span>
                    <span className="admin-role">Admin</span>
                </div>
                {isAdminMenuOpen && (
                    <div className="admin-menu">
                        <ul>
                            <li><FaUserCircle /> Compte</li>
                            <li><FaEnvelope /> Boîte de Réception <span className="badge">27</span></li>
                            <li><FaCog /> Paramètres</li>
                            <li><FaSignOutAlt /> Déconnexion</li>
                        </ul>
                    </div>
                )}
            </div>
        </header>
    );
};

export default Header;
