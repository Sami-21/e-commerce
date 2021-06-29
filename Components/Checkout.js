import React from 'react'
import "../Styles/Checkout.css"
import Subtotal from './Subtotal'
import CheckoutProduct from './CheckoutProduct'
import { useStateValue } from '../StateProvider';

export default function Checkout() {
    const [ {basket, user},  dispatch] = useStateValue();
    
    return (
        <div className="checkout">
            <div className="checkout_left">
                {/*<img className="checkout_ad" src="#" alt="#"/>*/}
            
            <div>
                <h3>Hello, {user? user.email : 'Guest'}</h3>
                <h2 className="checkout_title">
                    Your Shopping Basket
                </h2>

                {basket.map((item, index) =>(
                    <CheckoutProduct 
                     key={index} ID={item.ID} title={item.title} price={item.price} rating={item.rating} image={item.image} />  
                ))}

            </div>
            </div>
            <div className="checkout_right">
                <Subtotal />
            </div>
        </div>
    )
}
