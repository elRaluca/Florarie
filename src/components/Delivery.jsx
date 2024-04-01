import SectionHead from "./SectionHead";
import { Link } from "react-router-dom";
import Image from "../images/delivery.png";

const Delivery = () => {
  return (
    <section className="delivery">
      <SectionHead title="DELIVERY" subtitle="DELIVERY" />
      <div className="container_delivery">
        <div div className="delivery_left">
          <p>
            At Blossom Boutique, we understand the importance of delivering your
            emotions and sentiments with the utmost care and precision. Our
            delivery section is dedicated to ensuring your floral arrangements
            reach their destination in perfect condition, just as you
            envisioned.
          </p>

          <Link to="/catalog" className="btn lg">
            BUY NOW
          </Link>
        </div>

        <div className="delivery_right">
          <img src={Image} alt="delivery car" />
        </div>
      </div>
    </section>
  );
};

export default Delivery;
