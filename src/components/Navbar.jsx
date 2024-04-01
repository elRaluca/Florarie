import "./navbar.css";
import Logo from "../images/logo.png";
import { Link, NavLink } from "react-router-dom";
import { GoListUnordered } from "react-icons/go";
import { MdOutlineClose } from "react-icons/md";
import { FaShoppingBasket } from "react-icons/fa";
import { links } from "../data.js";
import { useState } from "react";
import ShoppingCart from "../pages/shoppingcart/ShoppingCart.jsx";

const Navbar = () => {
  const [isNavShowing, setIsNavShowing] = useState(false);

  const navLinks = links.map(({ name, path }, index) => (
    <li key={index}>
      <NavLink
        to={path}
        className={({ isActive }) => (isActive ? "active-nav" : "")}
        onClick={() => setIsNavShowing((prev) => !prev)}
      >
        {name}
      </NavLink>
    </li>
  ));

  // Adaugă Logo între penultimul și ultimul element
  navLinks.splice(
    -1,
    0,
    <li key="logo">
      <Link to="home" className="logo">
        <img src={Logo} alt="Nav Logo" />
      </Link>
    </li>
  );

  return (
    <nav>
      <div className="container_nav">
        <ul className={`nav_links ${isNavShowing ? "show_nav" : "hide_nav"}`}>
          {navLinks}
        </ul>
        <button
          className="nav_toggle-btn"
          onClick={() => setIsNavShowing((prev) => !prev)}
        >
          {isNavShowing ? <MdOutlineClose /> : <GoListUnordered />}
        </button>
        <Link to="/shoppingcart" className="shopping_cart_link">
          <FaShoppingBasket className="shopping_cart" />
        </Link>
      </div>
    </nav>
  );
};

export default Navbar;
