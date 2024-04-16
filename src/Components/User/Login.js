import React, { useState, useRef, useContext } from "react";
import AuthContext from "../../Authentication";
import { Form, Input, Col, Row, Button, FormGroup } from "reactstrap";
import { useNavigate } from "react-router-dom";
import validator from "validator";
import MetaData from "../MetaData";
import Loader from "../Loader/Loader";
import { FaUserPen } from "react-icons/fa6";
import { BsEyeSlash, BsEye, BsFillLockFill } from "react-icons/bs";
import { toast } from "react-toastify";
import axios from "axios";
import NotFound from "../Pages/Not Found/NotFound";

const Login = () => {
  const { authenticated, setAuthenticated, setAuthenticatedUser } =
    useContext(AuthContext);
  const [showPassword, setShowPass] = useState(false);
  const username = useRef("");
  const password = useRef("");
  const [isLoding, setLoding] = useState(false);
  const navigate = useNavigate();

  const loginSubmit = (e) => {
    e.preventDefault();

    if (
      !validateUsername(username.current.value) ||
      !validatePassword(password.current.value)
    ) {
      return;
    } else {
      const myForm = new FormData();

      myForm.set("username", username.current.value);
      myForm.set("password", password.current.value);

      const formDataToJson = {};
      for (const [key, value] of myForm.entries()) {
        formDataToJson[key] = value;
      }
      setLoding(true);
      axios
        .post("https://localhost:4001/api/v1/loginuser", formDataToJson)
        .then((Response) => {
          if (Response.data.success) {
            setAuthenticated(true);
            toast.success("Login Successfull", {
              position: "bottom-right",
              autoClose: 5000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
              theme: "light",
            });
            localStorage.setItem("token", JSON.stringify(Response.data.data));
            setTimeout(() => {
              console.log("deleted!!");
              localStorage.removeItem("token");
            }, 2 * 60000);
            axios
              .get(
                "https://hostpc:4001/api/v1/user/details/username/" +
                  username.current.value
              )
              .then((resp) => {
                setAuthenticatedUser(resp.data.data.result);
              });

            setLoding(false);
            navigate("/");
          }
        })
        .catch((error) => {
          console.log(error);
          toast.error("Login Failed, Invaild User or Password", {
            position: "bottom-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
          });
          localStorage.removeItem("token");
        })
        .finally(() => {
          setLoding(false);
        });
    }
  };

  const togglePasswordVisibility = (e) => {
    e.preventDefault();
    setShowPass(!showPassword);
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

  const validatePassword = (value) => {
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

    return true;
  };

  return (
    <React.Fragment>
      <MetaData title={"Registration Form"} />
      {authenticated ? (
        <NotFound />
      ) : (
        <Row className="f-box justify-content-center m-0 mt-4">
          <Col md="6" className="border border-secondary-subtle rounded mb-5">
            <Col md="12" className="text-center p-5">
              <h3>Login</h3>
            </Col>
            <Form onSubmit={loginSubmit} className="px-5 pb-5">
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
              <div className="container">
                <p className="float-start">
                  New user?{" "}
                  <a
                    class="nav-link d-inline text-primary"
                    href=""
                    onClick={(e) => {
                      e.preventDefault();
                      navigate("/signup");
                    }}
                  >
                    SignUp
                  </a>
                </p>
                <p className="float-end">
                  <a
                    class="nav-link d-inline text-primary"
                    href=""
                    onClick={(e) => {
                      e.preventDefault();
                      navigate("/password/forgot");
                    }}
                  >
                    Forgot Password?
                  </a>
                </p>
              </div>
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
    </React.Fragment>
  );
};

export default Login;
