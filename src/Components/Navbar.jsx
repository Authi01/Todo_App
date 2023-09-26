import React from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
  const menuItems = [
    { text: "Home", link: "/" },
    { text: "Today Pending", link: "/TodayPending" },
    { text: "Pending Tasks", link: "/PendingTask" },
    { text: "Completed Tasks", link: "/CompletedTask" },
  ];

  return (
    <nav className="navbar">
      <div className="navbar-logo"></div>
      <ul className="navbar-links">
        {menuItems.map((item, index) => (
          <li key={index}>
            <Link to={item.link}>{item.text}</Link>
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default Navbar;
