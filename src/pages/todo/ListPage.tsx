import React from 'react';
import ListComponent from "../../components/todo/ListComponent";

function ListPage() {
    // const [queryParams] = useSearchParams();

    // console.log('page 타입확인', typeof queryParams.get('page'))

    // const page = parseInt(queryParams.get('page') || '1', 10);
    // const size = parseInt(queryParams.get('size') || '10', 10);

    return (
        <div className="p-4 w-full bg-white ">
            <div className="text-3xl font-extrabold">
                Todo List Page Component
            </div>
            <ListComponent />
        </div>
    );
}

export default ListPage;