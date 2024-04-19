import { Navigate } from "react-router-dom";
import useAuth from "../hooks/useAuth";


const PrivateRoute = ({children}) => {
    const {user, loading} = useAuth()
    if(loading){
        return <div style={{display: 'flex', height: '70vh', alignItems: 'center', justifyContent: 'center', fontSize: '30px'}}>Loading...</div>
    }
    if(user){
        return children
    }
    return <Navigate to='/login'></Navigate>
};

export default PrivateRoute;