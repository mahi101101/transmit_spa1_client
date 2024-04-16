import React, { useState, useRef, useContext } from "react";
import {
  Form,
  Input,
  Col,
  Row,
  Button,
  FormGroup,
  Label,
  UncontrolledTooltip,
  Modal,
  ModalBody,
  ModalFooter,
  ModalHeader,
} from "reactstrap";
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
import { MdVerified } from "react-icons/md";
import { toast } from "react-toastify";
import { BiWorld } from "react-icons/bi";
import { Country } from "country-state-city";
import axios from "axios";
import AuthContext from "../../Authentication";
import NotFound from "../Pages/Not Found/NotFound";

const SignUp = () => {
  const { authenticated, setAuthenticated } = useContext(AuthContext);
  const [finalEmail, setFinalEmail] = useState("");
  const [emailVerified, setEmailVerified] = useState(false);
  const [showPassword, setShowPass] = useState(false);
  const [showCpassword, setShowCpass] = useState(false);
  const [otpSent, setOtpSent] = useState(false);
  const username = useRef("");
  const password = useRef("");
  const cpassword = useRef("");
  const first_name = useRef("");
  const last_name = useRef("");
  const phone_number = useRef("");
  const country = useRef("");
  const email = useRef("");
  const [tc, setTc] = useState(false);
  const [isLoading, setLoading] = useState(false);
  const [isLoadingForm, setLoadingForm] = useState(false);
  const [isLoadingModal, setLoadingModal] = useState(false);
  const [modal, setModal] = useState(false);
  const [otp, setOtp] = useState(new Array(6).fill(""));
  const [modalTc, setModalTc] = useState(false);

  const navigate = useNavigate();

  const toggleTc = () => {
    setModalTc(!modalTc);
  };

  const toggle = () => {
    setModal(!modal);
  };

  const handleEmailVerification = (e) => {
    e.preventDefault();
    if (validateEmail(email.current.value)) {
      setLoading(true);
      axios
        .get(
          `https://hostpc:4001/api/v1/user/details/email/${email.current.value}`
        )
        .then((Response) => {
          if (Response.data.success) {
            toast.error("User Exists with the email, try using another email", {
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
          // console.log(error);

          if (error.response && !error.response.data.success) {
            axios
              .get(
                `https://hostpc:4001/api/v1/registeruser/getregsession/${email.current.value}`
              )
              .then((Response) => {
                if (Response.data.success) {
                  sendEmailOtp();
                }
              })
              .catch((err) => {
                if (otpSent) {
                  toggle();
                } else {
                  toast.error(
                    "User with this email is having an active session somewhere else, please try again later",
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
                }
              });
          } else {
            toast.error("Something went wrong", {
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
        .finally(() => {
          setLoading(false);
        });
    }
  };

  const sendEmailOtp = () => {
    const body = { email: email.current.value };

    setLoading(true);

    axios
      .post("https://hostpc:4001/api/v1/sendemail", body)
      .then((Response) => {
        console.log(Response);
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
        console.error(error.response);
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
        setLoading(false);
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
          setEmailVerified(true);
          setFinalEmail(email.current.value);
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

  const registerSubmit = (e) => {
    e.preventDefault();
    if (emailVerified) {
      if (
        !validateFirstName(first_name.current.value) ||
        !validateLastName(last_name.current.value) ||
        !validateUsername(username.current.value) ||
        !validateEmail(finalEmail) ||
        !validatePhoneNumber(phone_number.current.value) ||
        !validatePassword(password.current.value, cpassword.current.value) ||
        !validateCountry(country.current.value)
      ) {
        return;
      } else {
        setLoadingForm(true);
        const name = {
          first_name: first_name.current.value,
          last_name: last_name.current.value,
        };
        const address = {
          country: country.current.value,
        };
        const credentials = {
          password: password.current.value,
        };
        const custom_data = { termsAndConditions: tc };

        const userDetails = {
          username: username.current.value,
          name: name,
          phone_number: phone_number.current.value,
          address: address,
          email: finalEmail,
          credentials: credentials,
          custom_data: custom_data,
        };

        axios
          .post("https://hostpc:4001/api/v1/registeruser", userDetails)
          .then((Response) => {
            loginSubmit();
            toast.success("User Created, Logging you in...", {
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
            setLoadingForm(false);
          });
      }
    }
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

    if (cvalue !== value) {
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

  const loginSubmit = () => {
    {
      const myForm = new FormData();

      myForm.set("username", username.current.value);
      myForm.set("password", password.current.value);

      const formDataToJson = {};
      for (const [key, value] of myForm.entries()) {
        formDataToJson[key] = value;
      }
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
            localStorage.setItem(
              "token",
              JSON.stringify(Response.data.access_token)
            );
            setLoadingForm(false);
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
          setLoadingForm(false);
        });
    }
  };

  return (
    <React.Fragment>
      <MetaData title={"Registration Form"} />
      {authenticated ? (
        <NotFound />
      ) : (
        <Row className="f-box justify-content-center m-0 mt-4 ">
          <Col md="6" className="border border-secondary-subtle rounded mb-5">
            <Col md="12" className="text-center p-5">
              <h3>Registration Form</h3>
            </Col>
            <Form onSubmit={registerSubmit} className="px-5 pb-5">
              <FormGroup className="d-flex align-items-center border rounded p-1 ">
                <div className="d-flex align-items-center justify-content-between w-100">
                  <div className="d-flex align-items-center w-100">
                    <BsEnvelopeFill className="mx-1 ms-2" />
                    {emailVerified ? (
                      <Label for="email" className="ms-2 mt-1 ps-1">
                        {finalEmail}
                      </Label>
                    ) : (
                      <Input
                        className="border-0"
                        type="email"
                        name="email"
                        placeholder="Email"
                        innerRef={email}
                      />
                    )}
                  </div>
                  <div>
                    {isLoading ? (
                      <Loader />
                    ) : emailVerified ? (
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
                  </div>
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
              {emailVerified ? (
                <>
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
                    <UncontrolledTooltip placement="right" target="pass">
                      Password must have atleast 8 characters, a lowercase
                      letter, an uppercase letter and a special character.
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
                  <FormGroup check className="ms-2 pt-2">
                    <Input
                      id="check"
                      type="checkbox"
                      onChange={() => {
                        setTc(!tc);
                      }}
                    />
                    <Label check for="check">
                      <a
                        class="nav-link d-inline text-primary"
                        href=""
                        onClick={(e) => {
                          e.preventDefault();
                          toggleTc();
                        }}
                      >
                        Terms & Conditions
                      </a>
                      <Modal isOpen={modalTc} toggle={toggleTc} centered>
                        <ModalHeader toggle={toggleTc}>
                          Terms And Conditions
                        </ModalHeader>
                        <ModalBody>
                          Lorem ipsum dolor sit amet, consectetur adipisicing
                          elit, sed do eiusmod tempor incididunt ut labore et
                          dolore magna aliqua. Ut enim ad minim veniam, quis
                          nostrud exercitation ullamco laboris nisi ut aliquip
                          ex ea commodo consequat. Duis aute irure dolor in
                          reprehenderit in voluptate velit esse cillum dolore eu
                          fugiat nulla pariatur. Excepteur sint occaecat
                          cupidatat non proident, sunt in culpa qui officia
                          deserunt mollit anim id est laborum.
                        </ModalBody>
                        <ModalFooter>
                          {/* <Button color="primary" onClick={handleAcceptTc}>
                              Accept?
                            </Button> */}
                          <Button color="secondary" onClick={toggleTc}>
                            Close
                          </Button>
                        </ModalFooter>
                      </Modal>
                    </Label>
                  </FormGroup>
                </>
              ) : (
                ""
              )}
              {emailVerified ? (
                isLoadingForm ? (
                  <Loader />
                ) : (
                  <Button
                    type="submit"
                    value="register"
                    outline
                    color={tc ? "warning" : "secondary"}
                    className="w-100 mt-4"
                    disabled={!tc}
                  >
                    Register
                  </Button>
                )
              ) : (
                ""
              )}
            </Form>
          </Col>
        </Row>
      )}
    </React.Fragment>
  );
};

export default SignUp;
