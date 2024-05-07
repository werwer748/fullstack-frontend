import React, {useEffect} from 'react';
import {useSearchParams} from "react-router-dom";
import {getAccessToken, getMemberWithAccessToken} from "../../api/kakaoApi";
import {useAppDispatch} from "../../store";
import {login} from "../../slices/loginSlice";
import useCustomLogin from "../../hooks/useCustomLogin";

function KakaoRedirectPage() {
    const [searchParams] = useSearchParams();
    const dispatch = useAppDispatch();
    const { moveToPath } = useCustomLogin();

    const authCode = searchParams.get('code');


    useEffect(() => {
        if (authCode) {
            getAccessToken(authCode).then(accessToken => {
                // console.log(accessToken);
                getMemberWithAccessToken(accessToken).then(memberInfo => {
                    console.log("----------------------");
                    console.log(memberInfo);
                    dispatch(login(memberInfo));

                    if (memberInfo && memberInfo.social) {
                        moveToPath("/member/modify");
                    } else {
                        moveToPath("/")
                    }
                });
            });
        }
    }, [authCode, dispatch, moveToPath]);

    return (
        <div>
            <div>Kakao Login Redirect</div>
            {/*<div>{authCode}</div>*/}
        </div>
    );
}

export default KakaoRedirectPage;