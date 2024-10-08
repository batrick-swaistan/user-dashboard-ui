import React, { useRef, useState } from "react";
import "./Login.scss";
import { Button } from "primereact/button";
import LogIn from "../../../Assets/Authentication/Login/Login-Vector.jpg";
import { Card } from "primereact/card";
import { InputText } from "primereact/inputtext";
import { Password } from "primereact/password";
import { useNavigate } from "react-router-dom";
import EncryptPassword from "../../Utils/EncryptPassword";
import UserApi from "../../Api/UserApi";
import { Toast } from "primereact/toast";

const Login = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const toast = useRef(null);

  const handleLogin = () => {
    const payload = {
      email: email,
      password: EncryptPassword(password),
    };

    UserApi.authenticateUser(payload)
      .then((res) => {
        localStorage.setItem("accessToken", res.data.token);
        localStorage.setItem("userId", res.data.userId);
        toast.current.show({
          severity: "success",
          summary: "Authentication",
          detail: `${res.data.message}`,
          life: 500,
        });
        setTimeout(() => {
          navigate("/dashboard");
        }, 550);
      })
      .catch((err) => {
        console.error(err);
        toast.current.show({
          severity: "error",
          summary: "Authentication",
          detail: `${err.response.data}`,
          life: 500,
        });
      });
  };
  return (
    <div id="login" className="login-container">
      <Toast ref={toast} />
      <div className="login-content">
        <div className="login-card flex flex-column justify-content-center align-items-center">
          <Card className="login-card-content shadow-4">
            <div className="login-up-main-content flex  flex-row gap-2">
              <div className="login-img flex flex-1 ">
                <img src={LogIn} alt="login-up-image"></img>
              </div>
              <div className="login-inp flex flex-column gap-4 flex-1 justify-content-center ">
                <h2>Login!</h2>

                <div className="email-input card flex  flex-column justify-content-center gap-2">
                  <label htmlFor="email">Email</label>

                  <InputText
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    aria-describedby="email-error"
                  />
                </div>

                <div className="card flex  flex-column justify-content-center passowrd-input gap-2">
                  <label htmlFor="passowrd">Password</label>
                  <Password
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    feedback={false}
                    toggleMask={true}
                    className="w-full"
                    aria-describedby="passowrd-error"
                  />
                </div>

                <div className="login-button flex flex-row justify-content-between">
                  <span className="signup flex flex-row gap-2 align-items-center justify-content-center">
                    Join our family?{" "}
                    <span
                      className="signup-button cursor-pointer"
                      onClick={() => {
                        navigate("/");
                      }}
                    >
                      Register
                    </span>{" "}
                  </span>
                  <Button
                    label="Login"
                    icon="pi pi-sign-in"
                    onClick={handleLogin}
                    iconPos="right"
                    className="signup-btn"
                  />
                </div>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Login;
