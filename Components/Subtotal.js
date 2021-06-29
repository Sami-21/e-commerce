import React from 'react'
import  CurrencyFormat  from "react-currency-format";
import { useHistory } from 'react-router-dom';
import { getBasketTotal } from '../reducer';
import { useStateValue } from '../StateProvider';
import '../Styles/Subtotal.css'

export default function Subtotal() {
    const [ {basket},  dispatch] = useStateValue();
    const history = useHistory();
    //Using a Selector from the reducer to calculate the total is way better then a for loop and more professional 

    //let subtotal_price = 0;
    //   for(let i=0;i<basket.length;i++){
    //     subtotal_price +=basket[i].price;
    // }

    return (
        <div className="subtotal">
            <CurrencyFormat
            renderText={(value) =>(
                <>
                <p>
                    Subtotal ({basket.length} items) :<strong>{value}</strong>
                </p>
                <small className="checkout_gift">
                    <input type="checkbox" /> this order contains gift
                </small>
                </>
            )}
            decimalScale={2}
           /* value={getBasketTotal(basket)}*/
            value={getBasketTotal(basket)}
            displayType="text"
            thousandSeparator={true}
            prefix={"$"}
            />
            <button onClick={e =>history.push('/payment')}>Proceed to checkout</button>
        </div>
    );
}
