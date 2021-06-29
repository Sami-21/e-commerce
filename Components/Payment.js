import { CardElement, useElements, useStripe } from '@stripe/react-stripe-js';
import React, { useState, useEffect } from 'react'
import { Link, useHistory } from 'react-router-dom';
import { useStateValue } from '../StateProvider';
import'../Styles/Payment.css'
import  CurrencyFormat  from "react-currency-format";
import CheckoutProduct from './CheckoutProduct';
import { getBasketTotal } from '../reducer';
import axios from 'axios';
import { db } from '../firebase';

export default function Payment() {
    const [ {basket, user},  dispatch] = useStateValue();


    const stripe = useStripe();
    const elements =useElements();
    const history = useHistory();

    const [succeeded, setSucceeded] = useState(false);
    const [processing, setProcessing] = useState("");
    const [error, setError] = useState(null);
    const [disabled, setDiabled] = useState(true);
    const [clientSecret, setClientSecret] = useState(true);

    useEffect(() => {

    //whenever the basket updates this functions will update the amount charged to the customer  
        const getClientSecret = async () =>{
            const response = await axios({
                method:'post',
                //Stripe APi needs to get the currencies in subunits (dollar => cents)
                url:`/payment/create?total=${getBasketTotal(basket) * 100}`,
            });
            setClientSecret(response.data.clientSecret);
            console.log('something' ,response)
        }
        
        getClientSecret();
    },[basket])

    //console.log('the client secret is >>>>', clientSecret);

    const handleSubmit = async (event) =>{
        //stripe functions
        event.preventDefault();
        setProcessing(true);
        const payload = await stripe.confirmCardPayment(clientSecret, {
            payment_method:{
                card: elements.getElement(CardElement)
            }
        }).then(({paymentIntent}) =>{
            // paymentIntent = payment confirmation

            db
            .collection('users')
            .doc(user?.uid)
            .collection('orders')
            .doc(paymentIntent.id)
            .set({
                basket:basket,
                amount : paymentIntent.amount,
                created: paymentIntent.created,
            })

            setSucceeded(true);
            setError(null);
            setProcessing(false);
            dispatch({
                type:'EMPTY_BASKET',
            })
            history.replace('/orders')
        })
    }
    const handleChange = event =>{
        //stripe functions
        setDiabled(event.empty);
        setError(event.error ? event.error.message : "");
    }

    return (
        <div className="Payment">
            <div className="payment_container">
                <h1>
                    Checkout (<Link to="/checkout">{basket?.length} items</Link>)

                </h1>
                {/*Delivery Address Section */}
                <div className="payment_section">
            <div className="payment_title">
            <h3>Delivery Address</h3>
            </div>
            <div className="payment_address">
                <p>{user?.email}</p>
                <p>123 PLF</p>
                <p>Sami Maachi ,Batna</p>
            </div>
                </div>

                {/*Products Reviewing Section */}
                <div className="payment_section">
                <div className="payment_title">
            <h3>Reviews Basket Products</h3>
                </div>
                <div className="payment_Items">
                {basket.map((item, index) =>
                    <CheckoutProduct
                    key={index} ID={item.ID} title={item.title} price={item.price} rating={item.rating} image={item.image}/>)}
                </div>
                </div>
                
                {/*Payment Method Section */}
                <div className="payment_section">
                <div className="payment_title">
            <h3>Payment Method</h3>
                </div>
                <div className="payment_details">
                    {/*Stripe functions  */}
                    <form onSubmit={handleSubmit} >
                        <CardElement onChange={handleChange} />
                      
                        <div className="payment_price_container">
                        <CurrencyFormat
            renderText={(value) =>(
                
                <h3>
                    Order Total :<strong>{value}</strong>
                </h3>
               
            )}
            decimalScale={2}
           /* value={getBasketTotal(basket)}*/
            value={getBasketTotal(basket)}
            displayType="text"
            thousandSeparator={true}
            prefix={"$"}
            />

            <button disabled={processing || disabled || succeeded}>
                <span>{processing ? <p>Processing</p> : "Buy Now"}</span>
                </button>
                        </div>
                        
                        
                        {/*Errors*/}
                        {error && <div>{error}</div>}
                    </form>
                </div>
                </div>

            </div>
        </div>
    )
}
