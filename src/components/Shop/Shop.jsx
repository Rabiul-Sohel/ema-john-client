import React, { useEffect, useState } from 'react';
import { addToDb, deleteShoppingCart, getShoppingCart } from '../../utilities/fakedb';
import Cart from '../Cart/Cart';
import Product from '../Product/Product';
import './Shop.css';
import { Link } from 'react-router-dom';
import useAuth from '../../hooks/useAuth';
import axios from 'axios';

const Shop = () => {
    const [products, setProducts] = useState([]);
    const [cart, setCart] = useState([])
    const [totalPages, setTotalPages] = useState(0)
    const [currentPage, setCurrentPage]=useState(1)
    const [limit, setLimit] = useState(10)
    // console.log(totalPages);
    const maxVisibleButton = 6;
    const {user} = useAuth()
   


    const buttons =[];
    // for(let i = 1; i <= totalPages; i++){
    //     buttons.push(i)
    // }
    if(totalPages > maxVisibleButton){
        if(currentPage <= 4){
           for(let i = 1; i <= maxVisibleButton-2; i++){
            buttons.push(i)
           }
           buttons.push('...')
           buttons.push(totalPages)
        } else if(currentPage >= totalPages-3){
            buttons.push(1)
            buttons.push('...')
            for(let i = totalPages-(maxVisibleButton-3); i <= totalPages; i++){
                buttons.push(i)
            }
        } else {
            buttons.push(1)
            buttons.push('...')
            buttons.push(currentPage -1)
            buttons.push(currentPage)
            buttons.push(currentPage + 1)
            buttons.push('...')
            buttons.push(totalPages)
        }
    } else {
        for(let i = 1; i <= totalPages; i++){
                buttons.push(i) 
}}

    useEffect(() => {
        fetch(`http://localhost:5000/productsPage?page=${currentPage}&limit=${limit}`, {credentials: 'include'})
            .then(res => res.json())
            .then(data => {
                console.log(data);
                setProducts(data.data)
                setTotalPages(data.totalPages)
            })
    }, [currentPage, limit]);

    useEffect(() => {
        const storedCart = getShoppingCart();
        const savedCart = [];
        // step 1: get id of the addedProduct
        for (const id in storedCart) {
            // step 2: get product from products state by using id
            const addedProduct = products.find(product => product._id === id)
            if (addedProduct) {
                // step 3: add quantity
                const quantity = storedCart[id];
                addedProduct.quantity = quantity;
                // step 4: add the added product to the saved cart
                savedCart.push(addedProduct);
            }
            // console.log('added Product', addedProduct)
        }
        // step 5: set the cart
        setCart(savedCart);
    }, [products])

    const handleAddToCart = (product) => {
        axios.post('http://localhost:5000/orders', product)
        .then(res => console.log(res.data))
        // cart.push(product); '
        // let newCart = [];
        // const newCart = [...cart, product];
        // if product doesn't exist in the cart, then set quantity = 1
        // if exist update quantity by 1
        // const exists = cart.find(pd => pd._id === product._id);
        // if (!exists) {
        //     product.quantity = 1;
        //     newCart = [...cart, product]
        // }
        // else {
        //     exists.quantity = exists.quantity + 1;
        //     const remaining = cart.filter(pd => pd._id !== product._id);
        //     newCart = [...remaining, exists];
        // }

        // setCart(newCart);
        // addToDb(product._id)
    }

    const handleClearCart = () => {
        setCart([]);
        deleteShoppingCart();
    }
    const handlePrevPage =()=>{
        if(currentPage > 0){
            setCurrentPage(currentPage - 1)
        }
    }
    const handleNextPage = ()=>{
        if(currentPage < totalPages){
            setCurrentPage(currentPage + 1)
        }
    }
    const handleProductLimit = e =>{
        const value = e.target.value;
        setLimit(value)
    }

    return (
        <div className='shop-container'>
            <div className="products-container">
                {
                    products.map(product => <Product 
                        key={product._id}
                        product={product}
                        user = {user}
                        handleAddToCart={handleAddToCart}
                    ></Product>)
                }    
            </div>
            <div className="cart-container">   
                <Cart
                    cart={cart}
                    handleClearCart={handleClearCart}
                >
                    <Link className='proceed-link' to="/orders">
                        <button className='btn-proceed'>Review Order</button>
                    </Link>
                </Cart>
            </div>
        
            <div style={{margin: '20px auto'}}>
                <button onClick={handlePrevPage}>Prev</button>
                {
                    buttons.map((btn, idx)=> <button style={currentPage === btn ? {backgroundColor:'red'}:undefined} onClick={()=> setCurrentPage(btn)} key={idx}> {btn} </button> )
                }
                <button onClick={handleNextPage}>Next</button>
                <select style={{padding:'10px'}} defaultValue='10' onChange={handleProductLimit} name="" id="">
                    <option value="5">5</option>
                    <option value="10">10</option>
                    <option value="20">20</option>
                    <option value="50">50</option>
                </select>
            </div>
        </div>
    );
};

export default Shop;