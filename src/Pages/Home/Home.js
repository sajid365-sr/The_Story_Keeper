import React from "react";
import Banner from "./Banner/Banner";
import GetTouch from "./GetTouch/GetTouch";
import Services from "./Services/Services";
import PricePlan from "./PricePlan/PricePlan";
import GetBooks from "./GetBooks/GetBooks";

const Home = () => {
  return (
    <div>
      <Banner></Banner>
      <Services></Services>
      <GetBooks></GetBooks>
      <GetTouch></GetTouch>
      <PricePlan></PricePlan>
    </div>
  );
};

export default Home;
