import React, { useState, useRef, useEffect } from "react";
import { Form, Input, Col, Row, Button, FormGroup, Label } from "reactstrap";
import { useNavigate } from "react-router-dom";
import validator from "validator";
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
  const [showCpassword, setShowCpass] = useState(false);
  const [err, setErr] = useState(false);
  const [vaild, setVaild] = useState(false);
  const username = useRef("");
  const password = useRef("");
  const cpassword = useRef("");
  const first_name = useRef("");
  const last_name = useRef("");
  const phone_number = useRef("");
  const country = useRef("");
  const email = useRef("");
  const tc = useRef(false);
  const usertype = "user";

  const navigate = useNavigate();

  useEffect(() => {
    console.log(username.current.value);
  }, [username]);

  const registerSubmit = (e) => {
    e.preventDefault();

    if (
      !validateFirstName(first_name.current.value) ||
      !validateLastName(last_name.current.value) ||
      !validateUsername(username.current.value) ||
      !validateEmail(email.current.value) ||
      !validatePhoneNumber(phone_number.current.value) ||
      !validatePassword(password.current.value, cpassword.current.value) ||
      !validateCountry(country.current.value)
    ) {
      return;
    } else {
      const myForm = new FormData();

      myForm.set("username", username.current.value);
      myForm.set("first_name", first_name.current.value);
      myForm.set("last_name", last_name.current.value);
      myForm.set("phone_number", phone_number.current.value);
      myForm.set("country", country.current.value);
      myForm.set("email", email.current.value);
      myForm.set("password", password.current.value);
      myForm.set("usertype", usertype);
      myForm.set("termsConditions", tc.current.value === "on");

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
    }
  };

  const togglePasswordVisibility = (e) => {
    e.preventDefault();
    setShowPass(!showPassword);
  };

  const toggleCpasswordVisibility = (e) => {
    e.preventDefault();
    setShowCpass(!showCpassword);
  };

  const validateFirstName = (value) => {
    if (!value) {
      toast.error("Please enter your first name", {
        position: "bottom-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
      return false;
    }
    return true;
  };

  const validateLastName = (value) => {
    if (!value) {
      toast.error("Please enter your last name", {
        position: "bottom-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
      return false;
    }
    return true;
  };

  const validateUsername = (value) => {
    if (!value) {
      toast.error("Please enter a username", {
        position: "bottom-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
      return false;
    }
    return true;
  };

  const validateEmail = (value) => {
    if (!value) {
      toast.error("Please enter your email", {
        position: "bottom-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
      return false;
    }
    if (!validator.isEmail(value)) {
      toast.error("Please enter a valid email address", {
        position: "bottom-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
      return false;
    }
    return true;
  };

  const validatePhoneNumber = (value) => {
    if (!value) {
      toast.error("Please enter your phone number", {
        position: "bottom-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
      return false;
    }
    if (!validator.isMobilePhone(value, "any", { strictMode: true })) {
      toast.error("Please enter a valid phone number with country code", {
        position: "bottom-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
      return false;
    }
    return true;
  };

  const validatePassword = (value, cvalue) => {
    if (!value) {
      toast.error("Please enter a password", {
        position: "bottom-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
      return false;
    }

    if (!validator.isStrongPassword(value)) {
      toast.error(
        "Password should be greater than 8 characters, contain a lowercase letter, a uppercase letter and a special character",
        {
          position: "bottom-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        }
      );
      return false;
    }

    if (cvalue != value) {
      toast.error("Password do not match", {
        position: "bottom-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
      return false;
    }

    return true;
  };

  const validateCountry = (value) => {
    if (!value || value === "Select Country") {
      toast.error("Please select your country", {
        position: "bottom-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
      return false;
    }
    return true;
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
              <BsFillLockFill className="mx-1 ms-2" />
              <Input
                placeholder="Confirm Password"
                name="cpassword"
                type={showCpassword ? "text" : "Password"}
                id="cpass"
                innerRef={cpassword}
                className="border-0"
              />
              <button
                onClick={toggleCpasswordVisibility}
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
                {showCpassword ? <BsEyeSlash /> : <BsEye />}
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
            <FormGroup check>
              <Input id="checkbox2" type="checkbox" innerRef={tc} />
              <Label check>Terms & Conditions</Label>
            </FormGroup>
            <Button
              type="submit"
              value="register"
              outline
              color="warning"
              className="w-100"
              // disabled={tc.current.value ? true : false}
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
