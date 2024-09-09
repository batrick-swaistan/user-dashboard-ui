import React, { useState } from "react";
import "./Signup.scss";
import { Card } from "primereact/card";
import SignupImg from "../../../Assets/Authentication/Signup/Signup-Vector.jpg";
import TwoFact from "../../../Assets/Authentication/Signup/Two-Fact.png";
import { InputText } from "primereact/inputtext";
import { Password } from "primereact/password";
import { Button } from "primereact/button";
import { useNavigate } from "react-router-dom";
import EncryptPassword from "../../Utils/EncryptPassword";
import { InputOtp } from "primereact/inputotp";
import UserApi from "../../Api/UserApi";

const Signup = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errors, setErrors] = useState("");
  const [activeindex, setActiveIndex] = useState(0);
  const [otp, setOtp] = useState();
  const navigate = useNavigate();

  const validate = () => {
    let tempErrors = {};

    if (!firstName) {
      tempErrors.firstName = "First Name is Required";
    } else if (!/^[a-zA-Z\s]+$/.test(firstName)) {
      tempErrors.firstName = "Must only contain alphabetic characters";
    }
    if (!lastName) {
      tempErrors.lastName = "Last Name is Required";
    } else if (!/^[a-zA-Z\s]+$/.test(lastName)) {
      tempErrors.lastName = "Must only contain alphabetic characters";
    }
    if (!email) {
      tempErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      tempErrors.email = "Email is Invalid";
    }
    if (!password) {
      tempErrors.password = "Password is Required";
    } else if (password.length < 6) {
      tempErrors.password = "Password must be at least 6 characters long";
    } else if (!/[a-z]/.test(password)) {
      tempErrors.password =
        "Password should have at least one lowercase letter";
    } else if (!/[A-Z]/.test(password)) {
      tempErrors.password =
        "Password should have at least one uppercase letter";
    } else if (!/[0-9]/.test(password)) {
      tempErrors.password = "Password should have at least one numerical value";
    } else if (!/[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]/.test(password)) {
      tempErrors.password =
        "Password should have at least one special character";
    }
    if (!confirmPassword) {
      tempErrors.confirmPassword = "Confirm Password is Required";
    } else if (password !== confirmPassword) {
      tempErrors.confirmPassword = "Passwords do not match";
    }

    setErrors(tempErrors);
    return Object.keys(tempErrors).length === 0;
  };

  const handleSignUp = () => {
    if (validate()) {
      const payload = {
        firstName: firstName,
        lastName: lastName,
        email: email,
        password: EncryptPassword(confirmPassword),
      };

      console.log(payload);

      UserApi.registerUser(payload)
        .then((res) => {
          console.log(res.data);
          setActiveIndex(1);
        })

        .catch((err) => {
          console.error(err.message);
        });
    }
  };

  const handleVerifyAccount = () => {
    const payload = {
      email: email,
      otp: otp,
    };

    UserApi.verifyUser(payload)
      .then((res) => {
        console.log(res.data);
        localStorage.setItem("accessToken", res.data.token);
        localStorage.setItem("userId", res.data.userId)
        navigate("/dashboard");
      })
      .catch((err) => {
        console.error(err.message);
      });
  };

  return (
    <div id="signup" className="signup-container">
      <div className="signup-content">
        <div className="signup-card flex flex-column justify-content-center align-items-center">
          <Card className="signup-card-content shadow-4">
            {activeindex === 0 && (
              <div className="sign-up-main-content flex  flex-row gap-2">
                <div className="signup-img flex flex-1 ">
                  <img src={SignupImg} alt="sign-iup-image"></img>
                </div>
                <div className="signup-inp flex flex-column gap-4 flex-1 justify-content-center ">
                  <h2>Signup!</h2>

                  <div className="user-name flex flex-row justify-content-between gap-3">
                    <div className="firstname-input card flex flex-column  justify-content-center gap-2 flex-1">
                      <label htmlFor="firstname">First Name</label>
                      <InputText
                        value={firstName}
                        onChange={(e) => setFirstName(e.target.value)}
                        aria-describedby="firstname-error"
                      />

                      {errors.firstName && (
                        <small className="p-error" id="firstname-error">
                          {errors.firstName}
                        </small>
                      )}
                    </div>

                    <div className="lastname-input card flex flex-column justify-content-center gap-2 flex-1">
                      <label htmlFor="lastname">Last Name</label>

                      <InputText
                        value={lastName}
                        onChange={(e) => setLastName(e.target.value)}
                        aria-describedby="lastname-error"
                      />
                      {errors.lastName && (
                        <small className="p-error" id="lastname-error">
                          {errors.lastName}
                        </small>
                      )}
                    </div>
                  </div>

                  <div className="email-input card flex  flex-column justify-content-center gap-2">
                    <label htmlFor="email">Email</label>

                    <InputText
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      aria-describedby="email-error"
                    />

                    {errors.email && (
                      <small className="p-error" id="email-error">
                        {errors.email}
                      </small>
                    )}
                  </div>

                  <div className="card flex  flex-column justify-content-center passowrd-input gap-2">
                    <label htmlFor="passowrd">Passowrd</label>
                    <Password
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      feedback={false}
                      toggleMask={true}
                      className="w-full"
                      aria-describedby="passowrd-error"
                    />
                    {errors.password && (
                      <small className="p-error" id="passowrd-error">
                        {errors.password}
                      </small>
                    )}
                  </div>

                  <div className="card flex  flex-column justify-content-center confirm-passowrd-input gap-2">
                    <label htmlFor="confirm-passowrd">Confirm Password</label>
                    <Password
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                      feedback={false}
                      toggleMask={true}
                      className="w-full"
                      aria-describedby="confirmPassword-error"
                    />
                    {errors.confirmPassword && (
                      <small className="p-error" id="confirmPassword-error">
                        {errors.confirmPassword}
                      </small>
                    )}
                  </div>

                  <div className="register-button flex flex-row justify-content-between">
                    <span className="login flex flex-row gap-2 align-items-center justify-content-center">
                      Already a user?{" "}
                      <span
                        className="login-button cursor-pointer"
                        onClick={() => {
                          navigate("/login");
                        }}
                      >
                        Login
                      </span>{" "}
                    </span>
                    <Button
                      label="Signup"
                      icon="pi pi-sign-in"
                      onClick={handleSignUp}
                      iconPos="right"
                      className="signup-btn"
                    />
                  </div>
                </div>
              </div>
            )}

            {activeindex === 1 && (
              <div className="sign-up-main-content flex  flex-row gap-2">
                <div className="signup-img flex flex-1 ">
                  <img src={TwoFact} alt="sign-iup-image"></img>
                </div>
                <div className="signup-inp flex flex-column gap-4 flex-1 justify-content-center align-items-center">
                  <h2>Verify OTP</h2>

                  <div className="email-input card flex  flex-column justify-content-center gap-5">
                    <span className="otp-sub">
                      Enter the OTP recieved at {email}
                    </span>

                    <div className="card flex justify-content-center">
                      <InputOtp
                        value={otp}
                        onChange={(e) => setOtp(e.value)}
                        length={6}
                      />
                    </div>
                  </div>

                  <div className="register-button flex flex-row justify-content-end">
                    <Button
                      label="Verify"
                      icon="pi pi-check-circle"
                      onClick={handleVerifyAccount}
                      iconPos="right"
                      className="signup-btn"
                    />
                  </div>
                </div>
              </div>
            )}
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Signup;
