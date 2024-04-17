
import { useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../Providers/AuthProvider';
import useAuth from '../../hooks/useAuth';

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