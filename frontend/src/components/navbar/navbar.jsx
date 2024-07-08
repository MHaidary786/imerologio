import React, { useEffect, useState } from "react";
import classes from "./navbar.module.css";
import { IoIosArrowDropdown, IoIosArrowBack } from "react-icons/io";
import { Link, NavLink, useNavigate } from "react-router-dom";
import logo from "../../assets/imerologio-logo.png";
import { jwtDecode } from "jwt-decode";
import axios from "axios";
import { withRouter } from "react-router-dom";

export default function Navbar({ isEditor }) {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [dropdownVisible, setDropdownVisible] = useState(false);

  const logout = () => {
    localStorage.removeItem("token");
    navigate("/");
    window.location.reload();
  };

  const isLoggedIn = () => {
    const token = localStorage.getItem("token");
    return token !== null;
  };

  const getUserIDfromtoken = () => {
    const token = localStorage.getItem("token");
    if (token) {
      try {
        const decodedToken = jwtDecode(token);
        // console.log(decodedToken.user.userId);
        return decodedToken.user.userId;
      } catch (err) {
        console.error("Invaled Token", err);
        return null;
      }
    }
    return null;
  };

  const getUsers = async () => {
    try {
      const res = await axios.get("http://localhost:8080/user/allusers");
      return res.data;
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    const fetchUser = async () => {
      const userId = getUserIDfromtoken();
      if (userId) {
        const allUsers = await getUsers();
        console.log("allUsers");
        const currentUser = allUsers.find((v) => v._id === userId);
        setUser(currentUser);
      }
    };

    fetchUser();
  }, []);

  const toggleDropdown = () => {
    setDropdownVisible((prevState) => !prevState);
  }

  const goBack = () => {
    navigate("/journals");
  };

  const changeName = () => {
    navigate("/changeName");
  };
  const changepass = () => {
    navigate("/changepassword");
  };

  const getActiveClass = ({ isActive }) =>
    isActive ? classes.active : undefined;

  const handleMenuItemClick = (action) => {
    setDropdownVisible(false); // Hide dropdown after an action is clicked
    switch (action) {
      case "changeName":
        changeName();
        console.log("Change Name clicked");
        break;
      case "changePassword":
        changepass();
        console.log("Change Password clicked");
        break;
      case "logout":
        logout();
        break;
      default:
        break;
    }
  };

  const DropDownMenu = () => (
    <ul className={classes.dropdownMenu}>
      <li onClick={() => handleMenuItemClick("changeName")}>Change Name</li>
      <li onClick={() => handleMenuItemClick("changePassword")}>
        Change Password
      </li>
      <li onClick={() => handleMenuItemClick("logout")}>Logout</li>
    </ul>
  );

  return (
    <div className={classes.container}>
      {/* Navbar component for Normal view */}
      <div className={isEditor ? classes.Hiddenwrapper : classes.wrapper}>
        <NavLink to="/">
          <img className={classes.logo} src={logo} alt="logo" />
        </NavLink>
        <nav className={isLoggedIn() ? classes.navbar : classes.Hiddennavbar}>
          <ul>
            <li>
              <NavLink to="/journals" className={getActiveClass}>
                Journals
              </NavLink>
            </li>
            <li>
              <NavLink to="/calendar" className={getActiveClass}>
                Calendar
              </NavLink>
            </li>
            <li>
              <NavLink to="/search" className={getActiveClass}>
                Search
              </NavLink>
            </li>
            <li>
              <span onClick={toggleDropdown}>
                {user ? "Hello " + user.name + "! " : ""}
              </span>
              <IoIosArrowDropdown
                className={classes.dropdownList}
                onClick={toggleDropdown}
              />
              {dropdownVisible && <DropDownMenu />}
            </li>
          </ul>
        </nav>
      </div>

      {/* Navbar component for Editor */}
      <div className={isEditor ? classes.EditorWrapper : classes.Hiddenwrapper}>
        <div>
          <IoIosArrowBack className={classes.dropdownList} onClick={goBack} />
        </div>
        <Link to="/login">
          <img className={classes.logo} src={logo} alt="logo" />
        </Link>
        <div>
          <span onClick={toggleDropdown}>
            {user ? "Hello " + user.name + "! " : ""}
          </span>
          <IoIosArrowDropdown
            className={classes.dropdownList}
            onClick={toggleDropdown}
          />
          {dropdownVisible && <DropDownMenu />}
        </div>
      </div>
    </div>
  );
}