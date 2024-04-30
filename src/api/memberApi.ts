import axios from "axios";
import { API_SERVER_HOST} from "./todoApi";

const host = `${API_SERVER_HOST}/api/member`;

export const loginPost = async ({email, pw}: {email: string; pw: string;}) => {
    const header = { headers: { "Content-Type": "x-www-form-urlencoded" }}

    const form = new FormData();
    form.append("username", email);
    form.append("password", pw);

    const res = await axios.post(`${host}/login`, form, header);

    return res.data;
}