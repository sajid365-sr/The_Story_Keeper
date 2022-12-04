import React, { useRef } from "react";
import email from "../../../Assets/getTouch/email.png";
import phone from "../../../Assets/getTouch/phone.png";
import UseAnimation from "../../../Hooks/UseAnimation";


const GetTouch = () => {
  const whyRef = useRef();
  const visible = UseAnimation(whyRef);

    const contacts = [
        {
            id:1,
            img:email,
            media:'Email Us',
            address:'info@gmail.com',
            animation:'-translate-x-36 opacity-0',
            
        },
        {
            id:2,
            img:phone,
            media:'Call Us',
            address:'+880 16****65',
            animation:'translate-x-36 opacity-0',
            
        },
    ]

  return (
    <section
      ref={whyRef}
      className={`max-w-screen-xl mb-52 mx-auto ${
        visible
          ? "translate-y-0 transition-all duration-1000 opacity-100"
          : "translate-y-24 opacity-0"
      }`}
    >
      <div className="w-96 text-center mx-auto">
        <p className="text-sky-700 text-base font-bold">HAPPY TO HELP</p>
        <h1 className="text-5xl my-8 text-gray-800 font-bold">
          Have Questions? <br />
          Get in touch!
        </h1>
        <p className="text-gray-600 text-lg">
          Contact our managers for more information
        </p>
      </div>
      <div className="flex lg:flex-row flex-col mt-14 gap-20  justify-between w-10/12 lg:w-[70%] mx-auto">
        
        {
            contacts.map(contact => <div key={contact.id}
                className={`bg-[#6c5f90] text-gray-200 text-2xl px-8 font-semibold py-8 rounded-md w-full ${
                  visible
                    ? "translate-x-0 opacity-100 transition-all duration-1000"
                    : `${contact.animation}`
                }`}
              >
                <img className="w-[60px] mb-8" src={contact.img} alt="" />
                <p>{contact.media}</p>
                <p>{contact.address}</p>
              </div>)
        }
       
      </div>
    </section>
  );
};

export default GetTouch;
