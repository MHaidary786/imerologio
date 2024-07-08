import React, { useState } from 'react'
import classes from "./changePass.module.css"
import logo from "../../assets/imerologio-logo.png"
import { jwtDecode } from "jwt-decode";
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Footer from '../footer/footer';

export default function ChangePassword() {
    const [password, setPassword] = useState('')
    const [newPassword, setNewPassword] = useState('')
    const navigate = useNavigate()
    const token = localStorage.getItem("token")

    const getToken = () => {
        if(token){
            const userData = jwtDecode(token);
            return userData
        } else {
            alert("You are not logged in")
            navigate("/login")
            return null
        }
    }

    const handelChangePassword = async (e) => {
        e.preventDefault();
        const newDetails = {password : password, newPassword : newPassword}

        try {
            axios.put(`http://localhost:8080/user/update/changepassword/${getToken().userId}`, newDetails)   
            .then((res) => {
                if(res.status === 200){
                    setPassword("")
                    setNewPassword("")
                    navigate("/")
                }
            }) 
        } catch (error) {
            console.log(error)
        }
    }


    const handleCancel = () => {
        setPassword("")
        setNewPassword("")
        navigate("/")

    }


    const repeatCheck = (e) => {
        
    }


  return (
    <>
    <div className={classes.container}>
        <form className={classes.wrapper} onSubmit={handelChangePassword}>
            <img src={logo} alt="Imerologio" />
            <h3 className={classes.username}>{getToken().userEmail}</h3>
            <h1 className={classes.h1}>Change your password</h1>
            <p>A strong password helps prevent unauthorized access to your account</p>
            <div className={classes.inputWrapper}>
              <input
                type="password"
                id="password"
                value={password}
                placeholder='Current Password'
                onChange={(e) => setPassword(e.target.value)}
                required
                minLength={8}
              />
              <input
                type="password"
                id="newPassword"
                value={newPassword}
                placeholder='New Password'
                onChange={(e) => setNewPassword(e.target.value)}
                required
                minLength={8}
              />
              <input
                type="password"
                id="RepeatNewPassword"
                // onChange= {}
                placeholder='Repeat New Password'
              />
            </div>
            <div className={classes.btnWrapper}>
            <button className={classes.CHbtn} type='submit'>Change</button>
            <button className={classes.CHbtn} onClick={() => handleCancel}>Cancel</button>
            </div>
        </form>
    </div>
    <Footer/>
    </>
  )
}
