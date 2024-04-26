import {ITodoDto} from "./todoInterface";

export interface IServerData<T> {
    dtoList: T[],
    pageNumList: number[],
    pageRequestDto: null | { page: number, size: number },
    prev: boolean,
    next: boolean,
    totalCount: number,
    prevPage: number,
    nextPage: number,
    totalPage: number,
    current: number
}