import axios from 'axios'
import { useEffect, useState } from 'react';
import { Header } from '../../components/Header';
import './HomePage.css'
import { ProductsGrid } from './ProductsGrid';
import { useSearchParams } from 'react-router';

export function HomePage({ cart, loadCart }) {
    const [serachParams] = useSearchParams();
    const search = serachParams.get('search');

    const [products, setProducts] = useState([]);

    useEffect(() => {
        const getHomeData = async () => {
            const url = search ? `/api/products/?search=${search}` : '/api/products';
            const response = await axios.get(url);
            setProducts(response.data)
        }

        getHomeData();
    }, [search]);

    return (
        <>
            <Header cart={cart} />
            <title>Ecommerce Project</title>

            <div className="home-page">
                <ProductsGrid products={products} loadCart={loadCart} />
            </div>
        </>
    );
}