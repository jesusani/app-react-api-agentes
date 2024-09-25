import { redirect } from "react-router-dom";

interface AuthProvider {
    isAuthenticated: boolean;
    username: null | string;
    password: null | string;
    token: null | string;
    signin(username: string, password: string): Promise<void>;
    signout(): Promise<void>;
  }
  
  /**
   * This represents some generic auth provider API, like Firebase.
   */
  export const fakeAuthProvider: AuthProvider = {
    username: null,
    password: null,
    token: null,

    async signin(username: string, password: string) {
      
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
            //setToken(result.token);
             //alert('You are logged in.');
            fakeAuthProvider.isAuthenticated = true;
            fakeAuthProvider.username = username;
            fakeAuthProvider.password = password;
            fakeAuthProvider.token = result.token;
            sessionStorage.setItem('jwtToken', result.token);
            redirect('/');
          } else {
            alert('Please check your login information.');
          }
        });


    },
    async signout() {
      await new Promise((r) => setTimeout(r, 500)); // fake delay
      fakeAuthProvider.isAuthenticated = false;
      fakeAuthProvider.username = "";
      sessionStorage.removeItem('jwtToken');

    },
    isAuthenticated: false
  };