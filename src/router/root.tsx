import {createBrowserRouter} from "react-router-dom";
import {lazy, Suspense} from "react";
import todoRouter from "./todoRouter";
import productRouter from "./productRouter";

const Loading = <div>Loading....</div>;
const Main = lazy(() => import("../pages/MainPage")); // 코드스플리팅(레이지 로딩)
const About = lazy(() => import("../pages/AboutPage"));

const TodoIndex = lazy(() => import("../pages/todo/IndexPage"));

const ProductIndex = lazy(() => import("../pages/products/IndexPage"))

const root = createBrowserRouter([
    {
        path: "",
        element: <Suspense fallback={Loading}><Main/></Suspense>
    },
    {
        path: "about",
        element: <Suspense fallback={Loading}><About/></Suspense>
    },
    {
        path: "todo",
        element: <Suspense fallback={Loading}><TodoIndex/></Suspense>,
        children: todoRouter()
    },
    {
        path: "products",
        element: <Suspense fallback={Loading}><ProductIndex/></Suspense>,
        children: productRouter()
    }
])

export default root;