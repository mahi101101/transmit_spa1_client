import React from "react";
import { Spinner } from "reactstrap";
const Loader = () => {
  return (
    <div className="text-center p-3">
      <Spinner>Loading...</Spinner>
    </div>
  );
};

export default Loader;