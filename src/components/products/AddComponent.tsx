import React, {ChangeEvent, MouseEvent, useCallback, useRef, useState} from 'react';
import {IPostProductRequest} from "../../interfaces/productInterface";
import {postAdd} from "../../api/productsApi";
import FetchingModal from "../common/FetchingModal";
import ResultModal from "../common/ResultModal";
import useCustomMove from "../../hooks/useCustomMove";

const initState: IPostProductRequest = {
    pname: '',
    pdesc: '',
    price: 0,
    files: []
};

// new FormData() 를 활용할것. (POST, PUT)

function AddComponent() {
    const { moveToList } = useCustomMove();

    const [product, setProduct] = useState({...initState});
    const [fetching, setFetching] = useState(false);
    const [result, setResult] = useState<number | null>(null);

    /**
     * useRef()
     * document.getElementId 같은걸 쓸 수는 있지만 컴포넌트는 재사용을 목적으로 만들어 지는것
     * 컴포넌트에 아이디를 쓸 때 여기저기서 쓰게되면 문제가 생기기 때문에 특정 돔을 식별하는 용도로 무언가를 쓸때는
     * useRef를 활용하는게 좋다.
     */
    const uploadRef = useRef<HTMLInputElement>(null);

    const handleChangeProduct = useCallback((e: ChangeEvent<HTMLInputElement|HTMLTextAreaElement>) => {
        const {name, value} = e.target;

        // 이전 상태를 복사하고 새로운 값을 할당하여 업데이트
        setProduct(prevProduct => ({
            ...prevProduct,
            [name]: value
        }));
    }, []);

    const handleClickAdd = useCallback((e: MouseEvent<HTMLButtonElement> ) => {
        console.log(product);
        const formData = new FormData();
        const files = uploadRef.current?.files ?? [];

        for (let i = 0; i < files.length; i++) {
            formData.append("files", files[i]);
        }
        formData.append("pname", product.pname);
        formData.append("pdesc", product.pdesc);
        formData.append("price", product.price.toString());

        console.log(formData); // 어차피 안찍힘

        setFetching(true);
        postAdd(formData).then(data => {
            console.log(data.result);
            setFetching(false);
            setResult(data.result);
        });

    }, [product]);

    const closeModal = useCallback(() => {
        setResult(null);
        moveToList({page: '1', size: '10'})
    }, [moveToList]);

    return (
        <div className="border-2 border-sky-200 mt-10 m-2 p-4">
            <div className="flex justify-center">
                <div className="relative mb-4 flex w-full flex-wrap items-stretch">
                    <div className="w-1/5 p-6 text-right font-bold">Product Name</div>
                    <input className="w-4/5 p-6 rounded-r border border-solid border-neutral-300 shadow-md"
                           name="pname" type={'text'} value={product.pname} onChange={handleChangeProduct}
                    />
                </div>
            </div>
            <div className="flex justify-center">
                <div className="relative mb-4 flex w-full flex-wrap items-stretch">
                    <div className="w-1/5 p-6 text-right font-bold">Desc</div>
                    <textarea
                        className="w-4/5 p-6 rounded-r border border-solid border-neutral-300 shadow-md resize-y"
                        name="pdesc" rows={4} onChange={handleChangeProduct} value={product.pdesc}>
                        {product.pdesc}
                    </textarea>
                </div>
            </div>
            <div className="flex justify-center">
                <div className="relative mb-4 flex w-full flex-wrap items-stretch">
                    <div className="w-1/5 p-6 text-right font-bold">Price</div>
                    <input
                        className="w-4/5 p-6 rounded-r border border-solid border-neutral-300 shadow-md"
                        name="price" type={'number'} value={product.price} onChange={handleChangeProduct}
                    />
                </div>
            </div>
            <div className="flex justify-center">
                <div className="relative mb-4 flex w-full flex-wrap items-stretch">
                    <div className="w-1/5 p-6 text-right font-bold">Files</div>
                    <input
                        ref={uploadRef}
                        className="w-4/5 p-6 rounded-r border border-solid border-neutral-300 shadow-md"
                        type={'file'} multiple={true}
                    />
                </div>
            </div>
            <div className="flex justify-end">
                <div className="relative mb-4 flex p-4 flex-wrap items-stretch">
                    <button type="button"
                            className="rounded p-4 w-36 bg-blue-500 text-xl text-white "
                            onClick={handleClickAdd}>
                        ADD
                    </button>
                </div>
            </div>

            {fetching && <FetchingModal />}
            {result && <ResultModal title={'Product Add Result'} content={`${result}번 상품 등록 완료`} callbackFn={closeModal} />}
        </div>
    );
}

export default AddComponent;