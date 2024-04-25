export interface ITodoDto {
    tno: number;
    title: string;
    content: string;
    complete: boolean;
    dueDate: string;
}

export interface IPostTodoRequestDto extends Omit<ITodoDto, 'tno' | 'complete'>{}

export interface ITodoServeData {
    dtoList: ITodoDto[],
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