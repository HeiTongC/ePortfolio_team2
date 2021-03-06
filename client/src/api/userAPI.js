import { useState, useEffect } from "react";

//const BASE_URL = "";

export default async function userSignIn(user) {
    const endpoint = "/api/user/signin";

    const {email, password} = user;
    
    const res = await fetch(endpoint,{

        method: "POST",
        credentials: 'include',
        headers:{
            "credentials": 'include',
            'content-Type': "application/json"
        },
        body: JSON.stringify({
            email,
            password
        })
    });
   
    return res;
}

export async function userSignUp(user) {
    const endpoint = "/api/user/signup";
    const {email, password} = user;
  
    const res = await fetch(endpoint, {
        method: "POST",
        credentials: 'include',
        headers: {
        "credentials": 'include',
        "Content-Type": "application/json"
        },
        body: JSON.stringify({
        email,
        password
        })
    });
   
    return res;
}

// get user's profile
export async function getUserProfile() {
      const endpoint = `/api/user/profile`;
    
      const res = await fetch(endpoint, {
        method: "GET",
        credentials: 'include',
        headers: {
          "credentials": 'include',
          "Accept": 'application/json'
        }
      });
   
      return res.json();
}

// get user's published portfolio
export async function getUserPortfolio() {
  const endpoint = `/api/user/portfolio`;

  const res = await fetch(endpoint, {
    method: "GET",
    credentials: 'include',
    headers: {
      "credentials": 'include',
      "Accept": 'application/json'
    }
  });
  
  return res.json();
}


// update user profile
export async function updateUserProfile(user) {
  const { firstName, lastName, avatar, phone, gender } = user;

  const endpoint = `/api/user/profile`;

  const res = await fetch(endpoint, {
    method: "POST",
    credentials: 'include',
    headers: {
      "credentials": 'include',
      "Accept": 'application/json',
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      firstName,
      lastName,
      avatar,
      phone,
      gender
      })
  });
  console.log(res);
  return res;
}


// logout by clearing cookie
export function userLogOut() {      
    document.cookie.split(";").forEach((c) => {
        document.cookie = c
          .replace(/^ +/, "")
          .replace(/=.*/, "=;expires=" + new Date().toUTCString() + ";path=/");
      });
    alert("logout!");
    window.location.replace("/");
}
  

export function useUserProfile() {
    const [loading, setLoading] = useState(true);
    const [user, setResponse] = useState([]);
    const [error, setError] = useState(null);
  
    useEffect(() => {
      getUserProfile()
        .then(user => {
          setResponse(user);
          setLoading(false);
        })
        .catch(e => {
          console.log(e);
          setError(e);
          setLoading(false);
        });
    },[]);
  
    return {
      loading,
      user,
      error
    };
  }

export function useUserPortfolio() {
    const [loading, setLoading] = useState(true);
    const [res, setResponse] = useState([]);
    const [error, setError] = useState(null);
  
    useEffect(() => {
      getUserPortfolio()
        .then(res => {
          setResponse(res);
          setLoading(false);
        })
        .catch(e => {
          console.log(e);
          setError(e);
          setLoading(false);
        });
    },[]);
  
    return {
      loading,
      res,
      error
    };
  } 