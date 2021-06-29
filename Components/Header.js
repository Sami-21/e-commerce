import React from 'react';
import {Link} from 'react-router-dom'
import { auth } from '../firebase';
import { useStateValue } from '../StateProvider';
import '../Styles/Header.css'


export default function Header() {
    const handleAuthentication = () => {
        if(user){
            auth.signOut();
        }
    }

    const [ {basket, user },  dispatch] = useStateValue();

    return (
        <div className="header_bar">
            <Link to="/">
            <div className="header_logo">
            <h1>Logo</h1>
            </div>
            </Link>
<div className="header_search">
    <input className="header_searchInput" type="text" placeholder="Search for a product"/>
        <span className="material-icons header_searchIcon">
search
</span>

</div>

            <div className="header_nav">
            <Link to="login">{/*!user && "/login"*/}
           <div onClick={handleAuthentication} className="nav_option">
               <span className="nav_optionLineOne">{user ? user?.email:'Hello Guest'}</span>
               <span className="nav_optionLineTwo">{user ? 'Sign Out':'Sign In'}</span>
           </div>
           </Link>
             <Link to="/orders"> 
           <div className="nav_option">
            <span className="nav_optionLineOne">Returns</span>
             <span className="nav_optionLineTwo">Orders</span>
           </div>
           </Link>

           <div className="nav_option">
               <span className="nav_optionLineOne">Your</span>
               <span className="nav_optionLineTwo">Prime</span>
           </div>
           <Link to="/checkout">
           <div className="nav_option_Basket">
           <span className="material-icons">
            shopping_basket
            </span>
            <span className="nav_optionLineTwo header_basketCount">{basket?.length}</span>
           </div>
         </Link>
            </div>
        </div>
    )
}
