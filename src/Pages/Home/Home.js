
import React from 'react';
import Banner from './Banner/Banner';
import GetTouch from './GetTouch/GetTouch';
import Services from './Services/Services';
import  PricePlan  from "./PricePlan/PricePlan";

const Home = () => {
    return (
        <div>
            <Banner></Banner>
            <Services></Services>

            <GetTouch></GetTouch>
            <PricePlan></PricePlan>
        </div>
    );
};

export default Home;