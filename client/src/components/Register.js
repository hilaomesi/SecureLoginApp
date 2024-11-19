import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './style.css';

function Register() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [role, setRole] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleRegister = async () => {
        if (username.length < 6 || password.length < 6) {
            setError('שם משתמש וסיסמא חייבים לכלול לפחות 6 תווים');
            return;
        }

        try {
            const response = await fetch('http://localhost:5000/api/auth/register', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ Username: username, Password: password, Role: role })
            });

            if (!response.ok) {
                setError('שם המשתמש כבר קיים');
            } else {
                setError('');
                navigate('/');
            }
        } catch (error) {
            setError('שגיאה בחיבור לשרת');
        }
    };

    return (
        <div className="login-container">
            <h2>הרשמה</h2>
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
            <input
                type="text"
                placeholder="תפקיד"
                className="form-control my-2"
                value={role}
                onChange={(e) => setRole(e.target.value)}
            />
            <button className="btn btn-primary" onClick={handleRegister}>
                הרשמה
            </button>
            <div></div>
            <button className="btn btn-link" onClick={() => navigate('/')}>
                חזור לכניסה
            </button>
        </div>
    );
}

export default Register;


