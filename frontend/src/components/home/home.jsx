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
                "Imerologio" is a full stack calendar application that allows
                users to create, edit, delete, and search for daily notes. The
                application uses MongoDB, Express, React, and CSS. Project goals
                include: Adding and editing notes with photos, emotions,
                locations, and tags. Styling text within notes. Searching notes
                based on tags. CRUD operations for journals and users.
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
              <h2>or</h2>
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
