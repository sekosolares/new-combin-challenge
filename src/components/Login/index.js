import React from "react";
import './Login.css';

function Login({ setToken }) {
      const [username, setUsername] = React.useState('');
      const [passwd, setPasswd] = React.useState('');
      const API = "http://localhost:8081/auth";

      const onUsernameChange = (event) => {
            setUsername(event.target.value);
      };

      const onPasswdChange = (event) => {
            setPasswd(event.target.value);
      };

      const logIn = async (api, data) => {
            const resp = await fetch(api, {
                  method: 'POST',
                  headers: {
                        'Content-Type': 'application/json',
                        'Accept': '*/*'
                  },
                  body: JSON.stringify(data)
            });

            return resp.json();
      };

      const onSubmitHandler = async (event) => {
            event.preventDefault();
            const loginData = {
                  username: username,
                  password: passwd
            };
            let data = await logIn(API, loginData);
            console.log(data);
            setToken(data.token);
            sessionStorage.setItem('token', data.token);
      };

      return (
            <div className="Login">
                  <form method="post" onSubmit={onSubmitHandler}>
                        <div className="Login__Element">
                              <h3>LOGIN</h3>
                        </div>
                        <div className="Login__Element">
                              <label htmlFor="username">Username</label>
                              <input type="text" name="username" id="username" onChange={onUsernameChange}  placeholder="Username"/>

                              <label htmlFor="password">Password</label>
                              <input type="password" name="password" id="password" onChange={onPasswdChange} placeholder="Password"/>
                        </div>
                        <div className="Login__Element">
                              <input type="submit" value="LOGIN"/>
                        </div>
                  </form>
            </div>
      )
}


export { Login };