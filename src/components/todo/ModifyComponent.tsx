import React, {useCallback, useEffect, useState} from 'react';
import {ITodoDto} from "../../interfaces/todoInterface";
import {deleteOne, getOne, putOne} from "../../api/todoApi";
import useCustomMove from "../../hooks/useCustomMove";
import ResultModal from "../common/ResultModal";

interface IProps {
    tno: number;
}

const initState: ITodoDto = {
    tno: 0,
    title: '',
    content: '',
    dueDate: '',
    complete: false
};

function ModifyComponent({tno}: IProps) {
    const [todo, setTodo] = useState({...initState});
    const [result, setResult] = useState<string | null>(null);

    const { moveToRead, moveToList } = useCustomMove();

    useEffect(() => {
        getOne(tno).then(data => {
            console.log(data);
            setTodo(data);
        })
    }, [tno]);

    const handleChangeTodo = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;

        // 이전 상태를 복사하고 새로운 값을 할당하여 업데이트
        setTodo(prevTodo => ({
            ...prevTodo,
            [name]: value
        }));
    }, []);

    const handleChangeTodoComplete = useCallback((e: React.ChangeEvent<HTMLSelectElement>) => {
        const { value } = e.target;

        // 이전 상태를 복사하고 새로운 값을 할당하여 업데이트
        setTodo(prevTodo => ({
            ...prevTodo,
            complete: value === 'Y'
        }));
    }, []);

    const handleClickDelete = useCallback(() => {
        deleteOne(tno).then(data => {
            console.log("delete result: " + data);
            setResult('Deleted');
        });
    }, [tno]);

    const handleClickModify = useCallback(() => {
        putOne(todo).then(data => {
            console.log("modify result: " + JSON.stringify(data));
            // console.log("modify result: " + data.RESULT);
            setResult('Modified');
        });
    }, [todo]);

    const closeModal = useCallback(() => {
        if (result === 'Deleted') {
            moveToList()
        } else {
            moveToRead(tno);
        }
    }, [moveToList, moveToRead, result, tno])

    return (
        <div className="border-2 border-sky-200 mt-10 m-2 p-4">

            <div className="flex justify-center mt-10">
                <div className="relative mb-4 flex w-full flex-wrap items-stretch">
                    <div className="w-1/5 p-6 text-right font-bold">TNO</div>
                    <div className="w-4/5 p-6 rounded-r border border-solid shadow-md bg-gray-100">
                        {todo.tno}
                    </div>
                </div>
            </div>
            <div className="flex justify-center">
                <div className="relative mb-4 flex w-full flex-wrap items-stretch">
                    <div className="w-1/5 p-6 text-right font-bold">TITLE</div>
                    <input className="w-4/5 p-6 rounded-r border border-solid border-neutral-300 shadow-md"
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
                    {/*<div className="w-4/5 p-6 rounded-r border border-solid shadow-md bg-gray-100">*/}
                    {/*    {todo.content}*/}
                    {/*</div>*/}
                    <input className="w-4/5 p-6 rounded-r border border-solid border-neutral-300 shadow-md"
                           name="content"
                           type={'text'}
                           value={todo.content}
                           onChange={handleChangeTodo}
                    />

                </div>
            </div>
            <div className="flex justify-center">
                <div className="relative mb-4 flex w-full flex-wrap items-stretch">
                    <div className="w-1/5 p-6 text-right font-bold">DUEDATE</div>
                    <input className="w-4/5 p-6 rounded-r border border-solid border-neutral-300 shadow-md"
                           name="dueDate"
                           type={'date'}
                           value={todo.dueDate}
                           onChange={handleChangeTodo}
                    >
                    </input>
                </div>
            </div>
            <div className="flex justify-center">
                <div className="relative mb-4 flex w-full flex-wrap items-stretch">
                    <div className="w-1/5 p-6 text-right font-bold">COMPLETE</div>
                    <select
                        name="status"
                        className="border-solid border-2 rounded m-1 p-2"
                        onChange={handleChangeTodoComplete}
                        value={todo.complete ? 'Y' : 'N'}>
                        <option value='Y'>Completed</option>
                        <option value='N'>Not Yet</option>
                    </select>
                </div>
            </div>

            <div className="flex justify-end p-4">
                <button type="button"
                        className="inline-block rounded p-4 m-2 text-xl w-32  text-white bg-red-500"
                        onClick={handleClickDelete}
                >
                    Delete
                </button>
                <button type="button"
                        className="rounded p-4 m-2 text-xl w-32 text-white bg-blue-500"
                        onClick={handleClickModify}
                >
                    Modify
                </button>

            </div>

            {result && <ResultModal title={'처리결과'} content={result} callbackFn={closeModal}></ResultModal>}
        </div>
    );
}

export default ModifyComponent;