import React, { useState, useEffect } from 'react'
import { db } from '../firebase';
import Order from '../Order';
import { useStateValue } from '../StateProvider'
import '../Styles/Orders.css'

export default function Orders() {
    const [{basket, user} , dispatch] =  useStateValue();
    const [orders, setOrders] = useState([]);

    useEffect(() => {
        if(user){
            db
            .collection('users')
            .doc(user?.uid)
            .collection('orders')
            .orderBy('created', ' desc')
            .onSnapshot(snapshot => (
                setOrders(snapshot.docs.map(doc =>({
                    id:doc.id,
                    data:doc.data(),
    
                })))
            ))
        }
        else{
            setOrders([])
        }
       
    }, [user])

    return (
        <div className="Orders">
            <h1>Your Orders</h1>
            <div className="orders_order">
                {orders?.map((order, index) =>(
                    <Order key={index} order={order} />
                ))}
            </div>
        </div>
    )
}
