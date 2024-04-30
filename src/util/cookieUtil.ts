import {Cookies} from "react-cookie";

const cookies = new Cookies();

/**
 * 쿠키는 기본적으로 문자열
 * 파싱같은거 신경쓰면서 쓰자.
 */

export const setCookie = (name: string, value: string, days = 1) => {
    const expires = new Date();
    expires.setUTCDate(expires.getUTCDate() + days); // 쿠키 보관 기한

    return cookies.set(name, value, { expires, path: '/' }); // 모든경로에서 사용할 수 있도록 '/'
}

export const getCookie = (name: string) => {
    return cookies.get(name);
}

export const removeCookie = (name: string, path = '/') => {
    cookies.remove(name, {path});
};