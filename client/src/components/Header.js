import React from "react";
import { Link } from "react-router-dom";

import GoogelAuth from "./GoogleAuth"

const Header = () => {
  return (
    <div className="ui secondary pointing menu">
      <Link to="/" className="item">
        Streamy
      </Link>
      <div className="right menu">
        <Link to="/" className="item">
          All Stream
        </Link>
        <GoogelAuth />
      </div>
    </div>
  );
};

export default Header;
