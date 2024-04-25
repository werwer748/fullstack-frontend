import React, {useEffect, useState} from 'react';
import useCustomMove from "../../hooks/useCustomMove";
import {getList} from "../../api/todoApi";
import {ITodoServeData} from "../../interfaces/todoInterface";
import PageComponent from "../common/PageComponent";

const initState: ITodoServeData = {
    dtoList: [],
    pageNumList: [],
    pageRequestDto: null,
    prev: false,
    next: false,
    totalCount: 0,
    prevPage: 0,
    nextPage: 0,
    totalPage: 0,
    current: 0
};

function ListComponent() {
    const { page, size, moveToList, refresh, moveToRead} = useCustomMove();
    const [serverDate, setServerDate] = useState(initState);

    useEffect(() => {

        getList({ page, size }).then((data) => {
            console.log(data);
            setServerDate(data);
        })

    }, [page, size, refresh]);

    return (
        <div className={'border-2 border-blue-100 mt-10 mr-2 ml-2'}>
            <div className={"flex flex-wrap mx-auto justify-center p-6"}>
                {serverDate.dtoList.map((todo) => (
                    <div
                        key={todo.tno}
                        className={"w-full min-w-[400px] p-2 m-2 rounded shadow-md"}
                        onClick={() => moveToRead(todo.tno)}
                    >
                        <div className={"flex"}>
                            <div className={"font-extrabold text-2xl p-2 w-1/12"}>
                                {todo.tno}
                            </div>
                            <div className={"text-1xl m-1 p-2 w-8/12 font-extrabold"}>
                                {todo.title}
                            </div>
                            <div className={"text-1xl m-1 p-2 w-2/10 font-medium"}>
                                {todo.dueDate}
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            <PageComponent serverData={serverDate} movePage={moveToList} />
        </div>
    );
}

export default ListComponent;