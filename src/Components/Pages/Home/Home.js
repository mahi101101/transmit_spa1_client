import React, { useContext } from "react";
import { Row, Col } from "reactstrap";
import MetaData from "../../MetaData";
import AuthContext from "../../../Authentication";

export const Home = () => {
  const { authenticated, setAuthenticated } = useContext(AuthContext);
  return (
    <React.Fragment>
      <MetaData title={"Home"} />
      <Row className="m-0 ">
        <Col md="12" className="py-4">
          <h2>Home Page</h2>
        </Col>
        <Col md="12" className="py-4">
          <h4>
            User Authentication status :{" "}
            {authenticated ? (
              <span className="text-success">Authenticated</span>
            ) : (
              <span className="text-danger">Not Authenticated</span>
            )}
          </h4>
        </Col>
      </Row>
    </React.Fragment>
  );
};
