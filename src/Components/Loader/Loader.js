import React from "react";
import { Spinner } from "reactstrap";
const Loader = () => {
  return (
    <div className="text-center m-5 p-5">
      <Spinner>Loading...</Spinner>
    </div>
  );
};

export default Loader;