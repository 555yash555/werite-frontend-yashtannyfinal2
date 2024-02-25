// ContactUs.js
import React from "react";
import "./contactUs.css";

const ContactUs = () => {
  return (
    <div className="contact-us-wrapper">
      <h1 className="h1heading">Write To Us</h1>
      <div className="contact-us-container">
        <div className="company-info">
          <h2>WERITE - A Product of Valtorous Tech Private Limited</h2>
          <p><span className="title"><u>Email:</u></span><br></br> werite.in@gmail.com</p>
          <p><span className="title"><u>Phone:</u></span><br></br> +917892464110</p>
          <p><span className="title"><u>Address:</u></span><br></br> H. No 22GF NEW MLA QTRS JAWAHAR, Shastri Nagar (Bhopal), Madhya Pradesh, India, 462003</p>
          <hr></hr>
          <p><span className="title"><u>Who are We:</u></span><br></br> Werite is an organized discussion platform where random people can connect with their ideal discussion partner to exchange their ideas freely using innovative pool technology & build communities of like-minded people.</p>
          <hr></hr>
          <p><span className="title"><u>Mission:</u></span><br></br> Our mission is to revolutionize the social media landscape by providing an unparalleled user experience, connecting individuals and businesses globally. We would be constantly working on improving our existing features and add new features to create a positive community to express oneself freely according to nations laws. With a relentless pursuit of excellence, we will shape the future of social media, providing a dynamic and meaningful space for individuals and businesses to thrive.</p>
        </div>
      </div>
    </div>
  );
};

export default ContactUs;