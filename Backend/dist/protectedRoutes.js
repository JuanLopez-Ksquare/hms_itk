"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const react_router_dom_1 = require("react-router-dom");
const hooks_1 = require("./app/hooks");
const authSlice_1 = require("./Components/slices/authSlice");
const useAuth = () => {
    const uidLoggedIn = (0, hooks_1.useAppSelector)(authSlice_1.selectUID);
    console.log(uidLoggedIn);
    return uidLoggedIn;
};
const ProtectedRoutes = () => {
    const isAuth = useAuth();
    return isAuth ? <react_router_dom_1.Outlet /> : <react_router_dom_1.Navigate to="/"/>;
};
exports.default = ProtectedRoutes;
