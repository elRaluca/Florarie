import React from "react";
import SectionHead from "../../components/SectionHead";
import Footer from "../../components/Footer";
import Image from "../../images/Buchet_info.png";
import "./aboutus.css";

const AboutUs = () => {
  return (
    <section className="about">
      <SectionHead title="ABOUT US" subtitle="ABOUT US" />
      <div className="container_about">
        <div className="BouquetInfo_left">
          <img src={Image} alt="BouquetInfo" />
          <div className="BouquetInfo_text_left">
            <h1>INFO</h1>
            <p>
              Welcome to "Blossom Boutique," where the beauty of nature comes to
              life in every petal! Founded by the passionate Victoria Florescu,
              our flower shop brings an explosion of colors and fragrances to
              the Greenwood community. In the midst of this little floral
              paradise, you'll discover spectacular bouquets and carefully
              crafted floral arrangements, each being an expression of our love
              for nature and art. Whether you're looking for a special bouquet
              to celebrate a significant moment or need elegant floral
              arrangements for a special event, at "Blossom Boutique," you'll
              always find unique and exceptional options. Inside our boutique,
              you'll be greeted by fresh scents and a rich palette of colors.
              Every corner of the store reflects our attention to detail and
              love for each individual flower.
            </p>
          </div>
        </div>
        <div className="BouquetInfo_right">
          <img src={Image} alt="BouquetInfo" />
          <div className="BouquetInfo_text_right">
            <h1>INFO</h1>
            <p>
              Welcome to "Blossom Boutique" where the beauty of nature comes to
              life in every petal! Founded by the passionate Victoria Florescu,
              our flower shop brings an explosion of colors and fragrances to
              the Bucharest community. In the midst of this little floral
              paradise, you'll discover spectacular bouquets and carefully
              crafted floral arrangements, each being an expression of our love
              for nature and art. Whether you're looking for a special bouquet
              to celebrate a significant moment or need elegant floral
              arrangements for a special event, at "Blossom Boutique," you'll
              always find unique and exceptional options.
            </p>
          </div>
        </div>
      </div>
      <Footer />
    </section>
  );
};

export default AboutUs;
