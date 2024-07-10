import "./home.css";
import MainHeader from "../../components/MainHeader.jsx";
import TopSellingProducts from "../../components/TopSellingProducts.jsx";
import Delivery from "../../components/Delivery.jsx";
import Reviews from "../../components/Reviews";
import Footer from "../../components/Footer";
import React from "react";

const Home = () => {
  return (
    <>
      <MainHeader />
      <TopSellingProducts />
      <Delivery />
      <Reviews />
      <Footer />
    </>
  );
};

export default Home;
