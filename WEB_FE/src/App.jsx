/* eslint-disable react/no-unknown-property */
import './App.css';
import { useState } from 'react';

import Router from './routers/router';
import LoginForm from './components/LoginForm';
import RegisterForm from './components/RegisterForm';


export default function App() {
  const adminUser = {
    id: "admin@admin.com",
    pw: "admin123"
  }
  const [user, setUser] = useState({email: "", password: ""});
  const [error, setError] = useState("");

  const Login = (details) => {
    // eslint-disable-next-line no-console
    console.log(details);
  }
  const Logout = () => {
    console.log("Logout");
  }

  return (
    <div className="bg">
      <Router user={user} Login={Login} error={error}/>
    </div>
  )
}
