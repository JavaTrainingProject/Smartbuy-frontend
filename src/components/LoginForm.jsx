import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { setAccessToken, setRefreshToken } from '../services/authService';
import '../styles/LoginPage.css';
import { login } from '../services/Login';



function LoginForm() {

    const navigate=useNavigate();
    const [formData, setFormData] =useState({
        email:'',
        password:''
    });

    const [errors,setErrors]=useState({});
    const [apiError, setApiError]=useState('');
    const[loading, setLoading] =useState(false);

    const handleChange = (e) =>{
        const{name,value} = e.target;
        setFormData({...formData, [name]:value});
    };
    
    const validate=() =>{
        const newErrors ={};

        if(!formData.email.trim()){
            newErrors.email='Email is required';
        }else if (!/^[^\s@]+@[^\s@]+\.com$/.test(formData.email)) {
            newErrors.email = 'Enter a valid email';
        }


        if(!formData.password.trim()){
            newErrors.password='Password is required';    
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length==0;
    };

    const handleSubmit = async (e) =>{
        e.preventDefault();
        setApiError('');

        if(!validate()) return;

        try{
            setLoading(true);
            const response = await login(formData);
            setAccessToken(response.token);
            setRefreshToken(response.refreshToken);

            localStorage.setItem('userId', response.id);
            localStorage.setItem('role',response.role);
            localStorage.setItem("userId",response.id);
            localStorage.setItem("fullName", response.user_name);
            if(response.role === "ADMIN"){
                navigate("/admin/home")
            }else{
            navigate('/user/');
            }
        }catch(error){
            setApiError("Invalid email or password");
        
        }finally{
            setLoading(false);
        }
    };
     
    const firstError = errors.email || errors.password;
  return (
    <div className="login-container">
        <div className="login-left">
            <img src="/assets/logo.png" alt="SmartBuy Logo" className="logo" />
        </div>

        <div className='login-right'>
            <div className='login-card'>
                <h2 className='login-title'>Login</h2>
              

                <form onSubmit={handleSubmit}>
                    <div className='form-group'>
                        <label>Email</label>
                        <input type="text" name="email" value={formData.email} onChange={handleChange} placeholder='Enter you email' />
                    </div>

                    <div className='form-group'>
                        <label>Password</label>
                        <input type="password" name="password" value={formData.password} onChange={handleChange} placeholder='Enter your password' />
                    </div>

                    {firstError ? (
                        <p className="error-text">{firstError}</p>
                    ) : apiError && (
                    <p className="error-text">{apiError}</p>
                    )}


                    <button type="Submit" className='login-btn' disabled={loading}>
                        {'Login'}
                    </button>

                </form>

                <p className='register-text'>
                    Not registered yet? <Link to="/register">Register Now</Link>
                </p>
            </div>
        </div>
      
    </div>
  );
}

export default LoginForm;