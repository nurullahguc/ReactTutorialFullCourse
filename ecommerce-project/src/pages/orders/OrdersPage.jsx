import axios from 'axios';
import { useState, useEffect } from 'react';
import { Header } from '../../components/Header';
import './OrdersPage.css'
import { Link } from 'react-router'
import CartIcon from "../../assets/images/icons/cart-icon.png"
import SearchIcon from "../../assets/images/icons/search-icon.png"
import LogoWhite from "../../assets/images/logo-white.png"
import MobileLogoWhite from "../../assets/images/mobile-logo-white.png"
import { OrdersGrid } from './OrdersGrid';

export function OrdersPage({ cart, loadCart }) {
    const [orders, setOrders] = useState([]);
    useEffect(() => {
        const fetchOrderData = async () => {
            const response = await axios.get('/api/orders?expand=products');
            setOrders(response.data);
        }

        fetchOrderData();
    }, []);

    return (
        <>
            <title>Orders</title>
            <Header cart={cart} />

            <div className="orders-page">
                <div className="page-title">Your Orders</div>

                <OrdersGrid orders={orders} loadCart={loadCart} />
            </div>
        </>
    );
}