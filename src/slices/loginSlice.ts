import {createAsyncThunk, createSlice, PayloadAction} from "@reduxjs/toolkit";
import {loginPost} from "../api/memberApi";
import {ILoginRequest} from "../interfaces/memberInterface";
import {getCookie, removeCookie, setCookie} from "../util/cookieUtil";

interface ILoginSlice {
    email: string
}

const initialState: ILoginSlice = {
    email: '',
};

const loadMemberCookie = () => {
    const memberInfo = getCookie('member')

    return memberInfo;
};

export const loginPostAsync = createAsyncThunk(
    'loginPostAsync',
    ({ email, pw }: ILoginRequest): any => loginPost({email, pw})
);

const loginSlice = createSlice({
    name: 'loginSlice',
    initialState: loadMemberCookie() || initialState,
    reducers: {
        login: (state, action: PayloadAction<ILoginRequest>) => {
            console.log("login.....", action);
            return { email: action.payload.email }
        },
        logout: () => {
            console.log("logout....");
            removeCookie("member");
            return {...initialState}
        }
    },
    extraReducers: (builder) => {
        // fulfilled 완료
        // pending 처리중
        // rejected 문제가 생김
        builder
            // 로그인 처리...
            .addCase(loginPostAsync.fulfilled, (state, action) => {
                console.log("fulfilled");

                // @ts-ignore
                const payload = action.payload;

                if (!payload.error) {
                    setCookie("member", JSON.stringify(payload), 1) // json데이터를 문자열로...
                }

                return payload;
            })
            .addCase(loginPostAsync.pending, (state, action) => {
                console.log("pending");
            })
            .addCase(loginPostAsync.rejected, (state, action) => {
                console.log("rejected");
            })
    }
})

export const { login, logout } = loginSlice.actions;

export default loginSlice.reducer;