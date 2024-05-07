import axios from "axios";
import {API_SERVER_HOST} from "./todoApi";

const rest_api_key = 'a83b13d0cdec3e414c2b2d139ebb5466';
const redirect_uri = 'http://localhost:3000/member/kakao';

const auth_code_path = 'https://kauth.kakao.com/oauth/authorize';

const access_token_url = 'https://kauth.kakao.com/oauth/token';

export const getKakaoLoginLink = () => {
    const kakaoUrl = `${auth_code_path}?client_id=${rest_api_key}&redirect_uri=${redirect_uri}&response_type=code`

    return kakaoUrl;
};

export const getAccessToken = async (authCode: string)=> {
    const header = {headers: {'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8'}}

    const params = {
        grant_type: 'authorization_code',
        client_id: rest_api_key,
        redirect_uri: redirect_uri,
        code: authCode,
    }

    const res = await axios.post(access_token_url, params, header);

    return res.data.access_token;
};

export const getMemberWithAccessToken = async (accessToken: string) => {
    const res = await axios.get(`${API_SERVER_HOST}/api/member/kakao?accessToken=${accessToken}`);

    return res.data;
}