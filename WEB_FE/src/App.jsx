import './App.css';
import { useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import LoginForm from './components/LoginForm'



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
      {(user.email !== "") ? (
        <div className="welcome">
          <h1>Welcome, {user.email}</h1>
        </div>
      ) :
      <LoginForm Login={Login} error={error} />}
    </div>
  )
}
