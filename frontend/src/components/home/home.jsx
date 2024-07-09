import React from "react";
import classes from "./home.module.css";
import photo1 from "../../assets/photo1.png";
import { Link } from "react-router-dom";
import Navbar from "../navbar/navbar";
import Footer from "../footer/footer";

export default function home() {

  const isLoggedIn = () => {
    const token = localStorage.getItem("token");
    var bol = token !== null
    console.log(bol)
    return token !== null;
  };
  
  return (
    <>
      <Navbar />
      <div className={classes.container}>
        <header className={classes.header}></header>
        <div className={classes.bodyWrapper}>
          <div className={classes.topRow}>
            <div className={classes.right}>
              <img src={photo1} alt="" className={classes.photo} />
            </div>
            <div className={classes.left}>
              <h1>About us</h1>
              <p>
                "Imerologio" is a full stack calendar application, designed as a personal diary,
                empowers users to effortlessly capture their daily moments. With seamless functionality
                powered by MongoDB, Express, React, and CSS, users can create, edit, and manage journals 
                tailored to any day of their choosing. They can enrich their entries by adding photos, 
                express emotions or adding tags. Our app provides a sanctuary for reflection and expression,
                where every journal entry becomes a cherished memory to revisit and cherish.
              </p>
            </div>
          </div>
          <div className={classes.bottomRow}>
            <div className={isLoggedIn() ? classes.HiddenloginWrapper : classes.loginWrapper }>
              <Link to="/login"> 
                <button href="/login" className={classes.btn}>
                  Login
                </button>
              </Link>
              <Link to="/register">
                <button className={classes.btn}>Register</button>
              </Link>
            </div>
          </div>
        </div>
      </div>
      <Footer/>
    </>
  );
}
