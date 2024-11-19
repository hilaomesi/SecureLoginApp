import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

function Welcome() {
    const navigate = useNavigate();
    const [isAuthenticated, setIsAuthenticated] = useState(false);

    useEffect(() => {
        const checkToken = async (token) => {
            try {
                const response = await fetch('http://localhost:5000/api/auth/protected', {
                    method: 'GET',
                    headers: {
                        'Authorization': `Bearer ${token}`,
                        'Content-Type': 'application/json',
                    }
                });

                if (!response.ok) {
                    setIsAuthenticated(false);
                    navigate('/');
                } else {
                    setIsAuthenticated(true);
                }
            } catch (error) {
                console.error("Error during token validation:", error);
                setIsAuthenticated(false);
                navigate('/');
            }
        };

        const token = sessionStorage.getItem('authToken');
        console.log(token);
                
        if (!token) {
            navigate('/');
        } else {
            checkToken(token);
        }
    }, [navigate]);

    return (
        <div>
            {isAuthenticated ? (
                <>
                    <h2>ברוך הבא!</h2>
                    <p>ברוכים הבאים לאפליקציה שלנו</p>
                </>
            ) : (
                <p>נא להמתין...</p>
            )}
        </div>
    );
}

export default Welcome;
