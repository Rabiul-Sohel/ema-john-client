import React, { useEffect, useState } from 'react';
import Cart from '../Cart/Cart';
import { Link, useLoaderData } from 'react-router-dom';
import ReviewItem from '../ReviewItem/ReviewItem';
import './Orders.css';
import { deleteShoppingCart, removeFromDb } from '../../utilities/fakedb';
import axios from 'axios';
import useAuth from '../../hooks/useAuth';

const Orders = () => {
    const {user}= useAuth()
    
    const [cart, setCart] = useState([]);
    useEffect(()=>{
        axios.get(`http://localhost:5000/orders?email=${user.email}`, {withCredentials: true})
        .then(res => setCart(res.data))
    },[])

    const handleRemoveFromCart = (id) => {
        const remaining = cart.filter(product => product._id !== id);
        console.log(cart, id)
        setCart(remaining);
        removeFromDb(id);
    }

    const handleClearCart = () => {
        setCart([]);
        deleteShoppingCart();
    }

    return (
        <div className='shop-container'>
            <div className='review-container'>
                {
                    cart.map(product => <ReviewItem
                        key={product._id}
                        product={product}
                        handleRemoveFromCart={handleRemoveFromCart}
                    ></ReviewItem>)
                }
            </div>
            <div className='cart-container'>
                <Cart
                    cart={cart}
                    handleClearCart={handleClearCart}
                >
                    <Link className='proceed-link' to="/checkout">
                        <button className='btn-proceed'>Proceed Checkout</button>
                    </Link>
                </Cart>
            </div>
        </div>
    );
};

export default Orders;