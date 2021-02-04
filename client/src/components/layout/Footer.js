import React from "react";

//CSS
import "./Footer.css";
const Footer = () => {
  const year = new Date().getFullYear();

  return (
    <div>
      <footer>
        <p>Copyright &copy; {year} Cillin Chiller</p>
      </footer>
    </div>
  );
};

export default Footer;