import { Navigate, Outlet } from "react-router-dom";
import { useAppSelector } from "./app/hooks";
//import Appointments from "./Components/Components/Appointments";
import { selectUID } from "./components/slices/authSlice";

const useAuth = () =>{
    const loggedIn = useAppSelector(selectUID);
    return loggedIn
}

const ProtectedRoutes = () => {
    const isAuth = useAuth()

  return  isAuth ? <Outlet /> : <Navigate to="/home"/>
}

export default ProtectedRoutes