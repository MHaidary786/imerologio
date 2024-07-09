import React from "react";
import classes from "./footer.module.css";

export default function footer() {
  return (
    <div className={classes.wrapper}>
      <p className={classes.items}>©2024 IMEROLOGIO. All rights reserved</p>
      <div className={classes.items}>
        <div className={classes.row}>
        <p>Developed by: 
          <a href="https://www.linkedin.com/in/mahdi-haidary-mh313" target="blank">Mahdi Haidary</a>
          <a href="https://www.linkedin.com/in/veneleni/" target="blank">Elein Veniou Nikolidaki</a>
          <a href="https://www.linkedin.com/in/olaonline/" target="blank">Oula Alhaffar</a>
        </p>
        </div>
      </div>
    </div>
  );
}