import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './style.css';

function Login() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleLogin = async () => {
        if (username.length < 2 || password.length < 2) {
            setError('שם משתמש וסיסמא חייבים לכלול לפחות 2 תווים');
            return;
        }

        try {
            const response = await fetch('http://localhost:5000/api/auth/login', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ Username: username, Password: password })
            });

            if (!response.ok) {
                setError('שם משתמש או סיסמא שגויים');
            } else {
                const data = await response.json();
                console.log(data);               
                const token = data.token;
                sessionStorage.setItem("authToken", token);
                setError('');
                navigate('/welcome');
            }
        } catch (error) {
            setError('שגיאה בחיבור לשרת');
        }
    };

    return (
        <div className="login-container">
            <h2>כניסה</h2>
            {error && <p className="text-danger">{error}</p>}
            <input
                type="text"
                placeholder="שם משתמש"
                className="form-control my-2"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
            />
            <input
                type="password"
                placeholder="סיסמא"
                className="form-control my-2"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
            />
            <button className="btn btn-primary" onClick={handleLogin}>
                כניסה
            </button>
            <button className="btn btn-link" onClick={() => navigate('/register')}>
                הרשמה
            </button>
        </div>
    );
}

export default Login;
