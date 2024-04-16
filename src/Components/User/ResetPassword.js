import React, { useContext, useState, useRef } from "react";
import AuthContext from "../../Authentication";
import NotFound from "../Pages/Not Found/NotFound";
import { toast } from "react-toastify";
import validator from "validator";
import { useNavigate } from "react-router-dom";
import MetaData from "../MetaData";
import {
  Form,
  Input,
  Col,
  Row,
  Button,
  FormGroup,
  UncontrolledTooltip,
} from "reactstrap";
import { BsEyeSlash, BsEye, BsFillLockFill } from "react-icons/bs";
import Loader from "../Loader/Loader";
import axios from "axios";

const ResetPassword = () => {
  const { authenticated, authenticatedUser } = useContext(AuthContext);
  const [showOpassword, setShowOpass] = useState(false);
  const [showPassword, setShowPass] = useState(false);
  const [showCpassword, setShowCpass] = useState(false);
  const [isLoding, setLoding] = useState(false);

  const opassword = useRef("");
  const password = useRef("");
  const cpassword = useRef("");

  const navigate = useNavigate();

  const validatePassword = (value) => {
    if (!value) {
      setLoding(false);
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
      setLoding(false);
      return false;
    }

    return true;
  };

  const toggleOpasswordVisibility = (e) => {
    e.preventDefault();
    setShowOpass(!showOpassword);
  };

  const togglePasswordVisibility = (e) => {
    e.preventDefault();
    setShowPass(!showPassword);
  };

  const toggleCpasswordVisibility = (e) => {
    e.preventDefault();
    setShowCpass(!showCpassword);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoding(true);
    if (password.current.value === cpassword.current.value) {
      if (validatePassword(password.current.value)) {
        axios
          .post("https://hostpc:4001/api/v1/user/password/reset", {
            username: authenticatedUser.username,
            password: opassword.current.value,
            new_password: password.current.value,
          })
          .then((resp) => {
            toast.success(resp.data.message, {
              position: "bottom-right",
              autoClose: 5000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
              theme: "light",
            });
            navigate("/");
          })
          .catch((err) => {
            toast.error(err.response.data.message, {
              position: "bottom-right",
              autoClose: 5000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
              theme: "light",
            });
          })
          .finally(() => {
            setLoding(false);
          });
      }
    } else {
      setLoding(false);
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
    }
  };

  return (
    <React.Fragment>
      <MetaData title={"Forgot Password"} />
      {!authenticated ? (
        <NotFound />
      ) : (
        <Row className="f-box justify-content-center m-0 mt-4">
          <Col md="6" className="border border-secondary-subtle rounded mb-5">
            <Col md="12" className="text-center p-5">
              <h3>Forgot Password</h3>
            </Col>
            <Form onSubmit={handleSubmit} className="px-5 pb-5">
              <FormGroup className="d-flex align-items-center border rounded p-1 position-relative">
                <BsFillLockFill className="mx-1 ms-2" />
                <Input
                  placeholder="Old Password"
                  name="password"
                  type={showOpassword ? "text" : "Password"}
                  id="opass"
                  innerRef={opassword}
                  className="border-0"
                />
                <button
                  onClick={toggleOpasswordVisibility}
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
                  {showOpassword ? <BsEyeSlash /> : <BsEye />}
                </button>
              </FormGroup>
              <FormGroup className="d-flex align-items-center border rounded p-1 position-relative">
                <BsFillLockFill className="mx-1 ms-2" />
                <Input
                  placeholder="New Password"
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
                <UncontrolledTooltip placement="right" target="pass">
                  Password must have atleast 8 characters, a lowercase letter,
                  an uppercase letter and a special character.
                </UncontrolledTooltip>
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

              {isLoding ? (
                <Loader />
              ) : (
                <Button
                  type="submit"
                  value="submit"
                  outline
                  color={"success"}
                  className="w-100 mt-4"
                >
                  Submit
                </Button>
              )}
            </Form>
          </Col>
        </Row>
      )}
      ;
    </React.Fragment>
  );
};

export default ResetPassword;
