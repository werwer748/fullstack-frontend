import React, {ChangeEvent, useCallback, useEffect, useRef, useState} from 'react';
import {IProduct} from "../../interfaces/productInterface";
import {deleteOne, getOne, putOne} from "../../api/productsApi";
import FetchingModal from "../common/FetchingModal";
import {API_SERVER_HOST} from "../../api/todoApi";
import useCustomMove from "../../hooks/useCustomMove";
import ResultModal from "../common/ResultModal";

const host = API_SERVER_HOST;

const initState: IProduct = {
    pno: 0,
    pname: '',
    pdesc: '',
    price: 0,
    delFlag: false,
    uploadFileNames: []
};

function ModifyComponent({pno}: {pno: number}) {
    const { moveToList, moveToRead } = useCustomMove();

    const [product, setProduct] = useState({...initState});
    const [fetching, setFetching] = useState(false);
    const [result, setResult] = useState<string | null>(null);

    const uploadRef = useRef<HTMLInputElement>(null);

    const handleChangeProduct = useCallback((e: ChangeEvent<HTMLInputElement|HTMLTextAreaElement|HTMLSelectElement>) => {
        const {name, value} = e.target;

        setProduct((prevProduct) => {
            if (name === 'delFlag') {
                return {
                    ...prevProduct,
                    [name]: Number(value) === 1,
                };
            }
            return {
                ...prevProduct,
                [name]: value
            };
        });

    }, []);

    const deleteOldImages = useCallback((imageName: string) => {
        const resultFileNames = product.uploadFileNames.filter((v) => v !== imageName);

        setProduct((prevState) => ({
            ...prevState,
            uploadFileNames: resultFileNames,
        }));
    }, [product.uploadFileNames]);

    const handleClickModify = useCallback(() => {
        const files = uploadRef.current?.files ?? [];
        const formData = new FormData();

        for (let i = 0; i < files.length; i++) {
            formData.append("files", files[i]);
        }
        formData.append("pname", product.pname);
        formData.append("pdesc", product.pdesc);
        formData.append("price", product.price.toString());
        formData.append("delFlag", product.delFlag ? "true" : "false");

        for (let i = 0; i < product.uploadFileNames.length; i++) {
            // 배열 전송시 이렇게 써야함.
            formData.append("uploadFileNames", product.uploadFileNames[i]);
        }

        setFetching(true);

        putOne(pno, formData).then(data => {
            setResult('Modified');
            setFetching(false);
        });

    }, [pno, product.delFlag, product.pdesc, product.pname, product.price, product.uploadFileNames]);

    const handleClickDelete = useCallback(() => {
        setFetching(true);

        deleteOne(pno).then(data => {
            setResult("Deleted");
            setFetching(false);
        });

    }, [pno]);
    const closeModal = useCallback(() => {
        if (result === 'Modified') {
            moveToRead(pno);
        } else if (result === 'Deleted') {
            moveToList({ page: '1', size: '10'});
        }
        setResult(null);
    }, [result, pno, moveToRead, moveToList]);

    useEffect(() => {
        setFetching(true);

        getOne(pno).then((data) => {
            setProduct(data);
            setFetching(false);
        })
    }, [pno]);

    return (
        <div className={"border-2 border-sky-200 mt-10 m-2 p-4"}>

            {fetching && <FetchingModal/>}
            {result && <ResultModal title={result} content={'처리되었습니다.'} callbackFn={closeModal}/>}

            <div className="flex justify-center">
                <div className="relative mb-4 flex w-full flex-wrap items-stretch">
                    <div className="w-1/5 p-6 text-right font-bold">Product Name</div>
                    <input className="w-4/5 p-6 rounded-r border border-solid border-neutral-300 shadow-md"
                           name="pname" type={'text'} value={product.pname} onChange={handleChangeProduct}></input>
                </div>
            </div>
            <div className="flex justify-center">
                <div className="relative mb-4 flex w-full flex-wrap items-stretch">
                    <div className="w-1/5 p-6 text-right font-bold">Desc</div>
                    <textarea className="w-4/5 p-6 rounded-r border border-solid border-neutral-300 shadow-md resize-y"
                              name="pdesc" rows={4} onChange={handleChangeProduct}
                              value={product.pdesc}> {product.pdesc} </textarea>
                </div>
            </div>
            <div className="flex justify-center">
                <div className="relative mb-4 flex w-full flex-wrap items-stretch">
                    <div className="w-1/5 p-6 text-right font-bold">Price</div>
                    <input className="w-4/5 p-6 rounded-r border border-solid border-neutral-300 shadow-md"
                           name="price" type={'number'} value={product.price} onChange={handleChangeProduct}></input>
                </div>
            </div>
            <div className="flex justify-center">
                <div className="relative mb-4 flex w-full flex-wrap items-stretch">
                    <div className="w-1/5 p-6 text-right font-bold">DELETE</div>
                    <select name="delFlag" value={product.delFlag ? 1 : 0} onChange={handleChangeProduct}
                            className="w-4/5 p-6 rounded-r border border-solid border-neutral-300 shadow-md">
                        <option value={0}>사용</option>
                        <option value={1}>삭제</option>
                    </select>
                </div>
            </div>
            <div className="flex justify-center">
                <div className="relative mb-4 flex w-full flex-wrap items-stretch">
                    <div className="w-1/5 p-6 text-right font-bold">Files</div>
                    <input ref={uploadRef}
                           className="w-4/5 p-6 rounded-r border border-solid border-neutral-300 shadow-md"
                           type={'file'} multiple={true}></input>
                </div>
            </div>
            <div className="flex justify-center">
                <div className="relative mb-4 flex w-full flex-wrap items-stretch">
                    <div className="w-1/5 p-6 text-right font-bold">Images</div>
                    <div className="w-4/5 justify-center flex flex-wrap items-start">
                        {product.uploadFileNames.map((imgFile, i) =>
                            <div className="flex justify-center flex-col w-1/3 m-1 align-baseline" key={i}>
                                <button
                                    className="bg-blue-500 text-3xl text-white"
                                    onClick={() => deleteOldImages(imgFile)}
                                >
                                    DELETE
                                </button>
                                <img alt="img" src={`${host}/api/products/view/s_${imgFile}`}/>
                            </div>
                        )}
                    </div>
                </div>
            </div>
            <div className="flex justify-end p-4">
                <button type="button"
                        className="rounded p-4 m-2 text-xl w-32 text-white bg-red-500"
                        onClick={handleClickDelete}
                >
                    Delete
                </button>
                <button type="button" onClick={handleClickModify}
                        className="inline-block rounded p-4 m-2 text-xl w-32 text-white bg-orange-500">
                    Modify
                </button>
                <button type="button"
                        className="rounded p-4 m-2 text-xl w-32 text-white bg-blue-500"
                        onClick={() => moveToList()}
                >
                    List
                </button>
            </div>
        </div>
    );
}

export default ModifyComponent;