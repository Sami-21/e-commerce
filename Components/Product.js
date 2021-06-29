import React from 'react';
import '../Styles/Product.css';
import { useStateValue } from '../StateProvider';

export default function Product({ ID, title, price, image, rating }) {

    const [ {basket},  dispatch] = useStateValue();
    //console.log('this is the basket >>>>', basket);

    const addToBasket = () =>{
        dispatch({
            type:'ADD_TO_BASKET',
            item:{
                ID:ID,
                title:title,
                price:price,
                image:image,
                rating:rating,
            },
        });
    };

    return (
        <div className="Product">
            <div className="product_info">
                <p>{title}</p>
                <p className="product_price">
                    <small>$</small><strong>{price}</strong>
                </p>
                <div className="product_rating">

                    {Array(rating).fill().map((_, i) => (
                    <span key={i} className="material-icons star">star</span>
                    ))} 
                </div>
            </div>
            <img src={image} alt=""/>
            <button onClick={addToBasket}>Add to Basket</button>
            
        </div>
    )
}
