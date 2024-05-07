import React, {useCallback, useEffect, useState} from 'react';
import {useAppSelector} from "../../store";
import {modifyMember} from "../../api/memberApi";
import useCustomLogin from "../../hooks/useCustomLogin";
import ResultModal from "../common/ResultModal";

const initState = {
    email: "",
    pw: "",
    nickname: ""
};

function ModifyComponent() {
    const loginInfo = useAppSelector(state => state.loginSlice);

    const { moveToLogin } = useCustomLogin();

    const [member, setMember] = useState({...initState})
    const [result, setResult] = useState(false);

    useEffect(() => {
        setMember({...loginInfo, pw: "ABCD"});
    }, [loginInfo]);

    const handleChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
        const {name, value} = e.target;
        setMember(prevState => ({
            ...prevState,
            [name]: value,
        }))
    }, []);

    const handleClick = useCallback(() => {
        modifyMember(member).then(result => {
            setResult(true);
        });
    }, [member]);

    const closeModal = useCallback(() => {
        setResult(false);
        moveToLogin();
    }, [moveToLogin]);

    return (
        <div className="mt-6">
            {result && <ResultModal title={"회원정보 수정"} content={"수정완료"} callbackFn={closeModal} />}
            <div className="flex justify-center">
                <div className="relative mb-4 flex w-full flex-wrap items-stretch">
                    <div className="w-1/5 p-6 text-right font-bold">Email</div>
                    <input className="w-4/5 p-6 rounded-r border border-solid border-neutral-300 shadow-md"
                           name="email" type={'text'} value={member.email} readOnly />
                </div>
            </div>
            <div className="flex justify-center">
                <div className="relative mb-4 flex w-full flex-wrap items-stretch">
                    <div className="w-1/5 p-6 text-right font-bold">Password</div>
                    <input className="w-4/5 p-6 rounded-r border border-solid border-neutral-300 shadow-md"
                           name="pw" type={'password'} value={member.pw} onChange={handleChange} />
                </div>
            </div>
            <div className="flex justify-center">
                <div className="relative mb-4 flex w-full flex-wrap items-stretch">
                    <div className="w-1/5 p-6 text-right font-bold">Nickname</div>
                    <input className="w-4/5 p-6 rounded-r border border-solid border-neutral-300 shadow-md"
                           name="nickname" type={'text'} value={member.nickname} onChange={handleChange} />
                </div>
            </div>
            <div className="flex justify-center">
                <div className="relative mb-4 flex w-full flex-wrap justify-end">
                    <button type="button" className="rounded p-4 m-2 text-xl w-32 text-white bg-blue-500"
                    onClick={handleClick}>
                        Modify
                    </button>
                </div>
            </div>
        </div>
    );
}

export default ModifyComponent;