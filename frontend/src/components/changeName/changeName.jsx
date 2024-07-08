import React, { useState } from "react";
import classes from "./changeName.module.css";
import logo from "../../assets/imerologio-logo.png";
import {jwtDecode} from "jwt-decode"; // Corrected import
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Footer from "../footer/footer";

export default function ChangeName() {
  const [password, setPassword] = useState("");
  const [newName, setNewName] = useState("");
  const [newLastname, setNewLastname] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  const getToken = () => {
    if (token) {
      const userData = jwtDecode(token);
      return userData;
    } else {
      alert("You are not logged in");
      navigate("/login");
      return null;
    }
  };

  const handleChangePassword = async (e) => {
    e.preventDefault();
    const userData = getToken();
    if (!userData) return;

    const newDetails = {
      password: password,
      newName: newName,
      newLastname: newLastname,
    };

    try {
      const res = await axios.put(
        `http://localhost:8080/user/update/${userData.userId}`,
        newDetails
      );

      if (res.status === 401) {
        setError("Invalid credentials. Please try again.");
      } else {
        setError("Name changed successfully.");
        setTimeout(() => {
          setPassword("");
          setNewName("");
          setNewLastname("");
          navigate("/");
        }, 2000);
      }
    } catch (error) {
      console.log(error);
      setError("An error occurred. Please try again later.");
    }
  };

  const handleCancel = () => {
    setPassword("");
    setNewName("");
    setNewLastname("");
    navigate("/");
  };

  return (
    <>
    <div className={classes.container}>
      <form className={classes.wrapper} onSubmit={handleChangePassword}>
        <img src={logo} alt="Imerologio" />
        <h3 className={classes.username}>{getToken()?.userEmail}</h3>
        <h1 className={classes.h1}>Change your details</h1>
        <div className={classes.inputWrapper}>
          <input
            type="password"
            id="password"
            value={password}
            placeholder="Password"
            onChange={(e) => setPassword(e.target.value)}
            required
            // minLength={8}
          />
          <input
            type="text"
            id="newName"
            value={newName}
            placeholder="New Name"
            onChange={(e) => setNewName(e.target.value)}
            required
          />
          <input
            type="text"
            id="newLastName"
            value={newLastname}
            placeholder="New Last Name"
            onChange={(e) => setNewLastname(e.target.value)}
            required
          />
          {error && (
            <div className={classes.errorMessage}>
              {error}
            </div>
          )}
        </div>
        <div className={classes.btnWrapper}>
          <button className={classes.CHbtn} type="submit">
            Change
          </button>
          <button
            className={classes.CHbtn}
            type="button"
            onClick={handleCancel} // Corrected to call handleCancel
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
    <Footer/>
    </>
  );
}
