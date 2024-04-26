export interface IPostProductRequest {
    pname: string;
    pdesc: string;
    price: number;
    files: File[];
}

export interface IProduct {
    pno: number;
    pname: string;
    price: number;
    pdesc: string;
    delFlag: boolean;
    uploadFileNames: string[];
}

export interface IGetProductListData {
    dtoList: IProduct[],
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