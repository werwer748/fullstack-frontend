import {useNavigate, Navigate} from "react-router-dom";
import {useAppDispatch, useAppSelector} from "../store";
import {ILoginRequest} from "../interfaces/memberInterface";
import {loginPostAsync, logout} from "../slices/loginSlice";
import {useCallback} from "react";

const useCustomLogin = () => {
    const navigate = useNavigate();

    const dispatch = useAppDispatch();

    const loginState = useAppSelector(state => state.loginSlice);

    const isLogin = !!loginState.email; // 로그인 여부

    const doLogin = useCallback(async (loginParam: ILoginRequest) => {
        const action = await dispatch(loginPostAsync({...loginParam}));

        return action.payload;
    }, [dispatch]);

    const doLogout = useCallback(() => {
        dispatch(logout());
    }, [dispatch]);

    const moveToPath = useCallback((pathname: string) => {
        navigate({pathname}, {replace: true});
    }, [navigate]);

    const moveToLogin = useCallback(() => {
        navigate({pathname: '/member/login'}, {replace: true});
    }, [navigate]);

    const moveToLoginReturn = useCallback(() => {
        return <Navigate to={"/member/login"} replace={true} />
    }, []);

    return {
        loginState,
        isLogin,
        doLogin,
        doLogout,
        moveToPath,
        moveToLogin,
        moveToLoginReturn
    };
};

export default useCustomLogin;