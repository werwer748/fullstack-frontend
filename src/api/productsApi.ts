import {API_SERVER_HOST} from "./todoApi";
import jwtAxios from "../util/jwtUtil";

const host = `${API_SERVER_HOST}/api/products`;

const formDataHeader = {headers: {'Content-Type': 'multipart/form-data'}};

export const postAdd = async (product: FormData) => {
    const res = await jwtAxios.post(`${host}/`, product, formDataHeader);

    return res.data;
};

export const getList = async (pageParam: { page: string, size: string }) => {
    const { page, size} = pageParam;

    // const res = await axios.get(`${host}/list`, { params: { page, size }});
    const res = await jwtAxios.get(`${host}/list`, { params: { page, size }});

    return res.data;
};

export const getOne = async (pno: number) => {
    const res = await jwtAxios.get(`${host}/${pno}`);

    return res.data;
};

export const deleteOne = async (pno: number) => {
    const res = await jwtAxios.delete(`${host}/${pno}`);

    return res.data;
}

export const putOne = async (pno: number, product: FormData) => {
    const res = await jwtAxios.put(`${host}/${pno}`, product, formDataHeader);

    return res.data;
};