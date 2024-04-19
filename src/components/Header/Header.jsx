import React from 'react';
import './Header.css';
import logo from '../../images/Logo.svg';
import { Link } from 'react-router-dom';
import useAuth from '../../hooks/useAuth';

const Header = () => {
    const {signoutUser, user} = useAuth()
    const handleLogout = ()=>{
        signoutUser()
        .then(()=> console.log('logout successful'))
        .catch(err => console.log(err))
    }
    return (
        <nav className='header'>
            <img src={logo} alt="" />
            <div>
                <Link to="/">Shop</Link>
                <Link to="/orders">Orders</Link>
                <Link to="/inventory">Inventory</Link>
                {
                    user ? <div style={{display: 'flex', alignItems: 'center', justifyContent: 'center', justifyItems: 'center'}}> 
                        <p> {user.email} </p>
                        <Link onClick={handleLogout}>Logout</Link>
                    </div>:<Link to="/login">Login</Link>
                }
            </div>
        </nav>
    );
};

export default Header;