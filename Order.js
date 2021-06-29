import moment from 'moment'
import React from 'react'
import CurrencyFormat from 'react-currency-format'
import CheckoutProduct from './Components/CheckoutProduct'
import './Styles/Order.css'

export default function Order( {order}) {
    return (
        <div className="Order">
            <h2>Order</h2>
            <p>{moment.unix(order.data.created).format("MMMM Do YYYY, h:mma")}</p>
            <p className="order_id">
                <small>{order.id}</small>
            </p>
            {order.data.basket?.map((item, index) =>(
                <CheckoutProduct
                key={index}
                id={item.id}
                title={item.title}
                image={item.image}
                price={item.price}
                rating={item.rating}
                hideButton
                 />
            ))}
             <CurrencyFormat
            renderText={(value) =>(
                
                <h3>
                    Order Total :{value}
                </h3>
               
            )}
            decimalScale={2}
           /* value={getBasketTotal(basket)}*/
            value={order.data.amount / 100}
            displayType="text"
            thousandSeparator={true}
            prefix={"$"}
            />
        </div>
    )
}
