import React, {ChangeEvent, useCallback, useState} from 'react';
import {ILoginRequest} from "../../interfaces/memberInterface";
import useCustomLogin from "../../hooks/useCustomLogin";
import KakaoLoginComponent from "./KakaoLoginComponent";

const initState: ILoginRequest = {
    email: '',
    pw: ''
};

function LoginComponent() {
    const [loginParam, setLoginParam] = useState({...initState});

    const {doLogin, moveToPath} = useCustomLogin()

    const handleChange = useCallback((e: ChangeEvent<HTMLInputElement>) => {
        const {value, name} = e.target;

        setLoginParam(prevState => ({
            ...prevState,
            [name]: value,
        }));
    }, []);

    const handleClickLogin = useCallback(() => {
        // // dispatch(login(loginParam)); // createAsyncThunk 사용 전
        // dispatch(loginPostAsync({...loginParam})) // useCustomLogin 사용 전
        //     .unwrap() // 이렇게 결과데이터를 받아올 수 있다. - 비동기 요청이지만 동기요청처럼 결과처리를 할 수 있다.
        //     .then((data) => {
        //         console.log('after unwrap');
        //         console.log(data);
        //
        //         if (data.error) {
        //             alert("이메일과 패스워드를 확인해 주세요.");
        //         } else {
        //             alert("로그인 성공!");
        //             navigate({pathname: '/' }, { replace: true })
        //         }
        //     });
        doLogin(loginParam).then(data => {
            if (data.error) {
                alert("이메일과 패스워드를 확인해 주세요.");
            } else {
                alert("로그인 성공!");
                moveToPath("/");
            }
        })
    }, [doLogin, loginParam, moveToPath]);
    return (
        <div className="border-2 border-sky-200 mt-10 m-2 p-4">
            <div className="flex justify-center">
                <div className="text-4xl m-4 p-4 font-extrabold text-blue-500">Login Component</div>
            </div>
            <div className="flex justify-center">
                <div className="relative mb-4 flex w-full flex-wrap items-stretch">
                    <div className="w-full p-3 text-left font-bold">Email</div>
                    <input className="w-full p-3 rounded-r border border-solid border-neutral-500 shadow-md"
                           name="email" type={'text'} value={loginParam.email} onChange={handleChange}/>
                </div>
            </div>
            <div className="flex justify-center">
                <div className="relative mb-4 flex w-full flex-wrap items-stretch">
                    <div className="w-full p-3 text-left font-bold">Password</div>
                    <input className="w-full p-3 rounded-r border border-solid border-neutral-500 shadow-md"
                           name="pw" type={'password'} value={loginParam.pw} onChange={handleChange}/>
                </div>
            </div>
            <div className="flex justify-center">
                <div className="relative mb-4 flex w-full justify-center">
                    <div className="w-2/5 p-6 flex justify-center font-bold">
                        <button
                            className="rounded p-4 w-36 bg-blue-500 text-xl text-white"
                            onClick={handleClickLogin}
                        >
                            LOGIN
                        </button>
                    </div>
                </div>
            </div>
            <KakaoLoginComponent />
        </div>
    );
}

export default LoginComponent;