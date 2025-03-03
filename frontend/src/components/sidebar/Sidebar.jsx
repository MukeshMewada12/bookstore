import React from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux"; 
import "./Sidebar.css";

function Sidebar() {
  const { isAuthenticated } = useSelector((state) => state.login); 

  if (!isAuthenticated) {
    return null; 
  }

  return (
    <div className="sidebar">
      <h2>Menu</h2>
      <ul>
        <li>
          <Link to="/">Home</Link>
        </li>
        <li>
          <Link to="/about">About</Link>
        </li>
        <li>
          <Link to="/contactuslist">ContactUs List</Link>
        </li>
        <li>
          <Link to="/logout">Logout</Link>
        </li>
        <li>
          <Link to="/addbook">Add Book</Link>
        </li>
        <li>
          <Link to="/addbookcard">Book List</Link>
        </li>
      </ul>
    </div>
  );
}

export default Sidebar;
