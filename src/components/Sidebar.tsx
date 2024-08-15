import React, { useState, useEffect } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import './Sidebar.scss';
import logo from '../assets/images/Deliviofull.png';
import { FaTachometerAlt, FaShoppingCart, FaUserFriends, FaCogs, FaUtensils, FaTag, FaChevronRight } from 'react-icons/fa';

const Sidebar: React.FC = () => {
    const [isCollapsed, setIsCollapsed] = useState(false);
    const [openMenu, setOpenMenu] = useState<string | null>(null);
    const location = useLocation();

    // Function to handle menu toggling
    const toggleMenu = (menu: string) => {
        setOpenMenu(openMenu === menu ? null : menu);
    };

    // Function to handle sidebar collapsing
    const toggleSidebar = () => {
        setIsCollapsed(!isCollapsed);
    };

    // Use useEffect to keep submenu open based on current path
    useEffect(() => {
        const path = location.pathname;

        if (path.startsWith('/orders')) {
            setOpenMenu('orders');
        } else if (path.startsWith('/delivery-men')) {
            setOpenMenu('delivery-men');
        } else if (path.startsWith('/categories') || path.startsWith('/subcategories') || path.startsWith('/products')) {
            setOpenMenu('food');
        } else {
            setOpenMenu(null);
        }
    }, [location.pathname]);

    return (
        <div className={`sidebar ${isCollapsed ? 'collapsed' : ''}`}>
            <div className="sidebar-header">
                <img src={logo} alt="Logo" className="logo" />
                <button className="collapse-button" onClick={toggleSidebar}>
                    {isCollapsed ? '>' : '<'}
                </button>
            </div>
            <div className="sidebar-menu">
                <ul>
                    <li>
                        <NavLink to="/dashboard" className={({ isActive }) => (isActive ? 'active' : '')}>
                            <FaTachometerAlt className="icon" />
                            <span>Tableau de bord</span>
                        </NavLink>
                    </li>
                    <li className={openMenu === 'orders' ? 'open' : ''}>
                        <div className="menu-item" onClick={() => toggleMenu('orders')}>
                            <FaShoppingCart className="icon" />
                            <span>Commandes</span>
                            <FaChevronRight className={`arrow ${openMenu === 'orders' ? 'rotate' : ''}`} />
                        </div>
                        {openMenu === 'orders' && (
                            <ul className="submenu show">
                                <li>
                                    <NavLink to="/orders" className={({ isActive }) => (isActive ? 'active' : '')}>
                                        Liste des commandes
                                    </NavLink>
                                </li>
                                <li>
                                    <NavLink to="/orders/:orderId" className={({ isActive }) => (isActive ? 'active' : '')}>
                                        Détails de la commande
                                    </NavLink>
                                </li>
                            </ul>
                        )}
                    </li>
                    <li className={openMenu === 'delivery-men' ? 'open' : ''}>
                        <div className="menu-item" onClick={() => toggleMenu('delivery-men')}>
                            <FaUserFriends className="icon" />
                            <span>Livreurs</span>
                            <FaChevronRight className={`arrow ${openMenu === 'delivery-men' ? 'rotate' : ''}`} />
                        </div>
                        {openMenu === 'delivery-men' && (
                            <ul className="submenu show">
                                <li>
                                    <NavLink to="/delivery-men" className={({ isActive }) => (isActive ? 'active' : '')}>
                                        Livreurs
                                    </NavLink>
                                </li>
                                <li>
                                    <NavLink to="/delivery-men/new" className={({ isActive }) => (isActive ? 'active' : '')}>
                                        Nouveau livreur
                                    </NavLink>
                                </li>
                            </ul>
                        )}
                    </li>
                    <li className={openMenu === 'food' ? 'open' : ''}>
                        <div className="menu-item" onClick={() => toggleMenu('food')}>
                            <FaUtensils className="icon" />
                            <span>Gestion des aliments</span>
                            <FaChevronRight className={`arrow ${openMenu === 'food' ? 'rotate' : ''}`} />
                        </div>
                        {openMenu === 'food' && (
                            <ul className="submenu show">
                                <li>
                                    <NavLink to="/categories" className={({ isActive }) => (isActive ? 'active' : '')}>
                                        Liste des catégories
                                    </NavLink>
                                </li>
                                <li>
                                    <NavLink to="/categories/new" className={({ isActive }) => (isActive ? 'active' : '')}>
                                        Ajouter une catégorie
                                    </NavLink>
                                </li>
                                <li>
                                    <NavLink to="/subcategories/new" className={({ isActive }) => (isActive ? 'active' : '')}>
                                        Ajouter une sous-catégorie
                                    </NavLink>
                                </li>
                                <li>
                                    <NavLink to="/products" className={({ isActive }) => (isActive ? 'active' : '')}>
                                        Liste des produits
                                    </NavLink>
                                </li>
                                <li>
                                    <NavLink to="/products/new" className={({ isActive }) => (isActive ? 'active' : '')}>
                                        Ajouter un produit
                                    </NavLink>
                                </li>
                            </ul>
                        )}
                    </li>
                    <li>
                        <NavLink to="/PromoCodeManagement" className={({ isActive }) => (isActive ? 'active' : '')}>
                            <FaTag className="icon" />
                            <span>Code Promo</span>
                        </NavLink>
                    </li>
                    <li>
                        <NavLink to="/settings" className={({ isActive }) => (isActive ? 'active' : '')}>
                            <FaCogs className="icon" />
                            <span>Paramètres</span>
                        </NavLink>
                    </li>
                </ul>
            </div>
            <div className="sidebar-footer">
                <div className="help">
                    <p>Hi, how can we help?</p>
                    <p>Contact us if you need any assistance, we will respond as soon as possible.</p>
                    <button>Contact</button>
                </div>
            </div>
        </div>
    );
};

export default Sidebar;
