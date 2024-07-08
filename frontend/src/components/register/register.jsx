import React, { useState } from "react";
import classes from "./register.module.css";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import Footer from "../footer/footer";

export default function Register() {
  const [name, setName] = useState("");
  const [lastname, setLastname] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSignUp = async (e) => {
    e.preventDefault();
    const newUser = { name, lastname, email, password };
    console.log(newUser);

    try {
      await axios
        .post("http://localhost:8080/user/register", newUser)
        .then((res) => {
          console.log(res.data);
        });
    } catch (error) {
      console.log(error);
    }

    // Reset the Inputs
    setName("");
    setLastname("");
    setEmail("");
    setPassword("");
    navigate("/login");
  };

  return (
    <>
    <div className={classes.Container}>
      <div className={classes.right}></div>
      <div className={classes.left}>
        <div className={classes.wrapper}>
          <h2 className={classes.signupText}>Sign up</h2>
          <form onSubmit={handleSignUp}>
            <div className={classes.nameWrapper}>
              <div className={classes.inputWrapper}>
                <label htmlFor="email">First Name</label>
                <input
                  type="text"
                  id="name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </div>
              <div className={classes.inputWrapper}>
                <label htmlFor="email">Last Name</label>
                <input
                  type="text"
                  id="lastname"
                  value={lastname}
                  onChange={(e) => setLastname(e.target.value)}
                />
              </div>
            </div>
            <div className={classes.inputWrapper}>
              <label htmlFor="email">Email Address</label>
              <input
                type="text"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className={classes.inputWrapper}>
              <label htmlFor="password">Password</label>
              <input
                type="password"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <p>
                It must be a combination of minimum 8 letters, numbers and
                symbols.
              </p>
            </div>

            <button className={classes.registerBtn} type="submit">Sing up</button>
          </form>

          <hr className={classes.hr} />
          <p>
            Already have an account? <a href="/login">Login</a>
          </p>
        </div>
      </div>
    </div>
    <Footer/>
    </>
  );
}
