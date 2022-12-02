
import React, { useRef } from 'react';
import options from '../../../Assets/Services/options.png';
import order from '../../../Assets/Services/order.png';
import shipping from '../../../Assets/Services/free-shipping.png';
import UseAnimation from '../../../Hooks/UseAnimation';
import { HiArrowNarrowRight } from "react-icons/hi";

const Services = () => {
const serviceRef = useRef();
const visible = UseAnimation(serviceRef);

    const services = [
        {
            id:1,
            img:options,
            title:'Endless Options',
            about:'We stock over 200 thousand books available for immediate delivery'

        },
        {
            id:2,
            img:order,
            title:'Super Easy to Order',
            about:'You get to choose from multiple book categories and genres online'

        },
        {
            id:3,
            img:shipping,
            title:'Free Delivery',
            about:'We find the exact book that no other store has and deliver to you for free'

        },
    ]
    return (
        
        <div ref={serviceRef} className={`max-w-screen-xl mx-auto mb-52 ${visible?'translate-y-0 transition-all duration-1000 opacity-100':'translate-y-24 opacity-0'}`}>
            <div className='grid grid-cols-1 lg:grid-cols-3 md:grid-cols-2'>
            {
                services.map(service => <div id={service.id} className="card w-96 pb-8 bg-base-100 shadow-xl mx-auto mb-20 lg:mb-0">
                <figure className="px-10 pt-10">
                  <img className= "w-[80px]"  src={service.img} alt="Shoes" />
                </figure>
                <div className="card-body items-center text-center">
                  <h2 className="card-title text-gray-800 font-bold text-3xl">{service.title}</h2>
                  <p className='text-gray-600 font-medium mt-10'>{service.about}</p>
                  
                </div>
                <p className={`text-gray-600 flex justify-center cursor-pointer hover:text-green-700 items-center gap-3 ${visible?'translate-x-0 opacity-100 transition-all duration-1000':'-translate-x-40 opacity-0'}`}>Read More <HiArrowNarrowRight /></p>
              </div>)
            }
        </div>
        </div>
    );
};

export default Services;