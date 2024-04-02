import React from "react";
import { Button } from "reactstrap";
import { IoWarning } from "react-icons/io5";
import { useNavigate } from "react-router-dom";

const NotFound = () => {
  const navigate = useNavigate();
  return (
    <div
      className="container d-grid align-items-center justify-content-center"
      style={{ height: "85vh" }}
    >
      <div className="text-center">
        <IoWarning className="text-danger fs-1 my-2" />
        <h2 className="p-2">Page not found</h2>
        <Button className="" onClick={() => navigate("/")} outline>
        Home
        </Button>
      </div>
    </div>
  );
};

export default NotFound;
