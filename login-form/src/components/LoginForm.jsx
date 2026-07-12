import { useState } from "react";
import './LoginForm.css'

function LoginForm() {
    const [showPassword, setShowPassword] = useState(false);
    const handleShowPassword = () => {
        setShowPassword(!showPassword)
    }
    return (
        <div className="login-form-container">
            <div>
                <input type="text" placeholder="Email" />
            </div>
            <div>
                <input type={showPassword ? 'text' : 'password'} placeholder="Password" />
                <button onClick={handleShowPassword}>{showPassword ? 'Hide' : 'Show'}</button>
            </div>

            <button className="login-button">Login</button>
            <button className="login-button">Sign up</button>
        </div>
    );
}

export default LoginForm;