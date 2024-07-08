import React from "react";
import classes from "./NotFound.module.css";
import image from "../../assets/404.jpg";
import Footer from "../footer/footer";

export default function NotFound() {
 
  return (
        <>
    <div className={classes.journalContainer}>
        <img src={image} alt="not found" className={classes.photo} />
        <h1>Mewo Mewo! You have lost your way hooman!</h1>
    </div>
    <Footer/>

      </>
  );
}
