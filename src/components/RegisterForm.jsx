import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { registerUser } from '../services/authService';
import '../styles/LoginPage.css'

function RegisterForm(){
    const navigate = useNavigate();

    const[formData,setFormData]=useState({
        fullName:'',
        email:'',
        password:''
    });

    const[errors, setErrors] = useState({});
    const[apiMessage, setApiMessage] = useState('');
    const[loading, setLoading] = useState(false);

    const handleChange = (e) =>{
        const{ name, value} = e.target;
        setFormData({...formData,[name]:value});
    };

    const validate = () =>{
        const newErrors={};

        if(!formData.fullName.trim()){
            newErrors.fullName='Full name is required';
        }

        if(!formData.email.trim()){
            newErrors.email='Email is required';
        }else if(!/^[^\s@]+@[^\s@]+\.com$/.test(formData.email)){
            newErrors.email='Enter a valid email';
        }   

        if(!formData.password.trim()){
            newErrors.password='Password is required';
        }
        setErrors(newErrors);
        return Object.keys(newErrors).length===0;
     };

     const handleSubmit = async(e) => {
        e.preventDefault();
        setApiMessage('');

        if(!validate()){
            setApiMessage('');
        return;
        }

        try{
            setLoading(true);

            await registerUser({
                user_name:formData.fullName,
                email:formData.email.trim().toLowerCase(),
                user_password:formData.password.trim()
          });
          setApiMessage("Registration successful!");

          setTimeout(() =>{
            navigate('/');
          }, 1500);
        } catch(error){
            const msg=error?.response?.data?.message || error?.response?.data || "Registration failed";
            setApiMessage(msg);
        } finally{
            setLoading(false);
        }
     };

     const firstError = errors.fullName || errors.email || errors.password;

     return(
        <div className="login-container">
            <div className='login-right'>
                <div className='login-card'>
                    <h2 className='login-title'>Register</h2>

                    <form onSubmit={handleSubmit} noValidate>
                        <div className='form-group'>
                            <label>Full Name</label>
                            <input type="text" name="fullName" value={formData.fullName} onChange={handleChange} placeholder='Enter your name' />
                            
                        </div>

                        <div className='form-group'>
                            <label>Email</label>
                            <input type="text" name="email" value={formData.email} onChange={handleChange} placeholder='Enter your email' />
                        </div>

                        <div className='form-group'>
                            <label>Password</label>
                            <input type="password" name="password" value={formData.password} onChange={handleChange} placeholder='Enter your password' />
                        </div>

                       {firstError ?(
                        <p className="error-text">{firstError}</p>
                       ) : apiMessage && (
                        <p className='error-text'
                        style={{color:apiMessage.includes("successful") ? "green" : "red"}}
                        >
                            {apiMessage}
                        </p>
                       
                       )}

                        <button type='submit' className='login-btn' disabled={loading}>
                            {'Register'}
                        </button>
                    </form>

                    <p className='register-text'>
                        Already have an account? <Link to="/">Login</Link>
                    </p>
                </div>
            </div>
        </div>
     );
}

export default RegisterForm;