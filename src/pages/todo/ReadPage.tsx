import React, {useCallback} from 'react';
import {createSearchParams, useNavigate, useParams, useSearchParams} from "react-router-dom";

function ReadPage() {
    const navigate = useNavigate();
    const { tno} = useParams();

    const [queryParams] = useSearchParams();

    const page = queryParams.get('page') ?? '1';
    const size = queryParams.get('size') ?? '10';

    const queryStr = createSearchParams({ page, size }).toString();

    const moveToModify = useCallback(() => {
        navigate({
            pathname: `/todo/modify/${tno}`,
            search: queryStr
        })
    }, [navigate, tno, queryStr])

    const moveToList = useCallback(() => {
        navigate({
            pathname: `/todo/list`,
            search: queryStr
        })
    }, [navigate, queryStr])

    return (
        <div className={"text-3xl"}>
            {'Todo => Read Page!'}{tno}

            <div>
                <button onClick={moveToModify}>{tno}수정하기</button>
                <button onClick={moveToList}>리스트로</button>
            </div>
        </div>
    );
}

export default ReadPage;