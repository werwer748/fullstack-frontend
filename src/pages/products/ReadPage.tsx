import React from 'react';
import {useParams} from "react-router-dom";
import ReadComponent from "../../components/products/ReadComponent";

function ReadPage() {
    const { pno } = useParams();

    return (
        <div className={"p-4 w-full bg-white"}>
            <div className={"text-3xl font-extrabold"}>
                Products Read Page
            </div>

            {pno &&
                <ReadComponent pno={parseInt(pno, 10)} />
            }
        </div>
    );
}

export default ReadPage;