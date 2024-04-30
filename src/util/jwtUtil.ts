import axios, {AxiosError, AxiosResponse, InternalAxiosRequestConfig} from "axios";
import {API_SERVER_HOST} from "../api/todoApi";
import {getCookie, setCookie} from "./cookieUtil";

const jwtAxios = axios.create();

const refreshJwt = async (accessToken: string, refreshToken: string) => {
    const host = API_SERVER_HOST;

    const header = { headers: {"Authorization": `Bearer ${accessToken}`} }

    const res = await axios.get(`${host}/api/member/refresh?refreshToken=${refreshToken}`, header);

    console.log("====== refreshJwt ======");
    console.log(res.data);

    return res.data;
};

const beforeReq = (config: InternalAxiosRequestConfig) => {
    console.log("before request.....");

    const memberInfo = getCookie("member");

    if (!memberInfo) {
        console.log("MEMBER NOT FOUND");
        return Promise.reject({ // ajax 통신 결과가 Promise니까 맞춰준 것.
            response: {
                data: {error: "REQUIRE_LOGIN"}
            }
        });
    }

    const { accessToken } = memberInfo;

    // Authorization 헤더 처리
    config.headers.Authorization = `Bearer ${accessToken}`;

    return config;
};

const requestFail = (err: AxiosError) => {
    console.log("request error........");

    return Promise.reject(err);
};

const beforeRes = async (res: AxiosResponse) => {
    console.log("before return response.............");

    const data = res.data;

    if (data && data.error === 'ERROR_ACCESS_TOKEN') { // 코드가 아닌 메시지로..
        const memberCookieValue = getCookie("member");

        const result = await refreshJwt(memberCookieValue.accessToken, memberCookieValue.refreshToken);
        console.log("refreshJwt result", result);

        memberCookieValue.accessToken = result.accessToken;
        memberCookieValue.refreshToken = result.refreshToken;

        setCookie("member", JSON.stringify(memberCookieValue), 1);

        // 기존 진행 호출
        const originalRequest = res.config;
        originalRequest.headers.Authorization = `Bearer ${result.accessToken}`;

        return await axios(originalRequest);
    }

    return res;
};

const responseFail = (err: AxiosError) => {
    console.log("response fail error........");
    return Promise.reject(err);
};

// request전에 취할 행동을 지정
jwtAxios.interceptors.request.use(beforeReq, requestFail)

// response전에 취할 행동을 지정
jwtAxios.interceptors.response.use(beforeRes, responseFail)

export default jwtAxios;