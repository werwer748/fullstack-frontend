import React from 'react';
import {IServerData} from "../../interfaces/commonInterface";

interface IPageComponentProp<T> {
    serverData: IServerData<T>;
    movePage: ({ page, size }: {page: string, size: string }) => void,
}

function PageComponent<T>({serverData, movePage}: IPageComponentProp<T>) {
    return (
        <div className={"m-6 flex justify-center"}>
            {serverData.prev &&
                <div
                    className={"m-2 p-2 w-16 text-center font-bold text-blue-400"}
                    onClick={() => movePage({page: serverData.prevPage.toString(), size: '10' })}
                >
                    Prev
                </div>
            }

            {serverData.pageNumList.map((pageNum) => (
                <div
                    key={pageNum}
                    className={`m-2 p-2 w-12 text-center rounded shadow-md text-white
                     ${serverData.current === pageNum? 'bg-gray-500' : 'bg-blue-400'}`}
                    onClick={() => movePage({ page: pageNum.toString(), size: '10' })}
                >
                    {pageNum}
                </div>
            ))}

            {serverData.next &&
                <div
                    className={"m-2 p-2 w-16 text-center font-bold text-blue-400"}
                    onClick={() => movePage({page: serverData.nextPage.toString(), size: '10' })}
                >
                    Next
                </div>
            }
        </div>
    );
}

export default PageComponent;