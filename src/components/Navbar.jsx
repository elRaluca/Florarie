import "./navbar.css";
import Logo from "../images/logo.png";
import { Link, NavLink } from "react-router-dom";
import { GoListUnordered } from "react-icons/go";
import { MdOutlineClose } from "react-icons/md";
import { FaShoppingBasket } from "react-icons/fa";
import { links } from "../data.js";
import { useState } from "react";
import ShoppingCart from "../pages/shoppingcart/ShoppingCart.jsx";
import { useNavigate } from "react-router-dom";

const Navbar = () => {
  const [isNavShowing, setIsNavShowing] = useState(false);
  const userEmail = localStorage.getItem("userEmail");
  const navigate = useNavigate();

  const isUserLoggedIn = () => {
    return !!localStorage.getItem("userToken");
  };

  const isAdmin = () => {
    const userRole = localStorage.getItem("userRole");
    console.log("Current user role:", userRole);
    return userRole === "ROLE_ADMIN";
  };

  let navLinks = links
    .filter((link) => {
      if (link.name === "Sing Up" && isUserLoggedIn()) {
        return false;
      }
      if (link.name === "Add Product" && !isAdmin()) {
        return false;
      }
      if (link.name === "Special Bouquet" && isAdmin()) {
        return false;
      }
      if (link.name === "Contact" && isAdmin()) {
        return false;
      }
      if (link.name === "About Us" && isAdmin()) {
        return false;
      }

      return true;
    })
    .map(({ name, path }, index) => (
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

  navLinks.splice(
    -1,
    0,
    <li key="logo">
      <Link to="home" className="logo">
        <img src={Logo} alt="Nav Logo" />
      </Link>
    </li>
  );

  const handleSignOut = () => {
    localStorage.removeItem("userToken");
    localStorage.removeItem("userEmail");
    localStorage.removeItem("userRole"); // nu uita să elimini și rolul
    navigate("/login");
  };

  if (isUserLoggedIn()) {
    navLinks.push(
      <li key="signOut">
        <button onClick={handleSignOut} className="singOutBt">
          Sign Out
        </button>
      </li>
    );
  }

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
