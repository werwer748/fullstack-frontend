import {lazy, Suspense} from "react";
import {RouteObject} from "react-router-dom";

const Loading = <div>Loading.........</div>

const Login = lazy(() => import("../pages/member/LoginPage"));
const Logout = lazy(() => import("../pages/member/LogoutPage"));

const memberRouter = (): RouteObject[] => {
    return [
        {
            path: "login",
            element: <Suspense fallback={Loading}><Login /></Suspense>
        },
        {
            path: "logout",
            element: <Suspense fallback={Loading}><Logout /></Suspense>
        },
    ];
};

export default memberRouter;