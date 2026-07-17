import { Header } from "../../components/Header";
import './TrackingPage.css'
import { Link } from 'react-router'
import { useParams } from "react-router";
import axios from "axios";
import { useEffect } from "react";
import { useState } from "react";
import dayjs from "dayjs";

export function TrackingPage({ cart }) {
    const [order, setOrder] = useState(null);
    const [product, setProduct] = useState(null);
    const { orderId, productId } = useParams();
    console.log(orderId, productId);

    useEffect(() => {
        const fetchTrackingData = async () => {
            const response = await axios.get(`/api/orders/${orderId}?expand=products`);
            setOrder(response.data);
        }

        fetchTrackingData();
    }, [orderId]);

    useEffect(() => {
        const findProduct = order?.products.find((productItem) => {
            return productItem.productId === productId;
        })
        console.log("findProduct", findProduct);

        setProduct(findProduct);
    }, [order]);

    return (
        <>
            <title>Tracking</title>
            <Header cart={cart} />

            <div className="tracking-page">
                <div className="order-tracking">
                    <Link className="back-to-orders-link link-primary" to="/orders">
                        View all orders
                    </Link>

                    {product && (
                        <>
                            <div className="delivery-date">
                                Arriving on {dayjs(product.estimatedDeliveryTimeMs).format('dddd, MMMM D')}
                            </div>

                            <div className="product-info">
                                {product.product.name}
                            </div>

                            <div className="product-info">
                                Quantity: {product.quantity}
                            </div>

                            <img className="product-image" src={product.product.image} />

                            <div className="progress-labels-container">
                                <div className="progress-label">
                                    Preparing
                                </div>
                                <div className="progress-label current-status">
                                    Shipped
                                </div>
                                <div className="progress-label">
                                    Delivered
                                </div>
                            </div>

                            <div className="progress-bar-container">
                                <div className="progress-bar"></div>
                            </div>
                        </>
                    )}
                </div>
            </div>
        </>
    );
}