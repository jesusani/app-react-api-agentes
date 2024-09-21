import React, { useState } from "react";
import {
  Form,
  useActionData,
  useLocation,
  useNavigation,
} from "react-router-dom";

export default function Login() {
  let location = useLocation();
  let params = new URLSearchParams(location.search);
  let from = params.get("from") || "/";

  const [token, setToken] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");

  let navigation = useNavigation();

  let isLoggingIn = navigation.formData?.get("username") != null;

  let actionData = useActionData() as { error: string } | undefined;

  const clickLogin = (e) => {
    e.preventDefault();
    fetch('http://localhost:3001/api/v1/auth/login', {
      method: 'POST',
      headers: {
        'content-type': 'application/json;charset=UTF-8',
      },
      body: JSON.stringify({
        'username': username,
        'password': password
      }),
    }).then((response) => response.json())
      .then((result) => {
        if (result.token) {
          setToken(result.token);
          alert('You are logged in.');
         this.goToMain();
        } else {
          alert('Please check your login information.');
        }
      });
  }




  function changeUsername(e) {};

  function changePassword(e) {};

  return (
    <div>
      <p>You must log in to view the page at {from}</p>

   {/*    <Form method="post" replace>
        <input type="hidden" name="redirectTo" value={from} />
        <label>
          Username: <input name="username" />
        </label>{" "}
        <label>
          password: <input name="password" />
        </label>{" "}
        <button type="submit" disabled={isLoggingIn}>
          {isLoggingIn ? "Logging in..." : "Login"}
        </button>
        {actionData && actionData.error ? (
          <p style={{ color: "red" }}>{actionData.error}</p>
        ) : null}
      </Form> */}


      <form className='login-form' >
        <input
          className='login-info'
          onChange= {(e)=> {setUsername(e.target.value)}}
          id='username'
          name="username"
          type='text'
          placeholder='Phone number, username or email'
        />
        <input
          className='login-info'
          onChange= {(e)=>{setPassword(e.target.value)}}
          id='password'
          type='password'
          placeholder="Password" />
        <button
          className='login-button'
       //   disabled={this.enableLoginButton()}
        //  id={this.changeLoginButtonStyle()}
          type='submit'
          onClick={clickLogin}>
          Login
        </button>
        <p>
            <label>
          token: {token}
        </label> 
        </p>
     
      
      </form >


    </div >
  );
}