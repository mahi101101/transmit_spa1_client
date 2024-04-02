import React, { useState, useRef } from "react";
import { Form, Input, Col, Row, Button, FormGroup } from "reactstrap";
import { useNavigate } from "react-router-dom";
import MetaData from "../MetaData";
import Loader from "../Loader/Loader";
import { FaPhone } from "react-icons/fa";
import { FaUserPen } from "react-icons/fa6";
import {
  BsEnvelopeFill,
  BsEyeSlash,
  BsEye,
  BsFillLockFill,
  BsFillPersonFill,
} from "react-icons/bs";
import { ToastContainer, toast } from "react-toastify";
import { BiWorld } from "react-icons/bi";
import { Country } from "country-state-city";

const SignUp = () => {
  const [showPassword, setShowPass] = useState(false);
  const username = useRef("");
  const password = useRef("");
  const first_name = useRef("");
  const last_name = useRef("");
  const phone_number = useRef("");
  const country = useRef("");
  const email = useRef("");
  const usertype = "user";

  const navigate = useNavigate();

  const registerSubmit = (e) => {
    e.preventDefault();
    const myForm = new FormData();
    myForm.set("username", username.current.value);
    myForm.set("first_name", first_name.current.value);
    myForm.set("last_name", last_name.current.value);
    myForm.set("phone_number", phone_number.current.value);
    myForm.set("country", country.current.value);
    myForm.set("email", email.current.value);
    myForm.set("password", password.current.value);
    myForm.set("usertype", usertype);
    toast.success("Registration Submited", {
      position: "bottom-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
    });

    console.log([...myForm.entries()]);
  };

  const togglePasswordVisibility = (e) => {
    e.preventDefault();
    setShowPass(!showPassword);
  };

  return (
    <React.Fragment>
      <MetaData title={"Registration Form"} />
      <ToastContainer />
      <Row className="f-box justify-content-center m-0">
        <Col md="12" className="text-center pt-5">
          <h3>Registration Form</h3>
        </Col>
        <Col md="6">
          <Form onSubmit={registerSubmit} className="px-5 py-5">
            <FormGroup className="d-flex align-items-center border rounded p-1 position-relative">
              <BsFillPersonFill className="mx-1 ms-2" />
              <Input
                type="text"
                name="firstname"
                placeholder="First Name"
                innerRef={first_name}
                className="border-0"
              />
            </FormGroup>
            <FormGroup className="d-flex align-items-center border rounded p-1 position-relative">
              <BsFillPersonFill className="mx-1 ms-2" />
              <Input
                type="text"
                name="last_name"
                placeholder="Last Name"
                innerRef={last_name}
                className="border-0"
              />
            </FormGroup>
            <FormGroup className="d-flex align-items-center border rounded p-1 position-relative">
              <FaUserPen className="mx-1 ms-2" />
              <Input
                type="text"
                name="username"
                placeholder="Username"
                innerRef={username}
                className="border-0"
              />
            </FormGroup>
            <FormGroup className="d-flex align-items-center border rounded p-1 ">
              <BsEnvelopeFill className="mx-1 ms-2" />
              <Input
                className="border-0"
                type="email"
                name="email"
                placeholder="Email"
                innerRef={email}
              />
            </FormGroup>
            <FormGroup className="d-flex align-items-center border rounded p-1 ">
              <FaPhone className="mx-1 ms-2" />
              <Input
                className="border-0"
                type="text"
                name="phone_number"
                placeholder="Phone Number"
                innerRef={phone_number}
              />
            </FormGroup>
            <FormGroup className="d-flex align-items-center border rounded p-1 position-relative">
              <BsFillLockFill className="mx-1 ms-2" />
              <Input
                placeholder="Password"
                name="password"
                type={showPassword ? "text" : "Password"}
                id="pass"
                innerRef={password}
                className="border-0"
              />
              <button
                onClick={togglePasswordVisibility}
                style={{
                  position: "absolute",
                  top: "45%",
                  right: "18px",
                  transform: "translateY(-50%)",
                  border: "none",
                  background: "none",
                  cursor: "pointer",
                }}
              >
                {showPassword ? <BsEyeSlash /> : <BsEye />}
              </button>
            </FormGroup>
            <FormGroup className="d-flex align-items-center border rounded p-1 position-relative">
              <BiWorld className="mx-1 ms-2" />
              <Input
                id="exampleSelect"
                name="select"
                type="select"
                innerRef={country}
                required
                className="border-0 w-100"
              >
                <option selected disabled>
                  Select Country
                </option>
                {Country.getAllCountries().map((item) => (
                  <option value={item.isoCode} key={item.isoCode}>
                    {item.name}
                  </option>
                ))}
              </Input>
            </FormGroup>

            <Button
              type="submit"
              value="register"
              outline
              color="warning"
              className="w-100"
              // disabled={loading ? true : false}
            >
              Register
            </Button>
          </Form>
        </Col>
      </Row>
    </React.Fragment>
  );
};

export default SignUp;
