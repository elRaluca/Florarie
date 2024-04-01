import { Link } from "react-router-dom";
import { FaTwitter, FaFacebookF } from "react-icons/fa";
import Logo from "../images/logo.png";
// Asigură-te că adaugi fișierul CSS corespunzător

const Footer = () => {
  return (
    <footer>
      <div className="container footer_container">
        <article>
          <h4>About us</h4>
          <Link to="/aboutus">About</Link>
          <Link to="/contact">Contact</Link>
        </article>
        <article>
          <h4>Bouquets</h4>
          <Link to="/catalog">Catalog</Link>
          <Link to="/specialbouquet">Special Bouquet</Link>
        </article>
        <article>
          <h4>Contact</h4>
          <p>Email:</p>
          <p>
            <a href="mailto:contact@example.com">blossom_boutique@gmail.com</a>
          </p>
          <p>Phone:</p>
          <p>
            <a href="tel:+1234567890">076-754-0136</a>
          </p>
        </article>
        <div className="footer_socials">
          <a
            href="https://facebook.com/"
            target="blank"
            rel="noreferrer noopener"
          >
            <FaFacebookF />
          </a>
          <a
            href="https://twitter.com/"
            target="blank"
            rel="noreferrer noopener"
          >
            <FaTwitter />
          </a>
        </div>
        <article className="footer_right">
          <Link to="/" className="logo_footer">
            <img src={Logo} alt="Footer Logo" />
          </Link>
        </article>
      </div>
    </footer>
  );
};

export default Footer;
