
import { useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../Providers/AuthProvider';
import useAuth from '../../hooks/useAuth';
import axios from 'axios';

const Login = () => {
    const {signinUser} = useAuth()
    const navigate = useNavigate()
    const handleLogin = e =>{
        e.preventDefault()
        const form = e.target;
        const email = form.email.value;
        const password = form.password.value;
        signinUser(email, password)
            .then(res => {
                axios.post('http://localhost:5000/jwt', {email},{withCredentials: true})
                    .then(res => console.log(res.data))
                console.log(res.user)
                navigate('/')
            })
            .catch(err => console.log(err))
        console.log(email, password);
    }
    return (
        <div>
            <h2>Please Login</h2>
            <form onSubmit={handleLogin}>
                <input type="email" name='email' placeholder='Email' />
                <input type="password" name='password' placeholder='Password' />
                <input type="submit" value="Login" />
            </form>
            <Link to='/signUp'>SignUp</Link>
        </div>
    );
};

export default Login;