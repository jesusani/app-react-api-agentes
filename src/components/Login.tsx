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

  //const [token, setToken] = useState("token");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");

  const token = sessionStorage.getItem('jwtToken');

  let navigation = useNavigation();

  let isLoggingIn = navigation.formData?.get("username") != null;

  let actionData = useActionData() as { error: string } | undefined;





  return (
    <div>
      <p>You must log in to view the page at {from}</p>


    {isLoggingIn ? "login" : (
 <Form className='login-form' method="post" >

 <input type="hidden" name="redirectTo" value={from} />

 <input
   className='login-info'
   onChange={(e) => { setUsername(e.target.value) }}
   id='username'
   name="username"
   type='text'
   value={username}
   placeholder='Phone number, username or email'
 />
 <input
   className='login-info'
   onChange={(e) => { setPassword(e.target.value) }}
   id='password'
   name="password"
   type='password'
   value={password}
   placeholder="Password" />
 <button
   className='login-button'
   //   disabled={this.enableLoginButton()}
   //  id={this.changeLoginButtonStyle()}
   type='submit'
 //AL QUITAR LA FUNCION FUNCIONA EL FAKEAUTENTIFICATE
 //onClick={clickLogin}
 >

   {isLoggingIn ? "Logging in..." : "Login"}

 </button>
 {actionData && actionData.error ? (
   <p style={{ color: "red" }}>{actionData.error}</p>
 ) : null}
 <label>
   token: {token}
 </label>

</Form >

    )}

     

    </div >
  );
}