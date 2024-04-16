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
  Label,
  Modal,
  ModalBody,
  ModalFooter,
  ModalHeader,
} from "reactstrap";
import { BsEyeSlash, BsEye, BsFillLockFill } from "react-icons/bs";
import Loader from "../Loader/Loader";
import { FaUserPen } from "react-icons/fa6";
import { MdVerified } from "react-icons/md";
import axios from "axios";

const ForgotPassword = () => {
  const { Authenticated } = useContext(AuthContext);
  const [showPassword, setShowPass] = useState(false);
  const [showCpassword, setShowCpass] = useState(false);
  const [isLoding, setLoding] = useState(false);
  const [isVLoding, setVLoding] = useState(false);
  const [validEmail, setValidEmail] = useState("");
  const [isLoadingModal, setLoadingModal] = useState(false);
  const [modal, setModal] = useState(false);
  const [otp, setOtp] = useState(new Array(6).fill(""));
  const [otpSent, setOtpSent] = useState(false);
  const email = useRef("");
  const npassword = useRef("");
  const cpassword = useRef("");

  const navigate = useNavigate();

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
      setLoding(false);
      return false;
    } else if (!validator.isStrongPassword(value)) {
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
    if (validatePassword(cpassword.current.value)) {
      axios
        .put("https://hostpc:4001/api/v1/user/Password/forgot", {
          email: validEmail,
          password: npassword.current.value,
        })
        .then((resp) => {
          toast.success(resp.data.message + ", Please login now", {
            position: "bottom-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
          });
          navigate("/login");
        })
        .catch((error) => {
          toast.error(error.response.data.message, {
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
  };

  const handleEmailVerification = (e) => {
    e.preventDefault();
    setVLoding(true);
    if (otpSent) {
      toggle();
      setVLoding(false);
    } else {
      if (email.current.value) {
        axios
          .get(
            "https://hostpc:4001/api/v1/user/password/forgot/getsession/" +
              email.current.value
          )
          .then((resp) => {
            setVLoding(true);
            axios
              .get(
                "https://hostpc:4001/api/v1/user/details/email/" +
                  email.current.value
              )
              .then((resp) => {
                // Logic for OTP
                setVLoding(true);
                if (resp.data.success) {
                  sendEmailOtp();
                }
                // toast.success("Username Verified", {
                //   position: "bottom-right",
                //   autoClose: 5000,
                //   hideProgressBar: false,
                //   closeOnClick: true,
                //   pauseOnHover: true,
                //   draggable: true,
                //   progress: undefined,
                //   theme: "light",
                // });
                // setValidEmail(email.current.value);
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
          })
          .catch((error) => {
            toast.error(error.response.data.message, {
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
            setVLoding(false);
          });
      } else {
        toast.error("Please Enter Username", {
          position: "bottom-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
        setVLoding(false);
      }
    }
  };

  const toggle = () => {
    setModal(!modal);
  };

  const sendEmailOtp = () => {
    const body = { email: email.current.value };

    setVLoding(true);

    axios
      .post("https://hostpc:4001/api/v1/sendemail", body)
      .then((Response) => {
        if (Response.data.success) {
          setOtpSent(true);
          toggle();
          toast.success(Response.message, {
            position: "bottom-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
          });
        } else {
          toast.error(Response.message, {
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
      })
      .catch((error) => {
        toast.error("Something went wrong couldnt send OTP", {
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
        setVLoding(false);
      });
  };

  const verifyEmailOtp = () => {
    const body = { email: email.current.value, passcode: otp.join("") };
    setLoadingModal(true);
    axios
      .post("https://hostpc:4001/api/v1/validateemail", body)
      .then((Response) => {
        if (Response.data.message) {
          setOtpSent(false);
          setValidEmail(email.current.value);
          otp.fill("");
          setOtp(otp);
          toggle();
        }
        toast.success(Response.data.message, {
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
      .catch((error) => {
        toast.error(error.response.data.data.message, {
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
        setLoadingModal(false);
      });
  };

  const obscureEmail = (email) => {
    const [localPart, domainPart] = email.split("@");
    const localPartLength = localPart.length;

    const charactersToObscure = Math.max(0, localPartLength - 5);

    const obscuredLocalPart =
      localPart.substring(0, 5) +
      "*".repeat(charactersToObscure) +
      localPart.substring(localPartLength - 5);

    const obscuredEmail = obscuredLocalPart + "@" + domainPart;

    return obscuredEmail;
  };

  const handleOtpChange = (e, index) => {
    if (isNaN(e.target.value)) {
      return false;
    }
    setOtp([
      ...otp.map((data, indx) => (indx === index ? e.target.value : data)),
    ]);
    if (e.target.value && e.target.nextSibling) {
      e.target.nextSibling.focus();
    }
  };

  return (
    <React.Fragment>
      <MetaData title={"Forgot Password"} />
      {Authenticated ? (
        <NotFound />
      ) : (
        <Row className="f-box justify-content-center m-0 mt-4">
          <Col md="6" className="border border-secondary-subtle rounded mb-5">
            <Col md="12" className="text-center p-5">
              <h3>Forgot Password</h3>
            </Col>
            <Form onSubmit={handleSubmit} className="px-5 pb-5">
              <FormGroup className="d-flex align-items-center border rounded p-1 position-relative">
                <div className="d-flex align-items-center w-100">
                  <FaUserPen className="mx-1 ms-2" />
                  {validEmail === "" ? (
                    <Input
                      type="text"
                      name="email"
                      placeholder="Email"
                      innerRef={email}
                      className="border-0"
                    />
                  ) : (
                    <Label for="email" className="ms-2 mt-1 ps-1">
                      {validEmail}
                    </Label>
                  )}
                </div>
                <div>
                  {isVLoding ? (
                    <Loader />
                  ) : validEmail !== "" ? (
                    <MdVerified className="fs-4 text-success" />
                  ) : (
                    <Button
                      className="m-0 rounded-end"
                      outline
                      onClick={handleEmailVerification}
                      type="button"
                    >
                      Verify
                    </Button>
                  )}
                  <Modal isOpen={modal} toggle={toggle} centered>
                    <ModalHeader toggle={toggle}>OTP Verification</ModalHeader>
                    <ModalBody>
                      <span className="d-block text-center">
                        OTP Sent to{" "}
                        {otpSent ? obscureEmail(email.current.value) : ""}
                      </span>
                      <div className="d-flex w-100 align-items-center justify-content-evenly my-3 mt-4">
                        {otp.map((data, i) => {
                          return (
                            <Input
                              type="text"
                              className="d-inline mx-1 text-center"
                              style={{ width: "50px" }}
                              value={data}
                              maxLength={1}
                              onChange={(e) => {
                                handleOtpChange(e, i);
                              }}
                            />
                          );
                        })}
                      </div>
                    </ModalBody>
                    <ModalFooter>
                      {isLoadingModal ? (
                        <Loader />
                      ) : (
                        <Button
                          color="primary"
                          onClick={() => {
                            verifyEmailOtp();
                          }}
                        >
                          Verify
                        </Button>
                      )}
                      <Button color="secondary" onClick={toggle}>
                        Cancel
                      </Button>
                    </ModalFooter>
                  </Modal>
                </div>
              </FormGroup>
              {validEmail !== "" ? (
                <React.Fragment>
                  <FormGroup className="d-flex align-items-center border rounded p-1 position-relative">
                    <BsFillLockFill className="mx-1 ms-2" />
                    <Input
                      placeholder="New Password"
                      name="password"
                      type={showPassword ? "text" : "Password"}
                      id="pass"
                      innerRef={npassword}
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
                          navigate("/login");
                        }}
                      >
                        Login?
                      </a>
                    </p>
                  </div>
                  {isLoding ? (
                    <div>
                      {" "}
                      <Loader />
                    </div>
                  ) : (
                    <div>
                      <Button
                        type="submit"
                        value="submit"
                        outline
                        color={"success"}
                        className="w-100 mt-4"
                      >
                        Submit
                      </Button>
                    </div>
                  )}
                </React.Fragment>
              ) : (
                ""
              )}
            </Form>
          </Col>
        </Row>
      )}
      ;
    </React.Fragment>
  );
};

export default ForgotPassword;
