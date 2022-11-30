
import React from 'react';
import { FaFacebook, FaTwitter, FaLinkedinIn } from "react-icons/fa";
import { Link } from 'react-router-dom';

const Footer = () => {
    return (
        <div>
            <footer className="footer footer-center p-10 bg-secondary text-base-content rounded">
  <div className="grid grid-flow-col gap-4">
    <Link to='/shop' className="link link-hover">Shop</Link> 
    <Link to='/blog' className="link link-hover">Blog</Link> 
    <Link to='/' className="link link-hover">About Us</Link> 
    <Link to='/' className="link link-hover">Privacy Policy</Link>
  </div> 
  <div>
    <div className="grid grid-flow-col gap-4">
        <a href="https://www.facebook.com/sajid365.sr" target='_self'><FaFacebook className='text-2xl'/></a>
        <a href="https://twitter.com/sajid365_sr" target='_self'><FaTwitter className='text-2xl'/></a>
        <a href="https://www.linkedin.com/in/sajid365-sr" target='_self'><FaLinkedinIn className='text-2xl'/></a>
     
      
      
    </div>
  </div> 
  <div>
    <p>Copyright © 2022 - All right reserved by The Story Keeper</p>
  </div>
</footer>
        </div>
    );
};

export default Footer;