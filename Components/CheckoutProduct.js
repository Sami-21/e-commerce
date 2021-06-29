import React from 'react'
import { useStateValue } from '../StateProvider';
import '../Styles/CheckoutProduct.css'

export default function CheckoutProduct({ ID, title, price, image, rating, hideButton }) {
    const [ {basket},  dispatch] = useStateValue();

    const removeFromBasket = () => {
        // item removing from basket function
        dispatch({
            type:'REMOVE_FROM_BASKET',
            ID:ID,
        })
    }
    
    return (

        <div className="checkoutproduct">
            <img className="checkoutproduct_image" src={image} alt="product" />

            <div className="checkoutproduct_info">

                <p className="checkoutproduct_title">{title}</p>
                <p className="checkoutproduct_price">
                    <small>$</small>
                    <strong>{price}</strong>
                </p>
                <div className="checkoutproduct_rating">
                {Array(rating).fill().map((_, i) => (
                    <span key={i} className="material-icons star">star</span>
                    ))} 
                </div>
                {!hideButton && (
                <button onClick={removeFromBasket} >Remove from Basket</button>
                )}
            </div>

            
        </div>

    )
}
