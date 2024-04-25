import React, {useCallback, useState} from 'react';
import ResultModal from "../common/ResultModal";
import {postAdd} from "../../api/todoApi";
import useCustomMove from "../../hooks/useCustomMove";

const initState = {
    title: '',
    content: '',
    dueDate: ''
};

function AddComponent() {
    const { moveToList } = useCustomMove();

    const [todo, setTodo] = useState({...initState});
    const [result, setResult] = useState<number | null>(null);

    const handleChangeTodo = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;

        // 이전 상태를 복사하고 새로운 값을 할당하여 업데이트
        setTodo(prevTodo => ({
            ...prevTodo,
            [name]: value
        }));
    }, []);

    const handleClickAdd = useCallback(() => {
        console.log(todo);
        postAdd(todo).then((data) => {
            console.log(data.TNO)
            setResult(data.TNO);
            setTodo({...initState});
        })
    }, [todo]);

    const closeModal = useCallback(() => {
        setResult(null);
        moveToList()
    }, [moveToList]);

    return (
        <div className="border-2 border-sky-200 mt-10 m-2 p-4">

            <div className="flex justify-center">
                <div className="relative mb-4 flex w-full flex-wrap items-stretch">
                    <div className="w-1/5 p-6 text-right font-bold">TITLE</div>
                    <input className="w-4/5 p-6 rounded-r border border-solid border-neutral-500 shadow-md"
                           name="title"
                           type={'text'}
                           value={todo.title}
                           onChange={handleChangeTodo}
                    >
                    </input>

                </div>
            </div>
            <div className="flex justify-center">
                <div className="relative mb-4 flex w-full flex-wrap items-stretch">
                    <div className="w-1/5 p-6 text-right font-bold">CONTENT</div>
                    <input className="w-4/5 p-6 rounded-r border border-solid border-neutral-500 shadow-md"
                           name="content"
                           type={'text'}
                           value={todo.content}
                           onChange={handleChangeTodo}
                    >
                    </input>
                </div>
            </div>
            <div className="flex justify-center">
                <div className="relative mb-4 flex w-full flex-wrap items-stretch">
                    <div className="w-1/5 p-6 text-right font-bold">DUEDATE</div>
                    <input className="w-4/5 p-6 rounded-r border border-solid border-neutral-500 shadow-md"
                           name="dueDate"
                           type={'date'}
                           value={todo.dueDate}
                           onChange={handleChangeTodo}
                    >
                    </input>
                </div>
            </div>
            <div className="flex justify-end">
                <div className="relative mb-4 flex p-4 flex-wrap items-stretch">
                    <button type="button"
                            className="rounded p-4 w-36 bg-blue-500 text-xl  text-white "
                            onClick={handleClickAdd}
                    >
                        ADD
                    </button>
                </div>
            </div>

            {/* 모달 처리 - alert의 경우 js 엔진 자체가 멈추기 때문에 좋지않음. */}
            {result ?
                <ResultModal
                    title={'Add Result'}
                    content={`New ${result} Added`}
                    callbackFn={closeModal} />
                :
                <></>
            }
        </div>
    );
}

export default AddComponent;