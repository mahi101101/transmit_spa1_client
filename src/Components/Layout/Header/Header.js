import React, { useState } from "react";
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

export const Header = ({authenticated}) => {
  alert(authenticated)
  const navigate = useNavigate();

  const [isOpen, setIsOpen] = useState(false);

  const toggle = () => setIsOpen(!isOpen);

  return (
    <div>
      <Navbar expand="md" dark color="dark">
        <NavbarBrand href="/">Trasmit SPA</NavbarBrand>
        <NavbarToggler onClick={toggle} />
        <Collapse isOpen={isOpen} navbar>
          <Nav className="me-auto" navbar>
            <NavItem>
              <NavLink tag={Link} to="/user/profile">
                Profile
              </NavLink>
            </NavItem>
          </Nav>
          <NavbarText>
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
          </NavbarText>
        </Collapse>
      </Navbar>
    </div>
  );
};
