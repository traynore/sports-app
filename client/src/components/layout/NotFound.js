import React from "react";
import { Link } from "react-router-dom";

const NotFound = () => {
  const year = new Date().getFullYear();

  return (
    <div className="container">
      <div className="row">
        <Link className="btn-reg mb-5 mt-5" to="/">
          Go Back to Home page
        </Link>
        <div className="col-md-12">
          <h1 className="display-2 mb-5">Error 404 Page Not Found</h1>
        </div>
      </div>
    </div>
  );
};

export default NotFound;
