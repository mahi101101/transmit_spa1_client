import React, { useEffect, useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink,
  NavbarText,
  Button,
} from "reactstrap";
import AuthContext from "../../../Authentication";

export const Header = () => {
  const navigate = useNavigate();
  const { authenticated, setAuthenticated } = useContext(AuthContext);

  const [isOpen, setIsOpen] = useState(false);

  const toggle = () => setIsOpen(!isOpen);

  return (
    <div>
      <Navbar expand="md" light color="light" className="border-bottom border-2">
        <NavbarBrand href="/">Trasmit SPA</NavbarBrand>
        <NavbarToggler onClick={toggle} />
        <Collapse isOpen={isOpen} navbar>
          <Nav className="me-auto" navbar>
            {authenticated ? (
              <NavItem>
                <NavLink tag={Link} to="/user/profile">
                  Profile
                </NavLink>
              </NavItem>
            ) : (
              ""
            )}
          </Nav>
          <NavbarText>
            {authenticated ? (
              <Button
                color="primary"
                className="me-2"
                outline
                onClick={() => {
                  navigate("/logout");
                }}
              >
                Logout
              </Button>
            ) : (
              <div>
                <Button
                  color="primary"
                  className="me-2"
                  outline
                  onClick={() => {
                    navigate("/login");
                  }}
                >
                  Login
                </Button>
                <Button
                  outline
                  color="primary"
                  onClick={() => {
                    navigate("/signup");
                  }}
                >
                  Signup
                </Button>
              </div>
            )}
          </NavbarText>
        </Collapse>
      </Navbar>
    </div>
  );
};
