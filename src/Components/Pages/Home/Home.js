import React, { useContext, useEffect } from "react";
import { Row, Col } from "reactstrap";
import MetaData from "../../MetaData";
import AuthContext from "../../../Authentication";
import { useNavigate } from "react-router-dom";

export const Home = () => {
  const { authenticated, setAuthenticated, authenticatedUser } =
    useContext(AuthContext);
  const navigate = useNavigate();
  const user = authenticatedUser;
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
          {authenticated && user.identity_providers[0].source != "Google" ? (
            <a
              class="nav-link d-inline text-primary"
              href=""
              onClick={(e) => {
                e.preventDefault();
                navigate("/password/reset");
              }}
            >
              Reset Password?
            </a>
          ) : (
            ""
          )}
        </Col>
      </Row>
    </React.Fragment>
  );
};
