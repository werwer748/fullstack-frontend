export interface ILoginRequest {
    email: string;
    pw: string;
}

export interface IModifyMember extends ILoginRequest {
    nickname: string;
}