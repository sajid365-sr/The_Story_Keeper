import React, { useRef } from "react";
import { FaFacebook, FaTwitter, FaLinkedinIn } from "react-icons/fa";
import { Link } from "react-router-dom";
import UseAnimation from "../../../Hooks/UseAnimation";
import "./Footer.css";

const Footer = () => {
  const footerRef = useRef();
  const visible = UseAnimation(footerRef);
 

  return (
       
       <section className={` ${visible? 'translate-x-0 transition-all duration-1000 opacity-100' : '-translate-x-[20%] opacity-30'}`} ref={footerRef}>
      <footer className="footer footer-center lg:px-10 px-0 py-20 bg-[#291334] text-base-content">
        <div className="grid grid-flow-col gap-4">
          <Link to="/home" className="link text-gray-300 text-base tracking-widest link-hover">
            Home
          </Link>
          <Link to="/" className="link text-gray-300 text-base tracking-widest link-hover">
            Contacts
          </Link>
          <Link to="/" className="link text-gray-300 text-base tracking-widest link-hover">
            About Us
          </Link>
          <Link to="/" className="link text-gray-300 text-base tracking-widest link-hover">
            Privacy Policy
          </Link>
        </div>
        <div>
          <div className={`grid grid-flow-col gap-4 ${visible? 'translate-x-0 transition-all duration-1000':'-translate-x-[30vw]'}`}>
            <a href="https://www.facebook.com/sajid365.sr" target="_self">
              <FaFacebook className="text-2xl text-gray-400 hover:text-white" />
            </a>
            <a href="https://twitter.com/sajid365_sr" target="_self">
              <FaTwitter className="text-2xl text-gray-400 hover:text-white" />
            </a>
            <a href="https://www.linkedin.com/in/sajid365-sr" target="_self">
              <FaLinkedinIn className="text-2xl text-gray-400 hover:text-white" />
            </a>
          </div>
        </div>
        <div>
          <p className="text-gray-400">Copyright © 2022 - All right reserved by The Story Keeper</p>
        </div>
      </footer>
    </section>
       
     
   
  );
};

export default Footer;
