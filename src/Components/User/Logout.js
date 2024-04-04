import { useContext } from "react";
import React from "react";
import AuthContext from "../../Authentication";
import NotFound from "../Pages/Not Found/NotFound";
import MetaData from "../MetaData";
import { Button, Row, Col } from "reactstrap";
import { useNavigate } from "react-router-dom";
const Logout = () => {
  const navigate = useNavigate();
  const { authenticated, setAuthenticated } = useContext(AuthContext);
  const authTemp = true;
  if (authenticated) {
    localStorage.removeItem("token");
    setAuthenticated(false);
  }

  return (
    <div>
      <MetaData title={"Logout user"} />
      {authTemp ? (
        <Row className="m-0 p-4">
          <Col md="12">
            <h2 className="text-success">Logged Out Succefully!!</h2>
            <h5 className="my-3">
              Go back to{" "}
              <a
                class="nav-link d-inline text-primary"
                href=""
                onClick={(e) => {
                  e.preventDefault();
                  navigate("/");
                }}
              >
                Home Page?
              </a>
            </h5>
          </Col>
        </Row>
      ) : (
        // <div>
        //   Logged out successfully!
        //   <Button
        //     color="primary"
        //     className="me-2"
        //     outline
        //     onClick={() => {
        //       navigate("/");
        //     }}
        //   >
        //     Home
        //   </Button>
        // </div>
        <NotFound />
      )}
    </div>
  );
};

export default Logout;
