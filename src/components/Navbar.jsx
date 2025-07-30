import React from "react";
import Styles from "../styles/Navbar.module.scss";
import { MdHotel } from "react-icons/md";
import { IoHomeSharp } from "react-icons/io5";
import { MdLocalTaxi } from "react-icons/md";
import { GiAirplaneDeparture } from "react-icons/gi";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

export const Navbar = () => {
  const { isAuthenticated, fullName } = useSelector((state) => state.user);

  return (
    <nav className={Styles.nav}>
     <div className={Styles.upper__section}>
  <span
    className={Styles.user__greeting}
    style={{ display: isAuthenticated ? "inline" : "none" }}
  >
    Hi, {fullName}
  </span>
  <Link to="/login" style={{ display: isAuthenticated ? "none" : "inline" }}>
    Login
  </Link>
  <Link to="/register" style={{ display: isAuthenticated ? "none" : "inline" }}>
    Sign up
  </Link>
</div>


      <ul className={Styles.nav__icons}>
        <li>
          <Link to="/">
            <MdHotel size={24} />
            <p>HOTEL</p>
          </Link>
        </li>
        <li>
          <Link to="/villas">
            <IoHomeSharp size={24} />
            <p>VILLA</p>
          </Link>
        </li>
        <li>
          <Link to="/taxis">
            <MdLocalTaxi size={24} />
            <p>TAXI</p>
          </Link>
        </li>
        <li>
          <Link to="/flights">
            <GiAirplaneDeparture size={24} />
            <p>FLIGHTS</p>
          </Link>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
