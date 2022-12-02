
import React from 'react';
import Banner from './Banner/Banner';
import GetTouch from './GetTouch/GetTouch';
import Services from './Services/Services';


const Home = () => {
    return (
        <div>
            <Banner></Banner>
            <Services></Services>
            <GetTouch></GetTouch>
        </div>
    );
};

export default Home;