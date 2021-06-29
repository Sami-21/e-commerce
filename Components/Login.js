import {Link, useHistory} from 'react-router-dom'
import React, { useState } from 'react'
import '../Styles/Login.css'
import { auth } from '../firebase';

export default function Login() {
    const history =useHistory();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");


    const SignIn = e => {
        e.preventDefault(); //preventing loss on refresh

        auth
        .signInWithEmailAndPassword(email,password)
        .then(auth => {
            
            history.push('/')
        })
        .catch(error =>alert(error.message))
    }


    const Register = e => {
        e.preventDefault();//preventing loss on refresh

    auth
        .createUserWithEmailAndPassword(email,password)
        .then((auth) => {
            //creation of user with email and password
            if(auth){
               history.push('/')
            }
        })
        .catch(error =>alert(error.message))
    }
 
    return (
        <div className="Login_page">
            <Link to ="/">
            {/*Logo image*/}
            <h1 className="login_logo">Logo</h1>
            </Link>
            <div className="login_container">
            <h1>Sign In</h1>
            <form>

                <h5>E-mail</h5>
                <input type="text" value={email} onChange={e =>setEmail(e.target.value)}/>

                <h5>Password</h5>
                <input type="password" value={password} onChange={e =>setPassword(e.target.value)} />

                <input type="submit" onSubmit={SignIn} className="login_SignInBtn" value="Sign In"/>
            </form>
            <button onClick={Register}className="login_RegisterBtn">Create new Account</button>
        </div>
        </div>
    )
}
