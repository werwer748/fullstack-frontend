import {lazy, Suspense} from "react";
import {Navigate, RouteObject} from "react-router-dom";

const Loading = <div>Loading....</div>;

const TodoList = lazy(() => import("../pages/todo/ListPage"));
const TodoRead = lazy(() => import("../pages/todo/ReadPage"));
const TodoAdd = lazy(() => import("../pages/todo/AddPage"));
const TodoModify = lazy(() => import("../pages/todo/ModifyPage"));

const todoRouter = (): RouteObject[] => {
    return [
        {
            path: 'list',
            element: <Suspense fallback={Loading}><TodoList/></Suspense>
        },
        {
            path: '',
            element: <Navigate replace={true} to={'list'} /> // /todo/ 진입시 /todo/list로 리다이렉션
        },
        {
            path: 'read/:tno',
            element: <Suspense fallback={Loading}><TodoRead/></Suspense>
        },
        {
            path: 'add',
            element: <Suspense fallback={Loading}><TodoAdd/></Suspense>
        },
        {
            path: 'modify/:tno',
            element: <Suspense fallback={Loading}><TodoModify/></Suspense>
        },
    ];
};

export default todoRouter;