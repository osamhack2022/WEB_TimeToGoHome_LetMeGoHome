import './App.css';
import { useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
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
    <Router>
      
        <div className="bg">
          {(user.email !== "") ? (
            <div className="welcome">
              <h1>Welcome, {user.email}</h1>
            </div>
          ) :
          <Routes>
            <Route path="/" element={<LoginForm Login={Login} error={error} />}/>
            <Route path="/register" element={<RegisterForm/>}/>          
          </Routes>
          }
        </div>
    </Router>
  )
}
