import { Link } from "react-router-dom";
import useAuth from "../../hooks/useAuth";

const SignUp = () => {
    
    const {createUser} = useAuth()
    const handleSignUp = e =>{
        e.preventDefault()
        const form = e.target;
        const email = form.email.value;
        const password = form.password.value;
        createUser(email, password)
        .then(res => console.log(res.user))
        .catch(err => console.log(err))
        console.log(email, password); 
    }
    return (
        <div>
            <h2>Please Sign Up</h2>
            <form onSubmit={handleSignUp}>
                <input type="email" name='email' placeholder='Email' />
                <input type="password" name='password' placeholder='Password' />
                <input type="submit" value="SignUp" />
                {/* <button>Sign Up</button> */}
            </form>
            <Link to='/login'>Login</Link>
        </div>
    );
};

export default SignUp;