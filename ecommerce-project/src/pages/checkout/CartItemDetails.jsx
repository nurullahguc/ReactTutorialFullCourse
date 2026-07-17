import axios from "axios";
import { formatMoney } from "../../utils/money";
import { useState } from "react";

export function CartItemDetails({ cartItem, loadCart }) {
    const [showQuantityTextBox, setShowQuantityTextBox] = useState(false);
    const deleteCartItem = async () => {
        await axios.delete('/api/cart-items/' + cartItem.productId)
        await loadCart();
    }
    const handleUpdate = () => {
        setShowQuantityTextBox(!showQuantityTextBox);
    }

    return (
        <>
            <img className="product-image"
                src={cartItem.product.image}
                alt={cartItem.product.image}
            />

            <div className="cart-item-details">
                <div className="product-name">
                    {cartItem.product.name}
                </div>
                <div className="product-price">
                    {formatMoney(cartItem.product.priceCents)}
                </div>
                <div className="product-quantity">
                    <span>
                        Quantity:
                        {showQuantityTextBox && (
                            <input
                                className="quantity-input"
                                type="text"
                            />
                        )}
                        {!showQuantityTextBox && (
                            <span
                                className="quantity-label"
                            >
                                {cartItem.quantity}
                            </span>
                        )}

                    </span>
                    <span
                        onClick={handleUpdate}
                        className="update-quantity-link link-primary"
                    >
                        Update
                    </span>
                    <span
                        className="delete-quantity-link link-primary"
                        onClick={deleteCartItem}
                    >
                        Delete
                    </span>
                </div>
            </div>
        </>
    );
}