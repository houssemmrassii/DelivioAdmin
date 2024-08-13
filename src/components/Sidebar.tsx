import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import './Sidebar.scss';
import logo from '../assets/images/Deliviofull.png';
import { FaTachometerAlt, FaShoppingCart, FaUserFriends, FaCogs, FaUtensils } from 'react-icons/fa';

const Sidebar: React.FC = () => {
    const [isCollapsed, setIsCollapsed] = useState(false);
    const [openMenu, setOpenMenu] = useState<string | null>(null);

    const toggleMenu = (menu: string) => {
        setOpenMenu(openMenu === menu ? null : menu);
    };

    const toggleSidebar = () => {
        setIsCollapsed(!isCollapsed);
    };

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
                            <span>Tableau de Bord</span>
                        </NavLink>
                    </li>
                    <li>
                        <div className="menu-item" onClick={() => toggleMenu('orders')}>
                            <FaShoppingCart className="icon" />
                            <span>Commandes</span>
                        </div>
                        {openMenu === 'orders' && (
                            <ul className="submenu show">
                                <li>
                                    <NavLink to="/orders" className={({ isActive }) => (isActive ? 'active' : '')}>
                                        Liste des Commandes
                                    </NavLink>
                                </li>
                                <li>
                                    <NavLink to="/orders/:orderId" className={({ isActive }) => (isActive ? 'active' : '')}>
                                        Détails de la Commande
                                    </NavLink>
                                </li>
                            </ul>
                        )}
                    </li>
                    <li>
                        <div className="menu-item" onClick={() => toggleMenu('delivery-men')}>
                            <FaUserFriends className="icon" />
                            <span>Livreurs</span>
                        </div>
                        {openMenu === 'delivery-men' && (
                            <ul className="submenu show">
                                <li>
                                    <NavLink to="/delivery-men" className={({ isActive }) => (isActive ? 'active' : '')}>
                                        Liste des Livreurs
                                    </NavLink>
                                </li>
                                <li>
                                    <NavLink to="/delivery-men/new" className={({ isActive }) => (isActive ? 'active' : '')}>
                                        Nouveau Livreur
                                    </NavLink>
                                </li>
                                <li>
                                    <NavLink to="/delivery-men/edit/:deliveryManId" className={({ isActive }) => (isActive ? 'active' : '')}>
                                        Modifier Livreur
                                    </NavLink>
                                </li>
                            </ul>
                        )}
                    </li>
                    <li>
                        <div className="menu-item" onClick={() => toggleMenu('food')}>
                            <FaUtensils className="icon" />
                            <span>Gestion des Aliments</span>
                        </div>
                        {openMenu === 'food' && (
                            <ul className="submenu show">
                                <li>
                                    <NavLink to="/categories" className={({ isActive }) => (isActive ? 'active' : '')}>
                                        Liste des Catégories
                                    </NavLink>
                                </li>
                                <li>
                                    <NavLink to="/categories/new" className={({ isActive }) => (isActive ? 'active' : '')}>
                                        Ajouter une Catégorie
                                    </NavLink>
                                </li>
                                <li>
                                    <NavLink to="/subcategories/new" className={({ isActive }) => (isActive ? 'active' : '')}>
                                        Ajouter une Sous-Catégorie
                                    </NavLink>
                                </li>
                                <li>
                                    <NavLink to="/products" className={({ isActive }) => (isActive ? 'active' : '')}>
                                        Liste des Produits
                                    </NavLink>
                                </li>
                                <li>
                                    <NavLink to="/products/new" className={({ isActive }) => (isActive ? 'active' : '')}>
                                        Ajouter un Produit
                                    </NavLink>
                                </li>
                            </ul>
                        )}
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
                    <p>Bonjour, comment pouvons-nous vous aider?</p>
                    <p>Contactez-nous si vous avez besoin d'aide, nous répondrons dès que possible.</p>
                    <button>Contactez</button>
                </div>
            </div>
        </div>
    );
};

export default Sidebar;
